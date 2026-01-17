import express from "express";
import coursesRouter from "./course/course.routes";
import usersRouter from "./user/user.routes";
import paymentsRouter from "./payment/payment.routes";
import referralsRouter from "./referral/referral.routes";

const router = express.Router();

router.use("/courses", coursesRouter);
router.use("/users", usersRouter);
router.use("/payments", paymentsRouter);
router.use("/referrals", referralsRouter);

export default router;
