import { Router } from "express";
import {
  refreshToken,
  registerUser,
  loginUser,
  logoutUser,
} from "../../controllers/user.controller";

import { authenticateToken } from "../../middlewares/auth.middleware";

const router = Router();

router.post("/signup", registerUser);
router.post("/login", loginUser);
router.post("/token/refresh", refreshToken);
router.post("/logout", logoutUser);

router.get("/working", (req, res) => {
  res.send("This is a working endpoint");
});

// Example of a protected endpoint
router.get("/v1/profile", authenticateToken, (req, res) => {
  res.json({ user: (req as any).user, message: "Protected profile data" });
});

export default router;
