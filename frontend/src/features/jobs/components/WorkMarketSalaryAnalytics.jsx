import React from 'react';
import { useJobs } from '../../../context/JobsContext';
import { DollarSign, TrendingUp, Info } from 'lucide-react';

export const WorkMarketSalaryAnalytics = () => {
  const { salaryBenchmarks } = useJobs();

  const maxVal = 1400;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-12">
      <div className="p-6 sm:p-8 rounded-3xl bg-forest-950/90 border border-white/10 backdrop-blur-2xl shadow-2xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-6 pb-4 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono uppercase font-bold mb-1">
              <DollarSign className="w-3 h-3" />
              <span>Wage Intelligence</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
              Agricultural Labor & Machine Operator Wage Index
            </h3>
          </div>
          <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-400/20">
            DEMO BENCHMARK DATA
          </span>
        </div>

        {/* Salary Comparative Bars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {salaryBenchmarks.map((item, idx) => {
            const minPercent = (item.min / maxVal) * 100;
            const avgPercent = (item.avg / maxVal) * 100;
            const maxPercent = (item.max / maxVal) * 100;

            return (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-forest-900/70 border border-white/5 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{item.icon}</span>
                    <h5 className="text-xs font-bold font-display text-white">{item.task}</h5>
                  </div>
                  <span className="text-xs font-mono font-bold text-emerald-400">
                    Avg ₹{item.avg} /day
                  </span>
                </div>

                {/* Range Bar */}
                <div className="relative w-full h-3 rounded-full bg-black/40 overflow-hidden">
                  {/* Min to Max Range background */}
                  <div
                    style={{
                      left: `${minPercent}%`,
                      width: `${maxPercent - minPercent}%`,
                    }}
                    className="absolute top-0 bottom-0 bg-emerald-500/40 rounded-full"
                  />
                  {/* Avg Pin */}
                  <div
                    style={{ left: `${avgPercent}%` }}
                    className="absolute top-0 bottom-0 w-2 bg-amber-400 rounded-full -translate-x-1"
                  />
                </div>

                {/* Range Labels */}
                <div className="flex justify-between text-[10px] font-mono text-cream-200/50">
                  <span>Min: ₹{item.min}</span>
                  <span className="text-amber-300 font-bold">Avg: ₹{item.avg}</span>
                  <span>Max: ₹{item.max}</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-4 pt-3 border-t border-white/5 flex items-center gap-2 text-[10px] font-mono text-cream-200/40">
          <Info className="w-3.5 h-3.5 flex-shrink-0 text-amber-400" />
          <span>Regional benchmark rates derived from Andhra Pradesh agricultural seasonal labor averages (Demo).</span>
        </div>
      </div>
    </section>
  );
};
