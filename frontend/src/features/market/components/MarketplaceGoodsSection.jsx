import React from 'react';
import { useMarket } from '../../../context/MarketContext';
import { useCart } from '../../../context/CartContext';
import {
  ShoppingBag,
  PlusCircle,
  Star,
  Search,
  CheckCircle2,
  Sparkles,
  MapPin,
  Eye,
} from 'lucide-react';
import { FavoriteButton } from '../../../components/favorites/FavoriteButton';

export const MarketplaceGoodsSection = () => {
  const {
    filteredGoods,
    selectedGoodsCategory,
    setSelectedGoodsCategory,
    goodsCategories,
    setIsListProductModalOpen,
    searchQuery,
    setSearchQuery,
  } = useMarket();

  const { addToCart } = useCart();

  return (
    <section id="marketplace-goods" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-12">
      {/* Header & 'List Product' Button */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Direct Commercial Trading</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black font-display text-white tracking-tight">
            Buy & Sell Agricultural Goods
          </h2>
          <p className="text-xs sm:text-sm text-cream-200/60 font-mono mt-1">
            Connect directly with verified farmers, mills, and agro-distributors across Andhra Pradesh
          </p>
        </div>

        {/* Sell Your Agricultural Goods Button */}
        <button
          onClick={() => setIsListProductModalOpen(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold font-display text-xs shadow-xl transition-all hover:scale-105 cursor-pointer self-start md:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>+ List Your Product</span>
        </button>
      </div>

      {/* Category Pills & Search */}
      <div className="p-4 rounded-3xl bg-forest-950/90 border border-white/10 backdrop-blur-2xl shadow-2xl mb-8 space-y-4">
        {/* Category Horizontal Scroll */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1">
          {goodsCategories.map((cat) => {
            const isSelected = selectedGoodsCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedGoodsCategory(cat.id)}
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

        {/* Search Bar */}
        <div className="pt-2 border-t border-white/10">
          <div className="relative w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-cream-200/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search agricultural goods, seeds, produce, supplies..."
              className="w-full pl-9 pr-4 py-2 rounded-full bg-forest-900/80 border border-white/10 focus:border-emerald-400 text-xs text-white placeholder:text-cream-200/40 focus:outline-none focus:ring-1 focus:ring-emerald-400 font-body"
            />
          </div>
        </div>
      </div>

      {/* Goods Cards Grid */}
      {filteredGoods.length === 0 ? (
        <div className="py-24 text-center max-w-md mx-auto space-y-3">
          <p className="text-base font-bold font-display text-white">
            No products match your current filters.
          </p>
          <p className="text-xs text-cream-200/60 font-body">
            Try changing your category or search query.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredGoods.map((item) => (
            <div
              key={item.id}
              className="group relative p-5 rounded-3xl bg-forest-950/90 border border-white/10 hover:border-emerald-400/50 backdrop-blur-xl shadow-xl hover:shadow-2xl hover:shadow-emerald-950/50 transition-all duration-300 flex flex-col justify-between cursor-pointer hover:-translate-y-1"
            >
            <div>
              {/* Header Badge & Rating */}
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono border border-emerald-400/30 uppercase font-bold">
                  {item.tag || item.categoryName}
                </span>
                <div className="flex items-center gap-1 text-amber-300 text-xs font-bold font-mono">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span>{item.rating}</span>
                  <span className="text-cream-200/40 text-[10px]">({item.reviews})</span>
                </div>
              </div>

              {/* Title & Seller */}
              <div className="flex items-start gap-3 mb-2">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-400/20 flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <div>
                  <span className="text-[10px] font-mono text-emerald-400/80 block uppercase">
                    {item.seller}
                  </span>
                  <h3 className="text-sm font-bold font-display text-white group-hover:text-emerald-300 transition-colors line-clamp-2">
                    {item.name}
                  </h3>
                </div>
              </div>

              {/* Quantity & Location */}
              <div className="p-3 rounded-2xl bg-forest-900/60 border border-white/5 space-y-1 my-3 text-[11px] font-mono text-cream-200/80">
                <div className="flex justify-between">
                  <span className="text-cream-200/50">Available:</span>
                  <span className="text-white font-bold">{item.quantity}</span>
                </div>
                <div className="flex justify-between items-center text-[10px]">
                  <span className="text-cream-200/50">Location:</span>
                  <span className="text-cream-200/90 truncate max-w-[130px] flex items-center gap-0.5">
                    <MapPin className="w-3 h-3 text-amber-400 flex-shrink-0" />
                    {item.location}
                  </span>
                </div>
              </div>
            </div>

            {/* Price & Action */}
            <div className="pt-3 border-t border-white/10 space-y-3">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-lg font-black font-display text-white">
                    ₹{item.price.toLocaleString()}
                  </span>
                  <span className="text-[10px] font-mono text-cream-200/60 ml-1">
                    ({item.pricePerUnit})
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => addToCart(item, 1, 'market_goods')}
                  className="flex-1 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold text-xs font-display flex items-center justify-center gap-1.5 shadow-md cursor-pointer transition-all"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Add to Cart</span>
                </button>

                <FavoriteButton
                  item={{
                    ...item,
                    id: item.id,
                    title: item.name,
                    domain: 'marketplace',
                    domainLabel: 'Products',
                    icon: item.icon || '🛒',
                    price: item.price,
                    unit: item.pricePerUnit,
                    targetWorld: 'market',
                  }}
                  size="md"
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
