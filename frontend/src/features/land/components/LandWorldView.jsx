import React from 'react';
import { useWorld } from '../../../context/WorldContext';
import { useLand } from '../../../context/LandContext';
import { LandHeader } from './LandHeader';
import { PropertyViewHUD } from './PropertyViewHUD';
import { LandHero } from './LandHero';
import { LandSearchAndFilterBar } from './LandSearchAndFilterBar';
import { LandParcelsGrid } from './LandParcelsGrid';
import { LandLeaseCalculator } from './LandLeaseCalculator';
import { AgroSoilZonesSection } from './AgroSoilZonesSection';
import { LegalSafetySection } from './LegalSafetySection';
import { LandEcosystemBridges } from './LandEcosystemBridges';
import { ParcelDetailModal } from './ParcelDetailModal';
import { LeaseInquiryModal } from './LeaseInquiryModal';
import { ListLandModal } from './ListLandModal';
import { CartDrawer } from '../../../components/cart/CartDrawer';
import { LandWorldCanvas } from '../../../three/land/LandWorldCanvas';
import { Map, Navigation, Compass } from 'lucide-react';

export const LandWorldView = () => {
  const { currentWorld } = useWorld();
  const { travelHUDMessage } = useLand();

  const isTransitioning =
    currentWorld === 'transition_to_land' || currentWorld === 'transition_to_farm';

  return (
    <div className="relative min-h-screen bg-[#0d170b] text-cream-100 selection:bg-amber-500/30 selection:text-white">
      {/* Top Fixed Header */}
      <LandHeader />

      {/* Travel HUD Toast */}
      {travelHUDMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-top-4 duration-300 pointer-events-auto">
          <div className="flex items-center gap-2 px-5 py-2 rounded-full bg-amber-500 text-stone-950 font-display font-bold text-xs shadow-2xl border border-amber-300">
            <Navigation className="w-4 h-4 animate-spin text-stone-950" />
            <span>{travelHUDMessage}</span>
          </div>
        </div>
      )}

      {/* Cinematic Transition Overlay */}
      {isTransitioning && (
        <div className="fixed inset-0 z-50 pointer-events-none flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm transition-all duration-300">
          <div className="p-6 rounded-3xl bg-forest-950/95 border border-amber-400/50 shadow-2xl flex flex-col items-center text-center max-w-sm">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300 mb-3 animate-spin">
              <Map className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold font-display text-white">
              {currentWorld === 'transition_to_land'
                ? 'Entering Farmland Discovery & Lease World...'
                : 'Returning to Farm...'}
            </h3>
            <p className="text-xs text-amber-300/80 font-mono mt-1">
              Connecting to 3D dynamic agricultural property engine
            </p>
          </div>
        </div>
      )}

      {/* 3D Fixed Viewport Background */}
      <div className="fixed inset-0 z-0 pointer-events-auto">
        <LandWorldCanvas />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d170b]/20 via-[#0d170b]/50 to-[#0d170b]/90 pointer-events-none" />
      </div>

      {/* Scrollable Content Layers */}
      <div className="relative z-10 pt-16 pb-20">
        {/* Stage 1: Interactive 3D Property View HUD (Matching Master Reference media_1787412387318.jpg) */}
        <PropertyViewHUD />

        {/* Stage 2: Main Hero Stage */}
        <LandHero />

        {/* Stage 3: Search & Multi-Filters */}
        <LandSearchAndFilterBar />

        {/* Stage 4: Available Land Parcels Grid */}
        <LandParcelsGrid />

        {/* Stage 5: Interactive Land Lease & Crop ROI Calculator */}
        <LandLeaseCalculator />

        {/* Stage 6: Regional Soil Classification Zones */}
        <AgroSoilZonesSection />

        {/* Stage 7: Legal Due Diligence & 1-B Title Safety */}
        <LegalSafetySection />

        {/* Stage 8: Connected Agricultural Ecosystem */}
        <LandEcosystemBridges />
      </div>

      {/* Modals & Cart Drawer */}
      <ParcelDetailModal />
      <LeaseInquiryModal />
      <ListLandModal />
      <CartDrawer />

      {/* Footer */}
      <footer className="relative z-20 border-t border-white/10 bg-forest-950/95 backdrop-blur-xl py-12 px-4 text-xs text-cream-200/60 font-mono">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-white font-display font-semibold">
            <Map className="w-4 h-4 text-amber-400" />
            <span>AGRI NEXUS</span>
            <span className="text-amber-400 text-[10px]">DYNAMIC FARMLAND & IRRIGATION ENGINE</span>
          </div>
          <p>
            All land parcel listings, survey details, and soil reports are <strong>DEMO AGRICULTURAL PROPERTY DATA</strong> for platform presentation.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-[10px] text-amber-400 hover:underline cursor-pointer"
          >
            Back to Top ↑
          </button>
        </div>
      </footer>
    </div>
  );
};
