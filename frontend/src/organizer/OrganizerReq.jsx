import React, { useState } from "react";
import axios from "axios";
import { FaFileUpload } from "react-icons/fa";
import Header from "../attendee/components/Header";
import Footer from "../attendee/components/Footer";
import bg from "../assets/bgE.jpg"
import img from "../assets/img.jpeg"

const OrganizerReq = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    document: null,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, document: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });
    try {
      await axios.post("http://localhost:5000/api/organizer/users", data);
      alert("organizer request sent successfully");
    } catch (error) {
      console.error("Error adding user:", error);
      alert("Error adding user");
    }
  };

  return (
    <div className="relative min-h-screen bg-black text-white">
      <Header />

      <div
        className="absolute inset-0 bg-cover bg-center opacity-70"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: 'cover', 
          backgroundPosition: 'center', 
          backgroundRepeat: 'no-repeat' 
        }}
      />

      {/* User Management Container */}
      <div className="relative z-20 flex justify-center items-center min-h-screen px-4">
        <div className="bg-white text-black rounded-2xl shadow-lg flex flex-col md:flex-row w-full max-w-3xl">
          {/* Left Side (Image) */}
          <div className="w-full md:w-1/2 hidden md:block">
            <img
              src={img}
              alt="Login"
              className="w-full h-130 object-cover rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none"
            />
          </div>

          {/* Right Side (Form) */}
          <div className="w-full md:w-1/2 p-6 md:p-8">
            <h2 className="text-2xl font-semibold mb-4 text-center">Organizer Request</h2>
            <form onSubmit={handleSubmit}>
              {/* Name */}
              <div className="mb-4">
                <label className="block text-sm font-medium">Full Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter User's Name"
                  onChange={handleChange}
                  required
                  className="w-full p-2 border rounded mt-1"
                />
              </div>

              {/* Email */}
              <div className="mb-4">
                <label className="block text-sm font-medium">Email Address</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter User's Email"
                  onChange={handleChange}
                  required
                  className="w-full p-2 border rounded mt-1"
                />
              </div>

              {/* Phone */}
              <div className="mb-4">
                <label className="block text-sm font-medium">Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  placeholder="Enter User's Phone Number"
                  onChange={handleChange}
                  className="w-full p-2 border rounded mt-1"
                />
              </div>

              {/* Document Upload */}
              <div className="mb-4">
                <label className="block text-sm font-medium">Upload Document</label>
                <div className="relative">
                  <input
                    type="file"
                    name="document"
                    onChange={handleFileChange}
                    accept="application/pdf"
                    className="w-full p-2 border rounded mt-1"
                  />
                  <span className="absolute right-3 top-3 cursor-pointer">
                    <FaFileUpload />
                  </span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-blue-500 text-white p-2 rounded mt-4 hover:bg-blue-600 transition"
              >
                Request
              </button>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default OrganizerReq;
