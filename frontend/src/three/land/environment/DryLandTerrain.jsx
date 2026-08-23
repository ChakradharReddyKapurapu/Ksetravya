import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export const DryLandTerrain = () => {
  const dustParticlesRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // Drifting dust particles in warm wind
    if (dustParticlesRef.current) {
      dustParticlesRef.current.position.x = -15 + ((t * 2.5) % 40);
      dustParticlesRef.current.position.y = 2.0 + Math.sin(t * 0.8) * 0.5;
    }
  });

  return (
    <group position={[0, -0.05, 0]}>
      {/* 1. Base Arid Ground Plane (Dry Earth Red-Brown) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[180, 180, 16, 16]} />
        <meshStandardMaterial color="#8c5835" roughness={1.0} />
      </mesh>

      {/* 2. Dry Furrow Lines across the dryfield */}
      {[-20, -12, -4, 4, 12, 20].map((fz, fIdx) => (
        <mesh key={`dry-furrow-${fIdx}`} position={[0, 0.08, fz]} castShadow receiveShadow>
          <boxGeometry args={[140, 0.14, 0.8]} />
          <meshStandardMaterial color="#6e3e20" roughness={1.0} />
        </mesh>
      ))}

      {/* 3. Sparse Dry Desert Grass & Shrubs */}
      {[-25, -15, -5, 5, 15, 25].map((sx, sIdx) =>
        [-20, -8, 8, 20].map((sz, zIdx) => (
          <group key={`shrub-${sIdx}-${zIdx}`} position={[sx + (zIdx % 2) * 2, 0, sz]}>
            <mesh position={[0, 0.25, 0]} castShadow>
              <coneGeometry args={[0.35, 0.5, 4]} />
              <meshStandardMaterial color="#a16207" roughness={0.9} />
            </mesh>
          </group>
        ))
      )}

      {/* 4. Dry Stone Wall Fences */}
      <group position={[0, 0.3, 16]}>
        <mesh castShadow>
          <boxGeometry args={[70, 0.6, 0.4]} />
          <meshStandardMaterial color="#78716c" roughness={0.95} />
        </mesh>
      </group>

      {/* 5. Drifting Dust Particles */}
      <group ref={dustParticlesRef} position={[-20, 2, 0]}>
        {[...Array(16)].map((_, i) => (
          <mesh
            key={`dust-${i}`}
            position={[
              (i % 5) * 6 - 12,
              Math.sin(i) * 1.5,
              ((i * 7) % 25) - 12,
            ]}
          >
            <sphereGeometry args={[0.08, 4, 4]} />
            <meshBasicMaterial color="#d97706" transparent opacity={0.4} />
          </mesh>
        ))}
      </group>
    </group>
  );
};
