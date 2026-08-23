import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { usePerformance } from '../../context/PerformanceContext';

export const TractorDustTrail = ({ tractorPos, tractorRot }) => {
  const { graphicsConfig } = usePerformance();
  const dustRef = useRef();

  const particleCount = graphicsConfig.particleCount > 0 ? 36 : 0;

  const { positions, life, scales } = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const lf = new Float32Array(particleCount);
    const sc = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = 0;
      pos[i * 3 + 1] = -100; // start hidden
      pos[i * 3 + 2] = 0;
      lf[i] = Math.random();
      sc[i] = 0.2 + Math.random() * 0.4;
    }

    return { positions: pos, life: lf, scales: sc };
  }, [particleCount]);

  useFrame((_, delta) => {
    if (!dustRef.current || particleCount === 0 || !tractorPos) return;
    const posArray = dustRef.current.geometry.attributes.position.array;

    for (let i = 0; i < particleCount; i++) {
      life[i] += delta * 0.8;

      if (life[i] > 1) {
        // Spawn behind tractor
        life[i] = 0;
        const rearOffset = 1.4;
        const sideOffset = (Math.random() - 0.5) * 1.2;

        posArray[i * 3] = tractorPos.x - Math.sin(tractorRot) * rearOffset + Math.cos(tractorRot) * sideOffset;
        posArray[i * 3 + 1] = 0.35 + Math.random() * 0.2;
        posArray[i * 3 + 2] = tractorPos.z - Math.cos(tractorRot) * rearOffset - Math.sin(tractorRot) * sideOffset;
      } else {
        // Rise and dissipate
        posArray[i * 3 + 1] += delta * 0.35;
        posArray[i * 3] += delta * 0.2; // slight wind drift
      }
    }

    dustRef.current.geometry.attributes.position.needsUpdate = true;
  });

  if (particleCount === 0) return null;

  return (
    <points ref={dustRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.45}
        color="#a17b58"
        transparent
        opacity={0.35}
        depthWrite={false}
      />
    </points>
  );
};
