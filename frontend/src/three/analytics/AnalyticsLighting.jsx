import React from 'react';

export const AnalyticsLighting = () => {
  return (
    <>
      {/* Warm Golden Key Light */}
      <directionalLight
        position={[-25, 30, 35]}
        intensity={2.2}
        color="#fed7aa"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      {/* Cyber-Agro Sky Fill Light (Violet/Cyan Digital Tint) */}
      <hemisphereLight skyColor="#c084fc" groundColor="#064e3b" intensity={0.85} />

      {/* Ambient Data Fill */}
      <ambientLight intensity={0.4} color="#a855f7" />
    </>
  );
};
