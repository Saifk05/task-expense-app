import { prisma } from "./prisma.init";
import logger from "../lib/logger";

export const connectDB = async () => {
  try {
    await prisma.$connect();
    logger.info("Database connected successfully");
  } catch (error) {
    logger.error("Database connection failed");
    process.exit(1);
  }
};
