import React from 'react';
import { TRANSPORT_VEHICLES } from '../data/demoMarketData';
import { Truck, ArrowRight, ShieldCheck, Clock, Weight, MapPin } from 'lucide-react';

export const TransportZoneSection = () => {
  return (
    <section id="transport-dock" className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <span className="text-xs font-mono uppercase text-sky-400 font-bold tracking-wider mb-1 block">
            MANDI LOGISTICS DISPATCH
          </span>
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-display text-white tracking-tight">
            Transport Your Harvest Directly
          </h3>
        </div>
        <p className="text-xs sm:text-sm text-cream-200/70 max-w-md font-body">
          Book verified local transport directly from your farm to the APMC mandi or wholesale delivery destinations.
        </p>
      </div>

      {/* Vehicle Rate Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {TRANSPORT_VEHICLES.map((v) => {
          const colorStyles = {
            emerald: 'border-emerald-500/30 hover:border-emerald-400/60 bg-emerald-950/20',
            amber: 'border-amber-500/30 hover:border-amber-400/60 bg-amber-950/20',
            sky: 'border-sky-500/30 hover:border-sky-400/60 bg-sky-950/20',
          }[v.color];

          return (
            <div
              key={v.id}
              className={`p-6 rounded-3xl border backdrop-blur-xl transition-all duration-300 flex flex-col justify-between group shadow-xl ${colorStyles}`}
            >
              <div>
                {/* Header: Name & Rate */}
                <div className="flex items-start justify-between gap-2 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                    <Truck className="w-6 h-6" />
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-black font-display text-white">
                      ₹{v.ratePerKm}
                    </span>
                    <span className="text-xs font-mono text-cream-200/60 block">/ km</span>
                  </div>
                </div>

                <h4 className="text-lg font-bold font-display text-white mb-1">{v.name}</h4>
                <p className="text-xs text-cream-200/70 font-body mb-5">{v.suitableFor}</p>

                {/* Specs */}
                <div className="space-y-2 py-3 border-y border-white/10 text-xs font-mono text-cream-200/80 mb-5">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1 text-cream-200/50">
                      <Weight className="w-3.5 h-3.5" /> Payload:
                    </span>
                    <span className="text-white font-semibold">{v.capacity}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1 text-cream-200/50">
                      <Clock className="w-3.5 h-3.5" /> Avg Dispatch ETA:
                    </span>
                    <span className="text-emerald-300 font-semibold">{v.eta}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1 text-cream-200/50">
                      <MapPin className="w-3.5 h-3.5" /> Base Charge:
                    </span>
                    <span className="text-amber-300">₹{v.baseCharge} (First 5 km)</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => {
                  alert(`Transport booking for ${v.name} will connect to the Transport module in the next stage.`);
                }}
                className="w-full py-3 px-4 rounded-xl bg-sky-500 hover:bg-sky-400 text-stone-950 font-bold font-display text-xs flex items-center justify-center gap-2 transition-all shadow-lg cursor-pointer"
              >
                <span>Find Transport</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
};
