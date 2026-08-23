import React, { useMemo } from 'react';
import * as THREE from 'three';
import { usePerformance } from '../../context/PerformanceContext';

export const Terrain = () => {
  const { weatherState } = usePerformance();

  const { geometry } = useMemo(() => {
    const geo = new THREE.PlaneGeometry(130, 150, 64, 64);
    geo.rotateX(-Math.PI / 2);

    const pos = geo.attributes.position;
    const count = pos.count;
    const colorArray = new Float32Array(count * 3);

    const colorPaddyGreen = new THREE.Color('#387a38');
    const colorGoldenWheat = new THREE.Color('#94713c');
    const colorDirtTrail = new THREE.Color('#634932');
    const colorRiverBed = new THREE.Color('#223326');
    const colorHighland = new THREE.Color('#2d5e2d');

    const tempColor = new THREE.Color();

    for (let i = 0; i < count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);

      // Curved river path centerline
      const riverX = Math.sin(z * 0.075) * 8 - 2;
      const distToRiver = Math.abs(x - riverX);

      // Farm road centerline (runs along right side from z=35 down to farmhouse at z=-12, crossing bridge at z=4)
      const roadX = z > 4 ? 14 + Math.sin(z * 0.08) * 3 : 2 + (z - 4) * 0.5;
      const distToRoad = Math.abs(x - roadX);

      // Rolling terraced farm hills
      let y =
        Math.sin(x * 0.08) * 2.2 +
        Math.cos(z * 0.06) * 1.8 +
        Math.sin(x * 0.15 + z * 0.1) * 0.8;

      // Crop Terraces stepping on the left side
      if (x < -6) {
        y = Math.floor(y * 1.5) / 1.5 + (Math.sin(z * 0.2) * 0.25);
      }

      // Smooth river trench
      if (distToRiver < 5.2) {
        const factor = distToRiver / 5.2;
        y = -1.2 + factor * 0.8;
      }

      // Smooth dirt road
      if (distToRoad < 2.8 && z > 0) {
        y = Math.max(0.4, y * 0.5 + 0.2);
      }

      pos.setY(i, y);

      // Color computation based on agricultural zones
      if (distToRiver < 4.2) {
        tempColor.copy(colorRiverBed);
      } else if (distToRoad < 2.2 && z > -5) {
        tempColor.copy(colorDirtTrail);
      } else if (x < -14 && z > -15) {
        tempColor.copy(colorGoldenWheat);
      } else if (y > 2.8) {
        tempColor.copy(colorHighland);
      } else {
        tempColor.copy(colorPaddyGreen);
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
    <mesh geometry={geometry} receiveShadow castShadow={false}>
      <meshStandardMaterial
        vertexColors
        roughness={weatherState === 'rainy' ? 0.35 : 0.85}
        metalness={weatherState === 'rainy' ? 0.25 : 0.05}
        flatShading
      />
    </mesh>
  );
};
