import React, { useState } from "react";
import { BadgeCheck, Users, AlertCircle, Video, MapPin, Activity } from "lucide-react";
import Navbar from "../Navbar/Navbar";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";

const AdminDashboard = () => {
  const officerName = "John Doe"; // Replace dynamically as needed
  const [alerts, setAlerts] = useState(generateDummyAlerts());
  const [selectedAlert, setSelectedAlert] = useState(null); // Track selected alert

  // Map component to update center and zoom when "Investigate" button is clicked
  const MapView = ({ selectedAlert }) => {
    const map = useMap();

    if (selectedAlert) {
      map.setView([selectedAlert.lat, selectedAlert.lon], 14); // Center map on alert location and zoom in
    }

    return null; // This component doesn't render anything itself, it just manipulates the map
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8 space-y-10">
      <Navbar />
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-800 pb-4">
        <div>
          <h1 className="text-3xl font-bold text-purple-400">Welcome back, Officer {officerName} 👮‍♂️</h1>
          <span className="mt-1 inline-block bg-purple-600 text-xs px-3 py-1 rounded-full uppercase font-semibold tracking-wide">
            Security Staff
          </span>
        </div>
        <div>
          <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md font-semibold shadow-md transition">
            Refresh Dashboard
          </button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard icon={<Users className="w-6 h-6" />} title="Total Users" value="152" />
        <StatCard icon={<AlertCircle className="w-6 h-6" />} title="Total Alerts" value={alerts.length} />
        <StatCard icon={<Video className="w-6 h-6" />} title="Active Feeds" value="12" />
        <StatCard icon={<Activity className="w-6 h-6" />} title="Recent Activity" value="32 actions" />
      </div>

      {/* System Health Section */}
      <div className="bg-gray-900 p-6 rounded-xl shadow-md flex items-center gap-4">
        <div className="p-3 bg-gray-800 rounded-full text-green-400">
          <BadgeCheck className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-lg font-semibold">System Health</h3>
          <p className="text-sm text-gray-400">All systems operational. API uptime: 99.9%</p>
        </div>
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
                <th className="px-6 py-3">Alert Type</th>
                <th className="px-6 py-3">Score</th>
                <th className="px-6 py-3">Location</th>
                <th className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {alerts.map((alert, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-800 hover:bg-gray-800 transition"
                >
                  <td className="px-6 py-4">{alert.user}</td>
                  <td className="px-6 py-4">{alert.time}</td>
                  <td className="px-6 py-4">{alert.alertType}</td>
                  <td className="px-6 py-4">{alert.score}</td>
                  <td className="px-6 py-4">{alert.location}</td>
                  <td className="px-6 py-4">
                    <button
                      className="bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded-md font-semibold"
                      onClick={() => setSelectedAlert(alert)} // Set selected alert on button click
                    >
                      Investigate
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Recent Activities</h2>
        <div className="bg-gray-900 p-6 rounded-xl shadow-lg">
          <ul className="space-y-4">
            <li className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-green-400" />
              User alert raised in Sector 5A
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-red-400" />
              Suspicious activity detected near entrance 3
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-yellow-400" />
              System monitoring report generated
            </li>
          </ul>
        </div>
      </div>

      {/* Map Section */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Incident Locations</h2>
        <div className="h-96 bg-gray-800 rounded-xl">
          <MapContainer center={[19.0760, 72.8777]} zoom={10} style={{ height: "100%" }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {alerts.map((alert, index) => (
              <Marker
                key={index}
                position={[alert.lat, alert.lon]}
                icon={new Icon({ iconUrl: "/path/to/marker-icon.png", iconSize: [25, 41] })}
              >
                <Popup>{`${alert.user} reported an alert at ${alert.location}`}</Popup>
              </Marker>
            ))}
            <MapView selectedAlert={selectedAlert} /> {/* Update the map view when an alert is selected */}
          </MapContainer>
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

function generateDummyAlerts() {
  const dummyAlerts = [];
  const alertTypes = ["Suspicious Activity", "Vandalism", "Theft", "Violence"];
  const locations = ["Mumbai", "Pune", "Nagpur", "Nashik", "Aurangabad", "Thane"];
  const users = ["Alice Johnson", "Bob Smith", "Charlie Brown", "David Lee"];

  const maharashtraCoordinates = {
    Mumbai: [19.0760, 72.8777],
    Pune: [18.5204, 73.8567],
    Nagpur: [21.1458, 79.0882],
    Nashik: [19.9975, 73.7910],
    Aurangabad: [19.8762, 75.3433],
    Thane: [19.2183, 72.9781]
  };

  for (let i = 0; i < 10; i++) {
    const location = locations[Math.floor(Math.random() * locations.length)];
    const coordinates = maharashtraCoordinates[location];
    dummyAlerts.push({
      user: users[Math.floor(Math.random() * users.length)],
      time: `2025-05-06 14:22`,
      alertType: alertTypes[Math.floor(Math.random() * alertTypes.length)],
      score: `${Math.floor(Math.random() * 100)}%`,
      location: location,
      lat: coordinates[0],
      lon: coordinates[1],
    });
  }

  return dummyAlerts;
}

export default AdminDashboard;
