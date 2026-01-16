// src/pages/Auth/LoginPage.tsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import { TextField, Button, Box } from "@mui/material";
import apiClient from "../../utils/apiClient";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuthStore((state) => state);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      //API call for login with username
      const response = await apiClient.post("/users/v1/login", {
        username,
        password,
      });
      const { user, accessToken } = response.data;

      login(accessToken, user);

      navigate("/");
    } catch (error: any) {
      alert(error?.response?.data?.error || "Invalid credentials");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ maxWidth: 400, mx: "auto" }}
    >
      <TextField
        fullWidth
        margin="normal"
        label="User Name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Login
      </Button>
    </Box>
  );
};

export default LoginPage;
