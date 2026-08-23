import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export const BorewellPumpFlume = () => {
  const waterJetRef = useRef();
  const splashRef = useRef();
  const flumeWaterRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // Pulsating water jet from discharge nozzle
    if (waterJetRef.current) {
      waterJetRef.current.scale.set(
        1 + Math.sin(t * 12) * 0.08,
        1 + Math.cos(t * 14) * 0.05,
        1 + Math.sin(t * 10) * 0.08
      );
    }

    // Splash foam pulsation
    if (splashRef.current) {
      splashRef.current.scale.setScalar(1 + Math.sin(t * 15) * 0.18);
      splashRef.current.rotation.y = t * 3;
    }

    // Flowing water in flume
    if (flumeWaterRef.current) {
      flumeWaterRef.current.position.y = 0.25 + Math.sin(t * 4) * 0.02;
    }
  });

  return (
    <group position={[14, 0, 8]}>
      {/* 1. Concrete Base Slab */}
      <mesh position={[0, 0.15, 0]} castShadow receiveShadow>
        <boxGeometry args={[4.5, 0.3, 3.5]} />
        <meshStandardMaterial color="#94a3b8" roughness={0.9} />
      </mesh>

      {/* 2. Electric Motor Pump Body (Horizontal Cylinder with Cooling Fins) */}
      <group position={[-0.8, 0.7, 0]}>
        {/* Motor Cylinder */}
        <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.38, 0.38, 1.2, 16]} />
          <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.3} />
        </mesh>
        {/* Terminal Box */}
        <mesh position={[0, 0.45, 0]} castShadow>
          <boxGeometry args={[0.35, 0.2, 0.3]} />
          <meshStandardMaterial color="#0f172a" />
        </mesh>
        {/* Pump Impeller Housing */}
        <mesh position={[0.75, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.5, 0.5, 0.4, 16]} />
          <meshStandardMaterial color="#475569" metalness={0.7} roughness={0.4} />
        </mesh>
      </group>

      {/* 3. Borewell Suction Pipe (Vertical from Ground) */}
      <mesh position={[0, 0.6, 0]} castShadow>
        <cylinderGeometry args={[0.16, 0.16, 1.0, 12]} />
        <meshStandardMaterial color="#64748b" metalness={0.85} roughness={0.2} />
      </mesh>

      {/* 4. Discharge Pipe & Elbow (Curved toward the Flume) */}
      <group position={[0, 1.1, 0]}>
        {/* Upper Pipe */}
        <mesh position={[0.5, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.15, 0.15, 1.0, 12]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Downward Elbow */}
        <mesh position={[1.0, -0.2, 0]} rotation={[0, 0, -0.6]} castShadow>
          <cylinderGeometry args={[0.15, 0.15, 0.5, 12]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.9} roughness={0.2} />
        </mesh>
      </group>

      {/* 5. Gushing Water Jet Falling into Flume */}
      <group ref={waterJetRef} position={[1.2, 0.55, 0]}>
        <mesh rotation={[0, 0, -0.7]}>
          <cylinderGeometry args={[0.12, 0.22, 0.9, 8]} />
          <meshStandardMaterial
            color="#38bdf8"
            roughness={0.05}
            metalness={0.6}
            emissive="#0284c7"
            emissiveIntensity={0.5}
            transparent
            opacity={0.85}
          />
        </mesh>
      </group>

      {/* 6. Concrete Irrigation Flume / Distribution Channel */}
      <group position={[1.8, 0, -8]}>
        {/* Flume Concrete Walls */}
        {/* Bottom */}
        <mesh position={[0, 0.1, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.8, 0.2, 22]} />
          <meshStandardMaterial color="#94a3b8" roughness={0.85} />
        </mesh>
        {/* Left Wall */}
        <mesh position={[-0.95, 0.35, 0]} castShadow>
          <boxGeometry args={[0.2, 0.5, 22]} />
          <meshStandardMaterial color="#cbd5e1" roughness={0.85} />
        </mesh>
        {/* Right Wall */}
        <mesh position={[0.95, 0.35, 0]} castShadow>
          <boxGeometry args={[0.2, 0.5, 22]} />
          <meshStandardMaterial color="#cbd5e1" roughness={0.85} />
        </mesh>

        {/* Flowing Water Inside Flume */}
        <mesh
          ref={flumeWaterRef}
          position={[0, 0.25, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <planeGeometry args={[1.6, 21.8]} />
          <meshStandardMaterial
            color="#38bdf8"
            roughness={0.08}
            metalness={0.8}
            emissive="#0284c7"
            emissiveIntensity={0.3}
          />
        </mesh>

        {/* Splash & Foam Point at inlet (z = 8) */}
        <group ref={splashRef} position={[0, 0.3, 8]}>
          <mesh>
            <sphereGeometry args={[0.45, 8, 6]} />
            <meshStandardMaterial color="#ffffff" transparent opacity={0.7} />
          </mesh>
        </group>
      </group>
    </group>
  );
};
