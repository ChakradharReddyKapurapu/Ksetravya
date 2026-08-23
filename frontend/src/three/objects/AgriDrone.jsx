import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { usePerformance } from '../../context/PerformanceContext';
import { Radio, Sparkles } from 'lucide-react';

export const AgriDrone = () => {
  const droneRef = useRef();
  const rotor1 = useRef();
  const rotor2 = useRef();
  const rotor3 = useRef();
  const rotor4 = useRef();
  const { graphicsConfig, setSelectedHotspot } = usePerformance();
  const [hovered, setHovered] = useState(false);

  useFrame((state, delta) => {
    if (!droneRef.current || !graphicsConfig.droneActive) return;
    const t = state.clock.getElapsedTime();

    // Autonomous scanning flight path over the crop fields
    const x = -20 + Math.sin(t * 0.45) * 12;
    const z = -2 + Math.cos(t * 0.45) * 8;
    const y = 9.5 + Math.sin(t * 1.5) * 0.6;

    droneRef.current.position.set(x, y, z);
    droneRef.current.rotation.y = Math.atan2(Math.cos(t * 0.45), -Math.sin(t * 0.45));
    droneRef.current.rotation.z = Math.sin(t * 1.5) * 0.08;

    // High-speed rotor spin
    const spin = delta * 35;
    if (rotor1.current) rotor1.current.rotation.y += spin;
    if (rotor2.current) rotor2.current.rotation.y -= spin;
    if (rotor3.current) rotor3.current.rotation.y += spin;
    if (rotor4.current) rotor4.current.rotation.y -= spin;
  });

  if (!graphicsConfig.droneActive) return null;

  return (
    <group
      ref={droneRef}
      position={[-20, 9.5, -2]}
      scale={[0.65, 0.65, 0.65]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() =>
        setSelectedHotspot({
          title: 'Agri-Drone Sentinel #04',
          detail: 'Altitude: 9.5m • Multispectral NDVI: 0.82 (High Vigour) • Battery: 88%',
        })
      }
      className="cursor-pointer"
    >
      {/* Central Drone Chassis */}
      <mesh castShadow>
        <boxGeometry args={[0.9, 0.22, 0.9]} />
        <meshStandardMaterial color="#1e293b" roughness={0.3} metalness={0.7} />
      </mesh>

      {/* Top GPS / Sensor Dome */}
      <mesh position={[0, 0.2, 0]} castShadow>
        <sphereGeometry args={[0.22, 12, 12]} />
        <meshStandardMaterial color="#22c55e" emissive="#15803d" emissiveIntensity={0.8} />
      </mesh>

      {/* 4 Carbon Arms */}
      {[
        [-0.7, 0, -0.7],
        [0.7, 0, -0.7],
        [-0.7, 0, 0.7],
        [0.7, 0, 0.7],
      ].map((pos, idx) => (
        <mesh key={idx} position={pos} castShadow>
          <cylinderGeometry args={[0.04, 0.04, 1.0, 8]} rotation={[0, 0, Math.PI / 4]} />
          <meshStandardMaterial color="#0f172a" metalness={0.9} />
        </mesh>
      ))}

      {/* 4 Rotors & Motors */}
      <group position={[-1.0, 0.15, -1.0]} ref={rotor1}>
        <mesh castShadow><cylinderGeometry args={[0.1, 0.1, 0.15, 8]} /><meshStandardMaterial color="#334155" /></mesh>
        <mesh position={[0, 0.1, 0]}><boxGeometry args={[0.9, 0.02, 0.1]} /><meshStandardMaterial color="#e2e8f0" transparent opacity={0.6} /></mesh>
      </group>

      <group position={[1.0, 0.15, -1.0]} ref={rotor2}>
        <mesh castShadow><cylinderGeometry args={[0.1, 0.1, 0.15, 8]} /><meshStandardMaterial color="#334155" /></mesh>
        <mesh position={[0, 0.1, 0]}><boxGeometry args={[0.9, 0.02, 0.1]} /><meshStandardMaterial color="#e2e8f0" transparent opacity={0.6} /></mesh>
      </group>

      <group position={[-1.0, 0.15, 1.0]} ref={rotor3}>
        <mesh castShadow><cylinderGeometry args={[0.1, 0.1, 0.15, 8]} /><meshStandardMaterial color="#334155" /></mesh>
        <mesh position={[0, 0.1, 0]}><boxGeometry args={[0.9, 0.02, 0.1]} /><meshStandardMaterial color="#e2e8f0" transparent opacity={0.6} /></mesh>
      </group>

      <group position={[1.0, 0.15, 1.0]} ref={rotor4}>
        <mesh castShadow><cylinderGeometry args={[0.1, 0.1, 0.15, 8]} /><meshStandardMaterial color="#334155" /></mesh>
        <mesh position={[0, 0.1, 0]}><boxGeometry args={[0.9, 0.02, 0.1]} /><meshStandardMaterial color="#e2e8f0" transparent opacity={0.6} /></mesh>
      </group>

      {/* Multispectral Scanning Laser Beam projecting downward */}
      <spotLight
        position={[0, -0.2, 0]}
        target-position={[0, -8, 0]}
        color="#4ade80"
        intensity={3.2}
        angle={0.5}
        penumbra={0.8}
        distance={15}
      />

      {/* Interactive Drone Telemetry */}
      {hovered && (
        <Html position={[0, 1.8, 0]} center distanceFactor={22}>
          <div className="p-2 rounded-xl bg-forest-950/95 border border-emerald-400/60 shadow-2xl backdrop-blur-xl text-left pointer-events-none w-44">
            <span className="text-[10px] font-bold text-white block">Agri-Drone Sentinel #04</span>
            <span className="text-[9px] text-emerald-300 font-mono">Multispectral NDVI: 0.82 • Active</span>
          </div>
        </Html>
      )}
    </group>
  );
};
