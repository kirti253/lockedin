const jwt = require("jsonwebtoken");

function userMiddleware(req, res, next) {
	const token = req.headers.token;

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
}

module.exports = { userMiddleware };
