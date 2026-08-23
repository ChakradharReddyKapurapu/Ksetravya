import React, { Suspense, Component } from 'react';
import { Canvas } from '@react-three/fiber';
import { usePerformance } from '../../context/PerformanceContext';
import { AnalyticsLighting } from './AnalyticsLighting';
import { AnalyticsTerrain } from './AnalyticsTerrain';
import { AnalyticsCameraController } from './AnalyticsCameraController';
import { AnalyticsWebGLFallback } from './AnalyticsWebGLFallback';
import { FloatingPollen } from '../effects/FloatingPollen';
import { Loader2 } from 'lucide-react';

class AnalyticsCanvasErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return <AnalyticsWebGLFallback />;
    }
    return this.props.children;
  }
}

const LoadingFallback = () => (
  <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0f172a] text-purple-400 z-10">
    <Loader2 className="w-10 h-10 animate-spin text-purple-400 mb-3" />
    <span className="font-mono text-xs uppercase tracking-widest text-purple-300">
      Loading Agricultural Intelligence Command Center...
    </span>
  </div>
);

export const AnalyticsWorldCanvas = () => {
  const { graphicsConfig, force2DFallback } = usePerformance();

  if (force2DFallback) {
    return <AnalyticsWebGLFallback />;
  }

  return (
    <AnalyticsCanvasErrorBoundary>
      <div className="relative w-full h-full min-h-[700px] lg:min-h-[900px] overflow-hidden">
        <Suspense fallback={<LoadingFallback />}>
          <Canvas
            shadows={graphicsConfig.shadows}
            dpr={graphicsConfig.dpr}
            camera={{ position: [0, 7.0, 26], fov: 48, near: 0.1, far: 300 }}
            gl={{
              antialias: true,
              powerPreference: 'high-performance',
              alpha: true,
            }}
            className="w-full h-full cursor-grab active:cursor-grabbing"
          >
            <AnalyticsCameraController />
            <AnalyticsLighting />
            <AnalyticsTerrain />
            <FloatingPollen />
          </Canvas>
        </Suspense>
      </div>
    </AnalyticsCanvasErrorBoundary>
  );
};
