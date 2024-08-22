# train_model.py
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder, MultiLabelBinarizer
from sklearn.ensemble import RandomForestClassifier
from sklearn.multioutput import MultiOutputClassifier
import pickle
import numpy as np

# Load the dataset
data = pd.read_csv("project_data.csv")

# Check the data structure
print(data.head())

# Check for missing values
print(data.isnull().sum())

# Correctly format the 'necklines' column
data['necklines'] = data['necklines'].apply(lambda x: [neckline.strip() for neckline in x.split(',')] if isinstance(x, str) else x)

# Separate features and target variables
X = data[['shoulderWidth', 'bustCircumference', 'waistCircumference', 'hipCircumference']]
y_body_shape = data['body_shape']
y_necklines = data['necklines']

# Encode the body shape labels
label_encoder_body_shape = LabelEncoder()
y_body_shape_encoded = label_encoder_body_shape.fit_transform(y_body_shape)

# Encode the necklines
mlb_neckline = MultiLabelBinarizer()
y_necklines_encoded = mlb_neckline.fit_transform(y_necklines)

# Combine the target variables into a single array
y = np.column_stack((y_body_shape_encoded, y_necklines_encoded))

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train a multi-output classifier using RandomForest
model = MultiOutputClassifier(RandomForestClassifier(random_state=42))
model.fit(X_train, y_train)

# Evaluate the model (optional)
print("Model accuracy:", model.score(X_test, y_test))

# Save the trained model
with open("RForestClassifier.pkl", "wb") as model_file:
    pickle.dump(model, model_file)

# Save the label encoder for body shape
with open("label_encoder_body_shape.pkl", "wb") as le_file:
    pickle.dump(label_encoder_body_shape, le_file)

# Save the MultiLabelBinarizer for necklines
with open("mlb_neckline.pkl", "wb") as mlb_file:
    pickle.dump(mlb_neckline, mlb_file)

print("Training complete and models saved!")
