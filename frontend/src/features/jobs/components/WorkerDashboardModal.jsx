import React from 'react';
import { useJobs } from '../../../context/JobsContext';
import { X, FileText, CheckCircle2, Clock, XCircle, Briefcase, MapPin } from 'lucide-react';

export const WorkerDashboardModal = () => {
  const { isApplicationsModalOpen, setIsApplicationsModalOpen, myApplications } = useJobs();

  if (!isApplicationsModalOpen) return null;

  const getStatusBadge = (status) => {
    switch (status) {
      case 'ACCEPTED':
        return (
          <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono font-bold flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            <span>ACCEPTED</span>
          </span>
        );
      case 'UNDER_REVIEW':
        return (
          <span className="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-mono font-bold flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>UNDER REVIEW</span>
          </span>
        );
      case 'REJECTED':
        return (
          <span className="px-2.5 py-1 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30 text-[10px] font-mono font-bold flex items-center gap-1">
            <XCircle className="w-3 h-3" />
            <span>REJECTED</span>
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-1 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30 text-[10px] font-mono font-bold flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>APPLIED</span>
          </span>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        onClick={() => setIsApplicationsModalOpen(false)}
        className="fixed inset-0 bg-black/80 backdrop-blur-xl transition-opacity"
      />

      <div className="relative w-full max-w-2xl bg-forest-950/95 border border-emerald-400/40 text-cream-100 rounded-3xl shadow-2xl p-6 sm:p-8 overflow-hidden z-10 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold font-display text-white">
                My Job Applications ({myApplications.length})
              </h3>
              <span className="text-[10px] font-mono text-cream-200/60">
                Track your active agricultural work applications & acceptance status
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsApplicationsModalOpen(false)}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-stone-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Applications List */}
        <div className="py-5 space-y-3 max-h-[60vh] overflow-y-auto pr-1">
          {myApplications.map((app) => (
            <div
              key={app.applicationId}
              className="p-4 rounded-2xl bg-forest-900/80 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div>
                <h4 className="text-sm font-bold font-display text-white">{app.jobTitle}</h4>
                <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-cream-200/60 mt-1">
                  <span>Farmer: <strong className="text-cream-100">{app.farmerName}</strong></span>
                  <span>•</span>
                  <span className="flex items-center gap-0.5">
                    <MapPin className="w-3 h-3 text-amber-400" />
                    {app.location}
                  </span>
                  <span>•</span>
                  <span className="text-emerald-400 font-bold">{app.salary}</span>
                </div>
                <span className="text-[10px] font-mono text-cream-200/40 block mt-1">
                  Applied on: {app.appliedDate}
                </span>
              </div>

              <div className="flex-shrink-0">{getStatusBadge(app.status)}</div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-white/10 flex justify-end">
          <button
            onClick={() => setIsApplicationsModalOpen(false)}
            className="py-2.5 px-6 rounded-xl bg-white/5 hover:bg-white/10 text-cream-200/80 text-xs font-mono cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
