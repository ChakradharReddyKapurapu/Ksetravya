import React from 'react';
import { useJobs } from '../../../context/JobsContext';
import {
  MapPin,
  Calendar,
  Users,
  Clock,
  CheckCircle2,
  ShieldCheck,
  Utensils,
  Home,
  Truck,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { FavoriteButton } from '../../../components/favorites/FavoriteButton';

export const JobCardsGrid = () => {
  const { filteredJobs, setSelectedJob, setIsApplyModalOpen } = useJobs();

  return (
    <section id="jobs-board" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-10">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono uppercase font-bold mb-1">
            <Sparkles className="w-3 h-3" />
            <span>Active Openings Board</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black font-display text-white">
            Available Agricultural Jobs ({filteredJobs.length})
          </h2>
        </div>
        <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-400/20">
          DEMO JOB OPPORTUNITIES
        </span>
      </div>

      {filteredJobs.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-forest-950/80 border border-white/10 max-w-md mx-auto space-y-2">
          <p className="text-base font-bold font-display text-white">No agricultural work opportunities match your search.</p>
          <span className="text-xs text-cream-200/60 font-body block">
            Try changing your category, district, or search keywords.
          </span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className="group p-6 rounded-3xl bg-forest-950/90 border border-white/10 hover:border-emerald-400/40 backdrop-blur-xl shadow-xl hover:shadow-2xl hover:shadow-emerald-950/40 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Header: Badges & Status */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono border border-emerald-400/30 uppercase font-bold">
                      {job.categoryName}
                    </span>
                    <span className="text-xs">{job.cropIcon}</span>
                    <span className="text-[10px] font-mono text-cream-200/60">
                      {job.cropName}
                    </span>
                  </div>

                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500 text-stone-950 text-[10px] font-mono font-black tracking-wider flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-stone-950 animate-ping" />
                    OPEN
                  </span>
                </div>

                {/* Job Title */}
                <h3
                  onClick={() => setSelectedJob(job)}
                  className="text-base sm:text-lg font-bold font-display text-white group-hover:text-emerald-300 transition-colors cursor-pointer mb-2"
                >
                  {job.title}
                </h3>

                {/* Farmer / Guild Info */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-base">{job.farmerAvatar}</span>
                  <span className="text-xs font-mono text-cream-200/80">{job.farmerName}</span>
                  {job.verifiedFarmer && (
                    <span className="inline-flex items-center gap-0.5 text-[9px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded-full border border-emerald-500/20">
                      <ShieldCheck className="w-3 h-3" />
                      <span>Verified Farm</span>
                    </span>
                  )}
                </div>

                {/* Salary & Specs Strip */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-3 rounded-2xl bg-forest-900/80 border border-white/5 text-xs font-mono mb-4">
                  <div>
                    <span className="text-[9px] text-cream-200/50 block">Wage / Pay</span>
                    <span className="text-emerald-300 font-bold text-sm">
                      ₹{job.salary}
                      <span className="text-[10px] text-cream-200/50 font-normal"> /day</span>
                    </span>
                  </div>
                  <div>
                    <span className="text-[9px] text-cream-200/50 block">Headcount</span>
                    <span className="text-white font-bold flex items-center gap-1">
                      <Users className="w-3 h-3 text-amber-400" />
                      {job.workersRequired} Workers
                    </span>
                  </div>
                  <div>
                    <span className="text-[9px] text-cream-200/50 block">Duration</span>
                    <span className="text-white font-bold flex items-center gap-1">
                      <Clock className="w-3 h-3 text-sky-400" />
                      {job.duration}
                    </span>
                  </div>
                  <div>
                    <span className="text-[9px] text-cream-200/50 block">Start Date</span>
                    <span className="text-white font-bold flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-rose-400" />
                      {job.startDate.split(' ')[0]} {job.startDate.split(' ')[1]}
                    </span>
                  </div>
                </div>

                {/* Location & Distance */}
                <div className="flex items-center justify-between text-xs font-mono text-cream-200/70 mb-4">
                  <div className="flex items-center gap-1 truncate max-w-[240px]">
                    <MapPin className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                    <span className="truncate">{job.location}</span>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full flex-shrink-0">
                    {job.distanceKm} km away
                  </span>
                </div>

                {/* Perks Badges (Food, Accommodation, Transport) */}
                <div className="flex flex-wrap items-center gap-1.5 mb-4">
                  {job.foodProvided && (
                    <span className="px-2 py-0.5 rounded-lg bg-white/5 border border-white/10 text-[10px] font-mono text-amber-300 flex items-center gap-1">
                      <Utensils className="w-3 h-3" />
                      <span>Food Provided</span>
                    </span>
                  )}
                  {job.accommodationProvided && (
                    <span className="px-2 py-0.5 rounded-lg bg-white/5 border border-white/10 text-[10px] font-mono text-sky-300 flex items-center gap-1">
                      <Home className="w-3 h-3" />
                      <span>Stay Available</span>
                    </span>
                  )}
                  {job.transportProvided && (
                    <span className="px-2 py-0.5 rounded-lg bg-white/5 border border-white/10 text-[10px] font-mono text-teal-300 flex items-center gap-1">
                      <Truck className="w-3 h-3" />
                      <span>Transport Pick</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Footer Actions */}
              <div className="pt-3 border-t border-white/10 flex items-center gap-2">
                <button
                  onClick={() => setSelectedJob(job)}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-forest-900 hover:bg-forest-800 border border-white/10 text-cream-100 font-display font-semibold text-xs transition-colors cursor-pointer text-center"
                >
                  View Details
                </button>

                <button
                  onClick={() => {
                    setSelectedJob(job);
                    setIsApplyModalOpen(true);
                  }}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold font-display text-xs shadow-md transition-all hover:scale-105 cursor-pointer text-center flex items-center justify-center gap-1"
                >
                  <span>Apply Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <FavoriteButton
                  item={{
                    ...job,
                    id: job.id,
                    title: job.title,
                    domain: 'jobs',
                    domainLabel: 'Jobs',
                    icon: '💼',
                    price: job.salary,
                    unit: 'Day',
                    summary: `${job.farmerName} • ${job.location}`,
                    targetWorld: 'jobs',
                  }}
                  size="md"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
