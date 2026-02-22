import { Router } from "express";
import authMiddleware from "../../lib/middleware/auth.middleware";
import { TaskRepository } from "./task.repository";
import { TaskService } from "./task.service";
import { TaskController } from "./task.controller";

const router = Router();

const taskRepository = new TaskRepository();
const taskService = new TaskService(taskRepository);
const taskController = new TaskController(taskService);

router.use(authMiddleware);

router.post("/task/create-task", taskController.createTask);

router.patch("/task/:id", taskController.updateTask);

router.get("/task", taskController.getTasks);

router.post("/task/category", taskController.createTaskCategory);

router.get("/task/category", taskController.getTaskCategories);

export default router;