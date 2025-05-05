from flask import Flask, request, jsonify
from flask_cors import CORS
import base64
import numpy as np
import cv2
from tensorflow.keras.models import load_model
import os

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

# Load model with absolute path
MODEL_PATH = os.path.join(os.path.dirname(__file__), 'violence_detection_model.h5')
model = load_model(MODEL_PATH)

# Global state flag to control prediction
is_active = True

@app.route('/set-active', methods=['POST'])
def set_active():
    global is_active
    try:
        data = request.get_json()
        is_active = data.get("active", True)
        return jsonify({"status": "success", "active": is_active})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/predict-frame', methods=['POST'])
def predict_frame():
    global is_active
    if not is_active:
        return jsonify({"violence_detected": None, "message": "Detection is paused."})
    
    try:
        data = request.get_json()
        frame_data = data['frame']

        # Decode base64-encoded frame
        img_data = base64.b64decode(frame_data.split(",")[1])
        np_img = np.frombuffer(img_data, dtype=np.uint8)
        img = cv2.imdecode(np_img, cv2.IMREAD_COLOR)

        # Resize and preprocess
        img_resized = cv2.resize(img, (128, 128))
        img_normalized = img_resized / 255.0
        img_array = np.expand_dims(img_normalized, axis=0)

        # Predict
        prediction = model.predict(img_array)
        predicted_label = int(prediction[0] > 0.5)

        return jsonify({"violence_detected": predicted_label})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
