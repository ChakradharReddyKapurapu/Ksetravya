import React from 'react';
import { useLand } from '../../../context/LandContext';
import { Sparkles, PlusCircle, Calculator, Compass, ArrowRight } from 'lucide-react';

export const LandHero = () => {
  const {
    activeRole,
    setActiveRole,
    activeSoilType,
    setActiveSoilType,
    setIsListLandModalOpen,
  } = useLand();

  const quickSoilPills = [
    { id: 'black_soil', label: 'BLACK COTTON SOIL', icon: '🌱', region: 'Guntur / Krishna' },
    { id: 'alluvial', label: 'RIVER DELTA ALLUVIAL', icon: '🌾', region: 'Krishna / Godavari' },
    { id: 'red_loam', label: 'RED SANDY LOAM', icon: '🥜', region: 'Rayalaseema / Kurnool' },
    { id: 'all', label: 'ALL VERIFIED PARCELS', icon: '🌍', region: 'Andhra Pradesh' },
  ];

  return (
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-10 text-center">
      {/* Small Badge */}
      <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30 text-[10px] font-mono uppercase tracking-wider mb-4 backdrop-blur-md">
        <span>🌍</span>
        <span className="font-bold">AGRI NEXUS FARMLAND & PROPERTY</span>
      </div>

      {/* Main Headline */}
      <h1 className="text-4xl sm:text-6xl font-black font-display text-white tracking-tight leading-[1.08] mb-3">
        FIND LAND THAT <br />
        <span className="text-amber-400">FITS YOUR FARMING PLANS.</span>
      </h1>

      {/* Subtitle */}
      <p className="text-sm sm:text-base text-cream-200/80 font-body max-w-xl mx-auto mb-8 leading-relaxed">
        Explore agricultural land by location, area, rental cost, irrigation, soil and available facilities.
      </p>

      {/* 3 Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
        {/* Button 1: FIND LAND TO LEASE */}
        <button
          onClick={() => {
            setActiveRole('cultivator');
            const elem = document.getElementById('parcels-board');
            if (elem) elem.scrollIntoView({ behavior: 'smooth' });
          }}
          className={`flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold font-display transition-all shadow-xl cursor-pointer ${
            activeRole === 'cultivator'
              ? 'bg-amber-500 hover:bg-amber-400 text-stone-950 ring-2 ring-amber-300/50 scale-105'
              : 'bg-forest-950/80 hover:bg-forest-900 border border-white/15 text-cream-100'
          }`}
        >
          <span>🚜</span>
          <span>FIND LAND TO LEASE</span>
        </button>

        {/* Button 2: LIST YOUR LAND */}
        <button
          onClick={() => setIsListLandModalOpen(true)}
          className="flex items-center gap-2 px-6 py-3 rounded-full bg-forest-950/90 hover:bg-forest-900 border border-amber-400/40 text-amber-300 text-xs font-bold font-display transition-all shadow-lg hover:scale-105 cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          <span>LIST YOUR LAND</span>
        </button>

        {/* Button 3: LEASE CALCULATOR */}
        <button
          onClick={() => {
            const elem = document.getElementById('lease-calculator');
            if (elem) elem.scrollIntoView({ behavior: 'smooth' });
          }}
          className="flex items-center gap-2 px-6 py-3 rounded-full bg-forest-950/80 hover:bg-forest-900 border border-white/15 text-cream-100 text-xs font-semibold font-display transition-all shadow-md cursor-pointer"
        >
          <Calculator className="w-4 h-4 text-emerald-400" />
          <span>ROI CALCULATOR</span>
        </button>
      </div>

      {/* 4 Quick Soil & Region Category Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl mx-auto">
        {quickSoilPills.map((soil) => {
          const isSelected = activeSoilType === soil.id;

          return (
            <button
              key={soil.id}
              onClick={() => {
                setActiveSoilType(isSelected ? 'all' : soil.id);
                const elem = document.getElementById('parcels-board');
                if (elem) elem.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`p-4 rounded-3xl border flex flex-col items-center justify-center gap-1.5 transition-all duration-300 cursor-pointer shadow-xl backdrop-blur-xl group ${
                isSelected
                  ? 'bg-amber-500/25 border-amber-400 shadow-amber-950/50 scale-105'
                  : 'bg-forest-950/85 hover:bg-forest-900/90 border-white/10 text-cream-100 hover:border-amber-400/40'
              }`}
            >
              <div className="w-10 h-10 rounded-2xl bg-white/10 group-hover:bg-amber-500/20 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                {soil.icon}
              </div>
              <span className="text-[11px] font-black font-display tracking-wider text-white group-hover:text-amber-300">
                {soil.label}
              </span>
              <span className="text-[9px] font-mono text-cream-200/50">
                {soil.region}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
