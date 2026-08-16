import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, ChevronRight, AlertCircle, FileText, FlaskConical, Cpu } from 'lucide-react';
import { analysisService } from '../services/analysisService';
import { storageService } from '../services/storageService';

const AnalyzeFood = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisMessage, setAnalysisMessage] = useState('');
  
  const [formData, setFormData] = useState({
    // Step 1: Food Info
    food: '',
    brand: '',
    batchNumber: '',
    sampleId: `FG-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
    collectionDate: new Date().toISOString().split('T')[0],
    
    // Step 2: Test Info
    testType: '',
    testResult: 'Positive',
    parameter: '',
    concentration: '',
    unit: 'mg/kg',
    detectionLimit: '',
  });

  const foods = ['Milk', 'Sugar', 'Turmeric', 'Chilli Powder', 'Honey', 'Edible Oil', 'Tea', 'Coffee', 'Flour', 'Spices', 'Other'];
  const testResults = ['Positive', 'Negative', 'Suspected', 'Not Detected'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const runAnalysis = async () => {
    setStep(3);
    setIsAnalyzing(true);
    
    const messages = [
      "Uploading test information...",
      "Reading sample data...",
      "Analyzing food characteristics...",
      "Checking adulteration patterns...",
      "Comparing available standards...",
      "Assessing risk...",
      "Preparing result..."
    ];

    // Simulate progress
    for (let i = 0; i < messages.length; i++) {
      setAnalysisMessage(messages[i]);
      setAnalysisProgress((i / messages.length) * 100);
      await new Promise(resolve => setTimeout(resolve, 600));
    }
    
    setAnalysisProgress(100);
    
    const result = await analysisService.runAnalysis(formData);
    
    const newSample = {
      id: formData.sampleId,
      food: formData.food,
      brand: formData.brand,
      batchNumber: formData.batchNumber,
      testDate: formData.collectionDate,
      testType: formData.testType,
      testResult: formData.testResult,
      parameter: formData.parameter || 'N/A',
      concentration: formData.concentration || 'N/A',
      unit: formData.unit || 'N/A',
      detectionLimit: formData.detectionLimit || 'N/A',
      suspectedAdulterant: result.suspectedAdulterant,
      confidence: result.confidence,
      risk: result.risk,
      status: result.status,
      evidence: result.evidence
    };

    storageService.saveSample(newSample);
    
    setTimeout(() => {
      navigate(`/result/${newSample.id}`);
    }, 500);
  };

  const loadDemo = (food) => {
    const demoData = {
      'Turmeric': { testType: 'Artificial Colour Detection', testResult: 'Positive', parameter: 'Metanil Yellow', concentration: '120', unit: 'mg/kg' },
      'Milk': { testType: 'Starch Detection', testResult: 'Positive', parameter: 'Starch', concentration: 'Detected', unit: 'N/A' },
      'Honey': { testType: 'Sugar/Syrup Screening', testResult: 'Suspected', parameter: 'C4 Sugars', concentration: '15', unit: '%' }
    };
    
    if(demoData[food]) {
      setFormData(prev => ({ ...prev, food, ...demoData[food] }));
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Analyze Food Sample</h1>
        <p className="text-[#666666] text-sm mt-1">Enter sample and laboratory test information to screen for potential adulteration.</p>
      </div>

      {/* Progress Indicator */}
      <div className="flex items-center justify-between mb-8 relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-[#E5E5E5] -z-10"></div>
        <div className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 bg-black -z-10 transition-all duration-300" style={{ width: `${((step - 1) / 2) * 100}%` }}></div>
        
        {[
          { num: 1, label: 'Food', icon: <FileText size={16} /> },
          { num: 2, label: 'Test', icon: <FlaskConical size={16} /> },
          { num: 3, label: 'Analysis', icon: <Cpu size={16} /> }
        ].map((s) => (
          <div key={s.num} className="flex flex-col items-center bg-[#F5F5F5] px-2">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors border-2 ${
              step >= s.num ? 'bg-black text-white border-black' : 'bg-white text-[#666666] border-[#E5E5E5]'
            }`}>
              {step > s.num ? <Check size={20} /> : s.num}
            </div>
            <span className={`text-xs font-medium mt-2 ${step >= s.num ? 'text-black' : 'text-[#666666]'}`}>{s.label}</span>
          </div>
        ))}
      </div>

      {/* Form Container */}
      <div className="bg-white rounded-xl border border-[#E5E5E5] shadow-[0_1px_3px_0_rgba(0,0,0,0.1),0_1px_2px_-1px_rgba(0,0,0,0.1)] overflow-hidden">
        
        {/* Step 1: Food Information */}
        {step === 1 && (
          <div className="p-6 md:p-8 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold">Food Information</h2>
              <div className="flex gap-2">
                <button onClick={() => loadDemo('Turmeric')} className="text-[10px] px-2 py-1 bg-[#F5F5F5] border border-[#E5E5E5] rounded hover:bg-black hover:text-white transition-colors">Load Turmeric Demo</button>
                <button onClick={() => loadDemo('Milk')} className="text-[10px] px-2 py-1 bg-[#F5F5F5] border border-[#E5E5E5] rounded hover:bg-black hover:text-white transition-colors">Load Milk Demo</button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#666666] uppercase tracking-wider">Food Category *</label>
                <select name="food" value={formData.food} onChange={handleInputChange} className="w-full p-2.5 border border-[#E5E5E5] rounded-lg focus:outline-none focus:border-black focus:ring-1 focus:ring-black text-sm bg-white" required>
                  <option value="">Select food...</option>
                  {foods.map(f => <option key={f} value={f}>{f}</option>)}
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#666666] uppercase tracking-wider">Sample ID</label>
                <input type="text" name="sampleId" value={formData.sampleId} onChange={handleInputChange} className="w-full p-2.5 border border-[#E5E5E5] rounded-lg focus:outline-none focus:border-black focus:ring-1 focus:ring-black text-sm bg-[#F5F5F5]" readOnly />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#666666] uppercase tracking-wider">Brand / Manufacturer</label>
                <input type="text" name="brand" value={formData.brand} onChange={handleInputChange} className="w-full p-2.5 border border-[#E5E5E5] rounded-lg focus:outline-none focus:border-black focus:ring-1 focus:ring-black text-sm" placeholder="e.g. Local Market" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#666666] uppercase tracking-wider">Batch Number</label>
                <input type="text" name="batchNumber" value={formData.batchNumber} onChange={handleInputChange} className="w-full p-2.5 border border-[#E5E5E5] rounded-lg focus:outline-none focus:border-black focus:ring-1 focus:ring-black text-sm" placeholder="e.g. B-12345" />
              </div>
              <div className="space-y-1 md:col-span-2">
                <label className="text-xs font-semibold text-[#666666] uppercase tracking-wider">Collection Date</label>
                <input type="date" name="collectionDate" value={formData.collectionDate} onChange={handleInputChange} className="w-full p-2.5 border border-[#E5E5E5] rounded-lg focus:outline-none focus:border-black focus:ring-1 focus:ring-black text-sm" />
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <button 
                onClick={nextStep} 
                disabled={!formData.food}
                className="flex items-center gap-2 px-6 py-2.5 bg-black text-white font-medium rounded-lg hover:bg-black/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next Step <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Test Information */}
        {step === 2 && (
          <div className="p-6 md:p-8 animate-in fade-in slide-in-from-right-4 duration-300">
            <h2 className="text-lg font-bold mb-6">Laboratory Test Information</h2>
            
            <div className="bg-[#F5F5F5] border border-[#E5E5E5] p-4 rounded-lg mb-6 flex items-start gap-3">
              <AlertCircle size={20} className="text-[#666666] flex-shrink-0 mt-0.5" />
              <p className="text-xs text-[#666666] leading-relaxed">
                Enter the structured data from the laboratory report. The AI screening engine relies on this test information to perform risk assessment and regulatory comparison.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1 md:col-span-2">
                <label className="text-xs font-semibold text-[#666666] uppercase tracking-wider">Test Name / Method *</label>
                <input type="text" name="testType" value={formData.testType} onChange={handleInputChange} className="w-full p-2.5 border border-[#E5E5E5] rounded-lg focus:outline-none focus:border-black focus:ring-1 focus:ring-black text-sm" placeholder="e.g. Artificial Colour Detection" required />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#666666] uppercase tracking-wider">Qualitative Result *</label>
                <select name="testResult" value={formData.testResult} onChange={handleInputChange} className="w-full p-2.5 border border-[#E5E5E5] rounded-lg focus:outline-none focus:border-black focus:ring-1 focus:ring-black text-sm bg-white" required>
                  {testResults.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#666666] uppercase tracking-wider">Specific Parameter</label>
                <input type="text" name="parameter" value={formData.parameter} onChange={handleInputChange} className="w-full p-2.5 border border-[#E5E5E5] rounded-lg focus:outline-none focus:border-black focus:ring-1 focus:ring-black text-sm" placeholder="e.g. Metanil Yellow" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#666666] uppercase tracking-wider">Measured Concentration</label>
                <input type="text" name="concentration" value={formData.concentration} onChange={handleInputChange} className="w-full p-2.5 border border-[#E5E5E5] rounded-lg focus:outline-none focus:border-black focus:ring-1 focus:ring-black text-sm" placeholder="e.g. 120" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#666666] uppercase tracking-wider">Unit</label>
                <input type="text" name="unit" value={formData.unit} onChange={handleInputChange} className="w-full p-2.5 border border-[#E5E5E5] rounded-lg focus:outline-none focus:border-black focus:ring-1 focus:ring-black text-sm" placeholder="e.g. mg/kg" />
              </div>
            </div>

            <div className="mt-8 flex justify-between">
              <button 
                onClick={prevStep} 
                className="px-6 py-2.5 border border-[#E5E5E5] bg-white text-black font-medium rounded-lg hover:bg-[#F5F5F5] transition-colors"
              >
                Back
              </button>
              <button 
                onClick={runAnalysis} 
                disabled={!formData.testType}
                className="flex items-center gap-2 px-6 py-2.5 bg-black text-white font-medium rounded-lg hover:bg-black/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Run AI Analysis
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Analysis Loading */}
        {step === 3 && (
          <div className="p-12 text-center flex flex-col items-center justify-center min-h-[400px]">
            <div className="relative w-24 h-24 mb-8">
              <div className="absolute inset-0 border-4 border-[#E5E5E5] rounded-full"></div>
              <div className="absolute inset-0 border-4 border-black rounded-full border-t-transparent animate-spin"></div>
              <Cpu size={32} className="absolute inset-0 m-auto text-black animate-pulse" />
            </div>
            
            <h2 className="text-xl font-bold mb-2">Analyzing Sample</h2>
            <p className="text-[#666666] text-sm h-6 transition-all">{analysisMessage}</p>
            
            <div className="w-full max-w-md mt-8 bg-[#F5F5F5] rounded-full h-1.5 overflow-hidden">
              <div 
                className="bg-black h-1.5 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${analysisProgress}%` }}
              ></div>
            </div>
            
            <p className="mt-8 text-xs text-[#999999]">
              Cross-referencing demo database rules and patterns...
            </p>
          </div>
        )}

      </div>
    </div>
  );
};

export default AnalyzeFood;
