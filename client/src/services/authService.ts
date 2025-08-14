// src/services/authService.ts
import apiClient from "../utils/apiClient";
import { useAuthStore } from "../store/authStore";
import { AuthTokens, AuthUser } from "../types/auth";

interface LoginResponse {
  user: AuthUser;
  accessToken: string;
  refreshToken: string;
}

export const authService = {
  login: async (email: string, password: string) => {
    const response = await apiClient.post<LoginResponse>("/auth/login", {
      email,
      password,
    });

    const { user, accessToken, refreshToken } = response.data;

    // Store user and tokens in Zustand
    useAuthStore.getState().setUser(user);
    useAuthStore
      .getState()
      .setTokens({ accessToken, refreshToken } as AuthTokens);

    return user;
  },

  signup: async (name: string, email: string, password: string) => {
    const response = await apiClient.post<LoginResponse>("/auth/signup", {
      name,
      email,
      password,
    });

    const { user, accessToken, refreshToken } = response.data;

    // Store user and tokens in Zustand
    useAuthStore.getState().setUser(user);
    useAuthStore
      .getState()
      .setTokens({ accessToken, refreshToken } as AuthTokens);

    return user;
  },

  logout: () => {
    // Clear Zustand store
    useAuthStore.getState().logout();

    // Remove tokens from API client headers
    delete apiClient.defaults.headers.common["Authorization"];
  },
};
