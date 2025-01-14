const { Router } = require("express");
const tasklistRouter = Router();
const { userModel, tasklistModel } = require("../db");
const { userMiddleware } = require("../middleware/user");
const { taskMiddleware } = require("../middleware/tasklist");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { z } = require("zod");

tasklistRouter.post("/task", userMiddleware, async function (req, res) {
  const tasklistSchema = z.object({
    title: z.string().min(3).max(100),

    duration: z.number().min(1),
  });
  const parseResult = tasklistSchema.safeParse(req.body);
  if (!parseResult.success) {
    return res.status(400).json({
      message: "Incorrect data format",
      error: parseResult.error.errors,
    });
  }
  const { title, duration } = parseResult.data;
  try {
    const task = await tasklistModel.create({
      userId: req.userId,
      title,
      duration,
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
tasklistRouter.get("/list", taskMiddleware, async function (req, res) {
  try {
    const tasks = await tasklistModel.find({
      userId: req.userId,
    });

    const tasklisted = tasks.map((task) => ({
      userId: req.userId,
      title: task.title,
      duration: task.duration,
      createdDate: task.createDate,
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

tasklistRouter.delete("/deletetask", taskMiddleware, async (req, res) => {
  try {
    await tasklistModel.deleteOne({ _id: req.task._id });
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
tasklistRouter.put("/update", taskMiddleware, async function (req, res) {
  const requireBody = z.object({
    taskId: z.string().min(5),
    title: z.string().min(5),
  });
  const parseResult = requireBody.safeParse(req.body);
  if (!parseResult.success) {
    return res.status(400).json({
      message: "Incorrect data format",
      error: parseResult.error.errors,
    });
  }

  const { taskId, title } = req.body;
  const task = await tasklistModel.updateMany(
    {
      _id: taskId,
    },
    {
      title: title || task.title,
    }
  );
  res.status(200).json({
    message: "task updated",
  });
});
module.exports = {
  tasklistRouter: tasklistRouter,
};
