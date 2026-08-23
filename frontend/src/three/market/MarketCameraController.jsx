import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useWorld } from '../../context/WorldContext';
import { usePerformance } from '../../context/PerformanceContext';

export const MarketCameraController = () => {
  const { camera } = useThree();
  const { activeMarketZone, selectedCrop } = useWorld();
  const { prefersReducedMotion } = usePerformance();

  const mousePos = useRef({ x: 0, y: 0 });

  // Camera targets for each market zone
  const zoneConfigs = {
    entrance: {
      pos: new THREE.Vector3(0, 10, 52),
      lookAt: new THREE.Vector3(0, 4.5, 20),
    },
    grains: {
      pos: new THREE.Vector3(-6, 5.5, 29),
      lookAt: new THREE.Vector3(-14, 2.8, 20),
    },
    vegetables: {
      pos: new THREE.Vector3(6, 5.5, 29),
      lookAt: new THREE.Vector3(14, 2.8, 20),
    },
    fruits: {
      pos: new THREE.Vector3(-6, 5.5, 9),
      lookAt: new THREE.Vector3(-14, 2.8, 0),
    },
    pulses: {
      pos: new THREE.Vector3(6, 5.5, 9),
      lookAt: new THREE.Vector3(14, 2.8, 0),
    },
    wholesale: {
      pos: new THREE.Vector3(0, 9.5, -4),
      lookAt: new THREE.Vector3(0, 3.5, -24),
    },
    transport: {
      pos: new THREE.Vector3(0, 7.5, -14),
      lookAt: new THREE.Vector3(0, 3.0, -28),
    },
    analytics: {
      pos: new THREE.Vector3(0, 18, 16),
      lookAt: new THREE.Vector3(0, 2.0, -10),
    },
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      mousePos.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mousePos.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const currentLookAt = useRef(new THREE.Vector3(0, 4.5, 20));

  useFrame((_, delta) => {
    let target = zoneConfigs[activeMarketZone] || zoneConfigs.entrance;

    // If a specific crop is selected, zoom closely toward its corresponding zone
    if (selectedCrop) {
      if (selectedCrop.zone === 'grains') {
        target = { pos: new THREE.Vector3(-9, 4.5, 24), lookAt: new THREE.Vector3(-14, 2.6, 20) };
      } else if (selectedCrop.zone === 'vegetables') {
        target = { pos: new THREE.Vector3(9, 4.5, 24), lookAt: new THREE.Vector3(14, 2.6, 20) };
      } else if (selectedCrop.zone === 'fruits') {
        target = { pos: new THREE.Vector3(-9, 4.5, 4), lookAt: new THREE.Vector3(-14, 2.6, 0) };
      } else if (selectedCrop.zone === 'pulses' || selectedCrop.zone === 'cash') {
        target = { pos: new THREE.Vector3(9, 4.5, 4), lookAt: new THREE.Vector3(14, 2.6, 0) };
      }
    }

    const parallaxX = prefersReducedMotion ? 0 : mousePos.current.x * 1.6;
    const parallaxY = prefersReducedMotion ? 0 : -mousePos.current.y * 1.0;

    const targetPos = new THREE.Vector3(
      target.pos.x + parallaxX,
      target.pos.y + parallaxY,
      target.pos.z
    );

    camera.position.lerp(targetPos, Math.min(delta * 2.8, 1));
    currentLookAt.current.lerp(target.lookAt, Math.min(delta * 3.2, 1));
    camera.lookAt(currentLookAt.current);
  });

  return null;
};
