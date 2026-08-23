import React from 'react';
import { usePerformance } from '../../../context/PerformanceContext';

export const MarketLighting = () => {
  const { graphicsConfig } = usePerformance();

  return (
    <>
      <fog attach="fog" args={['#241b12', 25, 130]} />
      <ambientLight color="#785942" intensity={1.2} />
      <hemisphereLight args={['#ffe4cc', '#2a1a10', 0.85]} />

      {/* Main Warm Morning Market Sun */}
      <directionalLight
        position={[35, 32, 20]}
        intensity={3.4}
        color="#ffa844"
        castShadow={graphicsConfig.shadows}
        shadow-mapSize-width={graphicsConfig.shadowMapSize}
        shadow-mapSize-height={graphicsConfig.shadowMapSize}
        shadow-camera-far={160}
        shadow-camera-left={-40}
        shadow-camera-right={40}
        shadow-camera-top={40}
        shadow-camera-bottom={-40}
        shadow-bias={-0.0005}
      />

      {/* Secondary Soft Fill Light */}
      <directionalLight position={[-25, 20, -15]} intensity={0.75} color="#ffd4a8" />

      {/* Market Plaza Warm Lantern Accent Lights */}
      <pointLight position={[0, 5, 0]} intensity={1.5} color="#fbbf24" distance={18} />
      <pointLight position={[-16, 4, 18]} intensity={1.2} color="#f59e0b" distance={15} />
      <pointLight position={[16, 4, 18]} intensity={1.2} color="#f59e0b" distance={15} />
    </>
  );
};
