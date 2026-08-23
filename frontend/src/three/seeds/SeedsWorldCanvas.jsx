import React, { Suspense, Component, useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { usePerformance } from '../../context/PerformanceContext';
import { useSeeds } from '../../context/SeedsContext';
import { RicePaddyEnv } from './environments/RicePaddyEnv';
import { MaizeFieldEnv } from './environments/MaizeFieldEnv';
import { GroundnutFieldEnv } from './environments/GroundnutFieldEnv';
import { CottonFieldEnv } from './environments/CottonFieldEnv';
import { WheatFieldEnv } from './environments/WheatFieldEnv';
import { ChilliFieldEnv } from './environments/ChilliFieldEnv';
import { TomatoFieldEnv } from './environments/TomatoFieldEnv';
import { MangoOrchardEnv } from './environments/MangoOrchardEnv';
import { FloatingPollen } from '../effects/FloatingPollen';
import { Loader2 } from 'lucide-react';

class SeedsCanvasErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="absolute inset-0 bg-[#0c1f13] flex items-center justify-center text-emerald-400 font-mono text-xs">
          Interactive Agricultural Seedscape Active
        </div>
      );
    }
    return this.props.children;
  }
}

const LoadingFallback = () => (
  <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#07170e] text-emerald-400 z-10">
    <Loader2 className="w-10 h-10 animate-spin text-emerald-400 mb-3" />
    <span className="font-mono text-xs uppercase tracking-widest text-emerald-300">
      Loading Seed Germination Environment...
    </span>
  </div>
);

const SeedsCameraController = () => {
  const { camera } = useThree();
  const { activeCrop } = useSeeds();
  const { prefersReducedMotion } = usePerformance();

  const mousePos = useRef({ x: 0, y: 0 });
  const currentTarget = useRef(new THREE.Vector3(0, 4.0, 16));
  const currentLookAt = useRef(new THREE.Vector3(0, 1.5, 0));

  useEffect(() => {
    const handleMouseMove = (e) => {
      mousePos.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mousePos.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((_, delta) => {
    let targetPos = new THREE.Vector3(0, 4.5, 15);
    let targetLook = new THREE.Vector3(0, 1.5, 0);

    if (activeCrop === 'rice') {
      targetPos.set(0, 4.2, 13);
      targetLook.set(0, 0.8, -4);
    } else if (activeCrop === 'maize') {
      targetPos.set(0, 5.0, 16);
      targetLook.set(0, 2.5, -4);
    } else if (activeCrop === 'cotton') {
      targetPos.set(0, 3.8, 12);
      targetLook.set(0, 1.0, -3);
    } else if (activeCrop === 'wheat') {
      targetPos.set(0, 3.5, 14);
      targetLook.set(0, 1.2, -6);
    } else if (activeCrop === 'mango') {
      targetPos.set(0, 6.0, 20);
      targetLook.set(0, 3.5, -6);
    }

    const px = prefersReducedMotion ? 0 : mousePos.current.x * 1.5;
    const py = prefersReducedMotion ? 0 : -mousePos.current.y * 0.8;

    targetPos.x += px;
    targetPos.y += py;

    currentTarget.current.lerp(targetPos, Math.min(delta * 2.5, 1));
    currentLookAt.current.lerp(targetLook, Math.min(delta * 3.0, 1));

    camera.position.copy(currentTarget.current);
    camera.lookAt(currentLookAt.current);
  });

  return null;
};

export const SeedsWorldCanvas = () => {
  const { graphicsConfig, force2DFallback } = usePerformance();
  const { activeCrop } = useSeeds();

  if (force2DFallback) {
    return (
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a2315] via-[#081b10] to-[#040e08] flex items-center justify-center">
        <div className="text-center p-6 text-emerald-300 font-mono text-xs">
          High Performance Seed & Germination Viewport Active
        </div>
      </div>
    );
  }

  return (
    <SeedsCanvasErrorBoundary>
      <div className="relative w-full h-full min-h-[600px] overflow-hidden">
        <Suspense fallback={<LoadingFallback />}>
          <Canvas
            shadows={graphicsConfig.shadows}
            dpr={graphicsConfig.dpr}
            camera={{ position: [0, 4.5, 15], fov: 46, near: 0.1, far: 200 }}
            gl={{
              antialias: true,
              powerPreference: 'high-performance',
              alpha: true,
            }}
            className="w-full h-full cursor-grab active:cursor-grabbing"
          >
            {/* Dynamic Camera Controller */}
            <SeedsCameraController />

            {/* Atmosphere Lighting */}
            <ambientLight color="#f0fdf4" intensity={1.3} />
            <hemisphereLight args={['#ecfdf5', '#1e293b', 0.8]} />

            {/* Golden Morning Sunlight Key */}
            <directionalLight
              position={[25, 35, 20]}
              intensity={2.8}
              color="#fef08a"
              castShadow={graphicsConfig.shadows}
              shadow-mapSize-width={graphicsConfig.shadowMapSize}
              shadow-mapSize-height={graphicsConfig.shadowMapSize}
            />

            {/* Sky Blue Fill */}
            <directionalLight position={[-20, 20, -20]} intensity={1.0} color="#7dd3fc" />

            {/* Active Crop Living 3D Environment */}
            {activeCrop === 'rice' && <RicePaddyEnv />}
            {activeCrop === 'maize' && <MaizeFieldEnv />}
            {activeCrop === 'groundnut' && <GroundnutFieldEnv />}
            {activeCrop === 'cotton' && <CottonFieldEnv />}
            {activeCrop === 'wheat' && <WheatFieldEnv />}
            {activeCrop === 'chilli' && <ChilliFieldEnv />}
            {activeCrop === 'tomato' && <TomatoFieldEnv />}
            {activeCrop === 'mango' && <MangoOrchardEnv />}

            {/* Natural Spores & Pollen */}
            <FloatingPollen />
          </Canvas>
        </Suspense>
      </div>
    </SeedsCanvasErrorBoundary>
  );
};
