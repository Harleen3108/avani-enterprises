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
        message: "Your session has expired. Please sign in again.",
      });
    }

    // 401, not 400 — matching the middleware in index.js. The request is
    // well-formed; the credential is not valid. The admin app only clears its
    // session on 401, so a 400 here strands the user on an error screen with a
    // dead token and no route back to the login page.
    return res.status(401).json({
      message: "Your session is no longer valid. Please sign in again.",
      error: err.message,
    });
  }
};

module.exports = auth;
