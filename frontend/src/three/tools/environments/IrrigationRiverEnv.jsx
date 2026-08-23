import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export const IrrigationRiverEnv = () => {
  const sprinkler1Ref = useRef();
  const sprinkler2Ref = useRef();

  useFrame((_, delta) => {
    if (sprinkler1Ref.current) sprinkler1Ref.current.rotation.y += delta * 4.0;
    if (sprinkler2Ref.current) sprinkler2Ref.current.rotation.y -= delta * 4.0;
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Moist Soil Grass Terrain */}
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[45, 45]} />
        <meshStandardMaterial color="#1e3a1e" roughness={0.6} metalness={0.2} />
      </mesh>

      {/* Flowing Water Channel Canal */}
      <mesh position={[0, 0.05, 0]} receiveShadow>
        <boxGeometry args={[44, 0.1, 4.5]} />
        <meshStandardMaterial color="#0284c7" roughness={0.1} metalness={0.9} />
      </mesh>

      {/* Solar Water Pump Station Shed */}
      <group position={[-10, 0, -6]}>
        {/* Pump Shed */}
        <mesh position={[0, 1.4, 0]} castShadow receiveShadow>
          <boxGeometry args={[4.2, 2.8, 3.8]} />
          <meshStandardMaterial color="#0f766e" />
        </mesh>
        {/* Roof */}
        <mesh position={[0, 3.0, 0]} castShadow>
          <boxGeometry args={[4.8, 0.4, 4.4]} />
          <meshStandardMaterial color="#134e4a" />
        </mesh>
        {/* Blue Solar Panels on Roof */}
        <mesh position={[0, 3.3, 0]} rotation={[-0.3, 0, 0]}>
          <boxGeometry args={[4.2, 0.1, 3.6]} />
          <meshStandardMaterial color="#0f172a" metalness={0.9} roughness={0.2} />
        </mesh>
      </group>

      {/* Dual Rotating High-Pressure Rain Gun Sprinklers */}
      <group ref={sprinkler1Ref} position={[-4, 0.8, 5]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.08, 0.1, 1.6, 8]} />
          <meshStandardMaterial color="#d97706" metalness={0.8} />
        </mesh>
        {/* Mist Jet */}
        <mesh position={[0.6, 0.8, 0]}>
          <coneGeometry args={[0.4, 1.2, 8]} rotation={[0, 0, -Math.PI / 3]} />
          <meshBasicMaterial color="#bae6fd" transparent opacity={0.6} />
        </mesh>
      </group>

      <group ref={sprinkler2Ref} position={[6, 0.8, 5]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.08, 0.1, 1.6, 8]} />
          <meshStandardMaterial color="#d97706" metalness={0.8} />
        </mesh>
        <mesh position={[-0.6, 0.8, 0]}>
          <coneGeometry args={[0.4, 1.2, 8]} rotation={[0, 0, Math.PI / 3]} />
          <meshBasicMaterial color="#bae6fd" transparent opacity={0.6} />
        </mesh>
      </group>
    </group>
  );
};
