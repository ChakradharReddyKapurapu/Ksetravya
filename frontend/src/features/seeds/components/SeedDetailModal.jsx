import React from 'react';
import { useSeeds } from '../../../context/SeedsContext';
import { useCart } from '../../../context/CartContext';
import { useWorld } from '../../../context/WorldContext';
import {
  X,
  CheckCircle2,
  ShieldCheck,
  ShoppingBag,
  Layers,
  MapPin,
  Calendar,
  Sparkles,
  ArrowRight,
  Info,
} from 'lucide-react';

export const SeedDetailModal = () => {
  const { selectedSeed, setSelectedSeed, toggleComparison, comparisonList } = useSeeds();
  const { addToCart } = useCart();
  const { startTransitionToCropProtection } = useWorld();

  if (!selectedSeed) return null;

  const isComparing = comparisonList.some((s) => s.id === selectedSeed.id);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        onClick={() => setSelectedSeed(null)}
        className="fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity"
      />

      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative w-full max-w-2xl bg-forest-950/95 border border-emerald-400/40 text-cream-100 rounded-3xl shadow-2xl backdrop-blur-2xl p-6 sm:p-8 overflow-hidden">
          {/* Header */}
          <div className="flex items-start justify-between gap-4 pb-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-3xl">
                {selectedSeed.icon}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono border border-emerald-400/30 font-bold uppercase">
                    {selectedSeed.brand}
                  </span>
                  {selectedSeed.isCertified && (
                    <span className="px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300 text-[9px] font-mono border border-teal-400/30 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-teal-400" />
                      Certified Seed
                    </span>
                  )}
                </div>
                <h2 className="text-xl font-bold font-display text-white mt-1">
                  {selectedSeed.variety}
                </h2>
              </div>
            </div>

            <button
              onClick={() => setSelectedSeed(null)}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-cream-200/70 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="py-5 space-y-5">
            {/* Price & Pack Banner */}
            <div className="p-4 rounded-2xl bg-forest-900/80 border border-white/10 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-cream-200/60 uppercase block">Pack Size</span>
                <span className="text-base font-bold font-display text-white">{selectedSeed.packSize}</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-mono text-emerald-400 uppercase block">Seed Price</span>
                <span className="text-2xl font-black font-display text-amber-400">
                  ₹{selectedSeed.price.toLocaleString()}
                </span>
                <span className="text-[10px] font-mono text-cream-200/50 block">
                  (₹{selectedSeed.pricePerKg}/KG)
                </span>
              </div>
            </div>

            {/* Agronomic Technical Specifications Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                <span className="text-[10px] font-mono text-cream-200/50 block">Germination Rate</span>
                <span className="text-sm font-bold font-mono text-emerald-300">{selectedSeed.germinationRate}</span>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                <span className="text-[10px] font-mono text-cream-200/50 block">Yield Potential</span>
                <span className="text-sm font-bold font-mono text-white">{selectedSeed.yieldPotential}</span>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                <span className="text-[10px] font-mono text-cream-200/50 block">Crop Duration</span>
                <span className="text-sm font-bold font-mono text-white">{selectedSeed.duration}</span>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                <span className="text-[10px] font-mono text-cream-200/50 block">Sowing Season</span>
                <span className="text-sm font-bold font-mono text-white">{selectedSeed.season}</span>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/5 sm:col-span-2">
                <span className="text-[10px] font-mono text-cream-200/50 block">Suitable Soil Type</span>
                <span className="text-xs font-semibold text-white">{selectedSeed.suitableSoil}</span>
              </div>
            </div>

            {/* Resistance & Agronomic Profile */}
            <div className="p-4 rounded-2xl bg-forest-900/60 border border-white/5 space-y-1">
              <span className="text-[10px] font-mono text-amber-400 font-bold uppercase block">
                Traits & Pest/Disease Tolerance
              </span>
              <p className="text-xs text-cream-200/90 font-body leading-relaxed">
                {selectedSeed.resistance}
              </p>
            </div>

            {/* Seller & Dispatch */}
            <div className="flex items-center justify-between text-xs font-mono text-cream-200/70 pt-2">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                {selectedSeed.location} • {selectedSeed.seller}
              </span>
              <span className="text-emerald-400 font-bold">In Stock for Delivery</span>
            </div>

            {/* Disclaimer */}
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-400/20 text-[10px] font-mono text-amber-300 flex items-start gap-2">
              <Info className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
              <span>
                Informational agricultural data — verify local soil and rainfall suitability before sowing (Demo Data).
              </span>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              onClick={() => {
                startTransitionToCropProtection(selectedSeed.crop);
                setSelectedSeed(null);
              }}
              className="w-full sm:w-auto py-2.5 px-4 rounded-xl bg-teal-500/20 hover:bg-teal-500/30 border border-teal-400/40 text-teal-300 text-xs font-display font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Continue Crop Journey to Protection →</span>
            </button>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <button
                onClick={() => toggleComparison(selectedSeed)}
                className={`py-2.5 px-3 rounded-xl border text-xs font-mono transition-colors cursor-pointer ${
                  isComparing
                    ? 'bg-amber-500 text-stone-950 font-bold border-amber-400'
                    : 'bg-forest-900 border-white/10 text-cream-200/70 hover:text-white'
                }`}
              >
                <Layers className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  addToCart(selectedSeed, 1, 'seed');
                  setSelectedSeed(null);
                }}
                className="flex-1 sm:flex-initial py-2.5 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold font-display text-xs flex items-center justify-center gap-2 shadow-lg cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Cart</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
