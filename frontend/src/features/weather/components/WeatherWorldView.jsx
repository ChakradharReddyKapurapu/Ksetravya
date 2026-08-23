import React from 'react';
import { useWorld } from '../../../context/WorldContext';
import { useWeather } from '../../../context/WeatherContext';
import { WeatherHeader } from './WeatherHeader';
import { WeatherHeroHUD } from './WeatherHeroHUD';
import { WeatherEnvironmentTestBar } from './WeatherEnvironmentTestBar';
import { SunJourneySection } from './SunJourneySection';
import { AgriculturalAdvisorySection } from './AgriculturalAdvisorySection';
import { CartDrawer } from '../../../components/cart/CartDrawer';
import { WeatherWorldCanvas } from '../../../three/weather/WeatherWorldCanvas';
import { CloudSun, Navigation, CloudLightning } from 'lucide-react';

export const WeatherWorldView = () => {
  const { currentWorld } = useWorld();
  const { travelHUDMessage, activeWeatherCondition } = useWeather();

  const isTransitioning =
    currentWorld === 'transition_to_weather' || currentWorld === 'transition_to_farm';

  return (
    <div className="relative min-h-screen bg-[#070e14] text-cream-100 selection:bg-sky-500/30 selection:text-white">
      {/* Top Fixed Header */}
      <WeatherHeader />

      {/* Travel HUD Toast */}
      {travelHUDMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-top-4 duration-300 pointer-events-auto">
          <div className="flex items-center gap-2 px-5 py-2 rounded-full bg-sky-500 text-stone-950 font-display font-bold text-xs shadow-2xl border border-sky-300">
            <Navigation className="w-4 h-4 animate-spin text-stone-950" />
            <span>{travelHUDMessage}</span>
          </div>
        </div>
      )}

      {/* Cinematic Transition Overlay */}
      {isTransitioning && (
        <div className="fixed inset-0 z-50 pointer-events-none flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm transition-all duration-300">
          <div className="p-6 rounded-3xl bg-forest-950/95 border border-sky-400/50 shadow-2xl flex flex-col items-center text-center max-w-sm">
            <div className="w-12 h-12 rounded-2xl bg-sky-500/20 border border-sky-400/40 flex items-center justify-center text-sky-300 mb-3 animate-spin">
              <CloudSun className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold font-display text-white">
              {currentWorld === 'transition_to_weather'
                ? 'Entering Live Atmospheric Weather...'
                : 'Returning to Farm...'}
            </h3>
            <p className="text-xs text-sky-300/80 font-mono mt-1">
              Syncing with Open-Meteo satellite sensors & farm atmosphere
            </p>
          </div>
        </div>
      )}

      {/* 3D Fixed Viewport Background */}
      <div className="fixed inset-0 z-0 pointer-events-auto">
        <WeatherWorldCanvas />
        <div className="absolute inset-0 bg-gradient-to-b from-[#070e14]/20 via-[#070e14]/40 to-[#070e14]/90 pointer-events-none" />
      </div>

      {/* Scrollable Content Layers */}
      <div className="relative z-10 pt-16 pb-20">
        {/* Stage 1: Main Weather Hero HUD (Matching media_1787413283742.png) */}
        <WeatherHeroHUD />

        {/* Stage 2: Atmosphere Condition Switcher */}
        <WeatherEnvironmentTestBar />

        {/* Stage 3: Sun Journey & Photoperiod */}
        <SunJourneySection />

        {/* Stage 4: Agricultural Operational Advisories */}
        <AgriculturalAdvisorySection />
      </div>

      {/* Modals & Cart Drawer */}
      <CartDrawer />

      {/* Footer */}
      <footer className="relative z-20 border-t border-white/10 bg-forest-950/95 backdrop-blur-xl py-12 px-4 text-xs text-cream-200/60 font-mono">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-white font-display font-semibold">
            <CloudLightning className="w-4 h-4 text-sky-400" />
            <span>AGRI NEXUS</span>
            <span className="text-sky-400 text-[10px]">LIVE ATMOSPHERIC WEATHER ENGINE</span>
          </div>
          <p>
            Live weather data provided by <strong>Open-Meteo API</strong>. Agricultural insights are indicative operational guidelines.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-[10px] text-sky-400 hover:underline cursor-pointer"
          >
            Back to Top ↑
          </button>
        </div>
      </footer>
    </div>
  );
};
