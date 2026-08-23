import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useTools } from '../../context/ToolsContext';
import { usePerformance } from '../../context/PerformanceContext';

export const ToolsRoadwayCamera = () => {
  const { camera } = useThree();
  const { roadProgress, selectedTool } = useTools();
  const { prefersReducedMotion } = usePerformance();

  const mousePos = useRef({ x: 0, y: 0 });
  const currentLookAt = useRef(new THREE.Vector3(0, 2.0, 14));

  useEffect(() => {
    const handleMouseMove = (e) => {
      mousePos.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mousePos.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // 11 Continuous Spline Camera Waypoints along the entire agricultural road
  const roadWaypoints = [
    { pos: new THREE.Vector3(0, 8.5, 28), lookAt: new THREE.Vector3(0, 2.0, 14) },      // 0%: Farm Road Entrance
    { pos: new THREE.Vector3(-2.5, 6.0, 22), lookAt: new THREE.Vector3(-6.5, 1.8, 18) }, // 10%: 01 Tractors
    { pos: new THREE.Vector3(2.5, 5.5, 12), lookAt: new THREE.Vector3(6.5, 1.6, 8) },   // 20%: 02 Soil Prep
    { pos: new THREE.Vector3(-2.5, 5.5, 0), lookAt: new THREE.Vector3(-6.5, 1.6, -4) },  // 30%: 03 Seeding
    { pos: new THREE.Vector3(2.5, 5.5, -12), lookAt: new THREE.Vector3(6.5, 1.6, -16) },// 40%: 04 Fertilizer
    { pos: new THREE.Vector3(-2.5, 5.5, -24), lookAt: new THREE.Vector3(-6.5, 1.6, -28) },// 50%: 05 Spraying
    { pos: new THREE.Vector3(2.5, 6.0, -36), lookAt: new THREE.Vector3(6.5, 1.8, -40) },// 60%: 06 Irrigation
    { pos: new THREE.Vector3(-2.5, 6.5, -48), lookAt: new THREE.Vector3(-6.5, 2.0, -52) },// 70%: 07 Harvesting
    { pos: new THREE.Vector3(2.5, 5.5, -60), lookAt: new THREE.Vector3(6.5, 1.6, -64) },// 80%: 08 Baling
    { pos: new THREE.Vector3(-2.5, 5.5, -72), lookAt: new THREE.Vector3(-6.5, 1.8, -76) },// 90%: 09 Transport
    { pos: new THREE.Vector3(0, 9.5, -84), lookAt: new THREE.Vector3(0, 4.0, -96) },     // 100%: 10 Market
  ];

  useFrame((_, delta) => {
    let targetPos = new THREE.Vector3();
    let targetLookAt = new THREE.Vector3();

    if (selectedTool) {
      // Zoom in to close product inspection view
      targetPos.set(0, 4.2, camera.position.z);
      targetLookAt.set(0, 2.0, camera.position.z - 8);
    } else {
      const t = Math.min(1, Math.max(0, roadProgress));
      const segCount = roadWaypoints.length - 1;
      const index = Math.min(Math.floor(t * segCount), segCount - 1);
      const subT = (t * segCount) - index;

      const p0 = roadWaypoints[index].pos;
      const p1 = roadWaypoints[index + 1].pos;
      const l0 = roadWaypoints[index].lookAt;
      const l1 = roadWaypoints[index + 1].lookAt;

      targetPos.lerpVectors(p0, p1, subT);
      targetLookAt.lerpVectors(l0, l1, subT);
    }

    // Parallax
    const parallaxX = prefersReducedMotion ? 0 : mousePos.current.x * 1.4;
    const parallaxY = prefersReducedMotion ? 0 : -mousePos.current.y * 0.7;

    targetPos.x += parallaxX;
    targetPos.y += parallaxY;

    camera.position.lerp(targetPos, Math.min(delta * 2.8, 1));
    currentLookAt.current.lerp(targetLookAt, Math.min(delta * 3.0, 1));
    camera.lookAt(currentLookAt.current);
  });

  return null;
};
