import React from 'react';
import { Html } from '@react-three/drei';
import { useTools } from '../../../context/ToolsContext';
import { TOOLS_DATA } from '../../../features/tools/data/demoToolsData';
import { Star } from 'lucide-react';

export const Zone03Seeding = () => {
  const { setSelectedTool } = useTools();
  const seedTool = TOOLS_DATA.find((t) => t.id === 'national-seed-drill') || TOOLS_DATA[0];

  return (
    <group position={[-7.5, 0, -4]}>
      {/* Sowing Rows Soil Bed */}
      <mesh position={[0, 0.05, 0]} receiveShadow>
        <boxGeometry args={[11, 0.1, 10]} />
        <meshStandardMaterial color="#301404" roughness={0.9} />
      </mesh>

      {/* Sowing Seed Lines with Emerging Green Sprouts */}
      {[-3, -1, 1, 3].map((sx, si) => (
        <group key={si} position={[sx, 0.1, 0]}>
          {[...Array(6)].map((_, pi) => (
            <mesh key={pi} position={[0, 0.25, -4 + pi * 1.6]} castShadow>
              <sphereGeometry args={[0.16, 8, 8]} />
              <meshStandardMaterial color="#4ade80" />
            </mesh>
          ))}
        </group>
      ))}

      {/* Precision Seed Drill Hopper */}
      <group position={[0, 0.3, 0]}>
        <mesh position={[0, 0.9, 0]} castShadow receiveShadow>
          <boxGeometry args={[3.2, 0.8, 0.9]} />
          <meshStandardMaterial color="#eab308" metalness={0.3} />
        </mesh>
        {/* Planting Tynes */}
        {[-1.2, -0.6, 0, 0.6, 1.2].map((tx, ti) => (
          <mesh key={ti} position={[tx, 0.1, 0]} castShadow>
            <cylinderGeometry args={[0.04, 0.06, 0.8, 6]} />
            <meshStandardMaterial color="#334155" />
          </mesh>
        ))}
      </group>

      {/* Floating Discovery Card */}
      <Html position={[0, 2.8, 0]} center distanceFactor={26}>
        <div
          onClick={() => setSelectedTool(seedTool)}
          className="group p-3 rounded-2xl bg-forest-950/95 border border-emerald-400/50 shadow-2xl backdrop-blur-xl cursor-pointer hover:scale-105 transition-all text-left w-56"
        >
          <div className="flex items-center justify-between mb-1">
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[9px] font-mono border border-emerald-400/30">
              03 SEEDING & PLANTING
            </span>
            <span className="text-[10px] text-amber-300 font-bold flex items-center gap-0.5">
              <Star className="w-3 h-3 fill-current" /> 4.8
            </span>
          </div>
          <h4 className="text-xs font-bold font-display text-white group-hover:text-amber-300">
            {seedTool.name}
          </h4>
          <div className="flex items-center justify-between text-[10px] font-mono text-cream-200/70 mt-1">
            <span>Buy: ₹{seedTool.buyPrice.toLocaleString()}</span>
            <span className="text-emerald-400 font-bold">Inspect →</span>
          </div>
        </div>
      </Html>
    </group>
  );
};
