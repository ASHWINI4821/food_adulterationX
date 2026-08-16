import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Download, ShieldAlert, ArrowRight, Printer } from 'lucide-react';
import { storageService } from '../services/storageService';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

const Reports = () => {
  const [samples, setSamples] = useState([]);
  const [selectedSample, setSelectedSample] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const reportRef = useRef(null);

  useEffect(() => {
    const data = storageService.getSamples();
    setSamples(data);
    if (data.length > 0) setSelectedSample(data[0]);
  }, []);

  const handleGeneratePDF = async () => {
    if (!reportRef.current || !selectedSample) return;
    
    setIsGenerating(true);
    try {
      // Small delay to ensure rendering
      await new Promise(r => setTimeout(r, 100));
      
      const canvas = await html2canvas(reportRef.current, { scale: 2, useCORS: true });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`FoodGuard_Report_${selectedSample.id}.pdf`);
    } catch (error) {
      console.error('Failed to generate PDF', error);
      alert('PDF generation failed. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="mb-2">
        <h1 className="text-2xl font-bold tracking-tight">Food Safety Reports</h1>
        <p className="text-[#666666] text-sm mt-1">Generate and download professional food safety screening reports.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Selection Column */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white rounded-xl border border-[#E5E5E5] shadow-[0_1px_3px_0_rgba(0,0,0,0.1)] overflow-hidden">
            <div className="p-4 border-b border-[#E5E5E5] bg-[#F5F5F5]">
              <h2 className="text-sm font-bold text-black">Select Sample</h2>
            </div>
            <div className="max-h-[600px] overflow-y-auto p-2">
              {samples.map(sample => (
                <button
                  key={sample.id}
                  onClick={() => setSelectedSample(sample)}
                  className={`w-full text-left p-3 rounded-lg mb-1 transition-colors flex flex-col gap-1 ${
                    selectedSample?.id === sample.id 
                      ? 'bg-black text-white' 
                      : 'bg-white text-black hover:bg-[#F5F5F5]'
                  }`}
                >
                  <div className="flex justify-between items-center w-full">
                    <span className="font-bold text-sm">{sample.id}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                      selectedSample?.id === sample.id ? 'bg-white/20 text-white' : 'bg-[#E5E5E5] text-[#666666]'
                    }`}>{sample.risk}</span>
                  </div>
                  <span className={`text-xs ${selectedSample?.id === sample.id ? 'text-gray-300' : 'text-[#666666]'}`}>{sample.food} • {sample.testDate}</span>
                </button>
              ))}
              {samples.length === 0 && (
                <p className="text-sm text-[#666666] p-4 text-center">No samples available.</p>
              )}
            </div>
          </div>
        </div>

        {/* Report Preview Column */}
        <div className="lg:col-span-2">
          {selectedSample ? (
            <div className="space-y-4">
              <div className="flex justify-end gap-3">
                <button 
                  onClick={handleGeneratePDF}
                  disabled={isGenerating}
                  className="flex items-center gap-2 px-4 py-2 bg-black text-white text-sm font-medium rounded-lg hover:bg-black/90 transition-colors disabled:opacity-50"
                >
                  {isGenerating ? (
                    <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div> Generating...</>
                  ) : (
                    <><Download size={16} /> Download PDF</>
                  )}
                </button>
              </div>

              {/* Printable Area Wrapper */}
              <div className="bg-white border border-[#E5E5E5] shadow-[0_1px_3px_0_rgba(0,0,0,0.1)] overflow-x-auto p-4 md:p-8">
                
                {/* PDF Content Area */}
                <div 
                  ref={reportRef} 
                  className="bg-white text-black p-8 max-w-[800px] mx-auto"
                  style={{ minHeight: '1056px', fontFamily: 'Inter, sans-serif' }}
                >
                  {/* Report Header */}
                  <div className="flex justify-between items-start border-b-2 border-black pb-6 mb-8">
                    <div>
                      <h1 className="text-3xl font-black tracking-tighter mb-1">FOODGUARD AI</h1>
                      <p className="text-sm font-bold tracking-wider text-[#666666] uppercase">Food Safety Screening Report</p>
                    </div>
                    <div className="text-right text-xs text-[#666666] space-y-1">
                      <p>Report ID: <span className="font-medium text-black">REP-{Math.floor(100000 + Math.random() * 900000)}</span></p>
                      <p>Generated: <span className="font-medium text-black">{new Date().toLocaleDateString()}</span></p>
                      <p className="mt-2 inline-block px-2 py-1 bg-black text-white font-bold tracking-wider uppercase text-[10px]">Demo Data</p>
                    </div>
                  </div>

                  {/* Sample Info */}
                  <div className="mb-8">
                    <h2 className="text-sm font-bold uppercase tracking-wider border-b border-[#E5E5E5] pb-2 mb-4">Sample Information</h2>
                    <div className="grid grid-cols-2 gap-y-4 text-sm">
                      <div><span className="text-[#666666]">Sample ID:</span> <span className="font-bold">{selectedSample.id}</span></div>
                      <div><span className="text-[#666666]">Food Category:</span> <span className="font-bold">{selectedSample.food}</span></div>
                      <div><span className="text-[#666666]">Brand/Source:</span> <span className="font-bold">{selectedSample.brand || 'N/A'}</span></div>
                      <div><span className="text-[#666666]">Batch Number:</span> <span className="font-bold">{selectedSample.batchNumber || 'N/A'}</span></div>
                      <div><span className="text-[#666666]">Collection Date:</span> <span className="font-bold">{selectedSample.testDate}</span></div>
                    </div>
                  </div>

                  {/* Test Info */}
                  <div className="mb-8">
                    <h2 className="text-sm font-bold uppercase tracking-wider border-b border-[#E5E5E5] pb-2 mb-4">Laboratory/Test Information</h2>
                    <div className="grid grid-cols-2 gap-y-4 text-sm bg-[#F5F5F5] p-4 rounded-lg">
                      <div><span className="text-[#666666]">Test Method:</span> <span className="font-bold">{selectedSample.testType}</span></div>
                      <div><span className="text-[#666666]">Qualitative Result:</span> <span className="font-bold">{selectedSample.testResult}</span></div>
                      <div><span className="text-[#666666]">Parameter:</span> <span className="font-bold">{selectedSample.parameter}</span></div>
                      <div><span className="text-[#666666]">Measured Value:</span> <span className="font-bold">{selectedSample.concentration} {selectedSample.concentration !== 'N/A' && selectedSample.concentration !== 'Detected' ? selectedSample.unit : ''}</span></div>
                    </div>
                  </div>

                  {/* AI Analysis */}
                  <div className="mb-8">
                    <h2 className="text-sm font-bold uppercase tracking-wider border-b border-[#E5E5E5] pb-2 mb-4">AI Screening Analysis</h2>
                    
                    <div className="flex items-start gap-6 mb-6">
                      <div className={`p-6 border-4 w-48 text-center shrink-0 flex flex-col justify-center ${selectedSample.risk === 'HIGH' ? 'border-black bg-black text-white' : 'border-[#E5E5E5] bg-white text-black'}`}>
                        <span className="text-xs font-bold uppercase tracking-wider opacity-80 mb-1">Risk Level</span>
                        <span className="text-3xl font-black">{selectedSample.risk}</span>
                      </div>
                      
                      <div className="flex-1 space-y-4">
                        <div>
                          <p className="text-xs text-[#666666] uppercase tracking-wider">Suspected Adulterant</p>
                          <p className="text-xl font-bold">{selectedSample.suspectedAdulterant}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-xs text-[#666666] uppercase tracking-wider">Confidence Score</p>
                            <p className="text-lg font-bold">{selectedSample.confidence}%</p>
                          </div>
                          <div>
                            <p className="text-xs text-[#666666] uppercase tracking-wider">Analysis Status</p>
                            <p className="text-lg font-bold">{selectedSample.status}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="text-sm border-l-2 border-black pl-4 py-1">
                      <span className="font-bold uppercase tracking-wider text-xs block mb-1">Evidence / References</span>
                      <p className="text-[#666666] italic">{selectedSample.evidence || "Screening flags based on predefined demo database patterns."}</p>
                    </div>
                  </div>

                  {/* Recommendations */}
                  <div className="mb-8 bg-[#F5F5F5] border border-[#E5E5E5] p-6">
                    <h2 className="text-sm font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
                      <ShieldAlert size={16} /> Recommendation
                    </h2>
                    <p className="text-sm font-bold text-black mb-2">Further laboratory confirmation recommended.</p>
                    <ul className="list-disc pl-5 text-sm text-[#666666] space-y-1">
                      <li>Review laboratory result with a certified professional.</li>
                      <li>Collect a confirmatory sample if deemed necessary.</li>
                      <li>Verify applicable regulatory requirements for {selectedSample.food}.</li>
                    </ul>
                  </div>

                  {/* Footer Disclaimer */}
                  <div className="mt-16 pt-6 border-t border-[#E5E5E5] text-[10px] text-[#999999] text-justify leading-relaxed">
                    <p className="mb-2 font-bold text-black">DEMO DATA — FOR SOFTWARE DEMONSTRATION ONLY</p>
                    <p>FoodGuard AI is a screening and decision-support system. It does not replace certified laboratory testing, professional toxicological assessment, or regulatory authorities. This report was generated using synthetic demonstration data and should not be used for actual food safety compliance, legal proceedings, or public health decisions. The quantitative values, risk assessments, and health information presented herein are simulated.</p>
                  </div>

                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-[#E5E5E5] shadow-[0_1px_3px_0_rgba(0,0,0,0.1)] p-12 text-center h-full flex flex-col items-center justify-center min-h-[400px]">
              <FileText size={48} className="text-[#CCCCCC] mb-4" />
              <h2 className="text-lg font-bold text-black mb-2">No Sample Selected</h2>
              <p className="text-[#666666] text-sm max-w-sm mx-auto">Select a sample from the list to view and generate its Food Safety Screening Report.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reports;
