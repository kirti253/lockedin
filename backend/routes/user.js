const { Router } = require("express");
const { userModel } = require("../db");

const userRouter = Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const z = require("zod");

userRouter.post("/signup", async function (req, res) {
  const requireBody = z.object({
    username: z.string().min(3).max(100),
    email: z.string().min(3).max(100).email(),
    password: z.string().min(3).max(100),
  });

  const parseDataSuccsess = requireBody.safeParse(req.body);
  if (!parseDataSuccsess.success) {
    return res.json({
      message: "incorrect format",
      error: parseDataSuccsess.error,
    });
  }

  const { username, email, password } = req.body;
  const hassPassword = await bcrypt.hash(password, 10);
  try {
    await userModel.create({
      username: username,
      email: email,
      password: hassPassword,
    });
    res.json({
      message: "user created successfully",
    });
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({
      message: "Internal server error",
      error: err.message,
    });
  }
});
userRouter.post("signin", async function (req, res) {
  const requireBody = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });
  const parseDataWithSuccsess = requireBody.safeParse(req.body);

  if (!parseDataWithSuccsess.success) {
    return res.json({
      message: "incorrect data format",
      error: parseDataWithSuccsess.error,
    });
  }
  const { email, password } = req.body;
  const user = await userModel.findOne({
    email: email,
  });
  if (!user) {
    return res.status(403).json({
      message: "incorrect credential!",
    });
  }
  const passwordMatched = await bcrypt.compare(password, user.password);
  if (passwordMatched) {
    const token = jwt.sign(
      {
        id: user._id,
      },
      JWT_USER_PASSWORD
    );
  } else {
    res.status(403).json({
      message: "invalid ceredential",
    });
  }
});

module.exports = {
  userRouter: userRouter,
};
