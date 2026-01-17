// src/features/student/components/Payment/PaymentForm.tsx
import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Alert,
  Typography,
  Paper,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSubmitPayment } from "../../../../hooks/useCourseHooks";

interface PaymentFormProps {
  courseId: string;
  price: number;
  courseName?: string;
}

const PaymentForm: React.FC<PaymentFormProps> = ({
  courseId,
  price,
  courseName = "Course",
}) => {
  const navigate = useNavigate();
  const { mutate: submitPayment, isPending } = useSubmitPayment();

  const [step, setStep] = useState<"payment" | "verification" | "success">(
    "payment",
  );
  const [formData, setFormData] = useState({
    payeeName: "",
    transactionId: "",
    amount: price.toString(),
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePaymentConfirm = () => {
    setError("");
    setStep("verification");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.payeeName || !formData.transactionId || !formData.amount) {
      setError("Please fill in all fields");
      return;
    }

    submitPayment(
      {
        courseId,
        payeeName: formData.payeeName,
        transactionId: formData.transactionId,
        amount: Number(formData.amount),
      },
      {
        onSuccess: () => {
          setStep("success");
          setTimeout(() => {
            navigate("/student");
          }, 4000);
        },
        onError: (err) => {
          setError((err as any).message || "Failed to submit payment");
        },
      },
    );
  };

  // Step 1: Payment Instructions
  if (step === "payment") {
    return (
      <Box>
        <Typography
          variant="h5"
          gutterBottom
          sx={{ fontWeight: "bold", mb: 3 }}
        >
          Complete Your Payment
        </Typography>

        <Grid container spacing={3}>
          {/* UPI Section */}
          <Grid item xs={12} sm={6}>
            <Paper
              sx={{
                p: 3,
                textAlign: "center",
                backgroundColor: "#f5f5f5",
                border: "2px solid #ddd",
              }}
            >
              <Typography variant="h6" gutterBottom>
                UPI Payment
              </Typography>
              <Box
                sx={{
                  backgroundColor: "white",
                  p: 2,
                  borderRadius: 1,
                  my: 2,
                  fontFamily: "monospace",
                  fontSize: "1.1em",
                  fontWeight: "bold",
                  wordBreak: "break-all",
                  border: "1px solid #e0e0e0",
                }}
              >
                learning.platform@upi
              </Box>
              <Typography variant="body2" color="textSecondary">
                Scan with any UPI app or copy the UPI ID
              </Typography>
            </Paper>
          </Grid>

          {/* QR Code Section */}
          <Grid item xs={12} sm={6}>
            <Paper
              sx={{
                p: 3,
                textAlign: "center",
                backgroundColor: "#f5f5f5",
                border: "2px solid #ddd",
              }}
            >
              <Typography variant="h6" gutterBottom>
                QR Code
              </Typography>
              <Box
                sx={{
                  backgroundColor: "white",
                  p: 2,
                  borderRadius: 1,
                  my: 2,
                  minHeight: "150px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1px solid #e0e0e0",
                }}
              >
                <Typography variant="body2" color="textSecondary">
                  [QR Code Image]
                </Typography>
              </Box>
              <Typography variant="body2" color="textSecondary">
                Scan to open UPI payment
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* Payment Details */}
        <Paper sx={{ p: 3, my: 3, backgroundColor: "#e3f2fd" }}>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 2 }}>
            📋 Payment Details
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Box>
                <Typography variant="body2" color="textSecondary">
                  Course
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: "500" }}>
                  {courseName}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box>
                <Typography variant="body2" color="textSecondary">
                  Amount to Pay
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", color: "primary.main" }}
                >
                  ₹{price}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>

        <Alert severity="info" sx={{ mb: 3 }}>
          <Typography variant="body2" sx={{ mb: 1 }}>
            <strong>Steps to complete payment:</strong>
          </Typography>
          <Typography variant="body2" component="div" sx={{ ml: 1 }}>
            1. Scan the QR code or use the UPI ID above
            <br />
            2. Enter ₹{price} as the amount
            <br />
            3. Complete the payment
            <br />
            4. Click "I've Completed Payment" below
          </Typography>
        </Alert>

        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            variant="contained"
            size="large"
            fullWidth
            onClick={handlePaymentConfirm}
          >
            I've Completed Payment
          </Button>
          <Button
            variant="outlined"
            size="large"
            fullWidth
            onClick={() => navigate("/student")}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    );
  }

  // Step 2: Payment Verification
  if (step === "verification") {
    return (
      <Box>
        <Typography
          variant="h5"
          gutterBottom
          sx={{ fontWeight: "bold", mb: 3 }}
        >
          Verify Your Payment
        </Typography>

        <Paper sx={{ p: 3, mb: 3, backgroundColor: "#f9f9f9" }}>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
            Please provide your payment details below. Our admin will verify and
            activate your course within a few hours.
          </Typography>
        </Paper>

        <form onSubmit={handleSubmit}>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 3 }}>
            <TextField
              label="Your Name"
              name="payeeName"
              value={formData.payeeName}
              onChange={handleChange}
              required
              fullWidth
              placeholder="Name as shown in your payment app"
              disabled={isPending}
            />
            <TextField
              label="Transaction ID / Reference Number"
              name="transactionId"
              value={formData.transactionId}
              onChange={handleChange}
              required
              fullWidth
              placeholder="UTR or Transaction reference from your bank"
              disabled={isPending}
            />
            <TextField
              label="Amount Paid (₹)"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              required
              fullWidth
              type="number"
              disabled={isPending}
            />
          </Box>

          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              disabled={isPending}
            >
              {isPending ? "Submitting..." : "Confirm & Submit"}
            </Button>
            <Button
              variant="outlined"
              size="large"
              fullWidth
              disabled={isPending}
              onClick={() => setStep("payment")}
            >
              Back
            </Button>
          </Box>
        </form>
      </Box>
    );
  }

  // Step 3: Success
  return (
    <Box sx={{ textAlign: "center" }}>
      <Paper sx={{ p: 4, backgroundColor: "#e8f5e9" }}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ fontWeight: "bold", color: "success.main" }}
        >
          ✓ Payment Submitted Successfully!
        </Typography>
        <Typography variant="h6" sx={{ mb: 3, color: "textSecondary" }}>
          Thank you for your payment
        </Typography>

        <Alert severity="success" sx={{ mb: 3, textAlign: "left" }}>
          <Typography variant="body2" sx={{ mb: 1 }}>
            <strong>What happens next:</strong>
          </Typography>
          <Typography variant="body2" component="div" sx={{ ml: 1 }}>
            ✓ Your payment details have been received
            <br />
            ✓ Admin will verify your payment within a few hours
            <br />
            ✓ Once verified, the course will automatically appear in "My
            Courses"
            <br />✓ You'll be able to access course content immediately
          </Typography>
        </Alert>

        <Typography variant="body1" color="textSecondary" sx={{ mb: 3 }}>
          You'll be redirected to your dashboard shortly...
        </Typography>
      </Paper>
    </Box>
  );
};

export default PaymentForm;
