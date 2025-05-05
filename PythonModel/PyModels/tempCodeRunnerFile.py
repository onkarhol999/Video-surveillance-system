from flask import Flask, request, jsonify
from flask_cors import CORS
import base64
import numpy as np
import cv2
from tensorflow.keras.models import load_model
import io

app = Flask(__name__)

# Enable CORS to allow requests from the React app
CORS(app, resources={r"/predict-frame": {"origins": "http://localhost:5173"}})

# Load the pre-trained model
model = load_model('violence_detection_model.h5')

# Predict frame and return result
@app.route('/predict-frame', methods=['POST'])
def predict_frame():
    try:
        data = request.get_json()
        frame_data = data['frame']

        # Decode the frame (base64)
        img_data = base64.b64decode(frame_data.split(",")[1])
        np_img = np.frombuffer(img_data, dtype=np.uint8)
        img = cv2.imdecode(np_img, cv2.IMREAD_COLOR)

        # Resize the image to the model's input size
        img_resized = cv2.resize(img, (128, 128))
        img_normalized = img_resized / 255.0
        img_array = np.expand_dims(img_normalized, axis=0)  # Add batch dimension

        # Predict if it's violent (0 or 1)
        prediction = model.predict(img_array)
        predicted_label = 1 if prediction[0] > 0.5 else 0

        # Return the prediction
        return jsonify({"violence_detected": predicted_label})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
