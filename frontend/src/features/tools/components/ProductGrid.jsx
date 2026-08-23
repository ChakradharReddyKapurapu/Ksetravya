import React, { useState, useEffect } from 'react';
import { useTools } from '../../../context/ToolsContext';
import { toolsService } from '../services/toolsService';
import { TOOL_BRANDS } from '../data/demoToolsData';
import {
  Star,
  MapPin,
  Heart,
  Layers,
  ArrowUpRight,
  ShieldCheck,
  Zap,
  Filter,
  CheckCircle2,
} from 'lucide-react';
import { FavoriteButton } from '../../../components/favorites/FavoriteButton';

export const ProductGrid = () => {
  const {
    toolsList,
    loadingTools,
    activeMode,
    selectedCategory,
    selectedBrand,
    setSelectedBrand,
    selectedLocation,
    searchQuery,
    sortBy,
    setSortBy,
    setSelectedTool,
    openRentalModal,
    openBuyModal,
    favorites,
    toggleFavorite,
    comparisonList,
    toggleComparison,
  } = useTools();

  const tools = toolsList || [];
  const loading = loadingTools;
  const hasError = false;

  return (
    <section id="tools-grid" className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Filters Bar: Brand Tabs + Sort By Dropdown */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-6 pb-4 border-b border-white/10">
        {/* Brand Filter Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-2 lg:pb-0 scrollbar-none">
          {TOOL_BRANDS.map((brand) => (
            <button
              key={brand}
              onClick={() => setSelectedBrand(brand)}
              className={`px-3 py-1 rounded-xl text-xs font-semibold font-display transition-all whitespace-nowrap cursor-pointer ${
                selectedBrand === brand
                  ? 'bg-emerald-500 text-stone-950 font-bold shadow-md'
                  : 'bg-forest-900/60 hover:bg-forest-800 text-cream-200/70 border border-white/10 hover:text-white'
              }`}
            >
              {brand}
            </button>
          ))}
        </div>

        {/* Right Sort By Dropdown */}
        <div className="flex items-center gap-2 self-end lg:self-auto">
          <span className="text-xs text-cream-200/60 font-mono">Sort By:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-forest-900/80 border border-white/15 text-xs text-white focus:outline-none focus:border-amber-400 cursor-pointer"
          >
            <option value="relevance">Most Relevant</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="rating">Highest Rating</option>
          </select>
        </div>
      </div>

      {/* Grid Results */}
      {loading ? (
        <div className="py-24 text-center space-y-3">
          <div className="w-8 h-8 rounded-full border-2 border-amber-400 border-t-transparent animate-spin mx-auto" />
          <p className="text-amber-300 font-mono text-sm">Exploring available equipment...</p>
        </div>
      ) : hasError ? (
        <div className="py-24 text-center max-w-md mx-auto space-y-3 p-6 rounded-3xl bg-forest-950/80 border border-red-500/20">
          <p className="text-base font-bold font-display text-white">We couldn't load this information right now.</p>
          <p className="text-xs text-cream-200/60 font-body">Please check your connection and try again.</p>
          <button
            onClick={fetchTools}
            className="px-4 py-2 rounded-full bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs font-display inline-flex items-center gap-1.5 cursor-pointer shadow-md transition-all"
          >
            <span>Try Again</span>
          </button>
        </div>
      ) : tools.length === 0 ? (
        <div className="py-24 text-center max-w-md mx-auto space-y-3">
          <p className="text-base font-bold font-display text-white">
            No agricultural equipment matches your current filters.
          </p>
          <p className="text-xs text-cream-200/60 font-body">
            Try changing your category, location, availability or price filters.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {tools.map((tool) => {
            const isFav = favorites.includes(tool.id);
            const isComp = comparisonList.some((item) => item.id === tool.id);

            return (
              <div
                key={tool.id}
                onClick={() => setSelectedTool(tool)}
                className="group relative p-6 rounded-3xl bg-forest-900/85 hover:bg-forest-900 border border-white/10 hover:border-amber-400/60 backdrop-blur-xl transition-all duration-300 flex flex-col justify-between cursor-pointer hover:-translate-y-1.5 shadow-2xl"
              >
                <div>
                  {/* Card Header: Category & Actions */}
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="flex items-center gap-1.5">
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono border border-emerald-500/30 uppercase font-semibold">
                        {tool.subCategory || tool.category}
                      </span>
                      {tool.condition === 'New' && (
                        <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[9px] font-mono border border-amber-400/30">
                          Brand New
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5">
                      <FavoriteButton
                        item={{
                          ...tool,
                          id: tool.id,
                          title: tool.name,
                          domain: 'tools',
                          domainLabel: 'Tools',
                          icon: '🚜',
                          price: tool.buyPrice || tool.rentPriceDay,
                          unit: tool.buyPrice ? null : 'Day',
                          summary: `${tool.brand} • ${tool.model} • ${tool.location}`,
                          targetWorld: 'tools',
                        }}
                        size="sm"
                      />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleComparison(tool);
                        }}
                        className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                          isComp
                            ? 'bg-emerald-500/20 border-emerald-400 text-emerald-400'
                            : 'bg-white/5 border-white/10 text-stone-400 hover:text-white'
                        }`}
                        title={isComp ? 'Remove Comparison' : 'Compare Tool'}
                      >
                        <Layers className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Title & Brand */}
                  <h3 className="text-lg font-bold font-display text-white group-hover:text-amber-300 transition-colors leading-tight mb-1">
                    {tool.name}
                  </h3>
                  <p className="text-xs text-cream-200/70 font-body mb-4 line-clamp-2">
                    {tool.description}
                  </p>

                  {/* Specs Pill Grid */}
                  <div className="grid grid-cols-2 gap-2 p-3 rounded-2xl bg-forest-950/70 border border-white/5 font-mono text-[11px] mb-4">
                    <div className="flex items-center gap-1 text-cream-200/80">
                      <Zap className="w-3.5 h-3.5 text-amber-400" />
                      <span>Power: {tool.specs.hp}</span>
                    </div>
                    <div className="flex items-center gap-1 text-cream-200/80">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{tool.specs.year} Model</span>
                    </div>
                    <div className="flex items-center gap-1 text-cream-200/80">
                      <MapPin className="w-3.5 h-3.5 text-sky-400" />
                      <span>{tool.location.split(',')[0]}</span>
                    </div>
                    <div className="flex items-center gap-1 text-amber-300 font-bold">
                      <Star className="w-3.5 h-3.5 fill-current text-amber-400" />
                      <span>{tool.rating} ({tool.reviewCount})</span>
                    </div>
                  </div>

                  {/* Pricing Box (Buy vs Rent) */}
                  <div className="p-3.5 rounded-2xl bg-gradient-to-r from-forest-950 via-forest-900 to-forest-950 border border-white/10 flex items-center justify-between mb-4">
                    <div>
                      <span className="text-[10px] text-cream-200/50 uppercase font-mono block">Buy Outright</span>
                      <span className="text-base sm:text-lg font-black font-display text-white">
                        ₹{tool.buyPrice.toLocaleString()}
                      </span>
                    </div>
                    <div className="h-7 w-[1px] bg-white/10" />
                    <div className="text-right">
                      <span className="text-[10px] text-amber-300/70 uppercase font-mono block">Rental Rate</span>
                      <span className="text-base sm:text-lg font-black font-display text-amber-300">
                        ₹{tool.rentPriceDay.toLocaleString()}
                        <span className="text-[10px] font-mono text-cream-200/60">/day</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bottom Action Buttons */}
                <div className="flex items-center gap-2 pt-3 border-t border-white/5">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openBuyModal(tool);
                    }}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs font-display transition-all shadow-md cursor-pointer text-center"
                  >
                    Buy Machine
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openRentalModal(tool);
                    }}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-stone-950 font-bold text-xs font-display transition-all shadow-md cursor-pointer text-center"
                  >
                    Rent (₹{tool.rentPriceDay}/d)
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};
