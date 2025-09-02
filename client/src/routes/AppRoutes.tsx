// src/routes/AppRoutes.tsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/Auth/LoginPage";
import SignupPage from "../pages/Auth/SignupPage";
import CoursePage from "../pages/Courses/CoursePage";
import PurchasePage from "../pages/Courses/PurchasePage";
import NotFound from "../pages/NotFound";
import ProtectedRoute from "../context/ProtectedRoute";
import { useAuthStore } from "../store/authStore";
import CourseDetails from "../pages/Courses/CourseDetails";

const AppRoutes: React.FC = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path="/"
        element={
          isAuthenticated ? <Navigate to="/courses" replace /> : <LoginPage />
        }
      />
      <Route
        path="/signup"
        element={
          isAuthenticated ? <Navigate to="/courses" replace /> : <SignupPage />
        }
      />

      {/* Protected Routes */}
      <Route
        path="/courses"
        element={
          <ProtectedRoute>
            <CoursePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/courses/:courseId"
        element={
          <ProtectedRoute>
            <CourseDetails />
          </ProtectedRoute>
        }
      />
      <Route
        path="/courses/:courseId/buy"
        element={
          <ProtectedRoute>
            <PurchasePage />
          </ProtectedRoute>
        }
      />

      {/* 404 Page */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
