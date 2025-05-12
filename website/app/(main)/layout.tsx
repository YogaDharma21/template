"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useToken } from "@/store/useToken";
import { Sidebar } from "@/components/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const { token, validateToken } = useToken();

    useEffect(() => {
        const checkAuth = async () => {
            const isValid = await validateToken();
            if (!isValid) {
                router.replace("/");
            }
        };

        checkAuth();
    }, [router, validateToken]);

    if (!token.isAuthenticated) {
        return null;
    }

    return (
        <div>
            <Sidebar />
            <div className="md:ml-16">{children}</div>
        </div>
    );
}
