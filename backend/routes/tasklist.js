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
    description: z.string().min(3).max(1000),
    startTime: z.string().datetime({ offset: true }),
    stopTime: z.string().datetime({ offset: true }),
  });
  const parseResult = tasklistSchema.safeParse(req.body);
  if (!parseResult.success) {
    return res.status(400).json({
      message: "Incorrect data format",
      error: parseResult.error.errors,
    });
  }
  const { title, description, startTime, stopTime } = parseResult.data;
  try {
    const start = new Date(startTime);
    const stop = new Date(stopTime);
    if (start >= stop) {
      return res.status(400).json({
        message: "stop time must after start",
      });
    }
    const duration = Math.floor((stop - start) / 1000);
    const task = await tasklistModel.create({
      userId: req.userId,
      title,
      description,
      startTime: start,
      stopTime: stop,
      duration,
    });
    res.status(201).json({
      message: "Task created successfully",
      task,
    });
  } catch (error) {
    console.error("error creating task :", error);
    res.status(500).json({ message: "internal server rerror" });
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
      description: task.description,
      startTime: task.startTime,
      stopTime: task.stopTime,
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
module.exports = {
  tasklistRouter: tasklistRouter,
};
