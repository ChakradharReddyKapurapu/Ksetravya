import React from 'react';
import { useWorld } from '../../../context/WorldContext';
import { useJobs } from '../../../context/JobsContext';
import { Tractor, Sprout, ShieldCheck, Store, ArrowRight, Sparkles } from 'lucide-react';

export const EcosystemConnectionsSection = () => {
  const {
    startTransitionToTools,
    startTransitionToSeeds,
    startTransitionToCropProtection,
    startTransitionToMarket,
    myCrop,
  } = useWorld();

  const { activeCrop } = useJobs();

  const currentCropName =
    activeCrop === 'cotton'
      ? 'Cotton'
      : activeCrop === 'maize'
      ? 'Maize'
      : activeCrop === 'chilli'
      ? 'Chilli'
      : activeCrop === 'mango'
      ? 'Mango'
      : 'Rice (Paddy)';

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-12">
      <div className="p-6 sm:p-8 rounded-3xl bg-forest-950/90 border border-white/10 backdrop-blur-2xl shadow-2xl">
        <div className="flex items-center justify-between mb-6 pb-3 border-b border-white/10">
          <div>
            <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider block">
              ECOSYSTEM INTEGRATION
            </span>
            <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
              Connected Tools, Seeds & Markets for {currentCropName}
            </h3>
          </div>
          <span className="text-xs font-mono text-cream-200/50 hidden sm:inline">
            Seamless cross-domain agriculture workflow
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Bridge 1: Tools */}
          <div className="p-5 rounded-2xl bg-forest-900/70 border border-white/5 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center text-xl mb-3">
                <Tractor className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold font-display text-white mb-1">
                Machinery for {currentCropName}
              </h4>
              <p className="text-xs text-cream-200/60 font-body leading-relaxed">
                Rent rotavators, combine harvesters & trailers for your labor crew.
              </p>
            </div>
            <button
              onClick={startTransitionToTools}
              className="mt-4 py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-amber-300 text-xs font-mono flex items-center justify-between cursor-pointer"
            >
              <span>Explore Tools</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Bridge 2: Seeds */}
          <div className="p-5 rounded-2xl bg-forest-900/70 border border-white/5 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center text-xl mb-3">
                <Sprout className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold font-display text-white mb-1">
                Certified Seeds Catalog
              </h4>
              <p className="text-xs text-cream-200/60 font-body leading-relaxed">
                Source certified high-germination seed lots for your upcoming sowing.
              </p>
            </div>
            <button
              onClick={() => startTransitionToSeeds()}
              className="mt-4 py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-emerald-300 text-xs font-mono flex items-center justify-between cursor-pointer"
            >
              <span>Explore Seeds</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Bridge 3: Crop Protection */}
          <div className="p-5 rounded-2xl bg-forest-900/70 border border-white/5 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-300 flex items-center justify-center text-xl mb-3">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold font-display text-white mb-1">
                Crop Protection & Spray
              </h4>
              <p className="text-xs text-cream-200/60 font-body leading-relaxed">
                Diagnose field symptoms and order targeted bio-pesticides for sprayers.
              </p>
            </div>
            <button
              onClick={() => startTransitionToCropProtection()}
              className="mt-4 py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-teal-300 text-xs font-mono flex items-center justify-between cursor-pointer"
            >
              <span>Diagnose Crop</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Bridge 4: Market Prices */}
          <div className="p-5 rounded-2xl bg-forest-900/70 border border-white/5 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-300 flex items-center justify-center text-xl mb-3">
                <Store className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold font-display text-white mb-1">
                Live Mandi Prices
              </h4>
              <p className="text-xs text-cream-200/60 font-body leading-relaxed">
                Track APMC arrival rates to time your harvest and labor schedule.
              </p>
            </div>
            <button
              onClick={startTransitionToMarket}
              className="mt-4 py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-sky-300 text-xs font-mono flex items-center justify-between cursor-pointer"
            >
              <span>Check Prices</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
