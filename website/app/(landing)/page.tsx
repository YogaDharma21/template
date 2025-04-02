"use client";
import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import { ArrowRight, Mail, Menu, Rocket, SendHorizonal, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function page() {
    return (
        <>
            <main className="overflow-hidden">
                <div className="relative mx-auto max-w-5xl py-14">
                    <div className="lg:flex lg:items-center lg:gap-12">
                        <div className="relative z-10 mx-auto max-w-xl text-center">
                            <h1 className="mt-10 text-balance text-4xl font-medium md:text-5xl xl:text-5xl tracking-wide">
                                Project Proposition
                            </h1>
                            <p className="mt-8 text-lg">Project description</p>

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
                                className="bg-background  relative hidden rounded-2xl dark:block"
                                src="/music.webp"
                                alt="app screen"
                                width="2700"
                                height="1440"
                            />
                            <Image
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
