import { create } from "zustand";

interface User {
    id: number | null;
    name: string | null;
    email: string | null;
    email_verified_at: string | null;
    created_at: string | null;
    updated_at: string | null;
}

interface UserStore {
    user: User;
    setUser: (userData: User) => void;
    clearUser: () => void;
}

const initialUserState: User = {
    id: null,
    name: null,
    email: null,
    email_verified_at: null,
    created_at: null,
    updated_at: null,
};

export const useUser = create<UserStore>()((set) => ({
    user: initialUserState,
    setUser: (userData) => {
        set({ user: userData });
    },
    clearUser: () => {
        set({ user: initialUserState });
    },
}));
