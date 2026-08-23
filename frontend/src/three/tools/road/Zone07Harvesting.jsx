import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { useTools } from '../../../context/ToolsContext';
import { TOOLS_DATA } from '../../../features/tools/data/demoToolsData';
import { Star } from 'lucide-react';

export const Zone07Harvesting = () => {
  const reelRef = useRef();
  const { setSelectedTool } = useTools();

  const harvesterTool = TOOLS_DATA.find((t) => t.id === 'kubota-dc-68g-harvester') || TOOLS_DATA[0];

  useFrame((_, delta) => {
    if (reelRef.current) {
      reelRef.current.rotation.x += delta * 2.5;
    }
  });

  return (
    <group position={[-7.5, 0, -52]}>
      {/* Golden Wheat Field Bed */}
      <mesh position={[0, 0.05, 0]} receiveShadow>
        <boxGeometry args={[11, 0.1, 10]} />
        <meshStandardMaterial color="#854d0e" roughness={0.9} />
      </mesh>

      {/* Red Combine Harvester */}
      <group position={[0, 0.3, 0]}>
        {/* Chassis */}
        <mesh position={[0, 1.8, 0]} castShadow receiveShadow>
          <boxGeometry args={[3.4, 2.2, 4.8]} />
          <meshStandardMaterial color="#dc2626" roughness={0.4} />
        </mesh>
        {/* Cab */}
        <mesh position={[0, 2.7, 1.4]} castShadow>
          <boxGeometry args={[2.6, 1.3, 1.6]} />
          <meshStandardMaterial color="#38bdf8" roughness={0.1} transparent opacity={0.7} />
        </mesh>
        {/* Header Bar */}
        <mesh position={[0, 0.7, 3.2]} castShadow>
          <boxGeometry args={[4.8, 0.6, 1.6]} />
          <meshStandardMaterial color="#991b1b" />
        </mesh>
        {/* Rotating Grain Reel */}
        <group ref={reelRef} position={[0, 1.2, 3.6]}>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.7, 0.7, 4.6, 12]} />
            <meshStandardMaterial color="#f59e0b" roughness={0.3} metalness={0.6} />
          </mesh>
        </group>
      </group>

      {/* Floating Discovery Card */}
      <Html position={[0, 3.8, 0]} center distanceFactor={26}>
        <div
          onClick={() => setSelectedTool(harvesterTool)}
          className="group p-3 rounded-2xl bg-forest-950/95 border border-amber-400/50 shadow-2xl backdrop-blur-xl cursor-pointer hover:scale-105 transition-all text-left w-56"
        >
          <div className="flex items-center justify-between mb-1">
            <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[9px] font-mono border border-amber-400/30">
              07 HARVESTING EQUIPMENT
            </span>
            <span className="text-[10px] text-amber-300 font-bold flex items-center gap-0.5">
              <Star className="w-3 h-3 fill-current" /> 4.9
            </span>
          </div>
          <h4 className="text-xs font-bold font-display text-white group-hover:text-amber-300">
            {harvesterTool.name}
          </h4>
          <div className="flex items-center justify-between text-[10px] font-mono text-cream-200/70 mt-1">
            <span>Rent: ₹{harvesterTool.rentPriceDay}/d</span>
            <span className="text-emerald-400 font-bold">Inspect →</span>
          </div>
        </div>
      </Html>
    </group>
  );
};
