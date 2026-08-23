import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { useTools } from '../../../context/ToolsContext';
import { TOOLS_DATA } from '../../../features/tools/data/demoToolsData';
import { Star } from 'lucide-react';

export const Zone05Spraying = () => {
  const mistRef = useRef();
  const { setSelectedTool } = useTools();

  const sprayTool = TOOLS_DATA.find((t) => t.id === 'aspee-boom-sprayer-400l') || TOOLS_DATA[0];

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (mistRef.current) {
      mistRef.current.children.forEach((cone, i) => {
        const s = 0.8 + Math.sin(t * 5.0 + i) * 0.25;
        cone.scale.set(s, s, s);
      });
    }
  });

  return (
    <group position={[-7.5, 0, -28]}>
      {/* Green Vegetable Crop Bed */}
      <mesh position={[0, 0.05, 0]} receiveShadow>
        <boxGeometry args={[11, 0.1, 10]} />
        <meshStandardMaterial color="#14532d" roughness={0.8} />
      </mesh>

      {/* 400L Boom Sprayer Unit */}
      <group position={[0, 0.3, 0]}>
        {/* Yellow Poly Tank */}
        <mesh position={[0, 1.4, 0]} castShadow>
          <cylinderGeometry args={[0.7, 0.7, 1.4, 12]} rotation={[Math.PI / 2, 0, 0]} />
          <meshStandardMaterial color="#fde047" />
        </mesh>
        {/* Wide 32-Foot Folding Boom Arm */}
        <mesh position={[0, 1.1, 0.9]} castShadow>
          <boxGeometry args={[10, 0.1, 0.1]} />
          <meshStandardMaterial color="#334155" />
        </mesh>

        {/* Fine Translucent Mist Spray Cones */}
        <group ref={mistRef}>
          {[-4, -2, 0, 2, 4].map((mx, mi) => (
            <mesh key={mi} position={[mx, 0.4, 0.9]}>
              <coneGeometry args={[0.5, 1.2, 8]} rotation={[0, 0, Math.PI]} />
              <meshBasicMaterial color="#6ee7b7" transparent opacity={0.4} />
            </mesh>
          ))}
        </group>
      </group>

      {/* Floating Discovery Card */}
      <Html position={[0, 2.8, 0]} center distanceFactor={26}>
        <div
          onClick={() => setSelectedTool(sprayTool)}
          className="group p-3 rounded-2xl bg-forest-950/95 border border-emerald-400/50 shadow-2xl backdrop-blur-xl cursor-pointer hover:scale-105 transition-all text-left w-56"
        >
          <div className="flex items-center justify-between mb-1">
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[9px] font-mono border border-emerald-400/30">
              05 CROP PROTECTION
            </span>
            <span className="text-[10px] text-amber-300 font-bold flex items-center gap-0.5">
              <Star className="w-3 h-3 fill-current" /> 4.8
            </span>
          </div>
          <h4 className="text-xs font-bold font-display text-white group-hover:text-amber-300">
            {sprayTool.name}
          </h4>
          <div className="flex items-center justify-between text-[10px] font-mono text-cream-200/70 mt-1">
            <span>Rent: ₹{sprayTool.rentPriceDay}/d</span>
            <span className="text-emerald-400 font-bold">Inspect →</span>
          </div>
        </div>
      </Html>
    </group>
  );
};
