import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ShieldAlert, CheckCircle, FileText, Download, ArrowLeft, Info, AlertTriangle, Cpu, TestTube, ShieldCheck } from 'lucide-react';
import { storageService } from '../services/storageService';

const AnalysisResult = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [sample, setSample] = useState(null);

  useEffect(() => {
    const data = storageService.getSampleById(id);
    if (data) setSample(data);
  }, [id]);

  if (!sample) return <div className="p-8 text-center text-[#666666]">Loading sample or sample not found...</div>;

  const isHighRisk = sample.risk === 'HIGH';
  const isModerateRisk = sample.risk === 'MODERATE';
  
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-2 border border-[#E5E5E5] rounded-lg hover:bg-[#F5F5F5] transition-colors">
            <ArrowLeft size={18} />
          </button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight uppercase">FOOD SAFETY SCREENING RESULT</h1>
            <div className="flex gap-4 mt-1 text-sm text-[#666666]">
              <span>Sample ID: <span className="font-medium text-black">{sample.id}</span></span>
              <span>Food: <span className="font-medium text-black">{sample.food}</span></span>
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <Link to={`/reports`} className="flex items-center gap-2 px-4 py-2 border border-black bg-black text-white text-sm font-medium rounded-lg hover:bg-black/90 transition-colors">
            <FileText size={16} /> Generate PDF Report
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Main Risk Card */}
        <div className="md:col-span-1 space-y-6">
          <div className={`p-6 rounded-xl border ${
            isHighRisk ? 'bg-black text-white border-black' : 
            isModerateRisk ? 'bg-white border-black text-black shadow-[0_0_0_2px_rgba(0,0,0,1)]' : 
            'bg-white border-[#E5E5E5] text-black shadow-[0_1px_3px_0_rgba(0,0,0,0.1)]'
          }`}>
            <div className="flex items-center gap-2 mb-4">
              {isHighRisk ? <ShieldAlert size={24} /> : <AlertTriangle size={24} />}
              <span className="text-sm font-bold uppercase tracking-wider">Risk Assessment</span>
            </div>
            <div className="text-4xl font-black tracking-tighter mb-2">{sample.risk}</div>
            <p className={`text-sm leading-relaxed mb-6 ${isHighRisk ? 'text-gray-300' : 'text-[#666666]'}`}>
              {isHighRisk ? "Screening result indicates elevated concern." : 
               isModerateRisk ? "Screening indicates moderate concern requiring attention." : 
               "Screening did not detect severe anomalies."}
            </p>
            <div className={`p-3 rounded-lg text-xs font-medium border ${isHighRisk ? 'bg-gray-900 border-gray-700 text-gray-200' : 'bg-[#F5F5F5] border-[#E5E5E5] text-black'}`}>
              Recommendation:<br/>
              Further laboratory confirmation is recommended.
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-[#E5E5E5] shadow-[0_1px_3px_0_rgba(0,0,0,0.1)]">
            <h3 className="text-sm font-bold border-b border-[#E5E5E5] pb-2 mb-3">Sample Information</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-[#666666]">Brand:</span> <span className="font-medium text-right">{sample.brand || 'N/A'}</span></div>
              <div className="flex justify-between"><span className="text-[#666666]">Batch:</span> <span className="font-medium text-right">{sample.batchNumber || 'N/A'}</span></div>
              <div className="flex justify-between"><span className="text-[#666666]">Test Date:</span> <span className="font-medium text-right">{sample.testDate}</span></div>
            </div>
          </div>
        </div>

        {/* Details Column */}
        <div className="md:col-span-2 space-y-6">
          
          <div className="bg-white p-6 rounded-xl border border-[#E5E5E5] shadow-[0_1px_3px_0_rgba(0,0,0,0.1)]">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Cpu size={20} /> AI Detection
            </h2>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-xs text-[#666666] uppercase tracking-wider mb-1">Suspected Adulterant</p>
                <p className="text-xl font-bold">{sample.suspectedAdulterant}</p>
              </div>
              <div>
                <p className="text-xs text-[#666666] uppercase tracking-wider mb-1">Confidence</p>
                <p className="text-xl font-bold">{sample.confidence}%</p>
              </div>
              <div className="col-span-2">
                <p className="text-xs text-[#666666] uppercase tracking-wider mb-1">Evidence</p>
                <div className="bg-[#F5F5F5] p-3 rounded-lg border border-[#E5E5E5] text-sm">
                  {sample.evidence || "Positive laboratory test"}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-[#E5E5E5] shadow-[0_1px_3px_0_rgba(0,0,0,0.1)]">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <TestTube size={20} /> Measurement
            </h2>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-xs text-[#666666] uppercase tracking-wider mb-1">Measured Value</p>
                <p className="text-lg font-bold">{sample.concentration !== 'N/A' && sample.concentration !== 'Detected' ? `${sample.concentration} ${sample.unit}` : sample.concentration}</p>
              </div>
              <div>
                <p className="text-xs text-[#666666] uppercase tracking-wider mb-1">Test Method</p>
                <p className="text-lg font-bold">{sample.testType}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-[#E5E5E5] shadow-[0_1px_3px_0_rgba(0,0,0,0.1)]">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <ShieldCheck size={20} /> Regulatory Comparison
            </h2>
            {sample.concentration && sample.concentration !== 'N/A' && sample.concentration !== 'Detected' ? (
              <table className="w-full text-sm text-left border border-[#E5E5E5] rounded-lg overflow-hidden">
                <thead className="bg-[#F5F5F5] text-[#666666] text-xs uppercase">
                  <tr>
                    <th className="px-4 py-2 border-b border-[#E5E5E5]">Parameter</th>
                    <th className="px-4 py-2 border-b border-[#E5E5E5]">Measured</th>
                    <th className="px-4 py-2 border-b border-[#E5E5E5]">Demo Limit</th>
                    <th className="px-4 py-2 border-b border-[#E5E5E5]">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-4 py-3 font-medium border-b border-[#E5E5E5]">{sample.parameter}</td>
                    <td className="px-4 py-3 border-b border-[#E5E5E5]">{sample.concentration} {sample.unit}</td>
                    <td className="px-4 py-3 border-b border-[#E5E5E5]">{sample.detectionLimit || 'N/A'} {sample.detectionLimit && sample.unit}</td>
                    <td className="px-4 py-3 border-b border-[#E5E5E5]">
                      <span className="bg-black text-white px-2 py-0.5 rounded text-xs font-bold uppercase">Exceeds</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            ) : (
              <div className="bg-[#F5F5F5] p-4 rounded-lg border border-[#E5E5E5] flex items-start gap-3">
                <Info size={20} className="text-[#666666] shrink-0 mt-0.5" />
                <p className="text-sm text-[#666666]">No applicable quantitative standard found in the current demo database for this test type.</p>
              </div>
            )}
          </div>

          <div className="bg-white p-6 rounded-xl border border-[#E5E5E5] shadow-[0_1px_3px_0_rgba(0,0,0,0.1)]">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <AlertTriangle size={20} /> Potential Health Concerns
            </h2>
            <div className="bg-[#F5F5F5] p-4 rounded-lg border border-[#E5E5E5]">
              <p className="text-sm text-black font-medium mb-1">Related to: {sample.suspectedAdulterant}</p>
              <p className="text-xs text-[#666666] mb-3">Potential concern associated with exposure may be displayed based on stored reference information. Verify health information with authoritative sources.</p>
              <div className="text-[10px] text-[#999999] uppercase tracking-wider border-t border-[#E5E5E5] pt-2 mt-2">Source: Demo Database • Last Reviewed: {new Date().getFullYear()}</div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AnalysisResult;
