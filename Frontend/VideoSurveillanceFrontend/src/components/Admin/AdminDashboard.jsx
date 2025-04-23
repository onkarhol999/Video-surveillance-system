import React from "react";
import { BadgeCheck, Users, AlertCircle, Video } from "lucide-react";
import Navbar from "../Navbar/Navbar";

const AdminDashboard = () => {
  const officerName = "John Doe"; // Replace dynamically as needed

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8 space-y-10">
       <Navbar/>
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-800 pb-4">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, Officer {officerName} 👮‍♂️</h1>
          <span className="mt-1 inline-block bg-purple-600 text-xs px-3 py-1 rounded-full uppercase font-semibold tracking-wide">
            Security Staff
          </span>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard icon={<Users className="w-6 h-6" />} title="Total Users" value="152" />
        <StatCard icon={<AlertCircle className="w-6 h-6" />} title="Total Alerts" value="87" />
        <StatCard icon={<Video className="w-6 h-6" />} title="Active Feeds" value="12" />
      </div>

      {/* Alert Log Table */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Alert Logs</h2>
        <div className="overflow-x-auto bg-gray-900 rounded-xl shadow-lg">
          <table className="min-w-full text-sm text-gray-300">
            <thead>
              <tr className="bg-gray-800 text-left text-xs uppercase tracking-wider text-gray-400">
                <th className="px-6 py-3">User</th>
                <th className="px-6 py-3">Time</th>
                <th className="px-6 py-3">Frame</th>
                <th className="px-6 py-3">Score</th>
                <th className="px-6 py-3">Location</th>
              </tr>
            </thead>
            <tbody>
              {/* Example Row */}
              <tr className="border-b border-gray-800 hover:bg-gray-800 transition">
                <td className="px-6 py-4">john.doe</td>
                <td className="px-6 py-4">2025-04-21 14:22</td>
                <td className="px-6 py-4">frame_0341.png</td>
                <td className="px-6 py-4">92%</td>
                <td className="px-6 py-4">Sector 7B</td>
              </tr>
              {/* More rows here... */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, title, value }) => (
  <div className="bg-gray-900 p-6 rounded-xl shadow-md flex items-center gap-4 hover:shadow-lg transition">
    <div className="p-3 bg-gray-800 rounded-full text-purple-400">{icon}</div>
    <div>
      <p className="text-sm text-gray-400">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  </div>
);

export default AdminDashboard;
