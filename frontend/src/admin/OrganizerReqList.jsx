import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const OrganizerReqList = () => {
  const [users, setUsers] = useState([]);
  const [registeredUsers, setRegisteredUsers] = useState([]); // State for registered users
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
    fetchRegisteredUsers();
  }, []);

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/organizer/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Fetch registered users
  const fetchRegisteredUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/auth/get");
      setRegisteredUsers(response.data); // Assuming response.data is an array of registered users
    } catch (error) {
      console.error("Error fetching registered users:", error);
    }
  };

  const handleAccept = (user) => {
    navigate("/org-register", { state: user });
  };

  const handleReject = async (userId) => {
    try {
      await axios.delete(`http://localhost:5000/api/organizer/users/${userId}`);
      setUsers(users.filter((user) => user._id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h3 className="text-2xl font-semibold mb-4">Organizer List</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-left">Phone</th>
              <th className="py-3 px-6 text-center">Document</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm font-light">
            {users.map((user) => {
              const isRegistered = registeredUsers.some((regUser) => regUser.email === user.email);

              return (
                <tr key={user._id} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left whitespace-nowrap">{user.name}</td>
                  <td className="py-3 px-6 text-left">{user.email}</td>
                  <td className="py-3 px-6 text-left">{user.phone}</td>
                  <td className="py-3 px-6 text-center">
                    {user.document && (
                      <>
                        <a
                          href={`http://localhost:5000/api/organizer/uploads/${user.document}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline mr-2"
                        >
                          View
                        </a>
                        <a
                          href={`http://localhost:5000/api/organizer/uploads/${user.document}`}
                          download
                          className="text-green-500 hover:underline"
                        >
                          Download
                        </a>
                      </>
                    )}
                  </td>
                  <td className="py-3 px-6 text-center">
                    {isRegistered ? (
                      <button
                        className="bg-gray-400 text-white py-1 px-3 rounded-md cursor-not-allowed"
                        disabled
                      >
                        Accepted
                      </button>
                    ) : (
                      <div className="flex gap-2 justify-center">
                        <button
                          onClick={() => handleAccept(user)}
                          className="bg-green-500 text-white py-1 px-3 rounded-md hover:bg-green-600"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => handleReject(user._id)}
                          className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600"
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </td>

                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrganizerReqList;
