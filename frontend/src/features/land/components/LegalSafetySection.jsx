import React from 'react';
import { ShieldCheck, FileCheck, Lock, Award, CheckCircle2 } from 'lucide-react';

export const LegalSafetySection = () => {
  const points = [
    {
      title: '1-B Revenue Title Deed Verification',
      desc: 'Every listed parcel is cross-checked against AP Meebhoomi revenue records to guarantee undisputed ownership.',
      icon: <FileCheck className="w-5 h-5 text-emerald-400" />,
    },
    {
      title: 'Digital Tripartite Lease Agreements',
      desc: 'Standardized legally vetted agricultural tenancy templates protecting crop investments and rent schedules.',
      icon: <ShieldCheck className="w-5 h-5 text-amber-400" />,
    },
    {
      title: 'Boundary Demarcation & Survey Maps',
      desc: 'Physical boundary stones and survey sub-division coordinates clearly documented prior to token deposit.',
      icon: <CheckCircle2 className="w-5 h-5 text-sky-400" />,
    },
    {
      title: 'Water Rights & Power Sanction Vetting',
      desc: 'Canal roster rights and agricultural free power meter connections verified with AP Discoms & Irrigation Dept.',
      icon: <Lock className="w-5 h-5 text-teal-400" />,
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-12">
      <div className="p-6 sm:p-8 rounded-3xl bg-forest-950/90 border border-white/10 backdrop-blur-2xl shadow-2xl">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono uppercase font-bold mb-2">
            <ShieldCheck className="w-3 h-3" />
            <span>Legal Due Diligence Guarantee</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black font-display text-white">
            Lease Farmland with Complete Peace of Mind
          </h3>
          <p className="text-xs sm:text-sm text-cream-200/60 font-body mt-1">
            Built to eliminate tenancy disputes and empower cultivators with secure agricultural properties
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {points.map((pt, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-forest-900/60 border border-white/5 flex flex-col justify-between"
            >
              <div>
                <div className="p-2.5 rounded-xl bg-white/10 w-fit mb-3">{pt.icon}</div>
                <h4 className="text-sm font-bold font-display text-white mb-1.5">{pt.title}</h4>
                <p className="text-xs text-cream-200/70 font-body leading-relaxed">{pt.desc}</p>
              </div>

              <span className="text-[9px] font-mono text-emerald-400/80 mt-4 block">
                ✓ 100% Verified Legal Standard
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
