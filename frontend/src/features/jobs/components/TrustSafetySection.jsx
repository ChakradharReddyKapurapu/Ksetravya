import React from 'react';
import { ShieldCheck, CheckCircle2, Lock, Star, Users, Award } from 'lucide-react';

export const TrustSafetySection = () => {
  const trustPoints = [
    {
      title: 'Verified Farmer & Worker Profiles',
      desc: 'Government ID & Land Title verification for farm owners and skilled operators.',
      icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />,
    },
    {
      title: 'Transparent Wage Standards',
      desc: 'No hidden cuts; daily or acre rates clearly defined prior to work commencement.',
      icon: <CheckCircle2 className="w-5 h-5 text-amber-400" />,
    },
    {
      title: 'Real-Time Application Tracking',
      desc: 'Instant notifications when your application is reviewed, accepted, or completed.',
      icon: <Users className="w-5 h-5 text-sky-400" />,
    },
    {
      title: 'Two-Way Rating & Reviews',
      desc: 'Mutual 5-star ratings ensure trust, timely payments, and high labor standards.',
      icon: <Star className="w-5 h-5 text-rose-400" />,
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-12">
      <div className="p-6 sm:p-8 rounded-3xl bg-forest-950/90 border border-white/10 backdrop-blur-2xl shadow-2xl">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono uppercase font-bold mb-2">
            <Lock className="w-3 h-3" />
            <span>Safety & Transparency Standards</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black font-display text-white">
            Work with Complete Confidence
          </h3>
          <p className="text-xs sm:text-sm text-cream-200/60 font-body mt-1">
            Built to protect both farmer yields and worker welfare across rural Andhra Pradesh
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {trustPoints.map((tp, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-forest-900/60 border border-white/5 flex flex-col justify-between"
            >
              <div>
                <div className="p-2.5 rounded-xl bg-white/10 w-fit mb-3">{tp.icon}</div>
                <h4 className="text-sm font-bold font-display text-white mb-1.5">{tp.title}</h4>
                <p className="text-xs text-cream-200/70 font-body leading-relaxed">{tp.desc}</p>
              </div>

              <span className="text-[9px] font-mono text-emerald-400/80 mt-4 block">
                ✓ Verified System Protocol
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
