import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../attendee/components/AuthContext";

const ChangePassword = () => {
  const { user } = useContext(AuthContext);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const handleChangePassword = async () => {
    // Validate that new password and confirm password match
    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match.");
      setShowConfirmModal(false);
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:5000/api/auth/change-password/${user.id}`,
        { oldPassword, newPassword }
      );

     setMessage(response.data.msg);
      setShowConfirmModal(false);
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setError("");
    } catch (error) {
      // If the old password is incorrect, show the error modal
      if (error.response?.status === 400) {
        setError(error.response?.data?.msg || "Bad request. Please check the input.");
        setShowConfirmModal(false);
      } else if (error.response?.status === 401) {
        setError("The old password is incorrect.");
        setShowConfirmModal(false);
        setShowErrorModal(true);
      } else {
        setMessage(error.response?.data?.msg || "Error changing password");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-4">
          Change Password
        </h2>

        {message && (
          <p className="text-center text-green-500 bg-green-100 p-2 rounded mb-3">
            {message}
          </p>
        )}
        {error && (
          <p className="text-center text-red-500 bg-red-100 p-2 rounded mb-3">
            {error}
          </p>
        )}

        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          <div>
            <label className="block text-gray-600 font-medium mb-1">
              Old Password
            </label>
            <input
              type="password"
              className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-300"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-gray-600 font-medium mb-1">
              New Password
            </label>
            <input
              type="password"
              className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-300"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-gray-600 font-medium mb-1">
              Confirm New Password
            </label>
            <input
              type="password"
              className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-300"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="button"
            onClick={() => setShowConfirmModal(true)}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Change Password
          </button>
        </form>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Confirm Password Change
            </h3>
            <p className="text-gray-600 mb-4">
              Are you sure you want to change your password?
            </p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleChangePassword}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Error Modal for Invalid Password */}
      {showErrorModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h3 className="text-lg font-semibold text-red-600 mb-4">
              Invalid Password
            </h3>
            <p className="text-gray-600 mb-4">
              The old password you entered is incorrect. Please try again.
            </p>
            <div className="flex justify-center">
              <button
                onClick={() => setShowErrorModal(false)}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChangePassword;
