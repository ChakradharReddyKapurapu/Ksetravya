import React from 'react';

export const PlantingSoilEnv = () => {
  return (
    <group position={[0, 0, 0]}>
      {/* Tilled Soil Earth */}
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[45, 45]} />
        <meshStandardMaterial color="#451a03" roughness={0.95} />
      </mesh>

      {/* Furrow Rows with Emerging Green Sprouts */}
      {[-9, -6, -3, 0, 3, 6, 9].map((x, xi) => (
        <group key={xi} position={[x, 0.05, 0]}>
          <mesh position={[0, 0.08, 0]} receiveShadow>
            <boxGeometry args={[0.9, 0.16, 40]} />
            <meshStandardMaterial color="#301404" />
          </mesh>
          {[...Array(12)].map((_, zi) => (
            <mesh key={zi} position={[0, 0.35, -18 + zi * 3.2]} castShadow>
              <sphereGeometry args={[0.16, 8, 8]} />
              <meshStandardMaterial color="#4ade80" />
            </mesh>
          ))}
        </group>
      ))}

      {/* Blue Tractor with 9-Tyne Seed Drill Attachment */}
      <group position={[0, 0.3, -2]}>
        {/* Tractor Body */}
        <mesh position={[0, 0.9, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.8, 1.1, 2.6]} />
          <meshStandardMaterial color="#2563eb" roughness={0.3} />
        </mesh>
        {/* Wheels */}
        {[
          [-1.1, 0.55, 0.8],
          [1.1, 0.55, 0.8],
          [-1.0, 0.3, -1.0],
          [1.0, 0.3, -1.0],
        ].map((wPos, wi) => (
          <mesh key={wi} position={wPos} rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[wi < 2 ? 0.85 : 0.5, wi < 2 ? 0.85 : 0.5, 0.45, 12]} />
            <meshStandardMaterial color="#0f172a" />
          </mesh>
        ))}

        {/* Yellow Seed Cum Fertilizer Drill Hopper Attachment Behind */}
        <group position={[0, 0.8, 2.4]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[3.2, 0.9, 0.9]} />
            <meshStandardMaterial color="#eab308" />
          </mesh>
          {/* Sowing Tynes into Soil */}
          {[-1.2, -0.6, 0, 0.6, 1.2].map((tx, ti) => (
            <mesh key={ti} position={[tx, -0.6, 0]} castShadow>
              <cylinderGeometry args={[0.04, 0.06, 0.8, 6]} />
              <meshStandardMaterial color="#334155" />
            </mesh>
          ))}
        </group>
      </group>
    </group>
  );
};
