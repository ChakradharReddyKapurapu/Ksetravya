import React from 'react';
import { ChevronDown, Mouse } from 'lucide-react';

export const ScrollIndicator = () => {
  const handleScroll = () => {
    const ecoSection = document.getElementById('ecosystem-section');
    if (ecoSection) {
      ecoSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <button
      onClick={handleScroll}
      className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-forest-950/75 backdrop-blur-md border border-white/10 text-cream-200/70 hover:text-white hover:border-emerald-500/40 text-xs font-mono transition-all duration-300 shadow-xl group cursor-pointer"
    >
      <Mouse className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110 transition-transform" />
      <span>Scroll Down to Explore</span>
      <ChevronDown className="w-3.5 h-3.5 text-emerald-400 animate-bounce" />
    </button>
  );
};
