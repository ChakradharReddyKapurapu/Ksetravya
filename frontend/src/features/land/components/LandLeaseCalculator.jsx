import React, { useState } from 'react';
import { Calculator, DollarSign, TrendingUp, Sparkles, PieChart, ShieldCheck } from 'lucide-react';

export const LandLeaseCalculator = () => {
  const [acreage, setAcreage] = useState(10);
  const [rentPerAcre, setRentPerAcre] = useState(28000);
  const [selectedCropKey, setSelectedCropKey] = useState('cotton');

  const cropEconomics = {
    cotton: {
      name: 'BT Cotton (Kharif)',
      icon: '🌿',
      yieldPerAcre: '34 Quintals',
      grossRevenuePerAcre: 244800, // 34 qtls * 7200
      inputCostPerAcre: 52000,
    },
    rice: {
      name: 'Sona Masoori Paddy',
      icon: '🌾',
      yieldPerAcre: '38 Bags (50kg)',
      grossRevenuePerAcre: 83600, // 38 * 2200
      inputCostPerAcre: 26000,
    },
    chilli: {
      name: 'Teja Red Chilli',
      icon: '🌶️',
      yieldPerAcre: '28 Quintals',
      grossRevenuePerAcre: 546000, // 28 * 19500
      inputCostPerAcre: 95000,
    },
    groundnut: {
      name: 'Kadiri Groundnut Pods',
      icon: '🥜',
      yieldPerAcre: '22 Quintals',
      grossRevenuePerAcre: 171600, // 22 * 7800
      inputCostPerAcre: 34000,
    },
    tomato: {
      name: 'Madanapalle Red Tomato',
      icon: '🍅',
      yieldPerAcre: '450 Crates (25kg)',
      grossRevenuePerAcre: 360000, // 450 * 800
      inputCostPerAcre: 75000,
    },
  };

  const crop = cropEconomics[selectedCropKey];

  // Calculations
  const totalLeaseCost = acreage * rentPerAcre;
  const totalInputCost = acreage * crop.inputCostPerAcre;
  const totalOperatingExpenditure = totalLeaseCost + totalInputCost;
  const totalGrossRevenue = acreage * crop.grossRevenuePerAcre;
  const netEstimatedProfit = totalGrossRevenue - totalOperatingExpenditure;
  const roiPercentage = totalOperatingExpenditure > 0 ? ((netEstimatedProfit / totalOperatingExpenditure) * 100).toFixed(1) : 0;

  return (
    <section id="lease-calculator" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-12">
      <div className="p-6 sm:p-8 rounded-3xl bg-forest-950/90 border border-white/10 backdrop-blur-2xl shadow-2xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-8 pb-4 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono uppercase font-bold mb-1">
              <Calculator className="w-3 h-3" />
              <span>Cultivation Financial Forecaster</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
              Land Lease & Crop ROI Profitability Calculator
            </h3>
          </div>
          <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-400/20">
            FINANCIAL DEMO MODEL
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Inputs (5 Cols) */}
          <div className="lg:col-span-5 space-y-4 text-xs font-mono">
            {/* Input 1: Acreage */}
            <div>
              <div className="flex justify-between text-cream-200/80 mb-1">
                <span>Lease Acreage:</span>
                <span className="text-white font-bold">{acreage} Acres</span>
              </div>
              <input
                type="range"
                min="1"
                max="50"
                step="1"
                value={acreage}
                onChange={(e) => setAcreage(Number(e.target.value))}
                className="w-full accent-amber-400 cursor-pointer"
              />
              <div className="flex justify-between text-[9px] text-cream-200/40">
                <span>1 Acre</span>
                <span>25 Acres</span>
                <span>50 Acres</span>
              </div>
            </div>

            {/* Input 2: Rent Per Acre */}
            <div>
              <div className="flex justify-between text-cream-200/80 mb-1">
                <span>Annual Rent per Acre:</span>
                <span className="text-amber-300 font-bold">₹{rentPerAcre.toLocaleString()} / Acre</span>
              </div>
              <input
                type="range"
                min="10000"
                max="60000"
                step="2000"
                value={rentPerAcre}
                onChange={(e) => setRentPerAcre(Number(e.target.value))}
                className="w-full accent-amber-400 cursor-pointer"
              />
              <div className="flex justify-between text-[9px] text-cream-200/40">
                <span>₹10,000</span>
                <span>₹35,000</span>
                <span>₹60,000</span>
              </div>
            </div>

            {/* Input 3: Target Crop Selector */}
            <div>
              <label className="text-cream-200/70 block mb-1.5">Target Cultivation Crop:</label>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(cropEconomics).map(([key, data]) => {
                  const isSelected = selectedCropKey === key;

                  return (
                    <button
                      key={key}
                      onClick={() => setSelectedCropKey(key)}
                      className={`p-2.5 rounded-xl border text-left flex items-center gap-2 transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-amber-500 text-stone-950 font-bold border-amber-300 shadow-md'
                          : 'bg-white/5 hover:bg-white/10 text-cream-200/80 border-white/5'
                      }`}
                    >
                      <span className="text-lg">{data.icon}</span>
                      <span className="truncate text-xs">{data.name.split(' ')[0]}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Live Results Matrix (7 Cols) */}
          <div className="lg:col-span-7 p-6 rounded-3xl bg-forest-900/90 border border-white/10 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase">
                Forecasted Harvest Economics ({crop.name})
              </span>
              <span className="text-xs font-mono text-cream-200/60">
                Yield Est: <strong className="text-white">{crop.yieldPerAcre}/Ac</strong>
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 font-mono text-xs">
              <div className="p-3 rounded-2xl bg-white/5 border border-white/5">
                <span className="text-[10px] text-cream-200/50 block">Total Lease Cost</span>
                <span className="text-amber-300 font-bold text-sm block mt-0.5">
                  ₹{totalLeaseCost.toLocaleString()}
                </span>
                <span className="text-[9px] text-cream-200/40">{acreage} ac @ ₹{rentPerAcre}/ac</span>
              </div>

              <div className="p-3 rounded-2xl bg-white/5 border border-white/5">
                <span className="text-[10px] text-cream-200/50 block">Inputs & Labor</span>
                <span className="text-rose-300 font-bold text-sm block mt-0.5">
                  ₹{totalInputCost.toLocaleString()}
                </span>
                <span className="text-[9px] text-cream-200/40">Seed, Fert & Harvest</span>
              </div>

              <div className="p-3 rounded-2xl bg-white/5 border border-white/5 col-span-2 sm:col-span-1">
                <span className="text-[10px] text-cream-200/50 block">Gross Mandi Revenue</span>
                <span className="text-white font-black text-sm block mt-0.5">
                  ₹{totalGrossRevenue.toLocaleString()}
                </span>
                <span className="text-[9px] text-cream-200/40">Market Realization</span>
              </div>
            </div>

            {/* Net Estimated Profit Highlight Banner */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/80 via-emerald-900/60 to-forest-950 border border-emerald-400/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider block">
                  ESTIMATED NET CULTIVATOR PROFIT
                </span>
                <div className="text-2xl sm:text-3xl font-black font-display text-white mt-0.5">
                  ₹{netEstimatedProfit.toLocaleString()}
                </div>
              </div>

              <div className="text-right font-mono">
                <span className="text-[10px] text-cream-200/60 block">Projected Crop ROI</span>
                <span className="text-xl font-bold text-emerald-300 flex items-center gap-1 justify-end">
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                  +{roiPercentage}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
