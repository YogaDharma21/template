"use client";
import { useEffect } from "react";
import { useToken } from "@/store/useToken";
import { useUser } from "@/store/useUser";
import axios from "@/lib/axios";
import TokenValidator from "@/components/auth/TokenValidator";

export default function ClientLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const token = useToken((state) => state.token);
    const { setUser } = useUser();

    useEffect(() => {
        const fetchProfile = async () => {
            if (token.isAuthenticated && token.token) {
                try {
                    const response = await axios.get("/api/profile", {
                        headers: {
                            Authorization: `Bearer ${token.token}`,
                            Accept: "application/json",
                        },
                    });

                    setUser(response.data);
                } catch (error) {
                    console.error("Profile error:", error);
                }
            }
        };

        fetchProfile();
    }, [token.isAuthenticated, token.token, setUser]);

    return (
        <>
            <TokenValidator />
            {children}
        </>
    );
}
