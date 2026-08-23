import React from 'react';
import { Html } from '@react-three/drei';
import { Truck, ArrowRight, PackageCheck } from 'lucide-react';

export const TransportDock = () => {
  return (
    <group position={[0, 0, -26]}>
      {/* Wholesale Warehouse Loading Dock Building */}
      <mesh position={[0, 4.0, -10]} castShadow receiveShadow>
        <boxGeometry args={[42, 8.0, 14]} />
        <meshStandardMaterial color="#334155" roughness={0.7} />
      </mesh>

      {/* Warehouse Corrugated Roof */}
      <mesh position={[0, 8.4, -10]} castShadow>
        <boxGeometry args={[44, 0.8, 15.5]} />
        <meshStandardMaterial color="#1e293b" roughness={0.6} />
      </mesh>

      {/* Raised Concrete Loading Dock Platform */}
      <mesh position={[0, 0.7, -1.5]} castShadow receiveShadow>
        <boxGeometry args={[36, 1.4, 6.0]} />
        <meshStandardMaterial color="#64748b" roughness={0.9} />
      </mesh>

      {/* Warehouse Bay Rolling Shutter Doors */}
      {[-12, 0, 12].map((x, i) => (
        <group key={i} position={[x, 3.2, -2.9]}>
          <mesh castShadow>
            <planeGeometry args={[7.2, 5.0]} />
            <meshStandardMaterial color="#0f172a" metalness={0.8} roughness={0.4} />
          </mesh>
          {/* Bay Number Sign */}
          <mesh position={[0, 3.0, 0.1]}>
            <boxGeometry args={[1.6, 0.6, 0.05]} />
            <meshStandardMaterial color="#f59e0b" />
          </mesh>
        </group>
      ))}

      {/* Stacked Wooden Pallets with Cargo Sacks */}
      {[-8, 8].map((x, i) => (
        <group key={i} position={[x, 1.8, 0]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[2.4, 0.35, 2.4]} />
            <meshStandardMaterial color="#78350f" />
          </mesh>
          <mesh position={[0, 0.6, 0]} castShadow>
            <boxGeometry args={[2.0, 0.8, 2.0]} />
            <meshStandardMaterial color="#a16207" />
          </mesh>
        </group>
      ))}

      {/* Mini-Truck at Bay 1 */}
      <group position={[-12, 0.7, 3.2]} rotation={[0, 0, 0]}>
        {/* Cab */}
        <mesh position={[0, 1.2, -1.8]} castShadow>
          <boxGeometry args={[2.2, 1.8, 1.8]} />
          <meshStandardMaterial color="#2563eb" roughness={0.3} metalness={0.4} />
        </mesh>
        {/* Windshield */}
        <mesh position={[0, 1.4, -0.85]}>
          <boxGeometry args={[1.8, 1.0, 0.1]} />
          <meshStandardMaterial color="#38bdf8" roughness={0.1} transparent opacity={0.7} />
        </mesh>
        {/* Cargo Bed */}
        <mesh position={[0, 1.1, 1.4]} castShadow receiveShadow>
          <boxGeometry args={[2.4, 1.4, 3.8]} />
          <meshStandardMaterial color="#1e293b" />
        </mesh>
        {/* Produce Sacks inside bed */}
        <mesh position={[0, 1.5, 1.4]} castShadow>
          <boxGeometry args={[2.0, 0.9, 3.4]} />
          <meshStandardMaterial color="#b45309" />
        </mesh>
        {/* 4 Wheels */}
        {[
          [-1.2, 0.4, -1.2],
          [1.2, 0.4, -1.2],
          [-1.2, 0.4, 2.2],
          [1.2, 0.4, 2.2],
        ].map((wPos, wIdx) => (
          <mesh key={wIdx} position={wPos} rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.42, 0.42, 0.35, 12]} />
            <meshStandardMaterial color="#0f172a" roughness={0.9} />
          </mesh>
        ))}
      </group>

      {/* Tractor with Produce Trailer at Bay 3 */}
      <group position={[12, 0.7, 3.2]} rotation={[0, 0, 0]}>
        <mesh position={[0, 1.2, 1.4]} castShadow receiveShadow>
          <boxGeometry args={[2.5, 1.5, 4.2]} />
          <meshStandardMaterial color="#15803d" />
        </mesh>
        <mesh position={[0, 1.6, 1.4]} castShadow>
          <boxGeometry args={[2.2, 1.0, 3.8]} />
          <meshStandardMaterial color="#eab308" />
        </mesh>
        {[
          [-1.3, 0.45, 0],
          [1.3, 0.45, 0],
          [-1.3, 0.45, 2.8],
          [1.3, 0.45, 2.8],
        ].map((wPos, wIdx) => (
          <mesh key={wIdx} position={wPos} rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.5, 0.5, 0.38, 12]} />
            <meshStandardMaterial color="#0f172a" roughness={0.9} />
          </mesh>
        ))}
      </group>

      {/* Interactive Transport Beacon Badge */}
      <Html position={[0, 6.2, 0]} center distanceFactor={22}>
        <div className="flex flex-col items-center p-3 rounded-2xl bg-forest-950/95 border border-sky-400/50 shadow-2xl backdrop-blur-xl text-center select-none w-64">
          <div className="flex items-center gap-1.5 text-sky-400 text-xs font-bold font-display mb-0.5">
            <Truck className="w-4 h-4" />
            <span>Mandi Logistics Dock</span>
          </div>
          <p className="text-[10px] text-cream-200/70 font-mono">
            3 Active Loading Bays • Direct APMC Transit
          </p>
        </div>
      </Html>
    </group>
  );
};
