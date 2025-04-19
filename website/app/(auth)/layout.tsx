"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();

    useEffect(() => {
        // Check for token in localStorage
        const token = localStorage.getItem("token");

        // If token exists, redirect to home
        if (token) {
            router.replace("/");
        }
    }, [router]);

    // Only render children if there's no token
    // This prevents flash of content before redirect
    if (typeof window !== "undefined" && localStorage.getItem("token")) {
        return null;
    }

    return <div>{children}</div>;
}
