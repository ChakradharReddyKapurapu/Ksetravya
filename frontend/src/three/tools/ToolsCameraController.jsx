import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useTools } from '../../context/ToolsContext';
import { usePerformance } from '../../context/PerformanceContext';

export const ToolsCameraController = () => {
  const { camera } = useThree();
  const { active3DZone, selectedTool } = useTools();
  const { prefersReducedMotion } = usePerformance();

  const mousePos = useRef({ x: 0, y: 0 });
  const currentLookAt = useRef(new THREE.Vector3(0, 2, 0));

  useEffect(() => {
    const handleMouseMove = (e) => {
      mousePos.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mousePos.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const zoneTargets = {
    showroom: {
      pos: new THREE.Vector3(0, 7.5, 16),
      lookAt: new THREE.Vector3(0, 2.0, 0),
    },
    harvesting: {
      pos: new THREE.Vector3(8, 8.5, 18),
      lookAt: new THREE.Vector3(0, 2.5, -2),
    },
    sowing: {
      pos: new THREE.Vector3(-6, 7.0, 15),
      lookAt: new THREE.Vector3(0, 1.8, 0),
    },
    irrigation: {
      pos: new THREE.Vector3(0, 9.0, 16),
      lookAt: new THREE.Vector3(0, 2.0, 0),
    },
    protection: {
      pos: new THREE.Vector3(6, 7.5, 14),
      lookAt: new THREE.Vector3(0, 1.8, 0),
    },
    logistics: {
      pos: new THREE.Vector3(-8, 8.0, 18),
      lookAt: new THREE.Vector3(-2, 2.0, 0),
    },
  };

  useFrame((_, delta) => {
    let target = zoneTargets[active3DZone] || zoneTargets.showroom;

    // If a tool detail modal is open, zoom into close inspection position
    if (selectedTool) {
      target = {
        pos: new THREE.Vector3(0, 4.5, 10),
        lookAt: new THREE.Vector3(0, 2.0, 0),
      };
    }

    const parallaxX = prefersReducedMotion ? 0 : mousePos.current.x * 1.5;
    const parallaxY = prefersReducedMotion ? 0 : -mousePos.current.y * 0.8;

    const targetPos = new THREE.Vector3(
      target.pos.x + parallaxX,
      target.pos.y + parallaxY,
      target.pos.z
    );

    camera.position.lerp(targetPos, Math.min(delta * 2.8, 1));
    currentLookAt.current.lerp(target.lookAt, Math.min(delta * 3.0, 1));
    camera.lookAt(currentLookAt.current);
  });

  return null;
};
