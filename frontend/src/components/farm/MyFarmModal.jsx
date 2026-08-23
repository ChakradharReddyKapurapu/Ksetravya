import React, { useState, useEffect } from 'react';
import { useFarmContext, SOIL_TYPES, IRRIGATION_TYPES, CROPS_LIST, DISTRICTS_AP } from '../../context/FarmContext';
import { X, Sprout, MapPin, CheckCircle2, RotateCcw, Sparkles, Layers, Droplets, Info } from 'lucide-react';

export const MyFarmModal = () => {
  const { farm, updateFarmContext, resetToDefaultFarm, isMyFarmModalOpen, closeMyFarmModal } =
    useFarmContext();

  const [formData, setFormData] = useState(farm);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    setFormData(farm);
  }, [farm]);

  if (!isMyFarmModalOpen) return null;

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    updateFarmContext(formData);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      closeMyFarmModal();
    }, 900);
  };

  const handleReset = () => {
    resetToDefaultFarm();
    closeMyFarmModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={closeMyFarmModal}
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity animate-in fade-in"
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-xl bg-forest-950/95 border border-emerald-500/40 text-cream-100 rounded-3xl shadow-2xl backdrop-blur-2xl p-6 sm:p-8 overflow-hidden z-10 animate-in zoom-in-95 max-h-[90vh] overflow-y-auto scrollbar-none">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300">
              <Sprout className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold font-display text-white">My Farm Context</h3>
                <span className="px-2 py-0.2 rounded-full bg-emerald-500/20 text-emerald-300 text-[9px] font-mono border border-emerald-400/30">
                  ONE ECOSYSTEM
                </span>
              </div>
              <span className="text-[10px] text-cream-200/60 font-mono">
                Connects Weather, Mandi Prices, Seeds, Machinery & Analytics
              </span>
            </div>
          </div>

          <button
            onClick={closeMyFarmModal}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-cream-200/70 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSave} className="py-5 space-y-4 text-xs font-mono">
          {/* Farm Name & Farmer */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-cream-200/70 mb-1">Farm Name</label>
              <input
                type="text"
                value={formData.farmName}
                onChange={(e) => handleChange('farmName', e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-forest-900/80 border border-white/10 text-white focus:border-emerald-400 focus:outline-none"
                placeholder="e.g. Sri Rama Organic Farm"
                required
              />
            </div>
            <div>
              <label className="block text-cream-200/70 mb-1">Cultivator / Owner Name</label>
              <input
                type="text"
                value={formData.farmerName}
                onChange={(e) => handleChange('farmerName', e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-forest-900/80 border border-white/10 text-white focus:border-emerald-400 focus:outline-none"
                placeholder="e.g. Venkat Rao"
                required
              />
            </div>
          </div>

          {/* Location & District */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-cream-200/70 mb-1">State & District</label>
              <select
                value={formData.district}
                onChange={(e) => handleChange('district', e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-forest-900/80 border border-white/10 text-white focus:border-emerald-400 focus:outline-none cursor-pointer"
              >
                {DISTRICTS_AP.map((d) => (
                  <option key={d} value={d}>
                    {d}, Andhra Pradesh
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-cream-200/70 mb-1">Pincode / Mandal</label>
              <input
                type="text"
                value={formData.pincode}
                onChange={(e) => handleChange('pincode', e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-forest-900/80 border border-white/10 text-white focus:border-emerald-400 focus:outline-none"
                placeholder="522201"
              />
            </div>
          </div>

          {/* Land Area & Unit */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <label className="block text-cream-200/70 mb-1">Cultivated Land Area</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="0.5"
                  max="500"
                  step="0.5"
                  value={formData.landArea}
                  onChange={(e) => handleChange('landArea', Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-forest-900/80 border border-white/10 text-white focus:border-emerald-400 focus:outline-none"
                  required
                />
                <span className="px-3 py-2 rounded-xl bg-forest-900 border border-white/10 text-emerald-300 font-bold whitespace-nowrap">
                  {formData.areaUnit}
                </span>
              </div>
            </div>

            <div>
              <label className="block text-cream-200/70 mb-1">Season</label>
              <select
                value={formData.season}
                onChange={(e) => handleChange('season', e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-forest-900/80 border border-white/10 text-white focus:border-emerald-400 focus:outline-none cursor-pointer"
              >
                <option value="Kharif 2026">Kharif 2026</option>
                <option value="Rabi 2026-27">Rabi 2026-27</option>
                <option value="Zaid / Summer">Zaid / Summer</option>
                <option value="Year-Round">Year-Round</option>
              </select>
            </div>
          </div>

          {/* Current Crop */}
          <div>
            <label className="block text-cream-200/70 mb-1">Current Primary Crop</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {CROPS_LIST.map((crop) => {
                const isSelected = formData.currentCrop === crop.name;
                return (
                  <button
                    type="button"
                    key={crop.id}
                    onClick={() => {
                      handleChange('currentCrop', crop.name);
                      handleChange('cropId', crop.id);
                    }}
                    className={`p-2.5 rounded-xl border text-left flex items-center gap-2 transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-500/25 border-emerald-400 text-white font-bold shadow-md'
                        : 'bg-forest-900/60 hover:bg-forest-900 border-white/10 text-cream-200/70'
                    }`}
                  >
                    <span className="text-lg">{crop.icon}</span>
                    <span className="text-[11px] truncate">{crop.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Soil Type & Irrigation */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-cream-200/70 mb-1">Soil Type</label>
              <select
                value={formData.soilType}
                onChange={(e) => handleChange('soilType', e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-forest-900/80 border border-white/10 text-white focus:border-emerald-400 focus:outline-none cursor-pointer"
              >
                {SOIL_TYPES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-cream-200/70 mb-1">Irrigation Setup</label>
              <select
                value={formData.irrigationType}
                onChange={(e) => handleChange('irrigationType', e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-forest-900/80 border border-white/10 text-white focus:border-emerald-400 focus:outline-none cursor-pointer"
              >
                {IRRIGATION_TYPES.map((i) => (
                  <option key={i} value={i}>
                    {i}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Notice */}
          <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/20 text-emerald-200/80 text-[10px] flex items-start gap-2">
            <Info className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
            <span>
              <strong>Connected Ecosystem Notice:</strong> This profile establishes your farm's context for personalizing weather radars, profit calculations, mandi price benchmarks, and equipment matching.
            </span>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-3 border-t border-white/10">
            <button
              type="button"
              onClick={handleReset}
              className="text-[11px] text-cream-200/50 hover:text-cream-100 flex items-center gap-1 cursor-pointer transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset to Demo Defaults</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={closeMyFarmModal}
                className="px-4 py-2 rounded-xl bg-forest-900 hover:bg-forest-800 text-cream-200 text-xs font-display cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold font-display text-xs flex items-center gap-1.5 shadow-lg shadow-emerald-950/60 cursor-pointer transition-all"
              >
                {savedSuccess ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Saved!</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Apply Farm Context</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
