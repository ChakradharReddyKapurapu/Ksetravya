import React from 'react';
import { useMarket } from '../../../context/MarketContext';
import { TrendingUp, TrendingDown, ArrowUpRight } from 'lucide-react';

export const AllCropPricesStrip = () => {
  const { allCrops, setSelectedCrop, activeMarket, setActiveMarket, allMarkets } = useMarket();

  return (
    <section id="price-strip" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-8">
      <div className="p-5 sm:p-6 rounded-3xl bg-forest-950/90 border border-white/15 backdrop-blur-2xl shadow-2xl">
        {/* Header Strip */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <h3 className="text-sm font-black font-display text-white uppercase tracking-wider">
              ALL CROP PRICES
            </h3>
            <span className="text-[10px] font-mono text-amber-400 font-bold bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-400/20">
              DEMO MARKET DATA
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Market Filter */}
            <select
              value={activeMarket}
              onChange={(e) => setActiveMarket(e.target.value)}
              className="px-3 py-1.5 rounded-full bg-forest-900/80 border border-white/10 text-xs text-cream-100 font-mono focus:outline-none cursor-pointer"
            >
              {allMarkets.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Horizontal Scrollable Price Cards Strip matching reference */}
        <div className="flex items-center gap-3 overflow-x-auto scrollbar-none pb-2 pt-1">
          {allCrops.map((crop) => {
            const isRising = crop.changePercent >= 0;

            return (
              <div
                key={crop.id}
                onClick={() => setSelectedCrop(crop)}
                className="group flex-shrink-0 w-36 sm:w-40 p-3.5 rounded-2xl bg-forest-900/80 hover:bg-forest-900 border border-white/5 hover:border-emerald-400/40 shadow-lg transition-all duration-300 cursor-pointer flex flex-col justify-between hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-2xl group-hover:scale-110 transition-transform">
                      {crop.icon}
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-cream-200/30 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-all" />
                  </div>
                  <h4 className="text-xs font-bold font-display text-white truncate">
                    {crop.name.split(' ')[0]}
                  </h4>
                  <span className="text-[9px] font-mono text-cream-200/50 truncate block">
                    {crop.variety.split('/')[0]}
                  </span>
                </div>

                <div className="mt-3 pt-2 border-t border-white/5">
                  <div className="text-base font-black font-display text-white">
                    ₹{crop.price}
                    <span className="text-[10px] font-mono text-cream-200/60 font-normal">
                      /{crop.unit}
                    </span>
                  </div>
                  <div
                    className={`flex items-center gap-0.5 text-[10px] font-mono font-bold mt-0.5 ${
                      isRising ? 'text-emerald-400' : 'text-rose-400'
                    }`}
                  >
                    {isRising ? (
                      <TrendingUp className="w-3 h-3" />
                    ) : (
                      <TrendingDown className="w-3 h-3" />
                    )}
                    <span>{isRising ? `+${crop.changePercent}%` : `${crop.changePercent}%`}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
