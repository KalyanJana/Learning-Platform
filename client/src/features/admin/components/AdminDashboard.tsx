// src/features/student/components/StudentDashboard.tsx
import React, { useState } from 'react';
import { Box, Container, IconButton, AppBar, Toolbar, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import Sidebar from './Sidebar';
import AdminAccountCreate from './adminAccountCreate/AdminAccountCreate';
import AddSection from './course/AddSection';
import AddCourse from './course/AddCourse';
import AddLesson from './course/Addlesson';
import StaffAccountConfirmation from './accountConfirm/StaffAccountConfirmation';
import StudentAccountConfirm from './accountConfirm/StudentAccountConfirm';
import StaffCommission from './commission/StaffCommission';
import StudentCommission from './commission/StudentCommission';

export type DashboardSection = 
  | 'add-course' 
  | 'add-section'
  | 'add-lesson'
  | 'staff-account-confirmation'
  | 'student-account-confirmation'
  | 'staff-commissions'
  | 'student-commissions'
  | 'admin-account-create';

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState<DashboardSection>('add-course');
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'add-course':
        return <AddCourse />;
      case 'add-section':
        return <AddSection />;
      case 'add-lesson':
        return <AddLesson />;
      case 'staff-account-confirmation':
        return <StaffAccountConfirmation />;
      case 'student-account-confirmation':
        return <StudentAccountConfirm />;
      case 'staff-commissions':
        return <StaffCommission />;
      case 'student-commissions':
        return <StudentCommission />;
      case 'admin-account-create':
        return <AdminAccountCreate />;
      default:
        return <AddCourse />;
    }
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar 
        activeSection={activeSection} 
        onSectionChange={setActiveSection}
        mobileOpen={mobileOpen}
        onMobileClose={handleDrawerToggle}
      />
      
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { sm: `calc(100% - 280px)` },
          ml: { md: '280px' },
        }}
      >
        {/* Mobile Menu Button */}
        {isMobile && (
          <AppBar position="sticky" color="default" elevation={1}>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap component="div">
                Student Dashboard
              </Typography>
            </Toolbar>
          </AppBar>
        )}

        <Container maxWidth="xl" sx={{ py: 3 }}>
          {renderContent()}
        </Container>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
