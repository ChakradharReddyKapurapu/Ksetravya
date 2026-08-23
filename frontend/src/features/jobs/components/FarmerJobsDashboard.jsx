import React from 'react';
import { useJobs } from '../../../context/JobsContext';
import {
  X,
  Briefcase,
  Users,
  CheckCircle2,
  XCircle,
  Clock,
  Phone,
  Star,
  PlusCircle,
} from 'lucide-react';

export const FarmerJobsDashboard = () => {
  const {
    isFarmerDashboardModalOpen,
    setIsFarmerDashboardModalOpen,
    myPostedJobs,
    acceptApplicant,
    rejectApplicant,
    setIsPostJobModalOpen,
  } = useJobs();

  if (!isFarmerDashboardModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        onClick={() => setIsFarmerDashboardModalOpen(false)}
        className="fixed inset-0 bg-black/80 backdrop-blur-xl transition-opacity"
      />

      <div className="relative w-full max-w-3xl bg-forest-950/95 border border-amber-400/40 text-cream-100 rounded-3xl shadow-2xl p-6 sm:p-8 overflow-hidden z-10 animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-300">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold font-display text-white">
                Farmer's Job & Applicant Manager
              </h3>
              <span className="text-[10px] font-mono text-cream-200/60">
                Manage your posted farm jobs and accept/reject applicants
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setIsFarmerDashboardModalOpen(false);
                setIsPostJobModalOpen(true);
              }}
              className="px-3 py-1.5 rounded-full bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold font-display flex items-center gap-1 cursor-pointer"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>+ Post Job</span>
            </button>

            <button
              onClick={() => setIsFarmerDashboardModalOpen(false)}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-stone-400 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Posted Jobs & Applicants */}
        <div className="py-5 space-y-6">
          {myPostedJobs.map((job) => (
            <div
              key={job.id}
              className="p-5 rounded-3xl bg-forest-900/80 border border-white/10 space-y-4"
            >
              {/* Job Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/10">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-mono border border-amber-400/30 uppercase font-bold">
                      {job.crop}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-bold">
                      {job.status}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold font-display text-white mt-1">{job.title}</h4>
                  <span className="text-[11px] font-mono text-cream-200/60">
                    {job.location} • {job.salary} • Required: {job.workersRequired} Workers
                  </span>
                </div>

                <div className="text-right font-mono text-xs">
                  <span className="text-amber-400 font-bold block">
                    {job.applicants.length} Applicants
                  </span>
                  <span className="text-[10px] text-cream-200/50">Posted {job.postedDate}</span>
                </div>
              </div>

              {/* Applicants Management Interface */}
              <div className="space-y-2.5">
                <span className="text-[11px] font-mono text-emerald-400 font-bold uppercase block">
                  Received Applications:
                </span>

                {job.applicants.length === 0 ? (
                  <p className="text-xs text-cream-200/50 font-body py-2">
                    No workers have applied yet for this posting.
                  </p>
                ) : (
                  job.applicants.map((applicant) => (
                    <div
                      key={applicant.id}
                      className="p-3 rounded-2xl bg-forest-950/80 border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <h5 className="font-bold text-white font-display text-sm">
                            {applicant.name}
                          </h5>
                          <span className="text-amber-300 text-xs flex items-center gap-0.5">
                            <Star className="w-3 h-3 fill-current" />
                            {applicant.rating}
                          </span>
                        </div>
                        <span className="text-[11px] text-cream-200/70 block mt-0.5">
                          Experience: {applicant.experience} • Skills: {applicant.skills}
                        </span>
                        {applicant.status === 'ACCEPTED' && (
                          <span className="text-[11px] text-emerald-400 font-bold flex items-center gap-1 mt-1">
                            <Phone className="w-3 h-3" />
                            Contact: {applicant.phone}
                          </span>
                        )}
                      </div>

                      {/* Accept / Reject Buttons */}
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {applicant.status === 'ACCEPTED' ? (
                          <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 text-[10px] font-bold">
                            ACCEPTED & HIRED
                          </span>
                        ) : applicant.status === 'REJECTED' ? (
                          <span className="px-3 py-1 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/40 text-[10px] font-bold">
                            REJECTED
                          </span>
                        ) : (
                          <>
                            <button
                              onClick={() => acceptApplicant(job.id, applicant.id)}
                              className="px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold text-xs cursor-pointer flex items-center gap-1 shadow-md"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>Accept</span>
                            </button>
                            <button
                              onClick={() => rejectApplicant(job.id, applicant.id)}
                              className="px-2.5 py-1.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30 text-xs cursor-pointer"
                            >
                              <XCircle className="w-3.5 h-3.5" />
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-white/10 flex justify-end">
          <button
            onClick={() => setIsFarmerDashboardModalOpen(false)}
            className="py-2.5 px-6 rounded-xl bg-white/5 hover:bg-white/10 text-cream-200/80 text-xs font-mono cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
