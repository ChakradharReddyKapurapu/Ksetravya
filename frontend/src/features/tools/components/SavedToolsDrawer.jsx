import React from 'react';
import { useTools } from '../../../context/ToolsContext';
import { TOOLS_DATA } from '../data/demoToolsData';
import { X, Heart, Trash2, ArrowRight } from 'lucide-react';

export const SavedToolsDrawer = () => {
  const {
    favorites,
    toggleFavorite,
    isFavoritesDrawerOpen,
    setIsFavoritesDrawerOpen,
    setSelectedTool,
    openRentalModal,
    openBuyModal,
  } = useTools();

  if (!isFavoritesDrawerOpen) return null;

  const savedList = TOOLS_DATA.filter((tool) => favorites.includes(tool.id));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end p-4">
      <div
        className="fixed inset-0 bg-forest-950/80 backdrop-blur-sm transition-opacity"
        onClick={() => setIsFavoritesDrawerOpen(false)}
      />

      <div className="relative w-full max-w-md h-[90vh] p-6 rounded-3xl bg-forest-950/95 border border-rose-500/30 shadow-2xl z-10 text-cream-100 flex flex-col justify-between animate-in slide-in-from-right duration-300">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-rose-500/20 border border-rose-500/30 flex items-center justify-center text-rose-400">
                <Heart className="w-4 h-4 fill-current" />
              </div>
              <h3 className="text-lg font-bold font-display text-white">
                Saved Machinery ({savedList.length})
              </h3>
            </div>
            <button
              onClick={() => setIsFavoritesDrawerOpen(false)}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-stone-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* List */}
          {savedList.length === 0 ? (
            <div className="py-20 text-center text-cream-200/50 font-body text-xs">
              You haven't saved any machinery yet. Click the heart icon on any tool card to save it here.
            </div>
          ) : (
            <div className="space-y-3 overflow-y-auto max-h-[65vh] pr-1">
              {savedList.map((tool) => (
                <div
                  key={tool.id}
                  className="p-3.5 rounded-2xl bg-forest-900/80 border border-white/10 flex items-center justify-between gap-3"
                >
                  <div
                    onClick={() => {
                      setSelectedTool(tool);
                      setIsFavoritesDrawerOpen(false);
                    }}
                    className="cursor-pointer"
                  >
                    <h4 className="text-xs font-bold font-display text-white hover:text-amber-300 transition-colors">
                      {tool.name}
                    </h4>
                    <p className="text-[10px] text-cream-200/60 font-mono mt-0.5">
                      Buy: ₹{tool.buyPrice.toLocaleString()} • Rent: ₹{tool.rentPriceDay}/d
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => {
                        openRentalModal(tool);
                        setIsFavoritesDrawerOpen(false);
                      }}
                      className="py-1 px-2.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-stone-950 text-[10px] font-bold font-display"
                    >
                      Rent
                    </button>
                    <button
                      onClick={() => toggleFavorite(tool.id)}
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-red-500/20 text-stone-400 hover:text-red-400"
                      title="Remove"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={() => setIsFavoritesDrawerOpen(false)}
          className="w-full py-2.5 px-4 rounded-xl bg-forest-900 hover:bg-forest-800 border border-white/10 text-xs font-mono text-cream-200/80 hover:text-white"
        >
          Close Drawer
        </button>
      </div>
    </div>
  );
};
