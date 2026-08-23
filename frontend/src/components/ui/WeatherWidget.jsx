import React from 'react';
import { Sun, Wind, Droplets, CloudRain, Cloud, MapPin, ArrowRight, RefreshCw } from 'lucide-react';
import { usePerformance } from '../../context/PerformanceContext';

export const WeatherWidget = ({ className = '' }) => {
  const { weatherState, cycleWeather } = usePerformance();

  const weatherData = {
    sunny: {
      temp: '28°C',
      condition: 'Sunny',
      icon: Sun,
      iconColor: 'text-amber-400',
      iconBg: 'bg-amber-500/20 border-amber-400/40 text-amber-300',
      humidity: '62%',
      wind: '12 km/h',
      rain: '10%',
      advisory: 'Optimal weather for harvesting and drying grains.',
    },
    rainy: {
      temp: '22°C',
      condition: 'Rain Shower',
      icon: CloudRain,
      iconColor: 'text-sky-400',
      iconBg: 'bg-sky-500/20 border-sky-400/40 text-sky-300',
      humidity: '92%',
      wind: '24 km/h',
      rain: '85%',
      advisory: 'Natural irrigation active. Postpone chemical spray.',
    },
    cloudy: {
      temp: '25°C',
      condition: 'Partly Cloudy',
      icon: Cloud,
      iconColor: 'text-slate-300',
      iconBg: 'bg-slate-500/20 border-slate-400/40 text-slate-200',
      humidity: '74%',
      wind: '16 km/h',
      rain: '30%',
      advisory: 'Mild solar radiation. Suitable for drone crop mapping.',
    },
  }[weatherState];

  const CurrentIcon = weatherData.icon;

  return (
    <div
      className={`relative w-72 sm:w-80 p-5 rounded-2xl glass-weather text-cream-100 shadow-2xl transition-all duration-300 hover:border-amber-400/50 ${className}`}
    >
      {/* Top Header: Sun/Rain Icon + Temperature & Location */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <button
            onClick={cycleWeather}
            className={`relative flex items-center justify-center w-12 h-12 rounded-xl border shadow-inner transition-transform hover:scale-105 cursor-pointer ${weatherData.iconBg}`}
            title="Click to cycle live 3D weather (Sunny / Rainy / Cloudy)"
          >
            <CurrentIcon className={`w-7 h-7 ${weatherData.iconColor} animate-pulse`} />
            <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 text-stone-950 flex items-center justify-center text-[9px] font-bold">
              <RefreshCw className="w-2.5 h-2.5" />
            </div>
          </button>
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold font-display text-white">{weatherData.temp}</span>
              <span className="text-xs text-amber-300 font-medium">{weatherData.condition}</span>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-cream-200/70 font-body mt-0.5">
              <MapPin className="w-3 h-3 text-emerald-400" />
              <span>Andhra Pradesh, India</span>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Row: Humidity, Wind, Rain Probability */}
      <div className="grid grid-cols-3 gap-2 py-3 border-y border-white/10 text-center font-mono">
        <div>
          <span className="text-[10px] text-cream-200/60 uppercase block">Humidity</span>
          <span className="text-xs font-semibold text-white mt-0.5 block">{weatherData.humidity}</span>
        </div>
        <div>
          <span className="text-[10px] text-cream-200/60 uppercase block">Wind</span>
          <span className="text-xs font-semibold text-white mt-0.5 block">{weatherData.wind}</span>
        </div>
        <div>
          <span className="text-[10px] text-cream-200/60 uppercase block">Rain</span>
          <span className="text-xs font-semibold text-emerald-300 mt-0.5 block">{weatherData.rain}</span>
        </div>
      </div>

      {/* Live AI Advisory Tip */}
      <p className="text-[11px] text-cream-200/75 font-body mt-2.5 leading-tight italic">
        💡 {weatherData.advisory}
      </p>

      {/* Action Link: Cycle Weather & Full Forecast */}
      <button
        onClick={cycleWeather}
        className="w-full mt-3 py-2 px-3 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-400/30 hover:border-amber-400/60 text-amber-200 text-xs font-medium font-display flex items-center justify-center gap-1.5 transition-all duration-200 group cursor-pointer"
      >
        <span>Toggle Live 3D Weather ({weatherState.toUpperCase()})</span>
        <RefreshCw className="w-3 h-3 group-hover:rotate-180 transition-transform duration-500" />
      </button>
    </div>
  );
};
