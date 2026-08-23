import React from 'react';
import { useCropProtection } from '../../../context/CropProtectionContext';
import { useCart } from '../../../context/CartContext';
import {
  Search,
  Star,
  ShoppingBag,
  ShieldCheck,
  Sparkles,
  Eye,
  AlertOctagon,
} from 'lucide-react';
import { FavoriteButton } from '../../../components/favorites/FavoriteButton';

export const CropProtectionGrid = () => {
  const {
    filteredProducts,
    activeCategory,
    setActiveCategory,
    allCategories,
    searchQuery,
    setSearchQuery,
    setSelectedProduct,
  } = useCropProtection();

  const { addToCart } = useCart();

  return (
    <section id="protection-catalog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-[10px] font-mono uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Targeted Crop Care Solutions</span>
          </div>
          <h2 className="text-3xl font-black font-display text-white tracking-tight">
            Crop-Care & Protection Products
          </h2>
          <p className="text-xs text-cream-200/60 font-mono mt-1">
            Always follow the product label and local agricultural guidance. READ PRODUCT LABEL BEFORE USE (Demo Data)
          </p>
        </div>
      </div>

      {/* Control Bar: Categories & Search */}
      <div className="p-4 rounded-3xl bg-forest-950/90 border border-white/10 backdrop-blur-2xl shadow-2xl mb-8 space-y-4">
        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1">
          {allCategories.map((cat) => {
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-display font-semibold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-teal-500 text-stone-950 font-bold shadow-md'
                    : 'bg-white/5 hover:bg-white/10 text-cream-200/70 hover:text-white'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Search Bar */}
        <div className="pt-2 border-t border-white/10">
          <div className="relative w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-cream-200/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search 'coragen', 'neem', 'fungicide', 'sprayer', 'stem borer'..."
              className="w-full pl-9 pr-4 py-2 rounded-full bg-forest-900/80 border border-white/10 focus:border-teal-400 text-xs text-white placeholder:text-cream-200/40 focus:outline-none focus:ring-1 focus:ring-teal-400 font-body"
            />
          </div>
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="py-24 text-center max-w-md mx-auto space-y-3">
          <p className="text-base font-bold font-display text-white">
            No crop protection products match your current filters.
          </p>
          <p className="text-xs text-cream-200/60 font-body">
            Try changing your category or search term.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => setSelectedProduct(product)}
              className="group relative p-5 rounded-3xl bg-forest-950/90 border border-white/10 hover:border-teal-400/50 backdrop-blur-xl shadow-xl hover:shadow-2xl hover:shadow-teal-950/50 transition-all duration-300 flex flex-col justify-between cursor-pointer hover:-translate-y-1"
            >
            <div>
              {/* Tag & Rating */}
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-300 text-[10px] font-mono border border-teal-400/30 uppercase font-bold">
                  {product.tag || product.categoryName}
                </span>
                <div className="flex items-center gap-1 text-amber-300 text-xs font-bold font-mono">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span>{product.rating}</span>
                  <span className="text-cream-200/40 text-[10px]">({product.reviews})</span>
                </div>
              </div>

              {/* Title & Brand */}
              <div className="flex items-start gap-3 mb-2">
                <div className="w-10 h-10 rounded-2xl bg-teal-500/10 border border-teal-400/20 flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-110 transition-transform">
                  {product.icon}
                </div>
                <div>
                  <span className="text-[10px] font-mono text-teal-400/80 block uppercase">
                    {product.brand}
                  </span>
                  <h3 className="text-sm font-bold font-display text-white group-hover:text-teal-300 transition-colors line-clamp-1">
                    {product.name}
                  </h3>
                </div>
              </div>

              {/* Technical Specifications */}
              <div className="p-3 rounded-2xl bg-forest-900/60 border border-white/5 space-y-1.5 my-3 text-[11px] font-mono text-cream-200/80">
                <div className="flex justify-between">
                  <span className="text-cream-200/50">Target:</span>
                  <span className="text-teal-300 font-bold truncate max-w-[140px]" title={product.targetPest}>
                    {product.targetPest.split(',')[0]}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-cream-200/50">Formulation:</span>
                  <span className="text-white truncate max-w-[140px]">{product.formulation.split('(')[0]}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-cream-200/50">Pack Size:</span>
                  <span className="text-white">{product.packSize}</span>
                </div>
              </div>
            </div>

            {/* Price & Actions */}
            <div className="pt-3 border-t border-white/10 space-y-3">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-lg font-black font-display text-white">
                    ₹{product.price.toLocaleString()}
                  </span>
                  <span className="text-[10px] font-mono text-cream-200/60 ml-1">
                    / {product.packSize.split(' ')[0]}
                  </span>
                </div>
                <span className="text-[9px] font-mono text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded-full">
                  Verified Dealer
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedProduct(product);
                  }}
                  className="flex-1 py-2 rounded-xl bg-forest-900 hover:bg-forest-800 border border-white/10 text-xs font-display font-semibold text-cream-100 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5 text-teal-400" />
                  <span>View Details</span>
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(product, 1, 'crop_protection');
                  }}
                  className="py-2 px-3.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-stone-950 font-bold text-xs font-display flex items-center justify-center gap-1 shadow-md cursor-pointer"
                  title="Add to Cart"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Add</span>
                </button>

                <FavoriteButton
                  item={{
                    ...product,
                    id: product.id,
                    title: product.name,
                    domain: 'crop_protection',
                    domainLabel: 'Crop Care',
                    icon: '🛡️',
                    price: product.price,
                    unit: product.packSize,
                    targetWorld: 'crop_protection',
                  }}
                  size="sm"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      )}
    </section>
  );
};
