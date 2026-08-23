import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';

export const MarketCharacters = () => {
  const charactersRef = useRef();

  const characterList = useMemo(() => {
    return [
      // Farmers / Traders near Grain Stalls
      { pos: [-10, 0, 21], rot: 1.2, color: '#f59e0b', hat: true, role: 'trader' },
      { pos: [-12, 0, 23], rot: -0.6, color: '#22c55e', hat: false, role: 'farmer' },
      // Near Vegetable Stalls
      { pos: [10, 0, 21], rot: -1.4, color: '#ef4444', hat: true, role: 'buyer' },
      { pos: [12, 0, 23], rot: 0.8, color: '#38bdf8', hat: false, role: 'farmer' },
      // Near Fruit Stalls
      { pos: [-10, 0, 1], rot: 1.5, color: '#eab308', hat: true, role: 'trader' },
      { pos: [-12, 0, -2], rot: -0.3, color: '#10b981', hat: false, role: 'buyer' },
      // Near Transport Dock
      { pos: [-6, 0, -22], rot: 3.1, color: '#3b82f6', hat: false, role: 'worker' },
      { pos: [6, 0, -22], rot: 2.8, color: '#64748b', hat: false, role: 'worker' },
      // Walking in Central Avenue
      { pos: [-1.5, 0, 14], rot: 0, color: '#d97706', hat: true, isWalking: true },
      { pos: [2.0, 0, 6], rot: Math.PI, color: '#059669', hat: false, isWalking: true },
    ];
  }, []);

  useFrame((state) => {
    if (!charactersRef.current) return;
    const t = state.clock.getElapsedTime();

    charactersRef.current.children.forEach((charGroup, i) => {
      const c = characterList[i];
      if (!c) return;

      // Subtle talking / inspecting motion
      charGroup.rotation.y = c.rot + Math.sin(t * 1.5 + i) * 0.08;
      
      // Arm movement if walking
      if (c.isWalking) {
        charGroup.position.z += (c.rot === 0 ? -1 : 1) * 0.02;
        if (charGroup.position.z < -10) charGroup.position.z = 25;
        if (charGroup.position.z > 25) charGroup.position.z = -10;
      }
    });
  });

  return (
    <group ref={charactersRef}>
      {characterList.map((c, idx) => (
        <group key={idx} position={c.pos} scale={[0.55, 0.55, 0.55]}>
          {/* Stylized Body / Shirt */}
          <mesh position={[0, 1.4, 0]} castShadow>
            <cylinderGeometry args={[0.32, 0.28, 1.1, 8]} />
            <meshStandardMaterial color={c.color} roughness={0.8} />
          </mesh>

          {/* Head */}
          <mesh position={[0, 2.2, 0]} castShadow>
            <sphereGeometry args={[0.26, 12, 12]} />
            <meshStandardMaterial color="#fed7aa" roughness={0.6} />
          </mesh>

          {/* Traditional Straw / Turban Hat */}
          {c.hat && (
            <mesh position={[0, 2.45, 0]} castShadow>
              <cylinderGeometry args={[0.42, 0.28, 0.18, 10]} />
              <meshStandardMaterial color="#ca8a04" roughness={0.9} />
            </mesh>
          )}

          {/* Pants */}
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
