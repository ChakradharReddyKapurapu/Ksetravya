import React from 'react';
import { useWorld } from '../../../context/WorldContext';
import {
  Tractor,
  Sprout,
  ShieldCheck,
  Briefcase,
  Map,
  Truck,
  Store,
  TrendingUp,
  Sparkles,
  ArrowUpRight,
} from 'lucide-react';

export const QuickActionsGrid = () => {
  const {
    startTransitionToTools,
    startTransitionToSeeds,
    startTransitionToCropProtection,
    startTransitionToJobs,
    startTransitionToLand,
    startTransitionToMarket,
  } = useWorld();

  const actions = [
    {
      id: 'tools',
      title: 'Find Tools',
      sub: 'Tractors & Machinery',
      icon: <Tractor className="w-5 h-5 text-amber-400" />,
      onClick: startTransitionToTools,
      badge: 'Rent / Buy',
    },
    {
      id: 'seeds',
      title: 'Explore Seeds',
      sub: 'Certified High-Yield',
      icon: <Sprout className="w-5 h-5 text-emerald-400" />,
      onClick: startTransitionToSeeds,
      badge: 'Certified',
    },
    {
      id: 'crop_protection',
      title: 'Crop Protection',
      sub: 'Bio-Care & Sprayers',
      icon: <ShieldCheck className="w-5 h-5 text-teal-400" />,
      onClick: startTransitionToCropProtection,
      badge: 'Verified',
    },
    {
      id: 'jobs',
      title: 'Find Workers',
      sub: 'Harvest Crews & Operators',
      icon: <Briefcase className="w-5 h-5 text-emerald-400" />,
      onClick: startTransitionToJobs,
      badge: 'Verified Labor',
    },
    {
      id: 'land',
      title: 'Find Land',
      sub: 'Lease Farmland Parcels',
      icon: <Map className="w-5 h-5 text-amber-400" />,
      onClick: startTransitionToLand,
      badge: 'Verified Parcels',
    },
    {
      id: 'transport',
      title: 'Transport Logistics',
      sub: 'Farm-to-Mandi Logistics',
      icon: <Truck className="w-5 h-5 text-sky-400" />,
      onClick: startTransitionToMarket,
      badge: 'Express Fleet',
    },
    {
      id: 'marketplace',
      title: 'Direct Marketplace',
      sub: 'Sell Farm Produce Direct',
      icon: <Store className="w-5 h-5 text-amber-400" />,
      onClick: startTransitionToMarket,
      badge: '0% Brokerage',
    },
    {
      id: 'prices',
      title: 'Market Prices',
      sub: 'APMC Mandi Rates',
      icon: <TrendingUp className="w-5 h-5 text-emerald-400" />,
      onClick: startTransitionToMarket,
      badge: 'Live Session',
    },
  ];

  return (
    <div className="p-6 rounded-3xl bg-forest-950/85 border border-white/10 backdrop-blur-xl shadow-xl space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold font-display text-white text-sm">Quick Actions</h3>
            <span className="text-[10px] text-cream-200/50 font-mono">
              Fast-Track Navigation across AGRI NEXUS
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {actions.map((act) => (
          <button
            key={act.id}
            onClick={act.onClick}
            className="group p-3.5 rounded-2xl bg-forest-900/60 hover:bg-forest-900 border border-white/5 hover:border-emerald-400/40 text-left transition-all duration-200 cursor-pointer flex flex-col justify-between space-y-2 hover:-translate-y-0.5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div className="w-9 h-9 rounded-xl bg-forest-950 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                {act.icon}
              </div>
              <ArrowUpRight className="w-3.5 h-3.5 text-cream-200/40 group-hover:text-emerald-300 transition-colors" />
            </div>

            <div>
              <span className="font-bold font-display text-white text-xs block group-hover:text-emerald-300 transition-colors">
                {act.title}
              </span>
              <span className="text-[10px] text-cream-200/60 font-body truncate block mt-0.5">
                {act.sub}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
