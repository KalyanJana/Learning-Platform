import React from "react";
import { Button } from "@mui/material";
import apiClient from "../../utils/apiClient"; // adjust path as needed

interface Props {
  amount: number; // e.g. 24.42 INR
}

const RazorpayPaymentButton: React.FC<Props> = ({ amount }) => {
  const loadScript = () =>
    new Promise<boolean>((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  const displayRazorpay = async () => {
    const isScriptLoaded = await loadScript();

    if (!isScriptLoaded) {
      alert("Razorpay SDK failed to load");
      return;
    }
    console.log("calling...")
    try {
      const response = await apiClient.post("/payment/v1/razorpay/create-order", {
        amount: Math.round(amount * 100), // paise integer
      });

      const orderData = response.data;

      if (!orderData?.id) {
        alert("Could not create order");
        return;
      }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Your Company Name",
        description: "Course Purchase",
        order_id: orderData.id,
        handler: (response: any) => {
          alert(`Payment successful\nPayment ID: ${response.razorpay_payment_id}`);
          // TODO: call backend to verify payment & update order status
        },
        prefill: {
          name: "User Name",
          email: "user@example.com",
          contact: "9999999999",
        },
        theme: { color: "#528FF0" },
        method: {
          upi: true,
          card: false,
          netbanking: false,
          wallet: false,
        },
      };

      const paymentObject = new (window as any).Razorpay(options);
      paymentObject.open();
    } catch (error) {
      alert("Error creating order. Please try again.");
      console.error(error);
    }
  };

  return (
    <Button variant="contained" color="primary" fullWidth onClick={displayRazorpay}>
      Pay ₹{amount} via UPI
    </Button>
  );
};

export default RazorpayPaymentButton;
