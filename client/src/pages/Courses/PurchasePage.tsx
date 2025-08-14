import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Typography, Button, Box } from "@mui/material";
import styles from "./PurchasePage.module.scss";

const PurchasePage: React.FC = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const handlePayment = () => {
    alert("Payment Successful!");
    navigate("/dashboard");
  };

  return (
    <Container className={styles.purchase}>
      <Typography variant="h5" gutterBottom>
        Purchase Course #{courseId}
      </Typography>
      <Typography variant="body1" paragraph>
        Please proceed with payment to access this course.
      </Typography>
      <Box mt={2}>
        <Button variant="contained" color="primary" onClick={handlePayment}>
          Pay Now
        </Button>
      </Box>
    </Container>
  );
};

export default PurchasePage;
