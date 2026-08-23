import React, { Suspense, Component, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { usePerformance } from '../../context/PerformanceContext';
import { useCropProtection } from '../../context/CropProtectionContext';
import { FloatingPollen } from '../effects/FloatingPollen';
import { Loader2 } from 'lucide-react';

class CropProtectionErrorBoundary extends Component {
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
        <div className="absolute inset-0 bg-[#071a12] flex items-center justify-center text-teal-300 font-mono text-xs">
          Smart Crop Protection Environment Active
        </div>
      );
    }
    return this.props.children;
  }
}

const LoadingFallback = () => (
  <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#071a12] text-teal-400 z-10">
    <Loader2 className="w-10 h-10 animate-spin text-teal-400 mb-3" />
    <span className="font-mono text-xs uppercase tracking-widest text-teal-300">
      Calibrating Smart Crop Protection Field...
    </span>
  </div>
);

const SmartCropField3D = () => {
  const droneRef = useRef();
  const scanRingRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (droneRef.current) {
      droneRef.current.position.x = Math.sin(t * 0.8) * 8;
      droneRef.current.position.y = 5.5 + Math.cos(t * 1.2) * 0.4;
      droneRef.current.position.z = -8 + Math.cos(t * 0.8) * 4;
    }
    if (scanRingRef.current) {
      scanRingRef.current.rotation.z += 0.02;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* 1. Flat Lush Green Soil Ground */}
      <mesh position={[0, -0.05, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[75, 75]} />
        <meshStandardMaterial color="#0f3822" roughness={0.8} />
      </mesh>

      {/* 2. Crop Health Monitoring Sensor Beacons with Glowing Rings */}
      {[-8, 0, 8].map((bx, bi) => (
        <group key={bi} position={[bx, 0, -5 + (bi % 2) * 4]}>
          {/* Post */}
          <mesh position={[0, 0.9, 0]} castShadow>
            <cylinderGeometry args={[0.06, 0.08, 1.8, 8]} />
            <meshStandardMaterial color="#0f766e" />
          </mesh>
          {/* Sensor Cap */}
          <mesh position={[0, 1.9, 0]}>
            <sphereGeometry args={[0.18, 8, 8]} />
            <meshStandardMaterial color="#2dd4bf" emissive="#14b8a6" emissiveIntensity={0.8} />
          </mesh>
          {/* Glowing Ground Protection Circle */}
          <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[1.2, 1.35, 24]} />
            <meshBasicMaterial color="#2dd4bf" transparent opacity={0.5} />
          </mesh>
        </group>
      ))}

      {/* 3. Crop Protection Rows with Fine Droplet Mist Clouds */}
      {[-12, -6, 0, 6, 12].map((rx, rxi) => (
        <group key={rxi} position={[rx, 0, 0]}>
          {[...Array(12)].map((_, zi) => (
            <group key={zi} position={[0, 0, -22 + zi * 4]}>
              <mesh position={[0, 0.5, 0]} castShadow>
                <sphereGeometry args={[0.55, 8, 8]} scale={[1.1, 0.9, 1.1]} />
                <meshStandardMaterial color="#166534" roughness={0.7} />
              </mesh>
            </group>
          ))}
        </group>
      ))}

      {/* 4. Autonomous Field Monitoring Drone */}
      <group ref={droneRef} position={[0, 5.5, -8]}>
        {/* Central Chassis */}
        <mesh castShadow>
          <boxGeometry args={[0.8, 0.15, 0.8]} />
          <meshStandardMaterial color="#0f172a" metalness={0.9} />
        </mesh>
        {/* 4 Rotors */}
        {[
          [-0.6, 0.1, -0.6],
          [0.6, 0.1, -0.6],
          [-0.6, 0.1, 0.6],
          [0.6, 0.1, 0.6],
        ].map((rp, ri) => (
          <mesh key={ri} position={rp}>
            <cylinderGeometry args={[0.25, 0.25, 0.02, 8]} />
            <meshBasicMaterial color="#38bdf8" transparent opacity={0.6} />
          </mesh>
        ))}
        {/* Downward Scanning Beam Light Cone */}
        <mesh position={[0, -2.5, 0]} rotation={[Math.PI, 0, 0]}>
          <coneGeometry args={[2.5, 5.0, 16]} />
          <meshBasicMaterial color="#2dd4bf" transparent opacity={0.12} />
        </mesh>
      </group>
    </group>
  );
};

export const CropProtectionWorldCanvas = () => {
  const { graphicsConfig, force2DFallback } = usePerformance();

  if (force2DFallback) {
    return (
      <div className="absolute inset-0 bg-gradient-to-b from-[#071a12] via-[#05140e] to-[#020a06] flex items-center justify-center">
        <div className="text-center p-6 text-teal-300 font-mono text-xs">
          High Performance Crop Protection Viewport Active
        </div>
      </div>
    );
  }

  return (
    <CropProtectionErrorBoundary>
      <div className="relative w-full h-full min-h-[600px] overflow-hidden">
        <Suspense fallback={<LoadingFallback />}>
          <Canvas
            shadows={graphicsConfig.shadows}
            dpr={graphicsConfig.dpr}
            camera={{ position: [0, 6.0, 16], fov: 48, near: 0.1, far: 200 }}
            gl={{
              antialias: true,
              powerPreference: 'high-performance',
              alpha: true,
            }}
            className="w-full h-full cursor-grab active:cursor-grabbing"
          >
            {/* Ambient & Atmosphere */}
            <ambientLight color="#ecfdf5" intensity={1.4} />
            <hemisphereLight args={['#ccfbf1', '#1e293b', 0.8]} />

            {/* Sunlight Key */}
            <directionalLight
              position={[20, 30, 15]}
              intensity={2.6}
              color="#fef08a"
              castShadow={graphicsConfig.shadows}
              shadow-mapSize-width={graphicsConfig.shadowMapSize}
              shadow-mapSize-height={graphicsConfig.shadowMapSize}
            />

            {/* Teal protective bio-light accent */}
            <directionalLight position={[-15, 15, -15]} intensity={1.2} color="#2dd4bf" />

            {/* Smart Crop Protection 3D Field */}
            <SmartCropField3D />

            {/* Floating Spores */}
            <FloatingPollen />
          </Canvas>
        </Suspense>
      </div>
    </CropProtectionErrorBoundary>
  );
};
