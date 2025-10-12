import express from 'express';
import userRouters from './user';
import paymentRoutes from './payment';
import courseRouters from './course';

const router = express.Router();

router.use("/users", userRouters);
router.use("/payment", paymentRoutes);
router.use("/courses", courseRouters);

export default router;
