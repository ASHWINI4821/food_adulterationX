import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import { ShieldAlert, CheckCircle, FileText, Download, ArrowLeft, Info, AlertTriangle } from 'lucide-react';

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [result, setResult] = useState(null);
  
  // In a real app, this would fetch the AI result or we'd receive it from the previous component.
  // For the hackathon, we simulate the ML endpoint response based on the demo data passed in state.
  useEffect(() => {
    if (location.state?.formData) {
      const data = location.state.formData;
      
      // Simulate the FastAPI response mapping
      let riskLevel = 'LOW';
      let adulterant = 'None detected';
      let confidence = 0.99;
      let evidence = 'Negative test result.';
      let comparison = 'WITHIN LIMIT';
      let limitValue = 'N/A';
      
      if (data.testResult === 'Positive' || data.testResult === 'Suspected') {
        if (data.food === 'Milk') {
          adulterant = 'Starch'; confidence = 0.95; riskLevel = 'MODERATE'; evidence = 'Positive Iodine Test result.';
          comparison = 'NO APPLICABLE STANDARD';
        } else if (data.food === 'Sugar') {
          adulterant = 'Synthetic Sweetener'; confidence = 0.82; riskLevel = 'MODERATE'; evidence = 'Suspected presence.';
        } else if (data.food === 'Turmeric') {
          adulterant = 'Artificial Colour (Metanil Yellow)'; confidence = 0.98; riskLevel = 'HIGH'; evidence = 'Positive detection of Metanil Yellow.';
          comparison = 'ABOVE LIMIT'; limitValue = '0.0 mg/kg';
        } else if (data.food === 'Chilli Powder') {
          adulterant = 'Artificial Colour (Rhodamine B)'; confidence = 0.96; riskLevel = 'HIGH'; evidence = 'Positive detection of Rhodamine B.';
          comparison = 'ABOVE LIMIT'; limitValue = '0.0 mg/kg';
        } else if (data.food === 'Honey') {
          adulterant = 'Added Syrup'; confidence = 0.75; riskLevel = 'LOW'; evidence = 'Suspected altered fructose ratio.';
        } else if (data.food === 'Tea') {
          adulterant = 'Artificial Colour'; confidence = 0.70; riskLevel = 'MODERATE'; evidence = 'Suspected presence of Bismark Brown.';
        } else if (data.food === 'Flour') {
          adulterant = 'Foreign Material'; confidence = 0.85; riskLevel = 'LOW'; evidence = 'Suspected presence of Chalk/Talc.';
        } else {
           adulterant = 'Unknown Adulterant'; confidence = 0.65; riskLevel = 'UNKNOWN'; evidence = 'Insufficient evidence for reliable adulterant identification.';
        }
      }

      setResult({
        sampleId: data.sampleId || 'SMP-' + Math.floor(Math.random()*10000),
        food: data.food,
        test: data.testName,
        testResult: data.testResult,
        measuredValue: data.measuredValue || 'N/A',
        unit: data.unit || '',
        adulterant,
        confidence,
        evidence,
        riskLevel,
        comparison,
        limitValue,
        source: 'FSSAI Standards 2023',
        healthInfo: 'Health information is educational and does not constitute medical advice. Exposure to unauthorized adulterants may cause adverse gastrointestinal or systemic effects depending on concentration.'
      });
    }
  }, [location.state]);

  if (!location.state?.formData) {
    return <Navigate to="/analyze" replace />;
  }

  if (!result) return null;

  const riskColors = {
    LOW: 'text-riskLow border-riskLow bg-riskLow/10',
    MODERATE: 'text-riskModerate border-riskModerate bg-riskModerate/10',
    HIGH: 'text-riskHigh border-riskHigh bg-riskHigh/10',
    UNKNOWN: 'text-riskUnknown border-riskUnknown bg-riskUnknown/10'
  };

  const currentRiskColor = riskColors[result.riskLevel];

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500 pb-12">
      <div className="flex justify-between items-center">
        <button onClick={() => navigate('/history')} className="flex items-center gap-2 text-secondaryText hover:text-white transition-colors">
          <ArrowLeft size={18} /> Back to Samples
        </button>
        <div className="flex gap-4">
          <button className="border border-border text-white rounded-lg px-4 py-2 flex items-center gap-2 hover:bg-secondary transition-colors">
            <Info size={18} /> View Evidence
          </button>
          <button className="bg-white text-black font-semibold rounded-lg px-4 py-2 flex items-center gap-2 hover:bg-surface transition-colors">
            <Download size={18} /> Generate PDF Report
          </button>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-subtle">
        
        {/* Header */}
        <div className="p-8 border-b border-border flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">FOOD SAFETY SCREENING RESULT</h1>
            <div className="flex gap-6 text-secondaryText text-sm">
              <span><span className="font-medium text-white">Food:</span> {result.food}</span>
              <span><span className="font-medium text-white">Sample ID:</span> {result.sampleId}</span>
              <span><span className="font-medium text-white">Analysis ID:</span> ANL-{Math.floor(Math.random()*100000)}</span>
            </div>
          </div>
          <div className={`flex items-center gap-3 px-6 py-3 rounded-xl border ${currentRiskColor}`}>
            {result.riskLevel === 'LOW' ? <CheckCircle size={24} /> : <ShieldAlert size={24} />}
            <div>
              <div className="text-xs font-bold uppercase tracking-wider opacity-80">Risk Level</div>
              <div className="text-xl font-bold">{result.riskLevel}</div>
            </div>
          </div>
        </div>

        <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* AI Detection */}
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold flex items-center gap-2 mb-4 border-b border-border pb-2">
                <AlertTriangle size={18} className="text-muted" /> AI Detection
              </h2>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-background rounded-lg p-4 border border-border">
                  <div className="text-xs text-secondaryText uppercase tracking-wider mb-1">Suspected Adulterant</div>
                  <div className={`font-semibold ${result.adulterant !== 'None detected' ? 'text-white' : 'text-riskLow'}`}>
                    {result.adulterant}
                  </div>
                </div>
                <div className="bg-background rounded-lg p-4 border border-border">
                  <div className="text-xs text-secondaryText uppercase tracking-wider mb-1">Confidence Score</div>
                  <div className="font-semibold text-white">{(result.confidence * 100).toFixed(1)}%</div>
                </div>
              </div>
              <div className="bg-background rounded-lg p-4 border border-border">
                <div className="text-xs text-secondaryText uppercase tracking-wider mb-1">Evidence</div>
                <div className="text-sm text-white">{result.evidence}</div>
              </div>
            </div>

            {/* Regulatory */}
            <div>
              <h2 className="text-lg font-semibold flex items-center gap-2 mb-4 border-b border-border pb-2 mt-8">
                <FileText size={18} className="text-muted" /> Regulatory Comparison
              </h2>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-background rounded-lg p-4 border border-border">
                  <div className="text-xs text-secondaryText uppercase tracking-wider mb-1">Applicable Limit</div>
                  <div className="font-semibold text-white">{result.limitValue}</div>
                </div>
                <div className="bg-background rounded-lg p-4 border border-border">
                  <div className="text-xs text-secondaryText uppercase tracking-wider mb-1">Comparison</div>
                  <div className={`font-semibold ${result.comparison === 'ABOVE LIMIT' ? 'text-riskHigh' : result.comparison === 'WITHIN LIMIT' ? 'text-riskLow' : 'text-muted'}`}>
                    {result.comparison}
                  </div>
                </div>
              </div>
              <div className="text-xs text-secondaryText">Source: {result.source}</div>
            </div>
          </div>

          {/* Test & Health */}
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold flex items-center gap-2 mb-4 border-b border-border pb-2">
                <FileText size={18} className="text-muted" /> Laboratory Measurement
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-background rounded-lg p-4 border border-border">
                  <div className="text-xs text-secondaryText uppercase tracking-wider mb-1">Test</div>
                  <div className="font-semibold text-white">{result.test}</div>
                </div>
                <div className="bg-background rounded-lg p-4 border border-border">
                  <div className="text-xs text-secondaryText uppercase tracking-wider mb-1">Result</div>
                  <div className={`font-semibold ${result.testResult === 'Positive' || result.testResult === 'Suspected' ? 'text-riskHigh' : 'text-riskLow'}`}>
                    {result.testResult}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold flex items-center gap-2 mb-4 border-b border-border pb-2 mt-8">
                <Info size={18} className="text-muted" /> Health Information
              </h2>
              <div className="bg-background rounded-lg p-6 border border-border">
                <p className="text-sm text-secondaryText leading-relaxed">
                  {result.healthInfo}
                </p>
              </div>
            </div>

            <div className="mt-8 bg-secondary/50 rounded-lg p-6 border border-border">
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-2">Recommendation</h3>
              <p className="text-white text-sm">
                {result.riskLevel === 'LOW' 
                  ? "No further action required. Sample passes preliminary screening." 
                  : "Further laboratory confirmation recommended. Isolate batch until confirmatory tests are complete."}
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Result;
