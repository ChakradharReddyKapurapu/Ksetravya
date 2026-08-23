import React, { useState } from 'react';
import { useWorld } from '../../../context/WorldContext';
import { Navbar } from '../../../components/layout/Navbar';
import { MobileMenu } from '../../../components/layout/MobileMenu';
import { CropProtectionHero } from './CropProtectionHero';
import { ProblemDiscoveryWizard } from './ProblemDiscoveryWizard';
import { CropProtectionGrid } from './CropProtectionGrid';
import { CropProtectionDetailModal } from './CropProtectionDetailModal';
import { CropProtectionWorldCanvas } from '../../../three/crop_protection/CropProtectionWorldCanvas';
import { CartDrawer } from '../../../components/cart/CartDrawer';
import { ShieldCheck } from 'lucide-react';

export const CropProtectionWorldView = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { currentWorld } = useWorld();

  const isTransitioning =
    currentWorld === 'transition_to_crop_protection' || currentWorld === 'transition_to_farm';

  return (
    <div className="relative min-h-screen bg-[#06140e] text-cream-100 selection:bg-teal-500/30 selection:text-white">
      {/* Top Navbar */}
      <Navbar onOpenMobileMenu={() => setMobileMenuOpen(true)} />

      {/* Mobile Drawer */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      {/* Transition Cinematic Overlay */}
      {isTransitioning && (
        <div className="fixed inset-0 z-50 pointer-events-none flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm transition-all duration-300">
          <div className="p-6 rounded-3xl bg-forest-950/90 border border-teal-400/50 shadow-2xl flex flex-col items-center text-center max-w-sm">
            <div className="w-12 h-12 rounded-2xl bg-teal-500/20 border border-teal-400/40 flex items-center justify-center text-teal-300 mb-3 animate-spin">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold font-display text-white">
              Calibrating Smart Crop Protection World...
            </h3>
            <p className="text-xs text-teal-300/80 font-mono mt-1">
              Activating Bio-Rational Pest & Disease Defense Grid
            </p>
          </div>
        </div>
      )}

      {/* Fixed 3D Smart Field Canvas */}
      <div className="fixed inset-0 z-0 pointer-events-auto">
        <CropProtectionWorldCanvas />
        <div className="absolute inset-0 bg-gradient-to-b from-[#06140e]/20 via-[#06140e]/40 to-[#06140e]/85 pointer-events-none" />
      </div>

      {/* Scrollable Page Content Layers */}
      <div className="relative z-10 pt-20 pb-20">
        {/* Section 1: Hero & Crop Switcher */}
        <CropProtectionHero />

        {/* Section 2: Problem Discovery Symptom Wizard */}
        <ProblemDiscoveryWizard />

        {/* Section 3: Targeted Product Catalog Grid */}
        <CropProtectionGrid />
      </div>

      {/* Modals & Cart Drawer */}
      <CropProtectionDetailModal />
      <CartDrawer />

      {/* Agricultural Footer */}
      <footer className="relative z-20 border-t border-white/10 bg-forest-950/95 backdrop-blur-xl py-12 px-4 text-xs text-cream-200/60 font-mono">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-white font-display font-semibold">
            <ShieldCheck className="w-4 h-4 text-teal-400" />
            <span>AGRI NEXUS</span>
            <span className="text-teal-400 text-[10px]">CROP PROTECTION V1.0</span>
          </div>
          <p>
            Targeted Crop-Care & Bio-Pesticide Information • Certified Demo Directory
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-[10px] text-teal-400 hover:underline cursor-pointer"
          >
            Back to Top ↑
          </button>
        </div>
      </footer>
    </div>
  );
};
