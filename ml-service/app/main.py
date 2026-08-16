from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Optional
import random

app = FastAPI(title="FoodGuard AI - ML Service")

class PredictionRequest(BaseModel):
    food_type: str
    test_type: str
    test_result: str
    parameter: Optional[str] = None
    concentration: Optional[float] = None
    unit: Optional[str] = None
    detection_limit: Optional[float] = None

class PredictionResponse(BaseModel):
    predicted_adulterant: str
    confidence: float
    evidence: str
    risk_level: str

@app.get("/health")
def health_check():
    return {"status": "ok", "service": "foodguard-ai-ml-service"}

@app.post("/predict", response_model=PredictionResponse)
def predict_adulterant(request: PredictionRequest):
    """
    Mock prediction endpoint for FoodGuard AI.
    In a real scenario, this would load a trained scikit-learn model
    and transform the request data into features for inference.
    """
    # Simple rule-based mock matching the demo cases for hackathon purposes
    food = request.food_type.lower()
    test = request.test_result.lower()
    
    if test == "positive" or test == "suspected":
        if "milk" in food and "starch" in request.test_type.lower():
            return PredictionResponse(
                predicted_adulterant="Starch",
                confidence=0.95,
                evidence="Positive Iodine Test result.",
                risk_level="MODERATE"
            )
        elif "sugar" in food and "sweetener" in request.test_type.lower():
            return PredictionResponse(
                predicted_adulterant="Synthetic Sweetener",
                confidence=0.82,
                evidence="Suspected presence from general screening.",
                risk_level="MODERATE"
            )
        elif "turmeric" in food and "colour" in request.test_type.lower():
            return PredictionResponse(
                predicted_adulterant="Artificial Colour",
                confidence=0.98,
                evidence="Positive detection of Metanil Yellow.",
                risk_level="HIGH"
            )
        elif "chilli" in food and "colour" in request.test_type.lower():
            return PredictionResponse(
                predicted_adulterant="Artificial Colour",
                confidence=0.96,
                evidence="Positive detection of Rhodamine B.",
                risk_level="HIGH"
            )
        elif "honey" in food and "syrup" in request.test_type.lower():
            return PredictionResponse(
                predicted_adulterant="Added Syrup",
                confidence=0.75,
                evidence="Suspected altered fructose ratio.",
                risk_level="LOW"
            )
        elif "tea" in food and "colour" in request.test_type.lower():
            return PredictionResponse(
                predicted_adulterant="Artificial Colour",
                confidence=0.70,
                evidence="Suspected presence of Bismark Brown.",
                risk_level="MODERATE"
            )
        elif "flour" in food and "foreign" in request.test_type.lower():
            return PredictionResponse(
                predicted_adulterant="Foreign Material",
                confidence=0.85,
                evidence="Suspected presence of Chalk/Talc.",
                risk_level="LOW"
            )
            
        # Generic fallback for positive/suspected
        return PredictionResponse(
            predicted_adulterant="Unknown Adulterant",
            confidence=0.65,
            evidence="Test indicated presence of abnormal substance, but evidence is insufficient for reliable identification.",
            risk_level="UNKNOWN"
        )
    
    # Negative result
    return PredictionResponse(
        predicted_adulterant="None detected",
        confidence=0.99,
        evidence="Test result was negative.",
        risk_level="LOW"
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
