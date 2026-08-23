import React, { useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { usePerformance } from '../../context/PerformanceContext';
import { Activity, Cpu, Droplet, SunMedium, Sparkles } from 'lucide-react';

export const InteractiveHotspots = () => {
  const { setSelectedHotspot } = usePerformance();

  const hotspots = [
    {
      id: 'field-soil',
      pos: [-22, 2.0, 2],
      title: 'IoT Soil Sensor Alpha',
      detail: 'Moisture: 68% (Optimal) | Temp: 24°C | N-P-K: Balanced',
      icon: Activity,
      color: '#22c55e',
    },
    {
      id: 'tractor-telemetry',
      pos: [13.5, 3.2, 8],
      title: 'Autonomous Tractor #07',
      detail: 'Status: Active Row Cultivation | Battery: 92% | Speed: 6.2 km/h',
      icon: Cpu,
      color: '#f59e0b',
    },
    {
      id: 'river-irrigation',
      pos: [-4, 1.8, -12],
      title: 'Smart Irrigation Gate',
      detail: 'Water Flow: 140 L/s | Silt Index: Clean | Canal Flow: Active',
      icon: Droplet,
      color: '#38bdf8',
    },
    {
      id: 'solar-hub',
      pos: [25, 6.2, -5],
      title: 'Solar Ag-Grid Hub',
      detail: 'Generation: 5.4 kW | Grid Export: Active | Clean Efficiency: 96%',
      icon: SunMedium,
      color: '#fbbf24',
    },
  ];

  return (
    <group>
      {hotspots.map((spot) => (
        <HotspotBeacon
          key={spot.id}
          spot={spot}
          onSelect={() => setSelectedHotspot(spot)}
        />
      ))}
    </group>
  );
};

const HotspotBeacon = ({ spot, onSelect }) => {
  const [hovered, setHovered] = useState(false);
  const Icon = spot.icon;

  return (
    <group position={spot.pos}>
      <Html center distanceFactor={28}>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSelect();
          }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className={`group relative flex items-center justify-center transition-all duration-300 transform ${
            hovered ? 'scale-125 z-50' : 'scale-100'
          }`}
          style={{ cursor: 'pointer' }}
          title={spot.title}
        >
          {/* Pulsing Beacon Ring */}
          <span
            className="absolute w-8 h-8 rounded-full animate-ping opacity-60 pointer-events-none"
            style={{ backgroundColor: spot.color }}
          />

          {/* Central Beacon Node */}
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center text-forest-950 font-bold shadow-xl border border-white/40"
            style={{ backgroundColor: spot.color }}
          >
            <Icon className="w-3.5 h-3.5 text-stone-950 stroke-[2.5]" />
          </div>

          {/* Hover Tooltip Card */}
          {hovered && (
            <div className="absolute bottom-9 left-1/2 -translate-x-1/2 w-52 p-2.5 rounded-xl bg-forest-950/95 backdrop-blur-xl border border-emerald-400/40 text-left shadow-2xl pointer-events-none">
              <div className="flex items-center gap-1.5 mb-1">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: spot.color }} />
                <span className="text-[11px] font-bold text-white font-display tracking-tight leading-tight">
                  {spot.title}
                </span>
              </div>
              <p className="text-[10px] text-emerald-200/80 font-mono leading-tight">
                {spot.detail}
              </p>
              <div className="mt-1 text-[9px] text-amber-300/90 font-mono flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5" /> Click for details
              </div>
            </div>
          )}
        </button>
      </Html>
    </group>
  );
};
