"use client";
import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { z } from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import axios from "@/lib/axios";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";

const formSchema = z
    .object({
        email: z.string().email().min(2).max(50),
        password: z.string().min(8).max(50),
        password_confirmation: z.string().min(8).max(50),
    })
    .refine((data) => data.password === data.password_confirmation, {
        message: "Passwords don't match",
        path: ["password_confirmation"],
    });

export default function PasswordResetPage() {
    const params = useParams();
    const searchParams = useSearchParams();
    const token = params.token as string;
    const email = searchParams.get("email");

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: email || "",
            password: "",
            password_confirmation: "",
        },
    });

    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const router = useRouter();

    function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true);
        axios
            .post("/api/auth/reset-password", {
                ...values,
                token: token,
            })
            .then(() => {
                toast.success("Password reset successful!");
                router.push("/login");
            })
            .catch((error) => {
                console.log(error);
                toast.error("Failed to reset password. Please try again.");
            })
            .finally(() => {
                setIsLoading(false);
            });
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
                            Reset Password
                        </h1>
                        <p className="text-sm">Enter your new password below</p>
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
                                                    disabled
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
                                            <FormLabel>New Password</FormLabel>
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
                                <FormField
                                    control={form.control}
                                    name="password_confirmation"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Confirm Password
                                            </FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <Input
                                                        placeholder="*******"
                                                        type={
                                                            showConfirmPassword
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
                                                            setShowConfirmPassword(
                                                                !showConfirmPassword
                                                            )
                                                        }
                                                    >
                                                        {showConfirmPassword ? (
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
                                    {isLoading
                                        ? "Resetting..."
                                        : "Reset Password"}
                                </Button>
                            </form>
                        </Form>
                    </div>
                </div>

                <div className="bg-muted rounded-(--radius) border p-3">
                    <p className="text-accent-foreground text-center text-sm">
                        Remember your password?
                        <Button asChild variant="link" className="px-2">
                            <Link href="/login">Login</Link>
                        </Button>
                    </p>
                </div>
            </div>
        </section>
    );
}
