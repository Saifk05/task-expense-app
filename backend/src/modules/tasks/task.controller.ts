import { Response, NextFunction } from "express";
import { AuthRequest } from "../../lib/middleware/auth.middleware";
import { TaskService } from "./task.service";
import { createTaskSchema } from "./task.validation";
import { updateTaskSchema } from "./task.validation";
import { getTasksSchema } from "./task.validation";

export class TaskController {
  private taskService: TaskService;

  constructor(taskService: TaskService) {
    this.taskService = taskService;
  }

  createTask = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const parsed = createTaskSchema.parse(req.body);

      const task = await this.taskService.createTask({
        ...parsed,
        userId: req.user!.userId,
      });

      res.status(201).json({
        success: true,
        data: task,
      });
    } catch (error) {
      next(error);
    }
  };


updateTask = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    // Validate request body
    const parsed = updateTaskSchema.parse(req.body);

    const taskIdParam = req.params.id;

    if (!taskIdParam || Array.isArray(taskIdParam)) {
    return res.status(400).json({
        success: false,
        message: "Invalid task ID",
    });
    }

    const taskId = taskIdParam;

    const updatedTask = await this.taskService.updateTask(
      taskId,
      req.user!.userId,
      parsed
    );

    res.status(200).json({
      success: true,
      data: updatedTask,
    });
  } catch (error) {
    next(error);
  }
};  

getTasks = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const parsed = getTasksSchema.parse(req.query);

    const result = await this.taskService.getTasks({
      userId: req.user!.userId,
      limit: parsed.limit ?? 5,
      cursor: parsed.cursor,
      status: parsed.status,
      priority: parsed.priority,
      startFrom: parsed.startFrom,
      startTo: parsed.startTo,
      dueFrom: parsed.dueFrom,
      dueTo: parsed.dueTo,
    });

    res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    next(error);
  }
};

}