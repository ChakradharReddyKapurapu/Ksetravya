import React from 'react';

export const CottonFieldEnv = () => {
  return (
    <group position={[0, 0, 0]}>
      {/* 1. Deep Black Cotton Soil (Regur Clay) */}
      <mesh position={[0, -0.05, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[70, 70]} />
        <meshStandardMaterial color="#1e293b" roughness={0.95} />
      </mesh>

      {/* 2. Cotton Bush Rows */}
      {[-10, -5, 0, 5, 10].map((rx, rxi) => (
        <group key={rxi} position={[rx, 0, 0]}>
          {[...Array(12)].map((_, zi) => (
            <group key={zi} position={[0, 0, -22 + zi * 4]}>
              {/* Woody Stem */}
              <mesh position={[0, 0.6, 0]} castShadow>
                <cylinderGeometry args={[0.06, 0.1, 1.2, 6]} />
                <meshStandardMaterial color="#78350f" />
              </mesh>
              {/* Green Bush Foliage */}
              <mesh position={[0, 0.9, 0]} castShadow>
                <sphereGeometry args={[0.65, 8, 8]} scale={[1.1, 0.8, 1.1]} />
                <meshStandardMaterial color="#166534" roughness={0.7} />
              </mesh>
              {/* Fluffy White Cotton Bolls popping out */}
              {[
                [-0.3, 1.1, 0.2],
                [0.35, 1.0, -0.2],
                [0, 1.3, 0.3],
                [-0.2, 0.8, -0.3],
                [0.2, 1.2, -0.1],
              ].map((bp, bi) => (
                <mesh key={bi} position={bp} castShadow>
                  <sphereGeometry args={[0.13, 8, 8]} />
                  <meshStandardMaterial color="#ffffff" roughness={0.9} />
                </mesh>
              ))}
            </group>
          ))}
        </group>
      ))}
    </group>
  );
};
