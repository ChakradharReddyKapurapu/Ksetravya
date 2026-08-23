import React, { useState, useEffect, useRef } from 'react';
import { Users, Tractor, Briefcase, Sprout, Package } from 'lucide-react';

export const LiveStatsStrip = () => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const [counts, setCounts] = useState({
    farmers: 0,
    tools: 0,
    jobs: 0,
    land: 0,
    products: 0,
  });

  const stripRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          // Smooth 1.6s upward count animation
          const duration = 1600;
          const startTime = performance.now();

          const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const ease = 1 - Math.pow(1 - progress, 3);

            setCounts({
              farmers: (12 * ease).toFixed(1),
              tools: (4.8 * ease).toFixed(1),
              jobs: (2.3 * ease).toFixed(1),
              land: (1.9 * ease).toFixed(1),
              products: (8.6 * ease).toFixed(1),
            });

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.2 }
    );

    if (stripRef.current) observer.observe(stripRef.current);
    return () => observer.disconnect();
  }, [hasAnimated]);

  const metrics = [
    {
      icon: Users,
      value: hasAnimated ? `${counts.farmers}K+` : '12K+',
      label: 'Active Farmers',
      iconColor: 'text-emerald-400',
      iconBg: 'bg-emerald-500/20 border-emerald-500/30',
    },
    {
      icon: Tractor,
      value: hasAnimated ? `${counts.tools}K+` : '4.8K+',
      label: 'Tools Available',
      iconColor: 'text-amber-400',
      iconBg: 'bg-amber-500/20 border-amber-500/30',
    },
    {
      icon: Briefcase,
      value: hasAnimated ? `${counts.jobs}K+` : '2.3K+',
      label: 'Jobs Listed',
      iconColor: 'text-sky-400',
      iconBg: 'bg-sky-500/20 border-sky-500/30',
    },
    {
      icon: Sprout,
      value: hasAnimated ? `${counts.land}K+` : '1.9K+',
      label: 'Land Listings',
      iconColor: 'text-emerald-300',
      iconBg: 'bg-emerald-400/20 border-emerald-400/30',
    },
    {
      icon: Package,
      value: hasAnimated ? `${counts.products}K+` : '8.6K+',
      label: 'Products Sold',
      iconColor: 'text-purple-400',
      iconBg: 'bg-purple-500/20 border-purple-500/30',
    },
  ];

  return (
    <div ref={stripRef} className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div className="p-3 sm:p-4 rounded-2xl bg-forest-950/85 backdrop-blur-2xl border border-white/10 shadow-2xl shadow-black/60">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 divide-y sm:divide-y-0 sm:divide-x divide-white/5">
          {metrics.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className={`flex items-center gap-3.5 px-2 sm:px-4 py-2 ${
                  idx > 0 ? 'pt-3 sm:pt-2' : ''
                }`}
              >
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center border shadow-inner ${item.iconBg} ${item.iconColor}`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl sm:text-2xl font-bold font-display text-white tracking-tight leading-none">
                    {item.value}
                  </span>
                  <span className="text-xs text-cream-200/70 font-body mt-1 leading-tight">
                    {item.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
