import React, { createContext, useContext, useState, useMemo } from 'react';
import {
  CROP_PROTECTION_DATA,
  CROP_PROTECTION_CATEGORIES,
  CROP_PROBLEMS,
} from '../features/crop_protection/data/demoCropProtectionData';
import { useWorld } from './WorldContext';

const CropProtectionContext = createContext();

export const CropProtectionProvider = ({ children }) => {
  const { myCrop, setMyCrop } = useWorld();
  const [activeCrop, setActiveCropState] = useState(myCrop?.id || 'rice');
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeProblem, setActiveProblem] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [travelHUDMessage, setTravelHUDMessage] = useState(null);

  const setActiveCrop = (cropId) => {
    setActiveCropState(cropId);
    setTravelHUDMessage(`Calibrating Crop Protection for ${cropId.toUpperCase()}...`);
    setTimeout(() => setTravelHUDMessage(null), 2500);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    const q = query.toLowerCase().trim();
    if (!q) return;

    if (q.includes('rice') || q.includes('paddy') || q.includes('blast') || q.includes('borer')) {
      setActiveCrop('rice');
    } else if (q.includes('cotton') || q.includes('bollworm')) {
      setActiveCrop('cotton');
    } else if (q.includes('chilli') || q.includes('mite') || q.includes('thrip')) {
      setActiveCrop('chilli');
    } else if (q.includes('tomato') || q.includes('blight') || q.includes('wilt')) {
      setActiveCrop('tomato');
    } else if (q.includes('weed') || q.includes('grass')) {
      setActiveCategory('weeds');
    } else if (q.includes('fung') || q.includes('rust') || q.includes('mildew')) {
      setActiveCategory('fungal');
    } else if (q.includes('spray') || q.includes('battery') || q.includes('nozzle')) {
      setActiveCategory('spraying');
    }
  };

  const filteredProducts = useMemo(() => {
    return CROP_PROTECTION_DATA.filter((item) => {
      // Category filter
      if (activeCategory !== 'all' && item.category !== activeCategory) {
        return false;
      }
      // Crop match filter (if not 'all' and not searching universally)
      if (activeCrop && !item.cropAssociation.includes(activeCrop) && activeCategory === 'all' && !searchQuery) {
        // Keep in list or soften
      }
      // Problem filter
      if (activeProblem !== 'all' && activeProblem !== 'unknown') {
        if (activeProblem === 'insects' && item.category !== 'insects' && item.category !== 'biological') {
          return false;
        }
        if (activeProblem === 'weeds' && item.category !== 'weeds') {
          return false;
        }
        if (
          (activeProblem === 'disease_symptoms' || activeProblem === 'leaf_damage') &&
          item.category !== 'diseases' &&
          item.category !== 'fungal'
        ) {
          return false;
        }
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const match =
          item.name.toLowerCase().includes(q) ||
          item.targetPest.toLowerCase().includes(q) ||
          item.brand.toLowerCase().includes(q) ||
          item.activeIngredient.toLowerCase().includes(q) ||
          item.categoryName.toLowerCase().includes(q);
        if (!match) return false;
      }
      return true;
    });
  }, [activeCategory, activeCrop, activeProblem, searchQuery]);

  return (
    <CropProtectionContext.Provider
      value={{
        activeCrop,
        setActiveCrop,
        activeCategory,
        setActiveCategory,
        activeProblem,
        setActiveProblem,
        searchQuery,
        setSearchQuery: handleSearch,
        selectedProduct,
        setSelectedProduct,
        travelHUDMessage,
        filteredProducts,
        allCategories: CROP_PROTECTION_CATEGORIES,
        allProblems: CROP_PROBLEMS,
      }}
    >
      {children}
    </CropProtectionContext.Provider>
  );
};

export const useCropProtection = () => {
  const ctx = useContext(CropProtectionContext);
  if (!ctx) throw new Error('useCropProtection must be used within CropProtectionProvider');
  return ctx;
};
