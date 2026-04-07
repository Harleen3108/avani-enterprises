const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({
      message: "Access Denied - No token provided",
    });
  }

  try {
    const tokenValue = token.replace("Bearer ", "");
    const verified = jwt.verify(tokenValue, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({
        message: "Token expired",
      });
    }

    return res.status(400).json({
      message: "Invalid Token",
      error: err.message,
    });
  }
};

module.exports = auth;
