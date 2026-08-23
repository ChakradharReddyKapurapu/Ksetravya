import React from 'react';
import { useFavorites } from '../../../context/FavoritesContext';
import { Heart, ArrowRight, Bookmark, Sparkles } from 'lucide-react';

export const SavedItemsWidget = () => {
  const { savedItems, savedCount, openSavedDrawer } = useFavorites();

  const toolCount = savedItems.filter((i) => i.domain === 'tools').length;
  const landCount = savedItems.filter((i) => i.domain === 'land').length;
  const jobCount = savedItems.filter((i) => i.domain === 'jobs').length;
  const productCount = savedItems.filter((i) => i.domain === 'marketplace' || i.domain === 'seeds' || i.domain === 'crop_protection').length;

  const categories = [
    { label: 'Saved Tools', count: toolCount, icon: '🚜' },
    { label: 'Saved Land', count: landCount, icon: '🌾' },
    { label: 'Saved Jobs', count: jobCount, icon: '💼' },
    { label: 'Saved Products', count: productCount, icon: '🛒' },
  ];

  return (
    <div className="p-6 rounded-3xl bg-forest-950/85 border border-white/10 backdrop-blur-xl shadow-xl flex flex-col justify-between space-y-4">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-rose-500/20 border border-rose-400/30 flex items-center justify-center text-rose-400">
              <Heart className="w-4 h-4 fill-rose-400" />
            </div>
            <div>
              <h3 className="font-bold font-display text-white text-sm">My Saved Items</h3>
              <span className="text-[10px] text-cream-200/50 font-mono">
                {savedCount} Bookmarks Stored Locally
              </span>
            </div>
          </div>

          <span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 text-[9px] font-mono border border-rose-400/30 font-bold">
            {savedCount} Total
          </span>
        </div>

        {/* 4 Category Counters */}
        <div className="grid grid-cols-2 gap-2.5 py-4">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              className="p-3 rounded-2xl bg-forest-900/60 border border-white/5 flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <span className="text-base">{cat.icon}</span>
                <span className="text-xs font-mono text-cream-200/80">{cat.label}</span>
              </div>
              <span className="font-mono font-bold text-white text-sm">
                {cat.count}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Button */}
      <button
        onClick={() => openSavedDrawer('all')}
        className="w-full py-2.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/40 text-rose-300 font-display font-semibold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
      >
        <span>View Saved Items ({savedCount})</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
