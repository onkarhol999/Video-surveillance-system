import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import AdminDashboard from "./components/Admin/AdminDashboard";
import LoginForm from "./components/Auth/LoginForm";
import SignUpForm from "./components/Auth/SignUpForm";
import UserDashboard from "./components/User/UserDashboard";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/userDashboard" />} />
        <Route path="/navbar" element={<Navbar/>} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<SignUpForm />} />
        <Route path="/adminDashboard" element={<AdminDashboard />} />
        <Route path="/userDashboard" element={<UserDashboard />} />
        {/* Add /user route when you build UserDashboard */}
      </Routes>
    </Router>
  );
}

export default App;
