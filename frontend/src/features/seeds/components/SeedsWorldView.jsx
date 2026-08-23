import React, { useState } from 'react';
import { useWorld } from '../../../context/WorldContext';
import { Navbar } from '../../../components/layout/Navbar';
import { MobileMenu } from '../../../components/layout/MobileMenu';
import { SeedsHero } from './SeedsHero';
import { CropJourneyTimeline } from './CropJourneyTimeline';
import { SoilGerminationInteractive } from './SoilGerminationInteractive';
import { SeedMarketplaceGrid } from './SeedMarketplaceGrid';
import { SeedDetailModal } from './SeedDetailModal';
import { SeedComparisonModal } from './SeedComparisonModal';
import { SeedsWorldCanvas } from '../../../three/seeds/SeedsWorldCanvas';
import { CartDrawer } from '../../../components/cart/CartDrawer';
import { Sprout } from 'lucide-react';

export const SeedsWorldView = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { currentWorld } = useWorld();

  const isTransitioning =
    currentWorld === 'transition_to_seeds' || currentWorld === 'transition_to_farm';

  return (
    <div className="relative min-h-screen bg-[#07130b] text-cream-100 selection:bg-emerald-500/30 selection:text-white">
      {/* Top Navbar */}
      <Navbar onOpenMobileMenu={() => setMobileMenuOpen(true)} />

      {/* Mobile Drawer */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      {/* Transition Cinematic Overlay */}
      {isTransitioning && (
        <div className="fixed inset-0 z-50 pointer-events-none flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm transition-all duration-300">
          <div className="p-6 rounded-3xl bg-forest-950/90 border border-emerald-400/50 shadow-2xl flex flex-col items-center text-center max-w-sm">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300 mb-3 animate-spin">
              <Sprout className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold font-display text-white">
              Entering Living Seeds World...
            </h3>
            <p className="text-xs text-emerald-300/80 font-mono mt-1">
              Connecting to High-Yield Seed Discovery Ecosystem
            </p>
          </div>
        </div>
      )}

      {/* Fixed 3D Living Crop Canvas */}
      <div className="fixed inset-0 z-0 pointer-events-auto">
        <SeedsWorldCanvas />
        <div className="absolute inset-0 bg-gradient-to-b from-[#07130b]/20 via-[#07130b]/40 to-[#07130b]/85 pointer-events-none" />
      </div>

      {/* Scrollable Page Content Layers */}
      <div className="relative z-10 pt-20 pb-20">
        {/* Section 1: Hero & Crop Switcher */}
        <SeedsHero />

        {/* Section 2: 7-Stage Crop Journey Timeline */}
        <CropJourneyTimeline />

        {/* Section 3: Interactive Soil Germination Cutaway */}
        <SoilGerminationInteractive />

        {/* Section 4: Seed Marketplace Catalog Grid */}
        <SeedMarketplaceGrid />
      </div>

      {/* Modals & Cart Drawer */}
      <SeedDetailModal />
      <SeedComparisonModal />
      <CartDrawer />

      {/* Agricultural Footer */}
      <footer className="relative z-20 border-t border-white/10 bg-forest-950/95 backdrop-blur-xl py-12 px-4 text-xs text-cream-200/60 font-mono">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-white font-display font-semibold">
            <Sprout className="w-4 h-4 text-emerald-400" />
            <span>AGRI NEXUS</span>
            <span className="text-emerald-400 text-[10px]">SEEDS WORLD V1.0</span>
          </div>
          <p>
            Certified Seeds & Hybrid Varietal Directory • Demo Agronomic Data
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-[10px] text-emerald-400 hover:underline cursor-pointer"
          >
            Back to Top ↑
          </button>
        </div>
      </footer>
    </div>
  );
};
