import React from 'react';
import { useWorld } from '../../context/WorldContext';
import { useCart } from '../../context/CartContext';
import { useSearch } from '../../context/SearchContext';
import { useFavorites } from '../../context/FavoritesContext';
import { useFarmContext } from '../../context/FarmContext';
import { X, Sprout, Tractor, ShieldCheck, Store, Briefcase, Map, CloudSun, BarChart3, ShoppingBag, Search, Heart, LayoutDashboard } from 'lucide-react';

export const MobileMenu = ({ isOpen, onClose }) => {
  const {
    currentWorld,
    startTransitionToFarm,
    startTransitionToTools,
    startTransitionToSeeds,
    startTransitionToCropProtection,
    startTransitionToMarket,
    startTransitionToJobs,
    startTransitionToLand,
    startTransitionToWeather,
    startTransitionToAnalytics,
    startTransitionToDashboard,
  } = useWorld();
  const { cartCount, setIsCartOpen } = useCart();
  const { openSearch } = useSearch();
  const { savedCount, openSavedDrawer } = useFavorites();
  const { farm, openMyFarmModal } = useFarmContext();

  if (!isOpen) return null;

  const menuItems = [
    {
      id: 'farm',
      label: 'Home Farmland',
      icon: <Sprout className="w-5 h-5 text-emerald-400" />,
      isActive: currentWorld === 'farm' || currentWorld === 'transition_to_farm',
      onClick: () => {
        startTransitionToFarm();
        onClose();
      },
    },
    {
      id: 'tools',
      label: 'Tools & Machinery',
      icon: <Tractor className="w-5 h-5 text-amber-400" />,
      isActive: currentWorld === 'tools' || currentWorld === 'transition_to_tools',
      onClick: () => {
        startTransitionToTools();
        onClose();
      },
    },
    {
      id: 'seeds',
      label: 'Seeds & Germination',
      icon: <span className="text-xl">🌱</span>,
      isActive: currentWorld === 'seeds' || currentWorld === 'transition_to_seeds',
      onClick: () => {
        startTransitionToSeeds();
        onClose();
      },
    },
    {
      id: 'crop_protection',
      label: 'Crop Protection & Care',
      icon: <ShieldCheck className="w-5 h-5 text-teal-400" />,
      isActive: currentWorld === 'crop_protection' || currentWorld === 'transition_to_crop_protection',
      onClick: () => {
        startTransitionToCropProtection();
        onClose();
      },
    },
    {
      id: 'market',
      label: 'Marketplace & Prices',
      icon: <Store className="w-5 h-5 text-amber-400" />,
      isActive: currentWorld === 'market' || currentWorld === 'transition_to_market',
      onClick: () => {
        startTransitionToMarket();
        onClose();
      },
    },
    {
      id: 'jobs',
      label: 'Jobs & Agricultural Work',
      icon: <Briefcase className="w-5 h-5 text-emerald-400" />,
      isActive: currentWorld === 'jobs' || currentWorld === 'transition_to_jobs',
      onClick: () => {
        startTransitionToJobs();
        onClose();
      },
    },
    {
      id: 'land',
      label: 'Farmland Lease & Property',
      icon: <Map className="w-5 h-5 text-amber-400" />,
      isActive: currentWorld === 'land' || currentWorld === 'transition_to_land',
      onClick: () => {
        startTransitionToLand();
        onClose();
      },
    },
    {
      id: 'weather',
      label: 'Live Weather & Atmosphere',
      icon: <CloudSun className="w-5 h-5 text-sky-400" />,
      isActive: currentWorld === 'weather' || currentWorld === 'transition_to_weather',
      onClick: () => {
        startTransitionToWeather();
        onClose();
      },
    },
    {
      id: 'analytics',
      label: 'Agricultural Analytics & Intel',
      icon: <BarChart3 className="w-5 h-5 text-purple-400" />,
      isActive: currentWorld === 'analytics' || currentWorld === 'transition_to_analytics',
      onClick: () => {
        startTransitionToAnalytics();
        onClose();
      },
    },
    {
      id: 'dashboard',
      label: 'Command Center Dashboard',
      icon: <LayoutDashboard className="w-5 h-5 text-emerald-400" />,
      isActive: currentWorld === 'dashboard',
      onClick: () => {
        startTransitionToDashboard();
        onClose();
      },
    },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden lg:hidden">
      {/* Backdrop */}
      <div onClick={onClose} className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity" />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-sm bg-forest-950/95 border-l border-white/10 text-cream-100 shadow-2xl backdrop-blur-2xl flex flex-col justify-between p-6 overflow-y-auto">
          {/* Top Header */}
          <div>
            <div className="flex items-center justify-between pb-6 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-stone-950 font-bold">
                  🌱
                </div>
                <span className="font-display font-bold text-white text-base">KṢETRAVYA</span>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-cream-200/70 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Actions: My Farm & Search on Mobile */}
            <div className="pt-4 space-y-2">
              <button
                onClick={() => {
                  onClose();
                  openMyFarmModal();
                }}
                className="w-full p-3 rounded-2xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/50 text-left flex items-center justify-between transition-all cursor-pointer shadow-md"
              >
                <div className="flex items-center gap-3">
                  <Sprout className="w-4 h-4 text-emerald-400" />
                  <div>
                    <span className="text-xs font-display font-bold text-white block">My Farm Context</span>
                    <span className="text-[10px] text-emerald-300 font-mono">
                      {farm.landArea} {farm.areaUnit} • {farm.currentCrop} • {farm.district}
                    </span>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-[9px] font-mono text-emerald-300 border border-emerald-400/30">
                  Settings
                </span>
              </button>

              <button
                onClick={() => {
                  onClose();
                  openSearch();
                }}
                className="w-full p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-left flex items-center justify-between transition-all cursor-pointer shadow-md"
              >
                <div className="flex items-center gap-3">
                  <Search className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-display font-bold text-white">Search AGRI NEXUS</span>
                </div>
                <kbd className="px-2 py-0.5 rounded bg-white/10 text-[9px] font-mono text-emerald-300">
                  ⌘K
                </kbd>
              </button>
            </div>

            {/* Nav Items */}
            <div className="py-4 space-y-2">
              {menuItems.map((item) => (
                <button
                  key={item.label}
                  onClick={item.onClick}
                  className={`w-full p-3 rounded-2xl flex items-center justify-between text-left transition-all cursor-pointer ${
                    item.isActive
                      ? 'bg-emerald-500/25 border border-emerald-400/60 text-white font-bold shadow-lg shadow-emerald-950/40'
                      : 'bg-white/5 hover:bg-white/10 text-cream-100/90 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {item.icon}
                    <span className="text-xs font-display">{item.label}</span>
                  </div>
                  {item.isActive && (
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[9px] font-mono border border-emerald-400/30">
                      ACTIVE
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Bottom Actions: Cart & Saved Items on Mobile */}
          <div className="pt-4 border-t border-white/10 space-y-2">
            <button
              onClick={() => {
                onClose();
                openSavedDrawer();
              }}
              className="w-full py-2.5 px-4 rounded-2xl bg-rose-500/20 hover:bg-rose-500/30 border border-rose-400/40 text-rose-300 font-bold text-xs font-display flex items-center justify-center gap-2 shadow-md cursor-pointer"
            >
              <Heart className="w-4 h-4 fill-rose-400 text-rose-400" />
              <span>My Saved Items ({savedCount})</span>
            </button>

            <button
              onClick={() => {
                onClose();
                setIsCartOpen(true);
              }}
              className="w-full py-3 px-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold text-xs font-display flex items-center justify-center gap-2 shadow-lg cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>View Cart ({cartCount} items)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
