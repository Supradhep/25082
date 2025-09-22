const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    // Handle "Bearer <token>" or just "<token>"
    const cleanedToken = token.startsWith("Bearer ")
      ? token.slice(7).trim()
      : token.trim();

    const decoded = jwt.verify(cleanedToken, process.env.JWT_SECRET);

    req.user = decoded.user; // ✅ user: { id: ... } from payload
    next();
  } catch (err) {
    return res.status(401).json({ msg: "Token is not valid" });
  }
};
