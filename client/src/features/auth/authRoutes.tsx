// src/features/auth/authRoutes.tsx

import React from "react";
import { Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MainLayout from "../../layouts/MainLayout";

const AuthRoutes = () => (
  <>
    {/* Role-specific routes (e.g. /student/login, /admin/register) wrapped with MainLayout to show Navbar */}
    <Route
      path="/:userRole/login"
      element={
        <MainLayout>
          <LoginPage />
        </MainLayout>
      }
    />

    <Route
      path="/:userRole/register"
      element={
        <MainLayout>
          <RegisterPage />
        </MainLayout>
      }
    />
  </>
);

export default AuthRoutes;
