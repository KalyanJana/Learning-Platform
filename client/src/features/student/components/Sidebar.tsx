// src/features/student/components/Sidebar.tsx
import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Box,
  Typography,
  Divider,
  IconButton,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  LibraryBooks,
  CardGiftcard,
  School,
  ExpandLess,
  ExpandMore,
  MenuBook,
  Explore,
  Close,
} from '@mui/icons-material';
// import { DashboardSection } from './StudentDashboard';

export type DashboardSection = 
  | 'enrolled-courses' 
  | 'other-courses' 
  | 'referral' 
  | 'scholarship';

interface SidebarProps {
  activeSection: DashboardSection;
  onSectionChange: (section: DashboardSection) => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  activeSection, 
  onSectionChange, 
  mobileOpen, 
  onMobileClose 
}) => {
  const [libraryOpen, setLibraryOpen] = React.useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const drawerWidth = 280;

  const handleSectionClick = (section: DashboardSection) => {
    onSectionChange(section);
    if (isMobile) {
      onMobileClose();
    }
  };

  const drawerContent = (
    <>
      <Box sx={{ p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" fontWeight="bold">
          Student Dashboard
        </Typography>
        {isMobile && (
          <IconButton onClick={onMobileClose}>
            <Close />
          </IconButton>
        )}
      </Box>
      <Divider />

      <List sx={{ pt: 2 }}>
        {/* Library Section */}
        <ListItem disablePadding>
          <ListItemButton onClick={() => setLibraryOpen(!libraryOpen)}>
            <ListItemIcon>
              <LibraryBooks />
            </ListItemIcon>
            <ListItemText primary="Library" />
            {libraryOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>
        
        <Collapse in={libraryOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              sx={{ pl: 4 }}
              selected={activeSection === 'enrolled-courses'}
              onClick={() => handleSectionClick('enrolled-courses')}
            >
              <ListItemIcon>
                <MenuBook />
              </ListItemIcon>
              <ListItemText primary="My Enrolled Courses" />
            </ListItemButton>

            <ListItemButton
              sx={{ pl: 4 }}
              selected={activeSection === 'other-courses'}
              onClick={() => handleSectionClick('other-courses')}
            >
              <ListItemIcon>
                <Explore />
              </ListItemIcon>
              <ListItemText primary="Other Courses" />
            </ListItemButton>
          </List>
        </Collapse>

        {/* Referral & Rewards */}
        <ListItem disablePadding>
          <ListItemButton
            selected={activeSection === 'referral'}
            onClick={() => handleSectionClick('referral')}
          >
            <ListItemIcon>
              <CardGiftcard />
            </ListItemIcon>
            <ListItemText primary="Referral & Rewards" />
          </ListItemButton>
        </ListItem>

        {/* Scholarship */}
        <ListItem disablePadding>
          <ListItemButton
            selected={activeSection === 'scholarship'}
            onClick={() => handleSectionClick('scholarship')}
          >
            <ListItemIcon>
              <School />
            </ListItemIcon>
            <ListItemText primary="Scholarship" />
          </ListItemButton>
        </ListItem>
      </List>
    </>
  );

  return (
    <>
      {/* Desktop Drawer */}
      {!isMobile && (
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
              bgcolor: 'background.paper',
              borderRight: '1px solid',
              borderColor: 'divider',
            },
          }}
        >
          {drawerContent}
        </Drawer>
      )}

      {/* Mobile Drawer */}
      {isMobile && (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={onMobileClose}
          ModalProps={{
            keepMounted: true, // Better mobile performance
          }}
          sx={{
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
        >
          {drawerContent}
        </Drawer>
      )}
    </>
  );
};

export default Sidebar;
