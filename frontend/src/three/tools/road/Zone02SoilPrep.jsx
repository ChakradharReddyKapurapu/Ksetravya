import React from 'react';
import { Html } from '@react-three/drei';
import { useTools } from '../../../context/ToolsContext';
import { TOOLS_DATA } from '../../../features/tools/data/demoToolsData';
import { Star } from 'lucide-react';

export const Zone02SoilPrep = () => {
  const { setSelectedTool } = useTools();
  const ploughTool = TOOLS_DATA.find((t) => t.id === 'shaktiman-rotavator-7ft') || TOOLS_DATA[0];

  return (
    <group position={[7.5, 0, 8]}>
      {/* Tilled Dark Soil Ground Bed */}
      <mesh position={[0, 0.05, 0]} receiveShadow>
        <boxGeometry args={[12, 0.1, 10]} />
        <meshStandardMaterial color="#451a03" roughness={0.95} />
      </mesh>

      {/* Deep Furrow Ridges */}
      {[-3, -1, 1, 3].map((fx, fi) => (
        <mesh key={fi} position={[fx, 0.15, 0]} receiveShadow>
          <boxGeometry args={[0.7, 0.15, 9.5]} />
          <meshStandardMaterial color="#2d1305" />
        </mesh>
      ))}

      {/* Rotavator & Hydraulic Reversible Plough Unit */}
      <group position={[0, 0.3, 0]}>
        {/* Yellow Rotavator Frame */}
        <mesh position={[0, 0.8, 0]} castShadow receiveShadow>
          <boxGeometry args={[3.2, 0.8, 1.2]} />
          <meshStandardMaterial color="#eab308" metalness={0.4} />
        </mesh>
        {/* Steel Boron Tillage Blades */}
        {[-1.2, -0.6, 0, 0.6, 1.2].map((bx, bi) => (
          <mesh key={bi} position={[bx, 0.2, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.35, 0.35, 0.15, 8]} />
            <meshStandardMaterial color="#334155" metalness={0.9} />
          </mesh>
        ))}
      </group>

      {/* Floating Discovery Card */}
      <Html position={[0, 2.8, 0]} center distanceFactor={26}>
        <div
          onClick={() => setSelectedTool(ploughTool)}
          className="group p-3 rounded-2xl bg-forest-950/95 border border-emerald-400/50 shadow-2xl backdrop-blur-xl cursor-pointer hover:scale-105 transition-all text-left w-56"
        >
          <div className="flex items-center justify-between mb-1">
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[9px] font-mono border border-emerald-400/30">
              02 SOIL PREPARATION
            </span>
            <span className="text-[10px] text-amber-300 font-bold flex items-center gap-0.5">
              <Star className="w-3 h-3 fill-current" /> 4.9
            </span>
          </div>
          <h4 className="text-xs font-bold font-display text-white group-hover:text-amber-300">
            {ploughTool.name}
          </h4>
          <div className="flex items-center justify-between text-[10px] font-mono text-cream-200/70 mt-1">
            <span>Rent: ₹{ploughTool.rentPriceDay}/d</span>
            <span className="text-emerald-400 font-bold">Inspect →</span>
          </div>
        </div>
      </Html>
    </group>
  );
};
