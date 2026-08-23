import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { useTools } from '../../../context/ToolsContext';
import { TOOLS_DATA } from '../../../features/tools/data/demoToolsData';
import { Star } from 'lucide-react';

export const Zone04Fertilizer = () => {
  const spinnerRef = useRef();
  const { setSelectedTool } = useTools();

  const fertTool = TOOLS_DATA.find((t) => t.category === 'fertilizer') || TOOLS_DATA[0];

  useFrame((_, delta) => {
    if (spinnerRef.current) {
      spinnerRef.current.rotation.y += delta * 6.0;
    }
  });

  return (
    <group position={[7.5, 0, -16]}>
      {/* Ground Pad */}
      <mesh position={[0, 0.05, 0]} receiveShadow>
        <boxGeometry args={[11, 0.1, 9]} />
        <meshStandardMaterial color="#1f2937" roughness={0.8} />
      </mesh>

      {/* Stacked Fertilizer Bags / Sacks */}
      <group position={[-2.5, 0, 1.5]}>
        {[
          [0, 0.3, 0],
          [0.6, 0.3, 0],
          [0.3, 0.7, 0],
        ].map((sp, si) => (
          <mesh key={si} position={sp} castShadow>
            <boxGeometry args={[0.9, 0.35, 0.6]} />
            <meshStandardMaterial color="#fef08a" />
          </mesh>
        ))}
      </group>

      {/* Conical Fertilizer Spreader Hopper */}
      <group position={[1.5, 0, 0]}>
        <mesh position={[0, 1.2, 0]} castShadow>
          <coneGeometry args={[1.2, 1.4, 16]} rotation={[Math.PI, 0, 0]} />
          <meshStandardMaterial color="#ef4444" />
        </mesh>
        {/* Rotating Broadcast Distribution Disc */}
        <mesh ref={spinnerRef} position={[0, 0.4, 0]}>
          <cylinderGeometry args={[0.6, 0.6, 0.06, 12]} />
          <meshStandardMaterial color="#0f172a" metalness={0.8} />
        </mesh>
      </group>

      {/* Floating Discovery Card */}
      <Html position={[0, 2.8, 0]} center distanceFactor={26}>
        <div
          onClick={() => setSelectedTool(fertTool)}
          className="group p-3 rounded-2xl bg-forest-950/95 border border-amber-400/50 shadow-2xl backdrop-blur-xl cursor-pointer hover:scale-105 transition-all text-left w-56"
        >
          <div className="flex items-center justify-between mb-1">
            <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[9px] font-mono border border-amber-400/30">
              04 FERTILIZER EQUIPMENT
            </span>
            <span className="text-[10px] text-amber-300 font-bold flex items-center gap-0.5">
              <Star className="w-3 h-3 fill-current" /> 4.8
            </span>
          </div>
          <h4 className="text-xs font-bold font-display text-white group-hover:text-amber-300">
            {fertTool.name}
          </h4>
          <div className="flex items-center justify-between text-[10px] font-mono text-cream-200/70 mt-1">
            <span>Rent: ₹{fertTool.rentPriceDay}/d</span>
            <span className="text-emerald-400 font-bold">Inspect →</span>
          </div>
        </div>
      </Html>
    </group>
  );
};
