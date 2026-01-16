// src/features/student/components/Payment/PaymentForm.tsx
import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface PaymentFormProps {
  open: boolean;
  onClose: () => void;
  courseId: string;
  amount: string;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ open, onClose, courseId, amount }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    payeeName: '',
    transactionId: '',
    amount: amount,
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would call your API with React Query mutation
    console.log('Payment details submitted:', { ...formData, courseId });
    setSubmitted(true);
    
    // Redirect after 3 seconds
    setTimeout(() => {
      navigate('/student');
    }, 3000);
  };

  if (submitted) {
    return (
      <Dialog open={open} maxWidth="sm" fullWidth>
        <DialogContent>
          <Alert severity="success" sx={{ mb: 2 }}>
            <strong>Payment Details Submitted Successfully!</strong>
          </Alert>
          <Box sx={{ textAlign: 'center', py: 3 }}>
            <Typography variant="h6" gutterBottom>
              Thank You!
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Your enrollment request has been submitted. Admin will review and approve your 
              enrollment shortly. You will receive a confirmation email once approved.
            </Typography>
            <Typography variant="body2" color="text.secondary" mt={2}>
              Redirecting to dashboard...
            </Typography>
          </Box>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Submit Payment Details</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Payee Name"
              name="payeeName"
              value={formData.payeeName}
              onChange={handleChange}
              required
              fullWidth
              helperText="Name as shown in your payment app"
            />
            <TextField
              label="Transaction ID / UTR Number"
              name="transactionId"
              value={formData.transactionId}
              onChange={handleChange}
              required
              fullWidth
              helperText="Unique transaction reference number"
            />
            <TextField
              label="Amount Paid (₹)"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              required
              fullWidth
              type="number"
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained">
            Confirm & Submit
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default PaymentForm;
