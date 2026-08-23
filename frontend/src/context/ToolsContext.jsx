import React, { createContext, useContext, useState, useEffect } from 'react';
import { toolsService } from '../features/tools/services/toolsService';
import { TOOLS_DATA } from '../features/tools/data/demoToolsData';

const ToolsContext = createContext();

export const ROAD_ZONES = [
  { id: 'tractors', num: '01', title: 'Tractors', icon: '🚜', zPos: 18, desc: 'Heavy & Utility Tractors' },
  { id: 'soil_prep', num: '02', title: 'Soil Preparation', icon: '🌿', zPos: 8, desc: 'Ploughs & Rotavators' },
  { id: 'sowing', num: '03', title: 'Seeding & Planting', icon: '🌱', zPos: -4, desc: 'Precision Seed Drills' },
  { id: 'fertilizer', num: '04', title: 'Fertilizer Equipment', icon: '🧪', zPos: -16, desc: 'Broadcast Spreaders' },
  { id: 'protection', num: '05', title: 'Crop Protection', icon: '🧪', zPos: -28, desc: 'Boom Mist Sprayers' },
  { id: 'irrigation', num: '06', title: 'Irrigation', icon: '💧', zPos: -40, desc: 'Solar Pumps & Rain Guns' },
  { id: 'harvesting', num: '07', title: 'Harvesting', icon: '🌾', zPos: -52, desc: 'Combine Harvesters' },
  { id: 'baling', num: '08', title: 'Baling & Hay', icon: '🟫', zPos: -64, desc: 'Round Hay Balers' },
  { id: 'transport', num: '09', title: 'Farm Transport', icon: '🚚', zPos: -76, desc: 'Hydraulic Tipping Trailers' },
  { id: 'market', num: '10', title: 'Machinery Market', icon: '🛒', zPos: -92, desc: 'Marketplace & Booking' },
];

