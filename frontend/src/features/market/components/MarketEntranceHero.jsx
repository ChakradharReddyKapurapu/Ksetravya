import React, { useState } from 'react';
import { useMarket } from '../../../context/MarketContext';
import { useWorld } from '../../../context/WorldContext';
import {
  ArrowRight,
  Play,
  Sunrise,
  Thermometer,
  Droplets,
  Wind,
  CloudRain,
  TrendingUp,
  Store,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

export const MarketEntranceHero = () => {
  const { setSelectedCrop, allCrops } = useMarket();
  const [isPlayingGuide, setIsPlayingGuide] = useState(false);

  const featuredTomato = allCrops.find((c) => c.id === 'tomato') || allCrops[4];

  const handlePlayGuide = () => {
    setIsPlayingGuide(true);
    const elem = document.getElementById('price-strip');
    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => setIsPlayingGuide(false), 2000);
  };

  return (
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12 pointer-events-none">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Master Welcome & Telemetry */}
        <div className="lg:col-span-7 flex flex-col items-start pointer-events-auto">
          {/* Welcome Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30 text-[10px] font-mono uppercase tracking-wider mb-3 backdrop-blur-md">
            <span>🌾</span>
            <span className="font-bold">WELCOME TO</span>
          </div>

          {/* Master Headline */}
          <h1 className="text-4xl sm:text-6xl font-black font-display text-white tracking-tight leading-[1.08] mb-3">
            AGRICULTURAL <br />
            <span className="text-emerald-400 inline-flex items-center gap-2">
              MARKETPLACE <span className="text-3xl sm:text-5xl">🍃</span>
            </span>
          </h1>

          {/* Tagline & Subtitle */}
          <h2 className="text-base sm:text-lg font-bold font-display text-amber-300 mb-2">
            Where Agricultural Products Meet the Market.
          </h2>
          <p className="text-xs sm:text-sm text-cream-200/80 font-body leading-relaxed max-w-xl mb-6">
            Explore agricultural products, supplies and market information in one connected marketplace. Track available crop-price information by crop, market, location and date.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <button
              onClick={() => {
                const elem = document.getElementById('price-strip');
                if (elem) elem.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold font-display text-xs transition-all shadow-xl hover:scale-105 cursor-pointer"
            >
              <span>Explore Market</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={handlePlayGuide}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-forest-950/80 hover:bg-forest-900 border border-white/15 text-cream-100 font-display font-semibold text-xs transition-all shadow-lg cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-current text-amber-400" />
              <span>{isPlayingGuide ? 'Navigating...' : 'How It Works'}</span>
            </button>
          </div>

          {/* Live Environmental Weather Bar */}
          <div className="flex flex-wrap items-center gap-3 p-3 rounded-2xl bg-forest-950/85 border border-white/10 backdrop-blur-xl shadow-xl text-[11px] font-mono text-cream-200/70">
            <div className="flex items-center gap-1.5">
              <Sunrise className="w-4 h-4 text-amber-400" />
              <span>Sunrise: <strong>06:12 AM</strong></span>
            </div>
            <span className="text-white/20">•</span>
            <div className="flex items-center gap-1.5">
              <Thermometer className="w-4 h-4 text-rose-400" />
              <span>Temp: <strong>28°C</strong></span>
            </div>
            <span className="text-white/20">•</span>
            <div className="flex items-center gap-1.5">
              <Droplets className="w-4 h-4 text-sky-400" />
              <span>Humidity: <strong>62%</strong></span>
            </div>
            <span className="text-white/20">•</span>
            <div className="flex items-center gap-1.5">
              <Wind className="w-4 h-4 text-teal-400" />
              <span>Wind: <strong>12 km/h</strong></span>
            </div>
            <span className="text-white/20">•</span>
            <div className="flex items-center gap-1.5">
              <CloudRain className="w-4 h-4 text-blue-400" />
              <span>Rain: <strong>10%</strong></span>
            </div>
          </div>
        </div>

        {/* Right Column: Floating Glass Live Price Widget */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end pointer-events-auto">
          <div
            onClick={() => setSelectedCrop(featuredTomato)}
            className="w-full max-w-sm p-6 rounded-3xl bg-forest-950/90 border border-emerald-400/40 shadow-2xl backdrop-blur-2xl transition-all duration-300 hover:border-emerald-400 hover:scale-[1.02] cursor-pointer"
          >
            {/* Header Badge */}
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
              <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest font-bold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                LIVE MARKET PRICE
              </span>
              <span className="text-[9px] font-mono text-cream-200/50 bg-white/5 px-2 py-0.5 rounded-full">
                Demo Market Data
              </span>
            </div>

            {/* Main Price Info */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="text-4xl">{featuredTomato.icon}</span>
                <div>
                  <h3 className="text-lg font-bold font-display text-white">
                    {featuredTomato.name}
                  </h3>
                  <span className="text-[10px] font-mono text-cream-200/60 block">
                    {featuredTomato.variety}
                  </span>
                </div>
              </div>

              <div className="text-right">
                <div className="text-3xl font-black font-display text-amber-400">
                  ₹{featuredTomato.price}
                  <span className="text-xs font-mono text-cream-200/60 font-normal"> /kg</span>
                </div>
                <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                  +{featuredTomato.changePercent}% vs yesterday
                </span>
              </div>
            </div>

            {/* Min / Max / Avg Metric Grid */}
            <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-forest-900/70 border border-white/5 text-center text-xs font-mono my-3">
              <div>
                <span className="text-[9px] text-cream-200/50 block">Min</span>
                <span className="text-white font-bold">₹{featuredTomato.minPrice}</span>
              </div>
              <div className="border-x border-white/10">
                <span className="text-[9px] text-cream-200/50 block">Max</span>
                <span className="text-white font-bold">₹{featuredTomato.maxPrice}</span>
              </div>
              <div>
                <span className="text-[9px] text-emerald-400 block">Avg</span>
                <span className="text-emerald-300 font-bold">₹{featuredTomato.avgPrice}</span>
              </div>
            </div>

            {/* Market & Date Footer */}
            <div className="flex items-center justify-between text-[11px] font-mono text-cream-200/60 pt-2 border-t border-white/5">
              <span>Market: <strong className="text-white">{featuredTomato.marketName}</strong></span>
              <span>24 May 2026</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
