import express from "express";
import cors from "cors";
import helmet from "helmet";
import routes from "./routes";

export const app = express();

// Middlewares
app.use(cors());
app.use(helmet());
app.use(express.json());

// Routes
app.use("/api", routes);
