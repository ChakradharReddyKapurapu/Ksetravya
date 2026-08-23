import React, { useState } from 'react';
import { Html } from '@react-three/drei';
import { useWorld } from '../../../context/WorldContext';
import { CROPS_DATA } from '../../../features/market/data/demoMarketData';
import { Scale, Sparkles, TrendingUp } from 'lucide-react';

export const GrainStalls = () => {
  const { setSelectedCrop } = useWorld();
  const riceCrop = CROPS_DATA.find((c) => c.id === 'rice');
  const wheatCrop = CROPS_DATA.find((c) => c.id === 'wheat');

  return (
    <group position={[-14, 0, 20]} rotation={[0, 0.25, 0]}>
      {/* Wooden Stall Structure */}
      <mesh position={[0, 1.1, 0]} castShadow receiveShadow>
        <boxGeometry args={[9.5, 2.2, 4.2]} />
        <meshStandardMaterial color="#5c3a21" roughness={0.9} />
      </mesh>

      {/* Striped Green & Yellow Fabric Awning */}
      <mesh position={[0, 3.8, 0.4]} rotation={[0.2, 0, 0]} castShadow>
        <boxGeometry args={[10.2, 0.15, 5.0]} />
        <meshStandardMaterial color="#ca8a04" roughness={0.7} />
      </mesh>
      {/* Awning Support Struts */}
      {[-4.6, 4.6].map((x, i) => (
        <mesh key={i} position={[x, 2.8, 2.2]} castShadow>
          <cylinderGeometry args={[0.06, 0.06, 2.8, 8]} />
          <meshStandardMaterial color="#1e293b" />
        </mesh>
      ))}

      {/* Jute Sacks of Rice & Wheat */}
      {[-3.2, -1.8, -0.4, 1.0, 2.4, 3.6].map((x, i) => (
        <group key={i} position={[x, 2.6, (i % 2) * 0.6]}>
          {/* Burlap Sack Base */}
          <mesh castShadow receiveShadow>
            <cylinderGeometry args={[0.48, 0.44, 1.0, 10]} />
            <meshStandardMaterial color="#926239" roughness={0.95} />
          </mesh>
          {/* Overflowing Grain Top */}
          <mesh position={[0, 0.52, 0]}>
            <sphereGeometry args={[0.42, 10, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? '#fde047' : '#eab308'}
              roughness={0.8}
            />
          </mesh>
        </group>
      ))}

      {/* Antique Brass Weighing Scale */}
      <group position={[-3.8, 2.8, 1.4]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.04, 0.08, 1.2, 8]} />
          <meshStandardMaterial color="#d97706" metalness={0.8} />
        </mesh>
        <mesh position={[0, 0.6, 0]} rotation={[0, 0, 0.1]}>
          <boxGeometry args={[1.2, 0.04, 0.04]} />
          <meshStandardMaterial color="#d97706" metalness={0.8} />
        </mesh>
      </group>

      {/* Interactive Price Tag: RICE */}
      <Html position={[-1.2, 4.8, 0]} center distanceFactor={22}>
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (riceCrop) setSelectedCrop(riceCrop);
          }}
          className="group flex items-center gap-2 p-2.5 rounded-2xl bg-forest-950/95 hover:bg-forest-900 border border-amber-400/50 hover:border-amber-400 shadow-2xl backdrop-blur-xl transition-all duration-300 transform hover:scale-110 cursor-pointer text-left"
        >
          <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300">
            🌾
          </div>
          <div>
            <div className="text-[10px] text-cream-200/70 font-mono">GRAINS ZONE</div>
            <div className="text-xs font-bold text-white font-display">Rice (Paddy)</div>
            <div className="text-xs font-bold text-amber-300 font-mono">₹42 / kg <span className="text-[10px] text-emerald-400">▲ +4.2%</span></div>
          </div>
        </button>
      </Html>
    </group>
  );
};
