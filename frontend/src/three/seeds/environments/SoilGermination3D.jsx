import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export const SoilGermination3D = () => {
  const sproutRef = useRef();
  const rootRef = useRef();

  useFrame(({ clock }) => {
    const t = (Math.sin(clock.getElapsedTime() * 1.2) + 1) / 2; // 0 to 1 cycle
    if (sproutRef.current) {
      sproutRef.current.scale.set(1, 0.4 + t * 0.9, 1);
      sproutRef.current.position.y = 0.5 + t * 0.4;
    }
    if (rootRef.current) {
      rootRef.current.scale.set(1, 0.5 + t * 0.8, 1);
    }
  });

  return (
    <group position={[0, 0, -4]}>
      {/* Soil Cross-Section Cutaway Box */}
      <mesh position={[0, -1.2, 0]} receiveShadow>
        <boxGeometry args={[14, 2.4, 4]} />
        <meshStandardMaterial color="#2d170b" roughness={0.95} />
      </mesh>

      {/* Topsoil Humus Layer (Dark Rich Loam) */}
      <mesh position={[0, 0, 0]} receiveShadow>
        <boxGeometry args={[14.1, 0.3, 4.1]} />
        <meshStandardMaterial color="#1a0e07" roughness={0.9} />
      </mesh>

      {/* Embedded Seed Embryo */}
      <mesh position={[0, -0.4, 1.8]} rotation={[0.2, 0.4, 0]} castShadow>
        <sphereGeometry args={[0.32, 12, 12]} scale={[1.4, 0.9, 0.9]} />
        <meshStandardMaterial color="#d97706" roughness={0.4} />
      </mesh>

      {/* Germinating Radicle Root System (Growing Downward into Soil) */}
      <group ref={rootRef} position={[0, -0.6, 1.8]}>
        <mesh position={[0, -0.5, 0]}>
          <cylinderGeometry args={[0.04, 0.01, 1.0, 6]} />
          <meshStandardMaterial color="#fef08a" />
        </mesh>
        <mesh position={[-0.2, -0.4, 0]} rotation={[0, 0, 0.4]}>
          <cylinderGeometry args={[0.02, 0.01, 0.6, 6]} />
          <meshStandardMaterial color="#fef08a" />
        </mesh>
        <mesh position={[0.2, -0.4, 0]} rotation={[0, 0, -0.4]}>
          <cylinderGeometry args={[0.02, 0.01, 0.6, 6]} />
          <meshStandardMaterial color="#fef08a" />
        </mesh>
      </group>

      {/* Emerging Green Sprout & Cotyledon Leaves (Reaching toward Sunlight) */}
      <group ref={sproutRef} position={[0, 0.5, 1.8]}>
        {/* Plumule Stem */}
        <mesh position={[0, 0.3, 0]} castShadow>
          <cylinderGeometry args={[0.05, 0.06, 0.8, 8]} />
          <meshStandardMaterial color="#4ade80" />
        </mesh>
        {/* Dual Cotyledon Leaves */}
        <mesh position={[0.25, 0.7, 0]} rotation={[0, 0, -0.6]} castShadow>
          <sphereGeometry args={[0.22, 8, 8]} scale={[1.3, 0.3, 0.8]} />
          <meshStandardMaterial color="#22c55e" roughness={0.5} />
        </mesh>
        <mesh position={[-0.25, 0.7, 0]} rotation={[0, 0, 0.6]} castShadow>
          <sphereGeometry args={[0.22, 8, 8]} scale={[1.3, 0.3, 0.8]} />
          <meshStandardMaterial color="#22c55e" roughness={0.5} />
        </mesh>
      </group>
    </group>
  );
};