export const ToolsProvider = ({ children }) => {
  // Dynamic Tools list fetched from API
  const [toolsList, setToolsList] = useState(TOOLS_DATA);
  const [loadingTools, setLoadingTools] = useState(false);

  // Main Buy / Rent Mode Switch: 'all' | 'buy' | 'rent'
  const [activeMode, setActiveMode] = useState('all');

  // Filters & Search
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBrand, setSelectedBrand] = useState('All Brands');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('relevance');

  const refreshTools = async () => {
    setLoadingTools(true);
    try {
      const data = await toolsService.getTools({
        category: selectedCategory,
        search: searchQuery,
        brand: selectedBrand,
        location: selectedLocation,
        mode: activeMode,
        sortBy,
      });
      setToolsList(data);
    } catch (e) {
      console.error('Failed to load dynamic tools', e);
    } finally {
      setLoadingTools(false);
    }
  };

  useEffect(() => {
    refreshTools();
  }, [selectedCategory, searchQuery, selectedBrand, selectedLocation, activeMode, sortBy]);

  // Continuous Road Travel & Camera Tracking (0.0 to 1.0)
  const [roadProgress, setRoadProgress] = useState(0);
  const [activeRoadZone, setActiveRoadZone] = useState(0);
  const [travelHUDMessage, setTravelHUDMessage] = useState(null);

  // Selected Tool for 3D Product Detail Inspector
  const [selectedTool, setSelectedTool] = useState(null);

  // Modals state
  const [rentalModalTool, setRentalModalTool] = useState(null);
  const [buyModalTool, setBuyModalTool] = useState(null);
  const [isComparisonModalOpen, setIsComparisonModalOpen] = useState(false);
  const [isRecommenderOpen, setIsRecommenderOpen] = useState(false);
  const [isSellModalOpen, setIsSellModalOpen] = useState(false);
  const [isFavoritesDrawerOpen, setIsFavoritesDrawerOpen] = useState(false);

  // Multi-Machine Comparison List (up to 4)
  const [comparisonList, setComparisonList] = useState([]);

  // Bookmarked Favorites (Saved Tools)
  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('agri_nexus_fav_tools')) || ['mahindra-575-di', 'kubota-dc-68g-harvester'];
    } catch {
      return ['mahindra-575-di', 'kubota-dc-68g-harvester'];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('agri_nexus_fav_tools', JSON.stringify(favorites));
    } catch (e) {
      // storage full
    }
  }, [favorites]);

  // Scroll Progress Event Listener
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll > 0) {
        const p = Math.min(Math.max(scrollY / maxScroll, 0), 1);
        setRoadProgress(p);

        // Derive active road zone index (0 to 9)
        const zoneIdx = Math.min(Math.floor(p * 10), 9);
        setActiveRoadZone(zoneIdx);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Search Navigation: When user searches, smoothly travel camera toward that zone
  useEffect(() => {
    if (!searchQuery || searchQuery.trim() === '') return;
    const q = searchQuery.toLowerCase().trim();

    let targetZone = null;
    if (q.includes('harvester') || q.includes('reaper') || q.includes('wheat')) {
      targetZone = 6; // Zone 07: Harvesting
    } else if (q.includes('bale') || q.includes('hay') || q.includes('straw')) {
      targetZone = 7; // Zone 08: Baling
    } else if (q.includes('pump') || q.includes('sprinkler') || q.includes('water') || q.includes('drip') || q.includes('canal')) {
      targetZone = 5; // Zone 06: Irrigation
    } else if (q.includes('spray') || q.includes('mist') || q.includes('pesticide')) {
      targetZone = 4; // Zone 05: Spraying
    } else if (q.includes('fertilizer') || q.includes('spreader') || q.includes('manure')) {
      targetZone = 3; // Zone 04: Fertilizer
    } else if (q.includes('seed') || q.includes('plant') || q.includes('transplanter')) {
      targetZone = 2; // Zone 03: Seeding
    } else if (q.includes('plough') || q.includes('rotavator') || q.includes('cultivator') || q.includes('tillage') || q.includes('soil')) {
      targetZone = 1; // Zone 02: Soil Prep
    } else if (q.includes('trailer') || q.includes('trolley') || q.includes('truck') || q.includes('haul')) {
      targetZone = 8; // Zone 09: Transport
    } else if (q.includes('tractor') || q.includes('mahindra') || q.includes('deere') || q.includes('swaraj')) {
      targetZone = 0; // Zone 01: Tractors
    }

    if (targetZone !== null) {
      flyToZone(targetZone, true);
    }
  }, [searchQuery]);

  // Fly to specific zone along the road
  const flyToZone = (zoneIndex, fromSearch = false) => {
    const zone = ROAD_ZONES[zoneIndex];
    if (!zone) return;

    if (fromSearch) {
      setTravelHUDMessage(`Travelling to ${zone.title} Zone...`);
      setTimeout(() => setTravelHUDMessage(null), 3000);
    }

    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const targetScrollY = (zoneIndex / 9) * maxScroll;

    window.scrollTo({
      top: targetScrollY,
      behavior: 'smooth',
    });
  };

  const toggleFavorite = (toolId) => {
    setFavorites((prev) => {
      if (prev.includes(toolId)) {
        return prev.filter((id) => id !== toolId);
      }
      return [...prev, toolId];
    });
  };

  const toggleComparison = (tool) => {
    setComparisonList((prev) => {
      const exists = prev.some((item) => item.id === tool.id);
      if (exists) {
        return prev.filter((item) => item.id !== tool.id);
      }
      if (prev.length >= 4) {
        alert('You can compare up to 4 machines side-by-side.');
        return prev;
      }
      return [...prev, tool];
    });
  };

  const openRentalModal = (tool) => {
    setRentalModalTool(tool);
  };

  const openBuyModal = (tool) => {
    setBuyModalTool(tool);
  };

  return (
    <ToolsContext.Provider
      value={{
        toolsList,
        loadingTools,
        refreshTools,
        activeMode,
        setActiveMode,
        selectedCategory,
        setSelectedCategory,
        selectedBrand,
        setSelectedBrand,
        selectedLocation,
        setSelectedLocation,
        searchQuery,
        setSearchQuery,
        sortBy,
        setSortBy,
        roadProgress,
        activeRoadZone,
        flyToZone,
        travelHUDMessage,
        setTravelHUDMessage,
        selectedTool,
        setSelectedTool,
        rentalModalTool,
        setRentalModalTool,
        buyModalTool,
        setBuyModalTool,
        openRentalModal,
        openBuyModal,
        isComparisonModalOpen,
        setIsComparisonModalOpen,
        comparisonList,
        setComparisonList,
        toggleComparison,
        isRecommenderOpen,
        setIsRecommenderOpen,
        isSellModalOpen,
        setIsSellModalOpen,
        isFavoritesDrawerOpen,
        setIsFavoritesDrawerOpen,
        favorites,
        toggleFavorite,
      }}
    >
      {children}
    </ToolsContext.Provider>
  );
};

export const useTools = () => {
  const ctx = useContext(ToolsContext);
  if (!ctx) throw new Error('useTools must be used within ToolsProvider');
  return ctx;
};
