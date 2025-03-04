const Event = require("../models/Event");

// Create Event
exports.createEvent = async (req, res) => {
  try {
    const { event_title, venue, event_description, speaker_name, attendee_capacity, date, user_id, event_type, price, time, tickets } = req.body;
    const event_poster = req.file ? req.file.path : "";

    const eventData = new Event({
      event_title,
      venue,
      event_description,
      speaker_name,
      attendee_capacity,
      event_poster,
      date,
      time,
      user_id,
      event_type,
      price,
      tickets: JSON.parse(tickets),
    });

    // if (tickets && Array.isArray(tickets) && tickets.length > 0) {
    //   eventData.tickets = tickets;
    // }

    const event = new Event(eventData);
    await event.save();
    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get All Events
exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Single Event
exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ error: "Event not found" });
    res.json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update Event
exports.updateEvent = async (req, res) => {
  try {
    const updatedData = { ...req.body };
    if (req.file) updatedData.event_poster = req.file.path;

    const event = await Event.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    if (!event) return res.status(404).json({ error: "Event not found" });

    res.json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete Event
exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) return res.status(404).json({ error: "Event not found" });

    res.json({ message: "Event deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
