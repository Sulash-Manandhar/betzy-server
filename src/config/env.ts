import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  PORT: z.coerce.number().default(5250),
  DATABASE_URL: z.url(),
  LOG_LEVEL: z.enum(["error", "warn", "info", "debug"]).default("info"),
  CORS_HOSTS: z.string().default("http://localhost:3000"),
  FRONTEND_URL: z.string().default("http://localhost:3000"),
  REFERRAL_SECRET: z.string(),
  NODEMAILER_EMAIL: z.string(),
  NODEMAILER_PASS: z.string(),
  CLERK_PUBLISHABLE_KEY: z.string(),
  CLERK_SECRET_KEY: z.string(),
  NOWPAYMENT_API: z.string(),
  NOWPAYMENT_API_KEY: z.string(),
  NOWPAYMENT_IPN_KEY: z.string(),
  NOWPAYMENT_PUBLIC_KEY: z.string(),
  NOWPAYMENT_EMAIL: z.string(),
  NOWPAYMENT_PASSWORD: z.string(),
  ENABLE_ROUTE_LOGGER: z.coerce.boolean().default(false),
});

function validateEnv() {
  try {
    return envSchema.parse(process.env);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("❌ Invalid environment variables:");
      error.issues.forEach((err, index) => {
        console.error(`${++index}.  ${err.path.join(".")}: ${err.message}`);
      });
      process.exit(1);
    }
    throw error;
  }
}

export const env = validateEnv();
