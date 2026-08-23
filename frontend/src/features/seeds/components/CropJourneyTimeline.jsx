import React from 'react';
import { useSeeds } from '../../../context/SeedsContext';
import { useWorld } from '../../../context/WorldContext';
import { ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';

export const CropJourneyTimeline = () => {
  const { activeCrop, allCrops } = useSeeds();
  const { startTransitionToCropProtection } = useWorld();

  const currentCropObj = allCrops.find((c) => c.id === activeCrop) || allCrops[0];

  const journeySteps = [
    { id: 'seed', label: 'Seed', icon: '🌱', desc: 'Certified seed selection & treatment' },
    { id: 'soil', label: 'Soil', icon: '🌍', desc: 'Tillage, beds & moisture readiness' },
    { id: 'germination', label: 'Germination', icon: '✨', desc: 'Radicle sprout & emergence' },
    { id: 'growth', label: 'Growth', icon: '🌿', desc: 'Vegetative tillering & canopy' },
    { id: 'crop_care', label: 'Crop Care', icon: '💧', desc: 'Nutrient & micro-irrigation' },
    { id: 'protection', label: 'Protection', icon: '🛡️', desc: 'Pest, blast & weed defense' },
    { id: 'harvest', label: 'Harvest', icon: '🌾', desc: 'Yield threshing & mandi transport' },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-8">
      <div className="p-6 sm:p-8 rounded-3xl bg-forest-950/90 border border-white/15 backdrop-blur-2xl shadow-2xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6 pb-4 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xl">{currentCropObj.icon}</span>
              <h3 className="text-xl font-bold font-display text-white">
                Explore the {currentCropObj.name} Crop Journey
              </h3>
            </div>
            <p className="text-xs text-cream-200/70 font-mono">
              Duration: {currentCropObj.duration} • Season: {currentCropObj.season}
            </p>
          </div>

          {/* Seeds -> Crop Protection Bridge Button */}
          <button
            onClick={() => startTransitionToCropProtection(activeCrop)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-teal-500 hover:bg-teal-400 text-stone-950 font-bold font-display text-xs transition-all shadow-xl hover:scale-105 cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Continue to Crop Protection for {currentCropObj.name.split(' ')[0]}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 7-Stage Horizontal Stepper */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {journeySteps.map((step, idx) => {
            const isCompleted = idx < 3;
            const isCurrent = idx === 0;

            return (
              <div
                key={step.id}
                className={`p-3.5 rounded-2xl border transition-all text-left ${
                  isCurrent
                    ? 'bg-emerald-500/20 border-emerald-400/60 shadow-lg'
                    : isCompleted
                    ? 'bg-forest-900/60 border-emerald-500/30'
                    : 'bg-white/5 border-white/5 opacity-80'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-lg">{step.icon}</span>
                  <span className="text-[9px] font-mono text-emerald-400 font-bold">
                    0{idx + 1}
                  </span>
                </div>
                <h4 className="text-xs font-bold font-display text-white mb-0.5">
                  {step.label}
                </h4>
                <p className="text-[10px] text-cream-200/60 font-body leading-snug">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
