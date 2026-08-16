import React from 'react';
import { ShieldCheck, Info } from 'lucide-react';

const Regulations = () => {
  const regulations = [
    { food: 'Turmeric', parameter: 'Metanil Yellow', limit: '0 (Not Permitted)', unit: 'mg/kg', jurisdiction: 'Demo Standards Auth', source: 'Demo Regulation 1.0', updated: '2025' },
    { food: 'Milk', parameter: 'Starch', limit: '0 (Not Permitted)', unit: 'mg/L', jurisdiction: 'Demo Standards Auth', source: 'Demo Regulation 1.1', updated: '2025' },
    { food: 'Chilli Powder', parameter: 'Sudan Red', limit: '0 (Not Permitted)', unit: 'mg/kg', jurisdiction: 'Demo Standards Auth', source: 'Demo Regulation 1.0', updated: '2025' },
    { food: 'Honey', parameter: 'C4 Sugars', limit: 'Max 7.0', unit: '%', jurisdiction: 'Demo Standards Auth', source: 'Demo Regulation 2.3', updated: '2024' },
    { food: 'Edible Oil', parameter: 'Argemone Oil', limit: '0 (Not Permitted)', unit: 'mg/kg', jurisdiction: 'Demo Standards Auth', source: 'Demo Regulation 1.4', updated: '2025' },
    { food: 'Tea', parameter: 'Added Colour', limit: '0 (Not Permitted)', unit: 'mg/kg', jurisdiction: 'Demo Standards Auth', source: 'Demo Regulation 1.0', updated: '2023' },
  ];

  return (
    <div className="space-y-6">
      <div className="mb-2">
        <h1 className="text-2xl font-bold tracking-tight">Regulatory References</h1>
        <p className="text-[#666666] text-sm mt-1">Comparison standards used by the AI screening engine.</p>
      </div>

      <div className="bg-[#F5F5F5] border border-[#E5E5E5] p-4 rounded-lg flex items-start gap-3">
        <Info size={20} className="text-black shrink-0 mt-0.5" />
        <div className="text-sm text-[#666666] leading-relaxed">
          <span className="font-bold text-black uppercase tracking-wider mr-2">Demo Data Warning</span>
          <p className="mt-1">
            The regulatory values shown here are for software demonstration only. Never invent or rely on these numbers for real food safety assessments. If a real verified limit is not available, regulatory values will be marked as unavailable. Always verify with the applicable national or local authority.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-[#E5E5E5] shadow-[0_1px_3px_0_rgba(0,0,0,0.1)] overflow-hidden">
        <div className="p-5 border-b border-[#E5E5E5] flex items-center gap-2">
          <ShieldCheck size={20} className="text-black" />
          <h2 className="text-sm font-bold text-black">Demo Safety Limits Database</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-[#F5F5F5] text-[#666666] text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-medium border-b border-[#E5E5E5]">Food</th>
                <th className="px-6 py-4 font-medium border-b border-[#E5E5E5]">Parameter</th>
                <th className="px-6 py-4 font-medium border-b border-[#E5E5E5]">Reference Limit</th>
                <th className="px-6 py-4 font-medium border-b border-[#E5E5E5]">Unit</th>
                <th className="px-6 py-4 font-medium border-b border-[#E5E5E5]">Jurisdiction</th>
                <th className="px-6 py-4 font-medium border-b border-[#E5E5E5]">Source</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E5E5]">
              {regulations.map((reg, idx) => (
                <tr key={idx} className="hover:bg-[#F9F9F9] transition-colors">
                  <td className="px-6 py-4 font-bold text-black">{reg.food}</td>
                  <td className="px-6 py-4 font-medium text-[#666666]">{reg.parameter}</td>
                  <td className="px-6 py-4 font-bold text-black">{reg.limit}</td>
                  <td className="px-6 py-4 text-[#666666]">{reg.unit}</td>
                  <td className="px-6 py-4 text-[#666666]">{reg.jurisdiction}</td>
                  <td className="px-6 py-4">
                    <span className="text-xs bg-[#F5F5F5] px-2 py-1 rounded text-[#666666] border border-[#E5E5E5]">
                      {reg.source}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Regulations;
