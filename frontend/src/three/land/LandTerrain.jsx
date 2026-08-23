import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useLand } from '../../context/LandContext';
import { RiverWaterStream } from './environment/RiverWaterStream';
import { BorewellPumpFlume } from './environment/BorewellPumpFlume';
import { DripIrrigationSystem } from './environment/DripIrrigationSystem';
import { DryLandTerrain } from './environment/DryLandTerrain';

export const LandTerrain = () => {
  const { activeEnvironment } = useLand();
  const birdsGroupRef = useRef();
  const tractorRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // Birds flying across in gentle flock loop
    if (birdsGroupRef.current) {
      birdsGroupRef.current.position.x = -35 + ((t * 4.2) % 90);
      birdsGroupRef.current.position.y = 18 + Math.sin(t * 1.1) * 1.2;
    }

    // Distant tractor driving on back farm road
    if (tractorRef.current) {
      tractorRef.current.position.x = -15 + ((t * 1.2) % 40);
    }
  });

  const isDry = activeEnvironment === 'dry';
  const showRiver = activeEnvironment === 'river' || activeEnvironment === 'composite';
  const showBorewell = activeEnvironment === 'borewell' || activeEnvironment === 'composite' || activeEnvironment === 'drip';
  const showDrip = activeEnvironment === 'drip' || activeEnvironment === 'composite';
  const showCanal = activeEnvironment === 'canal';

  return (
    <group position={[0, -0.5, 0]}>
      {/* 1. Base Ground Plane */}
      {isDry ? (
        <DryLandTerrain />
      ) : (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
          <planeGeometry args={[220, 220, 24, 24]} />
          <meshStandardMaterial color="#2d481f" roughness={0.9} />
        </mesh>
      )}

      {/* =========================================================
          2. DYNAMIC ENVIRONMENT COMPONENTS
         ========================================================= */}

      {/* A. River-Side Stream on Left */}
      {showRiver && <RiverWaterStream />}

      {/* B. Precision Drip Irrigation in Center */}
      {showDrip && <DripIrrigationSystem />}

      {/* C. Borewell Motor Pump & Concrete Flume on Right */}
      {showBorewell && <BorewellPumpFlume />}

      {/* D. Canal Sluice (if canal active and not river) */}
      {showCanal && (
        <group position={[0, 0.05, 0]}>
          {/* Water Surface */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
            <planeGeometry args={[3.5, 80]} />
            <meshStandardMaterial
              color="#38bdf8"
              roughness={0.1}
              metalness={0.8}
              emissive="#0284c7"
              emissiveIntensity={0.3}
            />
          </mesh>
          {/* Concrete Canal Left Border */}
          <mesh position={[-1.9, 0.15, 0]} castShadow>
            <boxGeometry args={[0.3, 0.3, 80]} />
            <meshStandardMaterial color="#e2e8f0" roughness={0.8} />
          </mesh>
          {/* Concrete Canal Right Border */}
          <mesh position={[1.9, 0.15, 0]} castShadow>
            <boxGeometry args={[0.3, 0.3, 80]} />
            <meshStandardMaterial color="#e2e8f0" roughness={0.8} />
          </mesh>
        </group>
      )}

      {/* =========================================================
          3. DISTANT FARM VILLAGE & ROLLING MOUNTAINS
         ========================================================= */}
      {!isDry && (
        <group position={[28, 0, -38]}>
          {/* White Farmhouse */}
          <mesh position={[9, 1.8, 0]} castShadow>
            <boxGeometry args={[5.5, 3.6, 5]} />
            <meshStandardMaterial color="#ffffff" roughness={0.9} />
          </mesh>
          <mesh position={[9, 4.2, 0]} castShadow>
            <coneGeometry args={[4.2, 2.0, 4]} />
            <meshStandardMaterial color="#78350f" />
          </mesh>

          {/* Red Barn */}
          <mesh position={[0, 2.4, 0]} castShadow>
            <boxGeometry args={[7, 4.8, 6]} />
            <meshStandardMaterial color="#b91c1c" roughness={0.7} />
          </mesh>
          <mesh position={[0, 5.4, 0]} castShadow>
            <coneGeometry args={[5.2, 2.2, 4]} />
            <meshStandardMaterial color="#1e293b" />
          </mesh>

          {/* Twin Silos */}
          <mesh position={[-6, 4.0, 0]} castShadow>
            <cylinderGeometry args={[1.4, 1.4, 8, 12]} />
            <meshStandardMaterial color="#94a3b8" metalness={0.5} roughness={0.4} />
          </mesh>
          <mesh position={[-6, 8.4, 0]} castShadow>
            <sphereGeometry args={[1.4, 12, 12]} />
            <meshStandardMaterial color="#cbd5e1" metalness={0.5} />
          </mesh>
        </group>
      )}

      {/* Distant Mountains Backdrop */}
      {[-65, -30, 5, 40, 75].map((x, i) => (
        <mesh key={`mtn-${i}`} position={[x, 9, -70]}>
          <coneGeometry args={[35 + (i % 3) * 8, 26 + (i % 2) * 6, 6]} />
          <meshStandardMaterial color={isDry ? '#78350f' : '#1e3a1e'} roughness={1} />
        </mesh>
      ))}

      {/* Distant Moving Tractor */}
      <group ref={tractorRef} position={[-5, 0, -22]}>
        <mesh position={[0, 0.5, 0]} castShadow>
          <boxGeometry args={[1.8, 0.6, 1.1]} />
          <meshStandardMaterial color="#22c55e" roughness={0.5} />
        </mesh>
        <mesh position={[0.4, 0.9, 0]} castShadow>
          <boxGeometry args={[0.7, 0.7, 1.0]} />
          <meshStandardMaterial color="#0f172a" />
        </mesh>
      </group>

      {/* Flying Birds */}
      <group ref={birdsGroupRef} position={[-25, 20, -15]}>
        {[
          [0, 0, 0],
          [2, 0.5, 1],
          [3.8, 1.0, 2],
          [-1.8, 0.4, 1.5],
          [-3.2, 0.8, 2.5],
        ].map(([bx, by, bz], idx) => (
          <group key={idx} position={[bx, by, bz]}>
            <mesh rotation={[0, 0, 0.4]}>
              <boxGeometry args={[0.35, 0.02, 0.12]} />
              <meshBasicMaterial color="#1e293b" />
            </mesh>
            <mesh rotation={[0, 0, -0.4]} position={[0.3, 0, 0]}>
              <boxGeometry args={[0.35, 0.02, 0.12]} />
              <meshBasicMaterial color="#1e293b" />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
};
