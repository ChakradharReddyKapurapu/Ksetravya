import React from 'react';
import { usePerformance } from '../../context/PerformanceContext';
import { Camera, Sun, Sunset, Sunrise, Droplet, Wind, Compass, Sparkles } from 'lucide-react';

export const QuickTelemetryBar = () => {
  const { cameraView, setCameraView, timeOfDay, setTimeOfDay, selectedHotspot, setSelectedHotspot } = usePerformance();

  const cameraAngles = [
    { id: 'overview', label: 'Panoramic View' },
    { id: 'fields', label: 'Crop Rows' },
    { id: 'river', label: 'River Basin' },
    { id: 'farmhouse', label: 'Farmstead & Tech' },
  ];

  const timeModes = [
    { id: 'sunrise', label: 'Sunrise', icon: Sunrise },
    { id: 'morning', label: 'Daylight', icon: Sun },
    { id: 'golden', label: 'Golden Hour', icon: Sunset },
  ];

  return (
    <aside aria-label="Agricultural Telemetry and Camera Controls" className="fixed bottom-4 left-4 right-4 z-30 pointer-events-none max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
      {/* Viewpoint Switcher */}
      <div className="pointer-events-auto flex items-center gap-1.5 p-1.5 rounded-2xl bg-forest-950/85 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/60">
        <div className="flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono uppercase text-emerald-400 border-r border-white/10 hidden sm:flex">
          <Compass className="w-3.5 h-3.5" />
          <span>Camera</span>
        </div>
        {cameraAngles.map((angle) => (
          <button
            key={angle.id}
            onClick={() => {
              setCameraView(angle.id);
              setSelectedHotspot(null);
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 ${
              cameraView === angle.id
                ? 'bg-emerald-500/25 text-emerald-200 border border-emerald-400/40 shadow-sm'
                : 'text-cream-200/70 hover:text-white hover:bg-white/5'
            }`}
          >
            {angle.label}
          </button>
        ))}
      </div>

      {/* Selected Hotspot Toast Indicator if active */}
      {selectedHotspot && (
        <div className="pointer-events-auto flex items-center gap-3 px-4 py-2 rounded-2xl bg-emerald-950/90 backdrop-blur-xl border border-emerald-400/50 shadow-2xl animate-in fade-in slide-in-from-bottom-2">
          <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-white">{selectedHotspot.title}</span>
            <span className="text-[10px] text-emerald-300/80 font-mono">{selectedHotspot.detail}</span>
          </div>
          <button
            onClick={() => setSelectedHotspot(null)}
            className="text-[10px] px-2 py-0.5 rounded bg-white/10 text-white hover:bg-white/20"
          >
            Clear
          </button>
        </div>
      )}

      {/* Time of Day Atmosphere Switcher */}
      <div className="pointer-events-auto flex items-center gap-1 p-1.5 rounded-2xl bg-forest-950/85 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/60">
        <span className="text-[11px] font-mono uppercase text-amber-400 px-2 hidden sm:inline">Lighting</span>
        {timeModes.map((mode) => {
          const Icon = mode.icon;
          const isSelected = timeOfDay === mode.id;
          return (
            <button
              key={mode.id}
              onClick={() => setTimeOfDay(mode.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 ${
                isSelected
                  ? 'bg-amber-500/25 text-amber-200 border border-amber-400/40 shadow-sm'
                  : 'text-cream-200/70 hover:text-white hover:bg-white/5'
              }`}
              title={`Switch atmosphere to ${mode.label}`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{mode.label}</span>
            </button>
          );
        })}
      </div>
    </aside>
  );
};
