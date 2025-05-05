import cv2
import numpy as np
from tensorflow.keras.models import load_model
import os

# === Configuration ===
# MODEL_PATH = 'violence_detection_model.h5'  # Path to your trained model
FRAME_SIZE = (128, 128)  # Resize to this for prediction
BATCH_SIZE = 10  # Process every 10 frames
THRESHOLD = 3  # Threshold for how many violent frames are needed to flag as violence

# Load model
MODEL_PATH = os.path.join(os.path.dirname(__file__), 'violence_detection_model.h5')
model = load_model(MODEL_PATH)

# === Helper Function ===
def predict_violence_batch(buffer):
    predictions = [model.predict(np.expand_dims(f, axis=0))[0][0] > 0.5 for f in buffer]
    count_violent = sum(predictions)
    return "Violence Detected" if count_violent >= THRESHOLD else "No Violence", count_violent

# === OpenCV Video Capture (Webcam or IP Camera) ===
cap = cv2.VideoCapture(0)  # Use 0 for webcam or replace with IP camera URL

if not cap.isOpened():
    print("❌ Failed to open webcam.")
    exit()

print("📹 Webcam is open. Starting violence detection...")

frame_buffer = []

while True:
    # Capture frame-by-frame
    ret, frame = cap.read()
    if not ret:
        print("⚠️ Failed to grab frame.")
        break

    # Preprocess the frame (resize, normalize)
    frame_resized = cv2.resize(frame, FRAME_SIZE)
    frame_normalized = frame_resized / 255.0

    # Add the processed frame to the buffer
    frame_buffer.append(frame_normalized)

    # Display the current frame
    cv2.imshow("Webcam - Violence Detection", frame)

    # Every 10 frames, make a prediction
    if len(frame_buffer) == BATCH_SIZE:
        result, count = predict_violence_batch(frame_buffer)
        print(f"\n🧠 Prediction: {result} ({count} / {BATCH_SIZE} violent frames)\n")
        frame_buffer = []  # Clear the buffer for next batch of frames

    # Break the loop if 'q' is pressed
    if cv2.waitKey(1) & 0xFF == ord('q'):
        print("🛑 Exiting...")
        break

# Release the video capture and close windows
cap.release()
cv2.destroyAllWindows()
