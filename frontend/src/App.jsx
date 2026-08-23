import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { AuthModal } from './components/auth/AuthModal';
import { PerformanceProvider } from './context/PerformanceContext';
import { WorldProvider, useWorld } from './context/WorldContext';
import { ToolsProvider } from './context/ToolsContext';
import { SeedsProvider } from './context/SeedsContext';
import { CropProtectionProvider } from './context/CropProtectionContext';
import { MarketProvider } from './context/MarketContext';
import { JobsProvider } from './context/JobsContext';
import { LandProvider } from './context/LandContext';
import { WeatherProvider } from './context/WeatherContext';
import { AnalyticsProvider } from './context/AnalyticsContext';
import { CartProvider } from './context/CartContext';
import { SearchProvider } from './context/SearchContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { FarmProvider } from './context/FarmContext';
import { GlobalSearchModal } from './components/search/GlobalSearchModal';
import { SavedItemsDrawer } from './components/favorites/SavedItemsDrawer';
import { MyFarmModal } from './components/farm/MyFarmModal';
import { Navbar } from './components/layout/Navbar';
import { MobileMenu } from './components/layout/MobileMenu';
import { TourSelector } from './components/layout/TourSelector';
import { FloatingSideDock } from './components/layout/FloatingSideDock';
import { ScrollIndicator } from './components/layout/ScrollIndicator';
import { FarmWorldCanvas } from './three/FarmWorldCanvas';
import { HeroContent } from './features/hero/HeroContent';
import { LiveStatsStrip } from './features/hero/LiveStatsStrip';
import { EcosystemCards } from './features/ecosystem/EcosystemCards';
import { KsetravyaBrandStory } from './features/ecosystem/KsetravyaBrandStory';
import { Footer } from './components/layout/Footer';
import { SmartAdvisorStrip } from './features/advisor/SmartAdvisorStrip';
import { MarketWorldView } from './features/market/components/MarketWorldView';
import { ToolsMarketplaceView } from './features/tools/components/ToolsMarketplaceView';
import { SeedsWorldView } from './features/seeds/components/SeedsWorldView';
import { CropProtectionWorldView } from './features/crop_protection/components/CropProtectionWorldView';
import { JobsWorldView } from './features/jobs/components/JobsWorldView';
import { LandWorldView } from './features/land/components/LandWorldView';
import { WeatherWorldView } from './features/weather/components/WeatherWorldView';
import { AnalyticsWorldView } from './features/analytics/components/AnalyticsWorldView';
import { DashboardView } from './features/dashboard/components/DashboardView';
import { CartDrawer } from './components/cart/CartDrawer';
import { ChatDrawer } from './components/chat/ChatDrawer';

function FarmWorldView() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleExplore = () => {
    const ecoSection = document.getElementById('ecosystem-section');
    if (ecoSection) {
      ecoSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-forest-950 text-cream-100 selection:bg-emerald-500/30 selection:text-white">
      {/* 3D World Canvas: Fixed background spanning the ENTIRE full-page scroll journey */}
      <div className="fixed inset-0 z-0 pointer-events-auto">
        <FarmWorldCanvas />
        {/* Cinematic Vignette Overlay to maintain 100% typography contrast and card clarity */}
        <div className="absolute inset-0 bg-gradient-to-b from-forest-950/20 via-forest-950/40 to-forest-950/80 pointer-events-none" />
      </div>

      {/* Fixed Navbar with HOME | TOOLS | SEEDS | CROP PROTECTION | MARKETPLACE | JOBS | LAND | WEATHER | ANALYTICS */}
      <Navbar onOpenMobileMenu={() => setMobileMenuOpen(true)} />

      {/* Mobile Drawer Menu */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />

      {/* Universal Cart Drawer */}
      <CartDrawer />

      {/* Right-Side Floating Control Dock */}
      <FloatingSideDock />

      {/* Scrollable Page Content Layers */}
      <div className="relative z-10">
        {/* Section 1: Hero Stage & Living Farm Awakening */}
        <section id="home" className="min-h-screen flex flex-col justify-between pt-20 pb-4">
          {/* Top Floating Tour Selector ("LIVE ECOSYSTEM" bar) */}
          <TourSelector />

          {/* Split Hero Content (Left text/CTAs + Right Weather Card) */}
          <HeroContent onExploreClick={handleExplore} />

          {/* Live Ecosystem Statistics Strip with Upward Counter */}
          <div className="pb-2">
            <LiveStatsStrip />

            {/* Scroll Down Indicator */}
            <div className="flex justify-center pt-2 pb-2">
              <ScrollIndicator />
            </div>
          </div>
        </section>

        {/* Section 2: "Everything You Need, All in One Place" (10 Ecosystem Cards) */}
        <EcosystemCards />

        {/* Section 3: Kṣetravya Brand Story, Ecosystem Diagram & Concept */}
        <KsetravyaBrandStory />

        {/* Section 4: Smart Recommendations Strip & Crop Lifecycle Simulation */}
        <SmartAdvisorStrip />

        {/* Modern Kṣetravya Footer */}
        <Footer />
      </div>
    </div>
  );
}

function MainWorldOrchestrator() {
  const { currentWorld } = useWorld();
  const [isChatOpen, setIsChatOpen] = useState(false);

  const renderWorld = () => {
    if (currentWorld === 'analytics' || currentWorld === 'transition_to_analytics') {
      return <AnalyticsWorldView />;
    }

    if (currentWorld === 'weather' || currentWorld === 'transition_to_weather') {
      return <WeatherWorldView />;
    }

    if (currentWorld === 'land' || currentWorld === 'transition_to_land') {
      return <LandWorldView />;
    }

    if (currentWorld === 'jobs' || currentWorld === 'transition_to_jobs') {
      return <JobsWorldView />;
    }

    if (currentWorld === 'market' || currentWorld === 'transition_to_market') {
      return <MarketWorldView />;
    }

    if (currentWorld === 'tools' || currentWorld === 'transition_to_tools') {
      return <ToolsMarketplaceView />;
    }

    if (currentWorld === 'seeds' || currentWorld === 'transition_to_seeds') {
      return <SeedsWorldView />;
    }

    if (currentWorld === 'crop_protection' || currentWorld === 'transition_to_crop_protection') {
      return <CropProtectionWorldView />;
    }

    if (currentWorld === 'dashboard') {
      return <DashboardView />;
    }

    return <FarmWorldView />;
  };

  return (
    <>
      {renderWorld()}
      <GlobalSearchModal />
      <SavedItemsDrawer />
      <MyFarmModal />
      <AuthModal />
      <ChatDrawer isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <PerformanceProvider>
        <WorldProvider>
          <ToolsProvider>
            <SeedsProvider>
              <CropProtectionProvider>
                <MarketProvider>
                  <JobsProvider>
                    <LandProvider>
                      <WeatherProvider>
                        <AnalyticsProvider>
                          <CartProvider>
                            <SearchProvider>
                              <FavoritesProvider>
                                <FarmProvider>
                                  <MainWorldOrchestrator />
                                </FarmProvider>
                              </FavoritesProvider>
                            </SearchProvider>
                          </CartProvider>
                        </AnalyticsProvider>
                      </WeatherProvider>
                    </LandProvider>
                  </JobsProvider>
                </MarketProvider>
              </CropProtectionProvider>
            </SeedsProvider>
          </ToolsProvider>
        </WorldProvider>
      </PerformanceProvider>
    </AuthProvider>
  );
}
