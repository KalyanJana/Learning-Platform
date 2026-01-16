// src/features/student/pages/StaffDashboardPage.tsx
import React from 'react';
import { Box } from '@mui/material';
import StaffDashboard from '../components/StaffDashboard';

const StaffDashboardPage = () => {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <StaffDashboard />
    </Box>
  );
};

export default StaffDashboardPage;
