import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Typography, Button, Box } from "@mui/material";
import styles from "./PurchasePage.module.scss";
import RazorpayPaymentButton  from "../../components/ui/RazorpayPaymentButton"

const PurchasePage: React.FC = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const handlePayment = () => {
    alert("Payment Successful!");
    navigate("/");
  };

  const coursePrice = "24.42";
  const orderId = "order123";

  const upiLink = `upi://pay?pa=merchantvpa@bank&pn=MyShop&tn=Order%20${orderId}&am=${coursePrice}&cu=INR`;

  return (
    <Container className={styles.purchase}>
      <Typography variant="h5" gutterBottom>
        Purchase Course #{courseId}
      </Typography>
      <Typography variant="body1" paragraph>
        Please proceed with payment to access this course.
      </Typography>
      <Box mt={2}>
       <RazorpayPaymentButton amount={coursePrice} />
      </Box>
    </Container>
  );
};

export default PurchasePage;
