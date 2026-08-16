import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { UploadCloud, File, CheckCircle, AlertCircle, X, ChevronRight } from 'lucide-react';

const UploadReport = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [uploadState, setUploadState] = useState('idle'); // idle, uploading, extracted, reviewing
  const [uploadProgress, setUploadProgress] = useState(0);
  
  const [extractedData, setExtractedData] = useState({
    food: 'Turmeric',
    sampleId: `FG-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
    testType: 'Artificial Colour Detection',
    testResult: 'Positive',
    parameter: 'Metanil Yellow',
    concentration: '120',
    unit: 'mg/kg',
    laboratory: 'Demo Labs Inc.',
    testDate: new Date().toISOString().split('T')[0]
  });

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (file) => {
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
    if (!validTypes.includes(file.type)) {
      alert("Invalid file format. Please upload PDF, JPG, or PNG.");
      return;
    }
    setFile(file);
    simulateOCR();
  };

  const simulateOCR = async () => {
    setUploadState('uploading');
    setUploadProgress(0);
    
    // Simulate upload and OCR steps
    for (let i = 10; i <= 100; i += 10) {
      setUploadProgress(i);
      await new Promise(r => setTimeout(r, 400));
    }
    
    setUploadState('extracted');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setExtractedData(prev => ({ ...prev, [name]: value }));
  };

  const handleProceed = () => {
    // Store extracted data in sessionStorage to prepopulate Analyze form or pass via state
    // For this frontend demo, we will just navigate to analyze and we would ideally pass state
    // But since AnalyzeFood has its own state, we'll just navigate to AnalyzeFood for now.
    // In a real app, we'd pass this data. Let's just navigate.
    navigate('/analyze');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Upload Laboratory Report</h1>
        <p className="text-[#666666] text-sm mt-1">Upload a PDF or image of a lab report to automatically extract test information.</p>
      </div>

      {uploadState === 'idle' && (
        <div 
          className={`border-2 border-dashed rounded-xl p-12 text-center transition-colors duration-200 ease-in-out ${dragActive ? 'border-black bg-[#F5F5F5]' : 'border-[#E5E5E5] bg-white hover:border-[#CCCCCC]'}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <UploadCloud size={48} className={`mx-auto mb-4 ${dragActive ? 'text-black' : 'text-[#999999]'}`} />
          <p className="text-lg font-bold text-black mb-2">Drag your laboratory report here</p>
          <p className="text-sm text-[#666666] mb-6">or</p>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleChange} 
            className="hidden" 
            accept=".pdf,.jpg,.jpeg,.png"
          />
          <button 
            onClick={() => fileInputRef.current.click()}
            className="px-6 py-2.5 bg-black text-white font-medium rounded-lg hover:bg-black/90 transition-colors"
          >
            Browse Files
          </button>
          <p className="text-xs text-[#999999] mt-6">Supported formats: PDF, JPG, PNG (Max 10MB)</p>
        </div>
      )}

      {uploadState === 'uploading' && (
        <div className="bg-white border border-[#E5E5E5] rounded-xl p-12 text-center shadow-[0_1px_3px_0_rgba(0,0,0,0.1)]">
          <div className="mb-6 flex justify-center">
            <div className="relative">
              <File size={48} className="text-[#E5E5E5]" />
              <div className="absolute inset-0 overflow-hidden" style={{ height: `${100 - uploadProgress}%` }}>
                <File size={48} className="text-black" />
              </div>
            </div>
          </div>
          <h2 className="text-lg font-bold mb-2">Reading laboratory report...</h2>
          <p className="text-sm text-[#666666] mb-6">Demo OCR Processing in progress</p>
          <div className="w-full max-w-md mx-auto bg-[#F5F5F5] rounded-full h-1.5 overflow-hidden">
            <div 
              className="bg-black h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
        </div>
      )}

      {uploadState === 'extracted' && (
        <div className="bg-white border border-[#E5E5E5] rounded-xl overflow-hidden shadow-[0_1px_3px_0_rgba(0,0,0,0.1)]">
          <div className="bg-[#F5F5F5] border-b border-[#E5E5E5] p-4 flex items-start gap-3">
            <AlertCircle size={20} className="text-black shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-black mb-1">Review extracted information before analysis.</p>
              <p className="text-xs text-[#666666]">Please verify that the demo OCR successfully extracted the correct values from your document.</p>
            </div>
          </div>
          
          <div className="p-6 md:p-8">
            <div className="flex items-center gap-4 mb-8 pb-4 border-b border-[#E5E5E5]">
              <div className="w-10 h-10 bg-[#F5F5F5] rounded flex items-center justify-center">
                <FileText size={20} className="text-black" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold truncate">{file?.name}</p>
                <p className="text-xs text-[#666666]">{(file?.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
              <CheckCircle size={20} className="text-black" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#666666] uppercase tracking-wider">Food</label>
                <input type="text" name="food" value={extractedData.food} onChange={handleInputChange} className="w-full p-2.5 border border-[#E5E5E5] rounded-lg text-sm" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#666666] uppercase tracking-wider">Sample ID</label>
                <input type="text" name="sampleId" value={extractedData.sampleId} onChange={handleInputChange} className="w-full p-2.5 border border-[#E5E5E5] rounded-lg text-sm bg-[#F5F5F5]" readOnly />
              </div>
              <div className="space-y-1 md:col-span-2">
                <label className="text-xs font-semibold text-[#666666] uppercase tracking-wider">Test Name</label>
                <input type="text" name="testType" value={extractedData.testType} onChange={handleInputChange} className="w-full p-2.5 border border-[#E5E5E5] rounded-lg text-sm" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#666666] uppercase tracking-wider">Qualitative Result</label>
                <input type="text" name="testResult" value={extractedData.testResult} onChange={handleInputChange} className="w-full p-2.5 border border-[#E5E5E5] rounded-lg text-sm" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#666666] uppercase tracking-wider">Concentration</label>
                <input type="text" name="concentration" value={extractedData.concentration} onChange={handleInputChange} className="w-full p-2.5 border border-[#E5E5E5] rounded-lg text-sm" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#666666] uppercase tracking-wider">Laboratory</label>
                <input type="text" name="laboratory" value={extractedData.laboratory} onChange={handleInputChange} className="w-full p-2.5 border border-[#E5E5E5] rounded-lg text-sm" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#666666] uppercase tracking-wider">Test Date</label>
                <input type="date" name="testDate" value={extractedData.testDate} onChange={handleInputChange} className="w-full p-2.5 border border-[#E5E5E5] rounded-lg text-sm" />
              </div>
            </div>

            <div className="mt-8 flex justify-between">
              <button 
                onClick={() => { setFile(null); setUploadState('idle'); }} 
                className="px-6 py-2.5 border border-[#E5E5E5] bg-white text-black font-medium rounded-lg hover:bg-[#F5F5F5] transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleProceed} 
                className="flex items-center gap-2 px-6 py-2.5 bg-black text-white font-medium rounded-lg hover:bg-black/90 transition-colors"
              >
                Proceed to Analysis <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadReport;
