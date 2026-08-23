import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';

export const Clouds = () => {
  const groupRef = useRef();

  const clouds = useMemo(() => {
    return [
      { pos: [-40, 26, -35], scale: [16, 5.5, 9], speed: 0.65, color: '#fff9eb' },
      { pos: [12, 30, -50], scale: [22, 7, 11], speed: 0.45, color: '#ffeed6' },
      { pos: [48, 24, -28], scale: [14, 5, 8], speed: 0.75, color: '#fff6e4' },
      { pos: [-16, 36, -68], scale: [26, 8.5, 12], speed: 0.35, color: '#ffeacc' },
      { pos: [32, 28, -12], scale: [12, 4.5, 7], speed: 0.55, color: '#fffbf2' },
      { pos: [-55, 32, -55], scale: [20, 6.5, 10], speed: 0.4, color: '#ffe8c9' },
    ];
  }, []);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    groupRef.current.children.forEach((cloudMesh, i) => {
      const speed = clouds[i]?.speed || 0.5;
      cloudMesh.position.x += delta * speed * 2.0;
      if (cloudMesh.position.x > 85) {
        cloudMesh.position.x = -85;
      }
    });
  });

  return (
    <group ref={groupRef}>
      {clouds.map((c, i) => (
        <group key={i} position={c.pos}>
          {/* Main cloud cluster using warm golden sunrise lighting */}
          <mesh position={[0, 0, 0]} scale={c.scale} castShadow={false}>
            <dodecahedronGeometry args={[1, 1]} />
            <meshStandardMaterial
              color={c.color}
              roughness={0.88}
              transparent
              opacity={0.86}
              flatShading
            />
          </mesh>
          <mesh
            position={[c.scale[0] * 0.32, -c.scale[1] * 0.15, 0]}
            scale={[c.scale[0] * 0.72, c.scale[1] * 0.8, c.scale[2] * 0.8]}
          >
            <dodecahedronGeometry args={[1, 1]} />
            <meshStandardMaterial
              color="#ffe5be"
              roughness={0.88}
              transparent
              opacity={0.84}
              flatShading
            />
          </mesh>
          <mesh
            position={[-c.scale[0] * 0.3, -c.scale[1] * 0.1, 0]}
            scale={[c.scale[0] * 0.65, c.scale[1] * 0.75, c.scale[2] * 0.75]}
          >
            <dodecahedronGeometry args={[1, 1]} />
            <meshStandardMaterial
              color={c.color}
              roughness={0.88}
              transparent
              opacity={0.86}
              flatShading
            />
          </mesh>
        </group>
      ))}
    </group>
  );
};
