import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function LoginPage() {
    return (
        <section className="flex min-h-screen bg-zinc-50 px-4 py-16 md:py-32 dark:bg-transparent">
            <form
                action=""
                className="bg-card m-auto h-fit w-full max-w-sm rounded-[calc(var(--radius)+.125rem)] border p-0.5 shadow-md dark:[--color-muted:var(--color-zinc-900)]"
            >
                <div className="p-8 pb-6">
                    <div className="text-center">
                        <Link href="/" aria-label="go home">
                            <Logo />
                        </Link>
                        <h1 className="mb-1 mt-4 text-xl font-semibold">
                            Create a (Project Name) Account
                        </h1>
                        <p className="text-sm">
                            Welcome! Create an account to get started
                        </p>
                    </div>
                    <hr className="my-4 border-dashed" />

                    <div className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="Username" className="block text-sm">
                                Username
                            </Label>
                            <Input
                                type="text"
                                required
                                name="Username"
                                id="Username"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email" className="block text-sm">
                                email
                            </Label>
                            <Input
                                type="email"
                                required
                                name="email"
                                id="email"
                            />
                        </div>

                        <div className="space-y-0.5">
                            <div className="flex items-center justify-between">
                                <Label
                                    htmlFor="pwd"
                                    className="text-title text-sm"
                                >
                                    Password
                                </Label>
                                <Button asChild variant="link" size="sm">
                                    <Link
                                        href="#"
                                        className="link intent-info variant-ghost text-sm"
                                    >
                                        Forgot your Password ?
                                    </Link>
                                </Button>
                            </div>
                            <Input
                                type="password"
                                required
                                name="pwd"
                                id="pwd"
                                className="input sz-md variant-mixed"
                            />
                        </div>

                        <Button className="w-full">Continue</Button>
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
            </form>
        </section>
    );
}
