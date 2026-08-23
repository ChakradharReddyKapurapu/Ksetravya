import React from 'react';
import { Html } from '@react-three/drei';
import { useTools } from '../../../context/ToolsContext';
import { TOOLS_DATA } from '../../../features/tools/data/demoToolsData';
import { Star } from 'lucide-react';

export const Zone09Transport = () => {
  const { setSelectedTool } = useTools();
  const trailerTool = TOOLS_DATA.find((t) => t.id === 'hydraulic-tipping-trailer-5t') || TOOLS_DATA[0];

  return (
    <group position={[-7.5, 0, -76]}>
      {/* Concrete Pad */}
      <mesh position={[0, 0.05, 0]} receiveShadow>
        <boxGeometry args={[11, 0.1, 10]} />
        <meshStandardMaterial color="#334155" roughness={0.9} />
      </mesh>

      {/* 5-Tonne Hydraulic Tipping Trailer */}
      <group position={[0, 0.4, 0]}>
        {/* Blue Cargo Bed */}
        <mesh position={[0, 1.0, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.8, 1.4, 4.6]} />
          <meshStandardMaterial color="#1e3a8a" />
        </mesh>
        {/* Grain Bags inside */}
        <mesh position={[0, 1.5, 0]} castShadow>
          <boxGeometry args={[2.4, 0.7, 4.0]} />
          <meshStandardMaterial color="#a16207" />
        </mesh>
        {/* 4 Wheels */}
        {[
          [-1.5, 0.4, -1.2],
          [1.5, 0.4, -1.2],
          [-1.5, 0.4, 1.2],
          [1.5, 0.4, 1.2],
        ].map((wp, wi) => (
          <mesh key={wi} position={wp} rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.45, 0.45, 0.35, 12]} />
            <meshStandardMaterial color="#0f172a" />
          </mesh>
        ))}
      </group>

      {/* Floating Discovery Card */}
      <Html position={[0, 2.8, 0]} center distanceFactor={26}>
        <div
          onClick={() => setSelectedTool(trailerTool)}
          className="group p-3 rounded-2xl bg-forest-950/95 border border-sky-400/50 shadow-2xl backdrop-blur-xl cursor-pointer hover:scale-105 transition-all text-left w-56"
        >
          <div className="flex items-center justify-between mb-1">
            <span className="px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 text-[9px] font-mono border border-sky-400/30">
              09 FARM TRANSPORT
            </span>
            <span className="text-[10px] text-amber-300 font-bold flex items-center gap-0.5">
              <Star className="w-3 h-3 fill-current" /> 4.8
            </span>
          </div>
          <h4 className="text-xs font-bold font-display text-white group-hover:text-sky-300">
            {trailerTool.name}
          </h4>
          <div className="flex items-center justify-between text-[10px] font-mono text-cream-200/70 mt-1">
            <span>Rent: ₹{trailerTool.rentPriceDay}/d</span>
            <span className="text-emerald-400 font-bold">Inspect →</span>
          </div>
        </div>
      </Html>
    </group>
  );
};
