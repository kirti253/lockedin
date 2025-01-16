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
    res.status(403).json({
      message: "email already exists",
      error: err.message,
    });
  }
});
userRouter.post("/signin", async function (req, res) {
  const requireBody = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  const parseDataWithSuccess = requireBody.safeParse(req.body);
  if (!parseDataWithSuccess.success) {
    return res.status(400).json({
      message: "Incorrect data format",
    });
  }

  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: "Incorrect credentials",
      });
    }

    const passwordMatched = await bcrypt.compare(password, user.password);
    if (!passwordMatched) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_USER_SECRET
    );

    res.status(200).json({
      message: "Signin successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Signin error:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
});

module.exports = {
  userRouter: userRouter,
};
