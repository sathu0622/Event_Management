const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone:{ type : String },
  document:{ type : String },
  role: { type: String, enum: ["attendee", "admin", "organizer"], default: "attendee" },
  firstLogin: { type: Boolean, default: true },
  permission:{type: Boolean, default: "false"}
});

module.exports = mongoose.model("User", UserSchema);
