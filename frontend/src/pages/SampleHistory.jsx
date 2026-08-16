import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, ArrowRight, FileText } from 'lucide-react';
import { storageService } from '../services/storageService';

const SampleHistory = () => {
  const [samples, setSamples] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRisk, setFilterRisk] = useState('All');
  
  useEffect(() => {
    setSamples(storageService.getSamples());
  }, []);

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset demo data? This will restore the initial dataset.")) {
      const resetSamples = storageService.clearDemoData();
      setSamples(resetSamples);
    }
  };

  const filteredSamples = samples.filter(sample => {
    const matchesSearch = 
      sample.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
      sample.food.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sample.suspectedAdulterant.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRisk = filterRisk === 'All' || sample.risk === filterRisk;
    
    return matchesSearch && matchesRisk;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Sample History</h1>
          <p className="text-[#666666] text-sm mt-1">Review previously analyzed samples and demo data.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={handleReset}
            className="px-4 py-2 border border-[#E5E5E5] bg-white text-[#666666] text-sm font-medium rounded-lg hover:text-black hover:bg-[#F5F5F5] transition-colors"
          >
            Reset Demo Data
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-[#E5E5E5] shadow-[0_1px_3px_0_rgba(0,0,0,0.1)] overflow-hidden">
        
        {/* Filters */}
        <div className="p-4 border-b border-[#E5E5E5] flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#999999]" />
            <input 
              type="text" 
              placeholder="Search by ID, Food, or Adulterant..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-[#E5E5E5] rounded-lg text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter size={18} className="text-[#666666]" />
            <select 
              value={filterRisk} 
              onChange={(e) => setFilterRisk(e.target.value)}
              className="px-4 py-2 border border-[#E5E5E5] rounded-lg text-sm focus:outline-none focus:border-black bg-white min-w-[150px]"
            >
              <option value="All">All Risks</option>
              <option value="HIGH">High Risk</option>
              <option value="MODERATE">Moderate Risk</option>
              <option value="LOW">Low Risk</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-[#F5F5F5] text-[#666666] text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-medium">Sample ID</th>
                <th className="px-6 py-4 font-medium">Food</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Result / Adulterant</th>
                <th className="px-6 py-4 font-medium">Confidence</th>
                <th className="px-6 py-4 font-medium">Risk</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E5E5]">
              {filteredSamples.map((sample) => (
                <tr key={sample.id} className="hover:bg-[#F9F9F9] transition-colors">
                  <td className="px-6 py-4 font-bold text-black">{sample.id}</td>
                  <td className="px-6 py-4 font-medium text-[#666666]">{sample.food}</td>
                  <td className="px-6 py-4 text-[#666666]">{sample.testDate}</td>
                  <td className="px-6 py-4 font-medium text-black max-w-[200px] truncate" title={sample.suspectedAdulterant}>
                    {sample.suspectedAdulterant}
                  </td>
                  <td className="px-6 py-4 text-[#666666]">{sample.confidence ? `${sample.confidence}%` : 'N/A'}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
                      sample.risk === 'HIGH' ? 'bg-black text-white' :
                      sample.risk === 'MODERATE' ? 'bg-[#E5E5E5] text-black border border-[#CCCCCC]' :
                      sample.risk === 'LOW' ? 'bg-white text-[#666666] border border-[#E5E5E5]' :
                      'bg-[#F5F5F5] text-[#666666]'
                    }`}>
                      {sample.risk}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center text-xs font-medium text-[#666666]">
                      {sample.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <Link to={`/result/${sample.id}`} className="inline-flex items-center gap-1 px-3 py-1.5 border border-[#E5E5E5] rounded bg-white text-black text-xs font-medium hover:bg-[#F5F5F5] transition-colors">
                      View <ArrowRight size={14} />
                    </Link>
                  </td>
                </tr>
              ))}
              
              {filteredSamples.length === 0 && (
                <tr>
                  <td colSpan="8" className="px-6 py-12 text-center">
                    <FileText size={32} className="mx-auto text-[#CCCCCC] mb-3" />
                    <p className="text-black font-medium">No samples found.</p>
                    <p className="text-[#666666] text-sm mt-1">Try adjusting your filters or search term.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        <div className="p-4 border-t border-[#E5E5E5] bg-[#F5F5F5] flex justify-between items-center text-xs text-[#666666]">
          <span>Showing {filteredSamples.length} of {samples.length} total samples</span>
          <span className="font-bold tracking-wider text-black">DEMO DATA</span>
        </div>
      </div>
    </div>
  );
};

export default SampleHistory;
