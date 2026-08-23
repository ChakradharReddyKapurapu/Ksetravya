import React from 'react';
import { useTools, ROAD_ZONES } from '../../../context/ToolsContext';
import { Compass, ArrowRight } from 'lucide-react';

export const ToolsRoadmapNav = () => {
  const { activeRoadZone, flyToZone, roadProgress } = useTools();

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 max-w-5xl w-[94%] pointer-events-none">
      <div className="p-2 sm:p-2.5 rounded-full bg-forest-950/90 border border-white/15 backdrop-blur-2xl shadow-2xl flex items-center justify-between gap-1 pointer-events-auto overflow-x-auto scrollbar-none">
        <div className="hidden md:flex items-center gap-1.5 px-3 py-1 text-emerald-400 font-mono text-[10px] uppercase font-bold border-r border-white/10 flex-shrink-0">
          <Compass className="w-3.5 h-3.5 animate-spin" />
          <span>Roadway: {Math.round(roadProgress * 100)}%</span>
        </div>

        {/* 10 Zone Buttons */}
        <div className="flex items-center gap-1 overflow-x-auto scrollbar-none py-0.5">
          {ROAD_ZONES.map((zone, idx) => {
            const isActive = activeRoadZone === idx;

            return (
              <button
                key={zone.id}
                onClick={() => flyToZone(idx)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-semibold transition-all duration-300 whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-amber-500 text-stone-950 font-bold shadow-lg scale-105'
                    : 'bg-white/5 hover:bg-white/15 text-cream-200/70 hover:text-white'
                }`}
                title={zone.desc}
              >
                <span>{zone.icon}</span>
                <span className="text-[11px] font-display">{zone.num} {zone.title}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
