import express from 'express';
import userRouters from './user';
import paymentRoutes from './payment';

const router = express.Router();

router.use("/users", userRouters);
router.use("/payment", paymentRoutes);

export default router;
