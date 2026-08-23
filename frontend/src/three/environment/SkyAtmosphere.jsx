import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { usePerformance } from '../../context/PerformanceContext';

export const SkyAtmosphere = () => {
  const sunMeshRef = useRef();
  const glowRef = useRef();
  const outerHaloRef = useRef();
  const { timeOfDay } = usePerformance();

  const sunConfigs = {
    golden: { pos: [38, 22, -48], color: '#ffaa33', glowColor: '#ff9922', haloColor: '#ffd580', scale: 5.5 },
    sunrise: { pos: [42, 18, -48], color: '#ff8822', glowColor: '#ff7711', haloColor: '#ffb366', scale: 5.0 },
    morning: { pos: [30, 42, -45], color: '#fff5cc', glowColor: '#ffee99', haloColor: '#ffffff', scale: 4.8 },
  }[timeOfDay] || { pos: [38, 22, -48], color: '#ffaa33', glowColor: '#ff9922', haloColor: '#ffd580', scale: 5.5 };

  useFrame((_, delta) => {
    if (glowRef.current) glowRef.current.rotation.z += delta * 0.04;
    if (outerHaloRef.current) outerHaloRef.current.rotation.z -= delta * 0.02;
  });

  return (
    <group>
      {/* Sun Core */}
      <mesh ref={sunMeshRef} position={sunConfigs.pos}>
        <sphereGeometry args={[sunConfigs.scale, 28, 28]} />
        <meshBasicMaterial color={sunConfigs.color} />
      </mesh>

      {/* Inner Golden Corona */}
      <mesh ref={glowRef} position={sunConfigs.pos}>
        <ringGeometry args={[sunConfigs.scale * 1.02, sunConfigs.scale * 2.8, 36]} />
        <meshBasicMaterial
          color={sunConfigs.glowColor}
          transparent
          opacity={0.45}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Outer Volumetric Atmosphere Halo */}
      <mesh ref={outerHaloRef} position={sunConfigs.pos}>
        <ringGeometry args={[sunConfigs.scale * 2.5, sunConfigs.scale * 6.5, 36]} />
        <meshBasicMaterial
          color={sunConfigs.haloColor}
          transparent
          opacity={0.2}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
};
