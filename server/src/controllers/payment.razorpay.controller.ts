import { Request, Response } from "express";
import { createRazorpayOrder, verifyRazorpaySignature } from "../services/razorpayService";

export const createOrder = async (req: Request, res: Response) => {
  console.log("first contoller call....")
  const { amount } = req.body;
  if (!amount) return res.status(400).json({ error: "Amount required" });
  console.log("calling controller")

  try {
    console.log("calling payment from controller..")
    const order = await createRazorpayOrder(amount);
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: "Order creation failed" });
  }
};

export const verifyPayment = (req: Request, res: Response) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const isValid = verifyRazorpaySignature({
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
  });

  if (isValid) {
    res.json({ status: "success" });
  } else {
    res.status(400).json({ status: "failure", error: "Invalid signature" });
  }
};
