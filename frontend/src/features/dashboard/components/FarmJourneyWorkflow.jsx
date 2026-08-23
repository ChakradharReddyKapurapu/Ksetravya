import React from 'react';
import { useWorld } from '../../../context/WorldContext';
import {
  Sprout,
  DollarSign,
  Tractor,
  ShieldCheck,
  CloudSun,
  TrendingUp,
  BarChart3,
  Truck,
  Store,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export const FarmJourneyWorkflow = () => {
  const {
    startTransitionToSeeds,
    startTransitionToAnalytics,
    startTransitionToTools,
    startTransitionToCropProtection,
    startTransitionToWeather,
    startTransitionToMarket,
  } = useWorld();

  const steps = [
    { label: 'Crop Choice', icon: '🌱', sub: 'Varieties & Soil', onClick: startTransitionToSeeds },
    { label: 'Investment', icon: '💰', sub: 'Input Budget', onClick: startTransitionToAnalytics },
    { label: 'Machinery', icon: '🚜', sub: 'Tillage & Prep', onClick: startTransitionToTools },
    { label: 'Protection', icon: '🛡️', sub: 'Bio & Spray Care', onClick: startTransitionToCropProtection },
    { label: 'Weather Radar', icon: '🌦️', sub: 'Rain & Humidity', onClick: startTransitionToWeather },
    { label: 'Mandi Rates', icon: '📈', sub: 'APMC Session', onClick: startTransitionToMarket },
    { label: 'Profit Analysis', icon: '📊', sub: 'Net Returns', onClick: startTransitionToAnalytics },
    { label: 'Transport', icon: '🚚', sub: 'Logistics Fleet', onClick: startTransitionToMarket },
    { label: 'Marketplace', icon: '🛒', sub: 'Direct Settlement', onClick: startTransitionToMarket },
  ];

  return (
    <div className="p-6 rounded-3xl bg-forest-950/85 border border-white/10 backdrop-blur-xl shadow-xl space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold font-display text-white text-sm">The Connected Farm Journey</h3>
            <span className="text-[10px] text-cream-200/50 font-mono">
              End-to-End Workflow across the AGRI NEXUS Ecosystem
            </span>
          </div>
        </div>

        <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono border border-emerald-400/30">
          9 Linked Domains
        </span>
      </div>

      {/* Horizontal workflow steps (wrap on mobile/tablet) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-9 gap-2 pt-2">
        {steps.map((step, idx) => (
          <button
            key={idx}
            onClick={step.onClick}
            className="group relative p-3 rounded-2xl bg-forest-900/60 hover:bg-forest-900 border border-white/5 hover:border-emerald-400/40 text-center transition-all cursor-pointer flex flex-col items-center justify-between space-y-1.5"
          >
            {/* Step number badge */}
            <span className="text-[9px] font-mono text-cream-200/40 font-bold">
              0{idx + 1}
            </span>

            <span className="text-xl group-hover:scale-110 transition-transform">
              {step.icon}
            </span>

            <div>
              <span className="text-xs font-bold font-display text-white block group-hover:text-emerald-300 transition-colors">
                {step.label}
              </span>
              <span className="text-[9px] text-cream-200/50 font-body block truncate mt-0.5">
                {step.sub}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
