import React from 'react';

export const JobsTerrain = () => {
  return (
    <group position={[0, -0.5, 0]}>
      {/* 1. Main Farmland Ground (Rotated -Math.PI / 2 to be strictly horizontal) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[180, 180, 24, 24]} />
        <meshStandardMaterial color="#2d4a22" roughness={0.9} />
      </mesh>

      {/* 2. Winding Dirt Farm Road */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-2, 0.02, 10]} receiveShadow>
        <planeGeometry args={[6, 70]} />
        <meshStandardMaterial color="#8c6239" roughness={0.95} />
      </mesh>

      {/* 3. Wooden Road Fence Posts */}
      {[-24, -18, -12, -6, 0, 6, 12, 18, 24, 30, 36].map((z, idx) => (
        <group key={idx}>
          {/* Left Fence Post */}
          <mesh position={[-5.8, 0.8, z]} castShadow receiveShadow>
            <cylinderGeometry args={[0.08, 0.1, 1.6, 6]} />
            <meshStandardMaterial color="#5c3a21" roughness={0.8} />
          </mesh>
          {/* Right Fence Post */}
          <mesh position={[1.8, 0.8, z]} castShadow receiveShadow>
            <cylinderGeometry args={[0.08, 0.1, 1.6, 6]} />
            <meshStandardMaterial color="#5c3a21" roughness={0.8} />
          </mesh>
        </group>
      ))}

      {/* Horizontal Wooden Fence Rails */}
      {[-20, -10, 0, 10, 20, 30].map((z, idx) => (
        <group key={`rail-${idx}`}>
          {/* Left Rail */}
          <mesh position={[-5.8, 1.1, z]} rotation={[0, 0, 0]} castShadow>
            <boxGeometry args={[0.08, 0.1, 10]} />
            <meshStandardMaterial color="#5c3a21" roughness={0.8} />
          </mesh>
          {/* Right Rail */}
          <mesh position={[1.8, 1.1, z]} rotation={[0, 0, 0]} castShadow>
            <boxGeometry args={[0.08, 0.1, 10]} />
            <meshStandardMaterial color="#5c3a21" roughness={0.8} />
          </mesh>
        </group>
      ))}

      {/* 4. Wooden Farm Gate at z = 32 */}
      <group position={[-2, 0, 32]}>
        {/* Left Gate Post */}
        <mesh position={[-3.8, 1.2, 0]} castShadow>
          <boxGeometry args={[0.35, 2.4, 0.35]} />
          <meshStandardMaterial color="#3b2416" />
        </mesh>
        {/* Right Gate Post */}
        <mesh position={[3.8, 1.2, 0]} castShadow>
          <boxGeometry args={[0.35, 2.4, 0.35]} />
          <meshStandardMaterial color="#3b2416" />
        </mesh>
        {/* Overhead Sign Beam */}
        <mesh position={[0, 2.4, 0]} castShadow>
          <boxGeometry args={[8.0, 0.35, 0.25]} />
          <meshStandardMaterial color="#3b2416" />
        </mesh>
      </group>

      {/* 5. Distant Farmhouse (Left Background) */}
      <group position={[-28, 0, -15]}>
        {/* Main House Base */}
        <mesh position={[0, 2.2, 0]} castShadow receiveShadow>
          <boxGeometry args={[7, 4.4, 6]} />
          <meshStandardMaterial color="#fef3c7" roughness={0.9} />
        </mesh>
        {/* Terracotta Tiled Roof */}
        <mesh position={[0, 5.2, 0]} rotation={[0, Math.PI / 4, 0]} castShadow>
          <coneGeometry args={[5.5, 2.6, 4]} />
          <meshStandardMaterial color="#b91c1c" roughness={0.7} />
        </mesh>
        {/* Porch Pillars */}
        <mesh position={[2.5, 1.4, 3.2]} castShadow>
          <cylinderGeometry args={[0.1, 0.1, 2.8, 6]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
        <mesh position={[-2.5, 1.4, 3.2]} castShadow>
          <cylinderGeometry args={[0.1, 0.1, 2.8, 6]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
      </group>

      {/* 6. Distant Mountain Silhouettes (Backdrop) */}
      {[-50, -20, 10, 40].map((x, i) => (
        <mesh key={i} position={[x, 10, -55]} rotation={[0, 0, 0]}>
          <coneGeometry args={[25 + (i % 3) * 6, 22 + (i % 2) * 8, 5]} />
          <meshStandardMaterial color="#1e3a1e" roughness={1} />
        </mesh>
      ))}
    </group>
  );
};
