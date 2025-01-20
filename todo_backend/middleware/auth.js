const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).json({
      error: "Authentication required",
      message: "No token provided",
    });
  }

  const token = authHeader.startsWith("Bearer ")
    ? authHeader.slice(7)
    : authHeader;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id }; // ✅ Ensure this is correct
    next();
  } catch (error) {
    return res.status(401).json({
      error: "Invalid token",
      message: error.message,
    });
  }
};

module.exports = authenticate;
