import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { useTools } from '../../../context/ToolsContext';
import { TOOLS_DATA } from '../../../features/tools/data/demoToolsData';
import { Tractor, Star, ArrowRight } from 'lucide-react';

export const Zone01Tractors = () => {
  const wheelsRef = useRef();
  const exhaustRef = useRef();
  const { setSelectedTool, openRentalModal } = useTools();

  const tractorTool = TOOLS_DATA.find((t) => t.id === 'mahindra-575-di') || TOOLS_DATA[0];

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    // Subtle engine vibration
    if (exhaustRef.current) {
      exhaustRef.current.position.y = 2.4 + Math.sin(t * 18) * 0.03;
    }
  });

  return (
    <group position={[-7.5, 0, 18]}>
      {/* Dealership Display Concrete Pad */}
      <mesh position={[0, 0.1, 0]} receiveShadow>
        <boxGeometry args={[10, 0.2, 8]} />
        <meshStandardMaterial color="#334155" roughness={0.7} />
      </mesh>

      {/* Main Green Utility Tractor (47 HP) */}
      <group position={[0, 0.2, 0]}>
        {/* Chassis / Hood */}
        <mesh position={[0, 0.9, -0.4]} castShadow receiveShadow>
          <boxGeometry args={[1.8, 1.1, 2.8]} />
          <meshStandardMaterial color="#15803d" roughness={0.3} metalness={0.3} />
        </mesh>
        {/* Yellow Hood Stripe */}
        <mesh position={[0, 1.5, -0.4]} castShadow>
          <boxGeometry args={[1.6, 0.08, 2.7]} />
          <meshStandardMaterial color="#eab308" />
        </mesh>
        {/* Front Grille */}
        <mesh position={[0, 0.85, -1.82]} castShadow>
          <boxGeometry args={[1.5, 0.9, 0.1]} />
          <meshStandardMaterial color="#0f172a" />
        </mesh>
        {/* Glowing Headlights */}
        <mesh position={[-0.6, 1.0, -1.85]}>
          <cylinderGeometry args={[0.18, 0.18, 0.08, 16]} rotation={[Math.PI / 2, 0, 0]} />
          <meshStandardMaterial color="#fffbeb" emissive="#fde047" emissiveIntensity={2.2} />
        </mesh>
        <mesh position={[0.6, 1.0, -1.85]}>
          <cylinderGeometry args={[0.18, 0.18, 0.08, 16]} rotation={[Math.PI / 2, 0, 0]} />
          <meshStandardMaterial color="#fffbeb" emissive="#fde047" emissiveIntensity={2.2} />
        </mesh>

        {/* Vertical Exhaust Pipe with Smoke */}
        <group ref={exhaustRef} position={[0.7, 2.4, -0.8]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.06, 0.06, 1.4, 8]} />
            <meshStandardMaterial color="#1e293b" metalness={0.8} />
          </mesh>
          {/* Subtle smoke puff */}
          <mesh position={[0, 0.8, 0]}>
            <sphereGeometry args={[0.2, 8, 8]} />
            <meshBasicMaterial color="#e2e8f0" transparent opacity={0.35} />
          </mesh>
        </group>

        {/* Cabin Glass */}
        <mesh position={[0, 1.85, 0.9]} castShadow>
          <boxGeometry args={[1.65, 1.4, 1.5]} />
          <meshStandardMaterial color="#38bdf8" transparent opacity={0.65} roughness={0.1} />
        </mesh>
        <mesh position={[0, 2.6, 0.9]} castShadow>
          <boxGeometry args={[1.85, 0.2, 1.7]} />
          <meshStandardMaterial color="#15803d" />
        </mesh>

        {/* 4 Wheels */}
        <group ref={wheelsRef}>
          {[
            [-1.15, 0.6, 0.9, 0.95, 0.55],
            [1.15, 0.6, 0.9, 0.95, 0.55],
            [-1.05, 0.3, -1.1, 0.55, 0.42],
            [1.05, 0.3, -1.1, 0.55, 0.42],
          ].map(([x, y, z, rad, width], wi) => (
            <group key={wi} position={[x, y, z]}>
              <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
                <cylinderGeometry args={[rad, rad, width, 16]} />
                <meshStandardMaterial color="#18181b" roughness={0.9} />
              </mesh>
              <mesh rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[rad * 0.55, rad * 0.55, width + 0.02, 10]} />
                <meshStandardMaterial color="#eab308" metalness={0.5} />
              </mesh>
            </group>
          ))}
        </group>
      </group>

      {/* Floating In-World Discovery Hotspot Badge */}
      <Html position={[0, 3.8, 0]} center distanceFactor={26}>
        <div
          onClick={() => setSelectedTool(tractorTool)}
          className="group p-3 rounded-2xl bg-forest-950/95 border border-amber-400/50 shadow-2xl backdrop-blur-xl cursor-pointer hover:scale-105 transition-all text-left w-56"
        >
          <div className="flex items-center justify-between mb-1">
            <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[9px] font-mono border border-amber-400/30">
              01 TRACTORS
            </span>
            <span className="text-[10px] text-amber-300 font-bold flex items-center gap-0.5">
              <Star className="w-3 h-3 fill-current" /> 4.9
            </span>
          </div>
          <h4 className="text-xs font-bold font-display text-white group-hover:text-amber-300">
            {tractorTool.name}
          </h4>
          <div className="flex items-center justify-between text-[10px] font-mono text-cream-200/70 mt-1">
            <span>Rent: ₹{tractorTool.rentPriceDay}/d</span>
            <span className="text-emerald-400 font-bold">Inspect →</span>
          </div>
        </div>
      </Html>
    </group>
  );
};
