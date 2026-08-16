import React, { useState } from 'react';
import { Search, Database, Info } from 'lucide-react';

const Foods = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const foodDatabase = [
    { name: 'Milk', category: 'Dairy', adulterants: ['Starch', 'Water', 'Urea', 'Detergent', 'Synthetic Milk'], tests: ['Starch Detection', 'Lactometer Test'], description: 'Commonly adulterated with water to increase volume, and starch or urea to maintain thickness/density.' },
    { name: 'Sugar', category: 'Sweetener', adulterants: ['Chalk Powder', 'Washing Soda', 'Plastic Crystals'], tests: ['Water Solubility', 'Acid Test'], description: 'Often mixed with insoluble materials like chalk to increase weight.' },
    { name: 'Turmeric', category: 'Spices', adulterants: ['Metanil Yellow', 'Lead Chromate', 'Chalk Powder'], tests: ['Acid Test', 'Water Solubility'], description: 'Adulterated with cheap yellow chemical dyes which pose severe health risks.' },
    { name: 'Chilli Powder', category: 'Spices', adulterants: ['Sudan Red', 'Brick Powder', 'Sawdust'], tests: ['Water Settling', 'Solvent Extraction'], description: 'Brick powder is used for bulk, while Sudan Red dye is used to enhance the red color.' },
    { name: 'Honey', category: 'Sweetener', adulterants: ['C4 Sugars (Corn/Cane Syrup)', 'Invert Sugar'], tests: ['NMR Spectroscopy', 'Water Dissolution'], description: 'High-value product often diluted with cheaper sugar syrups.' },
    { name: 'Edible Oil', category: 'Oils & Fats', adulterants: ['Argemone Oil', 'Mineral Oil', 'Castor Oil'], tests: ['Nitric Acid Test', 'Holphen Test'], description: 'Cheap toxic oils like Argemone are mixed with mustard or other cooking oils.' },
    { name: 'Tea', category: 'Beverage', adulterants: ['Used Tea Leaves', 'Bismark Brown (Colour)', 'Iron Filings'], tests: ['Magnet Test', 'Filter Paper Test'], description: 'Exhausted tea leaves are re-colored and mixed with fresh tea.' },
    { name: 'Coffee', category: 'Beverage', adulterants: ['Chicory', 'Tamarind Seeds', 'Roasted Date Seeds'], tests: ['Water Floatation'], description: 'Chicory root is commonly used to bulk up coffee powder.' },
    { name: 'Flour', category: 'Grains', adulterants: ['Chalk Powder', 'Boric Acid', 'Cassava Flour'], tests: ['Acid Test', 'Iodine Test'], description: 'White powders are added to increase weight and improve perceived whiteness.' },
    { name: 'Spices', category: 'Spices', adulterants: ['Artificial Colours', 'Sawdust', 'Sand'], tests: ['Visual Inspection', 'Solubility'], description: 'Whole and ground spices are bulked with agricultural waste.' },
  ];

  const filteredFoods = foodDatabase.filter(food => 
    food.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    food.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Food Database</h1>
          <p className="text-[#666666] text-sm mt-1">Explore common food items, their known adulterants, and detection methods.</p>
        </div>
      </div>

      <div className="bg-[#F5F5F5] border border-[#E5E5E5] p-4 rounded-lg flex items-start gap-3">
        <Info size={20} className="text-black shrink-0 mt-0.5" />
        <p className="text-sm text-[#666666] leading-relaxed">
          <span className="font-bold text-black uppercase tracking-wider mr-2">Demo Data</span>
          The information presented here is for demonstration purposes only. It represents a synthetic knowledge base for the AI screening engine.
        </p>
      </div>

      <div className="relative max-w-md">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#999999]" />
        <input 
          type="text" 
          placeholder="Search foods..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-[#E5E5E5] rounded-lg text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black shadow-[0_1px_3px_0_rgba(0,0,0,0.05)]"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFoods.map((food, idx) => (
          <div key={idx} className="bg-white rounded-xl border border-[#E5E5E5] shadow-[0_1px_3px_0_rgba(0,0,0,0.1)] overflow-hidden flex flex-col hover:border-black transition-colors">
            <div className="p-5 border-b border-[#E5E5E5] flex justify-between items-start">
              <div>
                <h2 className="text-lg font-bold text-black">{food.name}</h2>
                <span className="inline-block mt-1 px-2 py-0.5 bg-[#F5F5F5] text-[#666666] text-[10px] font-bold uppercase tracking-wider rounded">
                  {food.category}
                </span>
              </div>
              <Database size={20} className="text-[#CCCCCC]" />
            </div>
            <div className="p-5 flex-1 flex flex-col space-y-4">
              <p className="text-sm text-[#666666] leading-relaxed flex-1">
                {food.description}
              </p>
              
              <div>
                <h3 className="text-xs font-bold text-black uppercase tracking-wider mb-2">Common Adulterants</h3>
                <div className="flex flex-wrap gap-1.5">
                  {food.adulterants.map(a => (
                    <span key={a} className="px-2 py-1 bg-black text-white text-[10px] font-medium rounded">
                      {a}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xs font-bold text-black uppercase tracking-wider mb-2">Detection Methods</h3>
                <div className="flex flex-wrap gap-1.5">
                  {food.tests.map(t => (
                    <span key={t} className="px-2 py-1 border border-[#E5E5E5] text-[#666666] text-[10px] font-medium rounded">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}

        {filteredFoods.length === 0 && (
          <div className="col-span-full py-12 text-center border-2 border-dashed border-[#E5E5E5] rounded-xl">
            <p className="text-[#666666]">No foods found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Foods;
