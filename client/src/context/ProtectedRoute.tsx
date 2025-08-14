// src/routes/ProtectedRoute.tsx
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import jwtDecode from "jwt-decode";

interface JwtPayload {
  exp: number; // Expiration time in seconds
}

interface ProtectedRouteProps {
  children: JSX.Element;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, tokens, logout } = useAuthStore();

  // If not authenticated, redirect to login
  if (!isAuthenticated || !tokens?.accessToken) {
    return <Navigate to="/login" replace />;
  }

  // Decode token to check expiration
  try {
    const decoded = jwtDecode<JwtPayload>(tokens.accessToken);
    const now = Date.now() / 1000; // Current time in seconds

    if (decoded.exp < now) {
      // Token expired -> logout & redirect
      logout();
      return <Navigate to="/login" replace />;
    }
  } catch (error) {
    console.error("Invalid access token", error);
    logout();
    return <Navigate to="/login" replace />;
  }

  // All good, render protected content
  return children;
}
