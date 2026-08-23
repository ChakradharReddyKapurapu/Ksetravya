import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useJobs } from '../../context/JobsContext';

export const JobsCropFields = () => {
  const { activeCrop } = useJobs();
  const fieldsRef = useRef();

  // Subtle wind sway animation
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (fieldsRef.current) {
      fieldsRef.current.rotation.z = Math.sin(t * 1.5) * 0.015;
    }
  });

  return (
    <group ref={fieldsRef} position={[0, -0.4, 0]}>
      {/* ==============================================
          1. LEFT FIELD: RICE / PADDY OR COTTON / MAIZE
         ============================================== */}
      {activeCrop === 'cotton' ? (
        /* COTTON FIELD: Dark soil ridges + white bolls */
        <group position={[-16, 0, 5]}>
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.05, 0]}>
            <planeGeometry args={[18, 40]} />
            <meshStandardMaterial color="#2d2218" roughness={0.9} />
          </mesh>
          {/* Cotton Bushes & White Bolls */}
          {[-7, -3.5, 0, 3.5, 7].map((x) =>
            [-16, -10, -4, 2, 8, 14].map((z, idx) => (
              <group key={`cotton-${x}-${z}`} position={[x, 0.4, z]}>
                {/* Green Bush */}
                <mesh castShadow>
                  <sphereGeometry args={[0.45, 6, 6]} />
                  <meshStandardMaterial color="#3f6212" roughness={0.8} />
                </mesh>
                {/* White Cotton Bolls */}
                <mesh position={[0.2, 0.35, 0.1]} castShadow>
                  <sphereGeometry args={[0.16, 6, 6]} />
                  <meshStandardMaterial color="#ffffff" roughness={0.3} />
                </mesh>
                <mesh position={[-0.2, 0.3, -0.1]} castShadow>
                  <sphereGeometry args={[0.15, 6, 6]} />
                  <meshStandardMaterial color="#ffffff" roughness={0.3} />
                </mesh>
              </group>
            ))
          )}
        </group>
      ) : activeCrop === 'maize' ? (
        /* MAIZE FIELD: Tall green & golden stalks */
        <group position={[-16, 0, 5]}>
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.05, 0]}>
            <planeGeometry args={[18, 40]} />
            <meshStandardMaterial color="#451a03" roughness={0.9} />
          </mesh>
          {[-7, -3.5, 0, 3.5, 7].map((x) =>
            [-16, -10, -4, 2, 8, 14].map((z, idx) => (
              <group key={`maize-${x}-${z}`} position={[x, 1.2, z]}>
                <mesh castShadow>
                  <cylinderGeometry args={[0.08, 0.12, 2.4, 5]} />
                  <meshStandardMaterial color="#65a30d" roughness={0.8} />
                </mesh>
                {/* Golden Corn Ear */}
                <mesh position={[0.15, 0.2, 0]} castShadow>
                  <capsuleGeometry args={[0.12, 0.4, 4, 6]} />
                  <meshStandardMaterial color="#eab308" roughness={0.6} />
                </mesh>
              </group>
            ))
          )}
        </group>
      ) : activeCrop === 'mango' ? (
        /* MANGO ORCHARD: Trees with fruit canopy */
        <group position={[-16, 0, 5]}>
          {[-6, 0, 6].map((x) =>
            [-12, -2, 8, 18].map((z, idx) => (
              <group key={`mango-${x}-${z}`} position={[x, 0, z]}>
                {/* Trunk */}
                <mesh position={[0, 1.4, 0]} castShadow>
                  <cylinderGeometry args={[0.2, 0.28, 2.8, 6]} />
                  <meshStandardMaterial color="#451a03" roughness={0.9} />
                </mesh>
                {/* Canopy */}
                <mesh position={[0, 3.2, 0]} castShadow>
                  <sphereGeometry args={[1.8, 8, 8]} />
                  <meshStandardMaterial color="#166534" roughness={0.8} />
                </mesh>
                {/* Golden Mango Fruits */}
                <mesh position={[0.8, 2.6, 0.8]} castShadow>
                  <sphereGeometry args={[0.18, 6, 6]} />
                  <meshStandardMaterial color="#f59e0b" roughness={0.4} />
                </mesh>
                <mesh position={[-0.8, 2.4, -0.6]} castShadow>
                  <sphereGeometry args={[0.18, 6, 6]} />
                  <meshStandardMaterial color="#f59e0b" roughness={0.4} />
                </mesh>
              </group>
            ))
          )}
        </group>
      ) : (
        /* RICE / PADDY FIELD: Flooded terrace with seedlings (Default) */
        <group position={[-16, 0, 5]}>
          {/* Water Surface */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.06, 0]}>
            <planeGeometry args={[18, 40]} />
            <meshStandardMaterial
              color="#0284c7"
              roughness={0.1}
              metalness={0.6}
              transparent
              opacity={0.75}
            />
          </mesh>
          {/* Mud Bund Border */}
          <mesh position={[0, 0.12, 0]} castShadow>
            <boxGeometry args={[18.4, 0.24, 0.4]} />
            <meshStandardMaterial color="#78350f" />
          </mesh>
          {/* Emerald Green Seedling Bunches */}
          {[-7, -3.5, 0, 3.5, 7].map((x) =>
            [-16, -11, -6, -1, 4, 9, 14].map((z, idx) => (
              <mesh key={`paddy-${x}-${z}`} position={[x, 0.35, z]} castShadow>
                <coneGeometry args={[0.28, 0.7, 4]} />
                <meshStandardMaterial color="#22c55e" roughness={0.7} />
              </mesh>
            ))
          )}
        </group>
      )}

      {/* ==============================================
          2. RIGHT FIELD: CHILLI / VEGETABLE FURROWS
         ============================================== */}
      <group position={[14, 0, 5]}>
        {/* Soil Base */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.05, 0]} receiveShadow>
          <planeGeometry args={[16, 40]} />
          <meshStandardMaterial color="#3b2716" roughness={0.9} />
        </mesh>

        {/* Furrow Rows */}
        {[-5, -1.5, 2, 5.5].map((x) =>
          [-16, -10, -4, 2, 8, 14].map((z, idx) => (
            <group key={`furrow-${x}-${z}`} position={[x, 0.35, z]}>
              {/* Green Bush */}
              <mesh castShadow>
                <sphereGeometry args={[0.4, 6, 6]} />
                <meshStandardMaterial color="#15803d" roughness={0.7} />
              </mesh>
              {/* Red Chilli Peppers */}
              <mesh position={[0.2, 0.2, 0.15]} rotation={[0.4, 0, 0]} castShadow>
                <coneGeometry args={[0.08, 0.28, 4]} />
                <meshStandardMaterial color="#dc2626" roughness={0.3} />
              </mesh>
              <mesh position={[-0.15, 0.25, -0.1]} rotation={[-0.3, 0, 0]} castShadow>
                <coneGeometry args={[0.08, 0.28, 4]} />
                <meshStandardMaterial color="#dc2626" roughness={0.3} />
              </mesh>
            </group>
          ))
        )}
      </group>
    </group>
  );
};
