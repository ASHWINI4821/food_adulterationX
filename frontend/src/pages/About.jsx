import React from 'react';
import { ArrowDown, Database, Cpu, Search, FileCheck, TestTube, AlertTriangle } from 'lucide-react';

const About = () => {
  const workflowSteps = [
    {
      title: "Food Sample",
      description: "A physical food sample is collected for screening.",
      icon: <TestTube size={24} className="text-black" />
    },
    {
      title: "Test Data / Report",
      description: "The sample undergoes initial qualitative or quantitative laboratory testing. The resulting data is uploaded.",
      icon: <FileCheck size={24} className="text-black" />
    },
    {
      title: "AI Screening",
      description: "The screening engine processes the test data against known adulteration patterns.",
      icon: <Cpu size={24} className="text-black" />
    },
    {
      title: "Adulterant Identification",
      description: "A suspected adulterant is identified with a confidence score based on the evidence provided.",
      icon: <Search size={24} className="text-black" />
    },
    {
      title: "Risk Assessment",
      description: "The severity of the potential adulteration is evaluated and assigned a risk level (HIGH, MODERATE, LOW).",
      icon: <AlertTriangle size={24} className="text-black" />
    },
    {
      title: "Regulatory Comparison",
      description: "Measured concentrations are compared against available safety standards.",
      icon: <Database size={24} className="text-black" />
    },
    {
      title: "Food Safety Report",
      description: "A comprehensive PDF report is generated detailing the screening results and recommendations.",
      icon: <FileCheck size={24} className="text-black" />
    }
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tight mb-3">How FoodGuard AI Works</h1>
        <p className="text-[#666666] max-w-xl mx-auto">
          FoodGuard AI is a demonstration platform that simulates how artificial intelligence can assist in screening food samples for potential adulteration based on structured laboratory test data.
        </p>
      </div>

      <div className="bg-white rounded-xl border border-[#E5E5E5] shadow-[0_1px_3px_0_rgba(0,0,0,0.1)] p-8 md:p-12">
        <h2 className="text-lg font-bold mb-8 text-center uppercase tracking-wider">Screening Workflow</h2>
        
        <div className="relative">
          {/* Connecting Line */}
          <div className="absolute left-8 top-8 bottom-8 w-0.5 bg-[#E5E5E5] md:left-1/2 md:-ml-[1px]"></div>

          <div className="space-y-12">
            {workflowSteps.map((step, index) => (
              <div key={index} className={`relative flex items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                
                {/* Center Icon */}
                <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-white border-2 border-black flex items-center justify-center z-10 shadow-[0_0_0_4px_white]">
                  {step.icon}
                </div>

                {/* Content */}
                <div className={`ml-20 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pl-16' : 'md:pr-16 text-left md:text-right'}`}>
                  <div className="bg-[#F5F5F5] p-5 rounded-xl border border-[#E5E5E5]">
                    <h3 className="font-bold text-black mb-2">{step.title}</h3>
                    <p className="text-sm text-[#666666] leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-black text-white rounded-xl p-8 text-center">
        <h2 className="text-xl font-bold mb-4 uppercase tracking-widest">Important Disclaimer</h2>
        <p className="text-sm text-gray-300 leading-relaxed max-w-2xl mx-auto">
          FoodGuard AI is a screening and decision-support system designed for demonstration purposes. It relies strictly on structured laboratory inputs and predefined rules. It does not replace certified laboratory testing, professional toxicological assessment, or regulatory authorities. Never use this system for real-world food safety compliance.
        </p>
      </div>
    </div>
  );
};

export default About;
