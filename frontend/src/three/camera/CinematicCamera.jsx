import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { usePerformance } from '../../context/PerformanceContext';

export const CinematicCamera = () => {
  const { camera } = useThree();
  const {
    activeTour,
    prefersReducedMotion,
    hoveredFeature,
    scrollProgress,
  } = usePerformance();

  const mousePos = useRef({ x: 0, y: 0 });
  const currentLookAt = useRef(new THREE.Vector3(0, 3, -6));

  useEffect(() => {
    const handleMouseMove = (e) => {
      mousePos.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mousePos.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // 5 Tour Preset Camera Configurations for Top Bar
  const tourConfigs = {
    panorama: {
      pos: new THREE.Vector3(0, 19, 46),
      lookAt: new THREE.Vector3(0, 3, -6),
    },
    machinery: {
      pos: new THREE.Vector3(15, 6.5, 12),
      lookAt: new THREE.Vector3(14, 1.8, -4),
    },
    river: {
      pos: new THREE.Vector3(-3, 5.2, 14),
      lookAt: new THREE.Vector3(-1, 0.8, 2),
    },
    fields: {
      pos: new THREE.Vector3(-20, 7.5, 22),
      lookAt: new THREE.Vector3(-24, 1.5, 4),
    },
    solar: {
      pos: new THREE.Vector3(22, 9.2, -8),
      lookAt: new THREE.Vector3(22, 2.8, -20),
    },
  };

  // Feature Card Hover Target Camera Overrides
  const featureConfigs = {
    tools: {
      pos: new THREE.Vector3(15, 6.2, 12),
      lookAt: new THREE.Vector3(14, 1.8, -4),
    },
    land: {
      pos: new THREE.Vector3(-22, 8.5, -14),
      lookAt: new THREE.Vector3(-24, 1.5, -22),
    },
    jobs: {
      pos: new THREE.Vector3(-10, 6.5, 18),
      lookAt: new THREE.Vector3(-14, 1.2, 12),
    },
    marketplace: {
      pos: new THREE.Vector3(4, 8.5, -26),
      lookAt: new THREE.Vector3(-2, 3.5, -42),
    },
    weather: {
      pos: new THREE.Vector3(0, 24, 38),
      lookAt: new THREE.Vector3(0, 14, -20),
    },
    analytics: {
      pos: new THREE.Vector3(-12, 11.5, -42),
      lookAt: new THREE.Vector3(-14, 2.5, -54),
    },
    transport: {
      pos: new THREE.Vector3(6, 7.5, -32),
      lookAt: new THREE.Vector3(0, 1.8, -42),
    },
  };

  // 8 Continuous Scroll-Driven Waypoints covering the entire living world
  const scrollWaypoints = [
    { pos: new THREE.Vector3(0, 19, 46), lookAt: new THREE.Vector3(0, 3, -6) },          // 0%: Sunrise Farm Overview (Hero)
    { pos: new THREE.Vector3(-16, 7.5, 24), lookAt: new THREE.Vector3(-20, 1.8, 8) },   // 15%: Crop Terraces & Farmers (Stats)
    { pos: new THREE.Vector3(-2, 5.0, 14), lookAt: new THREE.Vector3(-1, 1.0, 2) },      // 30%: Irrigation River & Bridge
    { pos: new THREE.Vector3(15, 6.2, 8), lookAt: new THREE.Vector3(14, 2.0, -4) },      // 45%: Machinery Hub & Tool Rental
    { pos: new THREE.Vector3(-22, 9.0, -12), lookAt: new THREE.Vector3(-24, 2.0, -24) }, // 60%: Land Rental Plots
    { pos: new THREE.Vector3(4, 9.0, -28), lookAt: new THREE.Vector3(-2, 3.5, -42) },    // 75%: Wholesale Marketplace & Transport
    { pos: new THREE.Vector3(-12, 11.5, -44), lookAt: new THREE.Vector3(-14, 2.5, -56) },// 88%: Smart Agriculture & Analytics
    { pos: new THREE.Vector3(0, 24, -20), lookAt: new THREE.Vector3(0, 4, -58) },        // 100%: Future Sustainable Farm & Sunset
  ];

  useFrame((_, delta) => {
    let targetPos = new THREE.Vector3();
    let targetLookAt = new THREE.Vector3();

    if (hoveredFeature && featureConfigs[hoveredFeature]) {
      targetPos.copy(featureConfigs[hoveredFeature].pos);
      targetLookAt.copy(featureConfigs[hoveredFeature].lookAt);
    } else if (scrollProgress > 0.03) {
      const t = Math.min(1, Math.max(0, scrollProgress));
      const segCount = scrollWaypoints.length - 1;
      const index = Math.min(Math.floor(t * segCount), segCount - 1);
      const subT = (t * segCount) - index;

      const p0 = scrollWaypoints[index].pos;
      const p1 = scrollWaypoints[index + 1].pos;
      const l0 = scrollWaypoints[index].lookAt;
      const l1 = scrollWaypoints[index + 1].lookAt;

      targetPos.lerpVectors(p0, p1, subT);
      targetLookAt.lerpVectors(l0, l1, subT);
    } else {
      const tour = tourConfigs[activeTour] || tourConfigs.panorama;
      targetPos.copy(tour.pos);
      targetLookAt.copy(tour.lookAt);
    }

    // Subtle mouse parallax
    const parallaxX = prefersReducedMotion ? 0 : mousePos.current.x * 1.6;
    const parallaxY = prefersReducedMotion ? 0 : -mousePos.current.y * 0.9;

    targetPos.x += parallaxX;
    targetPos.y += parallaxY;

    // Smooth Lerp Camera Position
    camera.position.lerp(targetPos, Math.min(delta * 2.6, 1));

    // Smooth Lerp Camera LookAt
    currentLookAt.current.lerp(targetLookAt, Math.min(delta * 2.8, 1));
    camera.lookAt(currentLookAt.current);
  });

  return null;
};
