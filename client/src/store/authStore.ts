// src/store/authStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthTokens {
  accessToken: string;
  refreshToken?: string;
}

interface AuthUser {
  id: string;
  email: string;
  username?: string;
}

interface AuthState {
  user: AuthUser | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  setUser: (user: AuthUser | null) => void;
  setTokens: (tokens: AuthTokens) => void;
  logout: () => void;
}


export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,

      setUser: (user) => set({ user }),

      setTokens: (tokens) =>
        set({
          accessToken: tokens.accessToken,
          refreshToken: tokens.refreshToken,
          isAuthenticated: true,
        }),

      logout: () =>
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: "auth-storage", // key in localStorage
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
