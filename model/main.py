from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class Measurements(BaseModel):
    shoulderWidth: float
    bustCircumference: float
    waistCircumference: float
    hipCircumference: float

@app.post("/shape")
def determine_shape(measurements: Measurements):
    # Temporary logic to determine shape
    if measurements.shoulderWidth > measurements.bustCircumference:
        shape_type = "Inverted Triangle"
    elif measurements.waistCircumference < measurements.hipCircumference:
        shape_type = "Pear"
    else:
        shape_type = "Rectangle"

    return {"shapeType": shape_type}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
