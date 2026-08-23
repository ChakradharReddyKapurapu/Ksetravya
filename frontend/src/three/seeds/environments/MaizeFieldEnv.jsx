import React from 'react';

export const MaizeFieldEnv = () => {
  return (
    <group position={[0, 0, 0]}>
      {/* 1. Deep Brown Loam Soil */}
      <mesh position={[0, -0.05, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[70, 70]} />
        <meshStandardMaterial color="#382110" roughness={0.95} />
      </mesh>

      {/* 2. Raised Soil Planting Ridges */}
      {[-12, -6, 0, 6, 12].map((x, xi) => (
        <mesh key={xi} position={[x, 0.15, 0]} receiveShadow>
          <boxGeometry args={[1.6, 0.3, 60]} />
          <meshStandardMaterial color="#29180c" />
        </mesh>
      ))}

      {/* 3. Tall Stately Maize Stalks with Golden Cobs & Silk Tassels */}
      {[-12, -6, 0, 6, 12].map((rx, rxi) => (
        <group key={rxi} position={[rx, 0.3, 0]}>
          {[...Array(12)].map((_, zi) => (
            <group key={zi} position={[0, 0, -24 + zi * 4.2]}>
              {/* Main Stalk */}
              <mesh position={[0, 1.8, 0]} castShadow>
                <cylinderGeometry args={[0.08, 0.12, 3.6, 6]} />
                <meshStandardMaterial color="#15803d" />
              </mesh>
              {/* Broad Arching Leaves */}
              <mesh position={[0.4, 1.6, 0]} rotation={[0, 0, -0.6]} castShadow>
                <boxGeometry args={[1.2, 0.04, 0.25]} />
                <meshStandardMaterial color="#22c55e" />
              </mesh>
              <mesh position={[-0.4, 2.2, 0]} rotation={[0, 0, 0.6]} castShadow>
                <boxGeometry args={[1.2, 0.04, 0.25]} />
                <meshStandardMaterial color="#22c55e" />
              </mesh>
              {/* Ripe Golden Corn Cob */}
              <mesh position={[0.2, 1.4, 0.1]} rotation={[0.3, 0, -0.4]} castShadow>
                <cylinderGeometry args={[0.12, 0.14, 0.6, 8]} />
                <meshStandardMaterial color="#eab308" />
              </mesh>
              {/* Top Pollen Tassel */}
              <mesh position={[0, 3.6, 0]}>
                <coneGeometry args={[0.2, 0.6, 5]} />
                <meshStandardMaterial color="#ca8a04" />
              </mesh>
            </group>
          ))}
        </group>
      ))}
    </group>
  );
};
