import React from 'react';
import { useWorld } from '../../../context/WorldContext';
import { useMarket } from '../../../context/MarketContext';
import { ArrowRight, Sparkles } from 'lucide-react';

export const MarketJourneyStrip = () => {
  const { activeMarketZone, setActiveMarketZone } = useWorld();

  const journeySteps = [
    {
      id: 'farm',
      num: '01',
      title: 'FARM',
      desc: 'Harvest & Fields',
      icon: '🚜',
      zone: 'entrance',
    },
    {
      id: 'country_road',
      num: '02',
      title: 'COUNTRY ROAD',
      desc: 'Rural Transit Highway',
      icon: '🛣️',
      zone: 'entrance',
    },
    {
      id: 'transport',
      num: '03',
      title: 'TRANSPORT',
      desc: 'Freight Dispatch',
      icon: '🚚',
      zone: 'transport',
    },
    {
      id: 'market_entry',
      num: '04',
      title: 'MARKET ENTRY',
      desc: 'Grand Arch Gateway',
      icon: '⛩️',
      zone: 'entrance',
    },
    {
      id: 'main_market',
      num: '05',
      title: 'MAIN MARKET',
      desc: 'Wholesale Mandi Yard',
      icon: '🏪',
      zone: 'grains',
    },
    {
      id: 'crop_stalls',
      num: '06',
      title: 'CROP STALLS',
      desc: 'Grains, Veg & Fruits',
      icon: '🧺',
      zone: 'vegetables',
    },
    {
      id: 'analytics_area',
      num: '07',
      title: 'ANALYTICS AREA',
      desc: 'Live Price Telemetry',
      icon: '📊',
      zone: 'analytics',
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2">
      <div className="p-4 sm:p-5 rounded-3xl bg-forest-950/85 border border-white/10 backdrop-blur-2xl shadow-2xl">
        <div className="flex items-center justify-between mb-3 pb-2 border-b border-white/10">
          <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-amber-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            JOURNEY: FROM FARM TO MARKET
          </span>
          <span className="text-[10px] font-mono text-cream-200/50 hidden sm:inline">
            7-Stage Agricultural Supply Chain Journey
          </span>
        </div>

        {/* 7-Card Horizontal Visual Flow */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
          {journeySteps.map((step, idx) => {
            const isActive = activeMarketZone === step.zone;

            return (
              <button
                key={step.id}
                onClick={() => {
                  setActiveMarketZone(step.zone);
                  const elem = document.getElementById(
                    step.id === 'analytics_area'
                      ? 'price-analytics'
                      : step.id === 'crop_stalls'
                      ? 'price-strip'
                      : step.id === 'transport'
                      ? 'transport-section'
                      : 'price-board'
                  );
                  if (elem) elem.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`group p-2.5 rounded-2xl border text-left transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                  isActive
                    ? 'bg-amber-500/20 border-amber-400/60 shadow-lg shadow-amber-950/50 scale-[1.02]'
                    : 'bg-white/5 hover:bg-white/10 border-white/5 text-cream-200/80 hover:text-white'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xl">{step.icon}</span>
                  <span className="text-[9px] font-mono text-amber-400 font-bold">
                    {step.num}
                  </span>
                </div>
                <div>
                  <h4 className="text-[11px] font-bold font-display text-white group-hover:text-amber-300 transition-colors leading-tight">
                    {step.title}
                  </h4>
                  <p className="text-[9px] text-cream-200/50 font-body leading-snug truncate">
                    {step.desc}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
