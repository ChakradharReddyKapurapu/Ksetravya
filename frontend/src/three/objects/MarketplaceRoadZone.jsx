import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { usePerformance } from '../../context/PerformanceContext';
import { useWorld } from '../../context/WorldContext';
import { Store, Truck, ArrowUpRight } from 'lucide-react';

export const MarketplaceRoadZone = () => {
  const truckRef = useRef();
  const { setSelectedHotspot } = usePerformance();
  const { startTransitionToMarket } = useWorld();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    // Delivery truck driving continuously along the transit road (x: -18 to 18)
    if (truckRef.current) {
      truckRef.current.position.x = ((t * 4) % 40) - 20;
    }
  });

  return (
    <group position={[0, 0.4, -40]}>
      {/* Paved Rural Transit Road */}
      <mesh position={[0, 0.05, 0]} receiveShadow>
        <boxGeometry args={[45, 0.15, 6]} />
        <meshStandardMaterial color="#334155" roughness={0.9} />
      </mesh>

      {/* Road Center Dotted Line */}
      <mesh position={[0, 0.14, 0]}>
        <boxGeometry args={[44, 0.02, 0.15]} />
        <meshStandardMaterial color="#facc15" />
      </mesh>

      {/* Market Entrance Archway */}
      <group position={[-6, 0, -5]}>
        {/* Posts */}
        <mesh position={[-3.5, 3.2, 0]} castShadow>
          <cylinderGeometry args={[0.3, 0.35, 6.4, 8]} />
          <meshStandardMaterial color="#78350f" />
        </mesh>
        <mesh position={[3.5, 3.2, 0]} castShadow>
          <cylinderGeometry args={[0.3, 0.35, 6.4, 8]} />
          <meshStandardMaterial color="#78350f" />
        </mesh>
        {/* Overhead Signboard */}
        <mesh position={[0, 6.2, 0]} castShadow>
          <boxGeometry args={[8.5, 1.2, 0.4]} />
          <meshStandardMaterial color="#b91c1c" />
        </mesh>
      </group>

      {/* Produce Stalls with Crates & Jute Sacks */}
      <group position={[-12, 0, -4]}>
        <mesh position={[0, 0.8, 0]} castShadow receiveShadow>
          <boxGeometry args={[5.5, 1.6, 2.5]} />
          <meshStandardMaterial color="#5c3a21" />
        </mesh>
        {/* Striped Canopy */}
        <mesh position={[0, 2.6, 0.2]} rotation={[0.2, 0, 0]}>
          <boxGeometry args={[6.0, 0.1, 3.0]} />
          <meshStandardMaterial color="#ca8a04" />
        </mesh>
        {/* Tomato Crates (Red) */}
        <mesh position={[-1.4, 1.8, 0.4]} castShadow>
          <boxGeometry args={[1.2, 0.5, 0.9]} />
          <meshStandardMaterial color="#ef4444" />
        </mesh>
        {/* Mango Crates (Yellow) */}
        <mesh position={[1.4, 1.8, 0.4]} castShadow>
          <boxGeometry args={[1.2, 0.5, 0.9]} />
          <meshStandardMaterial color="#eab308" />
        </mesh>
      </group>

      {/* Blue Transport Delivery Mini-Truck moving on the road */}
      <group ref={truckRef} position={[-10, 0.4, 0]}>
        {/* Cab */}
        <mesh position={[1.2, 1.0, 0]} castShadow>
          <boxGeometry args={[1.6, 1.6, 1.8]} />
          <meshStandardMaterial color="#2563eb" roughness={0.3} metalness={0.4} />
        </mesh>
        {/* Cargo Bed with produce */}
        <mesh position={[-1.2, 1.1, 0]} castShadow receiveShadow>
          <boxGeometry args={[3.2, 1.4, 2.0]} />
          <meshStandardMaterial color="#1e293b" />
        </mesh>
        {/* Wheels */}
        {[
          [1.2, 0.35, -1.0],
          [1.2, 0.35, 1.0],
          [-1.6, 0.35, -1.0],
          [-1.6, 0.35, 1.0],
        ].map((wPos, wIdx) => (
          <mesh key={wIdx} position={wPos} rotation={[Math.PI / 2, 0, 0]} castShadow>
            <cylinderGeometry args={[0.35, 0.35, 0.3, 10]} />
            <meshStandardMaterial color="#0f172a" />
          </mesh>
        ))}
      </group>

      {/* Interactive Marketplace Beacon */}
      <Html position={[-6, 4.5, -4]} center distanceFactor={28}>
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={startTransitionToMarket}
          className="group relative cursor-pointer"
        >
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-forest-950/95 border border-amber-400/60 text-amber-300 shadow-2xl backdrop-blur-xl hover:scale-105 transition-all">
            <Store className="w-3.5 h-3.5" />
            <span className="text-[10px] font-bold font-display">APMC Wholesale Market</span>
            <span className="text-[9px] text-emerald-400 font-mono">Live Rates →</span>
          </div>
        </div>
      </Html>
    </group>
  );
};
