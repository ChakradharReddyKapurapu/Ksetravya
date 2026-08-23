import React from 'react';
import { useLand } from '../../context/LandContext';

export const LandLighting = () => {
  const { activeEnvironment } = useLand();

  // Dynamic Lighting setup based on land environment
  let sunColor = '#fed7aa';
  let sunIntensity = 2.4;
  let skyColor = '#bae6fd';
  let groundColor = '#451a03';

  if (activeEnvironment === 'dry') {
    // Warm arid sunlight
    sunColor = '#f59e0b';
    sunIntensity = 2.8;
    skyColor = '#fed7aa';
    groundColor = '#78350f';
  } else if (activeEnvironment === 'river') {
    // Crisp reflective river daylight
    sunColor = '#ffffff';
    sunIntensity = 2.5;
    skyColor = '#38bdf8';
    groundColor = '#064e3b';
  } else if (activeEnvironment === 'drip') {
    // Fresh morning dawn
    sunColor = '#fef08a';
    sunIntensity = 2.3;
    skyColor = '#e0f2fe';
    groundColor = '#14532d';
  }

  return (
    <>
      {/* Directional Sun Light */}
      <directionalLight
        position={[-35, 28, 45]}
        intensity={sunIntensity}
        color={sunColor}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={140}
        shadow-camera-left={-50}
        shadow-camera-right={50}
        shadow-camera-top={50}
        shadow-camera-bottom={-50}
      />

      {/* Sky & Earth Fill */}
      <hemisphereLight skyColor={skyColor} groundColor={groundColor} intensity={0.95} />

      {/* Ambient Fill Light */}
      <ambientLight intensity={0.45} color={sunColor} />
    </>
  );
};
