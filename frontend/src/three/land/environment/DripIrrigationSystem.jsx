import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export const DripIrrigationSystem = () => {
  const dropletsGroupRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // Periodic water droplet pulse & sparkle
    if (dropletsGroupRef.current) {
      dropletsGroupRef.current.children.forEach((drop, idx) => {
        const scale = 0.5 + Math.sin(t * 5 + idx * 1.2) * 0.45;
        drop.scale.setScalar(Math.max(0.1, scale));
      });
    }
  });

  const rowXs = [-5, -2.5, 0, 2.5, 5];

  return (
    <group position={[0, 0, 4]}>
      {/* Black Lateral Drip Tubing running along each crop row */}
      {rowXs.map((rx, rIdx) => (
        <group key={`drip-row-${rIdx}`} position={[rx, 0.08, 0]}>
          {/* Continuous Black Polyethylene Drip Pipe */}
          <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
            <cylinderGeometry args={[0.04, 0.04, 36, 8]} />
            <meshStandardMaterial color="#09090b" roughness={0.4} metalness={0.2} />
          </mesh>

          {/* Micro Emitter Nodes along the pipe */}
          {[-15, -10, -5, 0, 5, 10, 15].map((ez, eIdx) => (
            <mesh key={`emitter-${eIdx}`} position={[0, 0.04, ez]} castShadow>
              <boxGeometry args={[0.09, 0.06, 0.09]} />
              <meshStandardMaterial color="#27272a" />
            </mesh>
          ))}
        </group>
      ))}

      {/* Pulsating Water Droplets at Emitter Points */}
      <group ref={dropletsGroupRef} position={[0, 0.12, 0]}>
        {rowXs.map((rx) =>
          [-15, -10, -5, 0, 5, 10, 15].map((ez, idx) => (
            <mesh key={`drop-${rx}-${ez}`} position={[rx + 0.06, 0, ez]}>
              <sphereGeometry args={[0.08, 8, 8]} />
              <meshStandardMaterial
                color="#38bdf8"
                roughness={0.05}
                metalness={0.9}
                emissive="#0284c7"
                emissiveIntensity={0.6}
              />
            </mesh>
          ))
        )}
      </group>

      {/* Healthy Crop Row Stalks (Dense green foliage) */}
      {rowXs.map((rx, rIdx) =>
        [-16, -12, -8, -4, 0, 4, 8, 12, 16].map((rz, zIdx) => (
          <group key={`plant-${rIdx}-${zIdx}`} position={[rx, 0, rz]}>
            {/* Green Leaf Canopy */}
            <mesh position={[0, 0.55, 0]} castShadow>
              <coneGeometry args={[0.45, 0.9, 5]} />
              <meshStandardMaterial color="#22c55e" roughness={0.6} />
            </mesh>
            <mesh position={[0, 0.3, 0]} castShadow>
              <coneGeometry args={[0.6, 0.6, 5]} />
              <meshStandardMaterial color="#16a34a" roughness={0.7} />
            </mesh>
          </group>
        ))
      )}
    </group>
  );
};
