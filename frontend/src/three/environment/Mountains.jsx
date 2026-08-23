import React, { useMemo } from 'react';

export const Mountains = () => {
  const mountainData = useMemo(() => {
    return [
      { pos: [-55, 7, -65], scale: [26, 16, 20], rot: 0.25, color: '#213f2f', sunColor: '#3a664d' },
      { pos: [-28, 11, -78], scale: [32, 24, 25], rot: -0.35, color: '#1e3c2c', sunColor: '#386348' },
      { pos: [4, 14, -85], scale: [40, 28, 30], rot: 0.1, color: '#173324', sunColor: '#31573e' },
      { pos: [36, 10, -74], scale: [30, 20, 24], rot: 0.3, color: '#1d3c2b', sunColor: '#3b684c' },
      { pos: [65, 8, -65], scale: [26, 15, 18], rot: -0.2, color: '#183424', sunColor: '#345e43' },
      // Distant secondary mountain ridge with golden horizon fog
      { pos: [-18, 17, -100], scale: [48, 34, 35], rot: 0.05, color: '#13281d', sunColor: '#284d37' },
      { pos: [30, 18, -105], scale: [50, 36, 38], rot: -0.15, color: '#102219', sunColor: '#244531' },
    ];
  }, []);

  return (
    <group>
      {mountainData.map((peak, idx) => (
        <mesh
          key={idx}
          position={peak.pos}
          scale={peak.scale}
          rotation={[0, peak.rot, 0]}
        >
          <coneGeometry args={[1, 1, 6]} />
          <meshStandardMaterial
            color={peak.color}
            roughness={0.92}
            metalness={0.08}
            flatShading
          />
        </mesh>
      ))}
    </group>
  );
};
