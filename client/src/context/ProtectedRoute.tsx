// src/routes/ProtectedRoute.tsx
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import {jwtDecode} from "jwt-decode";

interface JwtPayload {
  exp: number; // Expiration time in seconds
}

interface ProtectedRouteProps {
  children: JSX.Element;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, accessToken, logout } = useAuthStore();

  // If not authenticated, redirect to login
  if (!isAuthenticated || !accessToken) {
    return <Navigate to="/" replace />;
  }

  // Decode token to check expiration
  try {
    const decoded = jwtDecode<JwtPayload>(accessToken);
    const now = Date.now() / 1000; // Current time in seconds

    if (decoded.exp < now) {
      // Token expired -> logout & redirect
      console.log("calling log out", decoded.exp, now);
      logout();
      return <Navigate to="/" replace />;
    }
  } catch (error) {
    console.error("Invalid access token", error);
    logout();
    return <Navigate to="/" replace />;
  }

  // All good, render protected content
  return children;
}
