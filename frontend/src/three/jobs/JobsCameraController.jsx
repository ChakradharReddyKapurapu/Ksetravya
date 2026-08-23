import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

export const JobsCameraController = () => {
  const { camera, mouse } = useThree();
  const targetPos = useRef(new THREE.Vector3(0, 7, 34));
  const lookAtPos = useRef(new THREE.Vector3(0, 2, 0));

  useFrame(() => {
    // Parallax mouse tilt
    const mouseX = mouse.x * 3.5;
    const mouseY = mouse.y * 1.5;

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetPos.current.x + mouseX, 0.05);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetPos.current.y + mouseY, 0.05);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetPos.current.z, 0.05);

    camera.lookAt(lookAtPos.current.x, lookAtPos.current.y, lookAtPos.current.z);
  });

  return null;
};
