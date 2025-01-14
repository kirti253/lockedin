const jwt = require("jsonwebtoken");

function userMiddleware(req, res, next) {
	const token = req.headers.token; // Extract token from headers

	if (!token) {
		return res.status(403).json({ message: "No token provided" });
	}

	try {
		const decode = jwt.verify(token, process.env.JWT_USER_SECRET);
		req.userId = decode.id;
		next();
	} catch (error) {
		console.error("JWT Error:", error.message);
		res.status(403).json({ message: "Invalid or expired token" });
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

module.exports = { userMiddleware };
