import React from 'react';
import { useLand } from '../../../context/LandContext';
import { Search, Filter, Sparkles, MapPin, X, Waves, Layers } from 'lucide-react';

export const LandSearchAndFilterBar = () => {
  const {
    searchQuery,
    setSearchQuery,
    activeSoilType,
    setActiveSoilType,
    activeWaterSource,
    setActiveWaterSource,
    allSoilTypes,
    allWaterSources,
  } = useLand();

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-8">
      <div className="p-6 rounded-3xl bg-forest-950/90 border border-white/10 backdrop-blur-2xl shadow-2xl space-y-4">
        {/* Search Title */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div>
            <span className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-wider block">
              FARMLAND DISCOVERY & LEASE RADAR
            </span>
            <h3 className="text-lg font-bold font-display text-white">
              Search Verified Farmland in Andhra Pradesh
            </h3>
          </div>
          <span className="text-[11px] font-mono text-cream-200/50">
            Filtered by soil chemistry, water rights & survey title
          </span>
        </div>

        {/* Large Search Input */}
        <div className="relative w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-cream-200/50" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Guntur, Krishna delta, Black Cotton Soil, Canal Sluice, Borewell, 10 Acres..."
            className="w-full pl-11 pr-10 py-3 rounded-2xl bg-forest-900/90 border border-white/15 focus:border-amber-400 text-sm text-white placeholder:text-cream-200/40 focus:outline-none focus:ring-1 focus:ring-amber-400 font-body transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-cream-200/50 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filter Controls Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-white/10">
          {/* Soil Type Selectors */}
          <div>
            <span className="text-[10px] font-mono text-amber-400 uppercase font-bold block mb-1.5 flex items-center gap-1">
              <Layers className="w-3 h-3" />
              <span>Soil Profile:</span>
            </span>
            <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1">
              {allSoilTypes.map((st) => {
                const isSelected = activeSoilType === st.id;

                return (
                  <button
                    key={st.id}
                    onClick={() => setActiveSoilType(st.id)}
                    className={`px-3 py-1 rounded-full text-xs font-display flex items-center gap-1 whitespace-nowrap cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-amber-500 text-stone-950 font-bold shadow-md'
                        : 'bg-white/5 hover:bg-white/10 text-cream-200/70 hover:text-white'
                    }`}
                  >
                    <span>{st.icon}</span>
                    <span>{st.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Water Source Selectors */}
          <div>
            <span className="text-[10px] font-mono text-sky-400 uppercase font-bold block mb-1.5 flex items-center gap-1">
              <Waves className="w-3 h-3" />
              <span>Water Source & Rights:</span>
            </span>
            <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1">
              {allWaterSources.map((ws) => {
                const isSelected = activeWaterSource === ws.id;

                return (
                  <button
                    key={ws.id}
                    onClick={() => setActiveWaterSource(ws.id)}
                    className={`px-3 py-1 rounded-full text-xs font-display flex items-center gap-1 whitespace-nowrap cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-sky-500 text-stone-950 font-bold shadow-md'
                        : 'bg-white/5 hover:bg-white/10 text-cream-200/70 hover:text-white'
                    }`}
                  >
                    <span>{ws.icon}</span>
                    <span>{ws.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
