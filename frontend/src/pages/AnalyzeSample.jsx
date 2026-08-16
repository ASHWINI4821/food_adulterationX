import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Beaker, Search, ArrowRight, CheckCircle, Database } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const demoCases = [
  { id: 'DEMO-MILK-001', food: 'Milk', test: 'Starch Detection', result: 'Positive', param: 'Iodine Test' },
  { id: 'DEMO-SUGR-002', food: 'Sugar', test: 'Synthetic Sweetener Screening', result: 'Suspected', param: 'General' },
  { id: 'DEMO-TURM-003', food: 'Turmeric', test: 'Artificial Colour Detection', result: 'Positive', param: 'Metanil Yellow' },
  { id: 'DEMO-CHIL-004', food: 'Chilli Powder', test: 'Synthetic Colour Detection', result: 'Positive', param: 'Rhodamine B' },
  { id: 'DEMO-HONY-005', food: 'Honey', test: 'Sugar/Syrup Screening', result: 'Suspected', param: 'Fructose Ratio' },
  { id: 'DEMO-OIL-006', food: 'Edible Oil', test: 'Argemone Oil Screening', result: 'Negative', param: 'Nitric Acid Test' },
  { id: 'DEMO-TEA-007', food: 'Tea', test: 'Artificial Colour Screening', result: 'Suspected', param: 'Bismark Brown' },
  { id: 'DEMO-COFF-008', food: 'Coffee', test: 'Foreign Material/Starch Screening', result: 'Negative', param: 'Iodine Test' },
  { id: 'DEMO-FLOR-009', food: 'Flour', test: 'Foreign Material Screening', result: 'Suspected', param: 'Chalk/Talc' },
  { id: 'DEMO-SALT-010', food: 'Salt', test: 'Foreign Material Screening', result: 'Negative', param: 'Chalk' }
];

