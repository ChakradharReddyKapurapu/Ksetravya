import React, { createContext, useContext, useState, useMemo } from 'react';
import { SEEDS_DATA, SEED_CROPS, SEED_CATEGORIES } from '../features/seeds/data/demoSeedsData';
import { useWorld } from './WorldContext';

const SeedsContext = createContext();

export const SeedsProvider = ({ children }) => {
  const { myCrop, setMyCrop } = useWorld();
  const [activeCrop, setActiveCropState] = useState('rice');
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSeason, setSelectedSeason] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [selectedSeed, setSelectedSeed] = useState(null);
  const [comparisonList, setComparisonList] = useState([]);
  const [isComparisonModalOpen, setIsComparisonModalOpen] = useState(false);
  const [journeyStage, setJourneyStage] = useState('seed');
  const [travelHUDMessage, setTravelHUDMessage] = useState(null);

  const setActiveCrop = (cropId) => {
    setActiveCropState(cropId);
    const matched = SEED_CROPS.find((c) => c.id === cropId);
    if (matched) {
      if (typeof setMyCrop === 'function') {
        setMyCrop((prev) => ({
          ...(prev || {}),
          id: matched.id,
          name: matched.name,
          icon: matched.icon,
          category: matched.category,
        }));
      }
      setTravelHUDMessage(`Entering ${matched.name} Ecosystem...`);
      setTimeout(() => setTravelHUDMessage(null), 2500);
    }
  };

  // Search that also updates 3D crop environment
  const handleSearchChange = (query) => {
    setSearchQuery(query);
    const q = query.toLowerCase().trim();
    if (!q) return;

    if (q.includes('rice') || q.includes('paddy') || q.includes('bpt') || q.includes('mtu')) {
      setActiveCrop('rice');
    } else if (q.includes('cotton') || q.includes('boll') || q.includes('rch')) {
      setActiveCrop('cotton');
    } else if (q.includes('maize') || q.includes('corn') || q.includes('pioneer')) {
      setActiveCrop('maize');
    } else if (q.includes('groundnut') || q.includes('peanut') || q.includes('kadiri')) {
      setActiveCrop('groundnut');
    } else if (q.includes('wheat') || q.includes('pusa')) {
      setActiveCrop('wheat');
    } else if (q.includes('chilli') || q.includes('mirchi') || q.includes('teja')) {
      setActiveCrop('chilli');
    } else if (q.includes('tomato') || q.includes('arka')) {
      setActiveCrop('tomato');
    } else if (q.includes('mango') || q.includes('banganapalli')) {
      setActiveCrop('mango');
    }
  };

  const toggleComparison = (seed) => {
    setComparisonList((prev) => {
      const exists = prev.some((s) => s.id === seed.id);
      if (exists) return prev.filter((s) => s.id !== seed.id);
      if (prev.length >= 4) {
        alert('You can compare up to 4 seed varieties.');
        return prev;
      }
      return [...prev, seed];
    });
  };

  // Filtered and sorted seeds
  const filteredSeeds = useMemo(() => {
    return SEEDS_DATA.filter((seed) => {
      // Category filter
      if (activeCategory !== 'all' && seed.category !== activeCategory) {
        return false;
      }
      // Crop match filter if specific crop selected
      if (activeCrop && seed.crop !== activeCrop && activeCategory === 'all') {
        // Soft match or keep in general list if matching search
      }
      // Season filter
      if (selectedSeason !== 'all' && !seed.season.toLowerCase().includes(selectedSeason.toLowerCase())) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const match =
          seed.variety.toLowerCase().includes(q) ||
          seed.cropName.toLowerCase().includes(q) ||
          seed.brand.toLowerCase().includes(q) ||
          seed.location.toLowerCase().includes(q) ||
          seed.suitableSoil.toLowerCase().includes(q);
        if (!match) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'yield') return parseInt(b.yieldPotential) - parseInt(a.yieldPotential);
      return b.reviews - a.reviews;
    });
  }, [activeCategory, activeCrop, selectedSeason, searchQuery, sortBy]);

  return (
    <SeedsContext.Provider
      value={{
        activeCrop,
        setActiveCrop,
        activeCategory,
        setActiveCategory,
        searchQuery,
        setSearchQuery: handleSearchChange,
        selectedSeason,
        setSelectedSeason,
        selectedLocation,
        setSelectedLocation,
        sortBy,
        setSortBy,
        selectedSeed,
        setSelectedSeed,
        comparisonList,
        toggleComparison,
        isComparisonModalOpen,
        setIsComparisonModalOpen,
        journeyStage,
        setJourneyStage,
        travelHUDMessage,
        filteredSeeds,
        allCrops: SEED_CROPS,
        allCategories: SEED_CATEGORIES,
      }}
    >
      {children}
    </SeedsContext.Provider>
  );
};

export const useSeeds = () => {
  const ctx = useContext(SeedsContext);
  if (!ctx) throw new Error('useSeeds must be used within SeedsProvider');
  return ctx;
};
