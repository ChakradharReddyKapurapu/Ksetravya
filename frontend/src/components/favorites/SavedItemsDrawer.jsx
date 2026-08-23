import React from 'react';
import { useFavorites } from '../../context/FavoritesContext';
import { useWorld } from '../../context/WorldContext';
import { X, Heart, Trash2, ArrowRight, ExternalLink, Bookmark, Sparkles } from 'lucide-react';

const CATEGORY_TABS = [
  { id: 'all', label: 'All', icon: '✨' },
  { id: 'tools', label: 'Tools', icon: '🚜' },
  { id: 'marketplace', label: 'Products', icon: '🛒' },
  { id: 'jobs', label: 'Jobs', icon: '💼' },
  { id: 'land', label: 'Land', icon: '🌾' },
  { id: 'seeds', label: 'Seeds', icon: '🌱' },
  { id: 'crop_protection', label: 'Crop Care', icon: '🛡️' },
];

export const SavedItemsDrawer = () => {
  const {
    savedItems,
    savedCount,
    isSavedDrawerOpen,
    closeSavedDrawer,
    removeSavedItem,
    clearAllSaved,
    activeFilter,
    setActiveFilter,
  } = useFavorites();

  const {
    startTransitionToFarm,
    startTransitionToTools,
    startTransitionToSeeds,
    startTransitionToCropProtection,
    startTransitionToMarket,
    startTransitionToJobs,
    startTransitionToLand,
  } = useWorld();

  if (!isSavedDrawerOpen) return null;

  const filteredItems = savedItems.filter((item) => {
    if (activeFilter === 'all') return true;
    return item.domain === activeFilter;
  });

  const handleNavigateToItem = (item) => {
    closeSavedDrawer();
    switch (item.targetWorld) {
      case 'tools':
        startTransitionToTools();
        break;
      case 'seeds':
        startTransitionToSeeds();
        break;
      case 'crop_protection':
        startTransitionToCropProtection();
        break;
      case 'market':
        startTransitionToMarket();
        break;
      case 'jobs':
        startTransitionToJobs();
        break;
      case 'land':
        startTransitionToLand();
        break;
      default:
        startTransitionToFarm();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={closeSavedDrawer}
        className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-forest-950/95 border-l border-white/10 text-cream-100 shadow-2xl backdrop-blur-2xl flex flex-col justify-between p-6 animate-in slide-in-from-right duration-200">
          {/* Header */}
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-rose-500/20 border border-rose-400/40 flex items-center justify-center text-rose-400">
                  <Heart className="w-5 h-5 fill-rose-400" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-display font-bold text-white text-base">My Saved Items</h3>
                    <span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 text-[10px] font-mono border border-rose-400/30 font-bold">
                      {savedCount}
                    </span>
                  </div>
                  <span className="text-[10px] text-cream-200/50 font-mono">
                    Quick-access bookmarks across AGRI NEXUS
                  </span>
                </div>
              </div>

              <button
                onClick={closeSavedDrawer}
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-cream-200/70 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex items-center gap-1.5 py-3 overflow-x-auto scrollbar-none border-b border-white/5">
              {CATEGORY_TABS.map((tab) => {
                const isActive = activeFilter === tab.id;
                const count = tab.id === 'all' ? savedCount : savedItems.filter((i) => i.domain === tab.id).length;

                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveFilter(tab.id)}
                    className={`px-3 py-1 rounded-full text-xs font-display font-semibold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-rose-500 text-stone-950 font-bold shadow-md'
                        : 'bg-white/5 hover:bg-white/10 text-cream-200/70 hover:text-white'
                    }`}
                  >
                    <span>{tab.icon}</span>
                    <span>{tab.label}</span>
                    {count > 0 && (
                      <span
                        className={`text-[9px] px-1.5 py-0.2 rounded-full font-mono ${
                          isActive ? 'bg-black/20 text-stone-950 font-bold' : 'bg-white/10 text-cream-200'
                        }`}
                      >
                        {count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Saved Items List */}
            <div className="py-4 space-y-3 max-h-[62vh] overflow-y-auto scrollbar-none">
              {filteredItems.length === 0 ? (
                /* Empty State per prompt requirements */
                <div className="py-16 text-center space-y-3 px-4">
                  <div className="w-12 h-12 rounded-full bg-rose-500/10 border border-rose-400/20 flex items-center justify-center text-rose-300 mx-auto">
                    <Heart className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold font-display text-white">
                    You haven't saved anything yet.
                  </h4>
                  <p className="text-xs text-cream-200/60 font-body max-w-xs mx-auto">
                    Save tools, land, jobs and products to find them quickly later.
                  </p>
                  <button
                    onClick={() => {
                      closeSavedDrawer();
                      startTransitionToTools();
                    }}
                    className="mt-2 px-4 py-2 rounded-full bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold font-display text-xs inline-flex items-center gap-1.5 cursor-pointer shadow-md transition-all"
                  >
                    <span>Explore Equipment & Products</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                filteredItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all flex flex-col justify-between gap-3 group"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3 min-w-0">
                        <div className="w-10 h-10 rounded-xl bg-forest-900 border border-white/10 flex items-center justify-center text-xl flex-shrink-0">
                          {item.icon}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="px-2 py-0.2 rounded-full bg-rose-500/20 text-rose-300 text-[9px] font-mono border border-rose-400/30 uppercase font-semibold">
                              {item.domainLabel || item.domain}
                            </span>
                            {item.price && (
                              <span className="text-xs font-mono font-bold text-amber-300">
                                ₹{Number(item.price).toLocaleString()}
                                {item.unit ? ` / ${item.unit}` : ''}
                              </span>
                            )}
                          </div>
                          <h4 className="text-xs sm:text-sm font-bold font-display text-white truncate">
                            {item.title}
                          </h4>
                          <p className="text-[11px] text-cream-200/60 font-body truncate mt-0.5">
                            {item.summary}
                          </p>
                        </div>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeSavedItem(item.id)}
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-rose-500/20 text-cream-200/50 hover:text-rose-400 transition-colors cursor-pointer flex-shrink-0"
                        title="Remove from saved"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* View Action Button */}
                    <div className="flex items-center justify-end pt-2 border-t border-white/5">
                      <button
                        onClick={() => handleNavigateToItem(item)}
                        className="px-3 py-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-xs font-display font-semibold inline-flex items-center gap-1.5 transition-all cursor-pointer"
                      >
                        <span>View in {item.domainLabel || 'Domain'}</span>
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-cream-200/50">
            <span>Saved to device storage</span>
            {savedCount > 0 && (
              <button
                onClick={clearAllSaved}
                className="text-rose-400/80 hover:text-rose-300 underline cursor-pointer"
              >
                Clear all
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
