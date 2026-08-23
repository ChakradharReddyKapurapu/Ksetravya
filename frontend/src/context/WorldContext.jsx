import React, { createContext, useContext, useState, useEffect } from 'react';
import { CROPS_DATA } from '../features/market/data/demoMarketData';

const WorldContext = createContext();

const getWorldFromPath = (path) => {
  if (typeof window === 'undefined') return 'farm';
  const cleanPath = (path || window.location.pathname).toLowerCase().replace(/\/$/, '') || '/';
  if (cleanPath === '/tools') return 'tools';
  if (cleanPath === '/seeds') return 'seeds';
  if (cleanPath === '/crop-protection') return 'crop_protection';
  if (cleanPath === '/market' || cleanPath === '/market-prices') return 'market';
  if (cleanPath === '/jobs') return 'jobs';
  if (cleanPath === '/land') return 'land';
  if (cleanPath === '/weather') return 'weather';
  if (cleanPath === '/analytics') return 'analytics';
  if (cleanPath === '/dashboard') return 'dashboard';
  return 'farm';
};

const getPathFromWorld = (world) => {
  switch (world) {
    case 'tools':
      return '/tools';
    case 'seeds':
      return '/seeds';
    case 'crop_protection':
      return '/crop-protection';
    case 'market':
      return '/market-prices';
    case 'jobs':
      return '/jobs';
    case 'land':
      return '/land';
    case 'weather':
      return '/weather';
    case 'analytics':
      return '/analytics';
    case 'dashboard':
      return '/dashboard';
    case 'farm':
    default:
      return '/';
  }
};

const updateBrowserUrl = (world) => {
  if (typeof window === 'undefined') return;
  const path = getPathFromWorld(world);
  if (window.location.pathname !== path) {
    window.history.pushState({ world }, '', path);
  }
};

