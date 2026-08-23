import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { usePerformance } from '../../context/PerformanceContext';

export const TreesForest = () => {
  const groupRef = useRef();
  const { graphicsConfig, windSpeed } = usePerformance();

  const treeList = useMemo(() => {
    const list = [];
    const rawCoords = [
      [-42, -10], [-40, 5], [-44, 18], [-38, -25], [-45, -30],
      [16, -18], [18, -26], [32, -24], [35, -15], [36, 0], [28, 8],
      [-14, -28], [-12, -35], [5, 22], [8, 30], [2, 38], [-2, -15],
      [22, 25], [28, 32], [-22, 35], [-30, 28], [10, -32], [42, 12],
    ];

    const density = graphicsConfig.treeDensity || 1.0;
    const count = Math.floor(rawCoords.length * density);

    for (let i = 0; i < count; i++) {
      const [x, z] = rawCoords[i];
      const isPine = i % 3 === 0;
      const heightScale = 0.8 + (i % 5) * 0.15;
      list.push({
        pos: [x, 0.4, z],
        scale: [heightScale, heightScale, heightScale],
        isPine,
        color: isPine ? '#1d4d2d' : (i % 2 === 0 ? '#2d703b' : '#388c4b'),
      });
    }
    return list;
  }, [graphicsConfig.treeDensity]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.children.forEach((tree, idx) => {
      const offset = idx * 0.35;
      // Gentle wind sway in Z and X
      tree.rotation.z = Math.sin(t * (1.6 * windSpeed) + offset) * 0.04;
      tree.rotation.x = Math.cos(t * (1.2 * windSpeed) + offset) * 0.02;
    });
  });

  return (
    <group ref={groupRef}>
      {treeList.map((t, idx) => (
        <group key={idx} position={t.pos} scale={t.scale}>
          {/* Trunk */}
          <mesh position={[0, 0.8, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.22, 0.35, 1.6, 5]} />
            <meshStandardMaterial color="#4a3321" roughness={0.9} flatShading />
          </mesh>

          {/* Foliage */}
          {t.isPine ? (
            <group position={[0, 1.8, 0]}>
              <mesh position={[0, 0, 0]} castShadow>
                <coneGeometry args={[1.5, 2.2, 5]} />
                <meshStandardMaterial color={t.color} roughness={0.85} flatShading />
              </mesh>
              <mesh position={[0, 1.2, 0]} castShadow>
                <coneGeometry args={[1.1, 1.8, 5]} />
                <meshStandardMaterial color={t.color} roughness={0.85} flatShading />
              </mesh>
            </group>
          ) : (
            <group position={[0, 2.0, 0]}>
              <mesh castShadow>
                <dodecahedronGeometry args={[1.4, 0]} />
                <meshStandardMaterial color={t.color} roughness={0.85} flatShading />
              </mesh>
              <mesh position={[0.4, 0.5, 0.2]} scale={[0.8, 0.8, 0.8]} castShadow>
                <dodecahedronGeometry args={[1.1, 0]} />
                <meshStandardMaterial color={t.color} roughness={0.85} flatShading />
              </mesh>
            </group>
          )}
        </group>
      ))}
    </group>
  );
};
