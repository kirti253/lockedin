const { config } = require("dotenv");
config();
const express = require("express");
const app = express();
app.use(express.json());
const mongoose = require("mongoose");
const { healthcheckrouter } = require("./routes/healthcheck");
app.use("/", healthcheckrouter);
app.use(express.urlencoded({ extended: true }));
const { userRouter } = require("./routes/user");
const { adminRouter } = require("./routes/admin");
const { tasklistRouter } = require("./routes/tasklist");
const cors = require("cors");
app.use(
  cors({
    origin: "https://timer-clk3vfe32-kirtis-projects-806ba19e.vercel.app",
    methods: ["POST", "GET", "DELETE"],
    credentials: true,
  })
);
app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/tasklist", tasklistRouter);
(async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URL || "mongodb://localhost:27017"
    );
    console.log("Database connected successfully");

    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Server started at http://localhost:${port}`);
    });
  } catch (err) {
    console.error("Error starting server:", err);
  }
})();
