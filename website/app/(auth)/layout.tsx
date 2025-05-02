"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useToken } from "@/store/useToken";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const token = useToken((state) => state.token);

    useEffect(() => {
        if (token.isAuthenticated) {
            router.replace("/");
        }
    }, [router, token.isAuthenticated]);

    if (token.isAuthenticated) {
        return null;
    }

    return <div>{children}</div>;
}
