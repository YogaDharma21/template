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
import { useAuth } from "@/store/useAuth";
import { useRouter } from "next/navigation";

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

    const setUser = useAuth((state) => state.setUser);
    const router = useRouter();

    function onSubmit(values: z.infer<typeof formSchema>) {
        const csrf = () => axios.get("/sanctum/csrf-cookie");
        csrf().then(() => {
            axios
                .post("/api/auth/login", values)
                .then((response) => {
                    if (response.data.token) {
                        setUser(response.data.token);
                        router.push("/");
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
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
                                                <Input
                                                    placeholder="*******"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit" className="w-full">
                                    Submit
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
