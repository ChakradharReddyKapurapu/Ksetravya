import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { SoilGermination3D } from '../../../three/seeds/environments/SoilGermination3D';
import { Layers, Sparkles, CheckCircle2 } from 'lucide-react';

export const SoilGerminationInteractive = () => {
  const [selectedLayer, setSelectedLayer] = useState('radicle');

  const layersInfo = {
    seed_coat: {
      title: 'Seed Coat (Testa)',
      desc: 'Protective outer layer shielding the embryo from mechanical injury, pathogen entry, and premature drying before soil contact.',
      metric: 'Imbibition: Absorbs 50% water weight within 12h',
    },
    radicle: {
      title: 'Radicle Root Penetration',
      desc: 'The primary embryonic root that breaks through the seed coat first, growing geotropically downward to anchor the seedling and absorb mineral moisture.',
      metric: 'Anchorage Depth: 2.5–5.0 cm within 72h',
    },
    cotyledon: {
      title: 'Cotyledon Sprout & Photosynthesis',
      desc: 'The embryonic leaves that contain stored starch reserves and emerge above the soil line to initiate first solar photosynthesis.',
      metric: 'Emergence: Day 4–6 under optimal moisture',
    },
    rhizosphere: {
      title: 'Rhizosphere Microbiology',
      desc: 'Active biological zone around emerging roots teeming with mycorrhiza and nitrogen-fixing beneficial microorganisms.',
      metric: 'Bio-Activity: Boosts root surface area by 300%',
    },
  };

  const activeData = layersInfo[selectedLayer];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center p-6 sm:p-8 rounded-3xl bg-forest-950/90 border border-white/15 backdrop-blur-2xl shadow-2xl">
        {/* Left Interactive 3D Cross-Section Viewer */}
        <div className="lg:col-span-7 h-80 rounded-2xl bg-[#08150d] border border-white/10 overflow-hidden relative shadow-inner">
          <Canvas
            camera={{ position: [0, 0.8, 6.5], fov: 42 }}
            gl={{ alpha: true, antialias: true }}
            className="w-full h-full cursor-grab"
          >
            <ambientLight intensity={1.2} />
            <directionalLight position={[10, 15, 10]} intensity={2.5} color="#fef08a" />
            <SoilGermination3D />
          </Canvas>

          <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-forest-950/80 border border-emerald-400/30 text-[10px] font-mono text-emerald-300 backdrop-blur-md flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Interactive 3D Soil Cutaway</span>
          </div>
        </div>

        {/* Right Explanatory Navigation Tabs */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
          <div>
            <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest block mb-1">
              Agronomic Science
            </span>
            <h3 className="text-2xl font-bold font-display text-white mb-2">
              Soil & Germination Dynamics
            </h3>
            <p className="text-xs text-cream-200/70 font-body mb-4">
              Explore the physiological stages of certified seed activation under balanced Andhra soil conditions.
            </p>
          </div>

          {/* Interactive Layer Pills */}
          <div className="grid grid-cols-2 gap-2">
            {[
              { id: 'seed_coat', label: 'Seed Coat', icon: '🌰' },
              { id: 'radicle', label: 'Radicle Root', icon: '🌱' },
              { id: 'cotyledon', label: 'Cotyledon Sprout', icon: '✨' },
              { id: 'rhizosphere', label: 'Rhizosphere', icon: '🌍' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedLayer(item.id)}
                className={`p-2.5 rounded-xl border text-xs font-display flex items-center gap-2 transition-all cursor-pointer ${
                  selectedLayer === item.id
                    ? 'bg-emerald-500 text-stone-950 font-bold border-emerald-300 shadow-md'
                    : 'bg-white/5 hover:bg-white/10 text-cream-200/80 border-white/5'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          {/* Active Layer Details Card */}
          <div className="p-4 rounded-2xl bg-forest-900/80 border border-emerald-500/30 text-left space-y-2">
            <h4 className="text-sm font-bold font-display text-emerald-300">{activeData.title}</h4>
            <p className="text-xs text-cream-200/80 font-body leading-relaxed">{activeData.desc}</p>
            <div className="pt-2 border-t border-white/10 flex items-center gap-1.5 text-[11px] font-mono text-amber-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
              <span>{activeData.metric}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
