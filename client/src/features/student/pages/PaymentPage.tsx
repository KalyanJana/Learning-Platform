import React from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Box,
  Typography,
  Paper,
  Alert,
  CircularProgress,
  Divider,
} from "@mui/material";
import PaymentForm from "../components/payment/PaymentForm";
import { useGetCourseById } from "../../../hooks/useCourseHooks";

interface PaymentPageProps {}

const PaymentPage: React.FC<PaymentPageProps> = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const { data: course, isLoading, error } = useGetCourseById(courseId || "");

  if (!courseId) {
    return (
      <Container>
        <Alert severity="error">Course ID not found. Please go back.</Alert>
      </Container>
    );
  }

  if (isLoading) {
    return (
      <Container>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "400px",
          }}
        >
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Alert severity="error">
          Failed to load course details. Please try again.
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ py: 4 }}>
        {/* Course Header */}
        <Paper sx={{ p: 3, mb: 4, backgroundColor: "#fafafa" }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
            {course?.title || "Course"}
          </Typography>
          <Typography variant="body1" color="textSecondary" paragraph>
            {course?.description}
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant="h6">Course Fee:</Typography>
            <Typography variant="h5" sx={{ fontWeight: "bold", color: "primary.main" }}>
              ₹{course?.price || 0}
            </Typography>
          </Box>
        </Paper>

        {/* Payment Form */}
        <Paper sx={{ p: 4 }}>
          <PaymentForm
            courseId={courseId}
            price={course?.price || 0}
            courseName={course?.title}
          />
        </Paper>
      </Box>
    </Container>
  );
};

export default PaymentPage;
