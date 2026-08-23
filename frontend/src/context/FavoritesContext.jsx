import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const FavoritesContext = createContext();

const STORAGE_KEY = 'agri_nexus_saved_items';

export const FavoritesProvider = ({ children }) => {
  const [savedItems, setSavedItems] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [isSavedDrawerOpen, setIsSavedDrawerOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');

  // Sync to localStorage on every change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(savedItems));
    } catch (e) {
      console.warn('Failed to persist saved items to localStorage:', e);
    }
  }, [savedItems]);

  const isSaved = useCallback(
    (id) => {
      if (!id) return false;
      return savedItems.some((item) => String(item.id) === String(id));
    },
    [savedItems]
  );

  const toggleSave = useCallback((item) => {
    if (!item || !item.id) return;

    setSavedItems((prev) => {
      const exists = prev.some((i) => String(i.id) === String(item.id));
      if (exists) {
        return prev.filter((i) => String(i.id) !== String(item.id));
      } else {
        // Standardize item schema
        const normalizedItem = {
          id: String(item.id),
          title: item.title || item.name || 'Untitled Listing',
          domain: item.domain || 'tools',
          domainLabel: item.domainLabel || 'Listing',
          icon: item.icon || '🌾',
          image: item.image || item.thumbnail || null,
          summary:
            item.summary ||
            item.snippet ||
            (item.brand && item.model ? `${item.brand} • ${item.model}` : null) ||
            (item.location ? `Located in ${item.location}` : null) ||
            (item.district ? `${item.district} District` : '') ||
            'Verified Agricultural Listing',
          price: item.price || item.buyPrice || item.annualRentPerAcre || item.salary || null,
          unit: item.unit || item.yieldUnit || null,
          targetWorld: item.targetWorld || item.domain || 'farm',
          savedAt: new Date().toISOString(),
          raw: item,
        };
        return [normalizedItem, ...prev];
      }
    });
  }, []);

  const removeSavedItem = useCallback((id) => {
    setSavedItems((prev) => prev.filter((item) => String(item.id) !== String(id)));
  }, []);

  const clearAllSaved = useCallback(() => {
    setSavedItems([]);
  }, []);

  const openSavedDrawer = useCallback((filter = 'all') => {
    setActiveFilter(filter);
    setIsSavedDrawerOpen(true);
  }, []);

  const closeSavedDrawer = useCallback(() => {
    setIsSavedDrawerOpen(false);
  }, []);

  return (
    <FavoritesContext.Provider
      value={{
        savedItems,
        savedCount: savedItems.length,
        isSaved,
        toggleSave,
        removeSavedItem,
        clearAllSaved,
        isSavedDrawerOpen,
        setIsSavedDrawerOpen,
        openSavedDrawer,
        closeSavedDrawer,
        activeFilter,
        setActiveFilter,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
