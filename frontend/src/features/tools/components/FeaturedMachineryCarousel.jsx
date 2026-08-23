import React from 'react';
import { useTools } from '../../../context/ToolsContext';
import { TOOLS_DATA } from '../data/demoToolsData';
import { Sparkles, Star, MapPin, ArrowRight, Heart, Layers } from 'lucide-react';

export const FeaturedMachineryCarousel = () => {
  const {
    setSelectedTool,
    openRentalModal,
    openBuyModal,
    toggleFavorite,
    favorites,
    toggleComparison,
    comparisonList,
  } = useTools();

  const featuredList = TOOLS_DATA.slice(0, 5);

  return (
    <section className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-amber-400 text-sm">🔥</span>
          <h3 className="text-lg sm:text-xl font-bold font-display text-white">
            Featured Farming Machinery
          </h3>
        </div>
        <span className="text-[10px] font-mono text-cream-200/50">
          Direct Dealer Listings
        </span>
      </div>

      {/* Horizontal Carousel */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {featuredList.map((tool) => {
          const isFav = favorites.includes(tool.id);
          const isComp = comparisonList.some((item) => item.id === tool.id);

          return (
            <div
              key={tool.id}
              onClick={() => setSelectedTool(tool)}
              className="group relative p-4 rounded-3xl bg-forest-900/80 border border-white/10 hover:border-amber-400/50 backdrop-blur-xl transition-all duration-300 flex flex-col justify-between cursor-pointer hover:-translate-y-1 shadow-xl"
            >
              <div>
                {/* Badge & Favorite Icon */}
                <div className="flex items-start justify-between gap-1 mb-2">
                  <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[9px] font-mono border border-amber-400/30">
                    {tool.badge || tool.brand}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(tool.id);
                      }}
                      className={`p-1.5 rounded-full border transition-colors ${
                        isFav
                          ? 'bg-rose-500/20 border-rose-400 text-rose-400'
                          : 'bg-white/5 border-white/10 text-stone-400 hover:text-white'
                      }`}
                      title={isFav ? 'Remove Favorite' : 'Save Tool'}
                    >
                      <Heart className="w-3 h-3 fill-current" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleComparison(tool);
                      }}
                      className={`p-1.5 rounded-full border transition-colors ${
                        isComp
                          ? 'bg-emerald-500/20 border-emerald-400 text-emerald-400'
                          : 'bg-white/5 border-white/10 text-stone-400 hover:text-white'
                      }`}
                      title="Compare"
                    >
                      <Layers className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                <h4 className="text-sm font-bold font-display text-white group-hover:text-amber-300 transition-colors leading-snug">
                  {tool.name}
                </h4>
                <p className="text-[11px] text-cream-200/60 font-mono mt-0.5">
                  {tool.specs.hp} • {tool.brand}
                </p>

                {/* Rating & Location */}
                <div className="flex items-center justify-between text-[10px] font-mono text-cream-200/50 my-3">
                  <span className="flex items-center gap-1 text-amber-300">
                    <Star className="w-3 h-3 fill-current text-amber-400" /> {tool.rating} ({tool.reviewCount})
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-emerald-400" /> {tool.location.split(',')[0]}
                  </span>
                </div>

                {/* Dual Price Box */}
                <div className="p-2.5 rounded-2xl bg-forest-950/70 border border-white/5 font-mono space-y-1 mb-3">
                  <div className="flex items-baseline justify-between">
                    <span className="text-[9px] text-cream-200/50 uppercase">Buy:</span>
                    <span className="text-xs font-bold text-white">₹{tool.buyPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex items-baseline justify-between text-amber-300">
                    <span className="text-[9px] text-amber-300/70 uppercase">Rent:</span>
                    <span className="text-xs font-bold">₹{tool.rentPriceDay.toLocaleString()}/day</span>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-1.5 pt-2 border-t border-white/5">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    openBuyModal(tool);
                  }}
                  className="py-1.5 px-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-[10px] font-display text-center transition-all cursor-pointer"
                >
                  Buy
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    openRentalModal(tool);
                  }}
                  className="py-1.5 px-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-stone-950 font-bold text-[10px] font-display text-center transition-all cursor-pointer"
                >
                  Rent
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
