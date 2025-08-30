// src/pages/SignupPage.tsx
import { Card, CardContent, TextField, Button, Typography, Alert } from "@mui/material";
import styles from "./Auth.module.scss";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSignup } from "../../hooks/useSignup";
import { useNavigate, Link } from "react-router-dom";

interface FormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const schema = yup.object({
  username: yup.string().required("User name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "Min 6 chars").required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm your password"),
});

export default function SignupPage() {
  const navigate = useNavigate();
  const { signup, loading, error } = useSignup();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: yupResolver(schema) });

  const onSubmit = async (data: FormData) => {
    try {
      await signup(data);
      navigate("/dashboard"); // auto-login navigates directly to dashboard
    } catch {}
  };

  return (
    <div className={styles.authContainer}>
      <Card className={styles.authCard}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Sign Up
          </Typography>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          <form onSubmit={handleSubmit(onSubmit)} className={styles.formGap}>
            <TextField
              label="User Name"
              fullWidth
              {...register("username")}
              error={!!errors.username}
              helperText={errors.username?.message}
            />
            <TextField
              label="Email"
              fullWidth
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
            <TextField
              label="Confirm Password"
              type="password"
              fullWidth
              {...register("confirmPassword")}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
            />
            <Button type="submit" variant="contained" disabled={loading} fullWidth>
              Sign Up
            </Button>
          </form>
          <Typography sx={{ mt: 2 }}>
            Already have an account? <Link to="/">Sign in</Link>
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
