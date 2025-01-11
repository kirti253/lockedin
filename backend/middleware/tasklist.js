const { tasklistModel } = require("../db"); // Assuming this is your Task model
const jwt = require("jsonwebtoken");

/**
 * Middleware to authenticate and validate task ownership
 */
async function taskMiddleware(req, res, next) {
  try {
    // Validate the token
    const token = req.headers.token;
    if (!token) {
      return res.status(401).json({ message: "Authorization token missing" });
    }

    const decoded = jwt.verify(token, process.env.JWT_USER_SECRET);
    if (!decoded) {
      return res.status(401).json({ message: "Invalid token" });
    }

    req.userId = decoded.id; // Attach the userId to the request object

    // Check if taskId exists in the request body
    const { taskId } = req.body;
    if (!taskId) {
      return res.status(400).json({ message: "Task ID is required" });
    }

    // Fetch the task from the database
    const task = await tasklistModel.findOne({
      _id: taskId,
      userId: req.userId,
    });
    if (!task) {
      return res
        .status(404)
        .json({ message: "Task not found or unauthorized" });
    }

    // Attach the task to the request object for later use
    req.task = task;

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error("Error in task middleware:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  taskMiddleware,
};
