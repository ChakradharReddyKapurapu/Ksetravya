import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { usePerformance } from '../../context/PerformanceContext';
import { Home, SunMedium, Wind } from 'lucide-react';

export const FarmHouse = () => {
  const windmillBladesRef = useRef();
  const { windSpeed, setSelectedHotspot } = usePerformance();
  const [hovered, setHovered] = useState(false);

  useFrame((_, delta) => {
    if (windmillBladesRef.current) {
      // Windmill spins proportionally to global wind speed
      windmillBladesRef.current.rotation.z += delta * (1.8 * windSpeed);
    }
  });

  return (
    <group
      position={[22, 1.2, -18]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() =>
        setSelectedHotspot({
          title: 'Solar Farmstead & Smart Hub',
          detail: 'Clean Solar Output: 14.8 kW • Wind Extraction: 6.2 kW • Battery: 98%',
        })
      }
      className="cursor-pointer"
    >
      {/* Main Two-Story Wooden Farmhouse */}
      <mesh position={[0, 2.2, 0]} castShadow receiveShadow>
        <boxGeometry args={[7.2, 4.4, 6.2]} />
        <meshStandardMaterial color="#8b5a2b" roughness={0.85} />
      </mesh>

      {/* Rustic Terracotta Pitched Gable Roof */}
      <mesh position={[0, 5.2, 0]} rotation={[0, 0, 0]} castShadow>
        <coneGeometry args={[5.2, 2.4, 4]} rotation={[0, Math.PI / 4, 0]} />
        <meshStandardMaterial color="#b91c1c" roughness={0.7} />
      </mesh>

      {/* Stone Chimney with subtle smoke */}
      <mesh position={[2.2, 4.8, -1.2]} castShadow>
        <boxGeometry args={[0.9, 3.2, 0.9]} />
        <meshStandardMaterial color="#57534e" roughness={0.9} />
      </mesh>

      {/* Glowing Warm Windows */}
      <mesh position={[-1.8, 2.0, 3.12]}>
        <planeGeometry args={[1.2, 1.4]} />
        <meshStandardMaterial color="#fef08a" emissive="#f59e0b" emissiveIntensity={1.4} />
      </mesh>
      <mesh position={[1.8, 2.0, 3.12]}>
        <planeGeometry args={[1.2, 1.4]} />
        <meshStandardMaterial color="#fef08a" emissive="#f59e0b" emissiveIntensity={1.4} />
      </mesh>

      {/* Modern Solar Panel Array beside the house */}
      <group position={[6.5, 0.4, 1.2]} rotation={[-0.35, -0.4, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[4.8, 0.15, 3.2]} />
          <meshStandardMaterial color="#0f172a" metalness={0.9} roughness={0.15} />
        </mesh>
        {/* Panel Support Struts */}
        <mesh position={[-2, -0.8, -1]}>
          <cylinderGeometry args={[0.06, 0.06, 1.6, 6]} />
          <meshStandardMaterial color="#64748b" />
        </mesh>
        <mesh position={[2, -0.8, -1]}>
          <cylinderGeometry args={[0.06, 0.06, 1.6, 6]} />
          <meshStandardMaterial color="#64748b" />
        </mesh>
      </group>

      {/* Traditional Wooden Farm Windmill */}
      <group position={[-6.2, 0, -2.5]}>
        {/* Lattice Timber Tower */}
        <mesh position={[0, 4.5, 0]} castShadow>
          <cylinderGeometry args={[0.8, 1.8, 9.0, 8]} />
          <meshStandardMaterial color="#78350f" roughness={0.9} />
        </mesh>
        {/* Hub */}
        <mesh position={[0, 9.2, 1.0]}>
          <sphereGeometry args={[0.4, 12, 12]} />
          <meshStandardMaterial color="#1e293b" metalness={0.8} />
        </mesh>
        {/* Rotating 8-Blade Windmill Assembly */}
        <group ref={windmillBladesRef} position={[0, 9.2, 1.2]}>
          {[...Array(8)].map((_, i) => (
            <mesh
              key={i}
              position={[0, 0, 0]}
              rotation={[0, 0, (i * Math.PI) / 4]}
              castShadow
            >
              <boxGeometry args={[0.22, 4.2, 0.04]} />
              <meshStandardMaterial color="#f8fafc" roughness={0.5} />
            </mesh>
          ))}
        </group>
      </group>

      {/* Floating Farmstead Telemetry Beacon */}
      <Html position={[0, 6.8, 0]} center distanceFactor={28}>
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={() =>
            setSelectedHotspot({
              title: 'Solar Farmstead & Smart Hub',
              detail: 'Solar Generation: 14.8 kW • Smart Grid: Online • Battery: 98%',
            })
          }
          className="group relative cursor-pointer"
        >
          <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-stone-950 shadow-xl border border-white/50 animate-pulse">
            <Home className="w-3.5 h-3.5" />
          </div>
          {hovered && (
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-48 p-2 rounded-xl bg-forest-950/95 border border-emerald-400/50 shadow-2xl backdrop-blur-xl text-left pointer-events-none">
              <span className="text-[10px] font-bold text-white block">Solar Farmstead & Hub</span>
              <span className="text-[9px] text-emerald-300 font-mono">14.8 kW Clean Output • 100% Green</span>
            </div>
          )}
        </div>
      </Html>
    </group>
  );
};
