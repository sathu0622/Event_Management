const mongoose = require("mongoose");

const TicketSchema = new mongoose.Schema({
  type: { type: String, required: true }, 
  price: { type: Number, required: true } 
});

const EventSchema = new mongoose.Schema({
  event_title: { type: String, required: true },
  venue: { type: String, required: true },
  event_description: { type: String, required: true },
  speaker_name: { type: String },
  attendee_capacity: { type: String },
  event_poster: { type: String },
  date: { type: String },
  time: { type: String },
  event_type: { type: String },
  price: { type: String }, 
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  tickets: { type: [TicketSchema], default: [] } 
});

module.exports = mongoose.model("Event", EventSchema);
