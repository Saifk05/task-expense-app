import * as http from "http";
import express from "express";
import cors from "cors";
import helmet from "helmet";

import config from "./config/env.config";
import { connectDB } from "./init/db.init";
import routerInit from "./init/router.init";
import logger from "./lib/logger";
import errorHandler from "./lib/errors/error-handler";

const app = express();

/**
 * -------------------------
 * Global Middlewares
 * -------------------------
 */
app.use(cors({ origin: "*" }));
app.use(helmet());
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true }));
app.disable("etag");

/**
 * -------------------------
 * Health Check
 * -------------------------
 */
app.get("/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is healthy 🚀",
  });
});

/**
 * -------------------------
 * API Routes
 * -------------------------
 */
app.use("/v1/api", routerInit);

/**
 * -------------------------
 * Global Error Handler
 * -------------------------
 */
app.use(errorHandler);

const port = Number(config.servicePort) || 5000;
const server = http.createServer(app);

/**
 * -------------------------
 * Server Error Handling
 * -------------------------
 */
server.on("error", (error: any) => {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string" ? `Pipe ${port}` : `Port ${port}`;

  switch (error.code) {
    case "EADDRINUSE":
      logger.error(`${bind} is already in use`);
      process.exit(1);
      break;
    case "EACCES":
      logger.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    default:
      throw error;
  }
});

server.on("listening", () => {
  logger.info(`🚀 Server listening on port ${port}`);
});

/**
 * -------------------------
 * Bootstrap Application
 * -------------------------
 */
(async () => {
  try {
    await connectDB();
    server.listen(port);
  } catch (err: any) {
    logger.error(`Server startup failed: ${err.message}`);
    process.exit(1);
  }
})();

export default app;
