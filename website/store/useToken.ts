import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "@/lib/axios";

interface Token {
    token: string | null;
    isAuthenticated: boolean;
    expiresAt: number | null;
}

interface AuthStore {
    token: Token;
    setToken: (token: string, expiresIn: number) => void;
    logout: () => void;
    validateToken: () => Promise<boolean>;
}

export const useToken = create<AuthStore>()(
    persist(
        (set, get) => ({
            token: {
                token: null,
                isAuthenticated: false,
                expiresAt: null,
            },
            setToken: (token, expiresIn) => {
                const expiresAt = Date.now() + expiresIn * 1000;
                set({
                    token: {
                        token,
                        isAuthenticated: true,
                        expiresAt,
                    },
                });
            },
            logout: () => {
                set({
                    token: {
                        token: null,
                        isAuthenticated: false,
                        expiresAt: null,
                    },
                });
            },
            validateToken: async () => {
                const { token } = get();

                if (
                    !token.token ||
                    !token.expiresAt ||
                    token.expiresAt < Date.now()
                ) {
                    set({
                        token: {
                            token: null,
                            isAuthenticated: false,
                            expiresAt: null,
                        },
                    });
                    return false;
                }

                try {
                    await axios.get("/api/profile", {
                        headers: {
                            Authorization: `Bearer ${token.token}`,
                            Accept: "application/json",
                        },
                    });
                    return true;
                } catch (error) {
                    set({
                        token: {
                            token: null,
                            isAuthenticated: false,
                            expiresAt: null,
                        },
                    });
                    return false;
                }
            },
        }),
        {
            name: "token-storage",
        }
    )
);
