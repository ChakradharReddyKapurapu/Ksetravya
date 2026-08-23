import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useAnalytics } from '../../context/AnalyticsContext';

export const AnalyticsTerrain = () => {
  const { allCrops } = useAnalytics();
  const dataNodesRef = useRef();
  const tractorRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // Floating price nodes oscillation
    if (dataNodesRef.current) {
      dataNodesRef.current.children.forEach((node, idx) => {
        node.position.y = 1.6 + Math.sin(t * 2 + idx * 1.5) * 0.25;
      });
    }

    // Moving tractor
    if (tractorRef.current) {
      tractorRef.current.position.x = -18 + ((t * 1.4) % 45);
    }
  });

  return (
    <group position={[0, -0.5, 0]}>
      {/* 1. Base Farmland Soil Plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[220, 220, 24, 24]} />
        <meshStandardMaterial color="#1a2e15" roughness={0.85} />
      </mesh>

      {/* 2. Glowing Digital Data Conduits / Matrix Ribbons on Ground */}
      {[-16, -8, 0, 8, 16].map((gx, idx) => (
        <mesh
          key={`conduit-${idx}`}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[gx, 0.04, 0]}
        >
          <planeGeometry args={[0.35, 90]} />
          <meshBasicMaterial
            color={idx % 2 === 0 ? '#38bdf8' : '#a855f7'}
            transparent
            opacity={0.7}
          />
        </mesh>
      ))}

      {/* 3. Crop Row Stalks (Dense green agricultural canopy) */}
      {[-14, -10, -6, -2, 2, 6, 10, 14].map((rx, rIdx) =>
        [-35, -25, -15, -5, 5, 15, 25, 35].map((rz, zIdx) => (
          <group key={`crop-${rIdx}-${zIdx}`} position={[rx, 0, rz]}>
            <mesh position={[0, 0.5, 0]} castShadow>
              <coneGeometry args={[0.45, 1.0, 5]} />
              <meshStandardMaterial color="#16a34a" roughness={0.7} />
            </mesh>
          </group>
        ))
      )}

      {/* 4. Floating Live Market Price Beacons */}
      <group ref={dataNodesRef} position={[0, 1.6, 6]}>
        {[
          { label: 'RICE', price: '₹2,420', pos: [-12, 0, -8], color: '#38bdf8' },
          { label: 'COTTON', price: '₹7,550', pos: [-4, 0, -2], color: '#a855f7' },
          { label: 'CHILLI', price: '₹20,400', pos: [4, 0, -6], color: '#f43f5e' },
          { label: 'GROUNDNUT', price: '₹7,900', pos: [12, 0, -4], color: '#eab308' },
        ].map((node, idx) => (
          <group key={`node-${idx}`} position={node.pos}>
            {/* Glowing Beacon Core */}
            <mesh castShadow>
              <boxGeometry args={[1.8, 0.8, 0.3]} />
              <meshStandardMaterial
                color="#0f172a"
                emissive={node.color}
                emissiveIntensity={0.6}
                roughness={0.2}
              />
            </mesh>
            {/* Vertical Laser Ray to Ground */}
            <mesh position={[0, -1.0, 0]}>
              <cylinderGeometry args={[0.02, 0.02, 2.0, 4]} />
              <meshBasicMaterial color={node.color} transparent opacity={0.6} />
            </mesh>
          </group>
        ))}
      </group>

      {/* 5. Moving Tractor */}
      <group ref={tractorRef} position={[-10, 0, -20]}>
        <mesh position={[0, 0.5, 0]} castShadow>
          <boxGeometry args={[2.0, 0.7, 1.2]} />
          <meshStandardMaterial color="#22c55e" roughness={0.5} />
        </mesh>
        <mesh position={[0.4, 0.9, 0]} castShadow>
          <boxGeometry args={[0.8, 0.8, 1.1]} />
          <meshStandardMaterial color="#0f172a" />
        </mesh>
      </group>

      {/* 6. Distant Mountain Silhouette */}
      {[-65, -30, 5, 40, 75].map((x, i) => (
        <mesh key={`mtn-${i}`} position={[x, 10, -65]}>
          <coneGeometry args={[35 + (i % 3) * 8, 24 + (i % 2) * 6, 6]} />
          <meshStandardMaterial color="#0f291e" roughness={1} />
        </mesh>
      ))}
    </group>
  );
};
