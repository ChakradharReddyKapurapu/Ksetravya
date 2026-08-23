import React from 'react';
import { useWorld } from '../../context/WorldContext';
import { usePerformance } from '../../context/PerformanceContext';
import {
  Map,
  UserCheck,
  Briefcase,
  ShoppingBag,
  Tractor,
  CloudRain,
  TrendingUp,
  Brain,
  MessageSquare,
  Sprout
} from 'lucide-react';

export const EcosystemCards = () => {
  const {
    startTransitionToMarket,
    startTransitionToTools,
    startTransitionToJobs,
    startTransitionToLand,
    startTransitionToWeather,
    startTransitionToAnalytics,
    startTransitionToFarm,
  } = useWorld();
  const { setHoveredFeature, hoveredFeature } = usePerformance();

  const cards = [
    {
      id: 'land',
      title: '🌾 Land',
      desc: 'Connect agricultural land with the people and opportunities that depend on it.',
      icon: Map,
      accentColor: 'from-green-500/30 to-green-700/10',
      iconColor: 'text-green-400',
      borderColor: 'hover:border-green-400/50',
      onClick: startTransitionToLand,
    },
    {
      id: 'farmers',
      title: '👨‍🌾 Farmers',
      desc: 'Manage farms, discover opportunities and make data-informed decisions.',
      icon: Sprout,
      accentColor: 'from-emerald-500/30 to-emerald-700/10',
      iconColor: 'text-emerald-400',
      borderColor: 'hover:border-emerald-400/50',
      onClick: startTransitionToFarm,
    },
    {
      id: 'workers',
      title: '👷 Workers',
      desc: 'Discover agricultural work and connect with farmers.',
      icon: UserCheck,
      accentColor: 'from-teal-500/30 to-teal-700/10',
      iconColor: 'text-teal-400',
      borderColor: 'hover:border-teal-400/50',
      onClick: startTransitionToJobs,
    },
    {
      id: 'jobs',
      title: '💼 Jobs',
      desc: 'Bridge agricultural work opportunities with capable workers.',
      icon: Briefcase,
      accentColor: 'from-cyan-500/30 to-cyan-700/10',
      iconColor: 'text-cyan-400',
      borderColor: 'hover:border-cyan-400/50',
      onClick: startTransitionToJobs,
    },
    {
      id: 'marketplace',
      title: '🛒 Marketplace',
      desc: 'Access agricultural products, tools and resources.',
      icon: ShoppingBag,
      accentColor: 'from-amber-500/30 to-amber-700/10',
      iconColor: 'text-amber-400',
      borderColor: 'hover:border-amber-400/50',
      onClick: startTransitionToMarket,
    },
    {
      id: 'tools',
      title: '🛠 Tools & Equipment',
      desc: 'Discover and share useful agricultural equipment.',
      icon: Tractor,
      accentColor: 'from-orange-500/30 to-orange-700/10',
      iconColor: 'text-orange-400',
      borderColor: 'hover:border-orange-400/50',
      onClick: startTransitionToTools,
    },
    {
      id: 'weather',
      title: '🌦 Weather',
      desc: 'Understand environmental conditions affecting agricultural decisions.',
      icon: CloudRain,
      accentColor: 'from-sky-500/30 to-sky-700/10',
      iconColor: 'text-sky-400',
      borderColor: 'hover:border-sky-400/50',
      onClick: startTransitionToWeather,
    },
    {
      id: 'analytics',
      title: '📈 Market Intelligence',
      desc: 'Explore market information and agricultural trends.',
      icon: TrendingUp,
      accentColor: 'from-blue-500/30 to-blue-700/10',
      iconColor: 'text-blue-400',
      borderColor: 'hover:border-blue-400/50',
      onClick: startTransitionToAnalytics,
    },
    {
      id: 'ai',
      title: '🧠 Knowledge & AI',
      desc: 'Turn agricultural data into useful insights and recommendations.',
      icon: Brain,
      accentColor: 'from-purple-500/30 to-purple-700/10',
      iconColor: 'text-purple-400',
      borderColor: 'hover:border-purple-400/50',
      onClick: startTransitionToAnalytics,
    },
    {
      id: 'communication',
      title: '💬 Communication',
      desc: 'Connect farmers and workers through secure messaging.',
      icon: MessageSquare,
      accentColor: 'from-indigo-500/30 to-indigo-700/10',
      iconColor: 'text-indigo-400',
      borderColor: 'hover:border-indigo-400/50',
      onClick: startTransitionToJobs,
    },
  ];

  return (
    <section id="ecosystem-section" className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-400 mb-2 block">
          ECOSYSTEM DOMAINS
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display text-white tracking-tight flex items-center justify-center gap-2">
          Kṣetravya Ecosystem Pillars <span>🌾</span>
        </h2>
        <p className="text-xs sm:text-sm text-cream-200/60 font-mono mt-2">
          Click any card to explore its digital territory in Kṣetravya
        </p>
      </div>

      {/* 10-Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {cards.map((card) => {
          const Icon = card.icon;
          const isHovered = hoveredFeature === card.id;

          return (
            <div
              key={card.id}
              onClick={card.onClick}
              onMouseEnter={() => setHoveredFeature(card.id)}
              onMouseLeave={() => setHoveredFeature(null)}
              className={`group relative p-5 rounded-2xl bg-forest-950/80 backdrop-blur-xl border flex flex-col justify-between cursor-pointer transition-all duration-300 transform hover:-translate-y-1.5 ${
                isHovered
                  ? 'border-emerald-400 shadow-2xl shadow-emerald-950/80 scale-[1.03] bg-forest-900/90'
                  : 'border-white/10 hover:border-emerald-400/40'
              }`}
            >
              <div>
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.accentColor} border border-white/10 flex items-center justify-center mb-3 shadow-lg group-hover:scale-110 transition-all duration-300`}
                >
                  <Icon className={`w-6 h-6 ${card.iconColor}`} />
                </div>
                <h3 className="text-base font-bold font-display text-white mb-2 group-hover:text-emerald-300 transition-colors">
                  {card.title}
                </h3>
                <p className="text-xs text-cream-200/70 leading-relaxed font-body">
                  {card.desc}
                </p>
              </div>

              <div className="pt-4 flex items-center text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                <span>Explore Domain →</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
