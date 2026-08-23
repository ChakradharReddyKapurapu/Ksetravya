import React from 'react';
import { useTools } from '../../../context/ToolsContext';
import {
  X,
  Star,
  MapPin,
  ShieldCheck,
  Zap,
  Phone,
  Calendar,
  CheckCircle2,
  Tractor,
  Layers,
  Heart,
} from 'lucide-react';

export const ProductDetailModal = () => {
  const {
    selectedTool,
    setSelectedTool,
    openRentalModal,
    openBuyModal,
    toggleFavorite,
    favorites,
    toggleComparison,
    comparisonList,
  } = useTools();

  if (!selectedTool) return null;

  const isFav = favorites.includes(selectedTool.id);
  const isComp = comparisonList.some((item) => item.id === selectedTool.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-forest-950/85 backdrop-blur-xl transition-opacity animate-in fade-in"
        onClick={() => setSelectedTool(null)}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-3xl p-6 sm:p-8 rounded-3xl bg-forest-950/95 border border-amber-400/50 shadow-2xl z-10 text-cream-100 animate-in zoom-in-95 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={() => setSelectedTool(null)}
          className="absolute right-5 top-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-stone-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Badges */}
        <div className="flex items-center gap-2 text-xs font-mono uppercase text-amber-400 mb-1">
          <span>{selectedTool.category}</span>
          <span>•</span>
          <span>{selectedTool.brand}</span>
          <span>•</span>
          <span className="text-emerald-400">{selectedTool.specs.year} Model</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-black font-display text-white tracking-tight mb-2">
          {selectedTool.name}
        </h2>

        {/* Rating & Location Strip */}
        <div className="flex items-center gap-4 text-xs font-mono text-cream-200/70 mb-6">
          <span className="flex items-center gap-1 text-amber-400">
            <Star className="w-4 h-4 fill-current" /> {selectedTool.rating} ({selectedTool.reviewCount} Reviews)
          </span>
          <span className="flex items-center gap-1 text-emerald-400">
            <MapPin className="w-4 h-4" /> {selectedTool.location}
          </span>
          <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px]">
            {selectedTool.availability} Availability
          </span>
        </div>

        {/* Dual Pricing Box */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 rounded-2xl bg-forest-900/80 border border-white/10 mb-6">
          <div>
            <span className="text-xs text-cream-200/60 font-mono block uppercase">Buy Outright Price</span>
            <div className="text-2xl sm:text-3xl font-black font-display text-white mt-1">
              ₹{selectedTool.buyPrice.toLocaleString()}
            </div>
            <span className="text-[10px] text-cream-200/50 font-mono">Includes standard tax & delivery invoice</span>
          </div>

          <div className="border-t sm:border-t-0 sm:border-l border-white/10 sm:pl-4 pt-3 sm:pt-0">
            <span className="text-xs text-amber-300/80 font-mono block uppercase">Daily Rental Rate</span>
            <div className="text-2xl sm:text-3xl font-black font-display text-amber-300 mt-1">
              ₹{selectedTool.rentPriceDay.toLocaleString()}{' '}
              <span className="text-sm font-mono text-cream-200/60">/ day</span>
            </div>
            <span className="text-[10px] text-amber-200/60 font-mono">
              ₹{selectedTool.rentPriceHour}/hr • Security Deposit: ₹{selectedTool.deposit.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Specifications Grid */}
        <div className="mb-6">
          <h4 className="text-xs font-mono font-bold uppercase text-amber-400 tracking-wider mb-3">
            Technical Specifications
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs font-mono">
            <div className="p-3 rounded-xl bg-forest-900/50 border border-white/5">
              <span className="text-[10px] text-cream-200/50 block">HORSEPOWER</span>
              <span className="text-white font-bold mt-0.5 block">{selectedTool.specs.hp}</span>
            </div>
            <div className="p-3 rounded-xl bg-forest-900/50 border border-white/5">
              <span className="text-[10px] text-cream-200/50 block">ENGINE TYPE</span>
              <span className="text-white font-bold mt-0.5 block">{selectedTool.specs.engine}</span>
            </div>
            <div className="p-3 rounded-xl bg-forest-900/50 border border-white/5">
              <span className="text-[10px] text-cream-200/50 block">LIFT / CAPACITY</span>
              <span className="text-white font-bold mt-0.5 block">{selectedTool.specs.capacity}</span>
            </div>
            <div className="p-3 rounded-xl bg-forest-900/50 border border-white/5">
              <span className="text-[10px] text-cream-200/50 block">WEIGHT</span>
              <span className="text-white font-bold mt-0.5 block">{selectedTool.specs.weight}</span>
            </div>
            <div className="p-3 rounded-xl bg-forest-900/50 border border-white/5">
              <span className="text-[10px] text-cream-200/50 block">FUEL TYPE</span>
              <span className="text-white font-bold mt-0.5 block">{selectedTool.specs.fuel}</span>
            </div>
            <div className="p-3 rounded-xl bg-forest-900/50 border border-white/5">
              <span className="text-[10px] text-cream-200/50 block">WARRANTY</span>
              <span className="text-emerald-300 font-bold mt-0.5 block">{selectedTool.specs.warranty}</span>
            </div>
          </div>
        </div>

        {/* Description & Features */}
        <div className="p-4 rounded-2xl bg-white/5 border border-white/5 mb-6 text-xs text-cream-200/80 leading-relaxed font-body">
          <p className="mb-3">{selectedTool.description}</p>
          <div className="grid grid-cols-2 gap-2 font-mono text-[11px] text-emerald-300">
            {selectedTool.features?.map((feat, fi) => (
              <div key={fi} className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Verified Dealer Info */}
        <div className="flex items-center justify-between p-3.5 rounded-2xl bg-forest-900/60 border border-white/5 mb-6 text-xs font-mono">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-white block">{selectedTool.seller.name}</span>
              <span className="text-[10px] text-emerald-400">Verified Equipment Dealer</span>
            </div>
          </div>
          <span className="text-cream-200/60">{selectedTool.seller.phone}</span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => {
              openBuyModal(selectedTool);
              setSelectedTool(null);
            }}
            className="flex-1 py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold font-display text-xs transition-all shadow-lg cursor-pointer text-center"
          >
            Buy Outright (₹{selectedTool.buyPrice.toLocaleString()})
          </button>
          <button
            onClick={() => {
              openRentalModal(selectedTool);
              setSelectedTool(null);
            }}
            className="flex-1 py-3 px-4 rounded-xl bg-sky-500 hover:bg-sky-400 text-stone-950 font-bold font-display text-xs transition-all shadow-lg cursor-pointer text-center"
          >
            Rent Machine (₹{selectedTool.rentPriceDay}/d)
          </button>
          <button
            onClick={() => toggleComparison(selectedTool)}
            className={`p-3 rounded-xl border transition-colors cursor-pointer ${
              isComp
                ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300'
                : 'bg-forest-900 hover:bg-forest-800 border-white/10 text-white'
            }`}
            title="Compare"
          >
            <Layers className="w-4 h-4" />
          </button>
          <button
            onClick={() => toggleFavorite(selectedTool.id)}
            className={`p-3 rounded-xl border transition-colors cursor-pointer ${
              isFav
                ? 'bg-rose-500/20 border-rose-400 text-rose-400'
                : 'bg-forest-900 hover:bg-forest-800 border-white/10 text-white'
            }`}
            title="Save Tool"
          >
            <Heart className="w-4 h-4 fill-current" />
          </button>
        </div>
      </div>
    </div>
  );
};
