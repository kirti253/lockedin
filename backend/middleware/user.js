const jwt = require("jsonwebtoken");

function userMiddleware(req, res, next) {
  const token = req.headers.token;
  const decode = jwt.verify(token, process.env.JWT_USER_SECRET);

  if (decode) {
    req.userId = decode.id;
    next();
  } else
    res.status(403).json({
      message: "you r not signed in",
    });
}

module.exports = {
  userMiddleware: userMiddleware,
};
