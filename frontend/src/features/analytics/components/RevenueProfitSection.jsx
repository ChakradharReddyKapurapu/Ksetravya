import React from 'react';
import { useAnalytics } from '../../../context/AnalyticsContext';
import { TrendingUp, TrendingDown, DollarSign, Store, Sparkles, Scale } from 'lucide-react';

export const RevenueProfitSection = () => {
  const {
    selectedCropMeta,
    liveMandiData,
    acreage,
    expectedYield,
    setExpectedYield,
    sellingPrice,
    setSellingPrice,
    totalCost,
    expectedRevenue,
    revenuePerAcre,
    netProfit,
    profitPerAcre,
    roiPercentage,
  } = useAnalytics();

  const isProfit = netProfit > 0;
  const isBreakEven = Math.abs(netProfit) < 5000;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-10">
      <div className="p-6 sm:p-8 rounded-3xl bg-forest-950/90 border border-white/10 backdrop-blur-2xl shadow-2xl space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono uppercase font-bold mb-1">
              <Store className="w-3 h-3" />
              <span>Live Market Realization</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-display text-white">
              Revenue & Net Profitability Forecaster
            </h2>
          </div>
          <span className="text-xs font-mono text-cream-200/50">
            Connected to {liveMandiData.mandi}
          </span>
        </div>

        {/* Inputs Grid: Expected Yield & Selling Price */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
          {/* Expected Yield */}
          <div className="p-4 rounded-2xl bg-forest-900/80 border border-white/5 space-y-2">
            <div className="flex items-center justify-between text-cream-200/90">
              <span className="font-bold text-white">4. Total Expected Harvest Yield:</span>
              <span className="text-purple-300 font-bold">{expectedYield} {selectedCropMeta.mandiUnit}s</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="1"
                value={expectedYield}
                onChange={(e) => setExpectedYield(Math.max(1, Number(e.target.value) || 1))}
                className="w-full px-3 py-2 rounded-xl bg-forest-950 border border-white/10 text-white font-bold focus:outline-none focus:border-emerald-400"
              />
              <span className="text-cream-200/60 whitespace-nowrap">
                ({(expectedYield / (acreage || 1)).toFixed(1)} {selectedCropMeta.yieldUnit})
              </span>
            </div>
          </div>

          {/* Selling Price / Mandi Sync */}
          <div className="p-4 rounded-2xl bg-forest-900/80 border border-white/5 space-y-2">
            <div className="flex items-center justify-between text-cream-200/90">
              <span className="font-bold text-white">5. Expected Selling Price (₹ / {selectedCropMeta.mandiUnit}):</span>
              <span className="text-sky-300 font-bold">Mandi Avg: ₹{liveMandiData.avgPrice}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative w-full">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-cream-200/40">₹</span>
                <input
                  type="number"
                  min="1"
                  value={sellingPrice}
                  onChange={(e) => setSellingPrice(Math.max(1, Number(e.target.value) || 1))}
                  className="w-full pl-7 pr-3 py-2 rounded-xl bg-forest-950 border border-white/10 text-white font-bold focus:outline-none focus:border-emerald-400"
                />
              </div>
              <button
                onClick={() => setSellingPrice(liveMandiData.avgPrice)}
                className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-sky-300 whitespace-nowrap text-[11px] cursor-pointer"
              >
                Sync Mandi
              </button>
            </div>
          </div>
        </div>

        {/* Live Mandi Price Range Strip */}
        <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <span className="text-cream-200/60">
            APMC Yard Range: <strong className="text-white">{liveMandiData.mandi}</strong>
          </span>
          <div className="flex items-center gap-4">
            <span>Min: <strong className="text-cream-100">₹{liveMandiData.minPrice}</strong></span>
            <span>Modal: <strong className="text-sky-300">₹{liveMandiData.avgPrice}</strong></span>
            <span>Max: <strong className="text-emerald-400">₹{liveMandiData.maxPrice}</strong></span>
          </div>
        </div>

        {/* Mathematical Output Matrix */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
          <div className="p-4 rounded-2xl bg-forest-900/90 border border-white/5">
            <span className="text-[10px] text-cream-200/50 block">Total Investment</span>
            <span className="text-amber-300 font-black text-lg block mt-1">
              ₹{totalCost.toLocaleString()}
            </span>
            <span className="text-[9px] text-cream-200/40">Input & Labor</span>
          </div>

          <div className="p-4 rounded-2xl bg-forest-900/90 border border-white/5">
            <span className="text-[10px] text-cream-200/50 block">Expected Revenue</span>
            <span className="text-sky-300 font-black text-lg block mt-1">
              ₹{expectedRevenue.toLocaleString()}
            </span>
            <span className="text-[9px] text-cream-200/40">{expectedYield} × ₹{sellingPrice}</span>
          </div>

          <div className="p-4 rounded-2xl bg-forest-900/90 border border-white/5">
            <span className="text-[10px] text-cream-200/50 block">Revenue per Acre</span>
            <span className="text-white font-bold text-lg block mt-1">
              ₹{revenuePerAcre.toLocaleString()}
            </span>
            <span className="text-[9px] text-cream-200/40">Gross / Acre</span>
          </div>

          <div className="p-4 rounded-2xl bg-forest-900/90 border border-white/5">
            <span className="text-[10px] text-cream-200/50 block">Profit per Acre</span>
            <span className={`text-lg font-black block mt-1 ${isProfit ? 'text-emerald-400' : 'text-rose-400'}`}>
              ₹{profitPerAcre.toLocaleString()}
            </span>
            <span className="text-[9px] text-cream-200/40">Net / Acre</span>
          </div>
        </div>

        {/* Net Expected Profit / Loss Highlight Banner */}
        <div
          className={`p-6 rounded-3xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono shadow-2xl transition-all ${
            isBreakEven
              ? 'bg-amber-950/40 border-amber-400/40'
              : isProfit
              ? 'bg-gradient-to-r from-emerald-950/80 via-emerald-900/60 to-forest-950 border-emerald-400/50 shadow-emerald-950/60'
              : 'bg-gradient-to-r from-rose-950/80 via-rose-900/60 to-forest-950 border-rose-400/50 shadow-rose-950/60'
          }`}
        >
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full animate-ping bg-current text-emerald-400" />
              <span className={`text-xs font-bold uppercase tracking-wider ${isProfit ? 'text-emerald-400' : 'text-rose-400'}`}>
                {isBreakEven ? '🟡 NEAR BREAK-EVEN POSITION' : isProfit ? '🟢 EXPECTED NET PROFIT' : '🔴 EXPECTED NET LOSS'}
              </span>
            </div>
            <div className="text-3xl sm:text-4xl font-black font-display text-white mt-1">
              ₹{Math.abs(netProfit).toLocaleString()}
            </div>
            <span className="text-[10px] text-cream-200/60 block mt-1">
              Transparent Formula: ₹{expectedRevenue.toLocaleString()} (Revenue) - ₹{totalCost.toLocaleString()} (Cost)
            </span>
          </div>

          <div className="text-left sm:text-right">
            <span className="text-[10px] text-cream-200/60 uppercase block">Projected Return on Investment</span>
            <div className={`text-2xl sm:text-3xl font-black flex items-center gap-1.5 justify-start sm:justify-end mt-1 ${
              isProfit ? 'text-emerald-300' : 'text-rose-300'
            }`}>
              {isProfit ? <TrendingUp className="w-6 h-6 text-emerald-400" /> : <TrendingDown className="w-6 h-6 text-rose-400" />}
              <span>{roiPercentage > 0 ? `+${roiPercentage}%` : `${roiPercentage}%`}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
