import React from 'react';
import { Sprout, Globe, Cpu, Users, ShieldCheck, ArrowRight, Compass, Sparkles, MapPin, DollarSign, Brain, MessageSquare } from 'lucide-react';
import { useWorld } from '../../context/WorldContext';

export const KsetravyaBrandStory = () => {
  const { startTransitionToMarket, startTransitionToAnalytics } = useWorld();

  const ecosystemFlow = [
    { title: 'LAND', subtitle: 'Cultivated Territory', icon: '🌍', color: 'from-amber-500/20 to-amber-700/10 text-amber-300' },
    { title: 'FARMERS', subtitle: 'Farm Managers', icon: '👨‍🌾', color: 'from-emerald-500/20 to-emerald-700/10 text-emerald-300' },
    { title: 'WORKERS', subtitle: 'Agricultural Crew', icon: '👷', color: 'from-teal-500/20 to-teal-700/10 text-teal-300' },
    { title: 'JOBS', subtitle: 'Work Opportunities', icon: '💼', color: 'from-cyan-500/20 to-cyan-700/10 text-cyan-300' },
    { title: 'MARKET', subtitle: 'Commerce & Supplies', icon: '🛒', color: 'from-green-500/20 to-green-700/10 text-green-300' },
    { title: 'TOOLS', subtitle: 'Machinery & Equipment', icon: '🛠️', color: 'from-amber-500/20 to-amber-700/10 text-amber-300' },
    { title: 'KNOWLEDGE & AI', subtitle: 'Smart Analytics', icon: '🧠', color: 'from-purple-500/20 to-purple-700/10 text-purple-300' },
    { title: 'DECISIONS & PROSPERITY', subtitle: 'Sustainable Growth', icon: '✨', color: 'from-yellow-500/20 to-amber-500/10 text-yellow-300' },
  ];

  return (
    <section className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      
      {/* SECTION 1: WHY KṢETRAVYA? BRAND STORY */}
      <div className="relative p-8 sm:p-12 rounded-3xl bg-forest-950/80 backdrop-blur-2xl border border-emerald-500/30 shadow-2xl overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl -z-10" />
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-mono mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ORIGIN & BRAND STORY</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black font-display text-white tracking-tight leading-tight mb-6">
            Why Kṣetravya?
          </h2>

          <div className="space-y-4 text-cream-100/90 text-sm sm:text-base leading-relaxed font-body">
            <p className="p-4 rounded-2xl bg-white/5 border border-white/10 font-mono text-emerald-300 text-xs sm:text-sm">
              <strong className="text-white">Kṣetra (क्षेत्र):</strong> Meaning field, cultivated land, territory, or domain.
              <br />
              <strong className="text-white">“-vya” suffix:</strong> A modern technological suffix representing a digital ecosystem built around the agricultural field.
            </p>

            <p>
              Kṣetravya represents more than a farming platform. It is a connected digital domain where farmers, workers, land, jobs, markets, tools, knowledge, and intelligent technology come together.
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 2: AGRICULTURAL ECOSYSTEM VISUAL */}
      <div className="space-y-8 text-center">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-400 block mb-2">
            CONNECTED ARCHITECTURE
          </span>
          <h3 className="text-3xl sm:text-4xl font-extrabold font-display text-white">
            The Kṣetravya Agricultural Ecosystem
          </h3>
          <p className="text-xs sm:text-sm text-cream-200/60 font-mono max-w-xl mx-auto mt-2">
            Seamlessly bridging land, labor, markets, tools, and intelligence.
          </p>
        </div>

        {/* Visual Flow Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {ecosystemFlow.map((item, idx) => (
            <div
              key={item.title}
              className={`p-4 rounded-2xl bg-gradient-to-b ${item.color} border border-white/10 flex flex-col items-center justify-between text-center transition-all duration-300 hover:scale-105 hover:border-emerald-400/50 shadow-lg`}
            >
              <span className="text-2xl mb-2">{item.icon}</span>
              <span className="text-xs font-display font-bold text-white tracking-wide block">{item.title}</span>
              <span className="text-[9px] font-mono text-cream-200/60 uppercase mt-1">{item.subtitle}</span>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 3: THE IDEA BEHIND KṢETRAVYA */}
      <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-forest-900/90 via-forest-950/90 to-black border border-amber-500/30 shadow-2xl">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30 text-xs font-mono">
            THE IDEA BEHIND KṢETRAVYA
          </span>
          <h3 className="text-2xl sm:text-4xl font-extrabold font-display text-white leading-snug">
            “Every agricultural journey begins with a field. But a field does not exist in isolation.”
          </h3>
          <p className="text-xs sm:text-sm text-cream-200/80 leading-relaxed font-body max-w-2xl mx-auto">
            It connects land with farmers, farmers with workers, workers with opportunities, products with markets, data with knowledge, and knowledge with decisions. Kṣetravya brings these connections together in one digital ecosystem.
          </p>
        </div>
      </div>

      {/* SECTION 4: FINAL BRAND STATEMENT HERO */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-emerald-900/60 via-teal-900/60 to-forest-950 border border-emerald-400/40 text-center space-y-4 shadow-2xl">
        <h4 className="text-xl sm:text-3xl font-black font-display text-white">
          Kṣetravya is where the field becomes a connected digital ecosystem.
        </h4>
        <p className="text-xs sm:text-sm text-emerald-200/80 font-mono">
          From land to labor, from markets to knowledge, from data to decisions — Kṣetravya connects the agricultural ecosystem.
        </p>
        <div className="pt-2 flex justify-center gap-4">
          <button
            onClick={startTransitionToMarket}
            className="px-6 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-display font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-lg"
          >
            Explore Marketplace
          </button>
          <button
            onClick={startTransitionToAnalytics}
            className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-display font-bold text-xs uppercase tracking-wider transition-all border border-white/20 cursor-pointer"
          >
            AI Intelligence
          </button>
        </div>
      </div>

    </section>
  );
};
