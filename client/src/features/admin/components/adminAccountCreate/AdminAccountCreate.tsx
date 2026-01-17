import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  TextField,
  Button,
  Grid,
  Typography,
  Alert,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import {
  AdminPanelSettings,
  Email,
  Phone,
  Lock,
  CheckCircle,
} from "@mui/icons-material";
import apiClient from "../../../../api/apiClient";

interface AdminFormData {
  firstName: string;
  lastName: string;
  email: string;
  mobileNo: string;
  password: string;
  confirmPassword: string;
  role: "admin" | "moderator";
}

interface CreateAdminResponse {
  accessToken: string;
  user: {
    _id: string;
    firstName?: string;
    lastName?: string;
    name?: string;
    email: string;
    role: string;
    mobileNo?: string;
  };
}

const AdminAccountCreate = () => {
  const [formData, setFormData] = useState<AdminFormData>({
    firstName: "",
    lastName: "",
    email: "",
    mobileNo: "",
    password: "",
    confirmPassword: "",
    role: "admin",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [successDialog, setSuccessDialog] = useState(false);
  const [successData, setSuccessData] = useState<
    CreateAdminResponse["data"] | null
  >(null);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.mobileNo.trim()) {
      newErrors.mobileNo = "Mobile number is required";
    } else if (!/^\d{10}$/.test(formData.mobileNo.replace(/\D/g, ""))) {
      newErrors.mobileNo = "Mobile number must be 10 digits";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleRoleChange = (e: any) => {
    setFormData((prev) => ({
      ...prev,
      role: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      setMessage({
        type: "error",
        text: "Please fix the errors in the form",
      });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const response = await apiClient.post<CreateAdminResponse>(
        "/users/auth/register",
        {
          name: formData.firstName + " " + formData.lastName,
          email: formData.email,
          mobileNo: formData.mobileNo,
          password: formData.password,
          role: formData.role,
        },
      );

      // Handle successful response
      if (response.status === 200 || response.status === 201) {
        const responseData = response.data;

        // Extract user data from response
        const userData = response.data.user;

        // Format the user data for display
        const displayData = {
          _id: userData._id,
          firstName: userData.name?.split(" ")[0] || userData.firstName || "",
          lastName: userData.name?.split(" ")[1] || userData.lastName || "",
          email: userData.email,
          role: userData.role,
        };

        setSuccessData(displayData);
        setSuccessDialog(true);
        resetForm();
        setMessage({
          type: "success",
          text: "Admin account created successfully!",
        });
      } else {
        setMessage({
          type: "error",
          text: response.data.message || "Failed to create admin account",
        });
      }
    } catch (error: any) {
      console.error("Admin creation error:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Failed to create admin account";
      setMessage({
        type: "error",
        text: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      mobileNo: "",
      password: "",
      confirmPassword: "",
      role: "admin",
    });
    setErrors({});
  };

  const handleDialogClose = () => {
    setSuccessDialog(false);
    setSuccessData(null);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography
        variant="h4"
        fontWeight="bold"
        mb={3}
        display="flex"
        alignItems="center"
        gap={1}
      >
        <AdminPanelSettings sx={{ fontSize: 32, color: "#1976D2" }} />
        Create New Admin Account
      </Typography>

      <Grid container spacing={3}>
        {/* Form Card */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardHeader
              title="Admin Details"
              subheader="Fill in the information to create a new admin account"
              sx={{ bgcolor: "#F5F5F5" }}
            />
            <Divider />
            <CardContent>
              <Box component="form" onSubmit={handleSubmit} noValidate>
                {message && (
                  <Alert
                    severity={message.type}
                    sx={{ mb: 2 }}
                    onClose={() => setMessage(null)}
                  >
                    {message.text}
                  </Alert>
                )}

                <Grid container spacing={2}>
                  {/* First Name */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="First Name"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      error={!!errors.firstName}
                      helperText={errors.firstName}
                      placeholder="Enter first name"
                    />
                  </Grid>

                  {/* Last Name */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Last Name"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      error={!!errors.lastName}
                      helperText={errors.lastName}
                      placeholder="Enter last name"
                    />
                  </Grid>

                  {/* Email */}
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Email Address"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      error={!!errors.email}
                      helperText={errors.email}
                      placeholder="admin@example.com"
                      InputProps={{
                        startAdornment: (
                          <Email sx={{ mr: 1, color: "action.active" }} />
                        ),
                      }}
                    />
                  </Grid>

                  {/* Mobile Number */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Mobile Number"
                      name="mobileNo"
                      value={formData.mobileNo}
                      onChange={handleInputChange}
                      error={!!errors.mobileNo}
                      helperText={errors.mobileNo || "10 digit number"}
                      placeholder="9876543210"
                      InputProps={{
                        startAdornment: (
                          <Phone sx={{ mr: 1, color: "action.active" }} />
                        ),
                      }}
                    />
                  </Grid>

                  {/* Role */}
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel>Role</InputLabel>
                      <Select
                        value={formData.role}
                        label="Role"
                        onChange={handleRoleChange}
                      >
                        <MenuItem value="admin">Admin</MenuItem>
                        <MenuItem value="moderator">Moderator</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  {/* Password */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Password"
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      error={!!errors.password}
                      helperText={errors.password || "Minimum 6 characters"}
                      placeholder="••••••"
                      InputProps={{
                        startAdornment: (
                          <Lock sx={{ mr: 1, color: "action.active" }} />
                        ),
                      }}
                    />
                  </Grid>

                  {/* Confirm Password */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Confirm Password"
                      name="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      error={!!errors.confirmPassword}
                      helperText={errors.confirmPassword}
                      placeholder="••••••"
                      InputProps={{
                        startAdornment: (
                          <Lock sx={{ mr: 1, color: "action.active" }} />
                        ),
                      }}
                    />
                  </Grid>
                </Grid>

                {/* Submit Buttons */}
                <Box display="flex" gap={2} mt={3}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={loading}
                    sx={{ minWidth: 150 }}
                  >
                    {loading ? (
                      <CircularProgress size={24} sx={{ mr: 1 }} />
                    ) : (
                      <>
                        <CheckCircle sx={{ mr: 1 }} />
                        Create Admin
                      </>
                    )}
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={resetForm}
                    disabled={loading}
                  >
                    Reset
                  </Button>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Info Panel */}
        <Grid item xs={12} md={4}>
          <Paper
            sx={{ p: 2.5, bgcolor: "#E3F2FD", borderLeft: "4px solid #1976D2" }}
          >
            <Typography variant="h6" fontWeight="bold" mb={2}>
              📋 Requirements
            </Typography>
            <Box component="ul" sx={{ pl: 2, m: 0 }}>
              <Typography component="li" variant="body2" mb={1}>
                First & Last name required
              </Typography>
              <Typography component="li" variant="body2" mb={1}>
                Valid email address
              </Typography>
              <Typography component="li" variant="body2" mb={1}>
                10-digit mobile number
              </Typography>
              <Typography component="li" variant="body2" mb={1}>
                Password minimum 6 characters
              </Typography>
              <Typography component="li" variant="body2" mb={1}>
                Confirm password must match
              </Typography>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Typography variant="h6" fontWeight="bold" mb={2}>
              👤 Role Types
            </Typography>
            <Box component="ul" sx={{ pl: 2, m: 0 }}>
              <Typography component="li" variant="body2" mb={1}>
                <strong>Admin:</strong> Full access
              </Typography>
              <Typography component="li" variant="body2">
                <strong>Moderator:</strong> Limited access
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Success Dialog */}
      <Dialog
        open={successDialog}
        onClose={handleDialogClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ bgcolor: "#E8F5E9", color: "#2E7D32" }}>
          ✓ Admin Account Created Successfully
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Paper sx={{ p: 2, bgcolor: "#F5F5F5" }}>
              <Typography variant="body2" color="text.secondary">
                <strong>Name:</strong>
              </Typography>
              <Typography variant="body1" fontWeight="bold">
                {successData?.firstName} {successData?.lastName}
              </Typography>
            </Paper>
            <Paper sx={{ p: 2, bgcolor: "#F5F5F5" }}>
              <Typography variant="body2" color="text.secondary">
                <strong>Email:</strong>
              </Typography>
              <Typography variant="body1">{successData?.email}</Typography>
            </Paper>
            <Paper sx={{ p: 2, bgcolor: "#F5F5F5" }}>
              <Typography variant="body2" color="text.secondary">
                <strong>Role:</strong>
              </Typography>
              <Typography variant="body1" sx={{ textTransform: "capitalize" }}>
                {successData?.role}
              </Typography>
            </Paper>
            <Alert severity="info">
              The admin can now log in with their email and password.
            </Alert>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button
            variant="contained"
            color="success"
            onClick={handleDialogClose}
          >
            Done
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminAccountCreate;
