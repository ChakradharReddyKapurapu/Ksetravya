import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useWeather } from '../../context/WeatherContext';

export const WeatherLighting = () => {
  const { activeWeatherCondition } = useWeather();
  const lightningLightRef = useRef();
  const [lightningActive, setLightningActive] = useState(false);

  useFrame(({ clock }) => {
    // Lightning flash trigger during thunderstorm
    if (activeWeatherCondition === 'thunderstorm') {
      const t = clock.getElapsedTime();
      // Occasional random bursts
      const flash = Math.sin(t * 3.7) > 0.94 || (Math.sin(t * 7.1) > 0.97);
      if (lightningLightRef.current) {
        lightningLightRef.current.intensity = flash ? 8.0 : 0.0;
      }
    }
  });

  const isStorm = activeWeatherCondition === 'thunderstorm';
  const isRain = activeWeatherCondition === 'rain';
  const isClear = activeWeatherCondition === 'clear';
  const isCloudy = activeWeatherCondition === 'cloudy' || activeWeatherCondition === 'partly_cloudy';
  const isFog = activeWeatherCondition === 'fog';
  const isNight = activeWeatherCondition === 'night';

  let sunColor = '#fed7aa';
  let sunIntensity = 2.4;
  let skyColor = '#bae6fd';
  let groundColor = '#3f220d';
  let ambientIntensity = 0.45;

  if (isStorm) {
    sunColor = '#64748b';
    sunIntensity = 0.6;
    skyColor = '#1e293b';
    groundColor = '#0f172a';
    ambientIntensity = 0.25;
  } else if (isRain) {
    sunColor = '#94a3b8';
    sunIntensity = 1.0;
    skyColor = '#334155';
    groundColor = '#1e293b';
    ambientIntensity = 0.35;
  } else if (isCloudy) {
    sunColor = '#e2e8f0';
    sunIntensity = 1.6;
    skyColor = '#94a3b8';
    groundColor = '#2d481f';
    ambientIntensity = 0.55;
  } else if (isFog) {
    sunColor = '#cbd5e1';
    sunIntensity = 0.9;
    skyColor = '#94a3b8';
    groundColor = '#334155';
    ambientIntensity = 0.5;
  } else if (isNight) {
    sunColor = '#38bdf8';
    sunIntensity = 0.3;
    skyColor = '#0284c7';
    groundColor = '#020617';
    ambientIntensity = 0.15;
  }

  return (
    <>
      {/* Directional Sunlight / Overcast Key */}
      <directionalLight
        position={[-35, 30, 40]}
        intensity={sunIntensity}
        color={sunColor}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      {/* Sky & Earth Atmosphere Light */}
      <hemisphereLight skyColor={skyColor} groundColor={groundColor} intensity={0.9} />

      {/* Ambient Fill */}
      <ambientLight intensity={ambientIntensity} color={sunColor} />

      {/* Sudden High-Intensity Lightning Strobe (Active during thunderstorm) */}
      <pointLight
        ref={lightningLightRef}
        position={[0, 25, -20]}
        color="#e0f2fe"
        intensity={0}
        distance={120}
        decay={2}
      />
    </>
  );
};
