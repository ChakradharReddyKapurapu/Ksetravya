import React from 'react';

export const ContinuousFarmRoad = () => {
  return (
    <group position={[0, 0, 0]}>
      {/* 1. Master Ground Terrain: 140m long flat agricultural terrain */}
      <mesh position={[0, -0.05, -35]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[80, 160]} />
        <meshStandardMaterial color="#1e3a1e" roughness={0.9} />
      </mesh>

      {/* 2. Main Continuous Agricultural Dirt & Gravel Road (z: +25 to -100) */}
      <mesh position={[0, 0.01, -35]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[7.5, 150]} />
        <meshStandardMaterial color="#785336" roughness={0.95} />
      </mesh>

      {/* Road Center Dotted Dirt Tire Tracks */}
      <mesh position={[-1.8, 0.02, -35]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[0.8, 150]} />
        <meshStandardMaterial color="#543720" roughness={1.0} />
      </mesh>
      <mesh position={[1.8, 0.02, -35]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[0.8, 150]} />
        <meshStandardMaterial color="#543720" roughness={1.0} />
      </mesh>

      {/* 3. Roadside Wooden Fence Posts along the entire length */}
      {[-85, -70, -55, -40, -25, -10, 5, 20].map((z, zi) => (
        <group key={zi}>
          {/* Left Post */}
          <mesh position={[-4.5, 0.6, z]} castShadow>
            <cylinderGeometry args={[0.08, 0.09, 1.3, 6]} />
            <meshStandardMaterial color="#5c3a21" />
          </mesh>
          {/* Right Post */}
          <mesh position={[4.5, 0.6, z]} castShadow>
            <cylinderGeometry args={[0.08, 0.09, 1.3, 6]} />
            <meshStandardMaterial color="#5c3a21" />
          </mesh>
          {/* Horizontal Fence Rail */}
          <mesh position={[-4.5, 0.8, z + 7.5]}>
            <boxGeometry args={[0.08, 0.08, 15]} />
            <meshStandardMaterial color="#784928" />
          </mesh>
          <mesh position={[4.5, 0.8, z + 7.5]}>
            <boxGeometry args={[0.08, 0.08, 15]} />
            <meshStandardMaterial color="#784928" />
          </mesh>
        </group>
      ))}

      {/* 4. Roadside Rural Trees */}
      {[
        [-12, 18],
        [12, 12],
        [-14, -2],
        [14, -12],
        [-12, -26],
        [12, -38],
        [-14, -50],
        [14, -62],
        [-12, -74],
        [14, -86],
      ].map(([tx, tz], ti) => (
        <group key={ti} position={[tx, 0, tz]}>
          <mesh position={[0, 1.8, 0]} castShadow>
            <cylinderGeometry args={[0.2, 0.35, 3.6, 6]} />
            <meshStandardMaterial color="#451a03" />
          </mesh>
          <mesh position={[0, 4.2, 0]} castShadow>
            <coneGeometry args={[2.0, 3.8, 7]} />
            <meshStandardMaterial color="#15803d" roughness={0.8} />
          </mesh>
        </group>
      ))}
    </group>
  );
};
