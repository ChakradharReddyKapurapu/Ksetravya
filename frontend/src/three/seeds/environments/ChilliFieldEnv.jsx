import React from 'react';

export const ChilliFieldEnv = () => {
  return (
    <group position={[0, 0, 0]}>
      {/* 1. Fertile Red Loam with Drip Irrigation Furrows */}
      <mesh position={[0, -0.05, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[70, 70]} />
        <meshStandardMaterial color="#451a03" roughness={0.95} />
      </mesh>

      {/* 2. Chilli Plant Rows with Red and Green Peppers */}
      {[-10, -5, 0, 5, 10].map((rx, rxi) => (
        <group key={rxi} position={[rx, 0, 0]}>
          {[...Array(12)].map((_, zi) => (
            <group key={zi} position={[0, 0, -22 + zi * 4]}>
              {/* Woody stem */}
              <mesh position={[0, 0.4, 0]} castShadow>
                <cylinderGeometry args={[0.04, 0.07, 0.8, 6]} />
                <meshStandardMaterial color="#334155" />
              </mesh>
              {/* Green canopy */}
              <mesh position={[0, 0.75, 0]} castShadow>
                <sphereGeometry args={[0.5, 8, 8]} scale={[1.1, 0.8, 1.1]} />
                <meshStandardMaterial color="#166534" />
              </mesh>
              {/* Bright Red Hanging Chillies */}
              {[
                [-0.2, 0.6, 0.2],
                [0.25, 0.55, -0.15],
                [0, 0.45, 0.25],
              ].map((cp, ci) => (
                <mesh key={ci} position={cp} rotation={[0, 0, 0.4]} castShadow>
                  <coneGeometry args={[0.04, 0.25, 6]} />
                  <meshStandardMaterial color="#dc2626" roughness={0.3} />
                </mesh>
              ))}
              {/* Green Unripe Chilli */}
              <mesh position={[-0.15, 0.5, -0.2]} rotation={[0, 0, -0.3]}>
                <coneGeometry args={[0.035, 0.22, 6]} />
                <meshStandardMaterial color="#84cc16" />
              </mesh>
            </group>
          ))}
        </group>
      ))}
    </group>
  );
};
