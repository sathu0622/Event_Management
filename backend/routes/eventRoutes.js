const express = require("express");
const multer = require("multer");
const { createEvent, getAllEvents, getEventById, updateEvent, deleteEvent } = require("../controllers/eventController");

const router = express.Router();

// Multer Storage
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// Routes
router.post("/", upload.single("event_poster"), createEvent);
router.get("/events", getAllEvents);
router.get("/:id", getEventById);
router.put("/:id", upload.single("event_poster"), updateEvent);
router.delete("/events/:id", deleteEvent);

module.exports = router;
