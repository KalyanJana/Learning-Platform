// src/hooks/useSignup.ts
import { useState } from "react";
import apiClient from "../utils/apiClient";
import { useAuthStore } from "../store/authStore";

interface SignupData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export function useSignup() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const login = useAuthStore((state) => state.login);

  const signup = async (data: SignupData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.post("/users/v1/signup", data);

      // Backend returns user and accessToken in response body
      const { user, accessToken } = response.data;

      //login
      login(accessToken, user);

      setLoading(false);
    } catch (err: any) {
      setError(err.response?.data?.error || err.message);
      setLoading(false);
      throw err;
    }
  };

  return { signup, loading, error };
}
