import React, { useState } from 'react';
import { Search, AlertTriangle, ShieldAlert } from 'lucide-react';

const Adulterants = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const adulterantDatabase = [
    { name: 'Artificial Colour (e.g., Metanil Yellow)', foods: ['Turmeric', 'Sweets', 'Spices'], health: 'Carcinogenic, digestive issues, toxicity.', method: 'Acid Test, Spectroscopy', risk: 'HIGH' },
    { name: 'Argemone Oil', foods: ['Mustard Oil', 'Edible Oils'], health: 'Epidemic Dropsy, severe swelling, glaucoma.', method: 'Nitric Acid Test', risk: 'HIGH' },
    { name: 'Starch', foods: ['Milk', 'Butter', 'Khoya'], health: 'Generally safe, but reduces nutritional value.', method: 'Iodine Test', risk: 'LOW' },
    { name: 'Melamine', foods: ['Milk', 'Infant Formula'], health: 'Kidney stones, renal failure.', method: 'HPLC, MS/MS', risk: 'HIGH' },
    { name: 'Excess Water', foods: ['Milk', 'Juices'], health: 'No direct harm, but poses contamination risk if water is impure.', method: 'Lactometer, Specific Gravity', risk: 'LOW' },
    { name: 'Synthetic Sweetener (e.g., Saccharin)', foods: ['Honey', 'Beverages'], health: 'Potential long-term metabolic disruption.', method: 'Chromatography', risk: 'MODERATE' },
    { name: 'Urea', foods: ['Milk'], health: 'Kidney strain, gastrointestinal issues.', method: 'DMAC Test', risk: 'HIGH' },
    { name: 'Detergent', foods: ['Milk (Synthetic)'], health: 'Food poisoning, severe gastrointestinal complications.', method: 'Bromocresol Purple Test', risk: 'HIGH' },
  ];

  const filteredAdulterants = adulterantDatabase.filter(a => 
    a.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Adulterants Database</h1>
          <p className="text-[#666666] text-sm mt-1">Information on common chemical and physical adulterants.</p>
        </div>
      </div>

      <div className="relative max-w-md">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#999999]" />
        <input 
          type="text" 
          placeholder="Search adulterants..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-[#E5E5E5] rounded-lg text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black shadow-[0_1px_3px_0_rgba(0,0,0,0.05)]"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredAdulterants.map((item, idx) => (
          <div key={idx} className="bg-white rounded-xl border border-[#E5E5E5] shadow-[0_1px_3px_0_rgba(0,0,0,0.1)] overflow-hidden hover:border-black transition-colors flex flex-col">
            <div className={`p-5 border-b border-[#E5E5E5] flex justify-between items-start ${item.risk === 'HIGH' ? 'bg-[#FAFAFA]' : ''}`}>
              <div>
                <h2 className="text-lg font-bold text-black flex items-center gap-2">
                  {item.risk === 'HIGH' && <ShieldAlert size={18} className="text-black" />}
                  {item.name}
                </h2>
              </div>
              <span className={`inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded ${
                item.risk === 'HIGH' ? 'bg-black text-white' : 
                item.risk === 'MODERATE' ? 'bg-[#E5E5E5] text-black border border-[#CCCCCC]' : 
                'bg-white text-[#666666] border border-[#E5E5E5]'
              }`}>
                {item.risk} RISK
              </span>
            </div>
            
            <div className="p-5 flex-1 space-y-4">
              <div>
                <h3 className="text-xs font-bold text-[#666666] uppercase tracking-wider mb-1">Commonly Found In</h3>
                <p className="text-sm font-medium text-black">{item.foods.join(', ')}</p>
              </div>
              
              <div>
                <h3 className="text-xs font-bold text-[#666666] uppercase tracking-wider mb-1">Health Impact</h3>
                <p className="text-sm text-[#666666] leading-relaxed">{item.health}</p>
              </div>

              <div>
                <h3 className="text-xs font-bold text-[#666666] uppercase tracking-wider mb-1">Detection Method</h3>
                <p className="text-sm text-black">{item.method}</p>
              </div>
            </div>
          </div>
        ))}

        {filteredAdulterants.length === 0 && (
          <div className="col-span-full py-12 text-center border-2 border-dashed border-[#E5E5E5] rounded-xl">
            <p className="text-[#666666]">No adulterants found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Adulterants;
