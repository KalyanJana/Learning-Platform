import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useRegister } from "../../../hooks/useAuthHooks";
import {
  Typography,
  Box,
  Paper,
  TextField,
  Button,
  CircularProgress,
  Link,
} from "@mui/material";

const RegisterPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams<{ userRole?: string }>();
  const role = (params.userRole ?? location.state?.role ?? "student").toLowerCase();

  const [name, setName] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Frontend validation error state
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const registerMutation = useRegister();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match!");
      return; 
    }

    setPasswordError(null); // Clear previous error

    registerMutation.mutate(
      { name, email, mobileNo, password, role },
      {
        onSuccess() {
          navigate(
            role === "admin"
              ? "/admin"
              : role === "staff"
              ? "/staff"
              : "/student"
          );
        },
      }
    );
  };

  return (
    <Box maxWidth={400} mx="auto" mt={5}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h5" mb={2}>
          Register as {role}
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Full Name"
            fullWidth
            required
            sx={{ mb: 2 }}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Mobile Number"
            fullWidth
            required
            sx={{ mb: 2 }}
            value={mobileNo}
            onChange={(e) => setMobileNo(e.target.value)}
          />
          <TextField
            label="Email"
            fullWidth
            required
            sx={{ mb: 2 }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            required
            sx={{ mb: 2 }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!passwordError}
          />
          <TextField
            label="Confirm Password"
            type="password"
            fullWidth
            required
            error={!!passwordError}
            helperText={passwordError ?? ""}
            sx={{ mb: 2 }}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button
            variant="contained"
            type="submit"
            fullWidth
            disabled={registerMutation.isLoading}
          >
            {registerMutation.isLoading ? (
              <CircularProgress size={24} />
            ) : (
              "Register"
            )}
          </Button>
          {registerMutation.isError && (
            <Typography color="error" mt={2}>
              {(loginMutation.error as any)?.response?.data?.message ||
              (loginMutation.error as any)?.response?.data?.error ||
                "Registration failed"}
            </Typography>
          )}
        </form>
        <Typography align="center" sx={{ mt: 2 }}>
          Already have an account?{" "}
          <Link
            href="#"
            onClick={(e) => {
              e.preventDefault();
              navigate(`/${role}/login`);
            }}
            underline="hover"
          >
            Login here
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default RegisterPage;
