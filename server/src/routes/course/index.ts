import { Router } from "express";
import courseRoutes from './course.routes'

const router = Router();

router.use("/v1", courseRoutes);

export default router;
