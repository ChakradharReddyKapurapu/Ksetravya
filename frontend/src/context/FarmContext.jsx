import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const FarmContext = createContext();

const STORAGE_KEY = 'agri_nexus_farm_profile';

export const DEFAULT_FARM_PROFILE = {
  farmName: 'Sri Venkateswara Bio Farm',
  farmerName: 'Venkat Rao',
  state: 'Andhra Pradesh',
  district: 'Guntur',
  location: 'Tenali, Guntur District, Andhra Pradesh',
  pincode: '522201',
  landArea: 5,
  areaUnit: 'Acres',
  soilType: 'Black Soil',
  waterAvailability: 'High (Perennial Canal + Borewell)',
  irrigationType: 'Drip Irrigation',
  currentCrop: 'Groundnut',
  cropId: 'groundnut',
  season: 'Kharif 2026',
  isCustomized: false,
};

export const SOIL_TYPES = [
  'Black Soil (Regur)',
  'Red Sandy Loam',
  'Alluvial Delta Soil',
  'Clayey Loam',
  'Laterite Soil',
  'Coastal Sandy Soil',
];

export const IRRIGATION_TYPES = [
  'Drip Irrigation (Inline)',
  'Micro Sprinkler',
  'Canal Gravity Sluice',
  'Borewell Flood Basin',
  'Rainfed (Dryland)',
];

export const CROPS_LIST = [
  { id: 'rice', name: 'Rice (Paddy)', icon: '🌾' },
  { id: 'groundnut', name: 'Groundnut', icon: '🥜' },
  { id: 'cotton', name: 'Cotton', icon: '🌿' },
  { id: 'maize', name: 'Maize (Corn)', icon: '🌽' },
  { id: 'chilli', name: 'Chilli', icon: '🌶️' },
  { id: 'tomato', name: 'Tomato', icon: '🍅' },
  { id: 'sugarcane', name: 'Sugarcane', icon: '🎋' },
  { id: 'pulses', name: 'Bengal Gram (Chana)', icon: '🫘' },
];

export const DISTRICTS_AP = [
  'Guntur',
  'Tirupati',
  'Chittoor',
  'NTR / Vijayawada',
  'Kurnool',
  'YSR Kadapa',
  'SPSR Nellore',
  'Anantapur',
  'Visakhapatnam',
  'East Godavari',
  'West Godavari',
];

export const FarmProvider = ({ children }) => {
  const [farm, setFarm] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? { ...DEFAULT_FARM_PROFILE, ...JSON.parse(stored) } : DEFAULT_FARM_PROFILE;
    } catch {
      return DEFAULT_FARM_PROFILE;
    }
  });

  const [isMyFarmModalOpen, setIsMyFarmModalOpen] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(farm));
    } catch (e) {
      console.warn('Failed to persist farm profile:', e);
    }
  }, [farm]);

  const updateFarmContext = useCallback((updates) => {
    setFarm((prev) => ({
      ...prev,
      ...updates,
      isCustomized: true,
      lastUpdated: new Date().toISOString(),
    }));
  }, []);

  const resetToDefaultFarm = useCallback(() => {
    setFarm(DEFAULT_FARM_PROFILE);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.warn('Failed to clear farm profile:', e);
    }
  }, []);

  const openMyFarmModal = useCallback(() => {
    setIsMyFarmModalOpen(true);
  }, []);

  const closeMyFarmModal = useCallback(() => {
    setIsMyFarmModalOpen(false);
  }, []);

  return (
    <FarmContext.Provider
      value={{
        farm,
        updateFarmContext,
        resetToDefaultFarm,
        isMyFarmModalOpen,
        setIsMyFarmModalOpen,
        openMyFarmModal,
        closeMyFarmModal,
      }}
    >
      {children}
    </FarmContext.Provider>
  );
};

export const useFarmContext = () => {
  const context = useContext(FarmContext);
  if (!context) {
    throw new Error('useFarmContext must be used within a FarmProvider');
  }
  return context;
};
