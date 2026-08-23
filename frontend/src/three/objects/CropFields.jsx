import React, { useRef, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { usePerformance } from '../../context/PerformanceContext';
import { Sprout } from 'lucide-react';

export const CropFields = () => {
  const wheatMeshRef = useRef();
  const maizeMeshRef = useRef();
  const { windSpeed, setSelectedHotspot } = usePerformance();
  const [hovered, setHovered] = useState(false);

  // Instanced Wheat Stalks (Terraced Hillside, Golden Yellow)
  const wheatCount = 140;
  const { wheatData, wheatGeo } = useMemo(() => {
    const geo = new THREE.CylinderGeometry(0.04, 0.08, 1.4, 4);
    geo.translate(0, 0.7, 0); // Origin at base for natural bending

    const list = [];
    for (let i = 0; i < wheatCount; i++) {
      const row = Math.floor(i / 14);
      const col = i % 14;
      const x = -28 + col * 1.2 + (Math.random() - 0.5) * 0.4;
      const z = -20 + row * 2.8 + (Math.random() - 0.5) * 0.4;
      const y = 0.8 + Math.sin(x * 0.08) * 1.5;
      list.push({ pos: [x, y, z], scale: 0.9 + Math.random() * 0.3, rotY: Math.random() * Math.PI });
    }
    return { wheatData: list, wheatGeo: geo };
  }, []);

  // Instanced Maize / Corn Rows (Lush Green)
  const maizeCount = 100;
  const { maizeData, maizeGeo } = useMemo(() => {
    const geo = new THREE.ConeGeometry(0.35, 1.8, 5);
    geo.translate(0, 0.9, 0);

    const list = [];
    for (let i = 0; i < maizeCount; i++) {
      const row = Math.floor(i / 10);
      const col = i % 10;
      const x = -14 + col * 1.1;
      const z = 6 + row * 2.2;
      const y = 0.5 + Math.sin(x * 0.08) * 1.2;
      list.push({ pos: [x, y, z], scale: 0.85 + Math.random() * 0.3 });
    }
    return { maizeData: list, maizeGeo: geo };
  }, []);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // Animate Wheat Stalks with multi-harmonic wind swaying
    if (wheatMeshRef.current) {
      wheatData.forEach((item, i) => {
        dummy.position.set(...item.pos);
        dummy.scale.set(item.scale, item.scale, item.scale);

        // Wind wave formula: primary wave + secondary micro gust
        const wave =
          Math.sin(t * (2.2 * windSpeed) + item.pos[0] * 0.3 + item.pos[2] * 0.2) * 0.16 +
          Math.cos(t * (3.8 * windSpeed) + i) * 0.06;

        dummy.rotation.set(wave, item.rotY, wave * 0.6);
        dummy.updateMatrix();
        wheatMeshRef.current.setMatrixAt(i, dummy.matrix);
      });
      wheatMeshRef.current.instanceMatrix.needsUpdate = true;
    }

    // Animate Maize Stalks
    if (maizeMeshRef.current) {
      maizeData.forEach((item, i) => {
        dummy.position.set(...item.pos);
        dummy.scale.set(item.scale, item.scale, item.scale);

        const wave = Math.sin(t * (1.8 * windSpeed) + item.pos[0] * 0.25 + item.pos[2] * 0.15) * 0.1;
        dummy.rotation.set(wave * 0.8, 0, wave * 0.4);
        dummy.updateMatrix();
        maizeMeshRef.current.setMatrixAt(i, dummy.matrix);
      });
      maizeMeshRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <group
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() =>
        setSelectedHotspot({
          title: 'Precision Wheat & Maize Terraces',
          detail: 'Soil Health: 96% • Drip Irrigation: Active • Expected Yield: +18%',
        })
      }
      className="cursor-pointer"
    >
      {/* Golden Wheat Stalks */}
      <instancedMesh
        ref={wheatMeshRef}
        args={[wheatGeo, null, wheatCount]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial color="#ca8a04" roughness={0.7} />
      </instancedMesh>

      {/* Lush Green Maize Rows */}
      <instancedMesh
        ref={maizeMeshRef}
        args={[maizeGeo, null, maizeCount]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial color="#15803d" roughness={0.75} />
      </instancedMesh>

      {/* Floating Crop Telemetry Beacon */}
      <Html position={[-20, 3.2, -6]} center distanceFactor={28}>
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={() =>
            setSelectedHotspot({
              title: 'Crop Terraces Sector Beta',
              detail: 'Soil Moisture: 68% • Nitrogen Level: Optimal • Crop: Durum Wheat',
            })
          }
          className="group relative cursor-pointer"
        >
          <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-stone-950 shadow-xl border border-white/50 animate-pulse">
            <Sprout className="w-3.5 h-3.5" />
          </div>
          {hovered && (
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-48 p-2 rounded-xl bg-forest-950/95 border border-emerald-400/50 shadow-2xl backdrop-blur-xl text-left pointer-events-none">
              <span className="text-[10px] font-bold text-white block">Precision Wheat Terraces</span>
              <span className="text-[9px] text-emerald-300 font-mono">Soil Moisture: 68% • High Yield</span>
            </div>
          )}
        </div>
      </Html>
    </group>
  );
};
