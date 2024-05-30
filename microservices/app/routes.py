from flask import Blueprint, request, jsonify
import pandas as pd
import joblib
from .analysis import prepare_data, make_predictions
from .preprocessing import preprocess_and_predict, load_model

main = Blueprint('main', __name__)

MODEL_PATH = 'models/lgbm_model_pipeline.pkl'
model = load_model(MODEL_PATH)

@main.route('/predict', methods=['POST'])
def predict():
    file = request.files['file']
    if file:
        try:
            data = pd.read_csv(file)
            predictions = preprocess_and_predict(model, data)
            response = predictions.to_dict(orient='records')
            return jsonify(response)
        except Exception as e:
            print(e)
            return jsonify({'error': str(e)}), 400
    else:
        return jsonify({'error': 'No file provided'}), 400 
    
















""" @main.route('/predict', methods=['POST'])
def predict_endpoint():
    if request.method == 'POST':
        file = request.files.get('file')
        if file:
            try:
                data = pd.read_csv(file)
                predictions = make_predictions(data)
                return jsonify(predictions.to_dict(orient='records'))
            except Exception as e:
                return jsonify({'error': str(e)}), 400
        else:
            return jsonify({'error': 'No file provided'}), 400 """