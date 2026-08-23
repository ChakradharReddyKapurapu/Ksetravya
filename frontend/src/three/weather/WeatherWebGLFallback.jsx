import React from 'react';
import { CloudRain, Zap, Sun, Cloud } from 'lucide-react';
import { useWeather } from '../../context/WeatherContext';

export const WeatherWebGLFallback = () => {
  const { activeWeatherCondition, currentLocation } = useWeather();
  const isStorm = activeWeatherCondition === 'thunderstorm';
  const isRainy = activeWeatherCondition === 'rain' || isStorm;

  return (
    <div className={`relative w-full h-full min-h-[700px] overflow-hidden flex items-center justify-center select-none ${
      isStorm
        ? 'bg-gradient-to-b from-[#0a1118] via-[#0f172a] to-[#020617]'
        : isRainy
        ? 'bg-gradient-to-b from-[#1e293b] via-[#0f172a] to-[#064e3b]'
        : 'bg-gradient-to-b from-[#0284c7] via-[#0369a1] to-[#14532d]'
    }`}>
      {/* Falling Rain CSS Streaks */}
      {isRainy && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(24)].map((_, i) => (
            <div
              key={i}
              className="absolute w-[2px] h-12 bg-sky-300/40 rounded-full animate-rain"
              style={{
                top: `${(i * 13) % 80}%`,
                left: `${(i * 4.2) % 95}%`,
                animationDuration: `${0.6 + (i % 4) * 0.15}s`,
                animationDelay: `${(i * 0.08).toFixed(2)}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Farmland Horizon SVG */}
      <svg
        className="absolute bottom-0 w-full h-auto text-[#052e16] pointer-events-none opacity-90"
        viewBox="0 0 1440 320"
        fill="currentColor"
        preserveAspectRatio="none"
      >
        <path d="M0,180 L240,240 L480,160 L720,220 L960,170 L1200,230 L1440,190 L1440,320 L0,320 Z" />
      </svg>

      {/* Status Badge */}
      <div className="absolute top-28 left-6 z-20 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest-950/85 border border-sky-400/30 text-xs font-mono text-sky-300 backdrop-blur-md shadow-2xl">
        <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping" />
        <span>Weather 2D Viewport: {currentLocation.name} ({activeWeatherCondition.toUpperCase()})</span>
      </div>
    </div>
  );
};
