const { tasklistModel } = require("../db");
const jwt = require("jsonwebtoken");

async function taskMiddleware(req, res, next) {
  try {
    const token = req.headers.token;
    if (!token) {
      return res.status(401).json({ message: "Authorization token missing" });
    }

    const decoded = jwt.verify(token, process.env.JWT_USER_SECRET);
    if (!decoded) {
      return res.status(401).json({ message: "Invalid token" });
    }

    req.userId = decoded.id;

    const { taskId } = req.body;
    if (!taskId) {
      return res.status(400).json({ message: "Task ID is required" });
    }

    const task = await tasklistModel.findOne({
      _id: taskId,
      userId: req.userId,
    });
    if (!task) {
      return res
        .status(404)
        .json({ message: "Task not found or unauthorized" });
    }

    req.task = task;

    next();
  } catch (error) {
    console.error("Error in task middleware:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  taskMiddleware,
};