const AnalyzeSample = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { session } = useAuth();
  
  const [formData, setFormData] = useState({
    food: '',
    brand: '',
    batchNumber: '',
    sampleId: '',
    collectionDate: new Date().toISOString().split('T')[0],
    location: '',
    notes: '',
    testType: 'Qualitative',
    testName: '',
    testResult: 'Positive',
    parameter: '',
    measuredValue: '',
    unit: '',
    detectionLimit: '',
    method: '',
    laboratory: '',
    testDate: new Date().toISOString().split('T')[0]
  });

  const handleDemoSelect = (e) => {
    const selected = demoCases.find(c => c.food === e.target.value);
    if (selected) {
      setFormData({
        ...formData,
        food: selected.food,
        sampleId: selected.id,
        testName: selected.test,
        testResult: selected.result,
        parameter: selected.param,
        testType: 'Qualitative',
        brand: 'Demo Brand',
        batchNumber: 'B-' + Math.floor(Math.random() * 10000),
        location: 'Demo Lab',
        laboratory: 'Demo National Lab'
      });
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitAnalysis = async () => {
    setLoading(true);
    setStep(4); // AI Analysis state
    
    // Simulate AI processing delay
    setTimeout(() => {
        // Here we would normally call the backend -> ML service
        // For the hackathon demo, we will pass the data to the result page via state
        navigate('/result', { state: { formData, isDemo: true } });
    }, 2500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold">Analyze Food Sample</h1>
          <p className="text-secondaryText mt-2">Submit laboratory data for AI-powered adulteration screening.</p>
        </div>
        
        {/* Demo Mode Selector */}
        <div className="bg-card border border-border rounded-lg p-3 w-64">
          <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-2">
            Load Demo Case
          </label>
          <select 
            className="w-full bg-background border border-border rounded px-3 py-1.5 text-sm text-white focus:outline-none"
            onChange={handleDemoSelect}
            defaultValue=""
          >
            <option value="" disabled>Select Demo Case...</option>
            {demoCases.map(c => (
              <option key={c.id} value={c.food}>{c.food} ({c.test})</option>
            ))}
          </select>
        </div>
      </div>

      {/* Progress Tracker */}
      <div className="flex items-center justify-between border-b border-border pb-6">
        {['Food Info', 'Test Info', 'Review', 'AI Analysis', 'Result'].map((s, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
              step > i + 1 ? 'bg-white text-black' : 
              step === i + 1 ? 'border-2 border-white text-white' : 'border border-border text-muted'
            }`}>
              {step > i + 1 ? <CheckCircle size={16} /> : i + 1}
            </div>
            <span className={`text-sm ${step >= i + 1 ? 'text-white font-medium' : 'text-muted'}`}>{s}</span>
            {i < 4 && <div className="w-12 h-px bg-border mx-2"></div>}
          </div>
        ))}
      </div>

      {/* Form Content */}
      <div className="bg-card border border-border rounded-xl p-8">
        
        {step === 1 && (
          <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
            <h2 className="text-xl font-semibold mb-4">Sample Information</h2>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-secondaryText mb-1">Food Category/Name</label>
                <input type="text" name="food" value={formData.food} onChange={handleChange} className="w-full bg-background border border-border rounded-lg px-4 py-2 text-white" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-secondaryText mb-1">Sample ID</label>
                <input type="text" name="sampleId" value={formData.sampleId} onChange={handleChange} className="w-full bg-background border border-border rounded-lg px-4 py-2 text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-secondaryText mb-1">Brand</label>
                <input type="text" name="brand" value={formData.brand} onChange={handleChange} className="w-full bg-background border border-border rounded-lg px-4 py-2 text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-secondaryText mb-1">Batch Number</label>
                <input type="text" name="batchNumber" value={formData.batchNumber} onChange={handleChange} className="w-full bg-background border border-border rounded-lg px-4 py-2 text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-secondaryText mb-1">Collection Date</label>
                <input type="date" name="collectionDate" value={formData.collectionDate} onChange={handleChange} className="w-full bg-background border border-border rounded-lg px-4 py-2 text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-secondaryText mb-1">Location</label>
                <input type="text" name="location" value={formData.location} onChange={handleChange} className="w-full bg-background border border-border rounded-lg px-4 py-2 text-white" />
              </div>
            </div>
            <div className="pt-4 flex justify-end">
              <button onClick={() => setStep(2)} className="bg-white text-black font-semibold rounded-lg px-6 py-2 flex items-center gap-2 hover:bg-surface transition-colors">
                Next Step <ArrowRight size={18} />
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
            <h2 className="text-xl font-semibold mb-4">Laboratory Test Information</h2>
            
            <div className="flex gap-4 mb-6">
              <label className="flex items-center gap-2">
                <input type="radio" name="testType" value="Qualitative" checked={formData.testType === 'Qualitative'} onChange={handleChange} className="text-white" />
                <span>Qualitative</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="testType" value="Quantitative" checked={formData.testType === 'Quantitative'} onChange={handleChange} className="text-white" />
                <span>Quantitative</span>
              </label>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-secondaryText mb-1">Test Name</label>
                <input type="text" name="testName" value={formData.testName} onChange={handleChange} className="w-full bg-background border border-border rounded-lg px-4 py-2 text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-secondaryText mb-1">Parameter Evaluated</label>
                <input type="text" name="parameter" value={formData.parameter} onChange={handleChange} className="w-full bg-background border border-border rounded-lg px-4 py-2 text-white" />
              </div>

              {formData.testType === 'Qualitative' ? (
                <div>
                  <label className="block text-sm font-medium text-secondaryText mb-1">Result</label>
                  <select name="testResult" value={formData.testResult} onChange={handleChange} className="w-full bg-background border border-border rounded-lg px-4 py-2 text-white">
                    <option value="Positive">Positive</option>
                    <option value="Negative">Negative</option>
                    <option value="Suspected">Suspected</option>
                    <option value="Not Detected">Not Detected</option>
                  </select>
                </div>
              ) : (
                <>
                  <div>
                    <label className="block text-sm font-medium text-secondaryText mb-1">Measured Value</label>
                    <input type="number" name="measuredValue" value={formData.measuredValue} onChange={handleChange} className="w-full bg-background border border-border rounded-lg px-4 py-2 text-white" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-secondaryText mb-1">Unit</label>
                    <input type="text" name="unit" value={formData.unit} onChange={handleChange} className="w-full bg-background border border-border rounded-lg px-4 py-2 text-white" />
                  </div>
                </>
              )}
              
              <div>
                <label className="block text-sm font-medium text-secondaryText mb-1">Laboratory</label>
                <input type="text" name="laboratory" value={formData.laboratory} onChange={handleChange} className="w-full bg-background border border-border rounded-lg px-4 py-2 text-white" />
              </div>
            </div>

            <div className="pt-4 flex justify-between">
              <button onClick={() => setStep(1)} className="border border-border text-white rounded-lg px-6 py-2 hover:bg-secondary transition-colors">Back</button>
              <button onClick={() => setStep(3)} className="bg-white text-black font-semibold rounded-lg px-6 py-2 flex items-center gap-2 hover:bg-surface transition-colors">
                Review <ArrowRight size={18} />
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
            <h2 className="text-xl font-semibold mb-4">Review Submission</h2>
            
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-muted uppercase tracking-wider border-b border-border pb-2">Sample</h3>
                <div>
                  <div className="text-sm text-secondaryText">Food</div>
                  <div className="font-medium">{formData.food}</div>
                </div>
                <div>
                  <div className="text-sm text-secondaryText">Sample ID</div>
                  <div className="font-medium">{formData.sampleId}</div>
                </div>
                <div>
                  <div className="text-sm text-secondaryText">Brand / Batch</div>
                  <div className="font-medium">{formData.brand || 'N/A'} / {formData.batchNumber || 'N/A'}</div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-muted uppercase tracking-wider border-b border-border pb-2">Test Data</h3>
                <div>
                  <div className="text-sm text-secondaryText">Test ({formData.testType})</div>
                  <div className="font-medium">{formData.testName}</div>
                </div>
                <div>
                  <div className="text-sm text-secondaryText">Result</div>
                  <div className={`font-medium ${formData.testResult === 'Positive' || formData.testResult === 'Suspected' ? 'text-riskHigh' : 'text-riskLow'}`}>
                    {formData.testResult} {formData.testType === 'Quantitative' ? `${formData.measuredValue} ${formData.unit}` : ''}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-secondaryText">Laboratory</div>
                  <div className="font-medium">{formData.laboratory || 'N/A'}</div>
                </div>
              </div>
            </div>

            <div className="pt-8 flex justify-between">
              <button onClick={() => setStep(2)} className="border border-border text-white rounded-lg px-6 py-2 hover:bg-secondary transition-colors">Back</button>
              <button onClick={submitAnalysis} className="bg-white text-black font-semibold rounded-lg px-6 py-2 flex items-center gap-2 hover:bg-surface transition-colors">
                Run AI Analysis <Database size={18} />
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="py-16 flex flex-col items-center justify-center space-y-6 animate-in fade-in duration-500">
            <div className="relative">
              <div className="w-24 h-24 border-4 border-border border-t-white rounded-full animate-spin"></div>
              <Database className="w-8 h-8 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse" />
            </div>
            <div className="text-center space-y-2">
              <h2 className="text-xl font-bold">Analyzing Sample</h2>
              <p className="text-secondaryText animate-pulse">Running ML models and checking regulatory databases...</p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default AnalyzeSample;
