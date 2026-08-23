import React from 'react';
import { Html } from '@react-three/drei';
import { useWorld } from '../../../context/WorldContext';
import { CROPS_DATA } from '../../../features/market/data/demoMarketData';
import { Sparkles, TrendingUp } from 'lucide-react';

export const VegetableStalls = () => {
  const { setSelectedCrop } = useWorld();
  const tomatoCrop = CROPS_DATA.find((c) => c.id === 'tomato');
  const chilliCrop = CROPS_DATA.find((c) => c.id === 'chilli');

  return (
    <group position={[14, 0, 20]} rotation={[0, -0.25, 0]}>
      {/* Vegetable Wooden Tiered Stall */}
      <mesh position={[0, 1.1, 0]} castShadow receiveShadow>
        <boxGeometry args={[9.5, 2.2, 4.2]} />
        <meshStandardMaterial color="#4a2e18" roughness={0.9} />
      </mesh>

      {/* Red & White Striped Fabric Awning */}
      <mesh position={[0, 3.8, 0.4]} rotation={[0.2, 0, 0]} castShadow>
        <boxGeometry args={[10.2, 0.15, 5.0]} />
        <meshStandardMaterial color="#dc2626" roughness={0.7} />
      </mesh>
      {/* Awning Support Struts */}
      {[-4.6, 4.6].map((x, i) => (
        <mesh key={i} position={[x, 2.8, 2.2]} castShadow>
          <cylinderGeometry args={[0.06, 0.06, 2.8, 8]} />
          <meshStandardMaterial color="#1e293b" />
        </mesh>
      ))}

      {/* Crates of Tomatoes (Red) */}
      {[-3.2, -1.8].map((x, i) => (
        <group key={i} position={[x, 2.4, 0.8]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[1.2, 0.5, 1.0]} />
            <meshStandardMaterial color="#78350f" roughness={0.9} />
          </mesh>
          {/* Tomatoes inside */}
          <mesh position={[0, 0.35, 0]}>
            <dodecahedronGeometry args={[0.5, 1]} />
            <meshStandardMaterial color="#ef4444" roughness={0.3} />
          </mesh>
        </group>
      ))}

      {/* Crates of Fresh Red/Green Chillies */}
      {[-0.4, 1.0].map((x, i) => (
        <group key={i} position={[x, 2.4, 0.8]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[1.2, 0.5, 1.0]} />
            <meshStandardMaterial color="#78350f" roughness={0.9} />
          </mesh>
          <mesh position={[0, 0.35, 0]}>
            <dodecahedronGeometry args={[0.5, 1]} />
            <meshStandardMaterial color="#b91c1c" roughness={0.4} />
          </mesh>
        </group>
      ))}

      {/* Sacks of Onions & Potatoes */}
      {[2.4, 3.8].map((x, i) => (
        <group key={i} position={[x, 2.4, 0.8]}>
          <mesh castShadow receiveShadow>
            <cylinderGeometry args={[0.45, 0.4, 0.9, 8]} />
            <meshStandardMaterial color="#e11d48" roughness={0.8} />
          </mesh>
        </group>
      ))}

      {/* Interactive Price Tag: TOMATO */}
      <Html position={[-2.2, 4.8, 0]} center distanceFactor={22}>
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (tomatoCrop) setSelectedCrop(tomatoCrop);
          }}
          className="group flex items-center gap-2 p-2.5 rounded-2xl bg-forest-950/95 hover:bg-forest-900 border border-red-500/50 hover:border-red-400 shadow-2xl backdrop-blur-xl transition-all duration-300 transform hover:scale-110 cursor-pointer text-left"
        >
          <div className="w-8 h-8 rounded-xl bg-red-500/20 border border-red-400/40 flex items-center justify-center text-red-400">
            🍅
          </div>
          <div>
            <div className="text-[10px] text-cream-200/70 font-mono">VEGETABLES</div>
            <div className="text-xs font-bold text-white font-display">Tomato (Hybrid)</div>
            <div className="text-xs font-bold text-red-400 font-mono">₹32 / kg <span className="text-[10px] text-emerald-400">▲ +8.4%</span></div>
          </div>
        </button>
      </Html>
    </group>
  );
};
