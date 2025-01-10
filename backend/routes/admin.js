const { Router } = require("express");

const adminRouter = Router();

const { adminModel } = require("../db");

adminRouter.post("/signup", function (req, res) {
  res.json({
    message: "Signup endpoint",
  });
});

adminRouter.post("/signin", function (req, res) {
  res.json({
    message: "Signin endpoint",
  });
});

module.exports = {
  adminRouter: adminRouter,
};
