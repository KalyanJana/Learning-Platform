import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  exp: number;
}

interface RoleProtectedRouteProps {
  children: JSX.Element;
  allowedRoles: Array<"admin" | "student" | "staff">;
  fallbackPath?: string;
}

export default function RoleProtectedRoute({
  children,
  allowedRoles,
  fallbackPath = "/",
}: RoleProtectedRouteProps) {
  const { isAuthenticated, accessToken, role, clearAuth } = useAuthStore();

  // If not authenticated, redirect to login
  if (!isAuthenticated || !accessToken) {
    return <Navigate to="/" replace />;
  }

  // Check token expiration
  try {
    const decoded = jwtDecode<JwtPayload>(accessToken);
    const now = Date.now() / 1000;

    if (decoded.exp < now) {
      clearAuth();
      return <Navigate to="/" replace />;
    }
  } catch (error) {
    console.error("Invalid access token", error);
    clearAuth();
    return <Navigate to="/" replace />;
  }

  // Check if user role is allowed
  if (!role || !allowedRoles.includes(role)) {
    console.warn(
      `User with role '${role}' is not allowed. Redirecting to ${fallbackPath}`,
    );
    return <Navigate to={fallbackPath} replace />;
  }

  // All good, render protected content
  return children;
}
