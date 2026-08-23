import React from 'react';
import { Sprout, Globe, ShieldCheck, Heart, Mail, Phone, MapPin } from 'lucide-react';
import { useWorld } from '../../context/WorldContext';

export const Footer = () => {
  const {
    startTransitionToFarm,
    startTransitionToTools,
    startTransitionToSeeds,
    startTransitionToCropProtection,
    startTransitionToMarket,
    startTransitionToJobs,
    startTransitionToLand,
    startTransitionToWeather,
    startTransitionToAnalytics,
  } = useWorld();

  return (
    <footer className="relative z-20 bg-forest-950/95 border-t border-white/10 text-cream-200/80 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-stone-950 font-bold">
                🌱
              </div>
              <span className="font-display font-black text-white text-lg tracking-wider">KṢETRAVYA</span>
            </div>
            <p className="text-xs text-cream-200/70 leading-relaxed font-body">
              “A connected digital ecosystem for agriculture.” Connecting land, farmers, workers, jobs, markets, tools, and intelligence.
            </p>
          </div>

          {/* Quick Ecosystem Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-400">
              Ecosystem
            </h4>
            <ul className="space-y-2 text-xs">
              <li><button onClick={startTransitionToTools} className="hover:text-white transition-colors cursor-pointer">Tools & Machinery</button></li>
              <li><button onClick={startTransitionToSeeds} className="hover:text-white transition-colors cursor-pointer">Seeds & Germination</button></li>
              <li><button onClick={startTransitionToCropProtection} className="hover:text-white transition-colors cursor-pointer">Crop Protection</button></li>
              <li><button onClick={startTransitionToMarket} className="hover:text-white transition-colors cursor-pointer">Marketplace</button></li>
            </ul>
          </div>

          {/* Workforce & Land */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-400">
              Work & Land
            </h4>
            <ul className="space-y-2 text-xs">
              <li><button onClick={startTransitionToJobs} className="hover:text-white transition-colors cursor-pointer">Jobs & Hiring</button></li>
              <li><button onClick={startTransitionToLand} className="hover:text-white transition-colors cursor-pointer">Land & Leasing</button></li>
              <li><button onClick={startTransitionToWeather} className="hover:text-white transition-colors cursor-pointer">Weather & Intelligence</button></li>
              <li><button onClick={startTransitionToAnalytics} className="hover:text-white transition-colors cursor-pointer">AI Analytics</button></li>
            </ul>
          </div>

          {/* Contact & About */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-400">
              About Kṣetravya
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> <span>Agricultural Digital Territory</span></li>
              <li className="flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> <a href="mailto:kapurapuchakradharreddy@gmail.com" className="hover:text-white transition-colors break-all">kapurapuchakradharreddy@gmail.com</a></li>
              <li className="flex items-center gap-2"><ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> <span>Verified Ecosystem</span></li>
              <li className="flex items-center gap-2"><Globe className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> <span className="font-semibold text-emerald-300">BHARATH</span></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-cream-200/50 gap-2">
          <span>© {new Date().getFullYear()} Kṣetravya. All rights reserved.</span>
          <span className="font-mono text-[10px] uppercase tracking-wider text-emerald-400/80">
            Founded by KAPURAPUCHAKCHAKRADHARREDDY
          </span>
        </div>

      </div>
    </footer>
  );
};
