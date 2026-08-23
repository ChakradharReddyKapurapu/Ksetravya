import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export const HarvestingFieldEnv = () => {
  const reelRef = useRef();

  useFrame((_, delta) => {
    if (reelRef.current) {
      reelRef.current.rotation.x += delta * 2.0;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Golden Grain Field Floor */}
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[45, 45]} />
        <meshStandardMaterial color="#854d0e" roughness={0.9} />
      </mesh>

      {/* Rows of Golden Wheat Stalks */}
      {[-8, -5, -2, 2, 5, 8].map((x, xi) => (
        <group key={xi} position={[x, 0, 6]}>
          {[...Array(10)].map((_, zi) => (
            <mesh key={zi} position={[0, 0.7, -zi * 1.5]} castShadow>
              <coneGeometry args={[0.25, 1.4, 4]} />
              <meshStandardMaterial color="#eab308" />
            </mesh>
          ))}
        </group>
      ))}

      {/* Red Combine Harvester in Action */}
      <group position={[0, 0.3, -4]}>
        {/* Main Body */}
        <mesh position={[0, 1.8, 0]} castShadow receiveShadow>
          <boxGeometry args={[3.6, 2.4, 5.2]} />
          <meshStandardMaterial color="#dc2626" roughness={0.4} />
        </mesh>
        {/* Cab */}
        <mesh position={[0, 2.8, 1.6]} castShadow>
          <boxGeometry args={[2.8, 1.4, 1.8]} />
          <meshStandardMaterial color="#38bdf8" roughness={0.1} transparent opacity={0.7} />
        </mesh>
        {/* Cutter Header Bar */}
        <mesh position={[0, 0.7, 3.6]} castShadow>
          <boxGeometry args={[5.5, 0.7, 1.8]} />
          <meshStandardMaterial color="#991b1b" />
        </mesh>
        {/* Rotating Grain Reel */}
        <group ref={reelRef} position={[0, 1.3, 4.0]}>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.75, 0.75, 5.2, 12]} />
            <meshStandardMaterial color="#f59e0b" roughness={0.3} metalness={0.6} />
          </mesh>
        </group>
        {/* 4 Large Crawler / Tire Wheels */}
        {[
          [-1.9, 0.7, -1.4],
          [1.9, 0.7, -1.4],
          [-1.9, 0.7, 1.6],
          [1.9, 0.7, 1.6],
        ].map((wPos, wIdx) => (
          <mesh key={wIdx} position={wPos} rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.85, 0.85, 0.6, 12]} />
            <meshStandardMaterial color="#0f172a" roughness={0.95} />
          </mesh>
        ))}
      </group>
    </group>
  );
};
