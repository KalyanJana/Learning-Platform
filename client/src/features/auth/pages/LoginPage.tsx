import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useLogin } from "../../../hooks/useAuthHooks";
import {
  Typography,
  Box,
  Paper,
  TextField,
  Button,
  CircularProgress,
  Link,
} from "@mui/material";

const LoginPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams<{ userRole?: string }>();

  const userType = (
    params.userRole ??
    location.state?.userType ??
    "student"
  ).toLowerCase();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginMutation = useLogin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate({ email, password, userType });
  };

  /* ✅ Handle SUCCESS (side-effect) */
  useEffect(() => {
    if (loginMutation.isSuccess) {
      navigate(
        userType === "admin"
          ? "/admin"
          : userType === "staff"
          ? "/staff"
          : "/student"
      );
    }
  }, [loginMutation.isSuccess, navigate, userType]);

  console.log("login mutation error", loginMutation.isError, loginMutation.error);
  console.log("login mutation pending", loginMutation.isPending);

  return (
    <Box maxWidth={400} mx="auto" mt={5}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h5" mb={2}>
          Login as {userType}
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Enter Email"
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
          />

          {/* ✅ isPending */}
          <Button
            variant="contained"
            type="submit"
            fullWidth
            disabled={loginMutation.isPending}
          >
            {loginMutation.isPending ? (
              <CircularProgress size={24} />
            ) : (
              "Login"
            )}
          </Button>

          {/* ✅ isError + error */}
          {loginMutation.isError && (
            <Typography color="error" mt={2}>
              {(loginMutation.error as any)?.response?.data?.message ||
              (loginMutation.error as any)?.response?.data?.error ||
                "Login failed"}
            </Typography>
          )}

          {/* ✅ isSuccess feedback (optional UI) */}
          {loginMutation.isSuccess && (
            <Typography color="success.main" mt={2}>
              Login successful! Redirecting...
            </Typography>
          )}
        </form>

        <Typography align="center" sx={{ mt: 2 }}>
          Don&apos;t have an account?{" "}
          <Link
            href="#"
            onClick={(e) => {
              e.preventDefault();
              navigate(`/${userType}/register`);
            }}
            underline="hover"
          >
            Register here
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default LoginPage;
