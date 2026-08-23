import React from 'react';
import { GlassPanel } from '../../components/ui/GlassPanel';
import { Badge } from '../../components/ui/Badge';
import { Tractor, CloudSun, Users, Sprout, ShoppingBag, Shield, ArrowUpRight } from 'lucide-react';

export const LiveStatsTicker = () => {
  const features = [
    {
      icon: Tractor,
      title: 'Machinery & Tool Rental',
      tag: 'Hourly & Daily',
      desc: 'On-demand tractors, harvesters, and rotavators from nearby verified tool owners.',
      color: 'gold',
    },
    {
      icon: CloudSun,
      title: 'Agronomic Weather',
      tag: 'Field Intelligence',
      desc: 'Hyperlocal micro-climate forecasts with actionable spray & irrigation advisory.',
      color: 'river',
    },
    {
      icon: Users,
      title: 'Agricultural Jobs',
      tag: 'Verified Fair Wage',
      desc: 'Connecting farm owners with skilled planting, weeding, harvesting, and tractor operators.',
      color: 'emerald',
    },
    {
      icon: ShoppingBag,
      title: 'Direct Marketplace',
      tag: 'Transparent Pricing',
      desc: 'Disintermediate farm produce, certified organic seeds, bio-fertilizers, and crop protection.',
      color: 'emerald',
    },
  ];

  return (
    <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <Badge variant="emerald" className="mb-2">
            One Connected Agricultural World
          </Badge>
          <h3 className="text-2xl sm:text-3xl font-bold font-display text-white">
            Pillars of the AGRI NEXUS Platform
          </h3>
        </div>
        <p className="text-xs sm:text-sm text-cream-200/70 max-w-md font-body">
          Built to transform traditional agrarian fragmentation into a transparent, high-yield digital ecosystem.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {features.map((f, idx) => {
          const Icon = f.icon;
          return (
            <GlassPanel
              key={idx}
              variant="card"
              className="p-5 flex flex-col justify-between group hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-forest-800/90 border border-white/10 flex items-center justify-center text-emerald-400 group-hover:scale-110 group-hover:border-emerald-400/40 transition-all duration-300">
                    <Icon className="w-5 h-5" />
                  </div>
                  <Badge variant={f.color} size="sm">
                    {f.tag}
                  </Badge>
                </div>
                <h4 className="text-base font-semibold text-white font-display mb-1.5 flex items-center justify-between">
                  {f.title}
                  <ArrowUpRight className="w-4 h-4 text-cream-200/40 group-hover:text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </h4>
                <p className="text-xs text-cream-200/70 font-body leading-relaxed">
                  {f.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-emerald-400/80">
                <span>Module Preview</span>
                <span className="text-cream-200/40 group-hover:text-emerald-300 transition-colors">Explore →</span>
              </div>
            </GlassPanel>
          );
        })}
      </div>
    </section>
  );
};
