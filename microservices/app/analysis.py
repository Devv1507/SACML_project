import pandas as pd
import joblib

def prepare_data(data):
    # Clean up column names
    data.columns = data.columns.str.strip()
    # Select features and target
    X = data[data.columns.difference(['risk'])]
    Y = data['risk']
    return X, Y

def make_predictions(data):
    # Load the model
    model = joblib.load('models/lgbm_model_pipeline.pkl')
    X, _ = prepare_data(data)
    data['predicted_risk'] = model.predict(X)
    data['prediction_probs'] = model.predict_proba(X).max(axis=1).round(4)
    # Move the prediction column first
    preds = data.pop("predicted_risk")
    data.insert(0, "predicted_risk", preds)
    
    encoder = joblib.load('models/encoder.pkl')
    df_decoded = data.copy()
    categorical_columns = ["checking_account", "housing", "purpose", "savings_account", "sex", "job"]
    df_decoded[categorical_columns] = encoder.inverse_transform(data[categorical_columns])


    return df_decoded