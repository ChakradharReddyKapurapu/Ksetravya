import React, { useState } from 'react';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { WeatherWidget } from '../../components/ui/WeatherWidget';
import { ArrowRight, Play, Sprout, TrendingUp } from 'lucide-react';
import { usePerformance } from '../../context/PerformanceContext';
import { useWorld } from '../../context/WorldContext';

export const HeroContent = ({ onExploreClick }) => {
  const { setActiveTour } = usePerformance();
  const { startTransitionToMarket } = useWorld();
  const [isPlayingTour, setIsPlayingTour] = useState(false);

  const startWorldExperience = () => {
    setIsPlayingTour(true);
    const tourSequence = ['fields', 'river', 'machinery', 'solar', 'panorama'];
    let idx = 0;
    const interval = setInterval(() => {
      setActiveTour(tourSequence[idx]);
      idx++;
      if (idx >= tourSequence.length) {
        clearInterval(interval);
        setIsPlayingTour(false);
      }
    }, 3800);
  };

  return (
    <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12 lg:pt-10 lg:pb-16 pointer-events-none">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 lg:gap-12">
        {/* Left Hero Column */}
        <div className="max-w-2xl flex flex-col items-start pointer-events-auto">
          {/* Top Pill Badge matching reference */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.2 rounded-full bg-forest-900/80 backdrop-blur-md border border-emerald-500/30 text-emerald-300 text-xs font-mono mb-5 shadow-lg">
            <span>🌱</span>
            <span className="font-semibold tracking-wide">KṢETRAVYA — A Connected Digital Ecosystem for Agriculture</span>
            <span>🌱</span>
          </div>

          {/* Master Headline matching reference */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold font-display tracking-tight text-white leading-[1.08] mb-5">
            KṢETRAVYA <br />
            <span className="text-emerald-400 inline-flex items-center gap-2 text-2xl sm:text-4xl lg:text-5xl font-light">Connected Ecosystem <Sprout className="w-8 h-8 sm:w-12 sm:h-12 inline-block text-emerald-400" /></span>
          </h1>

          {/* Description */}
          <p className="text-sm sm:text-base text-cream-200/85 leading-relaxed max-w-xl mb-8 font-body">
            “Where land, people, knowledge, technology and commerce come together to shape better agricultural decisions.”
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <Button
              variant="primary"
              size="lg"
              icon={ArrowRight}
              iconPosition="right"
              onClick={startTransitionToMarket}
              className="shadow-2xl shadow-emerald-900/60"
            >
              Explore Kṣetravya
            </Button>

            <button
              onClick={startWorldExperience}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-forest-950/70 hover:bg-forest-900/90 text-white border border-white/15 hover:border-emerald-400/50 backdrop-blur-xl text-sm font-display font-semibold transition-all duration-300 shadow-xl group cursor-pointer"
            >
              <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-stone-950 transition-colors">
                <Play className="w-3 h-3 fill-current ml-0.5" />
              </div>
              <span>{isPlayingTour ? 'Touring Ecosystem...' : 'Join the Ecosystem'}</span>
            </button>
          </div>
        </div>

        {/* Right Hero Column: Live Weather Glass Widget */}
        <div className="pointer-events-auto w-full lg:w-auto flex justify-start lg:justify-end">
          <WeatherWidget />
        </div>
      </div>
    </div>
  );
};
