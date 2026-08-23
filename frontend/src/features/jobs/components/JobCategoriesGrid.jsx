import React from 'react';
import { useJobs } from '../../../context/JobsContext';
import { Sparkles, ArrowRight } from 'lucide-react';

export const JobCategoriesGrid = () => {
  const { activeCategory, setActiveCategory, allCategories, allJobs } = useJobs();

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-8">
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider block">
            12 SPECIALIZED DOMAINS
          </span>
          <h3 className="text-xl font-bold font-display text-white">
            Explore Agricultural Job Categories
          </h3>
        </div>
        <span className="text-xs font-mono text-cream-200/50 hidden sm:inline">
          Filter by task type & skill domain
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {allCategories.map((cat) => {
          const isSelected = activeCategory === cat.id;
          const count =
            cat.id === 'all'
              ? allJobs.length
              : allJobs.filter((j) => j.category === cat.id).length;

          return (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                const elem = document.getElementById('jobs-board');
                if (elem) elem.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`p-4 rounded-3xl border text-left transition-all duration-300 cursor-pointer flex flex-col justify-between group ${
                isSelected
                  ? 'bg-emerald-500/20 border-emerald-400 shadow-xl shadow-emerald-950/40 scale-[1.02]'
                  : 'bg-forest-950/85 hover:bg-forest-900 border-white/10 text-cream-100 hover:border-emerald-400/30'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-3xl group-hover:scale-110 transition-transform">
                    {cat.icon}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-white/5 text-[10px] font-mono text-emerald-400 font-bold">
                    {count} {count === 1 ? 'Job' : 'Jobs'}
                  </span>
                </div>
                <h4 className="text-sm font-bold font-display text-white group-hover:text-emerald-300 transition-colors">
                  {cat.label}
                </h4>
                <p className="text-[11px] text-cream-200/60 font-body leading-snug line-clamp-2 mt-1">
                  {cat.desc}
                </p>
              </div>

              <div className="flex items-center gap-1 text-[10px] font-mono text-emerald-400 mt-3 pt-2 border-t border-white/5">
                <span>View Openings</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};
