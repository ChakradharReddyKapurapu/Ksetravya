import React, { useState, useEffect } from 'react';
import { Button } from '../ui/Button';
import { PerformanceToggle } from '../ui/PerformanceToggle';
import { useWorld } from '../../context/WorldContext';
import { useCart } from '../../context/CartContext';
import { useSearch } from '../../context/SearchContext';
import { useFavorites } from '../../context/FavoritesContext';
import { useFarmContext } from '../../context/FarmContext';
import { useAuth } from '../../context/AuthContext';
import { Sprout, Menu, ArrowRight, Volume2, VolumeX, Box, ShoppingBag, ShieldCheck, Search, Heart, LayoutDashboard, UserCheck, LogOut } from 'lucide-react';
import { farmSound } from '../../utils/soundEngine';

export const Navbar = ({ onOpenMobileMenu }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const {
    currentWorld,
    startTransitionToMarket,
    startTransitionToTools,
    startTransitionToSeeds,
    startTransitionToCropProtection,
    startTransitionToJobs,
    startTransitionToLand,
    startTransitionToWeather,
    startTransitionToAnalytics,
    startTransitionToFarm,
    startTransitionToDashboard,
  } = useWorld();
  const { cartCount, setIsCartOpen } = useCart();
  const { openSearch } = useSearch();
  const { savedCount, openSavedDrawer } = useFavorites();
  const { farm, openMyFarmModal } = useFarmContext();
  const { user, isAuthenticated, openAuthModal, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSound = () => {
    const active = farmSound.toggle();
    setIsAudioPlaying(active);
  };

  // Exactly matching requested Navbar Order:
  // HOME | TOOLS | SEEDS | CROP PROTECTION | MARKETPLACE | JOBS / WORK | LAND / LEASE | WEATHER / LIVE | ANALYTICS / AI INTEL
  const navLinks = [
    {
      label: 'Home',
      icon: '🏠',
      isActive: currentWorld === 'farm',
      onClick: startTransitionToFarm,
    },
    {
      label: 'Tools',
      sub: 'Machinery',
      icon: '🚜',
      isActive: currentWorld === 'tools' || currentWorld === 'transition_to_tools',
      onClick: startTransitionToTools,
    },
    {
      label: 'Seeds',
      sub: 'Germination',
      icon: '🌱',
      isActive: currentWorld === 'seeds' || currentWorld === 'transition_to_seeds',
      onClick: () => startTransitionToSeeds(),
    },
    {
      label: 'Crop Protection',
      sub: 'Pesticides',
      icon: '🛡️',
      isActive: currentWorld === 'crop_protection' || currentWorld === 'transition_to_crop_protection',
      onClick: () => startTransitionToCropProtection(),
    },
    {
      label: 'Marketplace',
      sub: 'Prices',
      icon: '🛒',
      isActive: currentWorld === 'market' || currentWorld === 'transition_to_market',
      onClick: startTransitionToMarket,
    },
    {
      label: 'Jobs / Work',
      sub: 'Hiring',
      icon: '👷',
      isActive: currentWorld === 'jobs' || currentWorld === 'transition_to_jobs',
      onClick: startTransitionToJobs,
    },
    {
      label: 'Land / Lease',
      sub: 'Farmland',
      icon: '🌍',
      isActive: currentWorld === 'land' || currentWorld === 'transition_to_land',
      onClick: startTransitionToLand,
    },
    {
      label: 'Weather',
      sub: 'Live',
      icon: '🌦️',
      isActive: currentWorld === 'weather' || currentWorld === 'transition_to_weather',
      onClick: startTransitionToWeather,
    },
    {
      label: 'Analytics',
      sub: 'AI Intel',
      icon: '📊',
      isActive: currentWorld === 'analytics' || currentWorld === 'transition_to_analytics',
      onClick: startTransitionToAnalytics,
    },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-forest-950/90 backdrop-blur-2xl border-b border-white/10 py-2.5 shadow-2xl shadow-black/50'
          : 'bg-gradient-to-b from-forest-950/90 via-forest-950/50 to-transparent py-3'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2">
          {/* Brand Logo */}
          <button onClick={startTransitionToFarm} className="flex items-center gap-2.5 group cursor-pointer text-left">
            <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 shadow-md shadow-emerald-950/70 border border-emerald-400/40 group-hover:scale-105 transition-transform duration-300">
              <Box className="w-4 h-4 text-white" />
              <div className="absolute inset-0 rounded-xl bg-emerald-400/20 animate-pulse-glow" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <span className="font-display font-black text-base tracking-wider text-white">KṢETRA</span>
                <span className="font-display font-light text-base tracking-widest text-emerald-400">VYA</span>
              </div>
              <span className="text-[8px] font-mono tracking-widest text-cream-200/60 uppercase -mt-0.5 hidden sm:block">
                Connected Ecosystem
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links with real routing to Tools, Seeds, Crop Protection, Market */}
          <nav className="hidden xl:flex items-center gap-1 px-2.5 py-1 rounded-full bg-forest-900/70 backdrop-blur-md border border-white/10">
            {navLinks.map((link) =>
              link.onClick ? (
                <button
                  key={link.label}
                  onClick={link.onClick}
                  className={`relative px-3 py-1 text-center transition-all duration-200 rounded-full flex flex-col items-center cursor-pointer ${
                    link.isActive
                      ? 'text-white bg-emerald-500/25 border border-emerald-400/50 shadow-md shadow-emerald-950/50 font-bold scale-[1.03]'
                      : 'text-cream-200/80 hover:text-white hover:bg-white/10 border border-transparent'
                  }`}
                >
                  <span className="text-[11px] font-semibold leading-tight flex items-center gap-1">
                    {link.label === 'Seeds' && <span className="text-[10px]">🌱</span>}
                    {link.label === 'Crop Protection' && <span className="text-[10px]">🛡️</span>}
                    {link.label === 'Tools' && <span className="text-[10px]">🚜</span>}
                    {link.label}
                  </span>
                  {link.sub && (
                    <span className="text-[8px] font-mono text-amber-400/90 uppercase -mt-0.5">
                      {link.sub}
                    </span>
                  )}
                </button>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  className="relative px-2.5 py-1 text-center transition-all duration-200 rounded-full flex flex-col items-center text-cream-200/70 hover:text-white hover:bg-white/5 border border-transparent"
                >
                  <span className="text-[11px] font-semibold leading-tight">{link.label}</span>
                  {link.sub && (
                    <span className="text-[8px] font-mono text-emerald-400/70 uppercase -mt-0.5">
                      {link.sub}
                    </span>
                  )}
                </a>
              )
            )}
          </nav>

          {/* Medium Desktop (Compact 5-core view + more) */}
          <nav className="hidden lg:flex xl:hidden items-center gap-1 px-2 py-1 rounded-full bg-forest-900/70 backdrop-blur-md border border-white/10">
            {navLinks.slice(0, 5).map((link) => (
              <button
                key={link.label}
                onClick={link.onClick}
                className={`relative px-2.5 py-1 text-center transition-all duration-200 rounded-full flex items-center gap-1 cursor-pointer ${
                  link.isActive
                    ? 'text-white bg-emerald-500/25 border border-emerald-400/50 shadow-sm font-bold'
                    : 'text-cream-200/80 hover:text-white hover:bg-white/10'
                }`}
              >
                <span className="text-xs font-semibold">{link.label}</span>
              </button>
            ))}
          </nav>

          {/* Right Controls & CTAs */}
          <div className="flex items-center gap-2">
            {/* My Farm Profile Trigger */}
            <button
              onClick={openMyFarmModal}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-400/40 text-emerald-300 hover:text-white transition-all cursor-pointer shadow-sm text-xs font-mono"
              title={`My Farm: ${farm.landArea} ${farm.areaUnit} ${farm.currentCrop} (${farm.district})`}
            >
              <Sprout className="w-3.5 h-3.5 text-emerald-400" />
              <span className="font-display font-semibold">My Farm</span>
              <span className="text-[10px] text-emerald-400/70 hidden xl:inline">
                ({farm.landArea}ac {farm.currentCrop})
              </span>
            </button>

            {/* Global Search Trigger */}
            <button
              onClick={() => openSearch()}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-forest-900/80 hover:bg-forest-800 border border-white/10 hover:border-emerald-400/40 text-cream-200/80 hover:text-white transition-all cursor-pointer shadow-sm text-xs font-mono"
              title="Search across AGRI NEXUS (Ctrl+K)"
            >
              <Search className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden md:inline text-[11px] text-cream-200/60">Search</span>
              <kbd className="hidden lg:inline-flex items-center px-1.5 py-0.2 rounded bg-white/5 border border-white/10 text-[9px] text-cream-200/50">
                ⌘K
              </kbd>
            </button>

            {/* Universal Cart Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 rounded-full bg-forest-900/70 hover:bg-forest-800 border border-white/10 text-emerald-300 hover:text-emerald-200 transition-colors cursor-pointer"
              title="View Cart"
            >
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 text-stone-950 font-bold text-[9px] flex items-center justify-center animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Saved Items Trigger */}
            <button
              onClick={() => openSavedDrawer()}
              className="relative p-2 rounded-full bg-forest-900/70 hover:bg-forest-800 border border-white/10 text-rose-300 hover:text-rose-200 transition-colors cursor-pointer"
              title="My Saved Items"
            >
              <Heart className="w-4 h-4" />
              {savedCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-stone-950 font-bold text-[9px] flex items-center justify-center animate-pulse">
                  {savedCount}
                </span>
              )}
            </button>

            {/* Farm Ambiance Synthesizer */}
            <button
              onClick={toggleSound}
              className={`p-2 rounded-full border transition-all duration-200 ${
                isAudioPlaying
                  ? 'bg-emerald-500/20 border-emerald-400/50 text-emerald-300 shadow-sm'
                  : 'bg-forest-900/60 border-white/10 text-cream-200/60 hover:text-white hover:bg-white/5'
              }`}
              title={isAudioPlaying ? 'Mute Farm Ambiance' : 'Play Morning Farm Ambiance'}
            >
              {isAudioPlaying ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Quality Switcher */}
            <PerformanceToggle />

            {/* Auth CTA or User Badge */}
            {isAuthenticated ? (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/50 text-emerald-300 font-mono text-xs shadow-sm">
                <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span className="font-bold text-white max-w-[100px] truncate">{user?.name}</span>
                <span className="px-1.5 py-0.2 rounded bg-emerald-500/30 text-[9px] font-bold text-emerald-200 uppercase">
                  {user?.role}
                </span>
                <button
                  onClick={logout}
                  className="ml-1 text-cream-200/60 hover:text-rose-400 transition-colors cursor-pointer"
                  title="Sign Out"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => openAuthModal('login')}
                className="px-3 py-1.5 rounded-full bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/50 text-emerald-300 hover:text-white font-mono text-xs font-bold transition-all cursor-pointer shadow-sm flex items-center gap-1.5"
              >
                <span>Sign In</span>
              </button>
            )}

            {/* Dashboard Command Center CTA */}
            <Button
              variant={currentWorld === 'dashboard' ? 'secondary' : 'primary'}
              size="sm"
              icon={LayoutDashboard}
              iconPosition="left"
              className="text-xs hidden sm:flex font-mono"
              onClick={() => startTransitionToDashboard()}
            >
              {currentWorld === 'dashboard' ? 'Command Center' : 'Dashboard'}
            </Button>

            {/* Mobile Hamburger Trigger */}
            <button
              onClick={onOpenMobileMenu}
              className="lg:hidden p-2 rounded-xl bg-forest-900/60 border border-white/10 text-cream-100 hover:text-white"
              aria-label="Open Mobile Menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
