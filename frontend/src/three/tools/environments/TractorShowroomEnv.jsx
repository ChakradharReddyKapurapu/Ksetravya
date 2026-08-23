import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export const TractorShowroomEnv = () => {
  const turntableRef = useRef();

  useFrame((_, delta) => {
    if (turntableRef.current) {
      turntableRef.current.rotation.y += delta * 0.25;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Showroom Polished Circular Concrete Turntable Pad */}
      <group ref={turntableRef} position={[0, 0.2, 0]}>
        <mesh receiveShadow castShadow>
          <cylinderGeometry args={[8.5, 9.0, 0.4, 32]} />
          <meshStandardMaterial color="#1e293b" roughness={0.4} metalness={0.5} />
        </mesh>
        {/* Glowing Rim Stripe */}
        <mesh position={[0, 0.21, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[8.2, 8.4, 32]} />
          <meshBasicMaterial color="#f59e0b" />
        </mesh>

        {/* Featured Showcase Tractor: Green Mahindra / John Deere Style */}
        <group position={[0, 0.2, 0]} scale={[1.2, 1.2, 1.2]}>
          {/* Body */}
          <mesh position={[0, 0.9, -0.4]} castShadow receiveShadow>
            <boxGeometry args={[1.8, 1.1, 2.8]} />
            <meshStandardMaterial color="#15803d" roughness={0.3} metalness={0.3} />
          </mesh>
          {/* Hood Stripe */}
          <mesh position={[0, 1.5, -0.4]} castShadow>
            <boxGeometry args={[1.6, 0.1, 2.7]} />
            <meshStandardMaterial color="#ca8a04" />
          </mesh>
          {/* Grille */}
          <mesh position={[0, 0.85, -1.82]} castShadow>
            <boxGeometry args={[1.5, 0.9, 0.1]} />
            <meshStandardMaterial color="#0f172a" />
          </mesh>
          {/* Headlights */}
          <mesh position={[-0.6, 1.0, -1.85]}>
            <cylinderGeometry args={[0.2, 0.2, 0.08, 16]} rotation={[Math.PI / 2, 0, 0]} />
            <meshStandardMaterial color="#fffbeb" emissive="#fde047" emissiveIntensity={2.0} />
          </mesh>
          <mesh position={[0.6, 1.0, -1.85]}>
            <cylinderGeometry args={[0.2, 0.2, 0.08, 16]} rotation={[Math.PI / 2, 0, 0]} />
            <meshStandardMaterial color="#fffbeb" emissive="#fde047" emissiveIntensity={2.0} />
          </mesh>
          {/* Cabin */}
          <mesh position={[0, 1.85, 0.9]} castShadow>
            <boxGeometry args={[1.65, 1.4, 1.5]} />
            <meshStandardMaterial color="#38bdf8" transparent opacity={0.65} roughness={0.1} />
          </mesh>
          <mesh position={[0, 2.6, 0.9]} castShadow>
            <boxGeometry args={[1.85, 0.2, 1.7]} />
            <meshStandardMaterial color="#15803d" />
          </mesh>
          {/* Wheels */}
          {[
            [-1.15, 0.6, 0.9, 0.95, 0.55],
            [1.15, 0.6, 0.9, 0.95, 0.55],
            [-1.05, 0.3, -1.1, 0.55, 0.42],
            [1.05, 0.3, -1.1, 0.55, 0.42],
          ].map(([x, y, z, rad, width], wi) => (
            <group key={wi} position={[x, y, z]}>
              <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
                <cylinderGeometry args={[rad, rad, width, 16]} />
                <meshStandardMaterial color="#18181b" roughness={0.9} />
              </mesh>
              <mesh rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[rad * 0.55, rad * 0.55, width + 0.02, 10]} />
                <meshStandardMaterial color="#eab308" metalness={0.5} />
              </mesh>
            </group>
          ))}
        </group>
      </group>

      {/* Surrounding Showroom Spotlights */}
      {[-10, 10].map((x, i) => (
        <group key={i} position={[x, 0, 8]}>
          <mesh position={[0, 3.5, 0]}>
            <cylinderGeometry args={[0.1, 0.15, 7, 8]} />
            <meshStandardMaterial color="#334155" metalness={0.8} />
          </mesh>
          <spotLight
            position={[0, 7, 0]}
            target-position={[0, 1, 0]}
            color="#fed7aa"
            intensity={3.5}
            angle={0.6}
            penumbra={0.5}
            distance={20}
          />
        </group>
      ))}
    </group>
  );
};
