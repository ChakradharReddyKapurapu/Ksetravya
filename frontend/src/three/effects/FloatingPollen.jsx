import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { usePerformance } from '../../context/PerformanceContext';

export const FloatingPollen = () => {
  const pointsRef = useRef();
  const { graphicsConfig } = usePerformance();

  const particleCount = graphicsConfig.particleCount || 100;

  const { positions, velocities } = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const vel = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 60;
      pos[i * 3 + 1] = 1 + Math.random() * 12;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 60;

      vel[i * 3] = (Math.random() - 0.5) * 0.2;
      vel[i * 3 + 1] = 0.05 + Math.random() * 0.1;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.2;
    }

    return { positions: pos, velocities: vel };
  }, [particleCount]);

  useFrame((state, delta) => {
    if (!pointsRef.current || particleCount === 0) return;
    const pos = pointsRef.current.geometry.attributes.position.array;
    const t = state.clock.getElapsedTime();

    for (let i = 0; i < particleCount; i++) {
      // Wind drift in X & Z, rising gently in Y
      pos[i * 3] += Math.sin(t * 0.5 + i) * 0.02 + delta * 0.4;
      pos[i * 3 + 1] += Math.cos(t * 0.8 + i) * 0.01 + delta * 0.1;
      pos[i * 3 + 2] += Math.sin(t * 0.6 + i) * 0.02;

      // Wrap boundaries
      if (pos[i * 3] > 30) pos[i * 3] = -30;
      if (pos[i * 3 + 1] > 14) pos[i * 3 + 1] = 1;
      if (pos[i * 3 + 2] > 30) pos[i * 3 + 2] = -30;
      if (pos[i * 3 + 2] < -30) pos[i * 3 + 2] = 30;
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  if (particleCount === 0) return null;

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.18}
        color="#fbbf24"
        transparent
        opacity={0.7}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};
