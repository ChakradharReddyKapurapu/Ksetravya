import React from 'react';
import { useJobs } from '../../../context/JobsContext';
import {
  Star,
  ShieldCheck,
  MapPin,
  Briefcase,
  CheckCircle2,
  Phone,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

export const WorkerDiscoveryGrid = () => {
  const { filteredWorkers, setSelectedWorker, setSelectedJob } = useJobs();

  return (
    <section id="workers-discovery" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-12">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-mono uppercase font-bold mb-1">
            <Sparkles className="w-3 h-3" />
            <span>Skilled Labor & Machinery Crews</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black font-display text-white">
            Find Agricultural Workers & Crews ({filteredWorkers.length})
          </h2>
        </div>
        <span className="text-[10px] font-mono text-cream-200/50">
          Verified agricultural specialists ready for immediate booking
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredWorkers.map((worker) => (
          <div
            key={worker.id}
            className="group p-5 rounded-3xl bg-forest-950/90 border border-white/10 hover:border-amber-400/40 backdrop-blur-xl shadow-xl hover:shadow-2xl hover:shadow-amber-950/40 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              {/* Header: Avatar & Verified */}
              <div className="flex items-start justify-between mb-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                  {worker.avatar}
                </div>

                <div className="flex flex-col items-end">
                  <div className="flex items-center gap-1 text-amber-400 text-xs font-bold font-mono">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>{worker.rating}</span>
                    <span className="text-cream-200/50 text-[10px]">({worker.reviews})</span>
                  </div>
                  <span className="text-[9px] font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full mt-1">
                    {worker.availability}
                  </span>
                </div>
              </div>

              {/* Name & Role */}
              <h3 className="text-sm font-bold font-display text-white group-hover:text-amber-300 transition-colors mb-0.5">
                {worker.name}
              </h3>
              <span className="text-[11px] font-mono text-cream-200/60 block mb-3">
                {worker.role}
              </span>

              {/* Location & Experience Stats */}
              <div className="p-3 rounded-2xl bg-forest-900/80 border border-white/5 space-y-1.5 text-xs font-mono mb-3">
                <div className="flex justify-between items-center text-[10px]">
                  <span className="text-cream-200/50">Location:</span>
                  <span className="text-cream-200/90 flex items-center gap-0.5 truncate max-w-[130px]">
                    <MapPin className="w-3 h-3 text-amber-400 flex-shrink-0" />
                    {worker.location}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-cream-200/50">Experience:</span>
                  <span className="text-white font-bold">{worker.experience}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-cream-200/50">Completed:</span>
                  <span className="text-amber-300 font-bold">{worker.completedJobs} Jobs</span>
                </div>
              </div>

              {/* Skills Tags */}
              <div className="flex flex-wrap gap-1 mb-4">
                {worker.skills.slice(0, 3).map((skill, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded-lg bg-white/5 border border-white/5 text-[9px] font-mono text-emerald-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Price & Action */}
            <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2">
              <div>
                <span className="text-xs text-cream-200/50 font-mono block">Daily Rate</span>
                <span className="text-base font-black font-display text-white">
                  ₹{worker.dailyRate}
                  <span className="text-[10px] font-mono text-cream-200/60 font-normal"> /day</span>
                </span>
              </div>

              <button
                onClick={() =>
                  alert(`Direct booking connection initiated for ${worker.name} (${worker.phone}). Demo Connection.`)
                }
                className="py-2 px-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold font-display text-xs transition-all shadow-md cursor-pointer"
              >
                Hire Worker
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
