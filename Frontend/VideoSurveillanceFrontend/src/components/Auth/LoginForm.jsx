import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

const LoginForm = () => {
  const [formData, setFormData] = useState({ userName: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/AdminLogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      const text = await response.text();
      console.log("Server response:", text); // debug
  
      if (text.trim() === "true") {
        navigate('/adminDashboard');
      } else {
        setError('Login failed. Invalid credentials.');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
  };
  
  

  return (
   <div>
 <Navbar/>
<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-800 via-gray-900 to-black p-6">

<motion.form
  initial={{ opacity: 0, scale: 0.9 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.5, ease: "easeOut" }}
  onSubmit={handleSubmit}
  className="bg-gray-900 shadow-lg rounded-3xl p-10 w-full max-w-md"
>
  <h1 className="text-4xl font-extrabold text-center text-white mb-2 tracking-tight flex items-center justify-center gap-3">
    VisionGuard
  </h1>
  <p className="text-center text-gray-400 mb-6 text-sm italic">
    Surveillance System Login
  </p>

  {error && <p className="text-red-600 mb-4 text-center">{error}</p>}

  <div className="mb-5">
    <label className="block text-gray-400 font-medium mb-1">Username</label>
    <input
      type="text"
      name="userName"
      value={formData.username}
      onChange={handleChange}
      className="w-full px-4 py-3 border border-gray-600 bg-gray-800 text-white rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-300"
      placeholder="Enter your username"
      required
    />
  </div>

  <div className="mb-6">
    <label className="block text-gray-400 font-medium mb-1">Password</label>
    <input
      type="password"
      name="password"
      value={formData.password}
      onChange={handleChange}
      className="w-full px-4 py-3 border border-gray-600 bg-gray-800 text-white rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-300"
      placeholder="Enter your password"
      required
    />
  </div>

  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    type="submit"
    className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-semibold tracking-wide"
  >
    Login
  </motion.button>

  <p className="mt-6 text-center text-sm text-gray-500">
    Don’t have an account?{" "}
    <Link to="/register" className="text-purple-400 font-semibold hover:underline">
      register
    </Link>
  </p>
</motion.form>
</div>
   </div>
  );
};

export default LoginForm;
