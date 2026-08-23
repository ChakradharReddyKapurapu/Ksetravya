import React from 'react';
import { useWeather } from '../../context/WeatherContext';

export const WeatherFarmlandTerrain = () => {
  const { activeWeatherCondition } = useWeather();
  const isRainy = activeWeatherCondition === 'rain' || activeWeatherCondition === 'thunderstorm';
  const isStorm = activeWeatherCondition === 'thunderstorm';

  return (
    <group position={[0, -0.5, 0]}>
      {/* 1. Base Rain-Soaked Ground Plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[220, 220, 24, 24]} />
        <meshStandardMaterial
          color={isStorm ? '#122010' : isRainy ? '#1e3318' : '#2d481f'}
          roughness={isRainy ? 0.35 : 0.9}
          metalness={isRainy ? 0.4 : 0.0}
        />
      </mesh>

      {/* 2. Center Flooded Furrow / Waterlogged Ditch (Reflective wet water channel matching image) */}
      <group position={[0, 0.04, 0]}>
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[2.8, 100]} />
          <meshStandardMaterial
            color={isStorm ? '#0f172a' : '#0284c7'}
            roughness={0.05}
            metalness={0.9}
            emissive={isStorm ? '#0284c7' : '#0369a1'}
            emissiveIntensity={isStorm ? 0.15 : 0.25}
          />
        </mesh>
      </group>

      {/* 3. Lush Green Crop Rows along Left and Right Sides (Matching Reference Image) */}
      {[-8, -6, -4, -2, 2, 4, 6, 8].map((rx, rIdx) =>
        [-40, -30, -20, -10, 0, 10, 20, 30, 40].map((rz, zIdx) => (
          <group key={`crop-${rIdx}-${zIdx}`} position={[rx, 0, rz]}>
            {/* Green Corn / Crop Stalk */}
            <mesh position={[0, 0.6, 0]} castShadow>
              <coneGeometry args={[0.5, 1.2, 5]} />
              <meshStandardMaterial
                color={isRainy ? '#15803d' : '#22c55e'}
                roughness={isRainy ? 0.4 : 0.7}
              />
            </mesh>
            <mesh position={[0, 0.3, 0]} castShadow>
              <coneGeometry args={[0.7, 0.7, 5]} />
              <meshStandardMaterial color="#166534" roughness={0.7} />
            </mesh>
          </group>
        ))
      )}

      {/* 4. Distant Farmhouse with Warm Glow */}
      <group position={[22, 0, -32]}>
        <mesh position={[0, 2.0, 0]} castShadow>
          <boxGeometry args={[6, 4, 5]} />
          <meshStandardMaterial color="#e2e8f0" roughness={0.8} />
        </mesh>
        <mesh position={[0, 4.6, 0]} castShadow>
          <coneGeometry args={[4.5, 2.2, 4]} />
          <meshStandardMaterial color="#78350f" />
        </mesh>
        {/* Warm Window Glow */}
        <mesh position={[0, 1.8, 2.52]}>
          <planeGeometry args={[1.4, 1.4]} />
          <meshBasicMaterial color="#fef08a" />
        </mesh>
      </group>

      {/* 5. Distant Red Tractor in the Field */}
      <group position={[12, 0, -26]}>
        <mesh position={[0, 0.6, 0]} castShadow>
          <boxGeometry args={[2.2, 0.8, 1.4]} />
          <meshStandardMaterial color="#dc2626" roughness={0.5} />
        </mesh>
        <mesh position={[0.5, 1.1, 0]} castShadow>
          <boxGeometry args={[1.0, 0.9, 1.2]} />
          <meshStandardMaterial color="#1e293b" />
        </mesh>
      </group>

      {/* 6. Horizon Trees Line */}
      {[-45, -30, -15, 0, 15, 30, 45].map((tx, idx) => (
        <group key={`tree-${idx}`} position={[tx, 0, -48]}>
          <mesh position={[0, 1.5, 0]} castShadow>
            <cylinderGeometry args={[0.2, 0.35, 3.0, 5]} />
            <meshStandardMaterial color="#382110" />
          </mesh>
          <mesh position={[0, 3.5, 0]} castShadow>
            <sphereGeometry args={[2.0, 7, 7]} />
            <meshStandardMaterial color={isStorm ? '#064e3b' : '#15803d'} roughness={0.8} />
          </mesh>
        </group>
      ))}
    </group>
  );
};
