import React, { useState } from 'react';
import { useJobs } from '../../../context/JobsContext';
import { X, CheckCircle2, PlusCircle, Briefcase, Info } from 'lucide-react';

export const PostJobModal = () => {
  const { isPostJobModalOpen, setIsPostJobModalOpen, postNewJob, allCategories } = useJobs();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    farmerName: '',
    category: 'harvesting',
    crop: 'rice',
    cropName: 'Rice (Paddy)',
    location: 'Tenali, Guntur District, Andhra Pradesh',
    salary: '650',
    workersRequired: '10',
    duration: '8 Days',
    startDate: '01 June 2026',
    endDate: '08 June 2026',
    foodProvided: true,
    accommodationProvided: false,
    transportProvided: true,
    toolsProvided: 'Sickles & tarpaulins supplied',
    skills: 'Manual Harvesting, Bundling',
    description: '',
  });

  if (!isPostJobModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    postNewJob(formData);
    setIsSubmitted(true);
  };

  const handleClose = () => {
    setIsPostJobModalOpen(false);
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
              <h3 className="text-base font-bold font-display text-white">Post Agricultural Work Requisition</h3>
              <span className="text-[10px] font-mono text-amber-400">
                Hire farm labor, operators, and harvesting crews across Andhra Pradesh
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
            <h4 className="text-xl font-bold font-display text-white">Job Requisition Published!</h4>
            <p className="text-xs text-cream-200/70 font-body max-w-md mx-auto">
              Your opening for <strong>{formData.title || 'Agricultural Work'}</strong> ({formData.workersRequired} Workers) is now live on the AGRI NEXUS Jobs Board.
            </p>
            <button
              onClick={handleClose}
              className="mt-4 px-6 py-2.5 rounded-full bg-emerald-500 text-stone-950 font-bold text-xs cursor-pointer shadow-lg"
            >
              Back to Job Board
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="py-4 space-y-3.5 text-xs font-mono">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-cream-200/70 block mb-1">Job Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sona Masoori Rice Harvesting Crew"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-forest-900 border border-white/10 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="text-cream-200/70 block mb-1">Farmer / Farm Guild Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sri Rama Organic Farms"
                  value={formData.farmerName}
                  onChange={(e) => setFormData({ ...formData, farmerName: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-forest-900 border border-white/10 text-white focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-cream-200/70 block mb-1">Work Category *</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-forest-900 border border-white/10 text-white focus:outline-none focus:border-amber-400 cursor-pointer"
                >
                  {allCategories.filter((c) => c.id !== 'all').map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-cream-200/70 block mb-1">Crop Type *</label>
                <input
                  type="text"
                  required
                  value={formData.cropName}
                  onChange={(e) => setFormData({ ...formData, cropName: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-forest-900 border border-white/10 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="text-cream-200/70 block mb-1">Workers Required *</label>
                <input
                  type="number"
                  required
                  value={formData.workersRequired}
                  onChange={(e) => setFormData({ ...formData, workersRequired: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-forest-900 border border-white/10 text-white focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-cream-200/70 block mb-1">Daily Wage (₹/day) *</label>
                <input
                  type="number"
                  required
                  value={formData.salary}
                  onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-forest-900 border border-white/10 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="text-cream-200/70 block mb-1">Work Duration *</label>
                <input
                  type="text"
                  required
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-forest-900 border border-white/10 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="text-cream-200/70 block mb-1">Start Date *</label>
                <input
                  type="text"
                  required
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-forest-900 border border-white/10 text-white focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

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
              <label className="text-cream-200/70 block mb-1">Required Skills (Comma separated)</label>
              <input
                type="text"
                value={formData.skills}
                onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-forest-900 border border-white/10 text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="text-cream-200/70 block mb-1">Detailed Work Description</label>
              <textarea
                rows="2"
                placeholder="20 acres of paddy field, manual sickle harvesting and machine thresher feeding..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-forest-900 border border-white/10 text-white focus:outline-none focus:border-amber-400 text-xs"
              />
            </div>

            {/* Perks Checkboxes */}
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.foodProvided}
                  onChange={(e) => setFormData({ ...formData, foodProvided: e.target.checked })}
                  className="rounded text-amber-400"
                />
                <span>Food Provided</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.accommodationProvided}
                  onChange={(e) => setFormData({ ...formData, accommodationProvided: e.target.checked })}
                  className="rounded text-amber-400"
                />
                <span>Stay / Shelter</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.transportProvided}
                  onChange={(e) => setFormData({ ...formData, transportProvided: e.target.checked })}
                  className="rounded text-amber-400"
                />
                <span>Transport Pick-up</span>
              </label>
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
                Post Job Requisition
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
