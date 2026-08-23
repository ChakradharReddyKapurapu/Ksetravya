import React, { useState, useEffect } from 'react';
import { useWeather } from '../../../context/WeatherContext';
import { useFarmContext } from '../../../context/FarmContext';
import {
  MapPin,
  Clock,
  Search,
  Navigation,
  Wind,
  Droplets,
  Cloud,
  Eye,
  Thermometer,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  AlertTriangle,
  Sprout,
} from 'lucide-react';

export const WeatherHeroHUD = () => {
  const {
    currentLocation,
    liveWeatherData,
    isLoading,
    errorMessage,
    searchQuery,
    searchResults,
    isSearching,
    districtPresets,
    useBrowserLocation,
    selectCity,
    handleSearchInput,
    setConditionOverride,
    resetToLiveCondition,
    activeWeatherCondition,
    isManualOverride,
  } = useWeather();
  const { farm, openMyFarmModal } = useFarmContext();

  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' IST');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  if (isLoading && !liveWeatherData) {
    return (
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <div className="p-8 rounded-3xl bg-forest-950/80 border border-white/10 max-w-md mx-auto space-y-4">
          <div className="w-12 h-12 rounded-full border-2 border-sky-400 border-t-transparent animate-spin mx-auto" />
          <h3 className="text-base font-bold font-display text-white">Fetching weather information...</h3>
          <p className="text-xs text-cream-200/60 font-body">Connecting to live Doppler meteorological stations.</p>
        </div>
      </div>
    );
  }

  if (errorMessage && !liveWeatherData) {
    return (
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <div className="p-8 rounded-3xl bg-forest-950/80 border border-rose-500/30 max-w-md mx-auto space-y-4">
          <div className="w-12 h-12 rounded-full bg-rose-500/20 border border-rose-400/40 flex items-center justify-center mx-auto text-rose-400">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold font-display text-white">Unable to Load Weather Feed</h3>
          <p className="text-xs text-rose-200/70 font-body">{errorMessage}</p>
          <button
            onClick={() => selectCity('Tirupati')}
            className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold text-xs font-display cursor-pointer"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const { current, hourly, daily, insights } = liveWeatherData;
  const primaryInsight = insights[0] || {
    title: 'FAVORABLE AGRICULTURAL CONDITIONS',
    detail: 'Current atmospheric conditions appear optimal for farm operations.',
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-10 pointer-events-none">
      {/* =========================================================
          TOP BADGES: LOCATION (Left) & FARM SYNC / LIVE CLOCK (Right)
         ========================================================= */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6 pointer-events-auto">
        {/* Top-Left Location Badge */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-forest-950/85 border border-white/15 backdrop-blur-xl shadow-2xl text-xs font-mono text-white">
            <MapPin className="w-4 h-4 text-rose-400 flex-shrink-0 animate-bounce" />
            <span className="text-cream-200/50 uppercase">LOCATION |</span>
            <span className="font-bold font-display text-white">{currentLocation.name}, {currentLocation.state}</span>
          </div>

          <button
            onClick={openMyFarmModal}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/40 text-xs font-mono text-emerald-300 transition-colors cursor-pointer"
            title="Configure Farm Location"
          >
            <Sprout className="w-3.5 h-3.5 text-emerald-400" />
            <span>Farm: {farm.district} ({farm.landArea}ac {farm.currentCrop})</span>
          </button>
        </div>

        {/* Top-Right Live Clock Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-forest-950/85 border border-white/15 backdrop-blur-xl shadow-2xl text-xs font-mono text-sky-300">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-cream-200/50 uppercase">LIVE DATA |</span>
          <span className="font-bold">{timeStr || '19:42 PM IST'}</span>
        </div>
      </div>

      {/* =========================================================
          MAIN HERO GRID (Exact Layout matching media_1787413283742.png)
         ========================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* =========================================================
            LEFT COLUMN (7 COLS): Hero Banner, Search Bar, Hourly Strip
           ========================================================= */}
        <div className="lg:col-span-7 space-y-5 pointer-events-auto">
          {/* 1. Main Weather Hero Card */}
          <div className="p-6 sm:p-7 rounded-3xl bg-forest-950/85 border border-white/15 backdrop-blur-2xl shadow-2xl flex items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-amber-300 uppercase font-bold mb-1">
                <span>🌤️</span>
                <span>WEATHER AROUND YOU:</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black font-display text-white tracking-tight leading-tight">
                {current.parsedCondition.label}
              </h1>
              <div className="flex items-baseline gap-3 mt-1 font-mono">
                <span className="text-3xl sm:text-4xl font-black font-display text-white">
                  {current.temperature}°C
                </span>
                <span className="text-xs text-cream-200/60">
                  Feels like <strong className="text-cream-100">{current.apparentTemperature}°C</strong>
                </span>
              </div>
            </div>

            {/* Weather Condition Icon */}
            <div className="text-5xl sm:text-6xl flex-shrink-0 animate-bounce duration-1000">
              {current.parsedCondition.icon}
            </div>
          </div>

          {/* 2. Location Search Bar with Quick City Buttons */}
          <div className="p-4 rounded-3xl bg-forest-950/85 border border-white/15 backdrop-blur-2xl shadow-xl space-y-3">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-cream-200/70 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-rose-400" />
                <span>Location Search (USE MY LOCATION | {currentLocation.name} (Selected))</span>
              </span>
              <button
                onClick={useBrowserLocation}
                className="text-[10px] text-sky-400 hover:text-sky-300 font-bold underline cursor-pointer"
              >
                Use GPS
              </button>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-cream-200/50" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearchInput(e.target.value)}
                placeholder="Search city / mandal (Tirupati, Guntur, Vijayawada, Kurnool, Nellore, Hyderabad...)"
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-forest-900/90 border border-white/10 text-xs text-white placeholder:text-cream-200/40 focus:outline-none focus:border-sky-400 font-body"
              />
            </div>

            {/* Search Autocomplete Results Dropdown */}
            {searchResults.length > 0 && (
              <div className="p-2 rounded-xl bg-forest-900 border border-white/10 space-y-1">
                {searchResults.map((city) => (
                  <button
                    key={city.id}
                    onClick={() => selectCity(city)}
                    className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-white/10 text-xs font-mono text-cream-100 flex items-center justify-between cursor-pointer"
                  >
                    <span>{city.name}, {city.state || city.country}</span>
                    <span className="text-[10px] text-sky-400">Select →</span>
                  </button>
                ))}
              </div>
            )}

            {/* Quick District Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pt-1">
              {districtPresets.map((preset) => {
                const isSelected = currentLocation.name === preset.name;

                return (
                  <button
                    key={preset.id}
                    onClick={() => selectCity(preset)}
                    className={`px-3 py-1 rounded-full text-[11px] font-mono whitespace-nowrap transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-sky-500 text-stone-950 font-bold shadow-md'
                        : 'bg-white/5 hover:bg-white/10 text-cream-200/70'
                    }`}
                  >
                    {preset.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Hourly Forecast Horizontal Strip (Matching media_1787413283742.png) */}
          <div className="p-5 sm:p-6 rounded-3xl bg-forest-950/85 border border-white/15 backdrop-blur-2xl shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono text-sky-300 font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-sky-400" />
                <span>HOURLY FORECAST</span>
              </span>
              <span className="text-[10px] font-mono text-cream-200/50">Next 12 Hours</span>
            </div>

            <div className="flex items-center gap-3 overflow-x-auto scrollbar-none pb-1">
              {hourly.map((hour, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white/5 border border-white/5 min-w-[72px] flex-shrink-0 text-center font-mono space-y-1.5"
                >
                  <span className="text-[10px] text-cream-200/60 uppercase">{hour.time}</span>
                  <span className="text-2xl">{hour.icon}</span>
                  <span className="text-sm font-bold text-white">{hour.temp}°C</span>
                  {hour.rainProb > 0 && (
                    <span className="text-[9px] text-sky-400 font-semibold">{hour.rainProb}%</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* =========================================================
            RIGHT COLUMN (5 COLS): Current Conditions, 7-Day, Insights
           ========================================================= */}
        <div className="lg:col-span-5 space-y-5 pointer-events-auto">
          {/* 1. Current Conditions Panel (Matching media_1787413283742.png) */}
          <div className="p-6 rounded-3xl bg-forest-950/85 border border-white/15 backdrop-blur-2xl shadow-2xl space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <span className="font-bold text-white font-display text-sm tracking-wide">
                Current Conditions Panel
              </span>
              <span className="text-[10px] text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded-full border border-sky-400/20">
                LIVE SENSORS
              </span>
            </div>

            <div className="space-y-2 text-cream-200/90">
              <div className="flex items-center justify-between">
                <span className="text-cream-200/60">Temp:</span>
                <span className="text-white font-bold">{current.temperature}°C</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-cream-200/60">Humidity:</span>
                <span className="text-sky-300 font-bold">{current.humidity}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-cream-200/60">Wind:</span>
                <span className="text-emerald-300 font-bold flex items-center gap-1">
                  <span>{current.windSpeed} km/h {current.windCompass}</span>
                  <span>🎏</span>
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-cream-200/60">Cloud Cover:</span>
                <span className="text-white font-bold">{current.cloudCover}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-cream-200/60">Precipitation:</span>
                <span className="text-rose-300 font-bold">{current.precipitation.toFixed(1)}mm</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-cream-200/60">Visibility:</span>
                <span className="text-white font-bold">{current.visibilityKm} km</span>
              </div>
            </div>
          </div>

          {/* 2. 7-Day Forecast Card (Matching media_1787413283742.png) */}
          <div className="p-6 rounded-3xl bg-forest-950/85 border border-white/15 backdrop-blur-2xl shadow-2xl space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <span className="font-bold text-white font-display text-sm tracking-wide">
                7-DAY FORECAST
              </span>
              <span className="text-[10px] text-cream-200/50">Daily Outlook</span>
            </div>

            <div className="grid grid-cols-5 gap-2 text-center">
              {daily.slice(0, 5).map((d, idx) => (
                <div key={idx} className="p-2 rounded-2xl bg-white/5 space-y-1 flex flex-col items-center justify-between">
                  <span className="text-[10px] text-cream-200/60">{d.day.split(' ')[0]}</span>
                  <span className="text-xl">{d.icon}</span>
                  <span className="text-[11px] font-bold text-white">{d.maxTemp}/{d.minTemp}°C</span>
                  <span className="text-[9px] text-sky-400">{d.rainProb}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Farm Weather Insights Card (Matching media_1787413283742.png) */}
          <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-forest-950/90 via-forest-900/90 to-forest-950 border border-amber-400/40 shadow-2xl space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-mono text-amber-300 font-bold uppercase">
              <span>🌾</span>
              <span>FARM WEATHER INSIGHTS</span>
            </div>

            <p className="text-xs text-cream-100 font-body leading-relaxed">
              <strong>{primaryInsight.title}:</strong> {primaryInsight.detail}
            </p>

            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-cream-200/50">
              <span>Powered by Open-Meteo API</span>
              <span className="text-amber-400">Indicative Guidance</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
