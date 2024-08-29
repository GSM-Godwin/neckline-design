from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import pickle
import numpy as np

# Load the trained model and encoders
with open("RForestClassifier.pkl", "rb") as model_file:
    body_shape_classifier = pickle.load(model_file)

with open("label_encoder_body_shape.pkl", "rb") as le_file:
    label_encoder_body_shape = pickle.load(le_file)

app = FastAPI()

class Measurements(BaseModel):
    shoulderWidth: float
    bustCircumference: float
    waistCircumference: float
    hipCircumference: float

def determine_characteristics(shoulderWidth, bustCircumference, waistCircumference, hipCircumference):
    shoulder_hip_ratio = shoulderWidth / hipCircumference
    waist_hip_ratio = waistCircumference / hipCircumference
    shoulder_bust_ratio = shoulderWidth / bustCircumference

    # Define characteristics
    wider_shoulders = shoulder_hip_ratio > 0.38
    slimmer_hips = waist_hip_ratio > 0.69
    fuller_bust = shoulder_bust_ratio < 0.44

    return wider_shoulders, slimmer_hips, fuller_bust

@app.post("/shape")
def determine_shape(measurements: Measurements):
    try:
        # Calculate derived characteristics
        wider_shoulders, slimmer_hips, fuller_bust = determine_characteristics(
            measurements.shoulderWidth, 
            measurements.bustCircumference, 
            measurements.waistCircumference, 
            measurements.hipCircumference
        )
        
        # Prepare the data for prediction
        input_data = np.array([[measurements.shoulderWidth, measurements.bustCircumference, 
                                measurements.waistCircumference, measurements.hipCircumference, 
                                wider_shoulders, slimmer_hips, fuller_bust]])
        
        # Make predictions
        body_shape_prediction = body_shape_classifier.predict(input_data)
        
        # Decode the body shape
        body_shape_pred = label_encoder_body_shape.inverse_transform([body_shape_prediction[0]])[0]
        
        # Determine recommended necklines based on the predicted body shape
        recommended_necklines = recommend_necklines(body_shape_pred)
        
        return {
            "shapeType": body_shape_pred,
            "recommendedNecklines": ', '.join(recommended_necklines),
            "widerShoulders": wider_shoulders,
            "slimmerHips": slimmer_hips,
            "fullerBust": fuller_bust
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction error: {str(e)}")

def recommend_necklines(body_shape):
    neckline_recommendations = {
        "Rectangle": ["Halter neck", "Off the shoulder"],
        "Pear": ["V-neck", "Boat neck"],
        "Hourglass": ["V-neck", "Halter neck", "Boat neck", "Off the shoulder"],
        "Apple": ["V-neck"]
    }
    return neckline_recommendations.get(body_shape, ["V-neck"])

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

print("API is running!")
