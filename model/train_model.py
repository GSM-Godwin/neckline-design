import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestClassifier
from sklearn.impute import SimpleImputer
import pickle
import numpy as np

# Load the dataset
data = pd.read_csv("project.csv")

# Separate features and target variables
X = data[['shoulderWidth', 'bustCircumference', 'waistCircumference', 'hipCircumference']]
y = data[['body_shape']]

# Encode the body shape labels as integers
label_encoder_body_shape = LabelEncoder()
y_encoded = label_encoder_body_shape.fit_transform(y['body_shape'].values.ravel())

# Handle missing data by imputing the mean value for all features
imputer = SimpleImputer(strategy='mean')
X = imputer.fit_transform(X)

# Create new features (ratios and characteristics)
data['Shoulder_Hip_Ratio'] = data['shoulderWidth'] / data['hipCircumference']
data['Waist_Hip_Ratio'] = data['waistCircumference'] / data['hipCircumference']
data['Shoulder_Bust_Ratio'] = data['shoulderWidth'] / data['bustCircumference']

# Define characteristics based on ratios
data['Wider_Shoulders'] = data['Shoulder_Hip_Ratio'] > 0.38
data['Slimmer_Hips'] = data['Waist_Hip_Ratio'] > 0.69
data['Fuller_Bust'] = data['Shoulder_Bust_Ratio'] < 0.44

# Combine all features into the final training set
X_final = np.column_stack((X, data[['Wider_Shoulders', 'Slimmer_Hips', 'Fuller_Bust']]))

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X_final, y_encoded, test_size=0.2, random_state=42)

# Train a classifier using RandomForest
model = RandomForestClassifier(random_state=42)
model.fit(X_train, y_train)

# Evaluate the model
print("Model accuracy (Body Shape):", model.score(X_test, y_test))

# Save the trained model
with open("RForestClassifier.pkl", "wb") as model_file:
    pickle.dump(model, model_file)

# Save the label encoder for body shape
with open("label_encoder_body_shape.pkl", "wb") as le_file:
    pickle.dump(label_encoder_body_shape, le_file)

print("Training complete and models saved!")
