import winston from "winston";
import { env } from "../../config/environments";

const { combine, timestamp, printf, colorize, json } = winston.format;

const isProduction = env.NODE_ENV === "production";
const isTest = env.NODE_ENV === "test";

/**
 * Pretty format for development
 */
const devFormat = printf(({ level, message, timestamp }) => {
  return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
});

const logger = winston.createLogger({
  level: isTest ? "error" : "info",

  format: isProduction
    ? combine(timestamp(), json())
    : combine(colorize(), timestamp(), devFormat),

  transports: [
    new winston.transports.Console({
      silent: isTest, // Completely silent in test if needed
    }),
  ],
});

export default logger;
