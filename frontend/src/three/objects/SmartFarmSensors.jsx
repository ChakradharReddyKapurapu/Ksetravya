import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const SmartFarmSensors = () => {
  const ringsRef = useRef();

  const sensorNodes = useMemo(() => {
    return [
      { pos: [-16, 0.4, -48], color: '#22c55e', label: 'Soil Moisture Node 1' },
      { pos: [-8, 0.4, -52], color: '#38bdf8', label: 'Nitrogen Sensor 2' },
      { pos: [8, 0.4, -50], color: '#f59e0b', label: 'Solar Irradiance 3' },
      { pos: [18, 0.4, -46], color: '#a855f7', label: 'Weather Telemetry 4' },
    ];
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ringsRef.current) {
      ringsRef.current.children.forEach((child, i) => {
        const s = 1.0 + Math.sin(t * 2.5 + i) * 0.25;
        child.scale.set(s, s, s);
      });
    }
  });

  return (
    <group ref={ringsRef}>
      {sensorNodes.map((node, idx) => (
        <group key={idx} position={node.pos}>
          {/* Vertical Sensor Probe */}
          <mesh position={[0, 0.8, 0]} castShadow>
            <cylinderGeometry args={[0.06, 0.06, 1.6, 8]} />
            <meshStandardMaterial color="#334155" metalness={0.8} />
          </mesh>

          {/* Top Sensor Beacon Bulb */}
          <mesh position={[0, 1.6, 0]}>
            <sphereGeometry args={[0.18, 12, 12]} />
            <meshStandardMaterial
              color={node.color}
              emissive={node.color}
              emissiveIntensity={1.8}
            />
          </mesh>

          {/* Pulsating Ground Radius Ring */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.05, 0]}>
            <ringGeometry args={[1.2, 1.35, 24]} />
            <meshBasicMaterial
              color={node.color}
              transparent
              opacity={0.5}
              side={THREE.DoubleSide}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
};
