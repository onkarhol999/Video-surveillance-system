import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/register", formData, {
        withCredentials: true,
      });
      setSuccess("User registered successfully ✅");
      setError("");
      setFormData({ userName: "", password: "" });
    } catch (err) {
      setError("Registration failed ❌");
      setSuccess("");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6">
        <motion.form
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          onSubmit={handleSubmit}
          className="bg-gray-950 shadow-2xl rounded-2xl p-10 w-full max-w-md text-white"
        >
          <h1 className="text-4xl font-extrabold text-center mb-2 tracking-tight flex items-center justify-center gap-3">
            VisionGuard
          </h1>

          <p className="text-center text-gray-400 mb-6 text-sm italic">
            Create Account
          </p>

          {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
          {success && <p className="text-green-400 mb-4 text-center">{success}</p>}

          <div className="mb-5">
            <label className="block text-gray-400 font-medium mb-1">Username</label>
            <input
              type="text"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
              placeholder="Choose a username"
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
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
              placeholder="Choose a secure password"
              required
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-semibold tracking-wide"
          >
            Register
          </motion.button>

          <p className="mt-6 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link to="/login" className="text-purple-400 font-semibold hover:underline">
              Login
            </Link>
          </p>
        </motion.form>
      </div>
    </div>
  );
};

export default SignUpForm;
