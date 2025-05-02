"use client";

import { useEffect } from "react";
import { useToken } from "@/store/useToken";
import { useRouter, usePathname } from "next/navigation";

// Define public routes that don't require authentication
const publicRoutes = ["/", "/login", "/register", "/about", "/contact"];

export default function TokenValidator() {
    const { validateToken } = useToken();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const checkToken = async () => {
            const isValid = await validateToken();
            // Only redirect if the token is invalid AND the current route is not public
            if (!isValid && !publicRoutes.includes(pathname)) {
                router.replace("/login");
            }
        };

        // Check token immediately
        checkToken();

        // Set up interval to check token every 30 seconds
        const interval = setInterval(checkToken, 30000);

        return () => clearInterval(interval);
    }, [validateToken, router, pathname]);

    return null;
}
