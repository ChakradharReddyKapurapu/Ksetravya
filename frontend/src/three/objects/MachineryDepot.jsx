import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { usePerformance } from '../../context/PerformanceContext';
import { Wrench, Sparkles, Tractor as TractorIcon } from 'lucide-react';

export const MachineryDepot = () => {
  const harvesterReelRef = useRef();
  const { setSelectedHotspot } = usePerformance();
  const [hovered, setHovered] = useState(false);

  useFrame((_, delta) => {
    if (harvesterReelRef.current) {
      // Rotating reel on combine harvester
      harvesterReelRef.current.rotation.x += delta * 1.5;
    }
  });

  return (
    <group
      position={[16, 0.6, -4]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() =>
        setSelectedHotspot({
          title: 'Machinery & Tool Rental Hub',
          detail: 'Harvester • Rotavator • Solar Drip Pump • ₹850/hr Available',
        })
      }
      className="cursor-pointer"
    >
      {/* Machinery Depot Concrete Pad */}
      <mesh position={[0, -0.2, 0]} receiveShadow>
        <boxGeometry args={[14, 0.3, 12]} />
        <meshStandardMaterial color="#475569" roughness={0.9} />
      </mesh>

      {/* Modern Red Combine Harvester */}
      <group position={[-2.5, 0, 0]}>
        {/* Chassis */}
        <mesh position={[0, 1.6, 0]} castShadow receiveShadow>
          <boxGeometry args={[3.2, 2.2, 4.8]} />
          <meshStandardMaterial color="#dc2626" roughness={0.4} />
        </mesh>
        {/* Cabin Glass */}
        <mesh position={[0, 2.4, 1.4]} castShadow>
          <boxGeometry args={[2.4, 1.4, 1.6]} />
          <meshStandardMaterial color="#38bdf8" roughness={0.1} transparent opacity={0.7} />
        </mesh>
        {/* Harvester Front Header Header Tray */}
        <mesh position={[0, 0.6, 3.2]} castShadow>
          <boxGeometry args={[4.2, 0.6, 1.6]} />
          <meshStandardMaterial color="#991b1b" />
        </mesh>
        {/* Rotating Grain Reel */}
        <group ref={harvesterReelRef} position={[0, 1.1, 3.6]}>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.6, 0.6, 4.0, 12]} />
            <meshStandardMaterial color="#f59e0b" roughness={0.3} metalness={0.6} />
          </mesh>
        </group>
        {/* 4 Heavy Tread Wheels */}
        {[
          [-1.7, 0.6, -1.2],
          [1.7, 0.6, -1.2],
          [-1.7, 0.6, 1.4],
          [1.7, 0.6, 1.4],
        ].map((wPos, wIdx) => (
          <mesh key={wIdx} position={wPos} rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.7, 0.7, 0.5, 12]} />
            <meshStandardMaterial color="#0f172a" roughness={0.95} />
          </mesh>
        ))}
      </group>

      {/* Yellow Disc Cultivator Implement parked on side */}
      <group position={[3.8, 0.4, -2.5]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[2.8, 0.8, 2.2]} />
          <meshStandardMaterial color="#eab308" metalness={0.4} />
        </mesh>
        {/* Steel Discs */}
        {[-0.8, 0, 0.8].map((dx, di) => (
          <mesh key={di} position={[dx, -0.1, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.45, 0.45, 0.1, 10]} />
            <meshStandardMaterial color="#334155" metalness={0.9} />
          </mesh>
        ))}
      </group>

      {/* Floating Machinery Telemetry Hotspot */}
      <Html position={[0, 4.2, 0]} center distanceFactor={28}>
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={() =>
            setSelectedHotspot({
              title: 'Machinery & Tool Rental Hub',
              detail: 'Combine Harvester 45 HP • Rotavator • Instant Booking Available',
            })
          }
          className="group relative cursor-pointer"
        >
          <div className="w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center text-stone-950 shadow-xl border border-white/50 animate-pulse">
            <Wrench className="w-3.5 h-3.5" />
          </div>
          {hovered && (
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-48 p-2 rounded-xl bg-forest-950/95 border border-amber-400/50 shadow-2xl backdrop-blur-xl text-left pointer-events-none">
              <span className="text-[10px] font-bold text-white block">Machinery Hub</span>
              <span className="text-[9px] text-amber-300 font-mono">Harvester & Implements • ₹850/hr</span>
            </div>
          )}
        </div>
      </Html>
    </group>
  );
};
