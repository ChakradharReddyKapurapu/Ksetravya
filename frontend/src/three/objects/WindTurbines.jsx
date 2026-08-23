import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export const WindTurbines = () => {
  const rotor1 = useRef();
  const rotor2 = useRef();
  const rotor3 = useRef();

  useFrame((_, delta) => {
    if (rotor1.current) rotor1.current.rotation.z += delta * 1.6;
    if (rotor2.current) rotor2.current.rotation.z += delta * 1.4;
    if (rotor3.current) rotor3.current.rotation.z += delta * 1.8;
  });

  return (
    <group>
      {/* Turbine 1 (Hill Left) */}
      <TurbineInstance position={[-48, 4.0, -32]} rotorRef={rotor1} scale={1.1} />
      {/* Turbine 2 (Far Ridge Left) */}
      <TurbineInstance position={[-38, 5.2, -50]} rotorRef={rotor2} scale={1.3} />
      {/* Turbine 3 (Far Hill Right) */}
      <TurbineInstance position={[42, 4.5, -42]} rotorRef={rotor3} scale={1.0} />
    </group>
  );
};

const TurbineInstance = ({ position, rotorRef, scale = 1.0 }) => {
  return (
    <group position={position} scale={[scale, scale, scale]}>
      {/* Tower Mast */}
      <mesh position={[0, 6, 0]} castShadow>
        <cylinderGeometry args={[0.25, 0.5, 12, 12]} />
        <meshStandardMaterial color="#f1f5f9" roughness={0.4} metalness={0.6} />
      </mesh>

      {/* Nacelle Generator Box */}
      <mesh position={[0, 12, 0.4]} castShadow>
        <boxGeometry args={[0.7, 0.7, 1.6]} />
        <meshStandardMaterial color="#e2e8f0" metalness={0.7} />
      </mesh>

      {/* Rotor & Blades */}
      <group position={[0, 12, 1.2]} ref={rotorRef}>
        {/* Hub */}
        <mesh>
          <sphereGeometry args={[0.35, 12, 12]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.8} />
        </mesh>
        {/* Blade 1 */}
        <mesh position={[0, 3, 0]}>
          <boxGeometry args={[0.2, 5.8, 0.05]} />
          <meshStandardMaterial color="#ffffff" roughness={0.3} />
        </mesh>
        {/* Blade 2 (120 deg) */}
        <mesh position={[2.6, -1.5, 0]} rotation={[0, 0, (Math.PI * 2) / 3]}>
          <boxGeometry args={[0.2, 5.8, 0.05]} />
          <meshStandardMaterial color="#ffffff" roughness={0.3} />
        </mesh>
        {/* Blade 3 (240 deg) */}
        <mesh position={[-2.6, -1.5, 0]} rotation={[0, 0, -(Math.PI * 2) / 3]}>
          <boxGeometry args={[0.2, 5.8, 0.05]} />
          <meshStandardMaterial color="#ffffff" roughness={0.3} />
        </mesh>
      </group>
    </group>
  );
};
