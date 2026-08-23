import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { usePerformance } from '../../context/PerformanceContext';

export const BirdsFlock = () => {
  const flockRef = useRef();
  const { graphicsConfig } = usePerformance();

  const birdCount = graphicsConfig.birdsCount || 12;

  const birds = useMemo(() => {
    const list = [];
    for (let i = 0; i < birdCount; i++) {
      list.push({
        baseX: (Math.random() - 0.5) * 40,
        baseY: 16 + Math.random() * 8,
        baseZ: -30 + (Math.random() - 0.5) * 30,
        speed: 0.8 + Math.random() * 0.4,
        wingSpeed: 12 + Math.random() * 6,
        phase: Math.random() * Math.PI * 2,
        radius: 18 + Math.random() * 12,
      });
    }
    return list;
  }, [birdCount]);

  useFrame((state) => {
    if (!flockRef.current) return;
    const t = state.clock.getElapsedTime();

    flockRef.current.children.forEach((birdGroup, i) => {
      const b = birds[i];
      if (!b) return;

      // Flight trajectory in a large smooth arc
      const angle = t * 0.15 * b.speed + b.phase;
      const x = b.baseX + Math.sin(angle) * b.radius;
      const z = b.baseZ + Math.cos(angle) * (b.radius * 0.6);
      const y = b.baseY + Math.sin(t * 1.2 + b.phase) * 1.5;

      birdGroup.position.set(x, y, z);
      birdGroup.rotation.y = angle + Math.PI / 2;

      // Wing flap animation
      const leftWing = birdGroup.children[0];
      const rightWing = birdGroup.children[1];
      if (leftWing && rightWing) {
        const flap = Math.sin(t * b.wingSpeed + b.phase) * 0.5;
        leftWing.rotation.z = flap;
        rightWing.rotation.z = -flap;
      }
    });
  });

  return (
    <group ref={flockRef}>
      {birds.map((_, idx) => (
        <group key={idx} scale={[0.4, 0.4, 0.4]}>
          {/* Left Wing */}
          <mesh position={[-0.4, 0, 0]}>
            <boxGeometry args={[0.7, 0.04, 0.25]} />
            <meshBasicMaterial color="#1a2e22" />
          </mesh>
          {/* Right Wing */}
          <mesh position={[0.4, 0, 0]}>
            <boxGeometry args={[0.7, 0.04, 0.25]} />
            <meshBasicMaterial color="#1a2e22" />
          </mesh>
          {/* Body */}
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[0.06, 0.08, 0.5, 4]} />
            <meshBasicMaterial color="#0f1f16" />
          </mesh>
        </group>
      ))}
    </group>
  );
};
