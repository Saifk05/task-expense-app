import { Router } from "express";

const router = Router();

router.get("/ping", (_req, res) => {
  res.json({ message: "API working 🚀" });
});

export default router;
