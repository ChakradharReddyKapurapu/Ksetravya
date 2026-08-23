import React from 'react';
import { useTools } from '../../../context/ToolsContext';
import { TOOL_CATEGORIES } from '../data/demoToolsData';

export const CategoryBar = () => {
  const { selectedCategory, setSelectedCategory } = useTools();

  return (
    <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      {/* Category Pills Bar with Horizontal Scroll */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {TOOL_CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-semibold font-display transition-all duration-200 whitespace-nowrap cursor-pointer ${
                isSelected
                  ? 'bg-amber-500 text-stone-950 shadow-lg shadow-amber-500/20 font-bold scale-[1.03]'
                  : 'bg-forest-900/80 hover:bg-forest-800 text-cream-200/80 border border-white/10 hover:text-white'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
              <span
                className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                  isSelected ? 'bg-stone-950/20 text-stone-950' : 'bg-white/10 text-cream-200/60'
                }`}
              >
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
