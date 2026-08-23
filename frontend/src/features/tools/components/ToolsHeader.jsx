import React from 'react';
import { useWorld } from '../../../context/WorldContext';
import { useTools } from '../../../context/ToolsContext';
import { TOOL_LOCATIONS } from '../data/demoToolsData';
import {
  ArrowLeft,
  Search,
  MapPin,
  Heart,
  Layers,
  PlusCircle,
  Tractor,
  SlidersHorizontal,
  Navigation,
} from 'lucide-react';

export const ToolsHeader = () => {
  const { startTransitionFromToolsToFarm } = useWorld();
  const {
    activeMode,
    setActiveMode,
    searchQuery,
    setSearchQuery,
    selectedLocation,
    setSelectedLocation,
    favorites,
    setIsFavoritesDrawerOpen,
    comparisonList,
    setIsComparisonModalOpen,
    setIsSellModalOpen,
    setIsRecommenderOpen,
    travelHUDMessage,
  } = useTools();

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-forest-950/90 backdrop-blur-2xl border-b border-white/10 py-3 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-3">
            {/* Left: Back to Farm + Brand */}
            <div className="flex items-center justify-between w-full lg:w-auto gap-3">
              <button
                onClick={startTransitionFromToolsToFarm}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-xs font-semibold font-display transition-all duration-300 shadow-md hover:scale-[1.02] cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>← Back to Farm</span>
              </button>

              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300">
                  <Tractor className="w-4 h-4" />
                </div>
                <span className="font-display font-bold text-white text-sm">
                  Machinery Road
                </span>
                <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[9px] font-mono border border-amber-400/30">
                  10 Zones
                </span>
              </div>
            </div>

            {/* Center: Prominent [ BUY TOOLS ] [ RENT TOOLS ] Mode Switch */}
            <div className="flex items-center p-1 rounded-full bg-forest-900/90 border border-white/15 shadow-inner">
              <button
                onClick={() => setActiveMode('all')}
                className={`px-3.5 py-1 rounded-full text-xs font-semibold font-display transition-all cursor-pointer ${
                  activeMode === 'all'
                    ? 'bg-emerald-500 text-stone-950 shadow-md font-bold'
                    : 'text-cream-200/70 hover:text-white'
                }`}
              >
                All Machinery
              </button>
              <button
                onClick={() => setActiveMode('buy')}
                className={`px-4 py-1 rounded-full text-xs font-semibold font-display transition-all cursor-pointer ${
                  activeMode === 'buy'
                    ? 'bg-amber-500 text-stone-950 shadow-md font-bold'
                    : 'text-cream-200/70 hover:text-white'
                }`}
              >
                Buy Tools
              </button>
              <button
                onClick={() => setActiveMode('rent')}
                className={`px-4 py-1 rounded-full text-xs font-semibold font-display transition-all cursor-pointer ${
                  activeMode === 'rent'
                    ? 'bg-sky-500 text-stone-950 shadow-md font-bold'
                    : 'text-cream-200/70 hover:text-white'
                }`}
              >
                Rent Tools
              </button>
            </div>

            {/* Center Right: Search Bar (Search = Navigate along 3D road) */}
            <div className="relative w-full lg:w-72">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-cream-200/50" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search 'tractor', 'harvester', 'pump'..."
                className="w-full pl-9 pr-4 py-1.5 rounded-full bg-forest-900/80 border border-white/15 focus:border-amber-400 text-xs text-white placeholder:text-cream-200/40 focus:outline-none focus:ring-1 focus:ring-amber-400 font-body transition-all"
              />
            </div>

            {/* Right Action Icons: Location, Recommender, Saved, Sell Equipment */}
            <div className="flex items-center gap-2 w-full lg:w-auto justify-end">
              {/* Location Selector */}
              <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-forest-900/80 border border-white/15 text-xs text-cream-100">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="bg-transparent text-xs text-white font-medium focus:outline-none cursor-pointer"
                >
                  {TOOL_LOCATIONS.map((loc) => (
                    <option key={loc.id} value={loc.id} className="bg-forest-950 text-white">
                      {loc.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Farm Size Machine Recommender Trigger */}
              <button
                onClick={() => setIsRecommenderOpen(true)}
                className="p-2 rounded-full bg-forest-900/80 hover:bg-forest-800 border border-white/10 text-emerald-300 hover:text-emerald-200 transition-colors cursor-pointer"
                title="Find the Right Machine (Farm Size Advisor)"
              >
                <SlidersHorizontal className="w-4 h-4" />
              </button>

              {/* Favorites Drawer Trigger */}
              <button
                onClick={() => setIsFavoritesDrawerOpen(true)}
                className="relative p-2 rounded-full bg-forest-900/80 hover:bg-forest-800 border border-white/10 text-rose-400 hover:text-rose-300 transition-colors cursor-pointer"
                title="My Saved Tools"
              >
                <Heart className="w-4 h-4" />
                {favorites.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center">
                    {favorites.length}
                  </span>
                )}
              </button>

              {/* Compare Drawer Trigger */}
              {comparisonList.length > 0 && (
                <button
                  onClick={() => setIsComparisonModalOpen(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500 text-stone-950 text-xs font-bold font-display shadow-lg cursor-pointer animate-pulse"
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Compare ({comparisonList.length})</span>
                </button>
              )}

              {/* Sell / List Equipment CTA */}
              <button
                onClick={() => setIsSellModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold font-display transition-all shadow-md cursor-pointer"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>List Equipment</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Travel Navigation HUD Toast Banner */}
      {travelHUDMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex items-center gap-2 px-5 py-2 rounded-full bg-amber-500 text-stone-950 font-display font-bold text-xs shadow-2xl border border-amber-300">
            <Navigation className="w-4 h-4 animate-spin text-stone-950" />
            <span>{travelHUDMessage}</span>
          </div>
        </div>
      )}
    </>
  );
};
