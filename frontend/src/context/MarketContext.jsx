import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { marketService } from '../features/market/services/marketService';
import {
  CROPS_DATA,
  CROP_CATEGORIES,
  MARKETS_LIST,
  MARKETPLACE_GOODS_DATA,
  MARKETPLACE_GOODS_CATEGORIES,
} from '../features/market/data/demoMarketData';
import { useWorld } from './WorldContext';

const MarketContext = createContext();

export const MarketProvider = ({ children }) => {
  const { myCrop, setMyCrop } = useWorld();

  const [marketplaceGoods, setMarketplaceGoods] = useState(MARKETPLACE_GOODS_DATA);
  const [loadingGoods, setLoadingGoods] = useState(false);

  const [activeCategory, setActiveCategory] = useState('all');
  const [activeMarket, setActiveMarket] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [compareCrops, setCompareCrops] = useState(['rice', 'groundnut', 'maize']);
  const [selectedGoodsCategory, setSelectedGoodsCategory] = useState('all');
  const [isListProductModalOpen, setIsListProductModalOpen] = useState(false);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [travelHUDMessage, setTravelHUDMessage] = useState(null);

  const refreshMarketplace = async () => {
    setLoadingGoods(true);
    try {
      const goods = await marketService.getMarketplaceGoods({
        category: selectedGoodsCategory,
        search: searchQuery,
      });
      setMarketplaceGoods(goods);
    } catch (e) {
      console.error('Failed to fetch marketplace goods from API', e);
    } finally {
      setLoadingGoods(false);
    }
  };

  useEffect(() => {
    refreshMarketplace();
  }, [selectedGoodsCategory, searchQuery]);

  const listProduct = async (formData) => {
    try {
      const res = await marketService.listProduct(formData);
      refreshMarketplace();
      return res;
    } catch (e) {
      console.warn('API listProduct failed, adding to local state fallback', e);
      const newGoods = {
        id: `prod-${Date.now()}`,
        name: formData.title || formData.name,
        category: formData.category || 'produce',
        categoryName: 'Agricultural Produce',
        price: `₹${formData.price} / ${formData.unit || 'Quintal'}`,
        priceNum: formData.price,
        unit: formData.unit || 'Quintal',
        seller: 'Verified Farmer',
        location: formData.location || 'Guntur, AP',
        rating: 5.0,
        stock: `${formData.quantity || 100} ${formData.unit || 'Quintal'}`,
        imageUrl: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=1200&q=80',
        description: formData.description,
      };
      setMarketplaceGoods((prev) => [newGoods, ...prev]);
      return { success: true, productId: newGoods.id };
    }
  };

  const triggerHUD = (msg) => {
    setTravelHUDMessage(msg);
    setTimeout(() => setTravelHUDMessage(null), 2500);
  };

  const handleSearch = (q) => {
    setSearchQuery(q);
    const query = q.toLowerCase().trim();
    if (!query) return;

    if (query.includes('rice') || query.includes('paddy')) {
      triggerHUD('Focusing Rice Commodity Market...');
    } else if (query.includes('tomato')) {
      triggerHUD('Focusing Madanapalle Tomato Yard...');
    } else if (query.includes('chilli') || query.includes('guntur')) {
      triggerHUD('Focusing Guntur Chilli Mandi...');
    } else if (query.includes('groundnut')) {
      triggerHUD('Focusing Anantapur Oilseed Yard...');
    }
  };

  const toggleCompareCrop = (cropId) => {
    setCompareCrops((prev) => {
      if (prev.includes(cropId)) {
        if (prev.length <= 1) return prev;
        return prev.filter((id) => id !== cropId);
      }
      if (prev.length >= 4) {
        return [...prev.slice(1), cropId];
      }
      return [...prev, cropId];
    });
  };

  const filteredCrops = useMemo(() => {
    return CROPS_DATA.filter((crop) => {
      if (activeCategory !== 'all' && crop.category !== activeCategory) {
        return false;
      }
      if (activeMarket !== 'all' && crop.marketId !== activeMarket) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const match =
          crop.name.toLowerCase().includes(q) ||
          crop.variety.toLowerCase().includes(q) ||
          crop.marketName.toLowerCase().includes(q) ||
          crop.category.toLowerCase().includes(q);
        if (!match) return false;
      }
      return true;
    });
  }, [activeCategory, activeMarket, searchQuery]);

  const filteredGoods = useMemo(() => {
    return marketplaceGoods.filter((item) => {
      if (selectedGoodsCategory !== 'all' && item.category !== selectedGoodsCategory) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const match =
          item.name.toLowerCase().includes(q) ||
          item.seller.toLowerCase().includes(q) ||
          item.location.toLowerCase().includes(q);
        if (!match) return false;
      }
      return true;
    });
  }, [marketplaceGoods, selectedGoodsCategory, searchQuery]);

  return (
    <MarketContext.Provider
      value={{
        activeCategory,
        setActiveCategory,
        activeMarket,
        setActiveMarket,
        searchQuery,
        setSearchQuery: handleSearch,
        selectedCrop,
        setSelectedCrop,
        compareCrops,
        setCompareCrops,
        toggleCompareCrop,
        selectedGoodsCategory,
        setSelectedGoodsCategory,
        isListProductModalOpen,
        setIsListProductModalOpen,
        isCompareModalOpen,
        setIsCompareModalOpen,
        travelHUDMessage,
        filteredCrops,
        filteredGoods,
        listProduct,
        refreshMarketplace,
        loadingGoods,
        allCrops: CROPS_DATA,
        allCategories: CROP_CATEGORIES,
        allMarkets: MARKETS_LIST,
        goodsCategories: MARKETPLACE_GOODS_CATEGORIES,
        allGoods: marketplaceGoods,
      }}
    >
      {children}
    </MarketContext.Provider>
  );
};

export const useMarket = () => {
  const ctx = useContext(MarketContext);
  if (!ctx) throw new Error('useMarket must be used within MarketProvider');
  return ctx;
};
