const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }

  try {
    // Verify token
    const decode = jwt.verify(token, process.env.JWT_USER_SECRET);

    // Attach userId to request object
    req.userId = decode.id;
    next();
  } catch (error) {
    console.error("JWT Error:", error.message); // Log the error message for debugging
    return res.status(403).json({ message: "Invalid or expired token" });
  }
}
module.exports = { authMiddleware };
