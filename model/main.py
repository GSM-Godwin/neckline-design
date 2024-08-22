# main.py
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import pickle
import numpy as np

# Load the trained model and encoders
with open("RForestClassifier.pkl", "rb") as model_file:
    multi_target_classifier = pickle.load(model_file)

with open("label_encoder_body_shape.pkl", "rb") as le_file:
    label_encoder_body_shape = pickle.load(le_file)

with open("mlb_neckline.pkl", "rb") as mlb_file:
    mlb_neckline = pickle.load(mlb_file)

app = FastAPI()

class Measurements(BaseModel):
    shoulderWidth: float
    bustCircumference: float
    waistCircumference: float
    hipCircumference: float

@app.post("/shape")
def determine_shape(measurements: Measurements):
    try:
        # Prepare the data for prediction
        input_data = np.array([[measurements.shoulderWidth, measurements.bustCircumference, 
                                measurements.waistCircumference, measurements.hipCircumference]])
        
        # Make predictions
        prediction = multi_target_classifier.predict(input_data)
        
        # Decode the body shape
        body_shape_pred = label_encoder_body_shape.inverse_transform([prediction[0, 0]])[0]
        
        # Decode the necklines
        neckline_pred = mlb_neckline.inverse_transform(prediction[0, 1:].reshape(1, -1))[0]
        
        return {
            "shapeType": body_shape_pred,
            "recommendedNecklines": ', '.join(neckline_pred)
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction error: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

print("API is running!")
