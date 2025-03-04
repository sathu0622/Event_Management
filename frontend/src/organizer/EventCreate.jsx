import { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../attendee/components/AuthContext";
import { useNavigate } from "react-router-dom";

const EventCreate = () => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    event_title: "",
    venue: "",
    event_description: "",
    speaker_name: "",
    attendee_capacity: "",
    date: "",
    time: "",
    event_type: "",
    price: "",
  });
  const [image, setImage] = useState(null);
  const [enableTicketTypes, setEnableTicketTypes] = useState(false);
  const [tickets, setTickets] = useState([]);
  const navigate = useNavigate();

  const categories = ["Conference", "Workshop", "Concert", "Meetup", "Sports"];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleTicketTypeToggle = () => {
    setEnableTicketTypes(!enableTicketTypes);
    if (!enableTicketTypes) {
      setTickets([]); // Reset tickets if disabled
    }
  };

  const handleAddTicket = () => {
    setTickets([...tickets, { type: "", price: "" }]);
  };

  const handleTicketChange = (index, field, value) => {
    const updatedTickets = [...tickets];
    updatedTickets[index][field] = value;
    setTickets(updatedTickets);
  };

  const handleRemoveTicket = (index) => {
    const updatedTickets = tickets.filter((_, i) => i !== index);
    setTickets(updatedTickets);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("User not authenticated");
      return;
    }

    const data = new FormData();
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));
    if (image) data.append("event_poster", image);
    data.append("user_id", user.id);

    if (enableTicketTypes) {
      data.append("tickets", JSON.stringify(tickets)); // Convert tickets array to JSON
    }

    try {
      await axios.post("http://localhost:5000/api/", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Event created successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-50 shadow-lg rounded-lg border border-gray-200">
      <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">Create Event</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 2 Column Layout for Event Title, Venue, and Event Type */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <input
              type="text"
              name="event_title"
              placeholder="Event Title"
              onChange={handleChange}
              className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            <input
              type="text"
              name="venue"
              placeholder="Venue"
              onChange={handleChange}
              className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div className="space-y-2">
            <select
              name="event_type"
              onChange={handleChange}
              className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <textarea
              name="event_description"
              placeholder="Description"
              onChange={handleChange}
              className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              rows="4"
              required
            />
          </div>
        </div>

        {/* 2 Column Layout for Date, Time, Speaker Name, and Capacity */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <input
              type="text"
              name="speaker_name"
              placeholder="Speaker Name"
              onChange={handleChange}
              className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="number"
              name="attendee_capacity"
              placeholder="Attendee Capacity"
              onChange={handleChange}
              className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="space-y-2">
            <input
              type="date"
              name="date"
              onChange={handleChange}
              className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            <input
              type="time"
              name="time"
              onChange={handleChange}
              className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
        </div>

        {/* Enable Ticket Types Toggle */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={enableTicketTypes}
            onChange={handleTicketTypeToggle}
            className="w-6 h-6"
          />
          <label className="text-sm text-gray-700">Enable Multiple Ticket Types</label>
        </div>

        {/* Ticket Types Section */}
        {enableTicketTypes ? (
          <div className="space-y-4">
            {tickets.map((ticket, index) => (
              <div key={index} className="flex space-x-4">
                <input
                  type="text"
                  placeholder="Ticket Type"
                  value={ticket.type}
                  onChange={(e) => handleTicketChange(index, "type", e.target.value)}
                  className="w-1/2 p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
                <input
                  type="number"
                  placeholder="Price"
                  value={ticket.price}
                  onChange={(e) => handleTicketChange(index, "price", e.target.value)}
                  className="w-1/3 p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => handleRemoveTicket(index)}
                  className="bg-red-500 text-white p-2 rounded-lg shadow-sm hover:bg-red-600 transition"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddTicket}
              className="w-full bg-green-500 text-white p-4 rounded-lg shadow-sm hover:bg-green-600 transition"
            >
              + Add Ticket Type
            </button>
          </div>
        ) : (
          <input
            type="number"
            name="price"
            placeholder="Price"
            onChange={handleChange}
            className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        )}

        {/* File Upload and Submit */}
        <input
          type="file"
          onChange={handleImageChange}
          className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-4 rounded-lg shadow-sm hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default EventCreate;
