import React from 'react';
import { useCropProtection } from '../../../context/CropProtectionContext';
import { useCart } from '../../../context/CartContext';
import {
  X,
  CheckCircle2,
  ShieldCheck,
  ShoppingBag,
  MapPin,
  AlertTriangle,
  Info,
  ShieldAlert,
} from 'lucide-react';

export const CropProtectionDetailModal = () => {
  const { selectedProduct, setSelectedProduct } = useCropProtection();
  const { addToCart } = useCart();

  if (!selectedProduct) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        onClick={() => setSelectedProduct(null)}
        className="fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity"
      />

      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative w-full max-w-2xl bg-forest-950/95 border border-teal-400/40 text-cream-100 rounded-3xl shadow-2xl backdrop-blur-2xl p-6 sm:p-8 overflow-hidden">
          {/* Header */}
          <div className="flex items-start justify-between gap-4 pb-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-teal-500/20 border border-teal-400/30 flex items-center justify-center text-3xl">
                {selectedProduct.icon}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-300 text-[10px] font-mono border border-teal-400/30 font-bold uppercase">
                    {selectedProduct.categoryName}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[9px] font-mono border border-emerald-400/30">
                    {selectedProduct.brand}
                  </span>
                </div>
                <h2 className="text-xl font-bold font-display text-white mt-1">
                  {selectedProduct.name}
                </h2>
              </div>
            </div>

            <button
              onClick={() => setSelectedProduct(null)}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-cream-200/70 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="py-5 space-y-4">
            {/* Price Banner */}
            <div className="p-4 rounded-2xl bg-forest-900/80 border border-white/10 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-cream-200/60 uppercase block">Pack Specification</span>
                <span className="text-base font-bold font-display text-white">{selectedProduct.packSize}</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-mono text-teal-400 uppercase block">Price</span>
                <span className="text-2xl font-black font-display text-amber-400">
                  ₹{selectedProduct.price.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Technical Agronomic Specifications */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                <span className="text-[10px] font-mono text-cream-200/50 block">Active Ingredient</span>
                <span className="text-xs font-bold text-teal-300">{selectedProduct.activeIngredient}</span>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                <span className="text-[10px] font-mono text-cream-200/50 block">Formulation Type</span>
                <span className="text-xs font-semibold text-white">{selectedProduct.formulation}</span>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/5 sm:col-span-2">
                <span className="text-[10px] font-mono text-cream-200/50 block">Target Pests & Diseases</span>
                <span className="text-xs font-semibold text-white">{selectedProduct.targetPest}</span>
              </div>
            </div>

            {/* Safety & Pre-Harvest Precautions */}
            <div className="p-4 rounded-2xl bg-teal-950/40 border border-teal-500/30 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold font-display text-teal-300">
                <ShieldCheck className="w-4 h-4 text-teal-400" />
                <span>Safety Guidelines & PPE Requirements</span>
              </div>
              <p className="text-xs text-cream-200/90 font-body leading-relaxed">
                {selectedProduct.safetyPrecautions}
              </p>
              <span className="text-[10px] font-mono text-amber-300 block pt-1 border-t border-white/10">
                Pre-Harvest Interval (PHI): {selectedProduct.preHarvestInterval}
              </span>
            </div>

            {/* MANDATORY PROMINENT DISCLAIMER */}
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-400/30 text-amber-300 text-xs flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <span className="font-bold font-display uppercase tracking-wider block">
                  READ PRODUCT LABEL BEFORE USE
                </span>
                <p className="text-[11px] font-body text-cream-200/80 leading-snug">
                  Always follow the product label and local agricultural guidance. Dosage and application timing must be verified according to regional state agro-climatic conditions (Demo Data).
                </p>
              </div>
            </div>

            {/* Seller Info */}
            <div className="flex items-center justify-between text-xs font-mono text-cream-200/70 pt-2">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-teal-400" />
                {selectedProduct.location} • {selectedProduct.seller}
              </span>
              <span className="text-teal-400 font-bold">Authorized Stockist</span>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
            <button
              onClick={() => setSelectedProduct(null)}
              className="py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-cream-200/80 text-xs font-display font-semibold cursor-pointer"
            >
              Close
            </button>

            <button
              onClick={() => {
                addToCart(selectedProduct, 1, 'crop_protection');
                setSelectedProduct(null);
              }}
              className="py-2.5 px-6 rounded-xl bg-teal-500 hover:bg-teal-400 text-stone-950 font-bold font-display text-xs flex items-center justify-center gap-2 shadow-lg cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
