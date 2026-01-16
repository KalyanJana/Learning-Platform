// src/features/student/components/Payment/PaymentPage.tsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Paper,
  Typography,
  Grid,
  Button,
  Divider,
  Card,
  CardMedia,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import { ArrowBack, QrCode2 } from '@mui/icons-material';
import PaymentForm from './PaymentForm';

const PaymentPage = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const [showWarning, setShowWarning] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  // Mock course data - Replace with React Query
  const course = {
    id: courseId,
    title: 'React Mastery Course',
    description: 'Complete React development from basics to advanced',
    thumbnail: 'https://via.placeholder.com/600x300',
    instructor: 'John Doe',
    price: '2,999',
    totalDuration: '10 hours',
    studentsEnrolled: 1500,
    rating: 4.8,
  };

  const paymentDetails = {
    upiId: 'merchant@upi',
    qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=merchant@upi&pn=Learning%20Platform&am=2999&cu=INR',
  };

  const handleConfirmClick = () => {
    setShowWarning(true);
  };

  const handleProceedToForm = () => {
    setShowWarning(false);
    setShowPaymentForm(true);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Button startIcon={<ArrowBack />} onClick={() => navigate(-1)}>
          Back
        </Button>
        <Typography variant="h4" fontWeight="bold">
          Complete Payment
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {/* Course Details */}
        <Grid item xs={12} md={7}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" fontWeight="bold" mb={2}>
              Course Details
            </Typography>
            <Card>
              <CardMedia
                component="img"
                height="250"
                image={course.thumbnail}
                alt={course.title}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {course.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={2}>
                  {course.description}
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      Instructor
                    </Typography>
                    <Typography variant="body1">{course.instructor}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      Duration
                    </Typography>
                    <Typography variant="body1">{course.totalDuration}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      Students
                    </Typography>
                    <Typography variant="body1">{course.studentsEnrolled}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      Rating
                    </Typography>
                    <Typography variant="body1">⭐ {course.rating}</Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Paper>
        </Grid>

        {/* Payment Details */}
        <Grid item xs={12} md={5}>
          <Paper sx={{ p: 3, position: 'sticky', top: 20 }}>
            <Typography variant="h5" fontWeight="bold" mb={3}>
              Payment Options
            </Typography>

            {/* QR Code */}
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <Box
                component="img"
                src={paymentDetails.qrCode}
                alt="QR Code"
                sx={{
                  width: 200,
                  height: 200,
                  border: '2px solid',
                  borderColor: 'divider',
                  borderRadius: 2,
                  p: 2,
                }}
              />
              <Typography variant="body2" color="text.secondary" mt={2}>
                <QrCode2 fontSize="small" sx={{ verticalAlign: 'middle', mr: 0.5 }} />
                Scan QR code to pay
              </Typography>
            </Box>

            <Divider sx={{ my: 3 }}>OR</Divider>

            {/* UPI Details */}
            <Box sx={{ bgcolor: 'background.default', p: 2, borderRadius: 1, mb: 3 }}>
              <Typography variant="body2" color="text.secondary" mb={1}>
                UPI ID
              </Typography>
              <Typography variant="h6" fontWeight="bold" mb={2}>
                {paymentDetails.upiId}
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={1}>
                Amount to Pay
              </Typography>
              <Typography variant="h4" color="primary" fontWeight="bold">
                ₹{course.price}
              </Typography>
            </Box>

            <Button
              variant="contained"
              fullWidth
              size="large"
              onClick={handleConfirmClick}
            >
              I Have Completed Payment
            </Button>

            <Typography variant="caption" color="text.secondary" display="block" mt={2} textAlign="center">
              Click above after completing the payment to submit transaction details
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Warning Dialog */}
      <Dialog open={showWarning} onClose={() => setShowWarning(false)}>
        <DialogTitle>⚠️ Confirm Payment</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please make sure you have completed the payment before proceeding. 
            You will need to provide transaction details in the next step.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowWarning(false)}>Cancel</Button>
          <Button onClick={handleProceedToForm} variant="contained" autoFocus>
            Yes, I Have Paid
          </Button>
        </DialogActions>
      </Dialog>

      {/* Payment Form Dialog */}
      {showPaymentForm && (
        <PaymentForm
          open={showPaymentForm}
          onClose={() => setShowPaymentForm(false)}
          courseId={course.id!}
          amount={course.price}
        />
      )}
    </Container>
  );
};

export default PaymentPage;
