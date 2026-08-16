// DEMO AI ANALYSIS ENGINE
// This is for demonstration purposes only.

const DEMO_RULES = [
  {
    food: "Milk",
    testType: "Starch Detection",
    testResult: "Positive",
    suspectedAdulterant: "Starch",
    confidence: 95,
    risk: "HIGH",
    evidence: "Positive laboratory test for Starch"
  },
  {
    food: "Sugar",
    testType: "Foreign Material Screening",
    testResult: "Suspected",
    suspectedAdulterant: "Unknown/Other",
    confidence: 60,
    risk: "MODERATE",
    evidence: "Inconclusive screening results"
  },
  {
    food: "Turmeric",
    testType: "Artificial Colour Detection",
    testResult: "Positive",
    suspectedAdulterant: "Artificial Colour",
    confidence: 92,
    risk: "HIGH",
    evidence: "Positive laboratory test for Artificial Colour"
  },
  {
    food: "Chilli Powder",
    testType: "Artificial Colour Detection",
    testResult: "Positive",
    suspectedAdulterant: "Artificial Colour",
    confidence: 94,
    risk: "HIGH",
    evidence: "Positive laboratory test for Artificial Colour"
  },
  {
    food: "Honey",
    testType: "Sugar/Syrup Screening",
    testResult: "Suspected",
    suspectedAdulterant: "Synthetic Sweetener/Syrup",
    confidence: 85,
    risk: "MODERATE",
    evidence: "Anomalous sugar profile detected"
  },
  {
    food: "Edible Oil",
    testType: "Argemone Oil Screening",
    testResult: "Positive",
    suspectedAdulterant: "Argemone Oil",
    confidence: 99,
    risk: "HIGH",
    evidence: "Positive laboratory test for Argemone Oil"
  },
  {
    food: "Tea",
    testType: "Added Colour Screening",
    testResult: "Positive",
    suspectedAdulterant: "Artificial Colour",
    confidence: 88,
    risk: "MODERATE",
    evidence: "Added colour detected beyond natural limits"
  },
  {
    food: "Coffee",
    testType: "Foreign Material Screening",
    testResult: "Suspected",
    suspectedAdulterant: "Unknown",
    confidence: 70,
    risk: "LOW",
    evidence: "Trace foreign material detected"
  },
  {
    food: "Flour",
    testType: "Starch/Foreign Material Screening",
    testResult: "Positive",
    suspectedAdulterant: "Foreign Material",
    confidence: 91,
    risk: "MODERATE",
    evidence: "Extraneous material identified in screening"
  },
  {
    food: "Spices",
    testType: "Artificial Colour Screening",
    testResult: "Positive",
    suspectedAdulterant: "Artificial Colour",
    confidence: 96,
    risk: "HIGH",
    evidence: "Positive test for non-permitted colour"
  }
];

export const analysisService = {
  runAnalysis: async (testData) => {
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    const { food, testType, testResult } = testData;

    // Find a matching rule
    const match = DEMO_RULES.find(rule => 
      rule.food.toLowerCase() === food.toLowerCase() &&
      rule.testType.toLowerCase() === testType.toLowerCase() &&
      rule.testResult.toLowerCase() === testResult.toLowerCase()
    );

    if (match) {
      return {
        success: true,
        suspectedAdulterant: match.suspectedAdulterant,
        confidence: match.confidence,
        risk: match.risk,
        evidence: match.evidence,
        status: "Completed",
        recommendation: "Further laboratory confirmation recommended."
      };
    }

    // Default response if insufficient info
    return {
      success: false,
      message: "Insufficient evidence for reliable adulterant identification.",
      status: "Failed",
      suspectedAdulterant: "Unknown",
      confidence: 0,
      risk: "UNKNOWN",
      evidence: "Test data does not match known demo adulteration patterns.",
      recommendation: "Collect a confirmatory sample."
    };
  }
};
