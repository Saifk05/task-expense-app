import { z } from "zod";

export const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]),
  PORT: z.coerce.number().min(1),

  DATABASE_URL: z.string().min(1),

  JWT_SECRET: z.string().min(32),
  JWT_REFRESH_SECRET: z.string().min(32),

  JWT_EXPIRES_IN: z.string(),
  JWT_REFRESH_EXPIRES_IN: z.string(),

  CLOUDINARY_CLOUD_NAME: z.string().min(1),
  CLOUDINARY_API_KEY: z.string().min(1),
  CLOUDINARY_API_SECRET: z.string().min(1),
  
  OLA_MAPS_API: z.string().url(),
  OLAMAPS_KEY: z.string().min(10),
});
