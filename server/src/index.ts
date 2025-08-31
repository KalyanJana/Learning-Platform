import express, { Application, Request, Response } from "express";
import { connectDB } from "./config/db";
import routes from "./routes/index";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import Razorpay from "razorpay";
import bodyParser from "body-parser";

interface CreateOrderRequest {
  amount: number; // in paise
}

// Load environment variables
dotenv.config();

const app: Application = express();

// Convert PORT env var string to number with fallback
const port: number = process.env.PORT ? Number(process.env.PORT) : 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.json());

// Enable CORS with credentials and restrict origin if needed
app.use(
  cors({
    origin: "http://localhost:5173", // your frontend URL (adjust accordingly)
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID, // Replace with your Razorpay Key ID
  key_secret: process.env.RAZORPAY_KEY_SECRET, // Replace with your Razorpay Key Secret
});

// Register routes
app.use("/api", routes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, World!");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  connectDB();
});
