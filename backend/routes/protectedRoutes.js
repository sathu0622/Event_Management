const express = require("express");
const { authMiddleware, roleMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

// **User Route (Any Authenticated User)**
router.get("/user", authMiddleware, (req, res) => {
  res.json({ msg: "Welcome User", user: req.user });
});

// **Admin Route (Only Admins)**
router.get("/admin", authMiddleware, roleMiddleware("admin"), (req, res) => {
  res.json({ msg: "Welcome Admin", user: req.user });
});

module.exports = router;
