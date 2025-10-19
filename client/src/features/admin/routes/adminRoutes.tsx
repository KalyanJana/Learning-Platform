import React from 'react';
import { Route, Routes } from 'react-router-dom';

import AdminDashboardPage from '../pages/AdminDashboardPage';
import UserManagementPage from '../pages/UserManagementPage';

const AdminRoutes = () => (
  <Routes>
    <Route path="/" element={<AdminDashboardPage />} />
    <Route path="users" element={<UserManagementPage />} />
    {/* Add more admin routes here */}
  </Routes>
);

export default AdminRoutes;
