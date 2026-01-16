import React from "react";
import { Box, Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface LoginMenuItem {
  label: string;
  showLogin?: boolean;
  showRegister?: boolean;
}

interface Props {
  items: LoginMenuItem[];
  mouseLeaveHandler: () => void;
}

const LoginRegisterMenu: React.FC<Props> = ({ items, mouseLeaveHandler }) => {
  const navigate = useNavigate();

  return (
    <Stack spacing={2} sx={{ p: 2 }}>
      {items.map((item, i) => (
        <Box key={i} sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <Box sx={{ flexGrow: 1, fontWeight: 600 }}>{item.label}</Box>

          {item.showLogin && (
            <Button
              variant="outlined"
              onClick={() => {
                navigate(`/${item.label}/login`, {
                  state: { userType: item.label },
                });
                mouseLeaveHandler();
              }}
            >
              Login
            </Button>
          )}
          {item.showRegister && (
            <Button
              variant="contained"
              onClick={() => {
                navigate(`/${item.label}/register`, {
                  state: { userType: item.label },
                });
                mouseLeaveHandler();
              }}
            >
              Register
            </Button>
          )}
        </Box>
      ))}
    </Stack>
  );
};

export default LoginRegisterMenu;
