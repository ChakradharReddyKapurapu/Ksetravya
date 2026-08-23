import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export const JobsAnimatedWorkers = () => {
  const walkingGroupRef = useRef();
  const tractorRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // 1. Walking along the road (looping movement from z = 35 to z = -5)
    if (walkingGroupRef.current) {
      walkingGroupRef.current.position.z = 25 - ((t * 2.2) % 30);
      // Subtle step bobbing
      walkingGroupRef.current.position.y = Math.abs(Math.sin(t * 7)) * 0.08;
    }

    // 2. Tractor moving in background
    if (tractorRef.current) {
      tractorRef.current.position.x = -20 + ((t * 1.5) % 45);
    }
  });

  return (
    <group position={[0, -0.4, 0]}>
      {/* ====================================================
          1. WALKING WORKERS ON ROAD (Heading into the farm)
         ==================================================== */}
      <group ref={walkingGroupRef} position={[-2, 0, 15]}>
        {/* Worker 1: Lead Farmer with Straw Hat & Hoe */}
        <group position={[-0.8, 0, 0]}>
          {/* Legs & Torso */}
          <mesh position={[0, 0.5, 0]} castShadow>
            <cylinderGeometry args={[0.16, 0.18, 1.0, 6]} />
            <meshStandardMaterial color="#0284c7" roughness={0.8} />
          </mesh>
          {/* Head & Straw Hat */}
          <mesh position={[0, 1.15, 0]} castShadow>
            <sphereGeometry args={[0.15, 6, 6]} />
            <meshStandardMaterial color="#d97706" />
          </mesh>
          <mesh position={[0, 1.25, 0]} castShadow>
            <coneGeometry args={[0.38, 0.12, 8]} />
            <meshStandardMaterial color="#fef08a" roughness={0.9} />
          </mesh>
          {/* Hoe Tool on Shoulder */}
          <mesh position={[0.2, 0.9, -0.1]} rotation={[0.4, 0, 0.3]} castShadow>
            <cylinderGeometry args={[0.02, 0.02, 1.2, 4]} />
            <meshStandardMaterial color="#5c3a21" />
          </mesh>
        </group>

        {/* Worker 2: Worker with Yellow Turban & Bucket */}
        <group position={[0.7, 0, -1.8]}>
          <mesh position={[0, 0.5, 0]} castShadow>
            <cylinderGeometry args={[0.16, 0.18, 1.0, 6]} />
            <meshStandardMaterial color="#ea580c" roughness={0.8} />
          </mesh>
          <mesh position={[0, 1.15, 0]} castShadow>
            <sphereGeometry args={[0.15, 6, 6]} />
            <meshStandardMaterial color="#d97706" />
          </mesh>
          <mesh position={[0, 1.25, 0]} castShadow>
            <sphereGeometry args={[0.22, 6, 6]} />
            <meshStandardMaterial color="#f59e0b" roughness={0.8} />
          </mesh>
          {/* Bucket */}
          <mesh position={[-0.28, 0.3, 0]} castShadow>
            <cylinderGeometry args={[0.12, 0.09, 0.28, 6]} />
            <meshStandardMaterial color="#64748b" metalness={0.6} />
          </mesh>
        </group>
      </group>

      {/* ====================================================
          2. WORKERS IN LEFT PADDY / CROP FIELD (Bending & planting)
         ==================================================== */}
      {[-14, -10, -17].map((x, i) => (
        <group key={`field-worker-${i}`} position={[x, 0, 2 + i * 5]} rotation={[0, 0.4, 0]}>
          {/* Bended Torso */}
          <mesh position={[0, 0.4, 0]} rotation={[0.5, 0, 0]} castShadow>
            <boxGeometry args={[0.3, 0.6, 0.25]} />
            <meshStandardMaterial color={i % 2 === 0 ? '#15803d' : '#b45309'} />
          </mesh>
          {/* Straw Hat */}
          <mesh position={[0, 0.75, 0.2]} castShadow>
            <coneGeometry args={[0.35, 0.12, 8]} />
            <meshStandardMaterial color="#fef08a" />
          </mesh>
        </group>
      ))}

      {/* ====================================================
          3. DISTANT TRACTOR MOVING IN BACK FIELD (z = -8)
         ==================================================== */}
      <group ref={tractorRef} position={[-15, 0, -8]}>
        {/* Tractor Body Chassis */}
        <mesh position={[0, 0.6, 0]} castShadow>
          <boxGeometry args={[2.0, 0.7, 1.2]} />
          <meshStandardMaterial color="#dc2626" roughness={0.4} />
        </mesh>
        {/* Cab Hood */}
        <mesh position={[0.5, 1.1, 0]} castShadow>
          <boxGeometry args={[0.8, 0.9, 1.1]} />
          <meshStandardMaterial color="#1e293b" />
        </mesh>
        {/* Big Rear Wheels */}
        <mesh position={[0.5, 0.45, 0.65]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.45, 0.45, 0.25, 8]} />
          <meshStandardMaterial color="#0f172a" roughness={0.9} />
        </mesh>
        <mesh position={[0.5, 0.45, -0.65]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.45, 0.45, 0.25, 8]} />
          <meshStandardMaterial color="#0f172a" roughness={0.9} />
        </mesh>
        {/* Small Front Wheels */}
        <mesh position={[-0.7, 0.25, 0.55]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.25, 0.25, 0.2, 8]} />
          <meshStandardMaterial color="#0f172a" roughness={0.9} />
        </mesh>
        <mesh position={[-0.7, 0.25, -0.55]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.25, 0.25, 0.2, 8]} />
          <meshStandardMaterial color="#0f172a" roughness={0.9} />
        </mesh>
      </group>
    </group>
  );
};
