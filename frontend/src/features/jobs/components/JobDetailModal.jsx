import React from 'react';
import { useJobs } from '../../../context/JobsContext';
import {
  X,
  MapPin,
  Calendar,
  Users,
  Clock,
  ShieldCheck,
  Utensils,
  Home,
  Truck,
  Wrench,
  CheckCircle2,
  Briefcase,
  Star,
} from 'lucide-react';

export const JobDetailModal = () => {
  const { selectedJob, setSelectedJob, setIsApplyModalOpen } = useJobs();

  if (!selectedJob) return null;

  const handleApply = () => {
    setIsApplyModalOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-xl transition-opacity animate-in fade-in duration-200"
        onClick={() => setSelectedJob(null)}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-2xl p-6 sm:p-8 rounded-3xl bg-forest-950/95 border border-emerald-400/40 shadow-2xl z-10 animate-in zoom-in-95 duration-200 text-cream-100 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={() => setSelectedJob(null)}
          className="absolute right-5 top-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-stone-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Badges Header */}
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-mono font-bold uppercase">
            {selectedJob.categoryName}
          </span>
          <span className="px-2.5 py-0.5 rounded-full bg-white/5 text-amber-400 text-xs font-mono">
            {selectedJob.cropIcon} {selectedJob.cropName}
          </span>
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-500 text-stone-950 text-[10px] font-mono font-black">
            STATUS: {selectedJob.status}
          </span>
        </div>

        {/* Title */}
        <h2 className="text-xl sm:text-2xl font-black font-display text-white tracking-tight mb-2">
          {selectedJob.title}
        </h2>

        {/* Farmer Info */}
        <div className="flex items-center justify-between p-3 rounded-2xl bg-forest-900/70 border border-white/5 mb-6">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl">{selectedJob.farmerAvatar}</span>
            <div>
              <h4 className="text-xs font-bold font-display text-white">{selectedJob.farmerName}</h4>
              <span className="text-[10px] font-mono text-cream-200/60 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-amber-400" />
                {selectedJob.location} ({selectedJob.distanceKm} km)
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1 text-amber-400 text-xs font-bold font-mono">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span>{selectedJob.rating}</span>
          </div>
        </div>

        {/* Core Wage & Schedule Matrix */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-forest-900/90 border border-white/10 text-xs font-mono mb-6">
          <div>
            <span className="text-[10px] text-cream-200/50 block">Wage / Pay</span>
            <span className="text-emerald-300 font-bold text-base">₹{selectedJob.salary}</span>
            <span className="text-[10px] text-cream-200/60 block">{selectedJob.salaryType}</span>
          </div>
          <div>
            <span className="text-[10px] text-cream-200/50 block">Required Workforce</span>
            <span className="text-white font-bold text-sm flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-amber-400" />
              {selectedJob.workersRequired} Workers
            </span>
          </div>
          <div>
            <span className="text-[10px] text-cream-200/50 block">Work Period</span>
            <span className="text-white font-bold text-sm flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-sky-400" />
              {selectedJob.duration}
            </span>
          </div>
          <div>
            <span className="text-[10px] text-cream-200/50 block">Dates</span>
            <span className="text-white font-bold text-[11px] block">
              {selectedJob.startDate} to {selectedJob.endDate}
            </span>
          </div>
        </div>

        {/* Task & Work Scope */}
        <div className="space-y-4 mb-6 text-xs font-body leading-relaxed text-cream-200/90">
          <div>
            <h4 className="text-xs font-bold font-mono uppercase text-amber-400 mb-1">
              Task Description & Farm Scope
            </h4>
            <p className="p-3 rounded-2xl bg-white/5 border border-white/5">
              {selectedJob.description}
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold font-mono uppercase text-emerald-400 mb-1.5">
              Required Skills & Experience
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {selectedJob.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-xl bg-emerald-500/10 border border-emerald-400/20 text-emerald-300 text-xs font-mono flex items-center gap-1"
                >
                  <CheckCircle2 className="w-3 h-3" />
                  <span>{skill}</span>
                </span>
              ))}
            </div>
            <span className="text-[11px] font-mono text-cream-200/60 block mt-2">
              Experience Requirement: {selectedJob.experienceRequired}
            </span>
          </div>

          {/* Perks & Site Supplies */}
          <div>
            <h4 className="text-xs font-bold font-mono uppercase text-sky-400 mb-2">
              On-Site Perks & Equipment Provided
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex items-center gap-2">
                <Utensils className="w-4 h-4 text-amber-400" />
                <span>Food: {selectedJob.foodProvided ? 'Wholesome Meals Provided' : 'Self Arranged'}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex items-center gap-2">
                <Home className="w-4 h-4 text-sky-400" />
                <span>Stay: {selectedJob.accommodationProvided ? 'Clean Farm Shelter Available' : 'Daily Commute'}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex items-center gap-2">
                <Truck className="w-4 h-4 text-teal-400" />
                <span>Transit: {selectedJob.transportProvided ? 'Village Pick-up & Drop' : 'Self Transport'}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex items-center gap-2">
                <Wrench className="w-4 h-4 text-rose-400" />
                <span>Tools: {selectedJob.toolsProvided}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
          <button
            onClick={() => setSelectedJob(null)}
            className="py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-cream-200/80 text-xs font-mono cursor-pointer"
          >
            Close
          </button>

          <button
            onClick={handleApply}
            className="py-3 px-8 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold font-display text-xs shadow-xl transition-all hover:scale-105 cursor-pointer"
          >
            Apply for Work →
          </button>
        </div>
      </div>
    </div>
  );
};
