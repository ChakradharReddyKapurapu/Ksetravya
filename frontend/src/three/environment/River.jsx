import React, { useRef, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { usePerformance } from '../../context/PerformanceContext';
import { Droplet, Sparkles, Activity } from 'lucide-react';

export const River = () => {
  const meshRef = useRef();
  const irrigationCanalRef = useRef();
  const { graphicsConfig, weatherState, setSelectedHotspot } = usePerformance();
  const [hovered, setHovered] = useState(false);

  // Main curved river spline geometry
  const { geometry } = useMemo(() => {
    const segments = graphicsConfig.waveResolution * 2;
    const geo = new THREE.PlaneGeometry(7.2, 125, 10, segments);
    geo.rotateX(-Math.PI / 2);

    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const z = pos.getZ(i);
      const riverCenterX = Math.sin(z * 0.075) * 8 - 2;
      pos.setX(i, pos.getX(i) + riverCenterX);
      pos.setY(i, -0.55);
    }
    geo.computeVertexNormals();
    return { geometry: geo };
  }, [graphicsConfig.waveResolution]);

  // Secondary Irrigation Ditch Channel connecting river to left crop fields (z = -6)
  const { canalGeo } = useMemo(() => {
    const geo = new THREE.PlaneGeometry(2.4, 22, 4, 16);
    geo.rotateX(-Math.PI / 2);
    geo.rotateY(Math.PI / 2);
    return { canalGeo: geo };
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const speedMult = weatherState === 'rainy' ? 2.4 : 1.6;

    if (meshRef.current) {
      const pos = meshRef.current.geometry.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i);
        const z = pos.getZ(i);
        const wave =
          Math.sin(z * 0.45 + time * speedMult) * 0.09 +
          Math.cos(x * 0.85 + time * (speedMult * 1.2)) * 0.06;
        pos.setY(i, -0.55 + wave);
      }
      pos.needsUpdate = true;
    }

    if (irrigationCanalRef.current) {
      const cPos = irrigationCanalRef.current.geometry.attributes.position;
      for (let i = 0; i < cPos.count; i++) {
        const x = cPos.getX(i);
        const z = cPos.getZ(i);
        const cWave = Math.sin(x * 0.6 + time * (speedMult * 1.1)) * 0.04;
        cPos.setY(i, -0.42 + cWave);
      }
      cPos.needsUpdate = true;
    }
  });

  return (
    <group>
      {/* Animated Reflective River Surface */}
      <mesh
        ref={meshRef}
        geometry={geometry}
        receiveShadow
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() =>
          setSelectedHotspot({
            title: 'Irrigation River Basin',
            detail: 'Flow: 165 L/s | Silt Level: Optimal | Feeds 4 Field Canals',
          })
        }
        className="cursor-pointer"
      >
        <meshStandardMaterial
          color={weatherState === 'rainy' ? '#164e63' : '#1b789e'}
          emissive="#0d3f54"
          emissiveIntensity={0.3}
          roughness={0.12}
          metalness={0.88}
          transparent
          opacity={0.92}
        />
      </mesh>

      {/* Secondary Irrigation Channel Canal into Crop Terraces */}
      <mesh
        ref={irrigationCanalRef}
        geometry={canalGeo}
        position={[-12, -0.42, -6]}
        receiveShadow
      >
        <meshStandardMaterial
          color="#0284c7"
          roughness={0.2}
          metalness={0.7}
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* Wooden Country Bridge crossing the river (at z = 4) */}
      <WoodenBridge position={[Math.sin(4 * 0.075) * 8 - 2, 0.45, 4]} rotation={[0, 0.15, 0]} />

      {/* Lush Riverbank Reeds */}
      <RiverReeds />

      {/* Floating Water Telemetry Beacon */}
      <Html position={[-3, 1.2, -6]} center distanceFactor={28}>
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={() =>
            setSelectedHotspot({
              title: 'Smart Irrigation Gate Alpha',
              detail: 'Current Flow: 165 L/s • Optimal Soil Moisture Level',
            })
          }
          className="group relative cursor-pointer"
        >
          <div className="w-6 h-6 rounded-full bg-sky-500 flex items-center justify-center text-stone-950 shadow-xl border border-white/50 animate-pulse">
            <Droplet className="w-3.5 h-3.5 fill-current" />
          </div>
          {hovered && (
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-48 p-2 rounded-xl bg-forest-950/95 border border-sky-400/50 shadow-2xl backdrop-blur-xl text-left pointer-events-none">
              <span className="text-[10px] font-bold text-white block">Irrigation Channel Alpha</span>
              <span className="text-[9px] text-sky-300 font-mono">Flow: 165 L/s • Connected to Wheat Fields</span>
            </div>
          )}
        </div>
      </Html>
    </group>
  );
};

const WoodenBridge = ({ position, rotation }) => {
  return (
    <group position={position} rotation={rotation}>
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[9.5, 0.25, 2.6]} />
        <meshStandardMaterial color="#6b4c33" roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.65, 1.25]} castShadow>
        <boxGeometry args={[9.5, 0.12, 0.12]} />
        <meshStandardMaterial color="#503723" roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.65, -1.25]} castShadow>
        <boxGeometry args={[9.5, 0.12, 0.12]} />
        <meshStandardMaterial color="#503723" roughness={0.9} />
      </mesh>
      {[-4, -2, 0, 2, 4].map((xOffset, i) => (
        <React.Fragment key={i}>
          <mesh position={[xOffset, 0.35, 1.25]} castShadow>
            <boxGeometry args={[0.16, 0.7, 0.16]} />
            <meshStandardMaterial color="#432d1c" />
          </mesh>
          <mesh position={[xOffset, 0.35, -1.25]} castShadow>
            <boxGeometry args={[0.16, 0.7, 0.16]} />
            <meshStandardMaterial color="#432d1c" />
          </mesh>
        </React.Fragment>
      ))}
      <mesh position={[-3, -0.6, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.8, 1.2, 2.8]} />
        <meshStandardMaterial color="#545b54" roughness={0.95} />
      </mesh>
      <mesh position={[3, -0.6, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.8, 1.2, 2.8]} />
        <meshStandardMaterial color="#545b54" roughness={0.95} />
      </mesh>
    </group>
  );
};

const RiverReeds = () => {
  const reeds = useMemo(() => {
    const list = [];
    for (let i = 0; i < 48; i++) {
      const z = (Math.random() - 0.5) * 95;
      const riverCenterX = Math.sin(z * 0.075) * 8 - 2;
      const side = Math.random() > 0.5 ? 1 : -1;
      const x = riverCenterX + side * (3.4 + Math.random() * 1.2);
      list.push({
        pos: [x, -0.25, z],
        scale: [0.14, 0.9 + Math.random() * 0.8, 0.14],
        rotY: Math.random() * Math.PI,
        color: i % 2 === 0 ? '#4b8c3d' : '#3f7832',
      });
    }
    return list;
  }, []);

  return (
    <group>
      {reeds.map((r, idx) => (
        <mesh key={idx} position={r.pos} scale={r.scale} rotation={[0, r.rotY, 0.12]}>
          <cylinderGeometry args={[0.3, 0.7, 2.2, 5]} />
          <meshStandardMaterial color={r.color} roughness={0.8} flatShading />
        </mesh>
      ))}
    </group>
  );
};
