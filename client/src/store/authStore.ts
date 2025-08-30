// src/store/authStore.ts
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface AuthUser {
  id: string;
  email: string;
  username?: string;
}

interface AuthState {
  user: AuthUser | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  setAccessToken: (token: string | null) => void;
  setUser: (user: AuthUser | null) => void;
  login: (token: string, user: AuthUser) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>(
  devtools((set) => ({
    user: null,
    accessToken: null,
    isAuthenticated: false,

    setUser: (user) => set({ user }),

    setAccessToken: (token) =>
      set({
        accessToken: token,
        isAuthenticated: !!token,
      }),

    login: (accessToken, user) => {
      set({
        accessToken,
        user,
        isAuthenticated: true,
      });
    },

    logout: () =>
      set({
        user: null,
        accessToken: null,
        isAuthenticated: false,
      }),
  }), { name: "AuthStore" })
);
