import React from 'react';
import { History, Bell, Clock, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const RecentActivityWidget = () => {
  // Activity entries prepared for future Spring Boot REST API integration (GET /api/notifications & /api/activity)
  const activities = []; // Clean empty state as per prompt requirements

  return (
    <div className="p-6 rounded-3xl bg-forest-950/85 border border-white/10 backdrop-blur-xl shadow-xl space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-teal-500/20 border border-teal-400/30 flex items-center justify-center text-teal-400">
            <History className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold font-display text-white text-sm">Recent Activity</h3>
            <span className="text-[10px] text-cream-200/50 font-mono">
              Equipment Rentals, Applications & Orders
            </span>
          </div>
        </div>

        <span className="px-2 py-0.5 rounded-full bg-white/5 text-cream-200/60 text-[9px] font-mono border border-white/10">
          Account Log
        </span>
      </div>

      {/* Empty State / Feed */}
      {activities.length === 0 ? (
        <div className="py-10 text-center space-y-2 px-4">
          <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-cream-200/50 mx-auto">
            <Clock className="w-5 h-5" />
          </div>
          <h4 className="text-xs font-bold font-display text-white">
            No recent activity recorded yet.
          </h4>
          <p className="text-[11px] text-cream-200/60 font-body max-w-sm mx-auto">
            When you rent equipment, apply for farm jobs, save parcels, or order produce, your live transaction timeline will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-2.5">
          {/* Future activity feed mapping */}
        </div>
      )}
    </div>
  );
};
