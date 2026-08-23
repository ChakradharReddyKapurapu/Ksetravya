import React from 'react';

export const CropProtectionEnv = () => {
  return (
    <group position={[0, 0, 0]}>
      {/* Green Crop Rows Terrain */}
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[45, 45]} />
        <meshStandardMaterial color="#14532d" roughness={0.8} />
      </mesh>

      {/* Lush Vegetable Beds */}
      {[-8, -4, 0, 4, 8].map((x, xi) => (
        <mesh key={xi} position={[x, 0.2, 0]} receiveShadow>
          <boxGeometry args={[2.2, 0.35, 40]} />
          <meshStandardMaterial color="#166534" />
        </mesh>
      ))}

      {/* Tractor with Wide 32-Foot Folding Boom Sprayer */}
      <group position={[0, 0.3, -3]}>
        {/* Yellow Tractor */}
        <mesh position={[0, 0.9, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.8, 1.1, 2.6]} />
          <meshStandardMaterial color="#ca8a04" roughness={0.3} />
        </mesh>
        {/* Wheels */}
        {[
          [-1.1, 0.55, 0.8],
          [1.1, 0.55, 0.8],
          [-1.0, 0.3, -1.0],
          [1.0, 0.3, -1.0],
        ].map((wPos, wi) => (
          <mesh key={wi} position={wPos} rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.7, 0.7, 0.45, 12]} />
            <meshStandardMaterial color="#0f172a" />
          </mesh>
        ))}

        {/* 400L Chemical Tank on Back */}
        <mesh position={[0, 1.6, 1.2]} castShadow>
          <cylinderGeometry args={[0.65, 0.65, 1.2, 12]} rotation={[Math.PI / 2, 0, 0]} />
          <meshStandardMaterial color="#fef08a" />
        </mesh>

        {/* Wide 32-Foot Hydraulic Boom Arm */}
        <mesh position={[0, 1.2, 2.2]} castShadow>
          <boxGeometry args={[14, 0.1, 0.1]} />
          <meshStandardMaterial color="#334155" />
        </mesh>

        {/* Fine Translucent Mist Particle Spray Clouds along the Boom */}
        {[-6, -4, -2, 0, 2, 4, 6].map((mx, mi) => (
          <mesh key={mi} position={[mx, 0.4, 2.2]}>
            <coneGeometry args={[0.6, 1.4, 6]} rotation={[0, 0, Math.PI]} />
            <meshBasicMaterial color="#a7f3d0" transparent opacity={0.35} />
          </mesh>
        ))}
      </group>
    </group>
  );
};
