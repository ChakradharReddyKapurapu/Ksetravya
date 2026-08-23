import React from 'react';
import { Html } from '@react-three/drei';
import { useWorld } from '../../../context/WorldContext';
import { CROPS_DATA } from '../../../features/market/data/demoMarketData';

export const FruitStalls = () => {
  const { setSelectedCrop } = useWorld();
  const mangoCrop = CROPS_DATA.find((c) => c.id === 'mango');

  return (
    <group position={[-14, 0, 0]} rotation={[0, 0.25, 0]}>
      {/* Tropical Fruit Stall Table */}
      <mesh position={[0, 1.1, 0]} castShadow receiveShadow>
        <boxGeometry args={[9.5, 2.2, 4.2]} />
        <meshStandardMaterial color="#543821" roughness={0.9} />
      </mesh>

      {/* Warm Orange Awning */}
      <mesh position={[0, 3.8, 0.4]} rotation={[0.2, 0, 0]} castShadow>
        <boxGeometry args={[10.2, 0.15, 5.0]} />
        <meshStandardMaterial color="#ea580c" roughness={0.7} />
      </mesh>
      {[-4.6, 4.6].map((x, i) => (
        <mesh key={i} position={[x, 2.8, 2.2]} castShadow>
          <cylinderGeometry args={[0.06, 0.06, 2.8, 8]} />
          <meshStandardMaterial color="#1e293b" />
        </mesh>
      ))}

      {/* Mango Wooden Boxes (Golden Yellow) */}
      {[-3.0, -1.2].map((x, i) => (
        <group key={i} position={[x, 2.4, 0.8]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[1.4, 0.55, 1.1]} />
            <meshStandardMaterial color="#854d0e" />
          </mesh>
          <mesh position={[0, 0.4, 0]}>
            <sphereGeometry args={[0.5, 12, 10]} />
            <meshStandardMaterial color="#facc15" roughness={0.3} />
          </mesh>
        </group>
      ))}

      {/* Green Banana Bunches */}
      {[0.8, 2.6].map((x, i) => (
        <group key={i} position={[x, 2.5, 0.8]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.35, 0.45, 0.9, 8]} rotation={[0.3, 0, 0.4]} />
            <meshStandardMaterial color="#65a30d" roughness={0.4} />
          </mesh>
        </group>
      ))}

      {/* Interactive Price Tag: MANGO */}
      <Html position={[-1.8, 4.8, 0]} center distanceFactor={22}>
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (mangoCrop) setSelectedCrop(mangoCrop);
          }}
          className="group flex items-center gap-2 p-2.5 rounded-2xl bg-forest-950/95 hover:bg-forest-900 border border-amber-400/50 hover:border-amber-400 shadow-2xl backdrop-blur-xl transition-all duration-300 transform hover:scale-110 cursor-pointer text-left"
        >
          <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300">
            🥭
          </div>
          <div>
            <div className="text-[10px] text-cream-200/70 font-mono">FRUITS ZONE</div>
            <div className="text-xs font-bold text-white font-display">Mango (Banganapalli)</div>
            <div className="text-xs font-bold text-amber-300 font-mono">₹85 / kg <span className="text-[10px] text-emerald-400">▲ +9.2%</span></div>
          </div>
        </button>
      </Html>
    </group>
  );
};
