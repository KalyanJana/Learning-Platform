import { useMutation } from "@tanstack/react-query";
import { login, refreshAccessToken, register, logout } from "../api/auth";
import { useAuthStore } from "../store/useAuthStore";

export function useLogin() {
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      console.log("data by login", data);
      setAuth(
        data.accessToken,
        data.user._id,
        data.user.email,
        data.user.name,
        data.user.role,
        data.user.rewardPoints,
        data.user.referralCode,
      );
    },
  });
}
export function useRegister() {
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      setAuth(
        data.accessToken,
        data.user._id,
        data.user.email,
        data.user.name,
        data.user.role,
        data.user.rewardPoints,
        data.user.referralCode,
      );
    },
  });
}

export function useLogout() {
  const clearAuth = useAuthStore((state) => state.clearAuth);

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      clearAuth();
    },
  });
}

export function useRefreshToken() {
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: refreshAccessToken,
    onSuccess: (data) => {
      console.log("data by refreshtoken", data);
      setAuth(
        data.accessToken,
        data.user._id,
        data.user.email,
        data.user.name,
        data.user.role,
        data.user.rewardPoints,
        data.user.referralCode,
      );
    },
    onError: (error) => {
      useAuthStore.getState().clearAuth();
      console.error("Error refreshing access token:", error);
    },
  });
}
