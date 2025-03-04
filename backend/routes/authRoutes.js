const express = require("express");
const { registerUser, loginUser, registerOrganizer, getUser, getUserId, changePassword } = require("../controllers/authController");

const router = express.Router();

// Register Route
router.post("/register", registerUser);

// Login Route
router.post("/login", loginUser);

//organizer 
router.post("/org_register", registerOrganizer);

//getuserbyid
router.get("/get/:id",getUserId);

//get all user
router.get("/get",getUser);

//change password
router.put("/change-password/:id", changePassword);

module.exports = router;

