import React from 'react';
import { useWorld } from '../../../context/WorldContext';
import { useLand } from '../../../context/LandContext';
import { Tractor, Sprout, Briefcase, Store, ArrowRight, Sparkles } from 'lucide-react';

export const LandEcosystemBridges = () => {
  const {
    startTransitionToTools,
    startTransitionToSeeds,
    startTransitionToJobs,
    startTransitionToMarket,
  } = useWorld();

  const { activeSoilType } = useLand();

  const currentSoilName =
    activeSoilType === 'black_soil'
      ? 'Black Cotton Soil'
      : activeSoilType === 'alluvial'
      ? 'River Delta Alluvial'
      : activeSoilType === 'red_loam'
      ? 'Red Sandy Loam'
      : 'Farmland';

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-12">
      <div className="p-6 sm:p-8 rounded-3xl bg-forest-950/90 border border-white/10 backdrop-blur-2xl shadow-2xl">
        <div className="flex items-center justify-between mb-6 pb-3 border-b border-white/10">
          <div>
            <span className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-wider block">
              COMPLETE AGRI ECOSYSTEM INTEGRATION
            </span>
            <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
              Cultivate Your Leased {currentSoilName} with AGRI NEXUS
            </h3>
          </div>
          <span className="text-xs font-mono text-cream-200/50 hidden sm:inline">
            From land lease to harvest & market sale
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
                Land Preparation Tools
              </h4>
              <p className="text-xs text-cream-200/60 font-body leading-relaxed">
                Rent laser levelers, heavy MB ploughs & rotavators to prepare your newly leased acreage.
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
                Soil-Matched Seeds
              </h4>
              <p className="text-xs text-cream-200/60 font-body leading-relaxed">
                Source certified high-germination seed varieties genetically matched to your soil chemistry.
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

          {/* Bridge 3: Jobs */}
          <div className="p-5 rounded-2xl bg-forest-900/70 border border-white/5 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-300 flex items-center justify-center text-xl mb-3">
                <Briefcase className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold font-display text-white mb-1">
                Hire Farm Labor Crews
              </h4>
              <p className="text-xs text-cream-200/60 font-body leading-relaxed">
                Book experienced transplanting teams, tractor drivers, and harvest crews for your land.
              </p>
            </div>
            <button
              onClick={startTransitionToJobs}
              className="mt-4 py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-sky-300 text-xs font-mono flex items-center justify-between cursor-pointer"
            >
              <span>Hire Workers</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Bridge 4: Mandi Prices */}
          <div className="p-5 rounded-2xl bg-forest-900/70 border border-white/5 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-300 flex items-center justify-center text-xl mb-3">
                <Store className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold font-display text-white mb-1">
                Commodity Mandi Rates
              </h4>
              <p className="text-xs text-cream-200/60 font-body leading-relaxed">
                Check regional APMC market prices to project crop returns before finalizing your lease tenure.
              </p>
            </div>
            <button
              onClick={startTransitionToMarket}
              className="mt-4 py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-rose-300 text-xs font-mono flex items-center justify-between cursor-pointer"
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
