"use client";
import Logo from "@/components/logo";
import FooterSection from "@/components/section/footer";
import { Button } from "@/components/ui/button";
import { Menu, X, LogOut } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useToken } from "@/store/useToken";
import { useRouter } from "next/navigation";

const menuItems = [
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
];

export default function layout({ children }: { children: React.ReactNode }) {
    const [menuState, setMenuState] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const { token, logout } = useToken();
    const router = useRouter();

    useEffect(() => {
        const checkAuth = () => {
            setIsLoading(true);
            setTimeout(() => {
                setIsLoading(false);
            }, 100);
        };

        checkAuth();
    }, []);

    const handleLogout = async () => {
        try {
            logout();
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    return (
        <div suppressHydrationWarning>
            <header className="sticky top-0 z-50">
                <nav
                    data-state={menuState && "active"}
                    className="w-full border-b border-white/30 bg-white/80 backdrop-blur-md dark:bg-zinc-950/80"
                >
                    <div className="m-auto max-w-5xl px-6">
                        <div className="flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
                            <div className="flex w-full justify-between lg:w-auto">
                                <Link
                                    href="/"
                                    aria-label="home"
                                    className="flex items-center space-x-2"
                                >
                                    <Logo />
                                </Link>

                                <button
                                    onClick={() => setMenuState(!menuState)}
                                    aria-label={
                                        menuState == true
                                            ? "Close Menu"
                                            : "Open Menu"
                                    }
                                    className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden"
                                >
                                    <Menu className="in-data-[state=active]:rotate-180 in-data-[state=active]:scale-0 in-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                                    <X className="in-data-[state=active]:rotate-0 in-data-[state=active]:scale-100 in-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
                                </button>
                            </div>

                            <div className="bg-background in-data-[state=active]:block lg:in-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent">
                                <div className="lg:pr-4">
                                    <ul className="space-y-6 text-base lg:flex lg:gap-8 lg:space-y-0 lg:text-sm">
                                        {menuItems.map((item, index) => (
                                            <li key={index}>
                                                <Link
                                                    href={item.href}
                                                    className="text-muted-foreground hover:text-accent-foreground block duration-150"
                                                >
                                                    <span>{item.name}</span>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit lg:border-l-2 border-white/30 lg:pl-6">
                                    {isLoading ? (
                                        <>
                                            <div className="h-9 w-24 animate-pulse rounded-md bg-muted" />
                                            <div className="h-9 w-24 animate-pulse rounded-md bg-muted" />
                                        </>
                                    ) : token.isAuthenticated ? (
                                        <>
                                            <Button
                                                asChild
                                                variant="outline"
                                                size="sm"
                                                disabled={isLoading}
                                            >
                                                <Link href="/dashboard">
                                                    <span>Dashboard</span>
                                                </Link>
                                            </Button>
                                            <Button
                                                size="sm"
                                                onClick={handleLogout}
                                                className="flex items-center gap-2"
                                                disabled={isLoading}
                                            >
                                                <span>Logout</span>
                                                <LogOut className="size-4" />
                                            </Button>
                                        </>
                                    ) : (
                                        <>
                                            <Button
                                                asChild
                                                variant="outline"
                                                size="sm"
                                                disabled={isLoading}
                                            >
                                                <Link href="/login">
                                                    <span>Login</span>
                                                </Link>
                                            </Button>
                                            <Button
                                                asChild
                                                size="sm"
                                                disabled={isLoading}
                                            >
                                                <Link href="/register">
                                                    <span>Register</span>
                                                </Link>
                                            </Button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
            {children}
            <FooterSection />
        </div>
    );
}
