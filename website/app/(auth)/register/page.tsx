"use client";
import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useToken } from "@/store/useToken";
import axios from "@/lib/axios";
import { useRouter } from "next/navigation";

const formSchema = z.object({
    name: z.string().min(2).max(50),
    password: z.string().min(2).max(50),
    email: z.string().email(),
    device_name: z.string(),
});

export default function LoginPage() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            password: "",
            email: "",
            device_name: "browser",
        },
    });

    const setToken = useToken((state) => state.setToken);
    const router = useRouter();

    function onSubmit(values: z.infer<typeof formSchema>) {
        const csrf = () => axios.get("/sanctum/csrf-cookie");
        csrf().then(() => {
            axios
                .post("/api/auth/register", values)
                .then((response) => {
                    if (response.data.token) {
                        setToken(response.data.token);
                        router.push("/");
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        });
    }

    return (
        <section className="flex min-h-screen bg-zinc-50 px-4 dark:bg-transparent ">
            <div className="bg-card m-auto h-fit w-full max-w-sm rounded-[calc(var(--radius)+.125rem)] border p-0.5 shadow-md dark:[--color-muted:var(--color-zinc-900)]">
                <div className="p-8 pb-6">
                    <div className="text-center">
                        <Link href="/" aria-label="go home">
                            <Logo />
                        </Link>
                        <h1 className="mb-1 mt-4 text-xl font-semibold tracking-wide">
                            Register
                        </h1>
                        <p className="text-sm">
                            Welcome! Create an account to get started
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
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="name"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>email</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="example@gmail.com"
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
                                                    className="hover:underline text-sm"
                                                >
                                                    Forgot Your Password ?
                                                </Link>
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="*******"
                                                    type="password"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit" className="w-full cursor">
                                    Continue
                                </Button>
                            </form>
                        </Form>
                    </div>
                </div>

                <div className="bg-muted rounded-(--radius) border p-3">
                    <p className="text-accent-foreground text-center text-sm">
                        Have an account ?
                        <Button asChild variant="link" className="px-2">
                            <Link href="/login">Login</Link>
                        </Button>
                    </p>
                </div>
            </div>
        </section>
    );
}
