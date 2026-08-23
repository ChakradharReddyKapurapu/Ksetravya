import React, { useState } from 'react';
import { Html } from '@react-three/drei';
import { usePerformance } from '../../context/PerformanceContext';
import { Map, CheckCircle2, Sprout } from 'lucide-react';

export const LandPlotsZone = () => {
  const { setSelectedHotspot } = usePerformance();
  const [hoveredPlot, setHoveredPlot] = useState(null);

  const plots = [
    {
      id: 'plot1',
      name: 'Plot A: Alluvial Loam Acreage',
      size: '12 Acres',
      soil: 'Rich Alluvial Loam (pH 6.8)',
      water: 'Canal & Borewell 24/7',
      rent: '₹35,000 / acre / year',
      pos: [-24, 0.45, -20],
      color: '#365314', // Rich green
    },
    {
      id: 'plot2',
      name: 'Plot B: Terraced Hillside',
      size: '8.5 Acres',
      soil: 'Red Laterite Clay',
      water: 'Drip System Connected',
      rent: '₹26,000 / acre / year',
      pos: [-36, 1.2, -14],
      color: '#854d0e', // Earth terracotta
    },
    {
      id: 'plot3',
      name: 'Plot C: Fruit Orchard Grove',
      size: '15 Acres',
      soil: 'Sandy Clay Loam',
      water: 'Solar Drip Feeder',
      rent: '₹42,000 / acre / year',
      pos: [-28, 0.6, -34],
      color: '#15803d', // Deep green
    },
  ];

  return (
    <group>
      {plots.map((plot) => (
        <group
          key={plot.id}
          position={plot.pos}
          onPointerOver={() => setHoveredPlot(plot.id)}
          onPointerOut={() => setHoveredPlot(null)}
          onClick={() =>
            setSelectedHotspot({
              title: plot.name,
              detail: `${plot.size} • Soil: ${plot.soil} • Rent: ${plot.rent}`,
            })
          }
          className="cursor-pointer"
        >
          {/* Plot Boundary Border Line */}
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[11, 11]} />
            <meshStandardMaterial
              color={plot.color}
              roughness={0.9}
              transparent
              opacity={0.35}
            />
          </mesh>

          {/* 4 Corner Boundary Survey Posts */}
          {[
            [-5.2, 0.5, -5.2],
            [5.2, 0.5, -5.2],
            [-5.2, 0.5, 5.2],
            [5.2, 0.5, 5.2],
          ].map((cPos, cIdx) => (
            <mesh key={cIdx} position={cPos} castShadow>
              <cylinderGeometry args={[0.08, 0.08, 1.0, 6]} />
              <meshStandardMaterial color="#f8fafc" />
            </mesh>
          ))}

          {/* Floating Land Telemetry Beacon */}
          <Html position={[0, 2.2, 0]} center distanceFactor={28}>
            <div
              onMouseEnter={() => setHoveredPlot(plot.id)}
              onMouseLeave={() => setHoveredPlot(null)}
              onClick={() =>
                setSelectedHotspot({
                  title: plot.name,
                  detail: `${plot.size} • Soil: ${plot.soil} • Rent: ${plot.rent}`,
                })
              }
              className="group relative cursor-pointer"
            >
              <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-stone-950 shadow-xl border border-white/50 animate-pulse">
                <Map className="w-3.5 h-3.5" />
              </div>
              {hoveredPlot === plot.id && (
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-52 p-2.5 rounded-xl bg-forest-950/95 border border-emerald-400/60 shadow-2xl backdrop-blur-xl text-left pointer-events-none">
                  <span className="text-[11px] font-bold text-white block">{plot.name}</span>
                  <span className="text-[9px] text-emerald-300 font-mono block mt-0.5">
                    {plot.size} • {plot.soil}
                  </span>
                  <span className="text-[9px] text-amber-300 font-mono block">
                    {plot.rent}
                  </span>
                </div>
              )}
            </div>
          </Html>
        </group>
      ))}
    </group>
  );
};
