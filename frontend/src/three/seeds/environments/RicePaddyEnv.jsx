import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export const RicePaddyEnv = () => {
  const waterRef = useRef();

  useFrame(({ clock }) => {
    if (waterRef.current) {
      waterRef.current.position.y = 0.08 + Math.sin(clock.getElapsedTime() * 1.5) * 0.015;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* 1. Terraced Paddy Mud Bed */}
      <mesh position={[0, -0.05, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[70, 70]} />
        <meshStandardMaterial color="#2d3723" roughness={0.9} />
      </mesh>

      {/* 2. Shimmering Flooded Water Layer */}
      <mesh ref={waterRef} position={[0, 0.08, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[65, 65]} />
        <meshStandardMaterial
          color="#38bdf8"
          roughness={0.1}
          metalness={0.8}
          transparent
          opacity={0.65}
        />
      </mesh>

      {/* 3. Paddy Bund Ridges (Mud dikes separating terraces) */}
      {[-12, -4, 4, 12].map((x, xi) => (
        <mesh key={xi} position={[x, 0.2, 0]} receiveShadow castShadow>
          <boxGeometry args={[0.9, 0.4, 60]} />
          <meshStandardMaterial color="#451a03" roughness={0.95} />
        </mesh>
      ))}

      {/* 4. Lush Green Rice Seedling Tufts (Transplanted Paddy Rows) */}
      {[-10, -7, -2, 1, 6, 9].map((rx, rxi) => (
        <group key={rxi} position={[rx, 0.1, 0]}>
          {[...Array(14)].map((_, zi) => (
            <group key={zi} position={[0, 0.4, -26 + zi * 4]}>
              <mesh position={[0, 0, 0]} castShadow>
                <coneGeometry args={[0.25, 0.9, 5]} />
                <meshStandardMaterial color="#22c55e" roughness={0.7} />
              </mesh>
              <mesh position={[0.1, -0.1, 0.1]} rotation={[0.2, 0.3, -0.2]}>
                <coneGeometry args={[0.15, 0.7, 4]} />
                <meshStandardMaterial color="#4ade80" />
              </mesh>
            </group>
          ))}
        </group>
      ))}

      {/* 5. Water Inflow Irrigation Sluice Gate */}
      <group position={[18, 0.3, -8]}>
        <mesh position={[0, 0.8, 0]} castShadow>
          <boxGeometry args={[1.2, 1.8, 2.4]} />
          <meshStandardMaterial color="#475569" />
        </mesh>
        <mesh position={[0, 1.2, 0]}>
          <boxGeometry args={[0.2, 1.4, 1.8]} />
          <meshStandardMaterial color="#b91c1c" />
        </mesh>
      </group>
    </group>
  );
};
