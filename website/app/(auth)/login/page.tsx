"use client";
import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { z } from "zod";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import axios from "@/lib/axios";
import { useToken } from "@/store/useToken";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const formSchema = z.object({
    email: z.string().email().min(2).max(50),
    password: z.string().min(2).max(50),
    device_name: z.string().default("browser"),
});

export default function LoginPage() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
            device_name: "browser",
        },
    });

    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const setToken = useToken((state) => state.setToken);
    const router = useRouter();

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true);
        try {
            const response = await axios.post("/api/auth/login", values);

            if (response.data.token) {
                setToken(response.data.token, response.data.expires_in || 60);
                await new Promise((resolve) => setTimeout(resolve, 100));
                toast.success("Successfully logged in!");
                router.replace("/dashboard");
            }
        } catch (error: any) {
            console.log(error);
            if (error.response?.data?.errors) {
                const errors = error.response.data.errors;
                Object.entries(errors).forEach(([field, messages]) => {
                    if (Array.isArray(messages)) {
                        form.setError(field as any, {
                            message: messages[0],
                        });
                        messages.forEach((message) => {
                            toast.error(`${field}: ${message}`);
                        });
                    }
                });
            } else {
                toast.error("Failed to login. Please check your credentials.");
            }
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <section className="flex min-h-screen bg-zinc-50 px-4 dark:bg-transparent">
            <div className="bg-card m-auto h-fit w-full max-w-sm rounded-[calc(var(--radius)+.125rem)] border p-0.5 shadow-md dark:[--color-muted:var(--color-zinc-900)]">
                <div className="p-8 pb-6">
                    <div className="text-center">
                        <Link href="/" aria-label="go home">
                            <Logo />
                        </Link>
                        <h1 className="mb-1 mt-4 text-xl font-semibold tracking-wide">
                            Log In
                        </h1>
                        <p className="text-sm">
                            Welcome back! Log In to continue
                        </p>
                    </div>
                    <hr className="my-4 border-white/30" />

                    <div className="space-y-6">
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="space-y-8"
                            >
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="email"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="flex justify-between">
                                                Password
                                                <Link
                                                    href="/forgot-password"
                                                    className="hover:underline"
                                                >
                                                    Forgot Your Password ?
                                                </Link>
                                            </FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <Input
                                                        placeholder="*******"
                                                        type={
                                                            showPassword
                                                                ? "text"
                                                                : "password"
                                                        }
                                                        className="pr-10"
                                                        {...field}
                                                    />
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="sm"
                                                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                                        onClick={() =>
                                                            setShowPassword(
                                                                !showPassword
                                                            )
                                                        }
                                                    >
                                                        {showPassword ? (
                                                            <EyeOff className="h-4 w-4" />
                                                        ) : (
                                                            <Eye className="h-4 w-4" />
                                                        )}
                                                    </Button>
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button
                                    type="submit"
                                    className="w-full cursor-pointer"
                                    disabled={isLoading}
                                >
                                    {isLoading ? "Logging in..." : "Submit"}
                                </Button>
                            </form>
                        </Form>
                    </div>
                </div>

                <div className="bg-muted rounded-(--radius) border p-3">
                    <p className="text-accent-foreground text-center text-sm">
                        Don't have an account ?
                        <Button asChild variant="link" className="px-2">
                            <Link href="/register">Register</Link>
                        </Button>
                    </p>
                </div>
            </div>
        </section>
    );
}
