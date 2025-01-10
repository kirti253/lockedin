const { Router } = require("express");

const healthcheckrouter = Router();

healthcheckrouter.get("/", async (_req, res) => {
  const healthcheck = {
    message: "OK",
  };

  try {
    res.status(200).json(healthcheck);
  } catch (error) {
    console.error("Healthcheck error:", error);
    res.status(503).json({
      ...healthcheck,
      message: "Service Unavailable",
      error: error.message,
    });
  }
});

module.exports = { healthcheckrouter };
