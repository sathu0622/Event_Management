import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Header from "../components/Header";
import Footer from "../components/Footer";
import pic from "../../assets/mic.jpg";
import bg from "../../assets/bgE.jpg"
import img from "../../assets/img.jpeg"

const Register = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", formData);
      alert("Registration successful! Please login.");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.msg || "Registration failed");
    }
  };

  return (
    <div className="relative min-h-screen bg-black text-white">
      <Header />

      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-70"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: 'cover', 
          backgroundPosition: 'center', 
          backgroundRepeat: 'no-repeat' 
        }}
      />

      {/* Register Container */}
      <div className="relative z-20 flex justify-center items-center min-h-screen px-4">
        <div className="bg-white text-black rounded-2xl shadow-lg flex flex-col md:flex-row w-full max-w-3xl">
          {/* Left Side (Image) */}
          <div className="w-full md:w-1/2 hidden md:block">
              <img
                src={img}
                alt="Login"
                className="w-full h-120 object-cover rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none"
              />
          </div>

          {/* Right Side (Form) */}
          <div className="w-full md:w-1/2 p-6 md:p-8">
            <h2 className="text-2xl font-semibold mb-4 text-center">Create Your Account</h2>
            <form onSubmit={handleSubmit}>
              {/* Name */}
              <div className="mb-4">
                <label className="block text-sm font-medium">Full Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter Your Name"
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
                  placeholder="Enter Your Email"
                  onChange={handleChange}
                  required
                  className="w-full p-2 border rounded mt-1"
                />
              </div>

              {/* Password */}
              <div className="mb-4">
                <label className="block text-sm font-medium">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter Your Password"
                    onChange={handleChange}
                    required
                    className="w-full p-2 border rounded mt-1 pr-10"
                  />
                  <span
                    className="absolute right-3 top-3 cursor-pointer"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>

              {/* Register Button */}
              <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded mt-4 hover:bg-blue-600 transition">
                Register
              </button>
            </form>

            <p className="text-sm mt-4 text-center">
              Already have an account? <a href="/login" className="text-blue-600 hover:underline">Login</a>
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Register;
