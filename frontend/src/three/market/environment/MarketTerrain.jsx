import React, { useMemo } from 'react';
import * as THREE from 'three';

export const MarketTerrain = () => {
  const { geometry } = useMemo(() => {
    const geo = new THREE.PlaneGeometry(120, 140, 48, 48);
    geo.rotateX(-Math.PI / 2);

    const pos = geo.attributes.position;
    const count = pos.count;
    const colorArray = new Float32Array(count * 3);

    const colorPaved = new THREE.Color('#786250');
    const colorCobble = new THREE.Color('#5c4738');
    const colorEarth = new THREE.Color('#423023');
    const colorGrassEdge = new THREE.Color('#385e34');

    const tempColor = new THREE.Color();

    for (let i = 0; i < count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);

      // Central market main avenue (x: -8 to 8)
      const distToAvenue = Math.abs(x);

      let y = Math.sin(x * 0.05) * 0.2 + Math.cos(z * 0.05) * 0.15;

      // Flatten main market plaza
      if (Math.abs(x) < 28 && Math.abs(z) < 45) {
        y = 0;
      }

      pos.setY(i, y);

      if (distToAvenue < 5.5) {
        tempColor.copy(colorPaved);
      } else if (Math.abs(x) < 26 && Math.abs(z) < 42) {
        tempColor.copy(colorCobble);
      } else if (Math.abs(x) < 36) {
        tempColor.copy(colorEarth);
      } else {
        tempColor.copy(colorGrassEdge);
      }

      colorArray[i * 3] = tempColor.r;
      colorArray[i * 3 + 1] = tempColor.g;
      colorArray[i * 3 + 2] = tempColor.b;
    }

    geo.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));
    geo.computeVertexNormals();
    return { geometry: geo };
  }, []);

  return (
    <group>
      {/* Paved and Cobblestone Market Floor */}
      <mesh geometry={geometry} receiveShadow castShadow={false}>
        <meshStandardMaterial vertexColors roughness={0.88} flatShading />
      </mesh>

      {/* Perimeter Rustic Market Wall */}
      <mesh position={[-28, 1.2, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.2, 2.4, 90]} />
        <meshStandardMaterial color="#4a3728" roughness={0.9} />
      </mesh>
      <mesh position={[28, 1.2, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.2, 2.4, 90]} />
        <meshStandardMaterial color="#4a3728" roughness={0.9} />
      </mesh>
      <mesh position={[0, 1.2, -45]} castShadow receiveShadow>
        <boxGeometry args={[56, 2.4, 1.2]} />
        <meshStandardMaterial color="#4a3728" roughness={0.9} />
      </mesh>

      {/* Street Lamps along Market Avenue */}
      <StreetLamps />
    </group>
  );
};

const StreetLamps = () => {
  const lampPositions = [
    [-6, 0, 28], [6, 0, 28],
    [-6, 0, 10], [6, 0, 10],
    [-6, 0, -8], [6, 0, -8],
    [-6, 0, -26], [6, 0, -26],
  ];

  return (
    <group>
      {lampPositions.map((pos, idx) => (
        <group key={idx} position={pos}>
          {/* Post */}
          <mesh position={[0, 2.5, 0]} castShadow>
            <cylinderGeometry args={[0.08, 0.12, 5.0, 8]} />
            <meshStandardMaterial color="#1e293b" metalness={0.8} />
          </mesh>
          {/* Lantern Head */}
          <mesh position={[0, 5.0, 0]} castShadow>
            <boxGeometry args={[0.45, 0.6, 0.45]} />
            <meshStandardMaterial
              color="#fef08a"
              emissive="#f59e0b"
              emissiveIntensity={1.4}
            />
          </mesh>
          <mesh position={[0, 5.4, 0]}>
            <coneGeometry args={[0.35, 0.3, 4]} />
            <meshStandardMaterial color="#0f172a" />
          </mesh>
        </group>
      ))}
    </group>
  );
};
