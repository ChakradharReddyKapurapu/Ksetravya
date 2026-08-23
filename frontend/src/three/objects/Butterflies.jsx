import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';

export const Butterflies = () => {
  const groupRef = useRef();

  const butterflyList = useMemo(() => {
    return [
      { origin: [-16, 1.8, 12], radius: 2.5, speed: 1.8, color: '#facc15' },
      { origin: [-10, 1.6, 20], radius: 2.0, speed: 2.2, color: '#fb923c' },
      { origin: [-2, 1.4, 2], radius: 2.8, speed: 1.5, color: '#38bdf8' },
      { origin: [12, 1.5, 6], radius: 2.2, speed: 2.0, color: '#ec4899' },
    ];
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();

    groupRef.current.children.forEach((bGroup, i) => {
      const b = butterflyList[i];
      if (!b) return;

      const angle = t * b.speed + i;
      const x = b.origin[0] + Math.sin(angle) * b.radius;
      const z = b.origin[2] + Math.cos(angle) * b.radius;
      const y = b.origin[1] + Math.sin(t * 4.0 + i) * 0.4;

      bGroup.position.set(x, y, z);
      bGroup.rotation.y = angle + Math.PI / 2;

      // Wing flutter
      const leftWing = bGroup.children[0];
      const rightWing = bGroup.children[1];
      if (leftWing && rightWing) {
        const flap = Math.sin(t * 22) * 0.7;
        leftWing.rotation.y = flap;
        rightWing.rotation.y = -flap;
      }
    });
  });

  return (
    <group ref={groupRef}>
      {butterflyList.map((b, idx) => (
        <group key={idx} scale={[0.18, 0.18, 0.18]}>
          {/* Left Wing */}
          <mesh position={[-0.4, 0, 0]}>
            <circleGeometry args={[0.5, 6]} />
            <meshBasicMaterial color={b.color} />
          </mesh>
          {/* Right Wing */}
          <mesh position={[0.4, 0, 0]}>
            <circleGeometry args={[0.5, 6]} />
            <meshBasicMaterial color={b.color} />
          </mesh>
        </group>
      ))}
    </group>
  );
};
