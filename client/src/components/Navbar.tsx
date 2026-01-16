import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Menu,
  MenuItem,
  Box,
  Typography,
  Avatar,
  IconButton,
  Tooltip,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LoginRegisterMenu from "../features/auth/components/LoginRegisterMenu";
import { useAuthStore } from "../store/useAuthStore";
import { useLogout } from "../hooks/useAuthHooks";
import { useNavigate } from "react-router-dom";

type LoginMenuItem = {
  label: string;
  showLogin?: boolean;
  showRegister?: boolean;
};

interface NavbarProps {
  loginMenuItems: LoginMenuItem[];
}

const Navbar: React.FC<NavbarProps> = ({ loginMenuItems }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [profileAnchorEl, setProfileAnchorEl] = useState<null | HTMLElement>(
    null
  );

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const userName = useAuthStore((state) => state.name || "User");
  const userRole = useAuthStore((state) => state.role);
  const logoutMutation = useLogout();
  const mongoId = useAuthStore((state) => state.id);

  // Menu for login/register
  const handleLoginMouseEnter = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    console.log("hovered ", event.currentTarget);
    setAnchorEl(event.currentTarget);
  };

  const handleLoginMouseLeave = () => {
    setAnchorEl(null);
  };

  // User profile menu - now with hover
  const handleProfileMouseEnter = (event: React.MouseEvent<HTMLElement>) => {
    setProfileAnchorEl(event.currentTarget);
  };

  const handleProfileMouseLeave = () => {
    setProfileAnchorEl(null);
  };

  function handleLogout() {
    logoutMutation.mutate(
      {},
      {
        onSuccess(data) {
          navigate("/");
          alert(data.message);
        },
      }
    );
    handleProfileMouseLeave()
  }

  const navigate = useNavigate();

  const profileClickHandler = () =>{
    navigate(`/${userRole}/profile/${mongoId}`);
    handleProfileMouseLeave()
  }

  const myCourseClickHandler = ()=>{
    navigate(`/${userRole}`);
    handleProfileMouseLeave()

  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Learning Platform
        </Typography>

        <Button color="inherit" onClick={() => navigate('/')}>Home</Button>
        <Button color="inherit" onClick={() => navigate('/about')}>About</Button>
        <Button color="inherit" onClick={() => navigate('/contact')}>Contact</Button>

        {!isAuthenticated ? (
          <Box
            onMouseEnter={handleLoginMouseEnter}
            onMouseLeave={handleLoginMouseLeave}
            sx={{ position: "relative" }}
          >
            <Button
              color="inherit"
              endIcon={<KeyboardArrowDownIcon />}
              aria-controls={anchorEl ? "login-menu" : undefined}
              aria-haspopup="true"
            >
              Login
            </Button>
            <Menu
              id="login-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              MenuListProps={{
                onMouseEnter: () => setAnchorEl(anchorEl),
                onMouseLeave: handleLoginMouseLeave,
                "aria-labelledby": "login-button",
              }}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              transformOrigin={{ vertical: "top", horizontal: "left" }}
            >
              <LoginRegisterMenu items={loginMenuItems} mouseLeaveHandler={handleLoginMouseLeave} />
            </Menu>
          </Box>
        ) : (
          <Box
            onMouseEnter={handleProfileMouseEnter}
            onMouseLeave={handleProfileMouseLeave}
            sx={{ ml: 2, position: "relative" }}
          >
            <Tooltip title="Account settings">
              <IconButton
                size="small"
                sx={{ ml: 2 }}
                aria-controls={profileAnchorEl ? "profile-menu" : undefined}
                aria-haspopup="true"
              >
                <Avatar sx={{ width: 32, height: 32, bgcolor: "primary.main" }}>
                  {(userName?.charAt(0) || "U").toUpperCase()}
                </Avatar>
                <KeyboardArrowDownIcon />
              </IconButton>
            </Tooltip>
            <Menu
              id="profile-menu"
              anchorEl={profileAnchorEl}
              open={Boolean(profileAnchorEl)}
              MenuListProps={{
                onMouseEnter: () => setProfileAnchorEl(profileAnchorEl),
                onMouseLeave: handleProfileMouseLeave,
              }}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <MenuItem>
                {userName} {userRole ? `(${userRole})` : ""}
              </MenuItem>
              <MenuItem onClick = {profileClickHandler}>Profile</MenuItem>
              <MenuItem onClick = {myCourseClickHandler}>My Courses</MenuItem>
              <MenuItem
                onClick={() => {
                  handleLogout();
                }}
              >
                Logout
              </MenuItem>
            </Menu>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
