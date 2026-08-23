import React, { Suspense, Component } from 'react';
import { Canvas } from '@react-three/fiber';
import { usePerformance } from '../../context/PerformanceContext';
import { WeatherLighting } from './WeatherLighting';
import { WeatherFarmlandTerrain } from './WeatherFarmlandTerrain';
import { WeatherAtmosphere } from './WeatherAtmosphere';
import { WeatherCameraController } from './WeatherCameraController';
import { WeatherWebGLFallback } from './WeatherWebGLFallback';
import { Loader2 } from 'lucide-react';

class WeatherCanvasErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return <WeatherWebGLFallback />;
    }
    return this.props.children;
  }
}

const LoadingFallback = () => (
  <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0a1118] text-sky-400 z-10">
    <Loader2 className="w-10 h-10 animate-spin text-sky-400 mb-3" />
    <span className="font-mono text-xs uppercase tracking-widest text-sky-300">
      Loading Atmospheric Weather Engine...
    </span>
  </div>
);

export const WeatherWorldCanvas = () => {
  const { graphicsConfig, force2DFallback } = usePerformance();

  if (force2DFallback) {
    return <WeatherWebGLFallback />;
  }

  return (
    <WeatherCanvasErrorBoundary>
      <div className="relative w-full h-full min-h-[700px] lg:min-h-[900px] overflow-hidden">
        <Suspense fallback={<LoadingFallback />}>
          <Canvas
            shadows={graphicsConfig.shadows}
            dpr={graphicsConfig.dpr}
            camera={{ position: [0, 5.5, 24], fov: 50, near: 0.1, far: 300 }}
            gl={{
              antialias: true,
              powerPreference: 'high-performance',
              alpha: true,
            }}
            className="w-full h-full cursor-grab active:cursor-grabbing"
          >
            <WeatherCameraController />
            <WeatherLighting />
            <WeatherAtmosphere />
            <WeatherFarmlandTerrain />
          </Canvas>
        </Suspense>
      </div>
    </WeatherCanvasErrorBoundary>
  );
};
