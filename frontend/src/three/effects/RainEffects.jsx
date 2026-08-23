import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { usePerformance } from '../../context/PerformanceContext';

export const RainEffects = () => {
  const { weatherState, graphicsConfig } = usePerformance();
  const rainRef = useRef();

  const count = graphicsConfig.particleCount > 0 ? 1200 : 0;

  const { positions, velocities } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 80;
      pos[i * 3 + 1] = Math.random() * 35;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 80;
      vel[i] = 18 + Math.random() * 12;
    }

    return { positions: pos, velocities: vel };
  }, [count]);

  useFrame((_, delta) => {
    if (!rainRef.current || weatherState !== 'rainy' || count === 0) return;
    const pos = rainRef.current.geometry.attributes.position.array;

    for (let i = 0; i < count; i++) {
      pos[i * 3 + 1] -= velocities[i] * delta * 1.5;
      pos[i * 3] += delta * 2.5; // Wind drift in X

      if (pos[i * 3 + 1] < 0) {
        pos[i * 3 + 1] = 30 + Math.random() * 5;
        pos[i * 3] = (Math.random() - 0.5) * 80;
      }
    }
    rainRef.current.geometry.attributes.position.needsUpdate = true;
  });

  if (weatherState !== 'rainy' || count === 0) return null;

  return (
    <points ref={rainRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.25}
        color="#bae6fd"
        transparent
        opacity={0.65}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};
