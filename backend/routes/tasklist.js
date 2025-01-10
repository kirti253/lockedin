const { Router } = require("express");
const tasklistRouter = Router();
const { userModel, tasklistModel } = require("../db");

tasklistRouter.post("/task", function (res, req) {
  res.json({
    message: "task endpoint",
  });
});

module.exports = {
  tasklistRouter: tasklistRouter,
};
