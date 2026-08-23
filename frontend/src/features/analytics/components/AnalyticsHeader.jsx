import React from 'react';
import { useWorld } from '../../../context/WorldContext';
import { useAnalytics } from '../../../context/AnalyticsContext';
import { useCart } from '../../../context/CartContext';
import { PerformanceToggle } from '../../../components/ui/PerformanceToggle';
import {
  ArrowLeft,
  Box,
  ShoppingBag,
  RotateCcw,
  BarChart3,
  Sparkles,
} from 'lucide-react';

export const AnalyticsHeader = () => {
  const {
    startTransitionToFarm,
    startTransitionToTools,
    startTransitionToSeeds,
    startTransitionToCropProtection,
    startTransitionToMarket,
    startTransitionToJobs,
    startTransitionToLand,
    startTransitionToWeather,
  } = useWorld();

  const { resetToBenchmarks, selectedCropMeta } = useAnalytics();
  const { cartCount, setIsCartOpen } = useCart();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-forest-950/90 backdrop-blur-2xl border-b border-white/10 py-2.5 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3">
          {/* Brand Logo & Back to Farm */}
          <div className="flex items-center gap-3">
            <button
              onClick={startTransitionToFarm}
              className="flex items-center gap-2 group cursor-pointer text-left"
            >
              <div className="relative flex items-center justify-center w-8 h-8 rounded-xl bg-gradient-to-br from-purple-500 to-emerald-600 shadow-md border border-purple-400/40">
                <Box className="w-4 h-4 text-white" />
              </div>
              <div className="flex items-center gap-1">
                <span className="font-display font-black text-sm tracking-wider text-white">AGRI</span>
                <span className="font-display font-light text-sm tracking-widest text-emerald-400">NEXUS</span>
              </div>
            </button>

            {/* Back to Farm Pill */}
            <button
              onClick={startTransitionToFarm}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-xs font-display font-semibold transition-all cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Farm</span>
            </button>
          </div>

          {/* Nav Links Matching Global Navbar */}
          <nav className="hidden xl:flex items-center gap-1 px-2.5 py-1 rounded-full bg-forest-900/70 backdrop-blur-md border border-white/10">
            <button
              onClick={startTransitionToFarm}
              className="px-2.5 py-1 rounded-full text-[11px] font-display text-cream-200/70 hover:text-white cursor-pointer"
            >
              Home
            </button>

            <button
              onClick={startTransitionToTools}
              className="px-2.5 py-1 rounded-full text-[11px] font-display text-cream-200/70 hover:text-white cursor-pointer"
            >
              Tools
            </button>

            <button
              onClick={startTransitionToSeeds}
              className="px-2.5 py-1 rounded-full text-[11px] font-display text-cream-200/70 hover:text-white cursor-pointer"
            >
              Seeds
            </button>

            <button
              onClick={startTransitionToCropProtection}
              className="px-2.5 py-1 rounded-full text-[11px] font-display text-cream-200/70 hover:text-white cursor-pointer"
            >
              Crop Protection
            </button>

            <button
              onClick={startTransitionToMarket}
              className="px-2.5 py-1 rounded-full text-[11px] font-display text-cream-200/70 hover:text-white cursor-pointer"
            >
              Marketplace
            </button>

            <button
              onClick={startTransitionToJobs}
              className="px-2.5 py-1 rounded-full text-[11px] font-display text-cream-200/70 hover:text-white cursor-pointer"
            >
              Jobs
            </button>

            <button
              onClick={startTransitionToLand}
              className="px-2.5 py-1 rounded-full text-[11px] font-display text-cream-200/70 hover:text-white cursor-pointer"
            >
              Land Lease
            </button>

            <button
              onClick={startTransitionToWeather}
              className="px-2.5 py-1 rounded-full text-[11px] font-display text-cream-200/70 hover:text-white cursor-pointer"
            >
              Weather
            </button>

            {/* Active Analytics Pill */}
            <span className="px-3 py-1 rounded-full text-[11px] font-display font-bold text-white bg-purple-600 border border-purple-400/60 shadow-md flex items-center gap-1">
              <span>📊</span>
              <span>ANALYTICS / AI INTEL</span>
            </span>
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2">
            {/* Reset Benchmarks Button */}
            <button
              onClick={resetToBenchmarks}
              className="px-3 py-1.5 rounded-full bg-forest-900/80 hover:bg-forest-800 border border-purple-400/30 text-purple-300 text-xs font-display font-semibold flex items-center gap-1.5 cursor-pointer shadow-md"
              title="Reset Costs to Agronomy Benchmarks"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset Benchmarks</span>
            </button>

            {/* Universal Cart Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 rounded-full bg-forest-900/70 hover:bg-forest-800 border border-white/10 text-purple-300 hover:text-purple-200 transition-colors cursor-pointer"
              title="View Cart"
            >
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 text-stone-950 font-bold text-[9px] flex items-center justify-center animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>

            <PerformanceToggle />
          </div>
        </div>
      </div>
    </header>
  );
};
