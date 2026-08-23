import React, { useState, useEffect } from 'react';
import { useWorld } from '../../../context/WorldContext';
import { marketService } from '../services/marketService';
import { CROP_CATEGORIES } from '../data/demoMarketData';
import { TrendingUp, TrendingDown, ArrowUpRight, Plus, Check, Info, Sparkles } from 'lucide-react';

export const PriceBoard = () => {
  const {
    categoryFilter,
    setCategoryFilter,
    searchQuery,
    selectedMarket,
    setSelectedCrop,
    toggleComparisonCrop,
    comparisonList,
    setIsComparisonModalOpen,
  } = useWorld();

  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const fetchCrops = () => {
    setLoading(true);
    setHasError(false);

    marketService
      .getCrops({ category: categoryFilter, search: searchQuery, marketId: selectedMarket })
      .then((data) => {
        setCrops(data);
        setLoading(false);
      })
      .catch(() => {
        setHasError(true);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchCrops();
  }, [categoryFilter, searchQuery, selectedMarket]);

  return (
    <section id="price-board" className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Category Filter Pills & Comparison Floating Drawer Trigger */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-2 md:pb-0 scrollbar-none">
          {CROP_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategoryFilter(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold font-display transition-all duration-200 whitespace-nowrap cursor-pointer ${
                categoryFilter === cat.id
                  ? 'bg-amber-500 text-stone-950 shadow-lg shadow-amber-500/20'
                  : 'bg-forest-900/70 hover:bg-forest-800 text-cream-200 border border-white/10 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Comparison Trigger if crops are selected */}
        {comparisonList.length > 0 && (
          <button
            onClick={() => setIsComparisonModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500 hover:bg-emerald-400 text-stone-950 text-xs font-bold font-display shadow-xl animate-pulse cursor-pointer"
          >
            <span>Compare ({comparisonList.length}) Crops</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Notice Banner: DEMO MARKET DATA */}
      <div className="flex items-center justify-between p-3 rounded-2xl bg-amber-950/40 border border-amber-500/30 text-amber-200 text-xs font-mono mb-6">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-amber-400 flex-shrink-0" />
          <span>
            <strong>DEMO MARKET DATA:</strong> Mandi prices shown are realistic simulated commodity rates for prototype verification.
          </span>
        </div>
        <span className="hidden sm:inline text-[10px] text-amber-300/60 uppercase">
          Live Sync Ready
        </span>
      </div>

      {/* Price Cards Grid */}
      {loading ? (
        <div className="py-20 text-center space-y-3">
          <div className="w-8 h-8 rounded-full border-2 border-amber-400 border-t-transparent animate-spin mx-auto" />
          <p className="text-amber-300 font-mono text-sm">Loading live mandi rates...</p>
        </div>
      ) : hasError ? (
        <div className="py-20 text-center max-w-md mx-auto space-y-3 p-6 rounded-3xl bg-forest-950/80 border border-red-500/20">
          <p className="text-base font-bold font-display text-white">We couldn't load this information right now.</p>
          <p className="text-xs text-cream-200/60 font-body">Please check your connection and try again.</p>
          <button
            onClick={fetchCrops}
            className="px-4 py-2 rounded-full bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs font-display inline-flex items-center gap-1.5 cursor-pointer shadow-md transition-all"
          >
            <span>Try Again</span>
          </button>
        </div>
      ) : crops.length === 0 ? (
        <div className="py-20 text-center max-w-md mx-auto space-y-2">
          <p className="text-base font-bold font-display text-white">No market-price data is available for this selection.</p>
          <p className="text-xs text-cream-200/60 font-body">Try selecting another crop category or clearing the search query.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {crops.map((crop) => {
            const isUp = crop.changeDirection === 'up';
            const isCompared = comparisonList.some((c) => c.id === crop.id);

            return (
              <div
                key={crop.id}
                onClick={() => setSelectedCrop(crop)}
                className="group relative p-5 rounded-2xl glass-card-eco border flex flex-col justify-between cursor-pointer transition-all duration-300 hover:border-amber-400/50"
              >
                <div>
                  {/* Card Header: Crop Name, Category Tag & Compare Button */}
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div>
                      <span className="text-[10px] font-mono uppercase text-amber-400/90 tracking-wider block">
                        {crop.category}
                      </span>
                      <h3 className="text-base font-bold font-display text-white group-hover:text-amber-300 transition-colors">
                        {crop.name}
                      </h3>
                      <p className="text-[11px] text-cream-200/60 font-body leading-tight mt-0.5">
                        {crop.variety}
                      </p>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleComparisonCrop(crop);
                      }}
                      className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                        isCompared
                          ? 'bg-emerald-500/30 border-emerald-400 text-emerald-300'
                          : 'bg-white/5 border-white/10 text-cream-200/50 hover:text-white hover:bg-white/15'
                      }`}
                      title={isCompared ? 'Remove from comparison' : 'Add to comparison'}
                    >
                      {isCompared ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  {/* Primary Price & Movement Indicator */}
                  <div className="my-4 flex items-baseline justify-between">
                    <div>
                      <span className="text-2xl sm:text-3xl font-extrabold font-display text-white tracking-tight">
                        ₹{crop.price.toLocaleString()}
                      </span>
                      <span className="text-xs text-cream-200/60 font-mono ml-1">
                        / {crop.unit}
                      </span>
                    </div>

                    <div
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold font-mono ${
                        isUp
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : 'bg-red-500/20 text-red-400 border border-red-500/30'
                      }`}
                    >
                      {isUp ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                      <span>
                        {isUp ? '+' : ''}
                        {crop.changePercent}%
                      </span>
                    </div>
                  </div>

                  {/* Spread Bar: Min vs Avg vs Max */}
                  <div className="p-2.5 rounded-xl bg-forest-950/60 border border-white/5 font-mono text-[11px] space-y-1">
                    <div className="flex items-center justify-between text-cream-200/70">
                      <span>Min: ₹{crop.minPrice}</span>
                      <span className="text-amber-300 font-semibold">Avg: ₹{crop.avgPrice}</span>
                      <span>Max: ₹{crop.maxPrice}</span>
                    </div>
                    {/* Visual Range bar */}
                    <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden relative">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-500 via-amber-400 to-amber-500 rounded-full"
                        style={{
                          width: `${Math.min(
                            100,
                            Math.max(
                              15,
                              ((crop.price - crop.minPrice) / (crop.maxPrice - crop.minPrice || 1)) * 100
                            )
                          )}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Footer: Volume & Click to Inspect */}
                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-cream-200/50">
                  <span>Vol: {crop.volume}</span>
                  <span className="text-amber-400 group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                    Inspect <ArrowUpRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};
