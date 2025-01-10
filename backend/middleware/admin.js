const jwt = require("jsonwebtoken");

function adminMiddleware(req, res, next) {
  const token = req.headers.token;
  console.log(process.env.JWT_ADMIN_SECRET);
  const decode = jwt.verify(token, process.env.JWT_ADMIN_SECRET);

  if (decode) {
    req.userId = decode.id;
    next();
  } else
    res.status(403).json({
      message: "you r not signed in",
    });
}

module.exports = {
  adminMiddleware: adminMiddleware,
};
