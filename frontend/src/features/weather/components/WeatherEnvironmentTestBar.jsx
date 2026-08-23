import React from 'react';
import { useWeather } from '../../../context/WeatherContext';
import { Sparkles, RefreshCw, Zap } from 'lucide-react';

export const WeatherEnvironmentTestBar = () => {
  const {
    activeWeatherCondition,
    isManualOverride,
    setConditionOverride,
    resetToLiveCondition,
    currentLocation,
  } = useWeather();

  const conditions = [
    { id: 'thunderstorm', label: 'Thunderstorm', icon: '⛈️' },
    { id: 'rain', label: 'Heavy Rain', icon: '🌧️' },
    { id: 'cloudy', label: 'Overcast', icon: '☁️' },
    { id: 'partly_cloudy', label: 'Partly Cloudy', icon: '🌤️' },
    { id: 'clear', label: 'Sunny / Clear', icon: '☀️' },
    { id: 'fog', label: 'Atmospheric Fog', icon: '🌫️' },
    { id: 'night', label: 'Clear Night', icon: '🌙' },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-8">
      <div className="p-4 rounded-3xl bg-forest-950/90 border border-white/10 backdrop-blur-2xl shadow-xl flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-sky-500/20 text-sky-300 flex items-center justify-center text-sm">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] font-mono text-sky-400 font-bold uppercase tracking-wider block">
              3D ATMOSPHERE ENGINE PREVIEW
            </span>
            <span className="text-xs font-bold font-display text-white">
              {isManualOverride ? `Previewing: ${activeWeatherCondition.toUpperCase()}` : `Live API Sync: ${currentLocation.name}`}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none max-w-full pb-1 sm:pb-0">
          {conditions.map((c) => {
            const isSelected = activeWeatherCondition === c.id;

            return (
              <button
                key={c.id}
                onClick={() => setConditionOverride(c.id)}
                className={`px-3 py-1 rounded-full text-xs font-display flex items-center gap-1 transition-all cursor-pointer whitespace-nowrap ${
                  isSelected
                    ? 'bg-sky-500 text-stone-950 font-bold shadow-md'
                    : 'bg-white/5 hover:bg-white/10 text-cream-200/70'
                }`}
              >
                <span>{c.icon}</span>
                <span>{c.label}</span>
              </button>
            );
          })}

          {isManualOverride && (
            <button
              onClick={resetToLiveCondition}
              className="px-3 py-1 rounded-full bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-400/40 text-xs font-display font-semibold flex items-center gap-1 cursor-pointer whitespace-nowrap"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Reset to Live</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
