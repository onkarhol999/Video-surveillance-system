import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold tracking-tight hover:text-blue-400 transition">
          VisionGuard 🛡️
        </Link>

        {/* Navigation Links */}
        <div className="flex gap-6 text-lg">
          <Link
            to="/"
            className="hover:text-blue-400 transition"
          >
            Home
          </Link>
          <Link
            to="/login"
            className="hover:text-blue-400 transition"
          >
            Admin Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
