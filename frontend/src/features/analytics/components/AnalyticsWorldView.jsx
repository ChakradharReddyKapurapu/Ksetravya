import React from 'react';
import { useWorld } from '../../../context/WorldContext';
import { useAnalytics } from '../../../context/AnalyticsContext';
import { AnalyticsHeader } from './AnalyticsHeader';
import { AnalyticsHero } from './AnalyticsHero';
import { InvestmentCalculatorSection } from './InvestmentCalculatorSection';
import { RevenueProfitSection } from './RevenueProfitSection';
import { BreakEvenSection } from './BreakEvenSection';
import { PriceSimulationSection } from './PriceSimulationSection';
import { ScenarioSimulatorSection } from './ScenarioSimulatorSection';
import { CropComparisonSection } from './CropComparisonSection';
import { MarketTimingSection } from './MarketTimingSection';
import { ExecutiveDecisionSection } from './ExecutiveDecisionSection';
import { CartDrawer } from '../../../components/cart/CartDrawer';
import { AnalyticsWorldCanvas } from '../../../three/analytics/AnalyticsWorldCanvas';
import { BarChart3, Navigation, Sparkles } from 'lucide-react';

export const AnalyticsWorldView = () => {
  const { currentWorld } = useWorld();
  const { travelHUDMessage } = useAnalytics();

  const isTransitioning =
    currentWorld === 'transition_to_analytics' || currentWorld === 'transition_to_farm';

  return (
    <div className="relative min-h-screen bg-[#090b14] text-cream-100 selection:bg-purple-500/30 selection:text-white">
      {/* Top Fixed Header */}
      <AnalyticsHeader />

      {/* Travel HUD Toast */}
      {travelHUDMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-top-4 duration-300 pointer-events-auto">
          <div className="flex items-center gap-2 px-5 py-2 rounded-full bg-purple-500 text-stone-950 font-display font-bold text-xs shadow-2xl border border-purple-300">
            <Navigation className="w-4 h-4 animate-spin text-stone-950" />
            <span>{travelHUDMessage}</span>
          </div>
        </div>
      )}

      {/* Cinematic Transition Overlay */}
      {isTransitioning && (
        <div className="fixed inset-0 z-50 pointer-events-none flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm transition-all duration-300">
          <div className="p-6 rounded-3xl bg-forest-950/95 border border-purple-400/50 shadow-2xl flex flex-col items-center text-center max-w-sm">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/20 border border-purple-400/40 flex items-center justify-center text-purple-300 mb-3 animate-spin">
              <BarChart3 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold font-display text-white">
              {currentWorld === 'transition_to_analytics'
                ? 'Initializing Agricultural Intelligence Center...'
                : 'Returning to Farm...'}
            </h3>
            <p className="text-xs text-purple-300/80 font-mono mt-1">
              Synchronizing APMC price trends & agronomy cost algorithms
            </p>
          </div>
        </div>
      )}

      {/* 3D Fixed Viewport Background */}
      <div className="fixed inset-0 z-0 pointer-events-auto">
        <AnalyticsWorldCanvas />
        <div className="absolute inset-0 bg-gradient-to-b from-[#090b14]/20 via-[#090b14]/50 to-[#090b14]/90 pointer-events-none" />
      </div>

      {/* Scrollable Content Story Layers */}
      <div className="relative z-10 pt-16 pb-20">
        {/* Section 1: Hero Command Center */}
        <AnalyticsHero />

        {/* Section 2: Farm Investment & Production Cost Calculator */}
        <InvestmentCalculatorSection />

        {/* Section 3: Revenue & Net Profitability Forecaster */}
        <RevenueProfitSection />

        {/* Section 4: Break-Even Price & Yield Safety Margins */}
        <BreakEvenSection />

        {/* Section 5: "What If I Sell At..." Price Curve Simulation */}
        <PriceSimulationSection />

        {/* Section 6: "What-If?" Sensitivity Simulator */}
        <ScenarioSimulatorSection />

        {/* Section 7: Multi-Crop Profitability Matrix */}
        <CropComparisonSection />

        {/* Section 8: Market Timing & Historical Price Trends */}
        <MarketTimingSection />

        {/* Section 9: Final Farm Decision Summary & Risk Card */}
        <ExecutiveDecisionSection />
      </div>

      {/* Modals & Cart Drawer */}
      <CartDrawer />

      {/* Footer */}
      <footer className="relative z-20 border-t border-white/10 bg-forest-950/95 backdrop-blur-xl py-12 px-4 text-xs text-cream-200/60 font-mono">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-white font-display font-semibold">
            <BarChart3 className="w-4 h-4 text-purple-400" />
            <span>AGRI NEXUS</span>
            <span className="text-purple-400 text-[10px]">AGRICULTURAL INTELLIGENCE & ANALYTICS</span>
          </div>
          <p>
            Mandi pricing integrated with APMC market database. Calculations are indicative agricultural guidelines.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-[10px] text-purple-400 hover:underline cursor-pointer"
          >
            Back to Top ↑
          </button>
        </div>
      </footer>
    </div>
  );
};
