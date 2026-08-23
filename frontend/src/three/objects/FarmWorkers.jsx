import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';

export const FarmWorkers = () => {
  const groupRef = useRef();

  // Positions and activities of farmers in the agricultural fields
  const workers = useMemo(() => {
    return [
      // 1. Farmer tending wheat field
      { pos: [-18, 1.1, 14], rotY: 0.8, color: '#f59e0b', activity: 'tending', hat: true },
      // 2. Farmer with harvest basket near maize
      { pos: [-12, 0.9, 18], rotY: -1.2, color: '#22c55e', activity: 'carrying', hat: true },
      // 3. Worker inspecting irrigation canal
      { pos: [-5, 0.4, -4], rotY: 2.1, color: '#0284c7', activity: 'inspecting', hat: false },
      // 4. Mechanic near machinery depot
      { pos: [13, 0.8, -4], rotY: -0.6, color: '#e11d48', activity: 'tools', hat: false },
      // 5. Farmer checking land soil
      { pos: [-24, 1.4, -18], rotY: 1.5, color: '#16a34a', activity: 'tending', hat: true },
      // 6. Market stall keeper
      { pos: [-4, 1.1, -38], rotY: 0.2, color: '#d97706', activity: 'waving', hat: true },
    ];
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();

    groupRef.current.children.forEach((workerGroup, i) => {
      const w = workers[i];
      if (!w) return;

      if (w.activity === 'tending') {
        // Subtle bending down and standing up
        workerGroup.rotation.x = Math.sin(t * 1.4 + i) * 0.15;
      } else if (w.activity === 'carrying') {
        // Slight bobbing while holding produce basket
        workerGroup.position.y = w.pos[1] + Math.sin(t * 3.0 + i) * 0.04;
      } else if (w.activity === 'waving') {
        // Arm wave
        const rightArm = workerGroup.children[2];
        if (rightArm) {
          rightArm.rotation.z = -1.2 + Math.sin(t * 4.0) * 0.35;
        }
      }
    });
  });

  return (
    <group ref={groupRef}>
      {workers.map((w, idx) => (
        <group key={idx} position={w.pos} rotation={[0, w.rotY, 0]} scale={[0.55, 0.55, 0.55]}>
          {/* Torso / Shirt */}
          <mesh position={[0, 1.4, 0]} castShadow>
            <cylinderGeometry args={[0.32, 0.28, 1.1, 8]} />
            <meshStandardMaterial color={w.color} roughness={0.8} />
          </mesh>

          {/* Head */}
          <mesh position={[0, 2.2, 0]} castShadow>
            <sphereGeometry args={[0.26, 12, 12]} />
            <meshStandardMaterial color="#fed7aa" roughness={0.6} />
          </mesh>

          {/* Right Arm */}
          <mesh position={[0.42, 1.4, 0]} castShadow>
            <cylinderGeometry args={[0.08, 0.08, 0.8, 6]} />
            <meshStandardMaterial color={w.color} />
          </mesh>

          {/* Left Arm */}
          <mesh position={[-0.42, 1.4, 0]} castShadow>
            <cylinderGeometry args={[0.08, 0.08, 0.8, 6]} />
            <meshStandardMaterial color={w.color} />
          </mesh>

          {/* Traditional Farmer Straw / Turban Hat */}
          {w.hat && (
            <mesh position={[0, 2.48, 0]} castShadow>
              <cylinderGeometry args={[0.48, 0.28, 0.18, 12]} />
              <meshStandardMaterial color="#ca8a04" roughness={0.9} />
            </mesh>
          )}

          {/* Produce Basket if carrying */}
          {w.activity === 'carrying' && (
            <mesh position={[0, 1.2, 0.45]} castShadow>
              <boxGeometry args={[0.6, 0.4, 0.45]} />
              <meshStandardMaterial color="#92400e" roughness={0.9} />
            </mesh>
          )}

          {/* Pants Legs */}
          <mesh position={[-0.14, 0.55, 0]} castShadow>
            <cylinderGeometry args={[0.12, 0.1, 1.0, 6]} />
            <meshStandardMaterial color="#1e293b" />
          </mesh>
          <mesh position={[0.14, 0.55, 0]} castShadow>
            <cylinderGeometry args={[0.12, 0.1, 1.0, 6]} />
            <meshStandardMaterial color="#1e293b" />
          </mesh>
        </group>
      ))}
    </group>
  );
};
