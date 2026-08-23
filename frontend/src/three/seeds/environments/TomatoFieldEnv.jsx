import React from 'react';

export const TomatoFieldEnv = () => {
  return (
    <group position={[0, 0, 0]}>
      {/* 1. Rich Organic Compost Soil */}
      <mesh position={[0, -0.05, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[70, 70]} />
        <meshStandardMaterial color="#271b13" roughness={0.95} />
      </mesh>

      {/* 2. Tomato Trellis Stakes & Vine Rows with Plump Red Fruit */}
      {[-9, -4.5, 0, 4.5, 9].map((rx, rxi) => (
        <group key={rxi} position={[rx, 0, 0]}>
          {/* Bamboo Support Trellis Stakes */}
          {[-20, -10, 0, 10, 20].map((sz, szi) => (
            <mesh key={szi} position={[0, 1.2, sz]} castShadow>
              <cylinderGeometry args={[0.03, 0.04, 2.4, 6]} />
              <meshStandardMaterial color="#a16207" />
            </mesh>
          ))}
          {/* Support Wire */}
          <mesh position={[0, 1.8, 0]}>
            <boxGeometry args={[0.02, 0.02, 50]} />
            <meshStandardMaterial color="#64748b" />
          </mesh>

          {/* Lush Vine Clusters */}
          {[...Array(12)].map((_, zi) => (
            <group key={zi} position={[0, 0, -22 + zi * 4]}>
              <mesh position={[0, 0.9, 0]} castShadow>
                <sphereGeometry args={[0.6, 8, 8]} scale={[0.8, 1.4, 0.8]} />
                <meshStandardMaterial color="#15803d" />
              </mesh>
              {/* Clusters of Red Ripe Tomatoes */}
              {[
                [-0.2, 0.7, 0.25],
                [0.2, 0.9, 0.25],
                [-0.1, 1.2, -0.2],
                [0.25, 0.6, -0.15],
              ].map((tp, ti) => (
                <mesh key={ti} position={tp} castShadow>
                  <sphereGeometry args={[0.14, 8, 8]} />
                  <meshStandardMaterial color="#ef4444" roughness={0.2} metalness={0.1} />
                </mesh>
              ))}
            </group>
          ))}
        </group>
      ))}
    </group>
  );
};
