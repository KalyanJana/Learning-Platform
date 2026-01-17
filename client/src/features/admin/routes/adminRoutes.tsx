import React from "react";
import { Route, Routes } from "react-router-dom";

import AdminDashboardPage from "../pages/AdminDashboardPage";
import UserManagementPage from "../pages/UserManagementPage";
import CourseConfirmationDashboard from "../components/courseConfirmation/CourseConfirmationDashboard";

const AdminRoutes = () => (
  <Routes>
    <Route path="/" element={<AdminDashboardPage />} />
    <Route path="users" element={<UserManagementPage />} />
    <Route path="course-approval" element={<CourseConfirmationDashboard />} />
    {/* Add more admin routes here */}
  </Routes>
);

export default AdminRoutes;
