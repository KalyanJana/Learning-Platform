import { Router } from "express";
import {
  createOrder,
  verifyPayment,
} from "../../../controllers/payment.razorpay.controller";

const router = Router();

router.post("/razorpay/create-order", createOrder);
router.post("/razorpay/verify-payment", verifyPayment);
router.get("/razorpay/test", (req, res) => {
  res.send("Razorpay test endpoint");
});

export default router;
