import React from 'react';
import { useSeeds } from '../../../context/SeedsContext';
import { useCart } from '../../../context/CartContext';
import {
  Search,
  Filter,
  Star,
  ShoppingBag,
  Layers,
  Sparkles,
  CheckCircle,
  Eye,
} from 'lucide-react';
import { FavoriteButton } from '../../../components/favorites/FavoriteButton';

export const SeedMarketplaceGrid = () => {
  const {
    filteredSeeds,
    activeCategory,
    setActiveCategory,
    allCategories,
    searchQuery,
    setSearchQuery,
    selectedSeason,
    setSelectedSeason,
    sortBy,
    setSortBy,
    setSelectedSeed,
    comparisonList,
    toggleComparison,
    setIsComparisonModalOpen,
  } = useSeeds();

  const { addToCart } = useCart();

  return (
    <section id="seed-catalog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-12">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Certified Seed Catalog</span>
          </div>
          <h2 className="text-3xl font-black font-display text-white tracking-tight">
            High-Yielding Varieties
          </h2>
          <p className="text-xs text-cream-200/60 font-mono mt-1">
            Certified by State Seeds Development Corporations & Research Institutes (Demo Data)
          </p>
        </div>

        {/* Comparison Trigger if items selected */}
        {comparisonList.length > 0 && (
          <button
            onClick={() => setIsComparisonModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500 text-stone-950 font-bold font-display text-xs shadow-xl animate-bounce cursor-pointer"
          >
            <Layers className="w-4 h-4" />
            <span>Compare Selected Seeds ({comparisonList.length})</span>
          </button>
        )}
      </div>

      {/* Control Bar: Categories + Search + Season + Sort */}
      <div className="p-4 rounded-3xl bg-forest-950/90 border border-white/10 backdrop-blur-2xl shadow-2xl mb-8 space-y-4">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1">
          {allCategories.map((cat) => {
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-display font-semibold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-emerald-500 text-stone-950 font-bold shadow-md'
                    : 'bg-white/5 hover:bg-white/10 text-cream-200/70 hover:text-white'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Search & Dropdown Filters */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-white/10">
          {/* Search Bar */}
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-cream-200/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search 'rice', 'cotton', 'bpt 5204'..."
              className="w-full pl-9 pr-4 py-2 rounded-full bg-forest-900/80 border border-white/10 focus:border-emerald-400 text-xs text-white placeholder:text-cream-200/40 focus:outline-none focus:ring-1 focus:ring-emerald-400 font-body"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            {/* Season Filter */}
            <select
              value={selectedSeason}
              onChange={(e) => setSelectedSeason(e.target.value)}
              className="px-3 py-2 rounded-full bg-forest-900/80 border border-white/10 text-xs text-cream-100 font-mono focus:outline-none cursor-pointer"
            >
              <option value="all">All Seasons</option>
              <option value="kharif">Kharif Season</option>
              <option value="rabi">Rabi Season</option>
              <option value="year-round">Year-Round</option>
            </select>

            {/* Sort Filter */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 rounded-full bg-forest-900/80 border border-white/10 text-xs text-cream-100 font-mono focus:outline-none cursor-pointer"
            >
              <option value="popular">Most Popular</option>
              <option value="rating">Top Rated</option>
              <option value="yield">Highest Yield</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Seeds Product Grid */}
      {filteredSeeds.length === 0 ? (
        <div className="py-24 text-center max-w-md mx-auto space-y-3">
          <p className="text-base font-bold font-display text-white">
            No seed options match your current selection.
          </p>
          <p className="text-xs text-cream-200/60 font-body">
            Try changing your crop category, season or search term.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredSeeds.map((seed) => {
            const isComparing = comparisonList.some((s) => s.id === seed.id);

            return (
              <div
                key={seed.id}
                onClick={() => setSelectedSeed(seed)}
                className="group relative p-5 rounded-3xl bg-forest-950/90 border border-white/10 hover:border-emerald-400/50 backdrop-blur-xl shadow-xl hover:shadow-2xl hover:shadow-emerald-950/50 transition-all duration-300 flex flex-col justify-between cursor-pointer hover:-translate-y-1"
              >
              <div>
                {/* Header Tag & Rating */}
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono border border-emerald-400/30 uppercase font-bold">
                    {seed.tag || seed.cropName}
                  </span>
                  <div className="flex items-center gap-1 text-amber-300 text-xs font-bold font-mono">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>{seed.rating}</span>
                    <span className="text-cream-200/40 text-[10px]">({seed.reviews})</span>
                  </div>
                </div>

                {/* Seed Crop Icon & Variety Name */}
                <div className="flex items-start gap-3 mb-2">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-400/20 flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-110 transition-transform">
                    {seed.icon}
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-emerald-400/80 block uppercase">
                      {seed.brand}
                    </span>
                    <h3 className="text-sm font-bold font-display text-white group-hover:text-emerald-300 transition-colors line-clamp-1">
                      {seed.variety}
                    </h3>
                  </div>
                </div>

                {/* Agronomic Quick Specs */}
                <div className="p-3 rounded-2xl bg-forest-900/60 border border-white/5 space-y-1.5 my-3 text-[11px] font-mono text-cream-200/80">
                  <div className="flex justify-between">
                    <span className="text-cream-200/50">Yield Potential:</span>
                    <span className="text-emerald-300 font-bold">{seed.yieldPotential}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-cream-200/50">Germination:</span>
                    <span className="text-white">{seed.germinationRate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-cream-200/50">Duration:</span>
                    <span className="text-white">{seed.duration}</span>
                  </div>
                </div>
              </div>

              {/* Pricing & Actions */}
              <div className="pt-3 border-t border-white/10 space-y-3">
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-lg font-black font-display text-white">
                      ₹{seed.price.toLocaleString()}
                    </span>
                    <span className="text-[10px] font-mono text-cream-200/60 ml-1">
                      / {seed.packSize}
                    </span>
                  </div>
                  <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                    ₹{seed.pricePerKg}/KG
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedSeed(seed);
                    }}
                    className="flex-1 py-2 rounded-xl bg-forest-900 hover:bg-forest-800 border border-white/10 text-xs font-display font-semibold text-cream-100 flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5 text-emerald-400" />
                    <span>View Seed</span>
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(seed, 1, 'seed');
                    }}
                    className="py-2 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold text-xs font-display flex items-center justify-center gap-1 shadow-md cursor-pointer"
                    title="Add to Cart"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Add</span>
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleComparison(seed);
                    }}
                    className={`p-2 rounded-xl border text-xs font-mono transition-colors cursor-pointer ${
                      isComparing
                        ? 'bg-amber-500 text-stone-950 border-amber-400'
                        : 'bg-forest-900 border-white/10 text-cream-200/60 hover:text-white'
                    }`}
                    title="Compare Seed"
                  >
                    <Layers className="w-3.5 h-3.5" />
                  </button>

                  <FavoriteButton
                    item={{
                      ...seed,
                      id: seed.id,
                      title: `${seed.cropName} — ${seed.variety}`,
                      domain: 'seeds',
                      domainLabel: 'Seeds',
                      icon: '🌱',
                      price: seed.price,
                      unit: seed.packSize,
                      targetWorld: 'seeds',
                    }}
                    size="sm"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      )}
    </section>
  );
};
