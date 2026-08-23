import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export const RiverWaterStream = () => {
  const waterMeshRef = useRef();
  const duckGroupRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // Subtle water stream ripple animation
    if (waterMeshRef.current) {
      waterMeshRef.current.position.y = 0.05 + Math.sin(t * 1.8) * 0.03;
    }

    // Swimming waterfowl gently bobbing and drifting downstream
    if (duckGroupRef.current) {
      duckGroupRef.current.position.z = -12 + ((t * 0.8) % 30);
      duckGroupRef.current.position.y = 0.15 + Math.sin(t * 3.0) * 0.04;
    }
  });

  return (
    <group position={[-18, 0, 0]}>
      {/* 1. Main Riverbed Channel (Wide natural curve) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]} receiveShadow>
        <planeGeometry args={[18, 110]} />
        <meshStandardMaterial color="#1a2f1a" roughness={0.9} />
      </mesh>

      {/* 2. Flowing Water Surface (High reflectivity & cyan river sheen) */}
      <mesh
        ref={waterMeshRef}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0.05, 0]}
      >
        <planeGeometry args={[16, 110, 16, 32]} />
        <meshStandardMaterial
          color="#0284c7"
          roughness={0.08}
          metalness={0.85}
          emissive="#0369a1"
          emissiveIntensity={0.35}
          transparent
          opacity={0.92}
        />
      </mesh>

      {/* 3. Riverbank Rocks & Vegetation along left and right banks */}
      {[-8, 8].map((bankX, bIdx) =>
        [-35, -20, -5, 10, 25, 40].map((bankZ, zIdx) => (
          <group key={`bank-${bIdx}-${zIdx}`} position={[bankX, 0.2, bankZ]}>
            {/* Smooth river stones */}
            <mesh position={[(zIdx % 2) * 0.4, 0, 0]} castShadow>
              <sphereGeometry args={[0.4 + (zIdx % 3) * 0.15, 6, 6]} />
              <meshStandardMaterial color="#64748b" roughness={0.8} />
            </mesh>
            {/* Reeds / river grass */}
            <mesh position={[0, 0.5, 0.3]} castShadow>
              <cylinderGeometry args={[0.04, 0.08, 1.0, 4]} />
              <meshStandardMaterial color="#15803d" roughness={0.7} />
            </mesh>
          </group>
        ))
      )}

      {/* 4. Swimming Waterfowl / Ducks */}
      <group ref={duckGroupRef} position={[-2, 0, -10]}>
        {[
          [0, 0, 0],
          [1.5, 0, -2],
          [-1.2, 0, -3.5],
        ].map(([dx, dy, dz], dIdx) => (
          <group key={dIdx} position={[dx, dy, dz]}>
            {/* Duck Body */}
            <mesh castShadow>
              <capsuleGeometry args={[0.2, 0.45, 4, 8]} rotation={[0, 0, Math.PI / 2]} />
              <meshStandardMaterial color="#334155" roughness={0.7} />
            </mesh>
            {/* Duck Head */}
            <mesh position={[0.28, 0.22, 0]} castShadow>
              <sphereGeometry args={[0.14, 6, 6]} />
              <meshStandardMaterial color="#047857" />
            </mesh>
            {/* Duck Beak */}
            <mesh position={[0.42, 0.2, 0]} rotation={[0, 0, -Math.PI / 2]}>
              <coneGeometry args={[0.06, 0.16, 4]} />
              <meshStandardMaterial color="#f59e0b" />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
};
