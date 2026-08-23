import React from 'react';

export const LogisticsYardEnv = () => {
  return (
    <group position={[0, 0, 0]}>
      {/* Paved Concrete Logistics Depot Floor */}
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[45, 45]} />
        <meshStandardMaterial color="#334155" roughness={0.9} />
      </mesh>

      {/* Warehouse Loading Dock Building */}
      <group position={[0, 0, -12]}>
        <mesh position={[0, 4.0, 0]} castShadow receiveShadow>
          <boxGeometry args={[36, 8.0, 10]} />
          <meshStandardMaterial color="#1e293b" />
        </mesh>
        {/* Shutter Doors */}
        {[-10, 0, 10].map((dx, di) => (
          <mesh key={di} position={[dx, 2.5, 5.05]}>
            <planeGeometry args={[6.0, 4.5]} />
            <meshStandardMaterial color="#0f172a" metalness={0.8} />
          </mesh>
        ))}
      </group>

      {/* Tractor with 5-Tonne Tipping Trailer */}
      <group position={[-4, 0.4, 4]}>
        {/* Red Tractor */}
        <mesh position={[0, 1.0, -2.5]} castShadow>
          <boxGeometry args={[1.8, 1.2, 2.4]} />
          <meshStandardMaterial color="#dc2626" />
        </mesh>
        {/* Large 5-Tonne Cargo Bed */}
        <mesh position={[0, 1.3, 1.8]} castShadow receiveShadow>
          <boxGeometry args={[2.8, 1.5, 4.8]} />
          <meshStandardMaterial color="#1e293b" />
        </mesh>
        {/* Sacks inside Trailer */}
        <mesh position={[0, 1.8, 1.8]} castShadow>
          <boxGeometry args={[2.4, 0.9, 4.2]} />
          <meshStandardMaterial color="#a16207" />
        </mesh>
        {/* Dual Rear Trailer Wheels */}
        {[
          [-1.5, 0.45, 1.8],
          [1.5, 0.45, 1.8],
          [-1.5, 0.45, 3.4],
          [1.5, 0.45, 3.4],
        ].map((wPos, wi) => (
          <mesh key={wi} position={wPos} rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.5, 0.5, 0.4, 12]} />
            <meshStandardMaterial color="#0f172a" />
          </mesh>
        ))}
      </group>
    </group>
  );
};
