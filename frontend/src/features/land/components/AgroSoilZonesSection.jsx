import React from 'react';
import { useLand } from '../../../context/LandContext';
import { Layers, MapPin, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

export const AgroSoilZonesSection = () => {
  const { setActiveSoilType } = useLand();

  const zones = [
    {
      id: 'black_soil',
      title: 'Black Cotton Soil Belt',
      districts: 'Guntur, Krishna, Prakasam, Kurnool',
      crops: 'Cotton, Teja Chilli, Tobacco, Turmeric',
      fertility: 'High (Clayey Regur, High Moisture Capacity)',
      icon: '🌱',
      waterProfile: 'Canal Irrigation & Deep Borewells',
    },
    {
      id: 'alluvial',
      title: 'Coastal River Delta Zone',
      districts: 'East & West Godavari, Krishna Delta, Nellore',
      crops: 'Sona Masoori Paddy, Sugarcane, Banana, Aquaculture',
      fertility: 'Very High (Mineral Silt & Organic Matter)',
      icon: '🌾',
      waterProfile: 'Perennial Gravity Canals & River Basins',
    },
    {
      id: 'red_loam',
      title: 'Rayalaseema Red Loam Belt',
      districts: 'Anantapur, Kurnool, Kadapa, Chittoor',
      crops: 'Groundnut, Pulses, Mango Orchards, Tomato, Polyhouse',
      fertility: 'Moderate (Porous & Aerated Soil)',
      icon: '🥜',
      waterProfile: 'Micro-Irrigation & High-Yield Borewells',
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-12">
      <div className="p-6 sm:p-8 rounded-3xl bg-forest-950/90 border border-white/10 backdrop-blur-2xl shadow-2xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-6 pb-3 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-mono uppercase font-bold mb-1">
              <Layers className="w-3 h-3" />
              <span>Regional Agronomy Mapping</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
              Andhra Pradesh Agro-Climatic Soil Zones
            </h3>
          </div>
          <span className="text-xs font-mono text-cream-200/50">
            Scientifically matched land classification
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {zones.map((zone) => (
            <div
              key={zone.id}
              onClick={() => {
                setActiveSoilType(zone.id);
                const elem = document.getElementById('parcels-board');
                if (elem) elem.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group p-5 rounded-2xl bg-forest-900/60 hover:bg-forest-900 border border-white/5 hover:border-amber-400/40 transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-3xl">{zone.icon}</span>
                  <span className="px-2 py-0.5 rounded-full bg-white/5 text-amber-300 text-[10px] font-mono font-bold">
                    Filter Zone
                  </span>
                </div>
                <h4 className="text-sm font-bold font-display text-white group-hover:text-amber-300 transition-colors mb-1">
                  {zone.title}
                </h4>
                <div className="space-y-1.5 text-xs font-mono text-cream-200/70 mt-2">
                  <div>
                    <span className="text-cream-200/40 block text-[10px]">Key Districts:</span>
                    <span className="text-white">{zone.districts}</span>
                  </div>
                  <div>
                    <span className="text-cream-200/40 block text-[10px]">Primary Crops:</span>
                    <span className="text-emerald-300 font-bold">{zone.crops}</span>
                  </div>
                  <div>
                    <span className="text-cream-200/40 block text-[10px]">Water Infrastructure:</span>
                    <span className="text-sky-300">{zone.waterProfile}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-amber-400">
                <span>Explore {zone.title.split(' ')[0]} Land</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
