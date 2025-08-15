import { z } from "zod";

const envSchema = z.object({
  PORT: z.string().default("5000"),
  NODE_ENV: z.string().optional(),
  MONGO_URI: z.string().min(1),
  JWT_ACCESS_SECRET: z.string().min(30),
  JWT_REFRESH_SECRET: z.string().min(30),
  JWT_ACCESS_EXPIRES: z.string().default("15m"),
  JWT_REFRESH_EXPIRES: z.string().default("7d"),
});

export const env = envSchema.parse(process.env);