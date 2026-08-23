import React from 'react';
import { useMarket } from '../../../context/MarketContext';
import { useWorld } from '../../../context/WorldContext';
import {
  X,
  TrendingUp,
  TrendingDown,
  History,
  Layers,
  MapPin,
  Info,
  DollarSign,
} from 'lucide-react';

export const CropDetailModal = () => {
  const marketCtx = useMarket();
  const worldCtx = useWorld();

  const selectedCrop = marketCtx?.selectedCrop || worldCtx?.selectedCrop;
  const setSelectedCrop = marketCtx?.setSelectedCrop || worldCtx?.setSelectedCrop;

  if (!selectedCrop) return null;

  const isUp = (selectedCrop.changePercent || 0) >= 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-forest-950/80 backdrop-blur-xl transition-opacity animate-in fade-in duration-200"
        onClick={() => setSelectedCrop && setSelectedCrop(null)}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-lg p-6 sm:p-8 rounded-3xl bg-forest-950/95 border border-amber-400/40 shadow-2xl z-10 animate-in zoom-in-95 duration-200 text-cream-100">
        {/* Close Button */}
        <button
          onClick={() => setSelectedCrop && setSelectedCrop(null)}
          className="absolute right-5 top-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-stone-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-2 text-xs font-mono uppercase text-amber-400 mb-1">
          <span>{selectedCrop.category || 'Commodity'}</span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <MapPin className="w-3 h-3 text-emerald-400" /> {selectedCrop.marketName || 'Tirupati APMC'}
          </span>
        </div>

        <div className="flex items-center gap-3 mb-1">
          <span className="text-3xl">{selectedCrop.icon || '🌾'}</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-white tracking-tight">
            {selectedCrop.name}
          </h2>
        </div>
        <p className="text-xs text-cream-200/70 font-body mb-5">
          {selectedCrop.variety} • Volume Arrivals: {selectedCrop.volume || '2,400 Quintals'}
        </p>

        {/* Price Box */}
        <div className="p-4 rounded-2xl bg-forest-900/80 border border-white/10 flex items-center justify-between mb-5">
          <div>
            <span className="text-[10px] text-cream-200/60 font-mono block uppercase">Current Mandi Rate</span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-3xl sm:text-4xl font-black font-display text-white">
                ₹{selectedCrop.price}
              </span>
              <span className="text-xs text-cream-200/60 font-mono">/{selectedCrop.unit || 'kg'}</span>
            </div>
          </div>

          <div
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold font-mono ${
              isUp
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                : 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
            }`}
          >
            {isUp ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            <span>
              {isUp ? '+' : ''}
              {selectedCrop.changePercent}%
            </span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3 mb-5 text-center font-mono">
          <div className="p-3 rounded-xl bg-forest-900/50 border border-white/5">
            <span className="text-[10px] text-cream-200/60 block uppercase">Min Rate</span>
            <span className="text-sm font-bold text-white mt-1 block">₹{selectedCrop.minPrice}</span>
          </div>
          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
            <span className="text-[10px] text-amber-300/80 block uppercase">Modal / Avg</span>
            <span className="text-sm font-bold text-amber-300 mt-1 block">₹{selectedCrop.avgPrice}</span>
          </div>
          <div className="p-3 rounded-xl bg-forest-900/50 border border-white/5">
            <span className="text-[10px] text-cream-200/60 block uppercase">Max Rate</span>
            <span className="text-sm font-bold text-white mt-1 block">₹{selectedCrop.maxPrice}</span>
          </div>
        </div>

        {/* Historical Price Records Preview */}
        {selectedCrop.history && (
          <div className="p-3 rounded-2xl bg-forest-900/60 border border-white/5 mb-5 space-y-1.5">
            <span className="text-[10px] font-mono text-amber-400 font-bold uppercase block">
              Historical APMC Trend
            </span>
            <div className="grid grid-cols-5 gap-1 text-center font-mono text-[11px]">
              {selectedCrop.history.map((h) => (
                <div key={h.year} className="p-1.5 rounded-lg bg-white/5">
                  <span className="text-[9px] text-cream-200/50 block">{h.year}</span>
                  <span className="font-bold text-white">₹{h.price}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Description */}
        <p className="text-xs text-cream-200/80 font-body leading-relaxed mb-4 p-3 rounded-xl bg-white/5 border border-white/5">
          {selectedCrop.description}
        </p>

        {/* Disclaimer */}
        <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-400/20 text-[10px] font-mono text-amber-300 flex items-center gap-2 mb-4">
          <Info className="w-3.5 h-3.5 flex-shrink-0" />
          <span>Data status: DEMO MARKET DATA for informational exploration.</span>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3">
          <button
            onClick={() => setSelectedCrop && setSelectedCrop(null)}
            className="py-2.5 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold font-display text-xs transition-all shadow-lg cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
