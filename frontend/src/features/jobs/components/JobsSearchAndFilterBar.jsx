import React, { useState } from 'react';
import { useJobs } from '../../../context/JobsContext';
import { Search, Filter, Sparkles, MapPin, X } from 'lucide-react';

export const JobsSearchAndFilterBar = () => {
  const {
    searchQuery,
    setSearchQuery,
    activeCategory,
    setActiveCategory,
    activeCrop,
    setActiveCrop,
    allCategories,
  } = useJobs();

  const cropsList = [
    { id: 'all', label: 'All Crops', icon: '🌾' },
    { id: 'rice', label: 'Rice (Paddy)', icon: '🌾' },
    { id: 'cotton', label: 'Cotton', icon: '🌿' },
    { id: 'maize', label: 'Maize', icon: '🌽' },
    { id: 'groundnut', label: 'Groundnut', icon: '🥜' },
    { id: 'chilli', label: 'Chilli', icon: '🌶️' },
    { id: 'mango', label: 'Mango Orchard', icon: '🥭' },
    { id: 'tomato', label: 'Tomato', icon: '🍅' },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-8">
      <div className="p-6 rounded-3xl bg-forest-950/90 border border-white/10 backdrop-blur-2xl shadow-2xl space-y-4">
        {/* Search Title */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div>
            <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider block">
              AGRICULTURAL WORK DISCOVERY
            </span>
            <h3 className="text-lg font-bold font-display text-white">
              What Work Are You Looking For?
            </h3>
          </div>
          <span className="text-[11px] font-mono text-cream-200/50">
            Real-time farm labor & machinery opportunities across AP
          </span>
        </div>

        {/* Large Search Input */}
        <div className="relative w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-cream-200/50" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search harvesting, tractor operator, rice planting, chilli picking, Guntur, Kurnool..."
            className="w-full pl-11 pr-10 py-3 rounded-2xl bg-forest-900/90 border border-white/15 focus:border-emerald-400 text-sm text-white placeholder:text-cream-200/40 focus:outline-none focus:ring-1 focus:ring-emerald-400 font-body transition-all"
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

        {/* Crop Focus Pills (Dynamically transforms 3D field scene) */}
        <div className="pt-2 border-t border-white/10">
          <span className="text-[10px] font-mono text-amber-400 uppercase font-bold block mb-2">
            🌱 Focus Crop Field (Transforms 3D Work Environment):
          </span>
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1">
            {cropsList.map((c) => {
              const isSelected = activeCrop === c.id;

              return (
                <button
                  key={c.id}
                  onClick={() => setActiveCrop(c.id)}
                  className={`px-3 py-1 rounded-full text-xs font-display flex items-center gap-1.5 whitespace-nowrap cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-emerald-500 text-stone-950 font-bold shadow-md scale-105'
                      : 'bg-white/5 hover:bg-white/10 text-cream-200/70 hover:text-white'
                  }`}
                >
                  <span>{c.icon}</span>
                  <span>{c.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
