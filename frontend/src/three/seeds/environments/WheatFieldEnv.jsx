import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export const WheatFieldEnv = () => {
  const wheatGroupRef = useRef();

  useFrame(({ clock }) => {
    if (wheatGroupRef.current) {
      wheatGroupRef.current.rotation.z = Math.sin(clock.getElapsedTime() * 1.8) * 0.04;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* 1. Golden Earth Soil */}
      <mesh position={[0, -0.05, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[70, 70]} />
        <meshStandardMaterial color="#78350f" roughness={0.9} />
      </mesh>

      {/* 2. Dense Golden Wheat Ears swaying in the wind */}
      <group ref={wheatGroupRef}>
        {[-12, -8, -4, 0, 4, 8, 12].map((rx, rxi) => (
          <group key={rxi} position={[rx, 0, 0]}>
            {[...Array(16)].map((_, zi) => (
              <group key={zi} position={[0, 0, -28 + zi * 3.6]}>
                {/* Thin Stalk */}
                <mesh position={[0, 0.7, 0]} castShadow>
                  <cylinderGeometry args={[0.02, 0.03, 1.4, 4]} />
                  <meshStandardMaterial color="#ca8a04" />
                </mesh>
                {/* Wheat Head */}
                <mesh position={[0, 1.4, 0]} castShadow>
                  <cylinderGeometry args={[0.07, 0.05, 0.5, 6]} />
                  <meshStandardMaterial color="#facc15" roughness={0.6} />
                </mesh>
              </group>
            ))}
          </group>
        ))}
      </group>
    </group>
  );
};