export const WorldProvider = ({ children }) => {
  // Navigation between worlds initialized from URL path for seamless refresh:
  const [currentWorld, setCurrentWorld] = useState(() => getWorldFromPath());
  const [transitionProgress, setTransitionProgress] = useState(0);

  // Synchronize browser back/forward buttons:
  useEffect(() => {
    const handlePopState = () => {
      const targetWorld = getWorldFromPath(window.location.pathname);
      setCurrentWorld(targetWorld);
      setTransitionProgress(0);
      window.scrollTo({ top: 0, behavior: 'instant' });
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Active Market Zone during scroll/travel:
  // 'entrance' | 'grains' | 'vegetables' | 'fruits' | 'pulses' | 'wholesale' | 'transport' | 'analytics'
  const [activeMarketZone, setActiveMarketZone] = useState('entrance');

  // Market Filters & Search
  const [selectedMarket, setSelectedMarket] = useState('tirupati');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Selected Crop for detailed modal / stall zoom in Market
  const [selectedCrop, setSelectedCrop] = useState(null);

  // "MY CROP" Platform-wide active session crop (connects Seeds ↔ Crop Protection ↔ Tools ↔ Weather)
  const [myCrop, setMyCrop] = useState({
    id: 'rice',
    name: 'Rice (Paddy)',
    icon: '🌾',
    category: 'Cereals',
    season: 'Kharif / Rabi',
    defaultSoil: 'Clayey Loam / Black Soil',
  });

  // Historical Charts & Comparison Modals for Market
  const [historyModalCrop, setHistoryModalCrop] = useState(null);
  const [comparisonList, setComparisonList] = useState([]);
  const [isComparisonModalOpen, setIsComparisonModalOpen] = useState(false);

  // Transitions:
  // 1. Farm -> Market
  const startTransitionToMarket = () => {
    if (currentWorld === 'market' || currentWorld === 'transition_to_market') return;
    setCurrentWorld('transition_to_market');
    setTransitionProgress(0);

    const startTime = Date.now();
    const duration = 2400;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setTransitionProgress(progress);

      if (progress >= 1) {
        clearInterval(interval);
        setCurrentWorld('market');
        updateBrowserUrl('market');
        setActiveMarketZone('entrance');
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
    }, 16);
  };

  // 2. Market/Tools/Seeds/CropProtection -> Farm
  const startTransitionToFarm = () => {
    if (currentWorld === 'farm' || currentWorld === 'transition_to_farm') return;
    setCurrentWorld('transition_to_farm');
    setTransitionProgress(1);

    const startTime = Date.now();
    const duration = 2000;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.max(1 - elapsed / duration, 0);
      setTransitionProgress(progress);

      if (progress <= 0) {
        clearInterval(interval);
        setCurrentWorld('farm');
        updateBrowserUrl('farm');
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
    }, 16);
  };

  // 3. Farm -> Tools
  const startTransitionToTools = () => {
    if (currentWorld === 'tools' || currentWorld === 'transition_to_tools') return;
    setCurrentWorld('transition_to_tools');
    setTransitionProgress(0);

    const startTime = Date.now();
    const duration = 2200;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setTransitionProgress(progress);

      if (progress >= 1) {
        clearInterval(interval);
        setCurrentWorld('tools');
        updateBrowserUrl('tools');
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
    }, 16);
  };

  // 4. Farm -> Seeds
  const startTransitionToSeeds = (cropId = null) => {
    if (cropId && typeof cropId === 'string') {
      const cropsMap = {
        rice: { id: 'rice', name: 'Rice (Paddy)', icon: '🌾' },
        maize: { id: 'maize', name: 'Maize (Corn)', icon: '🌽' },
        groundnut: { id: 'groundnut', name: 'Groundnut', icon: '🥜' },
        cotton: { id: 'cotton', name: 'Cotton', icon: '🌿' },
        wheat: { id: 'wheat', name: 'Wheat', icon: '🌾' },
        chilli: { id: 'chilli', name: 'Chilli', icon: '🌶️' },
        tomato: { id: 'tomato', name: 'Tomato', icon: '🍅' },
        mango: { id: 'mango', name: 'Mango', icon: '🥭' },
      };
      if (cropsMap[cropId]) setMyCrop((prev) => ({ ...prev, ...cropsMap[cropId] }));
    }

    if (currentWorld === 'seeds' || currentWorld === 'transition_to_seeds') return;
    setCurrentWorld('transition_to_seeds');
    setTransitionProgress(0);

    const startTime = Date.now();
    const duration = 2200;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setTransitionProgress(progress);

      if (progress >= 1) {
        clearInterval(interval);
        setCurrentWorld('seeds');
        updateBrowserUrl('seeds');
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
    }, 16);
  };

  // 5. Farm/Seeds -> Crop Protection
  const startTransitionToCropProtection = (cropId = null) => {
    if (cropId && typeof cropId === 'string') {
      const cropsMap = {
        rice: { id: 'rice', name: 'Rice (Paddy)', icon: '🌾' },
        maize: { id: 'maize', name: 'Maize (Corn)', icon: '🌽' },
        groundnut: { id: 'groundnut', name: 'Groundnut', icon: '🥜' },
        cotton: { id: 'cotton', name: 'Cotton', icon: '🌿' },
        wheat: { id: 'wheat', name: 'Wheat', icon: '🌾' },
        chilli: { id: 'chilli', name: 'Chilli', icon: '🌶️' },
        tomato: { id: 'tomato', name: 'Tomato', icon: '🍅' },
        mango: { id: 'mango', name: 'Mango', icon: '🥭' },
      };
      if (cropsMap[cropId]) setMyCrop((prev) => ({ ...prev, ...cropsMap[cropId] }));
    }

    if (currentWorld === 'crop_protection' || currentWorld === 'transition_to_crop_protection') return;
    setCurrentWorld('transition_to_crop_protection');
    setTransitionProgress(0);

    const startTime = Date.now();
    const duration = 2200;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setTransitionProgress(progress);

      if (progress >= 1) {
        clearInterval(interval);
        setCurrentWorld('crop_protection');
        updateBrowserUrl('crop_protection');
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
    }, 16);
  };

  // 6. Farm -> Jobs / Work
  const startTransitionToJobs = () => {
    if (currentWorld === 'jobs' || currentWorld === 'transition_to_jobs') return;
    setCurrentWorld('transition_to_jobs');
    setTransitionProgress(0);

    const startTime = Date.now();
    const duration = 2200;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setTransitionProgress(progress);

      if (progress >= 1) {
        clearInterval(interval);
        setCurrentWorld('jobs');
        updateBrowserUrl('jobs');
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
    }, 16);
  };

  // 7. Farm -> Land Lease & Property
  const startTransitionToLand = () => {
    if (currentWorld === 'land' || currentWorld === 'transition_to_land') return;
    setCurrentWorld('transition_to_land');
    setTransitionProgress(0);

    const startTime = Date.now();
    const duration = 2200;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setTransitionProgress(progress);

      if (progress >= 1) {
        clearInterval(interval);
        setCurrentWorld('land');
        updateBrowserUrl('land');
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
    }, 16);
  };

  // 8. Farm -> Weather & Live Atmosphere
  const startTransitionToWeather = () => {
    if (currentWorld === 'weather' || currentWorld === 'transition_to_weather') return;
    setCurrentWorld('transition_to_weather');
    setTransitionProgress(0);

    const startTime = Date.now();
    const duration = 2200;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setTransitionProgress(progress);

      if (progress >= 1) {
        clearInterval(interval);
        setCurrentWorld('weather');
        updateBrowserUrl('weather');
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
    }, 16);
  };

  // 9. Farm -> Analytics & AI Intel
  const startTransitionToAnalytics = () => {
    if (currentWorld === 'analytics' || currentWorld === 'transition_to_analytics') return;
    setCurrentWorld('transition_to_analytics');
    setTransitionProgress(0);

    const startTime = Date.now();
    const duration = 2200;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setTransitionProgress(progress);

      if (progress >= 1) {
        clearInterval(interval);
        setCurrentWorld('analytics');
        updateBrowserUrl('analytics');
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
    }, 16);
  };

  // 10. Transition to Authenticated Farmer Dashboard
  const startTransitionToDashboard = () => {
    if (currentWorld === 'dashboard') return;
    setCurrentWorld('dashboard');
    updateBrowserUrl('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Add / Remove crop from comparison list in Market
  const toggleComparisonCrop = (crop) => {
    setComparisonList((prev) => {
      const exists = prev.some((c) => c.id === crop.id);
      if (exists) {
        return prev.filter((c) => c.id !== crop.id);
      }
      if (prev.length >= 4) {
        alert('You can compare up to 4 crops at a time.');
        return prev;
      }
      return [...prev, crop];
    });
  };

  return (
    <WorldContext.Provider
      value={{
        currentWorld,
        setCurrentWorld,
        transitionProgress,
        startTransitionToMarket,
        startTransitionToFarm,
        startTransitionToTools,
        startTransitionFromToolsToFarm: startTransitionToFarm,
        startTransitionToSeeds,
        startTransitionFromSeedsToFarm: startTransitionToFarm,
        startTransitionToCropProtection,
        startTransitionFromCropProtectionToFarm: startTransitionToFarm,
        startTransitionToJobs,
        startTransitionFromJobsToFarm: startTransitionToFarm,
        startTransitionToLand,
        startTransitionFromLandToFarm: startTransitionToFarm,
        startTransitionToWeather,
        startTransitionFromWeatherToFarm: startTransitionToFarm,
        startTransitionToAnalytics,
        startTransitionFromAnalyticsToFarm: startTransitionToFarm,
        startTransitionToDashboard,
        myCrop,
        setMyCrop,
        activeMarketZone,
        setActiveMarketZone,
        selectedMarket,
        setSelectedMarket,
        categoryFilter,
        setCategoryFilter,
        searchQuery,
        setSearchQuery,
        selectedCrop,
        setSelectedCrop,
        historyModalCrop,
        setHistoryModalCrop,
        comparisonList,
        setComparisonList,
        toggleComparisonCrop,
        isComparisonModalOpen,
        setIsComparisonModalOpen,
      }}
    >
      {children}
    </WorldContext.Provider>
  );
};

export const useWorld = () => {
  const ctx = useContext(WorldContext);
  if (!ctx) throw new Error('useWorld must be used within WorldProvider');
  return ctx;
};
