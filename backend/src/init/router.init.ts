import { Router } from "express";
import authRoutes from "../modules/auth/auth.routes";
import taskRoutes from "../modules/tasks/task.routes";
import userRoutes from "../modules/users/user.routes";
import notificationRoutes from "../modules/notification/notification.routes"; 
import productivityRoutes from "../modules/productivity/productivity.routes";
import taskDashboardRoutes from "../modules/task-dashboard/task-dashboard.route";
import categoryRoutes from "../modules/expenses/expense.routes"
import accountRoutes from "../modules/account/account.routes";
import transactionRoutes from "../modules/transaction/transaction.routes";


const router = Router();

router.get("/ping", (_req, res) => {
  res.json({ message: "API working" });
});


router.use(authRoutes);
router.use(taskRoutes);
router.use(userRoutes); 
router.use(notificationRoutes);
router.use(productivityRoutes);
router.use(taskDashboardRoutes);
router.use(categoryRoutes);
router.use(accountRoutes);
router.use(transactionRoutes);


export default router;
