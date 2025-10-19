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
import AdminPanel from "../pages/Admin/AdminPannel";
import MainLayout from "../layouts/MainLayout";
import AdminLayout from "../layouts/Adminlayout";
import StudentLayout from "../layouts/StudentLayout";
import AdminRoutes from "../features/admin/routes/adminRoutes";
import StudentRoutes from "../features/student/routes/studentRoutes";
import HomePage from "../features/home/pages/HomePage";

const AppRoutes: React.FC = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <Routes>
      <Route path="/" element={<MainLayout><HomePage/></MainLayout>} />
      <Route path="/admin/*" element={<AdminLayout><AdminRoutes/></AdminLayout>} />
      <Route path="/student/*" element={<StudentLayout><StudentRoutes/></StudentLayout>} />
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
