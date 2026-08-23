import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useWeather } from '../../context/WeatherContext';

export const WeatherAtmosphere = () => {
  const { activeWeatherCondition } = useWeather();
  const rainGroupRef = useRef();
  const cloudsRef = useRef();

  const isRainy = activeWeatherCondition === 'rain' || activeWeatherCondition === 'thunderstorm';
  const isStorm = activeWeatherCondition === 'thunderstorm';
  const isFoggy = activeWeatherCondition === 'fog';

  // Generate rain drop streaks
  const rainCount = isStorm ? 300 : isRainy ? 180 : 0;
  const rainPositions = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 300; i++) {
      arr.push([
        (Math.random() - 0.5) * 60,
        Math.random() * 30,
        (Math.random() - 0.5) * 60,
      ]);
    }
    return arr;
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // Falling rain animation
    if (rainGroupRef.current && isRainy) {
      rainGroupRef.current.children.forEach((drop) => {
        drop.position.y -= (isStorm ? 0.95 : 0.65);
        if (drop.position.y < 0) {
          drop.position.y = 28 + Math.random() * 4;
        }
      });
    }

    // Drifting storm clouds
    if (cloudsRef.current) {
      cloudsRef.current.position.x = -20 + ((t * 1.5) % 50);
    }
  });

  return (
    <group>
      {/* 1. Animated Falling Rain Streaks */}
      {isRainy && (
        <group ref={rainGroupRef}>
          {rainPositions.slice(0, rainCount).map((pos, idx) => (
            <mesh key={`rain-${idx}`} position={pos}>
              <cylinderGeometry args={[0.02, 0.02, 0.9, 4]} />
              <meshBasicMaterial
                color={isStorm ? '#93c5fd' : '#bfdbfe'}
                transparent
                opacity={0.65}
              />
            </mesh>
          ))}
        </group>
      )}

      {/* 2. Rolling Cloud Canopy in Sky */}
      <group ref={cloudsRef} position={[-20, 24, -20]}>
        {[-30, -15, 0, 15, 30].map((cx, i) => (
          <mesh
            key={`cloud-${i}`}
            position={[cx, (i % 2) * 2, (i % 3) * 4]}
            castShadow
          >
            <sphereGeometry args={[12 + (i % 3) * 4, 8, 8]} />
            <meshStandardMaterial
              color={isStorm ? '#1e293b' : isRainy ? '#475569' : '#e2e8f0'}
              roughness={0.9}
              transparent
              opacity={isStorm ? 0.9 : isRainy ? 0.8 : 0.5}
            />
          </mesh>
        ))}
      </group>

      {/* 3. Fog Blanket (if Foggy) */}
      {isFoggy && (
        <group position={[0, 1.5, 0]}>
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[120, 120]} />
            <meshBasicMaterial color="#cbd5e1" transparent opacity={0.45} />
          </mesh>
        </group>
      )}
    </group>
  );
};
