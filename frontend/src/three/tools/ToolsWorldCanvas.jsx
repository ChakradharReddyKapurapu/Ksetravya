import React, { Suspense, Component } from 'react';
import { Canvas } from '@react-three/fiber';
import { usePerformance } from '../../context/PerformanceContext';
import { ToolsRoadwayCamera } from './ToolsRoadwayCamera';
import { ContinuousFarmRoad } from './road/ContinuousFarmRoad';
import { Zone01Tractors } from './road/Zone01Tractors';
import { Zone02SoilPrep } from './road/Zone02SoilPrep';
import { Zone03Seeding } from './road/Zone03Seeding';
import { Zone04Fertilizer } from './road/Zone04Fertilizer';
import { Zone05Spraying } from './road/Zone05Spraying';
import { Zone06Irrigation } from './road/Zone06Irrigation';
import { Zone07Harvesting } from './road/Zone07Harvesting';
import { Zone08Baling } from './road/Zone08Baling';
import { Zone09Transport } from './road/Zone09Transport';
import { Zone10MarketEntrance } from './road/Zone10MarketEntrance';
import { ToolsWebGLFallback } from './ToolsWebGLFallback';
import { FloatingPollen } from '../effects/FloatingPollen';
import { Loader2 } from 'lucide-react';

class ToolsCanvasErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return <ToolsWebGLFallback />;
    }
    return this.props.children;
  }
}

const LoadingFallback = () => (
  <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#09110d] text-amber-400 z-10">
    <Loader2 className="w-10 h-10 animate-spin text-amber-400 mb-3" />
    <span className="font-mono text-xs uppercase tracking-widest text-amber-300">
      Loading 3D Agricultural Road Journey...
    </span>
  </div>
);

export const ToolsWorldCanvas = () => {
  const { graphicsConfig, force2DFallback } = usePerformance();

  if (force2DFallback) {
    return <ToolsWebGLFallback />;
  }

  return (
    <ToolsCanvasErrorBoundary>
      <div className="relative w-full h-full min-h-[600px] overflow-hidden">
        <Suspense fallback={<LoadingFallback />}>
          <Canvas
            shadows={graphicsConfig.shadows}
            dpr={graphicsConfig.dpr}
            camera={{ position: [0, 8.5, 28], fov: 48, near: 0.1, far: 300 }}
            gl={{
              antialias: true,
              powerPreference: 'high-performance',
              alpha: true,
            }}
            className="w-full h-full cursor-grab active:cursor-grabbing"
          >
            {/* Scroll-driven 10-Zone Spline Camera Flight */}
            <ToolsRoadwayCamera />

            {/* Atmosphere & Lighting */}
            <ambientLight color="#fef3c7" intensity={1.2} />
            <hemisphereLight args={['#e0f2fe', '#292524', 0.8]} />

            {/* Sun Key Light */}
            <directionalLight
              position={[30, 40, 20]}
              intensity={3.0}
              color="#fbbf24"
              castShadow={graphicsConfig.shadows}
              shadow-mapSize-width={graphicsConfig.shadowMapSize}
              shadow-mapSize-height={graphicsConfig.shadowMapSize}
            />

            {/* Blue Sky Back Fill */}
            <directionalLight position={[-20, 20, -50]} intensity={1.2} color="#38bdf8" />

            {/* Continuous Farm Road System */}
            <ContinuousFarmRoad />

            {/* 10 Animated Machinery Road Zones */}
            <Zone01Tractors />
            <Zone02SoilPrep />
            <Zone03Seeding />
            <Zone04Fertilizer />
            <Zone05Spraying />
            <Zone06Irrigation />
            <Zone07Harvesting />
            <Zone08Baling />
            <Zone09Transport />
            <Zone10MarketEntrance />

            {/* Atmospheric Dust & Pollen */}
            <FloatingPollen />
          </Canvas>
        </Suspense>
      </div>
    </ToolsCanvasErrorBoundary>
  );
};
