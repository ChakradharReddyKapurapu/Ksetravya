import React from 'react';

export const GroundnutFieldEnv = () => {
  return (
    <group position={[0, 0, 0]}>
      {/* 1. Red Sandy Loam Soil (Characteristic of Rayalaseema Groundnut Belt) */}
      <mesh position={[0, -0.05, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[70, 70]} />
        <meshStandardMaterial color="#7c2d12" roughness={0.95} />
      </mesh>

      {/* 2. Low-Lying Groundnut Canopies with Yellow Pea Flowers */}
      {[-10, -5, 0, 5, 10].map((rx, rxi) => (
        <group key={rxi} position={[rx, 0, 0]}>
          {[...Array(14)].map((_, zi) => (
            <group key={zi} position={[0, 0.2, -26 + zi * 3.8]}>
              {/* Spreading Leaf Dome */}
              <mesh position={[0, 0.15, 0]} castShadow>
                <sphereGeometry args={[0.55, 8, 8]} scale={[1.3, 0.5, 1.2]} />
                <meshStandardMaterial color="#15803d" roughness={0.8} />
              </mesh>
              {/* Tiny Yellow Groundnut Flower Dot */}
              <mesh position={[0.2, 0.3, 0.1]}>
                <sphereGeometry args={[0.06, 6, 6]} />
                <meshStandardMaterial color="#facc15" emissive="#ca8a04" emissiveIntensity={0.6} />
              </mesh>
            </group>
          ))}
        </group>
      ))}

      {/* 3. Subterranean Pegging Pod Markers along the field edge */}
      <group position={[14, 0.2, -6]}>
        <mesh castShadow>
          <boxGeometry args={[4, 0.4, 3]} />
          <meshStandardMaterial color="#9a3412" />
        </mesh>
      </group>
    </group>
  );
};
