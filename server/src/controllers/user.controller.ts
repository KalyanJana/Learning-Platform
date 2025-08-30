import { Request, Response, CookieOptions } from "express";
import { UserService } from "../services/user.service";

const userService = new UserService();

const cookieOptions: CookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",   // Lowercase string literal, as required by CookieOptions
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
};


const sendToken = (
  res: Response,
  accessToken: string,
  refreshToken: string,
  user: any
) => {
  res.cookie("refreshToken", refreshToken, cookieOptions);

  return res.json({
    accessToken,
    user: {
      id: user._id,
      email: user.email,
      username: user.username,
    },
  });
};

export const registerUser = async (req: Request, res: Response) => {
  try {
    console.log("calling register..");
    const { user, accessToken, refreshToken } = await userService.registerUser(
      req.body
    );
    sendToken(res.status(201), accessToken, refreshToken, user);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { accessToken, refreshToken, user } = await userService.loginUser(
      req.body
    );
    sendToken(res, accessToken, refreshToken, user);
  } catch (error: any) {
    res.status(401).json({ error: error.message });
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken)
    return res.status(401).json({ error: "Refresh token missing" });

  try {
    const newAccessToken = await userService.refreshAccessToken(refreshToken);
    res.json({ accessToken: newAccessToken });
  } catch (error: any) {
    res.status(403).json({ error: error.message });
  }
};

export const logoutUser = async (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(400).json({ error: "Refresh token is missing" });
    }

    const username = req.body.username;
    await userService.logoutUser(username, refreshToken);

    res.clearCookie("refreshToken", cookieOptions);
    res.json({ message: "User logged out successfully" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
