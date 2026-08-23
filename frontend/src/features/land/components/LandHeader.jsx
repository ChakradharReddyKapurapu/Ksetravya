import React from 'react';
import { useWorld } from '../../../context/WorldContext';
import { useLand } from '../../../context/LandContext';
import { useCart } from '../../../context/CartContext';
import { PerformanceToggle } from '../../../components/ui/PerformanceToggle';
import {
  ArrowLeft,
  Map,
  Box,
  ShoppingBag,
  PlusCircle,
  FileCheck,
  Calculator,
} from 'lucide-react';

export const LandHeader = () => {
  const {
    startTransitionToFarm,
    startTransitionToTools,
    startTransitionToSeeds,
    startTransitionToCropProtection,
    startTransitionToMarket,
    startTransitionToJobs,
    startTransitionToWeather,
    startTransitionToAnalytics,
  } = useWorld();

  const {
    activeRole,
    setActiveRole,
    setIsListLandModalOpen,
    setIsCalculatorModalOpen,
    myInquiries,
  } = useLand();

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
              <div className="relative flex items-center justify-center w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500 to-amber-600 shadow-md border border-amber-400/40">
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

            {/* Active Land Pill */}
            <span className="px-3 py-1 rounded-full text-[11px] font-display font-bold text-white bg-amber-600 border border-amber-400/60 shadow-md flex items-center gap-1">
              <span>🌍</span>
              <span>LAND / LEASE</span>
            </span>

            <button
              onClick={startTransitionToWeather}
              className="px-2.5 py-1 rounded-full text-[11px] font-display text-cream-200/70 hover:text-white cursor-pointer"
            >
              Weather
            </button>

            <button
              onClick={startTransitionToAnalytics}
              className="px-2.5 py-1 rounded-full text-[11px] font-display text-cream-200/70 hover:text-white cursor-pointer"
            >
              Analytics
            </button>
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2">
            {/* Calculator Trigger */}
            <button
              onClick={() => {
                const elem = document.getElementById('lease-calculator');
                if (elem) elem.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-3 py-1.5 rounded-full bg-forest-900/80 hover:bg-forest-800 border border-white/10 text-amber-300 text-xs font-display font-semibold flex items-center gap-1.5 cursor-pointer shadow-md"
            >
              <Calculator className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">ROI Calculator</span>
            </button>

            {/* List Farmland Button */}
            <button
              onClick={() => setIsListLandModalOpen(true)}
              className="px-3 py-1.5 rounded-full bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold font-display flex items-center gap-1.5 cursor-pointer shadow-md"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">+ List Land</span>
            </button>

            {/* Universal Cart Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 rounded-full bg-forest-900/70 hover:bg-forest-800 border border-white/10 text-amber-300 hover:text-amber-200 transition-colors cursor-pointer"
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
