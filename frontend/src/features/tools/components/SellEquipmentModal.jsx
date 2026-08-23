import React, { useState } from 'react';
import { useTools } from '../../../context/ToolsContext';
import { toolsService } from '../services/toolsService';
import { X, PlusCircle, CheckCircle2, Upload, Tractor } from 'lucide-react';

export const SellEquipmentModal = () => {
  const { isSellModalOpen, setIsSellModalOpen, refreshTools } = useTools();

  const [formData, setFormData] = useState({
    title: '',
    brand: 'Mahindra',
    category: 'tractors',
    listingType: 'both', // 'sale' | 'rent' | 'both'
    buyPrice: '',
    rentPrice: '',
    hp: '',
    year: '2025',
    location: 'Tirupati, AP',
    contact: '',
  });

  const [submittedResult, setSubmittedResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  if (!isSellModalOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);
    try {
      const res = await toolsService.listEquipment(formData);
      setLoading(false);
      setSubmittedResult(res);
      if (refreshTools) refreshTools();
    } catch (err) {
      setLoading(false);
      setErrorMessage(err.message || 'Failed to list equipment on backend. Please check fields.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-forest-950/85 backdrop-blur-xl"
        onClick={() => setIsSellModalOpen(false)}
      />

      <div className="relative w-full max-w-xl p-6 sm:p-8 rounded-3xl bg-forest-950/95 border border-amber-500/40 shadow-2xl z-10 text-cream-100 animate-in zoom-in-95 max-h-[90vh] overflow-y-auto">
        <button
          onClick={() => setIsSellModalOpen(false)}
          className="absolute right-5 top-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-stone-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {submittedResult ? (
          <div className="text-center py-6">
            <div className="w-14 h-14 mx-auto rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400 mb-4 shadow-xl">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold font-display text-white mb-1">
              Equipment Listing Published!
            </h3>
            <p className="text-xs text-emerald-300 font-mono mb-4">
              Listing ID: {submittedResult.listingId} (Saved in MySQL)
            </p>
            <p className="text-xs text-cream-200/80 font-body mb-6">
              Your equipment has been saved directly to AgriNexus database and is now live across Andhra Pradesh!
            </p>
            <button
              onClick={() => {
                setSubmittedResult(null);
                setIsSellModalOpen(false);
              }}
              className="px-6 py-2.5 rounded-full bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold font-display text-xs cursor-pointer"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="text-xs font-mono uppercase text-amber-400 mb-1 flex items-center gap-1.5">
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Tool Owner Equipment Listing</span>
            </div>
            <h2 className="text-2xl font-black font-display text-white tracking-tight mb-1">
              List Your Machinery
            </h2>
            <p className="text-xs text-cream-200/70 font-body mb-6">
              Earn rental income or sell pre-owned agricultural equipment to verified farmers in your district.
            </p>

            <div className="space-y-4 font-mono text-xs mb-6">
              <div>
                <label className="text-cream-200/70 block mb-1">MACHINE NAME & MODEL</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Swaraj 744 FE (48 HP)"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-forest-900 border border-white/10 text-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-cream-200/70 block mb-1">CATEGORY</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-forest-900 border border-white/10 text-white focus:outline-none"
                  >
                    <option value="tractors">Tractors</option>
                    <option value="harvesting">Harvesting</option>
                    <option value="sowing">Sowing & Planting</option>
                    <option value="soil_prep">Soil Preparation</option>
                    <option value="irrigation">Irrigation</option>
                    <option value="protection">Crop Protection</option>
                    <option value="transport">Farm Transport</option>
                  </select>
                </div>
                <div>
                  <label className="text-cream-200/70 block mb-1">LISTING PURPOSE</label>
                  <select
                    value={formData.listingType}
                    onChange={(e) => setFormData({ ...formData, listingType: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-forest-900 border border-white/10 text-white focus:outline-none"
                  >
                    <option value="both">Both (Sale & Rent)</option>
                    <option value="rent">Rent Only</option>
                    <option value="sale">Sale Only</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-cream-200/70 block mb-1">SALE PRICE (₹)</label>
                  <input
                    type="number"
                    placeholder="e.g. 550000"
                    value={formData.buyPrice}
                    onChange={(e) => setFormData({ ...formData, buyPrice: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-forest-900 border border-white/10 text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-cream-200/70 block mb-1">RENTAL RATE (₹/day)</label>
                  <input
                    type="number"
                    placeholder="e.g. 1800"
                    value={formData.rentPrice}
                    onChange={(e) => setFormData({ ...formData, rentPrice: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-forest-900 border border-white/10 text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-cream-200/70 block mb-1">LOCATION DISTRICT</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-forest-900 border border-white/10 text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-cream-200/70 block mb-1">PHONE NUMBER</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98480 XXXXX"
                    value={formData.contact}
                    onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-forest-900 border border-white/10 text-white focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold font-display text-xs transition-all shadow-lg cursor-pointer"
            >
              {loading ? 'Submitting...' : 'Submit Equipment Listing →'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
