import React, { Suspense, Component } from 'react';
import { Canvas } from '@react-three/fiber';
import { usePerformance } from '../../context/PerformanceContext';
import { useWorld } from '../../context/WorldContext';
import { MarketLighting } from './environment/MarketLighting';
import { MarketTerrain } from './environment/MarketTerrain';
import { MarketEntranceArch } from './environment/MarketEntranceArch';
import { GrainStalls } from './stalls/GrainStalls';
import { VegetableStalls } from './stalls/VegetableStalls';
import { FruitStalls } from './stalls/FruitStalls';
import { PulsesCashStalls } from './stalls/PulsesCashStalls';
import { TransportDock } from './logistics/TransportDock';
import { MarketCharacters } from './actors/MarketCharacters';
import { MarketCameraController } from './MarketCameraController';
import { MarketTransitionFlight } from './MarketTransitionFlight';
import { MarketWebGLFallback } from './MarketWebGLFallback';
import { FloatingPollen } from '../effects/FloatingPollen';
import { Loader2 } from 'lucide-react';

class MarketCanvasErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return <MarketWebGLFallback />;
    }
    return this.props.children;
  }
}

const LoadingFallback = () => (
  <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#150f09] text-amber-400 z-10">
    <Loader2 className="w-10 h-10 animate-spin text-amber-400 mb-3" />
    <span className="font-mono text-xs uppercase tracking-widest text-amber-300">
      Loading Agricultural Market World...
    </span>
  </div>
);

export const MarketWorldCanvas = () => {
  const { graphicsConfig, force2DFallback } = usePerformance();
  const { currentWorld } = useWorld();

  if (force2DFallback) {
    return <MarketWebGLFallback />;
  }

  const isTransitioning =
    currentWorld === 'transition_to_market' || currentWorld === 'transition_to_farm';

  return (
    <MarketCanvasErrorBoundary>
      <div className="relative w-full h-full min-h-[700px] lg:min-h-[900px] overflow-hidden">
        <Suspense fallback={<LoadingFallback />}>
          <Canvas
            shadows={graphicsConfig.shadows}
            dpr={graphicsConfig.dpr}
            camera={{ position: [0, 10, 52], fov: 48, near: 0.1, far: 300 }}
            gl={{
              antialias: true,
              powerPreference: 'high-performance',
              alpha: true,
            }}
            className="w-full h-full cursor-grab active:cursor-grabbing"
          >
            {/* Camera: Flight spline during transition, interactive zone controller once arrived */}
            {isTransitioning ? <MarketTransitionFlight /> : <MarketCameraController />}

            {/* Atmosphere & Lighting */}
            <MarketLighting />

            {/* Plaza & Architecture */}
            <MarketTerrain />
            <MarketEntranceArch />

            {/* Market Stalls */}
            <GrainStalls />
            <VegetableStalls />
            <FruitStalls />
            <PulsesCashStalls />

            {/* Logistics Dock */}
            <TransportDock />

            {/* Traders & Workers */}
            <MarketCharacters />

            {/* Ambient Particles */}
            <FloatingPollen />
          </Canvas>
        </Suspense>
      </div>
    </MarketCanvasErrorBoundary>
  );
};
