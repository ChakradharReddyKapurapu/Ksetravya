import React from 'react';
import { Html } from '@react-three/drei';
import { Store, ShoppingBag } from 'lucide-react';

export const Zone10MarketEntrance = () => {
  return (
    <group position={[0, 0, -92]}>
      {/* Paved Market Plaza Floor */}
      <mesh position={[0, 0.05, 0]} receiveShadow>
        <boxGeometry args={[36, 0.1, 18]} />
        <meshStandardMaterial color="#1e293b" roughness={0.7} />
      </mesh>

      {/* Grand Marketplace Wooden / Steel Archway */}
      <group position={[0, 0, 0]}>
        {/* Left Pillar */}
        <mesh position={[-5.5, 3.5, 0]} castShadow>
          <cylinderGeometry args={[0.4, 0.45, 7.0, 8]} />
          <meshStandardMaterial color="#78350f" />
        </mesh>
        {/* Right Pillar */}
        <mesh position={[5.5, 3.5, 0]} castShadow>
          <cylinderGeometry args={[0.4, 0.45, 7.0, 8]} />
          <meshStandardMaterial color="#78350f" />
        </mesh>
        {/* Archway Signboard */}
        <mesh position={[0, 6.6, 0]} castShadow>
          <boxGeometry args={[12.5, 1.4, 0.4]} />
          <meshStandardMaterial color="#b91c1c" />
        </mesh>
        {/* Glowing Gold Lettering Plate */}
        <mesh position={[0, 6.6, 0.22]}>
          <boxGeometry args={[11.5, 1.0, 0.05]} />
          <meshStandardMaterial color="#fef08a" emissive="#ca8a04" emissiveIntensity={0.8} />
        </mesh>
      </group>

      {/* Floating Marketplace Beacon */}
      <Html position={[0, 8.2, 0]} center distanceFactor={28}>
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-forest-950/95 border border-amber-400/60 text-amber-300 shadow-2xl backdrop-blur-xl animate-bounce">
          <Store className="w-4 h-4 text-amber-400" />
          <span className="text-xs font-bold font-display">10 AGRI MACHINERY MARKETPLACE</span>
        </div>
      </Html>
    </group>
  );
};
