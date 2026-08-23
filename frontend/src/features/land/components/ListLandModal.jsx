import React, { useState } from 'react';
import { useLand } from '../../../context/LandContext';
import { X, CheckCircle2, PlusCircle, Map, Info, ShieldCheck } from 'lucide-react';

export const ListLandModal = () => {
  const { isListLandModalOpen, setIsListLandModalOpen, postNewLandListing, allSoilTypes, allWaterSources } = useLand();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    ownerName: '',
    acreage: '10',
    surveyNumber: 'Sy.No 164/2',
    district: 'Guntur',
    location: 'Tenali, Guntur District, Andhra Pradesh',
    soilType: 'black_soil',
    soilTypeName: 'Deep Black Cotton Soil',
    waterSource: 'canal',
    waterSourceName: 'Canal Sluice + Borewell',
    annualRentPerAcre: '28000',
    leaseTenure: '3 Years Commercial',
    electricity: '3-Phase 10HP Connected',
    roadAccess: '30ft Paved Agricultural Road',
    description: '',
  });

  if (!isListLandModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    postNewLandListing(formData);
    setIsSubmitted(true);
  };

  const handleClose = () => {
    setIsListLandModalOpen(false);
    setIsSubmitted(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div onClick={handleClose} className="fixed inset-0 bg-black/80 backdrop-blur-xl transition-opacity" />

      <div className="relative w-full max-w-2xl bg-forest-950/95 border border-amber-400/40 text-cream-100 rounded-3xl shadow-2xl p-6 sm:p-8 overflow-hidden z-10 animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-300">
              <PlusCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold font-display text-white">List Farmland for Lease</h3>
              <span className="text-[10px] font-mono text-amber-400">
                Connect directly with verified cultivators & agricultural enterprises
              </span>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-stone-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {isSubmitted ? (
          <div className="text-center py-8 px-4 space-y-4 animate-in fade-in">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-bold font-display text-white">Farmland Parcel Listed!</h4>
            <p className="text-xs text-cream-200/70 font-body max-w-md mx-auto">
              Your parcel for <strong>{formData.title || 'Farmland'}</strong> ({formData.acreage} Acres) has been published on the AGRI NEXUS Land Registry.
            </p>
            <button
              onClick={handleClose}
              className="mt-4 px-6 py-2.5 rounded-full bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs cursor-pointer shadow-lg"
            >
              Back to Land Registry
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="py-4 space-y-3.5 text-xs font-mono">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-cream-200/70 block mb-1">Listing Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 10 Acres Black Soil Land with Canal Sluice"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-forest-900 border border-white/10 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="text-cream-200/70 block mb-1">Landowner / Trust Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sri Rama Agro Holdings"
                  value={formData.ownerName}
                  onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-forest-900 border border-white/10 text-white focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-cream-200/70 block mb-1">Total Acreage (Acres) *</label>
                <input
                  type="number"
                  required
                  value={formData.acreage}
                  onChange={(e) => setFormData({ ...formData, acreage: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-forest-900 border border-white/10 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="text-cream-200/70 block mb-1">Soil Type *</label>
                <select
                  value={formData.soilType}
                  onChange={(e) => setFormData({ ...formData, soilType: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-forest-900 border border-white/10 text-white focus:outline-none focus:border-amber-400 cursor-pointer"
                >
                  {allSoilTypes.filter((s) => s.id !== 'all').map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-cream-200/70 block mb-1">Water Source *</label>
                <select
                  value={formData.waterSource}
                  onChange={(e) => setFormData({ ...formData, waterSource: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-forest-900 border border-white/10 text-white focus:outline-none focus:border-amber-400 cursor-pointer"
                >
                  {allWaterSources.filter((w) => w.id !== 'all').map((w) => (
                    <option key={w.id} value={w.id}>
                      {w.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-cream-200/70 block mb-1">Expected Rent (₹/Acre/Yr) *</label>
                <input
                  type="number"
                  required
                  value={formData.annualRentPerAcre}
                  onChange={(e) => setFormData({ ...formData, annualRentPerAcre: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-forest-900 border border-white/10 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="text-cream-200/70 block mb-1">Survey Number *</label>
                <input
                  type="text"
                  required
                  value={formData.surveyNumber}
                  onChange={(e) => setFormData({ ...formData, surveyNumber: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-forest-900 border border-white/10 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="text-cream-200/70 block mb-1">Lease Tenure *</label>
                <input
                  type="text"
                  required
                  value={formData.leaseTenure}
                  onChange={(e) => setFormData({ ...formData, leaseTenure: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-forest-900 border border-white/10 text-white focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-cream-200/70 block mb-1">Location (District & Mandal) *</label>
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-forest-900 border border-white/10 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="text-cream-200/70 block mb-1">Electricity & Power Lines</label>
                <input
                  type="text"
                  value={formData.electricity}
                  onChange={(e) => setFormData({ ...formData, electricity: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-forest-900 border border-white/10 text-white focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div>
              <label className="text-cream-200/70 block mb-1">Property Description & Irrigation Details</label>
              <textarea
                rows="2"
                placeholder="High fertility black soil, canal sluice active for dual cropping, clear title deeds..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-forest-900 border border-white/10 text-white focus:outline-none focus:border-amber-400 text-xs"
              />
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
                className="py-2.5 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold font-display cursor-pointer shadow-lg"
              >
                Publish Land Listing
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
