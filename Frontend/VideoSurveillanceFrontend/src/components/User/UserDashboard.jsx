import React, { useRef, useState } from "react";
import Navbar from "../Navbar/Navbar";

const UserDashboard = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const isCameraActiveRef = useRef(false);
  const [snapshots, setSnapshots] = useState([]);
  const [isSending, setIsSending] = useState(false); // Loading state

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        isCameraActiveRef.current = true;
        sendFrameForDetection();
      }
    } catch (err) {
      console.error("Camera access denied:", err);
    }
  };

  const stopCamera = () => {
    isCameraActiveRef.current = false;
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    }
  };

  const takeSnapshot = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL("image/png").split(',')[1]; // Only base64 content
    setSnapshots((prev) => [...prev, dataUrl]);
  };

  const sendFrameForDetection = async () => {
    if (!videoRef.current || !canvasRef.current || !isCameraActiveRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const frameData = canvas.toDataURL("image/jpeg");

    try {
      const response = await fetch("http://localhost:5000/predict-frame", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ frame: frameData }),
      });

      const data = await response.json();
      if (data?.error) {
        console.error("Backend error:", data.error);
      } else {
        console.log("Prediction:", data);
      }
    } catch (error) {
      console.error("Frame send failed:", error);
    }

    if (isCameraActiveRef.current) {
      setTimeout(sendFrameForDetection, 500);
    }
  };

  const sendLocation = () => {
    setIsSending(true); // Show loading and hide snapshots

    fetch("https://ipapi.co/json/")
      .then(res => res.json())
      .then(data => {
        const { latitude, longitude } = data;

        return fetch("http://localhost:8080/api/send-location", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ latitude, longitude, snapshots }),
        });
      })
      .then((response) => {
        if (response.ok) {
          alert("📍 Location and snapshot(s) sent to the police.");
          setSnapshots([]); // Clear after successful send
        } else {
          alert("❌ Failed to send location and snapshot.");
        }
      })
      .catch((err) => {
        console.error("Error sending data to police:", err);
        alert("❌ Error sending location to police.");
      })
      .finally(() => {
        setIsSending(false); // Restore UI
      });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 space-y-8">
      <Navbar />
      <header className="text-center">
        <h1 className="text-4xl font-extrabold tracking-tight mb-2">VisionGuard 🛡️</h1>
        <p className="text-gray-400 text-sm">Surveillance User Dashboard</p>
      </header>

      <div className="flex flex-col items-center space-y-4">
        <div className="rounded-xl overflow-hidden shadow-2xl border border-gray-700">
          <video
            ref={videoRef}
            autoPlay
            className="w-[320px] md:w-[480px] lg:w-[640px] h-auto bg-black"
          />
        </div>

        <div className="flex gap-4 flex-wrap justify-center">
          <button onClick={startCamera} className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded-xl font-semibold shadow-md transition">
            Start Camera
          </button>
          <button onClick={stopCamera} className="bg-yellow-600 hover:bg-yellow-700 px-6 py-2 rounded-xl font-semibold shadow-md transition">
            Stop Camera
          </button>
          <button onClick={takeSnapshot} className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-xl font-semibold shadow-md transition">
            Take Snapshot 📸
          </button>
        </div>

        {!isSending && snapshots.length > 0 && (
          <div className="mt-6 w-full">
            <h2 className="text-lg font-semibold text-center mb-4">📸 Snapshots Taken</h2>
            <div className="flex flex-wrap gap-4 justify-center">
              {snapshots.map((snap, index) => (
                <img
                  key={index}
                  src={`data:image/png;base64,${snap}`}
                  alt={`Snapshot ${index + 1}`}
                  className="max-w-[200px] rounded-lg shadow-lg border"
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col items-center gap-4 mt-6">
        <button
          onClick={sendLocation}
          className="bg-blue-600 hover:bg-blue-700 hover:cursor-pointer px-6 py-3 rounded-xl font-semibold shadow-lg transition duration-300 flex items-center gap-2"
          disabled={isSending}
        >
          {isSending ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Sending...
            </>
          ) : (
            "Send Location & Snapshot"
          )}
        </button>
        <a
          href="tel:100"
          className="bg-red-600 hover:bg-red-700 hover:cursor-pointer px-6 py-3 rounded-xl font-semibold shadow-lg transition duration-300 text-center"
        >
          Call Police 🚨
        </a>
      </div>

      <canvas ref={canvasRef} style={{ display: "none" }} />
    </div>
  );
};

export default UserDashboard;
