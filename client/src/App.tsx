import { useState, useEffect } from "react";
import { useAuthStore } from "./store/useAuthStore";
import AppRoutes from "./routes/AppRoutes";
import Navbar from "./components/Layout/Navbar";
import Footer from "./components/Layout/Footer";
import Spinner from "./components/ui/Spinner";
import apiClient from "./utils/apiClient";
import useSocket from "./hooks/useSocket";
import "./styles/global.scss";
import { useRefreshToken } from "./hooks/useAuthHooks";

export default function App() {
  const { isAuthenticated } = useAuthStore((state) => state);
  // useSocket(user?._id ?? null);

  const refreshTokenMutation = useRefreshToken();

  useEffect(() => {
    if (!isAuthenticated) {
      refreshTokenMutation.mutate();
    }
  }, []);

  if (refreshTokenMutation.isLoading) return <Spinner />;

  return <AppRoutes />;
}
