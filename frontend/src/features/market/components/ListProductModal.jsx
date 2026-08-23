import React, { useState } from 'react';
import { useMarket } from '../../../context/MarketContext';
import { X, CheckCircle2, PlusCircle, Store, Info, Upload } from 'lucide-react';

export const ListProductModal = () => {
  const { isListProductModalOpen, setIsListProductModalOpen, goodsCategories, listProduct } = useMarket();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: 'grains',
    price: '',
    unit: 'kg',
    quantity: '',
    location: 'Guntur, Andhra Pradesh',
    seller: '',
    phone: '',
    description: '',
  });

  if (!isListProductModalOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await listProduct(formData);
    } catch (err) {
      console.error('List product error', err);
    } finally {
      setLoading(false);
      setIsSubmitted(true);
    }
  };

  const handleClose = () => {
    setIsListProductModalOpen(false);
    setIsSubmitted(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div onClick={handleClose} className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity" />

      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative w-full max-w-xl bg-forest-950/95 border border-amber-400/40 text-cream-100 rounded-3xl shadow-2xl backdrop-blur-2xl p-6 sm:p-8 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-300 text-xl">
                <Store className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold font-display text-white">
                  Sell Your Agricultural Goods
                </h3>
                <span className="text-[10px] font-mono text-amber-400">
                  List produce or equipment on AGRI NEXUS Mandi
                </span>
              </div>
            </div>

            <button
              onClick={handleClose}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-cream-200/70 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          {isSubmitted ? (
            <div className="text-center py-10 px-4 space-y-4 animate-in fade-in">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold font-display text-white">Listing Submitted!</h4>
              <p className="text-xs text-cream-200/70 font-body max-w-md mx-auto">
                Your produce listing for <strong>{formData.name || 'Produce'}</strong> has been registered on the AGRI NEXUS trading board. (Demo Submission)
              </p>
              <button
                onClick={handleClose}
                className="mt-4 px-6 py-2.5 rounded-full bg-emerald-500 text-stone-950 font-bold text-xs cursor-pointer"
              >
                Back to Marketplace
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="py-5 space-y-4 text-xs font-mono">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-cream-200/70 block mb-1">Product Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sona Masoori Rice (50kg Bag)"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-forest-900 border border-white/10 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="text-cream-200/70 block mb-1">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-forest-900 border border-white/10 text-white focus:outline-none focus:border-amber-400 cursor-pointer"
                  >
                    {goodsCategories.filter((c) => c.id !== 'all').map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-cream-200/70 block mb-1">Price (₹) *</label>
                  <input
                    type="number"
                    required
                    placeholder="2150"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-forest-900 border border-white/10 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="text-cream-200/70 block mb-1">Per Unit *</label>
                  <select
                    value={formData.unit}
                    onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-forest-900 border border-white/10 text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="kg">KG</option>
                    <option value="quintal">Quintal</option>
                    <option value="bag">50kg Bag</option>
                    <option value="crate">25kg Crate</option>
                    <option value="tonne">Tonne</option>
                  </select>
                </div>

                <div>
                  <label className="text-cream-200/70 block mb-1">Quantity Available *</label>
                  <input
                    type="text"
                    required
                    placeholder="100 Bags"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-forest-900 border border-white/10 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-cream-200/70 block mb-1">Seller / Farm Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Sri Rama Farmers Guild"
                    value={formData.seller}
                    onChange={(e) => setFormData({ ...formData, seller: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-forest-900 border border-white/10 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="text-cream-200/70 block mb-1">Location (District in AP) *</label>
                  <input
                    type="text"
                    required
                    placeholder="Guntur / Tenali"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-forest-900 border border-white/10 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="text-cream-200/70 block mb-1">Description & Quality Notes</label>
                <textarea
                  rows="2"
                  placeholder="Fresh morning harvest, moisture tested at 12%, double-stitched packaging..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-forest-900 border border-white/10 text-white focus:outline-none focus:border-amber-400 text-xs"
                />
              </div>

              {/* Informational Banner */}
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-400/20 text-[10px] text-amber-300 flex items-start gap-2">
                <Info className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <span>
                  Demo Listing Submission — will be connected to the Spring Boot REST backend API in the upcoming integration phase.
                </span>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={handleClose}
                  className="py-2 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-cream-200/80 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2.5 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold font-display cursor-pointer"
                >
                  Submit Listing
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
