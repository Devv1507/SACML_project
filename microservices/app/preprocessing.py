import pandas as pd
import numpy as np
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import OrdinalEncoder
import joblib
import lime
import lime.lime_tabular
import matplotlib.pyplot as plt
from io import BytesIO

TRAIN_DATA_PATH = 'datasets/cleaned/trainX.csv'
trainX = pd.read_csv(TRAIN_DATA_PATH)

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
    # Check if 'risk' column exists and drop it
    if 'risk' not in data.columns:
        data['risk'] = ""  # Placeholder value (adjust as needed)
        X = data.drop(columns=['risk'])
    else:
        X = data.drop(columns=['risk'])

    # Make predictions
    data['predictions'] = model.predict(X)
    data['prediction_probs'] = model.predict_proba(X)[:, 1]
    
    data = decode_data(data)
    risk_mapping = {0: "bad", 1: "good"}
    data['predictions'] = data['predictions'].map(risk_mapping)

 # Generate LIME explanation for the first instance
    num_col = X.shape[1]
    print('num_col:', num_col)
    explainer = lime.lime_tabular.LimeTabularExplainer(training_data=trainX.values,
                                                           feature_names=trainX.columns,
                                                           class_names=['bad', 'good'],
                                                           mode='classification')
    explained = explainer.explain_instance(X.iloc[0], model.predict_proba, num_features=num_col)
    fig = explained.as_pyplot_figure()

    # Adjust the figure size and margins
    fig.set_size_inches(10, 6)
    plt.tight_layout(rect=[0, 0.1, 1, 1])  # Adjust the bottom margin to fit the labels
    
    output = BytesIO()
    fig.savefig(output, format='png')
    plt.close(fig)
    output.seek(0)

    return data, output