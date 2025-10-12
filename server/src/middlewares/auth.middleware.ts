import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "super_secret_key_123";

export interface AuthRequest extends Request {
  user?: { _id: string; username: string; email: string };
}

export interface AuthRequestWithRefresh extends AuthRequest {
  cookies?: {
    refreshToken?: string;
    [key: string]: string | undefined; // allow other cookies if present
  };
}

export const authenticateAccessToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  console.log("Authenticating user...");
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Access token missing" });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: "Invalid or expired access token" });

    req.user = user as { _id: string; username: string; email: string };
    console.log(req.user)
    next();
  });
};

export const authenticateRefreshToken = (
  req: AuthRequestWithRefresh,
  res: Response,
  next: NextFunction
) => {
  // Get refresh token from cookie
  const refreshToken = req.cookies?.refreshToken;
  console.log("refreshToken", refreshToken)
  if (!refreshToken)
    return res.status(401).json({ error: "Refresh token missing" });

  jwt.verify(refreshToken, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: "Invalid or expired refresh token" });
    req.user = user as { _id: string; username: string; email: string };
    next();
  });
};
