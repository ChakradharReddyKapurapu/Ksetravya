import React, { Suspense, Component } from 'react';
import { Canvas } from '@react-three/fiber';
import { usePerformance } from '../../context/PerformanceContext';
import { JobsLighting } from './JobsLighting';
import { JobsTerrain } from './JobsTerrain';
import { JobsCropFields } from './JobsCropFields';
import { JobsAnimatedWorkers } from './JobsAnimatedWorkers';
import { JobsBirdsAndClouds } from './JobsBirdsAndClouds';
import { JobsCameraController } from './JobsCameraController';
import { JobsWebGLFallback } from './JobsWebGLFallback';
import { FloatingPollen } from '../effects/FloatingPollen';
import { Loader2 } from 'lucide-react';

class JobsCanvasErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return <JobsWebGLFallback />;
    }
    return this.props.children;
  }
}

const LoadingFallback = () => (
  <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#142314] text-emerald-400 z-10">
    <Loader2 className="w-10 h-10 animate-spin text-emerald-400 mb-3" />
    <span className="font-mono text-xs uppercase tracking-widest text-emerald-300">
      Loading Agricultural Work Environment...
    </span>
  </div>
);

export const JobsWorldCanvas = () => {
  const { graphicsConfig, force2DFallback } = usePerformance();

  if (force2DFallback) {
    return <JobsWebGLFallback />;
  }

  return (
    <JobsCanvasErrorBoundary>
      <div className="relative w-full h-full min-h-[700px] lg:min-h-[900px] overflow-hidden">
        <Suspense fallback={<LoadingFallback />}>
          <Canvas
            shadows={graphicsConfig.shadows}
            dpr={graphicsConfig.dpr}
            camera={{ position: [0, 7, 34], fov: 48, near: 0.1, far: 250 }}
            gl={{
              antialias: true,
              powerPreference: 'high-performance',
              alpha: true,
            }}
            className="w-full h-full cursor-grab active:cursor-grabbing"
          >
            <JobsCameraController />
            <JobsLighting />
            <JobsTerrain />
            <JobsCropFields />
            <JobsAnimatedWorkers />
            <JobsBirdsAndClouds />
            <FloatingPollen />
          </Canvas>
        </Suspense>
      </div>
    </JobsCanvasErrorBoundary>
  );
};
