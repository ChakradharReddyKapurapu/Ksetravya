import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export const JobsBirdsAndClouds = () => {
  const birdsGroupRef = useRef();
  const cloudsGroupRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // Birds flying across in gentle flock loop
    if (birdsGroupRef.current) {
      birdsGroupRef.current.position.x = -30 + ((t * 4.5) % 80);
      birdsGroupRef.current.position.y = 16 + Math.sin(t * 1.2) * 1.5;
    }

    // Clouds drifting slowly
    if (cloudsGroupRef.current) {
      cloudsGroupRef.current.position.x = -40 + ((t * 0.8) % 90);
    }
  });

  return (
    <group>
      {/* 1. Clouds Group */}
      <group ref={cloudsGroupRef} position={[0, 22, -25]}>
        {[-20, 0, 25, 45].map((x, i) => (
          <group key={i} position={[x, (i % 2) * 2, (i % 3) * -4]}>
            <mesh>
              <sphereGeometry args={[3.2, 8, 8]} />
              <meshStandardMaterial
                color="#fef3c7"
                transparent
                opacity={0.7}
                roughness={1}
              />
            </mesh>
            <mesh position={[2.2, -0.4, 0]}>
              <sphereGeometry args={[2.4, 8, 8]} />
              <meshStandardMaterial
                color="#fef3c7"
                transparent
                opacity={0.65}
                roughness={1}
              />
            </mesh>
            <mesh position={[-2.0, -0.3, 0]}>
              <sphereGeometry args={[2.6, 8, 8]} />
              <meshStandardMaterial
                color="#fef3c7"
                transparent
                opacity={0.65}
                roughness={1}
              />
            </mesh>
          </group>
        ))}
      </group>

      {/* 2. Birds Flock */}
      <group ref={birdsGroupRef} position={[-20, 16, -10]}>
        {[
          [0, 0, 0],
          [2, 0.6, 1],
          [3.5, 1.2, 2],
          [-1.5, 0.4, 1.5],
          [-3, 0.9, 2.5],
        ].map(([bx, by, bz], idx) => (
          <group key={idx} position={[bx, by, bz]}>
            {/* Left Wing */}
            <mesh rotation={[0, 0, 0.4]}>
              <boxGeometry args={[0.3, 0.02, 0.1]} />
              <meshBasicMaterial color="#1e293b" />
            </mesh>
            {/* Right Wing */}
            <mesh rotation={[0, 0, -0.4]} position={[0.25, 0, 0]}>
              <boxGeometry args={[0.3, 0.02, 0.1]} />
              <meshBasicMaterial color="#1e293b" />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
};
