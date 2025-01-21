const { Router } = require("express");

const healthcheckrouter = Router();

healthcheckrouter.get("/", async (_req, res) => {
  try {
    res.status(200).json({
      message: "OK",
    });
  } catch (error) {
    console.error("Healthcheck error:", error);
    res.status(503).json({
      message: "Service Unavailable",
      error: error.message,
    });
  }
});

module.exports = { healthcheckrouter };
