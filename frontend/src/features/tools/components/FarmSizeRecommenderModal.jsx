import React, { useState } from 'react';
import { useTools } from '../../../context/ToolsContext';
import { TOOLS_DATA } from '../data/demoToolsData';
import { X, SlidersHorizontal, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';

export const FarmSizeRecommenderModal = () => {
  const { isRecommenderOpen, setIsRecommenderOpen, setSelectedTool, openRentalModal } = useTools();

  const [acreage, setAcreage] = useState('2-5');
  const [task, setTask] = useState('ploughing');
  const [budget, setBudget] = useState('medium');

  if (!isRecommenderOpen) return null;

  // Filter recommendations based on inputs
  const getRecommendations = () => {
    let list = [...TOOLS_DATA];

    if (task === 'ploughing') {
      list = list.filter((t) => t.category === 'tractors' || t.category === 'soil_prep');
    } else if (task === 'harvesting') {
      list = list.filter((t) => t.category === 'harvesting');
    } else if (task === 'sowing') {
      list = list.filter((t) => t.category === 'sowing');
    } else if (task === 'spraying') {
      list = list.filter((t) => t.category === 'protection');
    } else if (task === 'irrigation') {
      list = list.filter((t) => t.category === 'irrigation');
    } else if (task === 'transport') {
      list = list.filter((t) => t.category === 'transport');
    }

    if (acreage === '1-2') {
      list = list.filter((t) => t.rentPriceDay < 1500 || t.buyPrice < 200000);
    } else if (acreage === '25+') {
      list = list.filter((t) => t.specs.hp.includes('55') || t.specs.hp.includes('68') || t.specs.hp.includes('101') || t.buyPrice > 500000);
    }

    return list.slice(0, 3);
  };

  const recommendations = getRecommendations();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-forest-950/85 backdrop-blur-xl"
        onClick={() => setIsRecommenderOpen(false)}
      />

      <div className="relative w-full max-w-2xl p-6 sm:p-8 rounded-3xl bg-forest-950/95 border border-emerald-500/40 shadow-2xl z-10 text-cream-100 animate-in zoom-in-95 max-h-[90vh] overflow-y-auto">
        <button
          onClick={() => setIsRecommenderOpen(false)}
          className="absolute right-5 top-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-stone-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-2 text-xs font-mono uppercase text-emerald-400 mb-1">
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span>Farm Size Machinery Advisor</span>
        </div>
        <h2 className="text-2xl font-black font-display text-white tracking-tight mb-2">
          Find the Right Machine
        </h2>
        <p className="text-xs text-cream-200/70 font-body mb-6">
          Answer 3 quick farm parameters to get tailored machinery and power recommendations.
        </p>

        {/* Step 1: Farm Size */}
        <div className="mb-5">
          <label className="text-xs font-mono font-bold uppercase text-amber-400 block mb-2">
            1. Total Farm Acreage
          </label>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
            {[
              { id: '1-2', label: '1–2 Acres' },
              { id: '2-5', label: '2–5 Acres' },
              { id: '5-10', label: '5–10 Acres' },
              { id: '10-25', label: '10–25 Acres' },
              { id: '25+', label: '25+ Acres' },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setAcreage(item.id)}
                className={`py-2 px-2 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer ${
                  acreage === item.id
                    ? 'bg-emerald-500 text-stone-950 font-bold'
                    : 'bg-forest-900 border border-white/10 text-cream-200/70 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: Primary Agricultural Task */}
        <div className="mb-5">
          <label className="text-xs font-mono font-bold uppercase text-amber-400 block mb-2">
            2. Primary Operational Task
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {[
              { id: 'ploughing', label: '🚜 Ploughing & Tillage' },
              { id: 'sowing', label: '🌱 Precision Sowing' },
              { id: 'harvesting', label: '🌾 Harvesting & Threshing' },
              { id: 'spraying', label: '🧪 Crop Spraying' },
              { id: 'irrigation', label: '💧 Irrigation Pumping' },
              { id: 'transport', label: '🚚 Farm Haulage' },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setTask(item.id)}
                className={`py-2 px-3 rounded-xl text-xs font-body font-semibold transition-all text-left cursor-pointer ${
                  task === item.id
                    ? 'bg-emerald-500 text-stone-950 font-bold'
                    : 'bg-forest-900 border border-white/10 text-cream-200/70 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Recommendations Section */}
        <div className="pt-4 border-t border-white/10">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono text-emerald-400 uppercase font-bold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Recommended Machinery ({recommendations.length} Matches)</span>
            </span>
            <span className="text-[10px] font-mono text-cream-200/50">
              Indicative Suggestions
            </span>
          </div>

          <div className="space-y-3">
            {recommendations.map((tool) => (
              <div
                key={tool.id}
                className="p-3.5 rounded-2xl bg-forest-900/80 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white font-display">{tool.name}</span>
                    <span className="px-2 py-0.2 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono">
                      {tool.specs.hp}
                    </span>
                  </div>
                  <p className="text-xs text-cream-200/60 font-mono mt-0.5">
                    Buy: ₹{tool.buyPrice.toLocaleString()} • Rent: ₹{tool.rentPriceDay}/d • {tool.location}
                  </p>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => {
                      setSelectedTool(tool);
                      setIsRecommenderOpen(false);
                    }}
                    className="py-1.5 px-3 rounded-xl bg-forest-800 hover:bg-forest-700 text-cream-100 text-xs font-mono border border-white/10"
                  >
                    View Specs
                  </button>
                  <button
                    onClick={() => {
                      openRentalModal(tool);
                      setIsRecommenderOpen(false);
                    }}
                    className="py-1.5 px-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-stone-950 text-xs font-bold font-display"
                  >
                    Rent Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
