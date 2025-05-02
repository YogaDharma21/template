"use client";
import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import axios from "@/lib/axios";
import { useToken } from "@/store/useToken";
import { useUser } from "@/store/useUser";
import { ArrowRight, Mail, Menu, Rocket, SendHorizonal, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function page() {
    const [isLoading, setIsLoading] = useState(true);
    const token = useToken((state) => state.token);
    const user = useUser((state) => state.user);
    useEffect(() => {
        const fetchProfile = async () => {
            if (token.isAuthenticated && token.token) {
                try {
                    const csrf = () => axios.get("/sanctum/csrf-cookie");
                    await csrf();

                    const response = await axios.get("/api/profile", {
                        headers: {
                            Authorization: `Bearer ${token.token}`,
                            Accept: "application/json",
                        },
                    });

                    console.log("Profile data:", response.data);
                } catch (error) {
                    console.error("Profile error:", error);
                } finally {
                    setIsLoading(false);
                }
            } else {
                setIsLoading(false);
            }
        };

        fetchProfile();
    }, [token.isAuthenticated, token.token]);
    // if token exist but no user data, get from api and put on user with setUser from useUser
    console.log(user);
    return (
        <>
            <main className="overflow-hidden">
                {isLoading ? (
                    <div className="bg-slate-800 p-4 m-4 rounded-lg">
                        <div className="space-y-2">
                            <div className="h-4 w-20 animate-pulse rounded bg-slate-700" />
                            <div className="h-4 w-32 animate-pulse rounded bg-slate-700" />
                            <div className="h-4 w-40 animate-pulse rounded bg-slate-700" />
                        </div>
                    </div>
                ) : token ? (
                    <div className="bg-slate-800 p-4 m-4 rounded-lg">
                        <p>Token: </p>
                        <p>{token.token}</p>
                        <p>
                            {token.isAuthenticated
                                ? "Authenticated"
                                : "Not Authenticated"}
                        </p>
                    </div>
                ) : null}

                <div className="relative mx-auto max-w-5xl py-14">
                    <div className="lg:flex lg:items-center lg:gap-12">
                        <div className="relative z-10 mx-auto max-w-xl text-center">
                            <h1 className="mt-10 text-4xl font-bold md:text-5xl xl:text-5xl tracking-wide">
                                Project Proposition
                            </h1>
                            <p className="mt-8 text-lg text-white/65">
                                Project description
                            </p>

                            <div className="mt-8">
                                <Button asChild size="lg">
                                    <Link href="/register">
                                        <Rocket className="relative size-4" />
                                        <span className="btn-label">
                                            Get Started
                                        </span>
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="relative -mr-56 mt-8 overflow-hidden px-2 sm:mr-0 sm:mt-12 md:mt-20">
                        <div
                            aria-hidden
                            className="bg-linear-to-b to-background absolute inset-0 z-10 from-transparent from-35%"
                        />
                        <div className="inset-shadow-2xs ring-background dark:inset-shadow-white/30 bg-background relative mx-auto max-w-5xl overflow-hidden rounded-2xl border p-4 shadow-lg shadow-zinc-950/15 ring-1">
                            <Image
                                priority
                                className="bg-background  relative hidden rounded-2xl dark:block"
                                src="/music.webp"
                                alt="app screen"
                                width="2700"
                                height="1440"
                            />
                            <Image
                                priority
                                className="z-2 border-border/25  relative rounded-2xl border dark:hidden"
                                src="/music.webp"
                                alt="app screen"
                                width="2700"
                                height="1440"
                            />
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
