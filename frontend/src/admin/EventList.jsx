import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../attendee/components/AuthContext";
import { FaEye, FaTrash } from 'react-icons/fa';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const { user } = useContext(AuthContext);
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 5; // Change this to increase/decrease events per page

  useEffect(() => {
    if (!user) return;

    axios.get("http://localhost:5000/api/events")
      .then((response) => setEvents(response.data.reverse())) // Reverse to show latest events first
      .catch((error) => console.error(error));
  }, [user]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/events/${id}`);
      setEvents(events.filter(event => event._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleView = (event) => {
    setSelectedEvent(event);
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
  };

  // Pagination Logic
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);
  const totalPages = Math.ceil(events.length / eventsPerPage);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-semibold text-indigo-600 mb-6">Event List</h1>
      <Link to="/event-create" className="bg-blue-600 text-white px-6 py-2 rounded-lg mb-6 inline-block shadow-md hover:bg-blue-700 transition duration-300">
        Create Event
      </Link>
      
      <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="px-6 py-3 text-left">Poster</th>
              <th className="px-6 py-3 text-left">Title</th>
              <th className="px-6 py-3 text-left">Date</th>
              <th className="px-6 py-3 text-left">Time</th>
              <th className="px-6 py-3 text-left">Venue</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentEvents.map(event => (
              <tr key={event._id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4">
                  <img src={`http://localhost:5000/${event.event_poster}`} alt="Event Poster" className="w-20 h-20 object-cover rounded-lg shadow-md" />
                </td>
                <td className="px-6 py-4 text-gray-800">{event.event_title}</td>
                <td className="px-6 py-4">{event.date}</td>
                <td className="px-6 py-4">{event.time}</td>
                <td className="px-6 py-4">{event.venue}</td>
                <td className="px-6 py-4 flex space-x-2">
                  <button onClick={() => handleView(event)} className="bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700 shadow-md">
                    <FaEye />
                  </button>
                  <button onClick={() => handleDelete(event._id)} className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700 shadow-md">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4 space-x-4">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className={`px-6 py-2 rounded-lg ${currentPage === 1 ? "bg-gray-300" : "bg-blue-600 text-white hover:bg-blue-700"}`}
        >
          Previous
        </button>
        <span className="text-lg font-semibold text-gray-700">Page {currentPage} of {totalPages}</span>
        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className={`px-6 py-2 rounded-lg ${currentPage === totalPages ? "bg-gray-300" : "bg-blue-600 text-white hover:bg-blue-700"}`}
        >
          Next
        </button>
      </div>

      {/* Modal for event details */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl w-1/2 max-w-3xl">
            <h2 className="text-3xl font-bold text-indigo-600 mb-6">Event Details</h2>
            <div className="space-y-4 text-gray-800">
              <p><strong>Title:</strong> {selectedEvent.event_title}</p>
              <p><strong>Event Type:</strong> {selectedEvent.event_type}</p>
              <p><strong>Venue:</strong> {selectedEvent.venue}</p>
              <p><strong>Date:</strong> {selectedEvent.date}</p>
              <p><strong>Time:</strong> {selectedEvent.time}</p>
              <p><strong>Speaker:</strong> {selectedEvent.speaker_name || "N/A"}</p>
              <p><strong>Attendee Capacity:</strong> {selectedEvent.attendee_capacity}</p>
              <p><strong>Description:</strong> {selectedEvent.event_description}</p>

              {selectedEvent.tickets.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-xl font-semibold text-indigo-600">Ticket Types</h3>
                  <ul className="list-disc pl-6 mt-2">
                    {selectedEvent.tickets.map((ticket, index) => (
                      <li key={index}><strong>{ticket.type}:</strong> Rs: {ticket.price}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className="mt-6 flex justify-end">
              <button onClick={handleCloseModal} className="bg-gray-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-gray-700">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventList;
