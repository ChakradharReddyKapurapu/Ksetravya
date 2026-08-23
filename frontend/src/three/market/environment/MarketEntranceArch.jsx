import React from 'react';
import { Html } from '@react-three/drei';
import { Sparkles, TrendingUp, Store } from 'lucide-react';

export const MarketEntranceArch = () => {
  return (
    <group position={[0, 0, 38]}>
      {/* Left Heavy Timber Pillar */}
      <mesh position={[-6.8, 4.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.6, 9.0, 1.6]} />
        <meshStandardMaterial color="#3b2416" roughness={0.9} />
      </mesh>
      {/* Pillar Base Stone Plinth */}
      <mesh position={[-6.8, 0.6, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.2, 1.2, 2.2]} />
        <meshStandardMaterial color="#57534e" roughness={0.95} />
      </mesh>

      {/* Right Heavy Timber Pillar */}
      <mesh position={[6.8, 4.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.6, 9.0, 1.6]} />
        <meshStandardMaterial color="#3b2416" roughness={0.9} />
      </mesh>
      {/* Pillar Base Stone Plinth */}
      <mesh position={[6.8, 0.6, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.2, 1.2, 2.2]} />
        <meshStandardMaterial color="#57534e" roughness={0.95} />
      </mesh>

      {/* Grand Arch Overhead Crossbeam */}
      <mesh position={[0, 8.5, 0]} castShadow>
        <boxGeometry args={[16.5, 1.8, 1.4]} />
        <meshStandardMaterial color="#2d1a0e" roughness={0.85} />
      </mesh>

      {/* Arch Roof Canopy */}
      <mesh position={[0, 9.8, 0]} castShadow>
        <boxGeometry args={[17.2, 0.6, 2.2]} />
        <meshStandardMaterial color="#b91c1c" roughness={0.7} />
      </mesh>

      {/* Hanging Golden Entrance Lanterns */}
      {[-5, 5].map((x, i) => (
        <group key={i} position={[x, 7.2, 0]}>
          <mesh>
            <cylinderGeometry args={[0.02, 0.02, 0.8, 6]} />
            <meshStandardMaterial color="#0f172a" />
          </mesh>
          <mesh position={[0, -0.5, 0]}>
            <sphereGeometry args={[0.3, 12, 12]} />
            <meshStandardMaterial color="#fef08a" emissive="#f59e0b" emissiveIntensity={1.8} />
          </mesh>
        </group>
      ))}

      {/* Floating 3D Title Sign on Arch */}
      <Html position={[0, 8.5, 0.8]} center transform distanceFactor={18}>
        <div className="flex flex-col items-center justify-center p-3 rounded-2xl bg-forest-950/95 border border-amber-400/40 shadow-2xl backdrop-blur-xl text-center select-none w-80">
          <div className="flex items-center gap-1.5 text-amber-400 text-[11px] font-mono uppercase tracking-widest mb-0.5">
            <Store className="w-3.5 h-3.5" />
            <span>AGRI NEXUS</span>
          </div>
          <h2 className="text-sm font-black font-display text-white tracking-wide uppercase leading-tight">
            AGRICULTURAL MARKET
          </h2>
          <p className="text-[9px] text-emerald-300 font-mono mt-0.5">
            "Know the Market. Make Better Decisions."
          </p>
        </div>
      </Html>
    </group>
  );
};
