from flask import Blueprint, request, jsonify, send_file
import pandas as pd
import joblib
from .analysis import prepare_data, make_predictions
from .preprocessing import preprocess_and_predict, load_model
import json
import lime
import lime.lime_tabular
import matplotlib.pyplot as plt
from io import BytesIO
import base64

main = Blueprint('main', __name__)

MODEL_PATH = 'models/lgbm_model_pipeline.pkl'
model = load_model(MODEL_PATH)



@main.route('/predict', methods=['POST'])
def predict():
    if request.files:
        file = request.files['file']
        if file:
            try:
                # Check content type to decide how to process the file
                if 'csv' in file.filename or file.content_type == 'text/csv':
                    data = pd.read_csv(file)
                elif 'xls' in file.filename or file.content_type in [ 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']:
                    data = pd.read_excel(file)
                else:
                    return "Unsupported file type", 400
            except Exception as e:
                print(e)
                return jsonify({'error': str(e)}), 400
    elif request.is_json:
        try:
            # If the request body is JSON
            data_dict = request.get_json()
            data = pd.DataFrame([data_dict])  # Convert single JSON object to DataFrame
        except Exception as e:
            print(e)
            return jsonify({'error': str(e)}), 400
    else:
        return jsonify({'error': 'No valid file or JSON provided'}), 400

    # Process the data and make predictions
    try:
        predictions, output = preprocess_and_predict(model, data)
        data_predict = predictions.to_dict(orient='records')

        #send it as a base64 string within JSON
        img_base64 = base64.b64encode(output.getvalue()).decode('utf-8')
        response = {
            'predictions': data_predict,
            'explanation_image': img_base64
        }
        #return send_file(output, mimetype='image/png')
        return jsonify(response)
    except Exception as e:
        print(e)
        return jsonify({'error': str(e)}), 400
    
















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