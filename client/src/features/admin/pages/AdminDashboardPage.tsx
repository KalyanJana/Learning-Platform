// src/features/admin/pages/AdminDashboardPage.tsx
import React from 'react';
import { Box } from '@mui/material';
import AdminDashboard from '../components/AdminDashboard';

const AdminDashboardPage = () => {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <AdminDashboard />
    </Box>
  );
};

export default AdminDashboardPage;
