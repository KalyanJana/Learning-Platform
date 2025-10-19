// src/components/Navbar.tsx
import React, { useState } from 'react';
import { AppBar, Toolbar, Button, Menu, MenuItem, Typography, Box } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

interface LoginMenuItem {
  label: string;
  onClick: () => void;
}

interface NavbarProps {
  loginMenuItems: LoginMenuItem[];
}

const Navbar: React.FC<NavbarProps> = ({ loginMenuItems }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleLoginMouseEnter = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLoginMouseLeave = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Learning Platform
        </Typography>

        <Button color="inherit">Home</Button>
        <Button color="inherit">About</Button>
        <Button color="inherit">Contact</Button>

        <Box
          onMouseEnter={handleLoginMouseEnter}
          onMouseLeave={handleLoginMouseLeave}
          sx={{ position: 'relative' }}
        >
          <Button
            color="inherit"
            endIcon={<KeyboardArrowDownIcon />}
            aria-controls={anchorEl ? 'login-menu' : undefined}
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
              'aria-labelledby': 'login-button',
            }}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
          >
            {loginMenuItems.map((item, index) => (
              <MenuItem
                key={index}
                onClick={() => {
                  item.onClick();
                  handleLoginMouseLeave();
                }}
              >
                {item.label}
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
