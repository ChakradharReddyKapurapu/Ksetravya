import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { useTools } from '../../../context/ToolsContext';
import { TOOLS_DATA } from '../../../features/tools/data/demoToolsData';
import { Star } from 'lucide-react';

export const Zone06Irrigation = () => {
  const sprinklerRef = useRef();
  const { setSelectedTool } = useTools();

  const pumpTool = TOOLS_DATA.find((t) => t.id === 'kirloskar-solar-pump-7hp') || TOOLS_DATA[0];

  useFrame((_, delta) => {
    if (sprinklerRef.current) {
      sprinklerRef.current.rotation.y += delta * 4.5;
    }
  });

  return (
    <group position={[7.5, 0, -40]}>
      {/* Water Canal Bed */}
      <mesh position={[0, 0.05, 0]} receiveShadow>
        <boxGeometry args={[11, 0.1, 10]} />
        <meshStandardMaterial color="#0369a1" roughness={0.1} metalness={0.9} />
      </mesh>

      {/* Solar Water Pump Shed */}
      <group position={[-2.5, 0, 0]}>
        <mesh position={[0, 1.2, 0]} castShadow receiveShadow>
          <boxGeometry args={[3.2, 2.4, 2.8]} />
          <meshStandardMaterial color="#0f766e" />
        </mesh>
        {/* Slanted Solar Panel */}
        <mesh position={[0, 2.6, 0]} rotation={[-0.3, 0, 0]} castShadow>
          <boxGeometry args={[3.4, 0.1, 3.0]} />
          <meshStandardMaterial color="#0f172a" metalness={0.9} />
        </mesh>
      </group>

      {/* Rotating Brass Rain Gun Sprinkler */}
      <group ref={sprinklerRef} position={[2.5, 0.8, 0]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.08, 0.1, 1.6, 8]} />
          <meshStandardMaterial color="#d97706" metalness={0.8} />
        </mesh>
        {/* Water Mist Cone */}
        <mesh position={[0.8, 0.8, 0]}>
          <coneGeometry args={[0.4, 1.4, 8]} rotation={[0, 0, -Math.PI / 3]} />
          <meshBasicMaterial color="#bae6fd" transparent opacity={0.65} />
        </mesh>
      </group>

      {/* Floating Discovery Card */}
      <Html position={[0, 3.2, 0]} center distanceFactor={26}>
        <div
          onClick={() => setSelectedTool(pumpTool)}
          className="group p-3 rounded-2xl bg-forest-950/95 border border-sky-400/50 shadow-2xl backdrop-blur-xl cursor-pointer hover:scale-105 transition-all text-left w-56"
        >
          <div className="flex items-center justify-between mb-1">
            <span className="px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 text-[9px] font-mono border border-sky-400/30">
              06 IRRIGATION EQUIPMENT
            </span>
            <span className="text-[10px] text-amber-300 font-bold flex items-center gap-0.5">
              <Star className="w-3 h-3 fill-current" /> 4.9
            </span>
          </div>
          <h4 className="text-xs font-bold font-display text-white group-hover:text-sky-300">
            {pumpTool.name}
          </h4>
          <div className="flex items-center justify-between text-[10px] font-mono text-cream-200/70 mt-1">
            <span>Rent: ₹{pumpTool.rentPriceDay}/d</span>
            <span className="text-emerald-400 font-bold">Inspect →</span>
          </div>
        </div>
      </Html>
    </group>
  );
};
