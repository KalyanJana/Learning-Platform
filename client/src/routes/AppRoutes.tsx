// src/routes/AppRoutes.tsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/Auth/LoginPage";
import SignupPage from "../pages/Auth/SignupPage";
import CoursePage from "../pages/Courses/CoursePage";
import PurchasePage from "../pages/Courses/PurchasePage";
import NotFound from "../pages/NotFound";
import ProtectedRoute from "../context/ProtectedRoute";
import { useAuthStore } from "../store/useAuthStore";
import CourseDetails from "../pages/Courses/CourseDetails";
import AdminPanel from "../pages/Admin/AdminPannel";
import MainLayout from "../layouts/MainLayout";
import AdminLayout from "../layouts/Adminlayout";
import StudentLayout from "../layouts/StudentLayout";
import AdminRoutes from "../features/admin/routes/adminRoutes";
import StudentRoutes from "../features/student/routes/studentRoutes";
import HomePage from "../features/home/pages/HomePage";
import AuthRoutes from "../features/auth/authRoutes";
import AboutUs from "../features/home/components/AboutUs";
import ContactUs from "../features/home/components/ContactUs";
import StaffRoutes from "../features/stuff/routes/staffRoutes";

const AppRoutes: React.FC = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <MainLayout>
            <HomePage />
          </MainLayout>
        }
      />
      <Route
        path="/about"
        element={
          <MainLayout>
            <AboutUs />
          </MainLayout>
        }
      />
      <Route
        path="/contact"
        element={
          <MainLayout>
            <ContactUs />
          </MainLayout>
        }
      />
      {AuthRoutes()}
      <Route
        path="/admin/*"
        element={
          <AdminLayout>
            <AdminRoutes />
          </AdminLayout>
        }
      />
      <Route
        path="/student/*"
        element={
          <StudentLayout>
            <StudentRoutes />
          </StudentLayout>
        }
      />
      <Route
        path="/staff/*"
        element={
          <StudentLayout>
            <StaffRoutes />
          </StudentLayout>
        }
      />
      <Route path="*" element={<NotFound />} />

      {/* <Route
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

      <Route
        path="/admin/upload"
        element={
          <ProtectedRoute>
            <AdminPanel />
          </ProtectedRoute>
        }
      /> */}
    </Routes>
  );
};

export default AppRoutes;
