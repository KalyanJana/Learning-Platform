import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile,
  refreshAccessToken,
} from "../../controllers/user.controller";

import { authenticateAccessToken, authenticateRefreshToken } from "../../middlewares/auth.middleware";

const router = Router();

router.post("/signup", registerUser);
router.post("/login", loginUser);
router.post("/token/refresh", refreshAccessToken);
router.post("/logout", authenticateRefreshToken, logoutUser);
router.get("/profile", authenticateRefreshToken, getUserProfile);

router.get("/working", (req, res) => {
  res.send("This is a working endpoint");
});

// Example of a protected endpoint
router.get("/v1/profile", authenticateAccessToken, (req, res) => {
  res.json({ user: (req as any).user, message: "Protected profile data" });
});

export default router;
