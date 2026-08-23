import React from 'react';
import { usePerformance } from '../../context/PerformanceContext';

export const Lighting = () => {
  const { timeOfDay, weatherState, graphicsConfig } = usePerformance();

  // Base lighting configurations for time of day
  const configs = {
    golden: {
      sunColor: '#ff9d3b',
      sunIntensity: 3.2,
      sunPosition: [38, 22, -35],
      ambientColor: '#6e5138',
      ambientIntensity: 1.1,
      hemiSky: '#ffd8a8',
      hemiGround: '#1f2e1a',
      fogColor: '#1d2218',
      fogNear: 28,
      fogFar: 150,
    },
    sunrise: {
      sunColor: '#ff8533',
      sunIntensity: 2.8,
      sunPosition: [42, 18, -30],
      ambientColor: '#5c483a',
      ambientIntensity: 0.9,
      hemiSky: '#ffe0c2',
      hemiGround: '#1a281e',
      fogColor: '#1a1e16',
      fogNear: 22,
      fogFar: 140,
    },
    morning: {
      sunColor: '#fff2d6',
      sunIntensity: 2.9,
      sunPosition: [30, 42, -15],
      ambientColor: '#638c75',
      ambientIntensity: 1.2,
      hemiSky: '#e0f4ff',
      hemiGround: '#23472e',
      fogColor: '#142d20',
      fogNear: 35,
      fogFar: 160,
    },
  }[timeOfDay] || {
    sunColor: '#ff9d3b',
    sunIntensity: 3.2,
    sunPosition: [38, 22, -35],
    ambientColor: '#6e5138',
    ambientIntensity: 1.1,
    hemiSky: '#ffd8a8',
    hemiGround: '#1f2e1a',
    fogColor: '#1d2218',
    fogNear: 28,
    fogFar: 150,
  };

  // Weather state overrides
  let sunColor = configs.sunColor;
  let sunIntensity = configs.sunIntensity;
  let ambientColor = configs.ambientColor;
  let ambientIntensity = configs.ambientIntensity;
  let fogColor = configs.fogColor;

  if (weatherState === 'rainy') {
    sunColor = '#94a3b8';
    sunIntensity = 1.2;
    ambientColor = '#334155';
    ambientIntensity = 0.75;
    fogColor = '#0f172a';
  } else if (weatherState === 'cloudy') {
    sunColor = '#e2e8f0';
    sunIntensity = 2.0;
    ambientColor = '#475569';
    ambientIntensity = 0.9;
    fogColor = '#1e293b';
  }

  return (
    <>
      <fog attach="fog" args={[fogColor, configs.fogNear, configs.fogFar]} />
      <ambientLight color={ambientColor} intensity={ambientIntensity} />
      <hemisphereLight args={[configs.hemiSky, configs.hemiGround, 0.85]} />

      {/* Primary Directional Sunlight */}
      <directionalLight
        position={configs.sunPosition}
        intensity={sunIntensity}
        color={sunColor}
        castShadow={graphicsConfig.shadows}
        shadow-mapSize-width={graphicsConfig.shadowMapSize}
        shadow-mapSize-height={graphicsConfig.shadowMapSize}
        shadow-camera-far={190}
        shadow-camera-left={-45}
        shadow-camera-right={45}
        shadow-camera-top={45}
        shadow-camera-bottom={-45}
        shadow-bias={-0.0004}
      />

      {/* Secondary Soft Warm Fill Light */}
      <directionalLight position={[-25, 15, 10]} intensity={0.65} color="#ffcc88" />
    </>
  );
};
