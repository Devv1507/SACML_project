from sklearn.datasets import load_iris
from sklearn.ensemble import RandomForestClassifier
import joblib

# Load dataset
iris = load_iris()
X, y = iris.data, iris.target

# Train a model (Random Forest Classifier)
model = RandomForestClassifier()
model.fit(X, y)

# Save the trained model using joblib
joblib.dump(model, 'iris_model.joblib')

from flask import Flask, request, jsonify
import joblib

# Initialize Flask application
app = Flask(__name__)

# Load the trained machine learning model
model = joblib.load('iris_model.joblib')

# Define the prediction endpoint
@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get the input data from the request
        input_data = request.json['data']

        # Make predictions using the loaded model
        prediction = model.predict([input_data])[0]

        # Return the prediction as a JSON response
        return jsonify({'prediction': prediction}), 200
    except Exception as e:
        # Handle any errors
        return jsonify({'error': str(e)}), 500

# Run the Flask application
if __name__ == '__main__':
    app.run(debug=True)