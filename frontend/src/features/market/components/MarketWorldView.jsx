import React, { useEffect } from 'react';
import { useWorld } from '../../../context/WorldContext';
import { useMarket } from '../../../context/MarketContext';
import { MarketHeader } from './MarketHeader';
import { MarketJourneyStrip } from './MarketJourneyStrip';
import { MarketEntranceHero } from './MarketEntranceHero';
import { MarketSummaryCards } from './MarketSummaryCards';
import { AllCropPricesStrip } from './AllCropPricesStrip';
import { CategoryInsightsStrip } from './CategoryInsightsStrip';
import { PriceTrendChart } from './PriceTrendChart';
import { CompareCropsSection } from './CompareCropsSection';
import { MarketplaceGoodsSection } from './MarketplaceGoodsSection';
import { EcosystemBridgesSection } from './EcosystemBridgesSection';
import { CropDetailModal } from './CropDetailModal';
import { HistoricalPriceChart } from './HistoricalPriceChart';
import { CropComparisonModal } from './CropComparisonModal';
import { ListProductModal } from './ListProductModal';
import { CartDrawer } from '../../../components/cart/CartDrawer';
import { MarketWorldCanvas } from '../../../three/market/MarketWorldCanvas';
import { Store, Navigation, Sparkles } from 'lucide-react';

export const MarketWorldView = () => {
  const { currentWorld, activeMarketZone, setActiveMarketZone } = useWorld();
  const { travelHUDMessage } = useMarket();

  const isTransitioning =
    currentWorld === 'transition_to_market' || currentWorld === 'transition_to_farm';

  // Dynamic Camera Zone synchronization based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollY / docHeight : 0;

      if (progress < 0.15) {
        setActiveMarketZone('entrance');
      } else if (progress < 0.35) {
        setActiveMarketZone('grains');
      } else if (progress < 0.55) {
        setActiveMarketZone('vegetables');
      } else if (progress < 0.75) {
        setActiveMarketZone('fruits');
      } else if (progress < 0.88) {
        setActiveMarketZone('transport');
      } else {
        setActiveMarketZone('analytics');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [setActiveMarketZone]);

  return (
    <div className="relative min-h-screen bg-[#0d0905] text-cream-100 selection:bg-amber-500/30 selection:text-white">
      {/* Top Fixed Market Navigation Bar */}
      <MarketHeader />

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
              <Store className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold font-display text-white">
              {currentWorld === 'transition_to_market'
                ? 'Entering Agricultural Market World...'
                : 'Returning to Farm...'}
            </h3>
            <p className="text-xs text-amber-300/80 font-mono mt-1">
              Passing transit highway, mandi archway & trading stalls
            </p>
          </div>
        </div>
      )}

      {/* 3D Sunrise Market World Canvas (Fixed Viewport Background) */}
      <div className="fixed inset-0 z-0 pointer-events-auto">
        <MarketWorldCanvas />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d0905]/15 via-[#0d0905]/40 to-[#0d0905]/85 pointer-events-none" />
      </div>

      {/* Scrollable Page Content Layers */}
      <div className="relative z-10 pt-20 pb-20">
        {/* Section 1: 7-Stage Farm-to-Market Story Journey Strip */}
        <MarketJourneyStrip />

        {/* Section 2: Market Entrance Hero Space */}
        <MarketEntranceHero />

        {/* Section 3: Market Summary KPI Cards */}
        <MarketSummaryCards />

        {/* Section 4: All Crop Prices Horizontal Live Cards Strip */}
        <AllCropPricesStrip />

        {/* Section 5 & 6: Analytics Grid (Categories, Market Movers, Price Trend, Crop Comparison) */}
        <section id="price-analytics" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left 6 Cols: Categories & Insights */}
            <div className="lg:col-span-6 space-y-6">
              <CategoryInsightsStrip />
            </div>

            {/* Right 6 Cols: 2D Price Trend Line Chart + Compare Crops Bar Chart */}
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <PriceTrendChart />
              <CompareCropsSection />
            </div>
          </div>
        </section>

        {/* Section 7: Agricultural Goods Marketplace (Buy & Sell) */}
        <MarketplaceGoodsSection />

        {/* Section 8: Ecosystem Cross-Connections (Transport, Tools, Profitability) */}
        <EcosystemBridgesSection />
      </div>

      {/* Modals & Cart Drawer */}
      <CropDetailModal />
      <HistoricalPriceChart />
      <CropComparisonModal />
      <ListProductModal />
      <CartDrawer />

      {/* Modern Agricultural Footer */}
      <footer className="relative z-20 border-t border-white/10 bg-forest-950/95 backdrop-blur-xl py-12 px-4 text-xs text-cream-200/60 font-mono">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-white font-display font-semibold">
            <Store className="w-4 h-4 text-amber-400" />
            <span>AGRI NEXUS</span>
            <span className="text-amber-400 text-[10px]">MARKET WORLD V2.0</span>
          </div>
          <p>
            All commodity prices and rates are <strong>DEMO MARKET DATA</strong> for presentation purposes only.
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
