import React from 'react';
import { useCropProtection } from '../../../context/CropProtectionContext';
import { ShieldAlert, AlertTriangle, CheckCircle, HelpCircle } from 'lucide-react';

export const ProblemDiscoveryWizard = () => {
  const { activeProblem, setActiveProblem, allProblems } = useCropProtection();

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-8">
      <div className="p-6 sm:p-8 rounded-3xl bg-forest-950/90 border border-white/15 backdrop-blur-2xl shadow-2xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-6 pb-4 border-b border-white/10">
          <div>
            <span className="text-[10px] font-mono text-teal-400 uppercase tracking-widest block">
              Field Diagnostics Assistant
            </span>
            <h3 className="text-xl font-bold font-display text-white mt-0.5">
              What are you observing in your field?
            </h3>
          </div>
          <span className="text-xs text-cream-200/60 font-mono">
            Filter by observed field symptoms
          </span>
        </div>

        {/* Problem Symptom Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {allProblems.map((prob) => {
            const isSelected = activeProblem === prob.id;

            return (
              <button
                key={prob.id}
                onClick={() => setActiveProblem(isSelected ? 'all' : prob.id)}
                className={`p-4 rounded-2xl border text-left transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-teal-500/20 border-teal-400/80 shadow-lg shadow-teal-950/80 scale-[1.02]'
                    : 'bg-white/5 hover:bg-white/10 border-white/5 text-cream-200/80 hover:text-white'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">{prob.icon}</span>
                    {isSelected && <CheckCircle className="w-4 h-4 text-teal-400" />}
                  </div>
                  <h4 className="text-xs font-bold font-display text-white mb-1">
                    {prob.label}
                  </h4>
                  <p className="text-[10px] text-cream-200/60 font-body leading-snug">
                    {prob.desc}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Responsible Guidance Banner when 'Unknown Problem' is selected */}
        {activeProblem === 'unknown' && (
          <div className="mt-6 p-4 rounded-2xl bg-amber-500/10 border border-amber-400/40 text-amber-300 flex items-start gap-3 animate-in fade-in duration-200">
            <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <div className="space-y-1 text-xs">
              <h5 className="font-bold font-display">Responsible Agricultural Notice:</h5>
              <p className="text-[11px] font-body text-cream-200/90 leading-relaxed">
                Problem identification requires physical leaf verification from a qualified agricultural extension officer, Krishi Vigyan Kendra (KVK) scientist, or certified diagnostic center. Do not apply chemical pesticides without verified symptom diagnosis.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
