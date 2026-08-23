import React, { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { usePerformance } from '../../context/PerformanceContext';
import { TractorDustTrail } from '../effects/TractorDustTrail';
import { Tractor as TractorIcon, Sparkles, Activity } from 'lucide-react';

export const Tractor = () => {
  const tractorGroupRef = useRef();
  const frontWheelsGroup = useRef();
  const frontLeftWheel = useRef();
  const frontRightWheel = useRef();
  const rearLeftWheel = useRef();
  const rearRightWheel = useRef();
  const exhaustPuffRef = useRef();

  const { setSelectedHotspot } = usePerformance();
  const [hovered, setHovered] = useState(false);
  const [tractorState, setTractorState] = useState({ pos: new THREE.Vector3(15, 0.55, 10), rot: 0 });

  // Predefined curved closed farm loop path
  // Road goes down right field path, crosses bridge, tours near farmhouse and circles back
  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3(
      [
        new THREE.Vector3(16, 0.65, 20),
        new THREE.Vector3(14, 0.65, 8),
        new THREE.Vector3(8, 0.6, 4),
        new THREE.Vector3(2, 0.65, 4),    // Over bridge
        new THREE.Vector3(-4, 0.65, 2),
        new THREE.Vector3(-8, 0.65, -6),   // Near field
        new THREE.Vector3(-2, 0.65, -14),  // Near farmhouse
        new THREE.Vector3(12, 0.65, -12),  // Right farmstead lane
        new THREE.Vector3(18, 0.65, 2),
      ],
      true // Closed loop
    );
  }, []);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    const loopDuration = 38; // 38 seconds per complete farm tour
    const u = (t / loopDuration) % 1;

    // Current point on curve
    const currentPoint = curve.getPointAt(u);
    // Tangent direction for heading
    const tangent = curve.getTangentAt(u);
    const angleY = Math.atan2(tangent.x, tangent.z);

    // Look-ahead for steering angle
    const futureU = (u + 0.02) % 1;
    const futureTangent = curve.getTangentAt(futureU);
    const futureAngleY = Math.atan2(futureTangent.x, futureTangent.z);
    let steerAngle = (futureAngleY - angleY) * 2.5;
    steerAngle = Math.max(-0.45, Math.min(0.45, steerAngle));

    if (tractorGroupRef.current) {
      // Suspension bounce & rumble
      const bounce = Math.sin(t * 18) * 0.015;
      tractorGroupRef.current.position.set(currentPoint.x, currentPoint.y + bounce, currentPoint.z);
      tractorGroupRef.current.rotation.y = angleY;
      tractorGroupRef.current.rotation.x = Math.sin(t * 18) * 0.008;

      setTractorState({
        pos: currentPoint,
        rot: angleY,
      });
    }

    // Front steering turn
    if (frontWheelsGroup.current) {
      frontWheelsGroup.current.rotation.y = steerAngle;
    }

    // Wheel rotation speed based on linear velocity
    const wheelRot = delta * 3.8;
    if (frontLeftWheel.current) frontLeftWheel.current.rotation.x += wheelRot;
    if (frontRightWheel.current) frontRightWheel.current.rotation.x += wheelRot;
    if (rearLeftWheel.current) rearLeftWheel.current.rotation.x += wheelRot;
    if (rearRightWheel.current) rearRightWheel.current.rotation.x += wheelRot;

    // Exhaust puff animation
    if (exhaustPuffRef.current) {
      exhaustPuffRef.current.scale.setScalar(0.8 + Math.sin(t * 14) * 0.3);
      exhaustPuffRef.current.position.y = 2.4 + Math.sin(t * 9) * 0.15;
    }
  });

  return (
    <>
      <group
        ref={tractorGroupRef}
        position={[15, 0.55, 10]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() =>
          setSelectedHotspot({
            title: 'Autonomous Tractor #07',
            detail: 'Speed: 8.5 km/h • Precision GPS Active • Diesel Efficiency: 94%',
          })
        }
        className="cursor-pointer"
      >
        {/* Tractor Body Chassis (Emerald & Hunter Green) */}
        <mesh position={[0, 0.85, -0.5]} castShadow receiveShadow>
          <boxGeometry args={[1.7, 1.05, 2.5]} />
          <meshStandardMaterial color="#2d7335" roughness={0.35} metalness={0.25} />
        </mesh>

        {/* Hood Top Ridge Stripe */}
        <mesh position={[0, 1.4, -0.5]} castShadow>
          <boxGeometry args={[1.5, 0.1, 2.4]} />
          <meshStandardMaterial color="#1e4e24" />
        </mesh>

        {/* Front Engine Grille */}
        <mesh position={[0, 0.8, -1.78]} castShadow>
          <boxGeometry args={[1.45, 0.85, 0.1]} />
          <meshStandardMaterial color="#18181b" roughness={0.8} />
        </mesh>

        {/* Headlights & Illuminating Beam */}
        <group position={[0, 0.95, -1.8]}>
          <mesh position={[-0.55, 0, 0]}>
            <cylinderGeometry args={[0.18, 0.18, 0.08, 16]} rotation={[Math.PI / 2, 0, 0]} />
            <meshStandardMaterial color="#fffbeb" emissive="#ffea80" emissiveIntensity={2.0} />
          </mesh>
          <mesh position={[0.55, 0, 0]}>
            <cylinderGeometry args={[0.18, 0.18, 0.08, 16]} rotation={[Math.PI / 2, 0, 0]} />
            <meshStandardMaterial color="#fffbeb" emissive="#ffea80" emissiveIntensity={2.0} />
          </mesh>
          <spotLight
            position={[0, 0.2, 0]}
            target-position={[0, -1.2, -14]}
            color="#fff5cc"
            intensity={4.8}
            angle={0.65}
            penumbra={0.5}
            distance={22}
            castShadow
          />
        </group>

        {/* Driver Cabin */}
        <group position={[0, 1.75, 0.85]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[1.55, 1.3, 1.4]} />
            <meshStandardMaterial
              color="#38bdf8"
              roughness={0.1}
              metalness={0.4}
              transparent
              opacity={0.65}
            />
          </mesh>
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[1.6, 1.35, 1.45]} />
            <meshStandardMaterial color="#1f2937" wireframe wireframeLinewidth={2} />
          </mesh>
          <mesh position={[0, 0.72, 0]} castShadow>
            <boxGeometry args={[1.75, 0.18, 1.6]} />
            <meshStandardMaterial color="#2d7335" roughness={0.4} />
          </mesh>
          <mesh position={[0, 0.88, 0]}>
            <cylinderGeometry args={[0.1, 0.1, 0.16, 12]} />
            <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={1.5} />
          </mesh>
        </group>

        {/* High Exhaust Stack & Puff */}
        <mesh position={[0.7, 1.6, -1.0]} castShadow>
          <cylinderGeometry args={[0.07, 0.07, 1.3, 12]} />
          <meshStandardMaterial color="#0f172a" metalness={0.8} roughness={0.3} />
        </mesh>
        <mesh position={[0.7, 2.3, -0.95]} rotation={[0.4, 0, 0]}>
          <cylinderGeometry args={[0.07, 0.07, 0.3, 12]} />
          <meshStandardMaterial color="#0f172a" metalness={0.8} />
        </mesh>
        <mesh ref={exhaustPuffRef} position={[0.7, 2.45, -0.9]}>
          <sphereGeometry args={[0.12, 8, 8]} />
          <meshBasicMaterial color="#e2e8f0" transparent opacity={0.35} />
        </mesh>

        {/* Rear Tires with Deep Yellow Rims */}
        <group position={[-1.08, 0.55, 0.9]} ref={rearLeftWheel}>
          <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.88, 0.88, 0.52, 16]} />
            <meshStandardMaterial color="#1c1917" roughness={0.95} />
          </mesh>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.52, 0.52, 0.55, 10]} />
            <meshStandardMaterial color="#eab308" metalness={0.5} roughness={0.3} />
          </mesh>
        </group>

        <group position={[1.08, 0.55, 0.9]} ref={rearRightWheel}>
          <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.88, 0.88, 0.52, 16]} />
            <meshStandardMaterial color="#1c1917" roughness={0.95} />
          </mesh>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.52, 0.52, 0.55, 10]} />
            <meshStandardMaterial color="#eab308" metalness={0.5} roughness={0.3} />
          </mesh>
        </group>

        {/* Front Steering Assembly */}
        <group ref={frontWheelsGroup} position={[0, 0.25, -1.1]}>
          <group position={[-0.96, 0, 0]} ref={frontLeftWheel}>
            <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
              <cylinderGeometry args={[0.52, 0.52, 0.4, 16]} />
              <meshStandardMaterial color="#1c1917" roughness={0.95} />
            </mesh>
            <mesh rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.28, 0.28, 0.42, 8]} />
              <meshStandardMaterial color="#eab308" metalness={0.5} />
            </mesh>
          </group>

          <group position={[0.96, 0, 0]} ref={frontRightWheel}>
            <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
              <cylinderGeometry args={[0.52, 0.52, 0.4, 16]} />
              <meshStandardMaterial color="#1c1917" roughness={0.95} />
            </mesh>
            <mesh rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.28, 0.28, 0.42, 8]} />
              <meshStandardMaterial color="#eab308" metalness={0.5} />
            </mesh>
          </group>
        </group>

        {/* Interactive Hover Telemetry Beacon */}
        <Html position={[0, 3.2, 0]} center distanceFactor={25}>
          <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={() =>
              setSelectedHotspot({
                title: 'Autonomous Tractor #07',
                detail: 'Speed: 8.5 km/h • Active Cultivation Route • Tool Rental Hub',
              })
            }
            className="group relative cursor-pointer"
          >
            <div className="w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center text-stone-950 shadow-xl border border-white/50 animate-pulse">
              <TractorIcon className="w-3.5 h-3.5" />
            </div>
            {hovered && (
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-48 p-2 rounded-xl bg-forest-950/95 border border-amber-400/50 shadow-2xl backdrop-blur-xl text-left pointer-events-none">
                <span className="text-[10px] font-bold text-white block">Autonomous Tractor #07</span>
                <span className="text-[9px] text-amber-300 font-mono">Speed: 8.5 km/h • Field Route Active</span>
              </div>
            )}
          </div>
        </Html>
      </group>

      {/* Dynamic Dust Trail Particles Behind Moving Tractor */}
      <TractorDustTrail tractorPos={tractorState.pos} tractorRot={tractorState.rot} />
    </>
  );
};
