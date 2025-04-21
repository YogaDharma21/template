import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
    token: string | null;
    isAuthenticated: boolean;
}

interface AuthStore {
    user: User;
    setUser: (token: string) => void;
    logout: () => void;
}

export const useAuth = create<AuthStore>()(
    persist(
        (set) => ({
            user: {
                token: null,
                isAuthenticated: false,
            },
            setUser: (token) => {
                window.localStorage.setItem("token", token);
                set({
                    user: {
                        token,
                        isAuthenticated: true,
                    },
                });
            },
            logout: () => {
                window.localStorage.removeItem("token");
                set({
                    user: {
                        token: null,
                        isAuthenticated: false,
                    },
                });
            },
        }),
        {
            name: "auth-storage",
        }
    )
);
