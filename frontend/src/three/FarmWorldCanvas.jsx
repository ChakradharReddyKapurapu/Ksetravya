import React, { Suspense, Component } from 'react';
import { Canvas } from '@react-three/fiber';
import { usePerformance } from '../context/PerformanceContext';
import { Lighting } from './environment/Lighting';
import { SkyAtmosphere } from './environment/SkyAtmosphere';
import { Mountains } from './environment/Mountains';
import { Terrain } from './environment/Terrain';
import { River } from './environment/River';
import { Clouds } from './environment/Clouds';
import { CropFields } from './objects/CropFields';
import { TreesForest } from './objects/TreesForest';
import { FarmHouse } from './objects/FarmHouse';
import { Tractor } from './objects/Tractor';
import { BirdsFlock } from './objects/BirdsFlock';
import { WindTurbines } from './objects/WindTurbines';
import { AgriDrone } from './objects/AgriDrone';
import { FarmWorkers } from './objects/FarmWorkers';
import { MachineryDepot } from './objects/MachineryDepot';
import { LandPlotsZone } from './objects/LandPlotsZone';
import { MarketplaceRoadZone } from './objects/MarketplaceRoadZone';
import { SmartFarmSensors } from './objects/SmartFarmSensors';
import { Butterflies } from './objects/Butterflies';
import { InteractiveHotspots } from './objects/InteractiveHotspots';
import { FloatingPollen } from './effects/FloatingPollen';
import { RainEffects } from './effects/RainEffects';
import { CinematicCamera } from './camera/CinematicCamera';
import { WebGLFallback } from './WebGLFallback';
import { Loader2 } from 'lucide-react';

class CanvasErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Three.js Canvas Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <WebGLFallback />;
    }
    return this.props.children;
  }
}

const LoadingFallback = () => (
  <div className="absolute inset-0 flex flex-col items-center justify-center bg-forest-950 text-emerald-400 z-10">
    <Loader2 className="w-10 h-10 animate-spin text-emerald-400 mb-3" />
    <span className="font-mono text-xs uppercase tracking-widest text-emerald-300">
      Loading Full-Page Living Agricultural World...
    </span>
  </div>
);

export const FarmWorldCanvas = () => {
  const { graphicsConfig, force2DFallback } = usePerformance();

  if (force2DFallback) {
    return <WebGLFallback />;
  }

  return (
    <CanvasErrorBoundary>
      <div className="relative w-full h-full min-h-[700px] overflow-hidden">
        <Suspense fallback={<LoadingFallback />}>
          <Canvas
            shadows={graphicsConfig.shadows}
            dpr={graphicsConfig.dpr}
            camera={{ position: [0, 19, 46], fov: 48, near: 0.1, far: 340 }}
            gl={{
              antialias: true,
              powerPreference: 'high-performance',
              alpha: true,
            }}
            className="w-full h-full cursor-grab active:cursor-grabbing"
          >
            {/* Smooth Cinematic Camera (Continuous 8-Zone Scroll Journey) */}
            <CinematicCamera />

            {/* Dynamic Sky & Lighting */}
            <Lighting />
            <SkyAtmosphere />
            <Clouds />
            <Mountains />

            {/* Living Landscape & Flowing River */}
            <Terrain />
            <River />

            {/* Farm Ecosystem & Objects */}
            <CropFields />
            <TreesForest />
            <FarmHouse />
            <Tractor />
            <BirdsFlock />
            <Butterflies />
            <AgriDrone />
            <FarmWorkers />
            <MachineryDepot />
            <LandPlotsZone />
            <MarketplaceRoadZone />
            <SmartFarmSensors />
            <WindTurbines />
            <InteractiveHotspots />

            {/* Weather & Atmospheric Particles */}
            <FloatingPollen />
            <RainEffects />
          </Canvas>
        </Suspense>
      </div>
    </CanvasErrorBoundary>
  );
};
