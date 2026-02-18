import dotenv from "dotenv";
import { SignOptions } from "jsonwebtoken";

dotenv.config();

const config = {
  nodeEnv: process.env.NODE_ENV || "development",
  servicePort: Number(process.env.PORT) || 5000,

  databaseUrl: process.env.DATABASE_URL || "",

  jwt: {
    secret: process.env.JWT_SECRET || "",
    refreshSecret: process.env.JWT_REFRESH_SECRET || "",
    expiresIn: (process.env.JWT_EXPIRES_IN || "15m") as SignOptions["expiresIn"],
    refreshExpiresIn: (process.env.JWT_REFRESH_EXPIRES_IN || "7d") as SignOptions["expiresIn"],
  },
};

export default config;
