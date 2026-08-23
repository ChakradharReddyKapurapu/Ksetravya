import React from 'react';
import { useWorld } from '../../../context/WorldContext';
import { useMarket } from '../../../context/MarketContext';
import { Truck, Tractor, ArrowRight, DollarSign, Wrench, ShieldCheck, Sparkles } from 'lucide-react';

export const EcosystemBridgesSection = () => {
  const { startTransitionToTools, myCrop } = useWorld();
  const { allCrops } = useMarket();

  const currentCrop = allCrops.find((c) => c.id === myCrop?.id) || allCrops[0];

  return (
    <section id="transport-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Panel 1: TRANSPORT YOUR PRODUCE (Matching reference design right card) */}
        <div className="lg:col-span-6 p-6 rounded-3xl bg-forest-950/90 border border-white/10 backdrop-blur-2xl shadow-2xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold font-display uppercase tracking-wider text-white flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-emerald-400" />
                TRANSPORT YOUR PRODUCE
              </span>
              <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                DOORSTEP DISPATCH
              </span>
            </div>

            <p className="text-xs text-cream-200/70 font-body mb-5">
              Reliable farm-to-mandi freight transit across Andhra Pradesh.
            </p>

            {/* 3 Vehicle Rate Cards matching reference */}
            <div className="grid grid-cols-3 gap-2.5 mb-5">
              {/* Truck */}
              <div className="p-3 rounded-2xl bg-forest-900/80 border border-white/5 text-center space-y-1">
                <span className="text-2xl block">🚛</span>
                <h5 className="text-xs font-bold font-display text-white">Truck</h5>
                <span className="text-xs font-black font-mono text-amber-400 block">
                  ₹28 <span className="text-[9px] text-cream-200/50 font-normal">/km</span>
                </span>
              </div>

              {/* Mini Truck */}
              <div className="p-3 rounded-2xl bg-forest-900/80 border border-emerald-500/20 text-center space-y-1">
                <span className="text-2xl block">🚚</span>
                <h5 className="text-xs font-bold font-display text-white">Mini Truck</h5>
                <span className="text-xs font-black font-mono text-emerald-400 block">
                  ₹18 <span className="text-[9px] text-cream-200/50 font-normal">/km</span>
                </span>
              </div>

              {/* Tractor Trailer */}
              <div className="p-3 rounded-2xl bg-forest-900/80 border border-white/5 text-center space-y-1">
                <span className="text-2xl block">🚜</span>
                <h5 className="text-xs font-bold font-display text-white">Tractor Trailer</h5>
                <span className="text-xs font-black font-mono text-sky-400 block">
                  ₹14 <span className="text-[9px] text-cream-200/50 font-normal">/km</span>
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => alert('Transport Dispatch: Connecting you with verified Andhra Mandi truckers (Demo Feature).')}
            className="w-full py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold font-display text-xs flex items-center justify-center gap-1.5 shadow-lg cursor-pointer transition-all hover:scale-[1.01]"
          >
            <span>Find Transport →</span>
          </button>
        </div>

        {/* Panel 2: TOOLS BRIDGE & PROFITABILITY ESTIMATOR */}
        <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Tools Bridge */}
          <div className="p-5 rounded-3xl bg-forest-950/90 border border-white/10 backdrop-blur-2xl shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1.5 text-amber-400 text-[10px] font-mono uppercase font-bold mb-2">
                <Wrench className="w-3.5 h-3.5" />
                <span>Machinery Bridge</span>
              </div>
              <h4 className="text-base font-bold font-display text-white mb-1">
                Tools for Today's Market
              </h4>
              <p className="text-xs text-cream-200/70 font-body leading-relaxed mb-4">
                Rent harvesting, threshing, weighing, and packing tools to prepare your crop for auction.
              </p>
            </div>

            <button
              onClick={startTransitionToTools}
              className="py-2.5 px-4 rounded-xl bg-forest-900 hover:bg-forest-800 border border-white/10 text-cream-100 font-display font-semibold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Explore Tools →</span>
            </button>
          </div>

          {/* Profitability Estimator */}
          <div className="p-5 rounded-3xl bg-forest-950/90 border border-emerald-500/30 backdrop-blur-2xl shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1.5 text-emerald-400 text-[10px] font-mono uppercase font-bold mb-2">
                <DollarSign className="w-3.5 h-3.5" />
                <span>Farm Intelligence</span>
              </div>
              <h4 className="text-base font-bold font-display text-white mb-1">
                Crop Profit Estimator
              </h4>
              <div className="p-2.5 rounded-xl bg-forest-900/80 border border-white/5 space-y-1 my-2 text-[11px] font-mono text-cream-200/80">
                <div className="flex justify-between">
                  <span>Crop:</span>
                  <span className="text-white font-bold">{currentCrop.name.split(' ')[0]}</span>
                </div>
                <div className="flex justify-between">
                  <span>Mandi Rate:</span>
                  <span className="text-emerald-300 font-bold">₹{currentCrop.price}/kg</span>
                </div>
                <div className="flex justify-between">
                  <span>Est. Revenue / Acre:</span>
                  <span className="text-amber-300 font-bold">₹{(currentCrop.price * 2200).toLocaleString()}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => alert(`Profitability calculated for ${currentCrop.name} at ₹${currentCrop.price}/kg based on regional yield averages (Demo Model).`)}
              className="py-2.5 px-4 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/40 text-emerald-300 font-display font-semibold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Calculate My Profit</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
