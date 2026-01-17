// src/features/student/components/Sidebar.tsx
import React from "react";
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
} from "@mui/material";
import {
  LibraryBooks,
  CardGiftcard,
  School,
  ExpandLess,
  ExpandMore,
  MenuBook,
  Explore,
  Close,
} from "@mui/icons-material";
// import { DashboardSection } from './StudentDashboard';

export type DashboardSection =
  | "add-course"
  | "add-section"
  | "add-lesson"
  | "course-confirmation"
  | "staff-account-confirmation"
  | "student-account-confirmation"
  | "staff-commissions"
  | "student-commissions"
  | "admin-account-create";

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
  onMobileClose,
}) => {
  type OpenSection = "course" | "account" | "commission" | null;
  const [openSection, setOpenSection] = React.useState<OpenSection>(() => {
    if (activeSection.startsWith("add-")) return "course";
    if (activeSection.includes("account")) return "account";
    if (activeSection.includes("commission")) return "commission";
    return "course";
  });
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const drawerWidth = 280;

  const handleSectionClick = (section: DashboardSection) => {
    onSectionChange(section);
    if (isMobile) {
      onMobileClose();
    }
  };

  const toggleSection = (section: Exclude<OpenSection, null>) => {
    setOpenSection((prev) => (prev === section ? null : section));
  };

  React.useEffect(() => {
    if (activeSection.startsWith("add-")) setOpenSection("course");
    else if (activeSection.includes("account")) setOpenSection("account");
    else if (activeSection.includes("commission")) setOpenSection("commission");
    else setOpenSection(null);
  }, [activeSection]);

  const drawerContent = (
    <>
      <Box
        sx={{
          p: 3,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" fontWeight="bold">
          Admin Dashboard
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
          <ListItemButton onClick={() => toggleSection("course")}>
            <ListItemIcon>
              <LibraryBooks />
            </ListItemIcon>
            <ListItemText primary="Course Add" />
            {openSection === "course" ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>

        <Collapse in={openSection === "course"} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              sx={{ pl: 4 }}
              selected={activeSection === "add-course"}
              onClick={() => handleSectionClick("add-course")}
            >
              <ListItemIcon>
                <MenuBook />
              </ListItemIcon>
              <ListItemText primary="Add Course" />
            </ListItemButton>

            <ListItemButton
              sx={{ pl: 4 }}
              selected={activeSection === "add-section"}
              onClick={() => handleSectionClick("add-section")}
            >
              <ListItemIcon>
                <Explore />
              </ListItemIcon>
              <ListItemText primary="Add Section" />
            </ListItemButton>

            <ListItemButton
              sx={{ pl: 4 }}
              selected={activeSection === "add-lesson"}
              onClick={() => handleSectionClick("add-lesson")}
            >
              <ListItemIcon>
                <Explore />
              </ListItemIcon>
              <ListItemText primary="Add Lesson" />
            </ListItemButton>
          </List>
        </Collapse>

        <ListItem disablePadding>
          <ListItemButton onClick={() => toggleSection("account")}>
            <ListItemIcon>
              <LibraryBooks />
            </ListItemIcon>
            <ListItemText primary="Account Confirmation" />
            {openSection === "account" ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>

        <Collapse in={openSection === "account"} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              sx={{ pl: 4 }}
              selected={activeSection === "staff-account-confirmation"}
              onClick={() => handleSectionClick("staff-account-confirmation")}
            >
              <ListItemIcon>
                <MenuBook />
              </ListItemIcon>
              <ListItemText primary="Staff Account Confirmation" />
            </ListItemButton>

            <ListItemButton
              sx={{ pl: 4 }}
              selected={activeSection === "student-account-confirmation"}
              onClick={() => handleSectionClick("student-account-confirmation")}
            >
              <ListItemIcon>
                <MenuBook />
              </ListItemIcon>
              <ListItemText primary="Student Account Confirmation" />
            </ListItemButton>
          </List>
        </Collapse>

        {/* Commission section */}
        <ListItem disablePadding>
          <ListItemButton onClick={() => toggleSection("commission")}>
            <ListItemIcon>
              <LibraryBooks />
            </ListItemIcon>
            <ListItemText primary="Commission" />
            {openSection === "commission" ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>

        <Collapse
          in={openSection === "commission"}
          timeout="auto"
          unmountOnExit
        >
          <List component="div" disablePadding>
            <ListItemButton
              sx={{ pl: 4 }}
              selected={activeSection === "staff-commission"}
              onClick={() => handleSectionClick("staff-commission")}
            >
              <ListItemIcon>
                <MenuBook />
              </ListItemIcon>
              <ListItemText primary="Staff Commission" />
            </ListItemButton>

            <ListItemButton
              sx={{ pl: 4 }}
              selected={activeSection === "student-commission"}
              onClick={() => handleSectionClick("student-commission")}
            >
              <ListItemIcon>
                <MenuBook />
              </ListItemIcon>
              <ListItemText primary="Student Commission" />
            </ListItemButton>
          </List>
        </Collapse>

        {/* Admin course confirmation */}
        <ListItem disablePadding>
          <ListItemButton
            selected={activeSection === "course-confirmation"}
            onClick={() => handleSectionClick("course-confirmation")}
          >
            <ListItemIcon>
              <School />
            </ListItemIcon>
            <ListItemText primary="Course Confirmation" />
          </ListItemButton>
        </ListItem>

        {/* Admin Account Create */}
        <ListItem disablePadding>
          <ListItemButton
            selected={activeSection === "admin-account-create"}
            onClick={() => handleSectionClick("admin-account-create")}
          >
            <ListItemIcon>
              <School />
            </ListItemIcon>
            <ListItemText primary="Admin Account Create" />
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
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              bgcolor: "background.paper",
              borderRight: "1px solid",
              borderColor: "divider",
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
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
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
