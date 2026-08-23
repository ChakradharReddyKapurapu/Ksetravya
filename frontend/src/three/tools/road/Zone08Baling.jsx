import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { useTools } from '../../../context/ToolsContext';
import { TOOLS_DATA } from '../../../features/tools/data/demoToolsData';
import { Star } from 'lucide-react';

export const Zone08Baling = () => {
  const pickupReelRef = useRef();
  const { setSelectedTool } = useTools();

  const balerTool = TOOLS_DATA.find((t) => t.id === 'round-hay-baler') || TOOLS_DATA[0];

  useFrame((_, delta) => {
    if (pickupReelRef.current) {
      pickupReelRef.current.rotation.x += delta * 3.5;
    }
  });

  return (
    <group position={[7.5, 0, -64]}>
      {/* Golden Stubble Ground */}
      <mesh position={[0, 0.05, 0]} receiveShadow>
        <boxGeometry args={[11, 0.1, 10]} />
        <meshStandardMaterial color="#713f12" roughness={0.9} />
      </mesh>

      {/* Scattered Round Hay Bales */}
      {[
        [-2.5, 0.5, 2.5],
        [3.0, 0.5, 2.0],
        [1.5, 0.5, -2.5],
      ].map((bp, bi) => (
        <mesh key={bi} position={bp} rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.5, 0.5, 1.1, 16]} />
          <meshStandardMaterial color="#ca8a04" roughness={0.9} />
        </mesh>
      ))}

      {/* Round Baler Machine */}
      <group position={[-1.2, 0.3, 0]}>
        {/* Yellow Baler Body Chamber */}
        <mesh position={[0, 0.9, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.2, 1.4, 2.0]} />
          <meshStandardMaterial color="#eab308" />
        </mesh>
        {/* Front Pickup Reel */}
        <group ref={pickupReelRef} position={[0, 0.4, 1.1]}>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.3, 0.3, 2.0, 12]} />
            <meshStandardMaterial color="#0f172a" metalness={0.7} />
          </mesh>
        </group>
      </group>

      {/* Floating Discovery Card */}
      <Html position={[0, 2.8, 0]} center distanceFactor={26}>
        <div
          onClick={() => setSelectedTool(balerTool)}
          className="group p-3 rounded-2xl bg-forest-950/95 border border-amber-400/50 shadow-2xl backdrop-blur-xl cursor-pointer hover:scale-105 transition-all text-left w-56"
        >
          <div className="flex items-center justify-between mb-1">
            <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[9px] font-mono border border-amber-400/30">
              08 BALING & HAY TOOLS
            </span>
            <span className="text-[10px] text-amber-300 font-bold flex items-center gap-0.5">
              <Star className="w-3 h-3 fill-current" /> 4.7
            </span>
          </div>
          <h4 className="text-xs font-bold font-display text-white group-hover:text-amber-300">
            {balerTool.name}
          </h4>
          <div className="flex items-center justify-between text-[10px] font-mono text-cream-200/70 mt-1">
            <span>Rent: ₹{balerTool.rentPriceDay}/d</span>
            <span className="text-emerald-400 font-bold">Inspect →</span>
          </div>
        </div>
      </Html>
    </group>
  );
};
