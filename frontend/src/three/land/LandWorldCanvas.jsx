import React, { Suspense, Component } from 'react';
import { Canvas } from '@react-three/fiber';
import { usePerformance } from '../../context/PerformanceContext';
import { LandLighting } from './LandLighting';
import { LandTerrain } from './LandTerrain';
import { LandCameraController } from './LandCameraController';
import { LandWebGLFallback } from './LandWebGLFallback';
import { FloatingPollen } from '../effects/FloatingPollen';
import { Loader2 } from 'lucide-react';

class LandCanvasErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return <LandWebGLFallback />;
    }
    return this.props.children;
  }
}

const LoadingFallback = () => (
  <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#142410] text-amber-400 z-10">
    <Loader2 className="w-10 h-10 animate-spin text-amber-400 mb-3" />
    <span className="font-mono text-xs uppercase tracking-widest text-amber-300">
      Loading Farmland Discovery Landscape...
    </span>
  </div>
);

export const LandWorldCanvas = () => {
  const { graphicsConfig, force2DFallback } = usePerformance();

  if (force2DFallback) {
    return <LandWebGLFallback />;
  }

  return (
    <LandCanvasErrorBoundary>
      <div className="relative w-full h-full min-h-[700px] lg:min-h-[900px] overflow-hidden">
        <Suspense fallback={<LoadingFallback />}>
          <Canvas
            shadows={graphicsConfig.shadows}
            dpr={graphicsConfig.dpr}
            camera={{ position: [0, 14, 42], fov: 48, near: 0.1, far: 300 }}
            gl={{
              antialias: true,
              powerPreference: 'high-performance',
              alpha: true,
            }}
            className="w-full h-full cursor-grab active:cursor-grabbing"
          >
            <LandCameraController />
            <LandLighting />
            <LandTerrain />
            <FloatingPollen />
          </Canvas>
        </Suspense>
      </div>
    </LandCanvasErrorBoundary>
  );
};
