"use client";

import { useEffect } from "react";
import { useToken } from "@/store/useToken";
import { useRouter, usePathname } from "next/navigation";

const publicRoutes = [
    "/",
    "/login",
    "/register",
    "/forgot-password",
    "/about",
    "/contact",
    "/password-reset/[token]",
];

export default function TokenValidator() {
    const { validateToken } = useToken();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const checkToken = async () => {
            const isValid = await validateToken();
            const isPublicRoute =
                publicRoutes.includes(pathname) ||
                pathname.startsWith("/password-reset/");
            if (!isValid && !isPublicRoute) {
                router.replace("/login");
            }
        };

        checkToken();

        const interval = setInterval(checkToken, 30000);

        return () => clearInterval(interval);
    }, [validateToken, router, pathname]);

    return null;
}
