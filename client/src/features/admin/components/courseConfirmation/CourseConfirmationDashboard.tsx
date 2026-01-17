// client/src/features/admin/components/courseConfirmation/CourseConfirmationDashboard.tsx
import React, { useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  CircularProgress,
  Alert,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CardHeader,
  Divider,
} from "@mui/material";
import {
  CheckCircle,
  Cancel,
  Pending,
  AccountCircle,
  CreditCard,
  CalendarToday,
} from "@mui/icons-material";
import {
  usePendingEnrollments,
  useApproveEnrollment,
  useRejectEnrollment,
  useCourseApprovalStats,
} from "../../../../hooks/useCourseApprovalHooks";
import type { PendingEnrollment } from "../../../../api/courseApproval";

const CourseConfirmationDashboard = () => {
  const [selectedEnrollment, setSelectedEnrollment] =
    useState<PendingEnrollment | null>(null);
  const [action, setAction] = useState<"approve" | "reject" | null>(null);
  const [reason, setReason] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  const {
    data: pendingEnrollments = [],
    isLoading,
    error,
  } = usePendingEnrollments();
  const { data: stats } = useCourseApprovalStats();
  const approveMutation = useApproveEnrollment();
  const rejectMutation = useRejectEnrollment();

  const handleApprove = (enrollment: PendingEnrollment) => {
    setSelectedEnrollment(enrollment);
    setAction("approve");
    setOpenDialog(true);
  };

  const handleReject = (enrollment: PendingEnrollment) => {
    setSelectedEnrollment(enrollment);
    setAction("reject");
    setOpenDialog(true);
  };

  const handleConfirm = async () => {
    if (!selectedEnrollment) return;

    if (action === "approve") {
      approveMutation.mutate({
        enrollmentId: selectedEnrollment._id,
        reason: reason || "Approved",
      });
    } else if (action === "reject") {
      if (!reason) {
        alert("Please provide a reason for rejection");
        return;
      }
      rejectMutation.mutate({
        enrollmentId: selectedEnrollment._id,
        reason,
      });
    }

    setOpenDialog(false);
    setReason("");
    setSelectedEnrollment(null);
    setAction(null);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="500px"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        Failed to load pending enrollments
      </Alert>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" fontWeight="bold" mb={3}>
        Course Approval Management
      </Typography>

      {/* Stats Cards */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: "#FFF3E0", height: "100%" }}>
            <CardContent>
              <Box display="flex" alignItems="center" gap={2}>
                <Pending sx={{ fontSize: 40, color: "#FF9800" }} />
                <Box>
                  <Typography color="text.secondary" variant="body2">
                    Pending
                  </Typography>
                  <Typography variant="h5" fontWeight="bold">
                    {stats?.pending || 0}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: "#E8F5E9", height: "100%" }}>
            <CardContent>
              <Box display="flex" alignItems="center" gap={2}>
                <CheckCircle sx={{ fontSize: 40, color: "#4CAF50" }} />
                <Box>
                  <Typography color="text.secondary" variant="body2">
                    Approved
                  </Typography>
                  <Typography variant="h5" fontWeight="bold">
                    {stats?.approved || 0}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: "#FFEBEE", height: "100%" }}>
            <CardContent>
              <Box display="flex" alignItems="center" gap={2}>
                <Cancel sx={{ fontSize: 40, color: "#F44336" }} />
                <Box>
                  <Typography color="text.secondary" variant="body2">
                    Rejected
                  </Typography>
                  <Typography variant="h5" fontWeight="bold">
                    {stats?.rejected || 0}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: "#E3F2FD", height: "100%" }}>
            <CardContent>
              <Box display="flex" alignItems="center" gap={2}>
                <Typography variant="h5" fontWeight="bold" color="#2196F3">
                  Total
                </Typography>
                <Box>
                  <Typography color="text.secondary" variant="body2">
                    Enrollments
                  </Typography>
                  <Typography variant="h5" fontWeight="bold">
                    {stats?.total || 0}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Pending Enrollments Table */}
      <Card>
        <CardHeader
          title="Pending Course Approvals"
          subheader={`${pendingEnrollments.length} awaiting approval`}
          sx={{ bgcolor: "#F5F5F5" }}
        />
        <Divider />

        {pendingEnrollments.length === 0 ? (
          <CardContent sx={{ textAlign: "center", py: 4 }}>
            <Typography color="text.secondary">
              No pending course approvals at the moment!
            </Typography>
          </CardContent>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead sx={{ bgcolor: "#F5F5F5" }}>
                <TableRow>
                  <TableCell>Student</TableCell>
                  <TableCell>Course</TableCell>
                  <TableCell>Payment Details</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Enrollment Date</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pendingEnrollments.map((enrollment) => (
                  <TableRow key={enrollment._id} hover>
                    <TableCell>
                      <Box display="flex" alignItems="center" gap={1}>
                        <AccountCircle />
                        <Box>
                          <Typography variant="body2" fontWeight="bold">
                            {enrollment.user.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {enrollment.user.email}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight="bold">
                        {enrollment.course.title}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box display="flex" flexDirection="column" gap={0.5}>
                        <Typography variant="caption">
                          <strong>Name:</strong>{" "}
                          {enrollment.paymentDetails.payeeName}
                        </Typography>
                        <Typography variant="caption">
                          <strong>TXN:</strong>{" "}
                          {enrollment.paymentDetails.transactionId}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          <CalendarToday
                            sx={{
                              fontSize: 14,
                              mr: 0.5,
                              verticalAlign: "middle",
                            }}
                          />
                          {formatDate(enrollment.paymentDetails.submittedAt)}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body2"
                        fontWeight="bold"
                        color="success.main"
                      >
                        ₹{enrollment.paymentDetails.amount}
                      </Typography>
                    </TableCell>
                    <TableCell>{formatDate(enrollment.enrolledAt)}</TableCell>
                    <TableCell>
                      <Box display="flex" gap={1}>
                        <Button
                          variant="contained"
                          color="success"
                          size="small"
                          startIcon={<CheckCircle />}
                          onClick={() => handleApprove(enrollment)}
                          disabled={approveMutation.isPending}
                        >
                          Approve
                        </Button>
                        <Button
                          variant="outlined"
                          color="error"
                          size="small"
                          startIcon={<Cancel />}
                          onClick={() => handleReject(enrollment)}
                          disabled={rejectMutation.isPending}
                        >
                          Reject
                        </Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Card>

      {/* Approval Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle
          sx={{ bgcolor: action === "approve" ? "#E8F5E9" : "#FFEBEE" }}
        >
          {action === "approve"
            ? "Approve Course Enrollment"
            : "Reject Course Enrollment"}
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <Box mb={2}>
            <Typography variant="body2" color="text.secondary" mb={1}>
              <strong>Student:</strong> {selectedEnrollment?.user.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={1}>
              <strong>Course:</strong> {selectedEnrollment?.course.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={2}>
              <strong>Amount:</strong> ₹
              {selectedEnrollment?.paymentDetails.amount}
            </Typography>
          </Box>

          <Divider sx={{ my: 2 }} />

          <TextField
            fullWidth
            multiline
            rows={3}
            label={
              action === "approve"
                ? "Approval Notes (Optional)"
                : "Rejection Reason (Required)"
            }
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder={
              action === "approve"
                ? "Add any notes or comments..."
                : "Explain why this enrollment is being rejected..."
            }
          />
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button
            variant="contained"
            color={action === "approve" ? "success" : "error"}
            onClick={handleConfirm}
            disabled={
              action === "reject" && !reason
                ? true
                : approveMutation.isPending || rejectMutation.isPending
            }
          >
            {approveMutation.isPending || rejectMutation.isPending ? (
              <CircularProgress size={20} />
            ) : action === "approve" ? (
              "Approve"
            ) : (
              "Reject"
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CourseConfirmationDashboard;
