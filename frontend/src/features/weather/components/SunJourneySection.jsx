import React from 'react';
import { useWeather } from '../../../context/WeatherContext';
import { Sunrise, Sunset, Sun, Moon, Sparkles } from 'lucide-react';

export const SunJourneySection = () => {
  const { liveWeatherData } = useWeather();
  if (!liveWeatherData) return null;

  const { sunrise, sunset, current } = liveWeatherData;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-10">
      <div className="p-6 sm:p-8 rounded-3xl bg-forest-950/90 border border-white/10 backdrop-blur-2xl shadow-2xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-6 pb-3 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-mono uppercase font-bold mb-1">
              <Sun className="w-3 h-3" />
              <span>Solar Day Cycle</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
              Sun Journey & Photoperiod Timeline
            </h3>
          </div>
          <span className="text-xs font-mono text-cream-200/50">
            Optimal solar radiation hours for photosynthesis
          </span>
        </div>

        {/* Solar Journey Arc Representation */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
          <div className="p-5 rounded-2xl bg-forest-900/70 border border-white/5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-300 flex items-center justify-center text-2xl flex-shrink-0">
              <Sunrise className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] text-cream-200/50 uppercase block">MORNING DAWN</span>
              <span className="text-lg font-black text-white">{sunrise}</span>
              <span className="text-[10px] text-emerald-400 block">Sunrise Lighting</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-forest-900/70 border border-white/5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-sky-500/20 text-sky-300 flex items-center justify-center text-2xl flex-shrink-0">
              <Sun className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] text-cream-200/50 uppercase block">SOLAR NOON</span>
              <span className="text-lg font-black text-white">12:15 PM</span>
              <span className="text-[10px] text-amber-300 block">Peak UV Index: 8.5 (High)</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-forest-900/70 border border-white/5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/20 text-rose-300 flex items-center justify-center text-2xl flex-shrink-0">
              <Sunset className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] text-cream-200/50 uppercase block">EVENING DUSK</span>
              <span className="text-lg font-black text-white">{sunset}</span>
              <span className="text-[10px] text-rose-300 block">Golden Hour Sunset</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
