import React from 'react';
import { useWorld } from '../../../context/WorldContext';
import { useTools, ROAD_ZONES } from '../../../context/ToolsContext';
import { ToolsHeader } from './ToolsHeader';
import { ToolsHero } from './ToolsHero';
import { ToolsRoadmapNav } from './ToolsRoadmapNav';
import { ProductGrid } from './ProductGrid';
import { ProductDetailModal } from './ProductDetailModal';
import { RentalFlowModal } from './RentalFlowModal';
import { BuyFlowModal } from './BuyFlowModal';
import { CompareToolsModal } from './CompareToolsModal';
import { FarmSizeRecommenderModal } from './FarmSizeRecommenderModal';
import { SellEquipmentModal } from './SellEquipmentModal';
import { SavedToolsDrawer } from './SavedToolsDrawer';
import { ToolsWorldCanvas } from '../../../three/tools/ToolsWorldCanvas';
import { TOOLS_DATA } from '../data/demoToolsData';
import {
  Tractor,
  ArrowRight,
  Sparkles,
  Star,
  ChevronDown,
  Layers,
  Heart,
  Store,
} from 'lucide-react';

export const ToolsMarketplaceView = () => {
  const { currentWorld, transitionProgress } = useWorld();
  const {
    toolsList,
    setSelectedTool,
    openRentalModal,
    openBuyModal,
    toggleFavorite,
    favorites,
    toggleComparison,
    comparisonList,
    flyToZone,
  } = useTools();

  const isTransitioning =
    currentWorld === 'transition_to_tools' || currentWorld === 'transition_to_farm';

  return (
    <div className="relative min-h-screen bg-[#07130c] text-cream-100 selection:bg-amber-500/30 selection:text-white">
      {/* Top Fixed Tools Header */}
      <ToolsHeader />

      {/* Floating 10-Stage Journey Roadmap Navigation Bar */}
      <ToolsRoadmapNav />

      {/* Transition Flight HUD Overlay */}
      {isTransitioning && (
        <div className="fixed inset-0 z-50 pointer-events-none flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm transition-all duration-300">
          <div className="p-6 rounded-3xl bg-forest-950/90 border border-amber-400/50 shadow-2xl flex flex-col items-center text-center max-w-sm">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300 mb-3 animate-spin">
              <Tractor className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold font-display text-white">
              {currentWorld === 'transition_to_tools'
                ? 'Travelling to Agricultural Machinery Road...'
                : 'Returning to Farmland...'}
            </h3>
            <p className="text-xs text-amber-300/80 font-mono mt-1">
              Connecting to 10-Stage Machinery Discovery Route
            </p>
          </div>
        </div>
      )}

      {/* 3D Machinery Road Canvas: Fixed background spanning the ENTIRE scroll journey */}
      <div className="fixed inset-0 z-0 pointer-events-auto">
        <ToolsWorldCanvas />
        <div className="absolute inset-0 bg-gradient-to-b from-[#07130c]/20 via-[#07130c]/40 to-[#07130c]/85 pointer-events-none" />
      </div>

      {/* Scrollable Road Journey Stages */}
      <div className="relative z-10 pt-20 pb-28">
        {/* Stage 0: Hero Entrance */}
        <section className="min-h-[85vh] flex flex-col justify-between pt-12 pb-6">
          <ToolsHero />
          <div className="flex justify-center pb-4 animate-bounce">
            <button
              onClick={() => flyToZone(0)}
              className="flex flex-col items-center gap-1 text-[11px] font-mono text-amber-300/80 hover:text-amber-300"
            >
              <span>Scroll down to travel the Agricultural Road</span>
              <ChevronDown className="w-4 h-4 text-amber-400" />
            </button>
          </div>
        </section>

        {/* 9 Roadside Discovery Zones along the Farm Road */}
        {ROAD_ZONES.slice(0, 9).map((zone, idx) => {
          const zoneTools = toolsList.filter((t) => {
            if (zone.id === 'tractors') return t.category === 'tractors';
            if (zone.id === 'soil_prep') return t.category === 'soil_prep';
            if (zone.id === 'sowing') return t.category === 'sowing';
            if (zone.id === 'fertilizer') return t.category === 'fertilizer';
            if (zone.id === 'protection') return t.category === 'protection';
            if (zone.id === 'irrigation') return t.category === 'irrigation';
            if (zone.id === 'harvesting') return t.category === 'harvesting';
            if (zone.id === 'baling') return t.category === 'harvesting' && t.subCategory === 'Baler';
            if (zone.id === 'transport') return t.category === 'transport';
            return true;
          }).slice(0, 2);

          const isEven = idx % 2 === 0;

          return (
            <section
              key={zone.id}
              className={`min-h-[75vh] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center my-12 pointer-events-none`}
            >
              <div
                className={`max-w-md p-6 rounded-3xl bg-forest-950/90 border border-white/15 backdrop-blur-xl shadow-2xl pointer-events-auto transition-all duration-300 hover:border-amber-400/60 ${
                  isEven ? 'self-start' : 'self-end'
                }`}
              >
                {/* Zone Number & Title */}
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-mono border border-amber-400/30 uppercase font-bold">
                    ZONE {zone.num} • {zone.title}
                  </span>
                  <span className="text-xl">{zone.icon}</span>
                </div>

                <h3 className="text-xl font-bold font-display text-white mb-1">
                  {zone.desc}
                </h3>
                <p className="text-xs text-cream-200/70 font-body mb-4">
                  Discover modern field machinery built for heavy duty farming in Andhra Pradesh.
                </p>

                {/* Featured Machine Previews */}
                <div className="space-y-2 mb-4">
                  {zoneTools.map((tool) => (
                    <div
                      key={tool.id}
                      onClick={() => setSelectedTool(tool)}
                      className="p-3 rounded-2xl bg-forest-900/80 hover:bg-forest-900 border border-white/5 hover:border-amber-400/40 transition-all cursor-pointer flex items-center justify-between gap-2"
                    >
                      <div>
                        <h4 className="text-xs font-bold font-display text-white">{tool.name}</h4>
                        <span className="text-[10px] font-mono text-cream-200/60">
                          {tool.specs.hp} • Buy: ₹{tool.buyPrice.toLocaleString()} • Rent: ₹{tool.rentPriceDay}/d
                        </span>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openRentalModal(tool);
                        }}
                        className="py-1 px-2.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-stone-950 text-[10px] font-bold font-display"
                      >
                        Rent
                      </button>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => flyToZone(idx)}
                  className="w-full py-2 px-3 rounded-xl bg-forest-900 hover:bg-forest-800 border border-white/10 text-xs font-mono text-cream-100 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Inspect Zone 3D View</span>
                  <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
                </button>
              </div>
            </section>
          );
        })}

        {/* Stage 10: The Agricultural Machinery Marketplace */}
        <section id="marketplace-zone" className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30 text-xs font-mono uppercase mb-3">
              <Store className="w-4 h-4" />
              <span>ZONE 10 • AGRICULTURAL MACHINERY MARKETPLACE</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black font-display text-white tracking-tight">
              Explore & Rent All Machinery
            </h2>
            <p className="text-xs sm:text-sm text-cream-200/60 font-mono mt-2 max-w-xl mx-auto">
              Filter by brand, location, price, and horsepower to book equipment across Andhra Pradesh
            </p>
          </div>

          {/* Comprehensive Product Marketplace Grid */}
          <ProductGrid />
        </section>
      </div>

      {/* Modals & Drawers */}
      <ProductDetailModal />
      <RentalFlowModal />
      <BuyFlowModal />
      <CompareToolsModal />
      <FarmSizeRecommenderModal />
      <SellEquipmentModal />
      <SavedToolsDrawer />

      {/* Modern Agricultural Footer */}
      <footer className="relative z-20 border-t border-white/10 bg-forest-950/95 backdrop-blur-xl py-12 px-4 text-xs text-cream-200/60 font-mono">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-white font-display font-semibold">
            <Tractor className="w-4 h-4 text-amber-400" />
            <span>AGRI NEXUS</span>
            <span className="text-amber-400 text-[10px]">MACHINERY ROAD V2.0</span>
          </div>
          <p>
            10-Stage 3D Machinery Road • Buy & Rent Across Andhra Pradesh (Demo Data)
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-[10px] text-amber-400 hover:underline cursor-pointer"
          >
            Back to Road Entrance ↑
          </button>
        </div>
      </footer>
    </div>
  );
};
