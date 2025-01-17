const { config } = require("dotenv");
config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routers
const { healthcheckrouter } = require("./routes/healthcheck");
const { userRouter } = require("./routes/user");
const { adminRouter } = require("./routes/admin");
const { tasklistRouter } = require("./routes/tasklist");

// CORS Configuration
app.use(
  cors({
    origin: "https://frontend-9sxidkkn2-kirtis-projects-806ba19e.vercel.app",
    methods: ["POST", "GET", "DELETE"],
    credentials: true,
  })
);

// Routes
app.use("/", healthcheckrouter);
app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/tasklist", tasklistRouter);

// MongoDB Connection
(async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URL || "mongodb://localhost:27017",
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
    console.log("Database connected successfully");
  } catch (err) {
    console.error("Error connecting to database:", err);
  }
})();

// Export for Vercel
module.exports = app;
