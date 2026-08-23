import React from 'react';

export const MangoOrchardEnv = () => {
  return (
    <group position={[0, 0, 0]}>
      {/* 1. Orchard Grass Floor */}
      <mesh position={[0, -0.05, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[70, 70]} />
        <meshStandardMaterial color="#166534" roughness={0.8} />
      </mesh>

      {/* 2. Mature Mango Trees with Broad Canopy & Golden Fruits */}
      {[
        [-10, 10],
        [10, 10],
        [-12, -8],
        [12, -8],
        [-10, -26],
        [10, -26],
      ].map(([tx, tz], ti) => (
        <group key={ti} position={[tx, 0, tz]}>
          {/* Sturdy Trunk */}
          <mesh position={[0, 1.8, 0]} castShadow>
            <cylinderGeometry args={[0.35, 0.5, 3.6, 8]} />
            <meshStandardMaterial color="#451a03" />
          </mesh>
          {/* Dense Rounded Foliage Canopy */}
          <mesh position={[0, 4.2, 0]} castShadow>
            <sphereGeometry args={[2.5, 10, 10]} scale={[1.2, 0.9, 1.2]} />
            <meshStandardMaterial color="#14532d" roughness={0.7} />
          </mesh>
          {/* Hanging Golden Banganapalli Mangoes */}
          {[
            [-1.2, 3.4, 0.8],
            [1.0, 3.2, 0.9],
            [-0.8, 3.8, -1.0],
            [1.2, 3.6, -0.7],
            [0, 3.0, 1.4],
          ].map((mp, mi) => (
            <mesh key={mi} position={mp} rotation={[0.2, 0, 0.3]} castShadow>
              <sphereGeometry args={[0.18, 8, 8]} scale={[0.8, 1.3, 0.7]} />
              <meshStandardMaterial color="#f59e0b" roughness={0.3} />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  );
};
