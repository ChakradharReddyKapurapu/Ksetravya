import React from 'react';

export const JobsLighting = () => {
  return (
    <>
      {/* Warm Sunrise Directional Sun Light */}
      <directionalLight
        position={[30, 25, 40]}
        intensity={2.2}
        color="#fed7aa"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={120}
        shadow-camera-left={-40}
        shadow-camera-right={40}
        shadow-camera-top={40}
        shadow-camera-bottom={-40}
      />

      {/* Sky & Ground Hemisphere Fill */}
      <hemisphereLight skyColor="#93c5fd" groundColor="#3b2716" intensity={0.9} />

      {/* Soft Ambient Light for readable shadows */}
      <ambientLight intensity={0.4} color="#fef08a" />
    </>
  );
};
