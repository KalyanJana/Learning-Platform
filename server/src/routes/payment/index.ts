import { Router } from "express";
import razorpayRoutes from "./razorpay.routes";

const router = Router();

router.use("/v1", razorpayRoutes);

export default router;
