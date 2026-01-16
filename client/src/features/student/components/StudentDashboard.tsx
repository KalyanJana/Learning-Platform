// src/features/student/components/StudentDashboard.tsx
import React, { useState } from 'react';
import { Box, Container, IconButton, AppBar, Toolbar, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import Sidebar from './Sidebar';
import EnrolledCourses from './Library/EnrolledCourses';
import OtherCourses from './Library/OtherCourses';
import ReferralRewards from './ReferralRewards';
import Scholarship from './Scholarship';

export type DashboardSection = 
  | 'enrolled-courses' 
  | 'other-courses' 
  | 'referral' 
  | 'scholarship';

const StudentDashboard = () => {
  const [activeSection, setActiveSection] = useState<DashboardSection>('enrolled-courses');
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'enrolled-courses':
        return <EnrolledCourses />;
      case 'other-courses':
        return <OtherCourses />;
      case 'referral':
        return <ReferralRewards />;
      case 'scholarship':
        return <Scholarship />;
      default:
        return <EnrolledCourses />;
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

export default StudentDashboard;
