import React, { useState } from 'react';
import { useJobs } from '../../../context/JobsContext';
import { X, CheckCircle2, UserCheck, Phone, Briefcase, Calendar, DollarSign, Info } from 'lucide-react';

export const ApplyJobModal = () => {
  const { selectedJob, isApplyModalOpen, setIsApplyModalOpen, applyForJob } = useJobs();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    experience: '2 Years',
    skills: 'Manual Harvesting, Sickle Cutting',
    availableDate: 'Immediate',
    expectedSalary: '650',
    message: '',
  });

  if (!isApplyModalOpen || !selectedJob) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    applyForJob(selectedJob, formData);
    setIsSubmitted(true);
  };

  const handleClose = () => {
    setIsApplyModalOpen(false);
    setIsSubmitted(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div onClick={handleClose} className="fixed inset-0 bg-black/80 backdrop-blur-xl transition-opacity" />

      <div className="relative w-full max-w-lg bg-forest-950/95 border border-emerald-400/40 text-cream-100 rounded-3xl shadow-2xl p-6 sm:p-8 overflow-hidden z-10 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold font-display text-white">Apply for Agricultural Work</h3>
              <span className="text-[10px] font-mono text-emerald-400 truncate max-w-xs block">
                {selectedJob.title}
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
            <h4 className="text-xl font-bold font-display text-white">Application Submitted!</h4>
            <div className="p-3 rounded-2xl bg-forest-900/80 border border-white/10 text-xs font-mono text-cream-200/80 text-left space-y-1">
              <div className="flex justify-between">
                <span>Job:</span>
                <span className="text-white font-bold">{selectedJob.title.split(' ')[0]}</span>
              </div>
              <div className="flex justify-between">
                <span>Application Status:</span>
                <span className="text-emerald-300 font-bold bg-emerald-500/20 px-2 py-0.5 rounded-full">
                  APPLIED
                </span>
              </div>
              <div className="flex justify-between">
                <span>Farmer:</span>
                <span className="text-white">{selectedJob.farmerName}</span>
              </div>
            </div>
            <p className="text-xs text-cream-200/60 font-body">
              Your application has been delivered to the farm owner. You can track this in <strong>My Applications</strong>.
            </p>
            <button
              onClick={handleClose}
              className="mt-4 px-6 py-2.5 rounded-full bg-emerald-500 text-stone-950 font-bold text-xs cursor-pointer shadow-lg"
            >
              Back to Job Openings
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="py-4 space-y-3.5 text-xs font-mono">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-cream-200/70 block mb-1">Your Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Naidu"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-forest-900 border border-white/10 text-white focus:outline-none focus:border-emerald-400"
                />
              </div>

              <div>
                <label className="text-cream-200/70 block mb-1">Mobile Phone *</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98480 •••••"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-forest-900 border border-white/10 text-white focus:outline-none focus:border-emerald-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-cream-200/70 block mb-1">Experience *</label>
                <select
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-forest-900 border border-white/10 text-white focus:outline-none focus:border-emerald-400 cursor-pointer"
                >
                  <option value="1 Year">1 Year</option>
                  <option value="2-3 Years">2-3 Years</option>
                  <option value="5+ Years">5+ Years</option>
                  <option value="Guild Leader">Labor Team Leader</option>
                </select>
              </div>

              <div>
                <label className="text-cream-200/70 block mb-1">Available Date *</label>
                <input
                  type="text"
                  required
                  value={formData.availableDate}
                  onChange={(e) => setFormData({ ...formData, availableDate: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-forest-900 border border-white/10 text-white focus:outline-none focus:border-emerald-400"
                />
              </div>

              <div>
                <label className="text-cream-200/70 block mb-1">Expected Pay (₹/day)</label>
                <input
                  type="number"
                  value={formData.expectedSalary}
                  onChange={(e) => setFormData({ ...formData, expectedSalary: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-forest-900 border border-white/10 text-white focus:outline-none focus:border-emerald-400"
                />
              </div>
            </div>

            <div>
              <label className="text-cream-200/70 block mb-1">Key Skills & Equipment Experience</label>
              <input
                type="text"
                placeholder="e.g. Sickle Cutting, Tractor Rotavator, Mist Sprayer"
                value={formData.skills}
                onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-forest-900 border border-white/10 text-white focus:outline-none focus:border-emerald-400"
              />
            </div>

            <div>
              <label className="text-cream-200/70 block mb-1">Note to Farmer (Optional)</label>
              <textarea
                rows="2"
                placeholder="Available with 4 experienced co-workers from Tenali..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-forest-900 border border-white/10 text-white focus:outline-none focus:border-emerald-400 text-xs"
              />
            </div>

            <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-400/20 text-[10px] text-emerald-300 flex items-center gap-2">
              <Info className="w-3.5 h-3.5 flex-shrink-0" />
              <span>Demo Work Application — logs directly to your local application tracker.</span>
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
                className="py-2.5 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold font-display cursor-pointer shadow-lg"
              >
                Submit Application
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
