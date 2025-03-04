const mongoose = require("mongoose");

const OrganizerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true},
  phone: { type: String },
  document: { type: String },
});

module.exports = mongoose.model("Organizer", OrganizerSchema);
