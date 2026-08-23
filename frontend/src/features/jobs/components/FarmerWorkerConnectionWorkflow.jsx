import React, { useState, useEffect } from 'react';
import {
  FilePlus,
  Cpu,
  UserCheck,
  CheckCircle2,
  Tractor,
  Award,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

export const FarmerWorkerConnectionWorkflow = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      num: '01',
      title: 'FARMER POSTS',
      desc: 'Requisitions labor, required skills, daily wage & dates',
      icon: <FilePlus className="w-5 h-5 text-amber-400" />,
    },
    {
      num: '02',
      title: 'AGRI NEXUS MATCHES',
      desc: 'Algorithm notifies verified local labor guilds & machine drivers',
      icon: <Cpu className="w-5 h-5 text-emerald-400" />,
    },
    {
      num: '03',
      title: 'WORKER APPLIES',
      desc: 'Workers & crews review food, stay, wage, and submit application',
      icon: <UserCheck className="w-5 h-5 text-sky-400" />,
    },
    {
      num: '04',
      title: 'FARMER ACCEPTS',
      desc: 'Farmer reviews rating, completed jobs, and confirms booking',
      icon: <CheckCircle2 className="w-5 h-5 text-teal-400" />,
    },
    {
      num: '05',
      title: 'WORK BEGINS',
      desc: 'Workers arrive at farm plot; harvest or planting commences',
      icon: <Tractor className="w-5 h-5 text-rose-400" />,
    },
    {
      num: '06',
      title: 'WORK COMPLETED',
      desc: 'Wages settled transparently; ratings & reviews recorded',
      icon: <Award className="w-5 h-5 text-amber-300" />,
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [steps.length]);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-12">
      <div className="p-6 sm:p-8 rounded-3xl bg-forest-950/90 border border-white/10 backdrop-blur-2xl shadow-2xl">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono uppercase font-bold mb-2">
            <Sparkles className="w-3 h-3" />
            <span>Seamless Farmer ↔ Worker Matchmaking</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black font-display text-white">
            How AGRI NEXUS Connects Farms with Workers
          </h2>
          <p className="text-xs sm:text-sm text-cream-200/60 font-body mt-1">
            An automated transparent pipeline from work requisition to on-field harvest completion
          </p>
        </div>

        {/* 6 Step Animated Progress Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
          {steps.map((step, idx) => {
            const isActive = activeStep === idx;

            return (
              <div
                key={step.num}
                onClick={() => setActiveStep(idx)}
                className={`p-4 rounded-2xl border transition-all duration-500 cursor-pointer flex flex-col justify-between ${
                  isActive
                    ? 'bg-emerald-500/20 border-emerald-400 shadow-lg shadow-emerald-950/50 scale-[1.03]'
                    : 'bg-forest-900/60 border-white/5 text-cream-200/70 hover:border-white/20'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="p-2 rounded-xl bg-white/10">{step.icon}</span>
                    <span className="text-[10px] font-mono font-bold text-amber-400">
                      {step.num}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold font-display text-white mb-1">
                    {step.title}
                  </h4>
                  <p className="text-[10px] text-cream-200/60 font-body leading-snug">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-4 pt-2 border-t border-white/5 flex items-center justify-between">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isActive ? 'bg-emerald-400 animate-ping' : 'bg-white/20'
                    }`}
                  />
                  <span className="text-[9px] font-mono text-cream-200/40">Step {idx + 1} of 6</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
