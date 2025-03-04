import { useContext } from "react";
import { AuthContext } from "../components/AuthContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!user) {
    return <p className="text-center mt-10">Please log in.</p>;
  }

  return (
        <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-2xl font-semibold mb-4">
            Welcome, {user.role === "admin" ? "Admin" : user.role === "organizer" ? "Organizer" : "Attendee"}!
        </h2>
        <p>Your ID: {user.id}</p>
        <button onClick={() => { logout(); navigate("/login"); }} className="mt-4 bg-red-500 text-white p-2 rounded">
            Logout
        </button>
        </div>

  );
};

export default Dashboard;
