import React from 'react';
import { useJobs } from '../../../context/JobsContext';
import { MapPin, Navigation, ArrowRight, ShieldCheck } from 'lucide-react';

export const WorkNearYouMapSection = () => {
  const { allJobs, setSelectedJob, setIsApplyModalOpen } = useJobs();

  const sortedByDistance = [...allJobs].sort((a, b) => a.distanceKm - b.distanceKm).slice(0, 4);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-12">
      <div className="p-6 sm:p-8 rounded-3xl bg-forest-950/90 border border-white/10 backdrop-blur-2xl shadow-2xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-sky-500/20 text-sky-300 text-[10px] font-mono uppercase font-bold mb-1">
              <Navigation className="w-3 h-3" />
              <span>Hyper-Local Radius Match</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
              Work Opportunities Near You
            </h3>
          </div>
          <span className="text-xs font-mono text-cream-200/50">
            Within 25km of your active farm / location
          </span>
        </div>

        {/* Proximity Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {sortedByDistance.map((job) => (
            <div
              key={job.id}
              onClick={() => setSelectedJob(job)}
              className="group p-4 rounded-2xl bg-forest-900/80 hover:bg-forest-900 border border-white/5 hover:border-sky-400/40 transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl">{job.cropIcon}</span>
                  <span className="px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 text-[10px] font-mono font-bold">
                    {job.distanceKm} km away
                  </span>
                </div>
                <h4 className="text-xs font-bold font-display text-white group-hover:text-sky-300 transition-colors line-clamp-2">
                  {job.title}
                </h4>
                <span className="text-[10px] font-mono text-cream-200/60 block mt-1">
                  {job.location.split('/')[0]}
                </span>
              </div>

              <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between">
                <span className="text-xs font-bold font-mono text-emerald-400">
                  ₹{job.salary}/day
                </span>
                <span className="text-[10px] font-mono text-sky-300 flex items-center gap-0.5">
                  <span>View</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
