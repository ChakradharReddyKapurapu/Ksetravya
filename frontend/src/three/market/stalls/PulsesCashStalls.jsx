import React from 'react';
import { Html } from '@react-three/drei';
import { useWorld } from '../../../context/WorldContext';
import { CROPS_DATA } from '../../../features/market/data/demoMarketData';

export const PulsesCashStalls = () => {
  const { setSelectedCrop } = useWorld();
  const groundnutCrop = CROPS_DATA.find((c) => c.id === 'groundnut');
  const cottonCrop = CROPS_DATA.find((c) => c.id === 'cotton');

  return (
    <group position={[14, 0, 0]} rotation={[0, -0.25, 0]}>
      {/* Heavy Pulses & Cash Stalls Table */}
      <mesh position={[0, 1.1, 0]} castShadow receiveShadow>
        <boxGeometry args={[9.5, 2.2, 4.2]} />
        <meshStandardMaterial color="#422915" roughness={0.9} />
      </mesh>

      {/* Earth Brown & Cream Striped Awning */}
      <mesh position={[0, 3.8, 0.4]} rotation={[0.2, 0, 0]} castShadow>
        <boxGeometry args={[10.2, 0.15, 5.0]} />
        <meshStandardMaterial color="#b45309" roughness={0.7} />
      </mesh>
      {[-4.6, 4.6].map((x, i) => (
        <mesh key={i} position={[x, 2.8, 2.2]} castShadow>
          <cylinderGeometry args={[0.06, 0.06, 2.8, 8]} />
          <meshStandardMaterial color="#1e293b" />
        </mesh>
      ))}

      {/* Groundnut Heaps & Jute Pod Bags */}
      {[-3.0, -1.2].map((x, i) => (
        <group key={i} position={[x, 2.5, 0.8]}>
          <mesh castShadow receiveShadow>
            <cylinderGeometry args={[0.55, 0.5, 1.1, 10]} />
            <meshStandardMaterial color="#a16207" roughness={0.9} />
          </mesh>
        </group>
      ))}

      {/* White Raw Cotton Bales */}
      {[1.2, 3.2].map((x, i) => (
        <group key={i} position={[x, 2.5, 0.8]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[1.4, 1.1, 1.2]} />
            <meshStandardMaterial color="#f1f5f9" roughness={0.95} />
          </mesh>
          {/* Steel binding straps on cotton bale */}
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[1.42, 0.05, 1.22]} />
            <meshStandardMaterial color="#334155" metalness={0.9} />
          </mesh>
        </group>
      ))}

      {/* Interactive Price Tag: GROUNDNUT */}
      <Html position={[-2.2, 4.8, 0]} center distanceFactor={22}>
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (groundnutCrop) setSelectedCrop(groundnutCrop);
          }}
          className="group flex items-center gap-2 p-2.5 rounded-2xl bg-forest-950/95 hover:bg-forest-900 border border-amber-500/50 hover:border-amber-400 shadow-2xl backdrop-blur-xl transition-all duration-300 transform hover:scale-110 cursor-pointer text-left"
        >
          <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300">
            🥜
          </div>
          <div>
            <div className="text-[10px] text-cream-200/70 font-mono">PULSES & OILSEEDS</div>
            <div className="text-xs font-bold text-white font-display">Groundnut (Pods)</div>
            <div className="text-xs font-bold text-amber-300 font-mono">₹78 / kg <span className="text-[10px] text-emerald-400">▲ +6.8%</span></div>
          </div>
        </button>
      </Html>
    </group>
  );
};
