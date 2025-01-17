const { Router } = require("express");
const tasklistRouter = Router();
const { tasklistModel } = require("../db");
const { authMiddleware } = require("../middleware/auth");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { z } = require("zod");

tasklistRouter.post("/task", authMiddleware, async function (req, res) {
  const tasklistSchema = z.object({
    title: z.string().min(3).max(100),
    duration: z.string().min(1),
    date: z.string().min(1),
  });
  const parseResult = tasklistSchema.safeParse(req.body);
  if (!parseResult.success) {
    return res.status(400).json({
      message: "Incorrect data format",
      error: parseResult.error.errors,
    });
  }
  const { title, duration, date } = parseResult.data;
  try {
    const task = await tasklistModel.create({
      userId: req.userId,
      title,
      duration,
      date,
    });
    res.status(201).json({
      message: "Task created successfully",
      task,
    });
  } catch (error) {
    console.error("error creating task :", error);
    res.status(500).json({ message: "internal server error" });
  }
});
tasklistRouter.get("/list", authMiddleware, async function (req, res) {
  try {
    const tasks = await tasklistModel.find({
      userId: req.userId,
    });

    const tasklisted = tasks.map((task) => ({
      userId: req.userId,
      title: task.title,
      duration: task.duration,
      createdDate: task.createdAt,
      date: task.date,
    }));
    res.status(200).json({
      message: "task fetched successfully",
      tasks: tasklisted,
    });
  } catch (error) {
    console.error("Error fetching tasks:", error);

    res.status(500).json({ message: "Internal server error" });
    console.log(error);
  }
});

tasklistRouter.delete("/deletetask", authMiddleware, async (req, res) => {
  const { taskId } = req.body;
  console.log(taskId);
  if (!taskId) {
    return res.status(400).json({ message: "Task ID is required" });
  }

  const task = await tasklistModel.findOne({
    _id: taskId,
    userId: req.userId,
  });

  if (!task) {
    return res.status(404).json({ message: "Task not found or unauthorized" });
  }

  req.task = task;

  try {
    await tasklistModel.deleteOne({ _id: req.task._id });
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
tasklistRouter.put("/update", authMiddleware, async function (req, res) {
  // Validate the request body using zod
  const requireBody = z.object({
    taskId: z.string().min(5, "Task ID must be at least 5 characters long"),
    title: z.string().min(5, "Title must be at least 5 characters long"),
  });

  const parseResult = requireBody.safeParse(req.body);
  if (!parseResult.success) {
    return res.status(400).json({
      message: "Incorrect data format",
      error: parseResult.error.errors,
    });
  }

  const { taskId, title } = req.body;

  try {
    // Find and update the task in one operation
    const updatedTask = await tasklistModel.findOneAndUpdate(
      { _id: taskId, userId: req.userId }, // Match conditions
      { title }, // Update title
      { new: true } // Return the updated task
    );

    // If the task is not found or unauthorized
    if (!updatedTask) {
      return res
        .status(404)
        .json({ message: "Task not found or unauthorized" });
    }

    // Respond with success and the updated task
    return res.status(200).json({
      message: "Task updated successfully",
      task: updatedTask,
    });
  } catch (error) {
    console.error("Error updating task:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = {
  tasklistRouter: tasklistRouter,
};
