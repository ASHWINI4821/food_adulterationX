const DEMO_SAMPLES = [
  {
    id: "FG-2026-001",
    food: "Milk",
    brand: "Demo Brand A",
    batchNumber: "B-101",
    testDate: new Date().toISOString().split('T')[0],
    testType: "Starch Detection",
    testResult: "Positive",
    parameter: "N/A",
    concentration: "N/A",
    unit: "N/A",
    detectionLimit: "N/A",
    suspectedAdulterant: "Starch",
    confidence: 95,
    risk: "HIGH",
    status: "Completed"
  },
  {
    id: "FG-2026-002",
    food: "Sugar",
    brand: "Demo Brand B",
    batchNumber: "B-102",
    testDate: new Date().toISOString().split('T')[0],
    testType: "Foreign Material Screening",
    testResult: "Suspected",
    parameter: "N/A",
    concentration: "N/A",
    unit: "N/A",
    detectionLimit: "N/A",
    suspectedAdulterant: "Unknown/Other",
    confidence: 60,
    risk: "MODERATE",
    status: "Completed"
  },
  {
    id: "FG-2026-003",
    food: "Turmeric",
    brand: "Demo Brand C",
    batchNumber: "B-103",
    testDate: new Date().toISOString().split('T')[0],
    testType: "Artificial Colour Detection",
    testResult: "Positive",
    parameter: "Metanil Yellow",
    concentration: "120",
    unit: "mg/kg",
    detectionLimit: "5",
    suspectedAdulterant: "Artificial Colour",
    confidence: 92,
    risk: "HIGH",
    status: "Completed"
  },
  {
    id: "FG-2026-004",
    food: "Chilli Powder",
    brand: "Demo Brand D",
    batchNumber: "B-104",
    testDate: new Date().toISOString().split('T')[0],
    testType: "Artificial Colour Detection",
    testResult: "Positive",
    parameter: "Sudan Red",
    concentration: "45",
    unit: "mg/kg",
    detectionLimit: "2",
    suspectedAdulterant: "Artificial Colour",
    confidence: 94,
    risk: "HIGH",
    status: "Completed"
  },
  {
    id: "FG-2026-005",
    food: "Honey",
    brand: "Demo Brand E",
    batchNumber: "B-105",
    testDate: new Date().toISOString().split('T')[0],
    testType: "Sugar/Syrup Screening",
    testResult: "Suspected",
    parameter: "C4 Sugars",
    concentration: "15",
    unit: "%",
    detectionLimit: "5",
    suspectedAdulterant: "Synthetic Sweetener/Syrup",
    confidence: 85,
    risk: "MODERATE",
    status: "Completed"
  },
  {
    id: "FG-2026-006",
    food: "Edible Oil",
    brand: "Demo Brand F",
    batchNumber: "B-106",
    testDate: new Date().toISOString().split('T')[0],
    testType: "Argemone Oil Screening",
    testResult: "Positive",
    parameter: "Argemone Oil",
    concentration: "Detected",
    unit: "N/A",
    detectionLimit: "N/A",
    suspectedAdulterant: "Argemone Oil",
    confidence: 99,
    risk: "HIGH",
    status: "Completed"
  },
  {
    id: "FG-2026-007",
    food: "Tea",
    brand: "Demo Brand G",
    batchNumber: "B-107",
    testDate: new Date().toISOString().split('T')[0],
    testType: "Added Colour Screening",
    testResult: "Positive",
    parameter: "Bismark Brown",
    concentration: "Detected",
    unit: "N/A",
    detectionLimit: "N/A",
    suspectedAdulterant: "Artificial Colour",
    confidence: 88,
    risk: "MODERATE",
    status: "Completed"
  },
  {
    id: "FG-2026-008",
    food: "Coffee",
    brand: "Demo Brand H",
    batchNumber: "B-108",
    testDate: new Date().toISOString().split('T')[0],
    testType: "Foreign Material Screening",
    testResult: "Suspected",
    parameter: "Chicory",
    concentration: "Detected",
    unit: "N/A",
    detectionLimit: "N/A",
    suspectedAdulterant: "Unknown/Other",
    confidence: 70,
    risk: "LOW",
    status: "Completed"
  },
  {
    id: "FG-2026-009",
    food: "Flour",
    brand: "Demo Brand I",
    batchNumber: "B-109",
    testDate: new Date().toISOString().split('T')[0],
    testType: "Foreign Material Screening",
    testResult: "Positive",
    parameter: "Chalk Powder",
    concentration: "Detected",
    unit: "N/A",
    detectionLimit: "N/A",
    suspectedAdulterant: "Foreign Material",
    confidence: 91,
    risk: "MODERATE",
    status: "Completed"
  },
  {
    id: "FG-2026-010",
    food: "Spices",
    brand: "Demo Brand J",
    batchNumber: "B-110",
    testDate: new Date().toISOString().split('T')[0],
    testType: "Artificial Colour Screening",
    testResult: "Positive",
    parameter: "Lead Chromate",
    concentration: "Detected",
    unit: "N/A",
    detectionLimit: "N/A",
    suspectedAdulterant: "Artificial Colour",
    confidence: 96,
    risk: "HIGH",
    status: "Completed"
  }
];

const STORAGE_KEY = "foodguard_samples";

export const storageService = {
  getSamples: () => {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEMO_SAMPLES));
      return DEMO_SAMPLES;
    }
    return JSON.parse(data);
  },

  getSampleById: (id) => {
    const samples = storageService.getSamples();
    return samples.find(s => s.id === id);
  },

  saveSample: (sample) => {
    const samples = storageService.getSamples();
    const existingIndex = samples.findIndex(s => s.id === sample.id);
    if (existingIndex >= 0) {
      samples[existingIndex] = sample;
    } else {
      samples.unshift(sample); // add to top
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(samples));
    return sample;
  },

  deleteSample: (id) => {
    const samples = storageService.getSamples();
    const newSamples = samples.filter(s => s.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newSamples));
  },

  clearDemoData: () => {
    localStorage.removeItem(STORAGE_KEY);
    // Reload demo data immediately
    return storageService.getSamples();
  },
  
  getDashboardStats: () => {
    const samples = storageService.getSamples();
    const adulterated = samples.filter(s => s.risk === "HIGH" || s.risk === "MODERATE").length;
    const highRisk = samples.filter(s => s.risk === "HIGH").length;
    const pending = samples.filter(s => s.status === "Pending" || s.status === "Under Review").length;
    return {
      total: samples.length,
      adulterated,
      highRisk,
      pending
    };
  }
};
