import React from 'react';
import { useAnalytics } from '../../../context/AnalyticsContext';
import { Calculator, DollarSign, Layers, Sparkles, Sprout, RotateCcw } from 'lucide-react';

export const InvestmentCalculatorSection = () => {
  const {
    allCrops,
    selectedCropId,
    selectCrop,
    acreage,
    updateAcreage,
    costs,
    updateCostItem,
    totalCost,
    costPerAcre,
    resetToBenchmarks,
    selectedCropMeta,
  } = useAnalytics();

  const costFields = [
    { key: 'seed', label: 'Certified Seeds', icon: '🌱', desc: 'Hybrid seed lots & seed treatment' },
    { key: 'fertilizer', label: 'Fertilizers & Nutrients', icon: '🧪', desc: 'DAP, Urea, Potash & Micronutrients' },
    { key: 'pesticide', label: 'Pesticides & Bio-Care', icon: '🛡️', desc: 'Herbicides, Insecticides & Fungicides' },
    { key: 'labor', label: 'Field Labor Workforce', icon: '👷', desc: 'Transplanting, weeding, and picking crew' },
    { key: 'machinery', label: 'Machinery & Fuel', icon: '🚜', desc: 'Ploughing, rotavators, diesel, threshing' },
    { key: 'irrigation', label: 'Irrigation & Electricity', icon: '💧', desc: 'Borewell pump run hours & drip maintenance' },
    { key: 'transport', label: 'Mandi Transport', icon: '🚚', desc: 'Farmgate to APMC yard haulage' },
    { key: 'other', label: 'Packaging & Misc', icon: '📦', desc: 'Jute gunny bags, crates, weighing charges' },
  ];

  return (
    <section id="investment-calculator" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-10">
      <div className="p-6 sm:p-8 rounded-3xl bg-forest-950/90 border border-white/10 backdrop-blur-2xl shadow-2xl space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-[10px] font-mono uppercase font-bold mb-1">
              <Calculator className="w-3 h-3" />
              <span>Cost Engineering Engine</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-display text-white">
              Farm Investment & Production Cost Calculator
            </h2>
          </div>

          <button
            onClick={resetToBenchmarks}
            className="px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-cream-200/80 hover:text-white flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Agronomy Defaults</span>
          </button>
        </div>

        {/* Step 1: Select Your Crop */}
        <div>
          <label className="text-xs font-mono text-purple-300 font-bold uppercase block mb-2">
            1. Select Your Cultivation Crop:
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
            {allCrops.map((crop) => {
              const isSelected = selectedCropId === crop.id;

              return (
                <button
                  key={crop.id}
                  onClick={() => selectCrop(crop.id)}
                  className={`p-3 rounded-2xl border text-left flex items-center gap-2.5 transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-purple-600/30 border-purple-400 text-white shadow-lg ring-1 ring-purple-400 scale-[1.02]'
                      : 'bg-white/5 hover:bg-white/10 border-white/5 text-cream-200/80 hover:text-white'
                  }`}
                >
                  <span className="text-2xl">{crop.icon}</span>
                  <div className="truncate">
                    <span className="text-xs font-bold font-display block truncate">{crop.shortName}</span>
                    <span className="text-[10px] font-mono text-cream-200/50 block">₹{crop.defaultSellingPrice}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2: Land Area Slider */}
        <div className="p-4 rounded-2xl bg-forest-900/80 border border-white/5 space-y-2">
          <div className="flex justify-between text-xs font-mono text-cream-200/90">
            <span>2. Farm Land Area:</span>
            <span className="text-white font-bold text-sm">{acreage} Acres</span>
          </div>
          <input
            type="range"
            min="1"
            max="50"
            step="1"
            value={acreage}
            onChange={(e) => updateAcreage(e.target.value)}
            className="w-full accent-purple-400 cursor-pointer"
          />
          <div className="flex justify-between text-[9px] font-mono text-cream-200/40">
            <span>1 Acre</span>
            <span>25 Acres</span>
            <span>50 Acres</span>
          </div>
        </div>

        {/* Step 3: Itemized 8-Point Production Cost Breakdown */}
        <div>
          <label className="text-xs font-mono text-purple-300 font-bold uppercase block mb-2">
            3. Production Cost Breakdown ({selectedCropMeta.shortName} • {acreage} Acres):
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 font-mono text-xs">
            {costFields.map((field) => (
              <div
                key={field.key}
                className="p-3.5 rounded-2xl bg-white/5 border border-white/5 space-y-1.5 focus-within:border-purple-400/60 transition-colors"
              >
                <div className="flex items-center justify-between text-cream-200/80">
                  <span className="flex items-center gap-1.5 text-[11px] font-bold text-white">
                    <span>{field.icon}</span>
                    <span>{field.label}</span>
                  </span>
                </div>
                <div className="relative">
                  <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-cream-200/40 text-xs">₹</span>
                  <input
                    type="number"
                    min="0"
                    value={costs[field.key]}
                    onChange={(e) => updateCostItem(field.key, e.target.value)}
                    className="w-full pl-6 pr-3 py-1.5 rounded-xl bg-forest-900 border border-white/10 text-white font-bold focus:outline-none focus:border-purple-400 text-xs"
                  />
                </div>
                <span className="text-[9px] text-cream-200/40 block truncate">{field.desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Total Cost Summary Strip */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-purple-950/80 via-purple-900/50 to-forest-900 border border-purple-400/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono">
          <div>
            <span className="text-[10px] text-purple-300 uppercase tracking-wider font-bold block">
              TOTAL ESTIMATED FARM INVESTMENT
            </span>
            <div className="text-2xl sm:text-3xl font-black font-display text-white mt-0.5">
              ₹{totalCost.toLocaleString()}
            </div>
          </div>

          <div className="text-left sm:text-right">
            <span className="text-[10px] text-cream-200/60 block">Production Cost per Acre</span>
            <span className="text-base font-bold text-amber-300">
              ₹{costPerAcre.toLocaleString()} <span className="text-xs font-normal text-cream-200/50">/ Acre</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
