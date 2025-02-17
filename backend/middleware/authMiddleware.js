const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ msg: "No token, authorization denied" });

  try {
    const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Invalid token" });
  }
};

const roleMiddleware = (role) => (req, res, next) => {
  if (req.user.role !== role) return res.status(403).json({ msg: "Access denied" });
  next();
};

module.exports = { authMiddleware, roleMiddleware };
