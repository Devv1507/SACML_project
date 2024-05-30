import pandas as pd
import numpy as np
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import OrdinalEncoder
import joblib

# Global variables to store the original categories
original_categories = {}

def load_model(model_path):
    return joblib.load(model_path)

def prepare_data(data):
    data.info()
    #print(data['checking_account'].value_counts())
    #print(data['sex'].value_counts())
    #print(data['housing'].value_counts())
    #print(data['savings_account'].value_counts())
    #print(data['job'].value_counts())
    #print(data['purpose'].value_counts())
    #print(data['risk'].value_counts())

    # Clean up column names
    data.columns = data.columns.str.strip()
    
    # Impute missing values
    categorical_columns = data.select_dtypes(include=['object']).columns
    imputer = SimpleImputer(strategy='most_frequent')
    data[categorical_columns] = imputer.fit_transform(data[categorical_columns])
    
    # Encode categorical features
    encoder = OrdinalEncoder(dtype=np.int64)
    data[categorical_columns] = encoder.fit_transform(data[categorical_columns])

    for col, categories in zip(categorical_columns, encoder.categories_):
        original_categories[col] = categories

    return data

def decode_data(data):
    # Decode categorical features back to their original values
    for col, categories in original_categories.items():
        data[col] = data[col].map(lambda x: categories[int(x)])
    return data

def preprocess_and_predict(model, data):
    # Prepare the data
    data = prepare_data(data)
    X = data.drop(columns=['risk'])
    
    # Make predictions
    data['predictions'] = model.predict(X)
    data['prediction_probs'] = model.predict_proba(X)[:, 1]
    
    data = decode_data(data)
    risk_mapping = {0: "bad", 1: "good"}
    data['predictions'] = data['predictions'].map(risk_mapping)

    return data