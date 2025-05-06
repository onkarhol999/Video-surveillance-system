# 🚨 VisionGuard: Real-Time Surveillance and Violence Detection System

VisionGuard is a smart surveillance system designed to detect violence or weapon-related activity in real-time video feeds using deep learning. It alerts authorities by sending an email with live location and evidence when suspicious behavior is detected.

---

## 🛠️ Tech Stack

### 🔍 Backend (Spring Boot)
- **Java 17**
- **Spring Boot** – RESTful APIs, Email Service
- **JavaMailSender** – Email notifications with location and snapshot attachments

### 🧠 Machine Learning (Python)
- **Python 3.10+**
- **PyTorch** – Deep Learning framework
- **CNN (Convolutional Neural Networks)** – Trained to classify video clips as:
  - Normal
  - Violence
  - Weaponized
- **OpenCV + Decord** – Used for video decoding and frame extraction

### 🎯 Frontend (React)
- **ReactJS** – User dashboard interface
- **HTML/CSS/JS**
- **Axios** – API integration with backend services

---

## 🚨 Key Features

- ✅ **Violence Detection Model**
  - Real-time prediction from webcam feed using 3D CNN
  - Categories: Normal, Violence, Weaponized

- 📸 **Snapshot Capture**
  - Automatically captures suspicious frames
  - Sends frames to the backend as evidence

- 📍 **Live Location Tracking**
  - Captures and sends user’s current geolocation

- 📬 **Email Alert System**
  - Sends detailed alerts to the registered authority email
  - Includes location and snapshots as attachments

- 💻 **React-based User Dashboard**
  - View camera feed
  - Call Police button
  - Graphical alert status (shows violence over time)
  - One-click location and snapshot sender

---

