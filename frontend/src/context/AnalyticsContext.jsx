import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';
import { CROP_ECONOMICS_DATA } from '../features/analytics/data/cropEconomicsData';
import { CROPS_DATA, MARKETS_LIST } from '../features/market/data/demoMarketData';
import { useWorld } from './WorldContext';

const AnalyticsContext = createContext();

export const AnalyticsProvider = ({ children }) => {
  const { startTransitionToMarket } = useWorld();

  // Active Crop Selection (Default: Rice)
  const [selectedCropId, setSelectedCropId] = useState('rice');
  const [acreage, setAcreage] = useState(5);
  const [travelHUDMessage, setTravelHUDMessage] = useState(null);

  const selectedCropMeta = useMemo(() => {
    return CROP_ECONOMICS_DATA.find((c) => c.id === selectedCropId) || CROP_ECONOMICS_DATA[0];
  }, [selectedCropId]);

  // Integrated Mandi Price Data from demoMarketData
  const liveMandiData = useMemo(() => {
    const marketCrop = CROPS_DATA.find((m) => m.id === selectedCropId) || CROPS_DATA[0];
    return {
      name: marketCrop.name,
      mandi: 'Guntur APMC Yard',
      minPrice: marketCrop.minPrice ? Math.round(marketCrop.minPrice * (selectedCropMeta.mandiUnit.includes('Quintal') ? 100 : 1)) : selectedCropMeta.defaultSellingPrice * 0.9,
      avgPrice: marketCrop.avgPrice ? Math.round(marketCrop.avgPrice * (selectedCropMeta.mandiUnit.includes('Quintal') ? 100 : 1)) : selectedCropMeta.defaultSellingPrice,
      maxPrice: marketCrop.maxPrice ? Math.round(marketCrop.maxPrice * (selectedCropMeta.mandiUnit.includes('Quintal') ? 100 : 1)) : selectedCropMeta.defaultSellingPrice * 1.12,
      unit: selectedCropMeta.mandiUnit,
      trend: marketCrop.changeDirection || 'up',
      arrivalVolume: '1,450 Quintals',
    };
  }, [selectedCropId, selectedCropMeta]);

  // Production Costs State (Scaled by Acreage)
  const [costs, setCosts] = useState({
    seed: 3500 * 5,
    fertilizer: 6500 * 5,
    pesticide: 3200 * 5,
    labor: 14000 * 5,
    machinery: 5500 * 5,
    irrigation: 2000 * 5,
    transport: 1800 * 5,
    other: 1500 * 5,
  });

  // Yield & Selling Price State
  const [expectedYield, setExpectedYield] = useState(20 * 5); // 100 Quintals
  const [sellingPrice, setSellingPrice] = useState(2420);

  // Scenario Simulator Overrides (% deltas)
  const [scenario, setScenario] = useState({
    fertilizerDelta: 0, // e.g. +10%
    laborDelta: 0,      // e.g. +15%
    yieldDelta: 0,      // e.g. -10%
    priceDelta: 0,      // e.g. +10%
  });

  const triggerHUD = (msg) => {
    setTravelHUDMessage(msg);
    setTimeout(() => setTravelHUDMessage(null), 3000);
  };

  // Crop Selector Handler
  const selectCrop = useCallback((cropId) => {
    const crop = CROP_ECONOMICS_DATA.find((c) => c.id === cropId);
    if (!crop) return;

    setSelectedCropId(cropId);
    setSellingPrice(crop.defaultSellingPrice);
    setExpectedYield(crop.defaultYieldPerAcre * acreage);

    // Reset costs to benchmark scaled by current acreage
    const b = crop.benchmarkCostsPerAcre;
    setCosts({
      seed: b.seed * acreage,
      fertilizer: b.fertilizer * acreage,
      pesticide: b.pesticide * acreage,
      labor: b.labor * acreage,
      machinery: b.machinery * acreage,
      irrigation: b.irrigation * acreage,
      transport: b.transport * acreage,
      other: b.other * acreage,
    });

    triggerHUD(`Agricultural Engine: Loaded ${crop.name} Economics`);
  }, [acreage]);

  // Acreage Update Handler
  const updateAcreage = (newAcreage) => {
    const validAc = Math.max(1, Number(newAcreage) || 1);
    setAcreage(validAc);

    // Rescale yield & costs proportionally
    const crop = selectedCropMeta;
    setExpectedYield(crop.defaultYieldPerAcre * validAc);
    const b = crop.benchmarkCostsPerAcre;
    setCosts({
      seed: b.seed * validAc,
      fertilizer: b.fertilizer * validAc,
      pesticide: b.pesticide * validAc,
      labor: b.labor * validAc,
      machinery: b.machinery * validAc,
      irrigation: b.irrigation * validAc,
      transport: b.transport * validAc,
      other: b.other * validAc,
    });
  };

  // Update Individual Cost Item
  const updateCostItem = (key, val) => {
    setCosts((prev) => ({
      ...prev,
      [key]: Math.max(0, Number(val) || 0),
    }));
  };

  // Reset to Default Benchmarks
  const resetToBenchmarks = () => {
    selectCrop(selectedCropId);
    setScenario({ fertilizerDelta: 0, laborDelta: 0, yieldDelta: 0, priceDelta: 0 });
    triggerHUD('Costs & Yields reset to Agronomy Benchmarks');
  };

  // Base Mathematical Computations
  const totalCost = useMemo(() => {
    return Object.values(costs).reduce((sum, c) => sum + (Number(c) || 0), 0);
  }, [costs]);

  const costPerAcre = acreage > 0 ? Math.round(totalCost / acreage) : 0;
  const expectedRevenue = Math.round(expectedYield * sellingPrice);
  const revenuePerAcre = acreage > 0 ? Math.round(expectedRevenue / acreage) : 0;
  const netProfit = expectedRevenue - totalCost;
  const profitPerAcre = acreage > 0 ? Math.round(netProfit / acreage) : 0;
  const roiPercentage = totalCost > 0 ? Number(((netProfit / totalCost) * 100).toFixed(1)) : 0;
  const breakEvenPrice = expectedYield > 0 ? Math.round(totalCost / expectedYield) : 0;
  const breakEvenYield = sellingPrice > 0 ? Number((totalCost / sellingPrice).toFixed(1)) : 0;
  const breakEvenYieldPerAcre = acreage > 0 && sellingPrice > 0 ? Number((breakEvenYield / acreage).toFixed(1)) : 0;

  // Scenario Simulator Computations
  const scenarioResults = useMemo(() => {
    const adjFertCost = costs.fertilizer * (1 + scenario.fertilizerDelta / 100);
    const adjLaborCost = costs.labor * (1 + scenario.laborDelta / 100);
    const adjTotalCost = totalCost - costs.fertilizer - costs.labor + adjFertCost + adjLaborCost;

    const adjYield = expectedYield * (1 + scenario.yieldDelta / 100);
    const adjPrice = sellingPrice * (1 + scenario.priceDelta / 100);
    const adjRevenue = Math.round(adjYield * adjPrice);
    const adjProfit = Math.round(adjRevenue - adjTotalCost);
    const adjRoi = adjTotalCost > 0 ? Number(((adjProfit / adjTotalCost) * 100).toFixed(1)) : 0;
    const profitDifference = adjProfit - netProfit;

    return {
      adjTotalCost: Math.round(adjTotalCost),
      adjRevenue,
      adjProfit,
      adjRoi,
      profitDifference,
    };
  }, [costs, totalCost, expectedYield, sellingPrice, scenario, netProfit]);

  // Risk Rating Calculation
  const riskAnalysis = useMemo(() => {
    // If break-even price is > 85% of selling price or profit is negative
    if (netProfit <= 0 || (breakEvenPrice > sellingPrice * 0.85)) {
      return {
        level: 'HIGH',
        color: 'text-rose-400 bg-rose-500/20 border-rose-400/40',
        message: 'High vulnerability to input cost escalation or price drop. Break-even margin is tight.',
      };
    }
    if (breakEvenPrice > sellingPrice * 0.65 || roiPercentage < 25) {
      return {
        level: 'MODERATE',
        color: 'text-amber-400 bg-amber-500/20 border-amber-400/40',
        message: 'Moderate profitability buffer. Recommended to hedge transport and labor peaks.',
      };
    }
    return {
      level: 'LOW',
      color: 'text-emerald-400 bg-emerald-500/20 border-emerald-400/40',
      message: 'Strong profitability cushion. Low break-even threshold allows resilient market returns.',
    };
  }, [netProfit, breakEvenPrice, sellingPrice, roiPercentage]);

  return (
    <AnalyticsContext.Provider
      value={{
        allCrops: CROP_ECONOMICS_DATA,
        selectedCropId,
        selectedCropMeta,
        liveMandiData,
        acreage,
        costs,
        expectedYield,
        sellingPrice,
        scenario,
        travelHUDMessage,
        // Computed
        totalCost,
        costPerAcre,
        expectedRevenue,
        revenuePerAcre,
        netProfit,
        profitPerAcre,
        roiPercentage,
        breakEvenPrice,
        breakEvenYield,
        breakEvenYieldPerAcre,
        scenarioResults,
        riskAnalysis,
        // Actions
        selectCrop,
        updateAcreage,
        updateCostItem,
        setExpectedYield,
        setSellingPrice,
        setScenario,
        resetToBenchmarks,
      }}
    >
      {children}
    </AnalyticsContext.Provider>
  );
};

export const useAnalytics = () => {
  const ctx = useContext(AnalyticsContext);
  if (!ctx) throw new Error('useAnalytics must be used within AnalyticsProvider');
  return ctx;
};
