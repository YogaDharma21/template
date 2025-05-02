"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/store/useAuth";

export default function Layout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const user = useAuth((state) => state.user);

    useEffect(() => {
        if (!user.isAuthenticated) {
            router.replace("/");
        }
    }, [router, user.isAuthenticated]);

    if (!user.isAuthenticated) {
        return null;
    }

    return <div>{children}</div>;
}
