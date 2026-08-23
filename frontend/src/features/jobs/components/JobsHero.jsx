import React from 'react';
import { useJobs } from '../../../context/JobsContext';
import { Sparkles, PlusCircle, CheckCircle2 } from 'lucide-react';

export const JobsHero = () => {
  const {
    activeRole,
    setActiveRole,
    activeCategory,
    setActiveCategory,
    setIsPostJobModalOpen,
  } = useJobs();

  const quickCategories = [
    { id: 'planting', label: 'PLANTING', icon: '🌱' },
    { id: 'harvesting', label: 'HARVESTING', icon: '🌾' },
    { id: 'weeding', label: 'WEEDING', icon: '🌿' },
    { id: 'irrigation', label: 'IRRIGATION', icon: '💧' },
    { id: 'tractor', label: 'TRACTOR OPERATOR', icon: '🚜' },
    { id: 'packing', label: 'PACKING', icon: '📦' },
  ];

  return (
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-10 text-center">
      {/* Small Badge */}
      <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[10px] font-mono uppercase tracking-wider mb-4 backdrop-blur-md">
        <span>🌾</span>
        <span className="font-bold">AGRI NEXUS WORK ECOSYSTEM</span>
      </div>

      {/* Main Headline matching reference */}
      <h1 className="text-4xl sm:text-6xl font-black font-display text-white tracking-tight leading-[1.08] mb-3">
        CONNECT AGRICULTURAL WORK <br />
        <span className="text-emerald-400">WITH THE RIGHT PEOPLE.</span>
      </h1>

      {/* Subtitle */}
      <p className="text-sm sm:text-base text-cream-200/80 font-body max-w-xl mx-auto mb-8 leading-relaxed">
        Find agricultural work opportunities or connect with workers for seasonal and farm-related operations.
      </p>

      {/* 3 Action Buttons matching reference image */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
        {/* Button 1: FIND WORK */}
        <button
          onClick={() => {
            setActiveRole('worker');
            const elem = document.getElementById('jobs-board');
            if (elem) elem.scrollIntoView({ behavior: 'smooth' });
          }}
          className={`flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold font-display transition-all shadow-xl cursor-pointer ${
            activeRole === 'worker'
              ? 'bg-emerald-600 hover:bg-emerald-500 text-white ring-2 ring-emerald-400/50 scale-105'
              : 'bg-forest-950/80 hover:bg-forest-900 border border-white/15 text-cream-100'
          }`}
        >
          <span>👷</span>
          <span>FIND WORK</span>
        </button>

        {/* Button 2: FIND WORKERS */}
        <button
          onClick={() => {
            setActiveRole('farmer');
            const elem = document.getElementById('workers-discovery');
            if (elem) elem.scrollIntoView({ behavior: 'smooth' });
          }}
          className={`flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold font-display transition-all shadow-xl cursor-pointer ${
            activeRole === 'farmer'
              ? 'bg-amber-500 hover:bg-amber-400 text-stone-950 ring-2 ring-amber-300/50 scale-105'
              : 'bg-forest-950/80 hover:bg-forest-900 border border-white/15 text-cream-100'
          }`}
        >
          <span>👨🌾</span>
          <span>FIND WORKERS</span>
        </button>

        {/* Button 3: POST A JOB */}
        <button
          onClick={() => setIsPostJobModalOpen(true)}
          className="flex items-center gap-2 px-6 py-3 rounded-full bg-forest-950/90 hover:bg-forest-900 border border-amber-400/40 text-amber-300 text-xs font-bold font-display transition-all shadow-lg hover:scale-105 cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          <span>POST A JOB</span>
        </button>
      </div>

      {/* 6 Quick Animated Category Cards matching reference image */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 max-w-5xl mx-auto">
        {quickCategories.map((cat) => {
          const isSelected = activeCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(isSelected ? 'all' : cat.id);
                const elem = document.getElementById('jobs-board');
                if (elem) elem.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`p-4 rounded-3xl border flex flex-col items-center justify-center gap-2 transition-all duration-300 cursor-pointer shadow-xl backdrop-blur-xl group ${
                isSelected
                  ? 'bg-emerald-500/25 border-emerald-400 shadow-emerald-950/50 scale-105'
                  : 'bg-forest-950/85 hover:bg-forest-900/90 border-white/10 text-cream-100 hover:border-emerald-400/40'
              }`}
            >
              <div className="w-12 h-12 rounded-2xl bg-white/10 group-hover:bg-emerald-500/20 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                {cat.icon}
              </div>
              <span className="text-[11px] font-black font-display tracking-wider text-white group-hover:text-emerald-300">
                {cat.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
