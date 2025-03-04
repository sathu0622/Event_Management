import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../components/AuthContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Header from "../components/Header";
import Footer from "../components/Footer";
import bg from "../../assets/bgE.jpg"
import img from "../../assets/img.jpeg"

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", formData);
      const { token, user } = res.data;

      const userData = { id: user.id, role: user.role, token };
      login(userData);
      if (res.data.firstLogin) {
        navigate("/change-password");  // Redirect organizers to change password
      }else if(user.role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/user-dashboard");
      }
    } catch (err) {
      alert(err.response?.data?.msg || "Login failed");
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

      {/* Login Container */}
      <div className="relative z-20 flex justify-center items-center min-h-screen px-4">
        <div className="bg-white text-black rounded-2xl shadow-lg flex flex-col md:flex-row w-full max-w-3xl">
          {/* Left Side (Image) */}
          <div className="w-full md:w-1/2 hidden md:block">
            <img
              src={img}
              alt="Login"
              className="w-full h-100 object-cover rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none"
            />
          </div>

          {/* Right Side (Form) */}
          <div className="w-full md:w-1/2 p-6 md:p-8">
            <h2 className="text-2xl font-semibold mb-4 text-center">Welcome Back</h2>
            <form onSubmit={handleSubmit}>
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

              <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded mt-4 hover:bg-blue-600 transition">
                Login
              </button>
            </form>

            <p className="text-sm mt-4 text-center">
              Don’t have an account? <a href="#" className="text-blue-600 hover:underline">Signup</a>
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Login;
