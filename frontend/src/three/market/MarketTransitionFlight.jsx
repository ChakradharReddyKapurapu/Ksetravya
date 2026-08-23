import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useWorld } from '../../context/WorldContext';

export const MarketTransitionFlight = () => {
  const { camera } = useThree();
  const { transitionProgress, currentWorld } = useWorld();

  // Trajectory Waypoints from Farm to Market
  const waypoints = [
    { pos: new THREE.Vector3(0, 19, 44), lookAt: new THREE.Vector3(0, 2, -6) },       // 0%: Farm overview
    { pos: new THREE.Vector3(-14, 8, 22), lookAt: new THREE.Vector3(-18, 1, 0) },      // 25%: Flying through crop fields
    { pos: new THREE.Vector3(1, 4.5, 8), lookAt: new THREE.Vector3(0, 1, -12) },       // 50%: Crossing river bridge
    { pos: new THREE.Vector3(12, 6.0, 12), lookAt: new THREE.Vector3(14, 2, 0) },      // 75%: Following market transit road
    { pos: new THREE.Vector3(0, 10, 52), lookAt: new THREE.Vector3(0, 4.5, 20) },      // 100%: Entering Market Arch
  ];

  const currentLookAt = useRef(new THREE.Vector3(0, 2, -6));

  useFrame(() => {
    if (currentWorld !== 'transition_to_market' && currentWorld !== 'transition_to_farm') return;

    const t = Math.max(0, Math.min(1, transitionProgress));
    const segmentCount = waypoints.length - 1;
    const index = Math.min(Math.floor(t * segmentCount), segmentCount - 1);
    const subT = (t * segmentCount) - index;

    const p0 = waypoints[index].pos;
    const p1 = waypoints[index + 1].pos;
    const l0 = waypoints[index].lookAt;
    const l1 = waypoints[index + 1].lookAt;

    const targetPos = new THREE.Vector3().lerpVectors(p0, p1, subT);
    const targetLookAt = new THREE.Vector3().lerpVectors(l0, l1, subT);

    camera.position.copy(targetPos);
    currentLookAt.current.copy(targetLookAt);
    camera.lookAt(currentLookAt.current);
  });

  return null;
};
