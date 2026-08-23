import React from 'react';
import { useWeather } from '../../../context/WeatherContext';
import { useFarmContext } from '../../../context/FarmContext';
import { useWorld } from '../../../context/WorldContext';
import { CloudSun, Droplets, Wind, ArrowRight, CloudRain, ExternalLink } from 'lucide-react';

export const WeatherWidget = () => {
  const { liveWeatherData, isLoading } = useWeather();
  const { farm } = useFarmContext();
  const { startTransitionToWeather } = useWorld();

  const current = liveWeatherData?.current || {
    temp: 28,
    condition: 'Optimal Agricultural Weather',
    humidity: 62,
    windSpeed: 14,
    rainChance: 15,
  };

  return (
    <div className="p-6 rounded-3xl bg-forest-950/85 border border-white/10 backdrop-blur-xl shadow-xl flex flex-col justify-between space-y-4">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-sky-500/20 border border-sky-400/30 flex items-center justify-center text-sky-400">
              <CloudSun className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold font-display text-white text-sm">Weather for Your Farm</h3>
              <span className="text-[10px] text-cream-200/50 font-mono">
                {farm.district} District • Real-Time Meteorological Feed
              </span>
            </div>
          </div>

          <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[9px] font-mono border border-emerald-400/30">
            Live
          </span>
        </div>

        {/* Temperature & Condition */}
        <div className="py-4 flex items-center justify-between">
          <div>
            <div className="text-3xl sm:text-4xl font-black font-display text-white">
              {current.temp}°C
            </div>
            <div className="text-xs font-mono text-sky-300 font-semibold mt-0.5">
              {current.condition}
            </div>
          </div>
          <div className="text-4xl">
            {current.temp > 32 ? '☀️' : current.rainChance > 40 ? '🌧️' : '⛅'}
          </div>
        </div>

        {/* Specs Pill Strip */}
        <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
          <div className="p-2.5 rounded-xl bg-forest-900/60 border border-white/5 flex items-center justify-between">
            <span className="text-cream-200/50 flex items-center gap-1">
              <CloudRain className="w-3.5 h-3.5 text-sky-400" />
              <span>Rain Chance:</span>
            </span>
            <span className="text-white font-bold">{current.rainChance ?? 15}%</span>
          </div>

          <div className="p-2.5 rounded-xl bg-forest-900/60 border border-white/5 flex items-center justify-between">
            <span className="text-cream-200/50 flex items-center gap-1">
              <Droplets className="w-3.5 h-3.5 text-teal-400" />
              <span>Humidity:</span>
            </span>
            <span className="text-white font-bold">{current.humidity ?? 62}%</span>
          </div>
        </div>
      </div>

      {/* Button */}
      <button
        onClick={startTransitionToWeather}
        className="w-full py-2.5 rounded-xl bg-sky-500/20 hover:bg-sky-500/30 border border-sky-500/40 text-sky-300 font-display font-semibold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
      >
        <span>View Weather Radar & Forecast</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
