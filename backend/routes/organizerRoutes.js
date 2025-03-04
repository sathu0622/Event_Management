const express = require("express");
const multer = require("multer");
const path = require("path");
const Organizer = require("../models/OrganizerReq"); // Fixed model import
const router = express.Router();

// Multer storage for PDF uploads
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Create Organizer
router.post("/users", upload.single("document"), async (req, res) => {
  try {
    const { name, email, phone} = req.body;
    const document = req.file ? req.file.filename : null;
    const newOrganizer = new Organizer({ name, email, phone, document });
    await newOrganizer.save();
    res.status(201).json(newOrganizer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get All Organizers
router.get("/users", async (req, res) => {
  try {
    const organizers = await Organizer.find();
    res.json(organizers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Organizer by ID
router.get("/users/:id", async (req, res) => {
  try {
    const organizer = await Organizer.findById(req.params.id);
    if (!organizer) return res.status(404).json({ message: "User not found" });
    res.json(organizer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update Organizer
router.put("/users/:id", upload.single("document"), async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const document = req.file ? req.file.filename : req.body.document;
    const updatedOrganizer = await Organizer.findByIdAndUpdate(
      req.params.id,
      { name, email, phone, document },
      { new: true }
    );
    res.json(updatedOrganizer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete Organizer
router.delete("/users/:id", async (req, res) => {
  try {
    await Organizer.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
