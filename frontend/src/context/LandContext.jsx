import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { landService } from '../features/land/services/landService';
import {
  SOIL_TYPES,
  WATER_SOURCES,
  DEMO_LAND_PARCELS,
  DISTRICT_LEASE_BENCHMARKS,
  ENVIRONMENT_PRESETS,
} from '../features/land/data/demoLandData';
import { useWorld } from './WorldContext';

const LandContext = createContext();

export const LandProvider = ({ children }) => {
  const { myCrop, setMyCrop } = useWorld();

  // Dynamic Land parcels from API
  const [landParcels, setLandParcels] = useState(DEMO_LAND_PARCELS);
  const [loadingLand, setLoadingLand] = useState(false);

  // Mode: 'cultivator' (Find Land to Lease) | 'owner' (List Farmland)
  const [activeRole, setActiveRole] = useState('cultivator');
  const [activeSoilType, setActiveSoilType] = useState('all');
  const [activeWaterSource, setActiveWaterSource] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedParcel, setSelectedParcel] = useState(null);
  const [isListLandModalOpen, setIsListLandModalOpen] = useState(false);
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [isCalculatorModalOpen, setIsCalculatorModalOpen] = useState(false);
  const [travelHUDMessage, setTravelHUDMessage] = useState(null);

  const [activeEnvironment, setActiveEnvironment] = useState('composite');

  const [currentPropertyHUD, setCurrentPropertyHUD] = useState({
    title: 'River-Side Fertile Farm with Drip Irrigation and Borewell',
    landType: 'FERTILE',
    waterAccess: 'AVAILABLE',
    borewell: 'OPERATIONAL',
    irrigation: 'DRIP',
    river: 'AVAILABLE (Krishna Basin)',
    price: '₹35,000 / YEAR',
    acreage: 15,
    hasRiver: true,
    hasBorewell: true,
    hasDrip: true,
    hasCanal: false,
  });

  const [myInquiries, setMyInquiries] = useState([]);
  const [myListedLands, setMyListedLands] = useState([]);

  const refreshLand = async () => {
    setLoadingLand(true);
    try {
      const data = await landService.getLandParcels({
        soilType: activeSoilType,
        waterSource: activeWaterSource,
        search: searchQuery,
      });
      setLandParcels(data);

      const inqs = await landService.getMyLandInquiries();
      if (inqs && inqs.length > 0) {
        setMyInquiries(inqs);
      }
    } catch (e) {
      console.error('Failed to fetch land parcels from API', e);
    } finally {
      setLoadingLand(false);
    }
  };

  useEffect(() => {
    refreshLand();
  }, [activeSoilType, activeWaterSource, searchQuery]);

  const triggerHUD = (msg) => {
    setTravelHUDMessage(msg);
    setTimeout(() => setTravelHUDMessage(null), 2500);
  };

  // Switch 3D Environment Preset (from left selector or buttons)
  const switchEnvironment = (envId) => {
    const preset = ENVIRONMENT_PRESETS.find((p) => p.id === envId) || ENVIRONMENT_PRESETS[0];
    setActiveEnvironment(envId);

    // Update Property HUD telemetry
    if (envId === 'dry') {
      setCurrentPropertyHUD({
        title: 'Arid Red Sandy Loam Farmland (Rainfed)',
        landType: 'DRYLAND',
        waterAccess: 'RAINFED',
        borewell: 'NOT INSTALLED',
        irrigation: 'RAINFED / POND',
        river: 'NO RIVER',
        price: '₹14,000 / YEAR',
        acreage: 20,
        hasRiver: false,
        hasBorewell: false,
        hasDrip: false,
        hasCanal: false,
      });
      triggerHUD('3D Engine: Arid Farmland with Warm Sunlight & Dust Particles');
    } else if (envId === 'canal') {
      setCurrentPropertyHUD({
        title: 'Canal Irrigated Alluvial Farmland',
        landType: 'ALLUVIAL FERTILE',
        waterAccess: 'CANAL SLUICE ACTIVE',
        borewell: 'STANDBY',
        irrigation: 'CANAL GRAVITY',
        river: 'CANAL NETWORK',
        price: '₹28,000 / YEAR',
        acreage: 10,
        hasRiver: false,
        hasBorewell: false,
        hasDrip: false,
        hasCanal: true,
      });
      triggerHUD('3D Engine: Flowing Concrete Irrigation Canal Sluice');
    } else if (envId === 'fertile') {
      setCurrentPropertyHUD({
        title: 'Green Cultivated Farmland with Tractor',
        landType: 'FERTILE REGUR',
        waterAccess: 'AVAILABLE',
        borewell: 'OPERATIONAL',
        irrigation: 'FURROW / BASIN',
        river: 'WATER CHANNEL',
        price: '₹30,000 / YEAR',
        acreage: 12,
        hasRiver: false,
        hasBorewell: true,
        hasDrip: false,
        hasCanal: false,
      });
      triggerHUD('3D Engine: Rich Green Crop Fields & Distant Tractor');
    } else if (envId === 'river') {
      setCurrentPropertyHUD({
        title: 'River-Side Farmland with Waterfowl & Stream',
        landType: 'FERTILE RIVER BASIN',
        waterAccess: 'DIRECT RIVER ACCESS',
        borewell: 'NOT REQUIRED',
        irrigation: 'RIVER LIFT / FLOOD',
        river: 'FLOWING RIVERFRONT',
        price: '₹38,000 / YEAR',
        acreage: 12,
        hasRiver: true,
        hasBorewell: false,
        hasDrip: false,
        hasCanal: false,
      });
      triggerHUD('3D Engine: Active Flowing River with Water Reflections');
    } else if (envId === 'borewell') {
      setCurrentPropertyHUD({
        title: 'Farmland with Operational 3-Phase Borewell Pump',
        landType: 'FERTILE',
        waterAccess: 'GROUNDWATER',
        borewell: 'OPERATIONAL (10HP)',
        irrigation: 'CONCRETE FLUME',
        river: 'NO RIVER',
        price: '₹26,000 / YEAR',
        acreage: 10,
        hasRiver: false,
        hasBorewell: true,
        hasDrip: false,
        hasCanal: false,
      });
      triggerHUD('3D Engine: Electric Motor Pump Gushing into Irrigation Flume');
    } else if (envId === 'drip') {
      setCurrentPropertyHUD({
        title: 'Modern Precision Drip Irrigated Farm',
        landType: 'HIGH-TECH FERTILE',
        waterAccess: 'AVAILABLE',
        borewell: 'CONNECTED',
        irrigation: 'PRECISION DRIP (NETAFIM)',
        river: 'BOREWELL SOURCE',
        price: '₹42,000 / YEAR',
        acreage: 8,
        hasRiver: false,
        hasBorewell: true,
        hasDrip: true,
        hasCanal: false,
      });
      triggerHUD('3D Engine: Precision Drip Tubing with Water Droplet Emitters');
    } else {
      // Composite Master View (Matching Reference Image media_1787412387318.jpg)
      setCurrentPropertyHUD({
        title: 'River-Side Fertile Farm with Drip Irrigation and Borewell',
        landType: 'FERTILE',
        waterAccess: 'AVAILABLE',
        borewell: 'OPERATIONAL',
        irrigation: 'DRIP',
        river: 'RIVER KRISHNA (1.2 KM)',
        price: '₹35,000 / YEAR',
        acreage: 15,
        hasRiver: true,
        hasBorewell: true,
        hasDrip: true,
        hasCanal: false,
      });
      triggerHUD('3D Engine: Composite Master View (River + Drip + Borewell)');
    }
  };

  // When a user selects or inspects a land parcel, sync the 3D environment!
  const handleSelectParcel = (parcel) => {
    setSelectedParcel(parcel);
    if (!parcel) return;

    if (parcel.environmentType) {
      setActiveEnvironment(parcel.environmentType);
    } else if (parcel.hasRiver && parcel.hasBorewell && parcel.hasDrip) {
      setActiveEnvironment('composite');
    } else if (parcel.hasRiver) {
      setActiveEnvironment('river');
    } else if (parcel.hasDrip) {
      setActiveEnvironment('drip');
    } else if (parcel.hasCanal) {
      setActiveEnvironment('canal');
    } else if (parcel.hasBorewell) {
      setActiveEnvironment('borewell');
    } else if (parcel.soilType === 'red_loam' && parcel.waterSource === 'all') {
      setActiveEnvironment('dry');
    } else {
      setActiveEnvironment('fertile');
    }

    // Update Property HUD Telemetry with parcel data
    setCurrentPropertyHUD({
      title: parcel.title,
      landType: parcel.soilTypeName.toUpperCase().split(' ')[0] || 'FERTILE',
      waterAccess: parcel.waterSourceName ? 'AVAILABLE' : 'RAINFED',
      borewell: parcel.hasBorewell ? 'OPERATIONAL' : 'STANDBY',
      irrigation: parcel.hasDrip ? 'DRIP' : parcel.hasCanal ? 'CANAL' : 'FLOOD',
      river: parcel.hasRiver ? 'AVAILABLE' : 'NO RIVER',
      price: `₹${parcel.annualRentPerAcre.toLocaleString()} / YEAR`,
      acreage: parcel.acreage,
      hasRiver: !!parcel.hasRiver,
      hasBorewell: !!parcel.hasBorewell,
      hasDrip: !!parcel.hasDrip,
      hasCanal: !!parcel.hasCanal,
    });

    triggerHUD(`Configuring 3D Environment for: ${parcel.title.split('with')[0]}`);
  };

  const handleSearch = (q) => {
    setSearchQuery(q);
    const query = q.toLowerCase().trim();
    if (!query) return;

    if (query.includes('black') || query.includes('cotton')) {
      setActiveSoilType('black_soil');
      switchEnvironment('fertile');
    } else if (query.includes('dry') || query.includes('millet')) {
      setActiveSoilType('red_loam');
      switchEnvironment('dry');
    } else if (query.includes('canal')) {
      setActiveWaterSource('canal');
      switchEnvironment('canal');
    } else if (query.includes('river')) {
      setActiveWaterSource('river');
      switchEnvironment('river');
    } else if (query.includes('drip') || query.includes('tomato')) {
      setActiveWaterSource('drip_ready');
      switchEnvironment('drip');
    } else if (query.includes('borewell')) {
      setActiveWaterSource('borewell');
      switchEnvironment('borewell');
    }
  };

  // Cultivator submits lease inspection inquiry
  const submitLeaseInquiry = async (parcel, inquiryForm) => {
    try {
      await landService.applyForLand(parcel.id || parcel.realDbId, {
        proposedCrop: inquiryForm.proposedCrop || 'Rice / Cotton',
        durationYears: parseInt(inquiryForm.preferredTenure) || 3,
        notes: `${inquiryForm.name} (${inquiryForm.phone}): ${inquiryForm.message || ''}`,
      });
      refreshLand();
      triggerHUD(`Lease Inquiry Registered for ${parcel.acreage} Acres!`);
    } catch (e) {
      console.warn('API land inquiry failed, fallback to local state', e);
      const newInquiry = {
        inquiryId: `inq-${Date.now()}`,
        parcelId: parcel.id,
        parcelTitle: parcel.title,
        ownerName: parcel.ownerName,
        location: parcel.location,
        annualRent: `₹${parcel.annualRentPerAcre ? parcel.annualRentPerAcre.toLocaleString() : 35000} / Acre`,
        inquiryDate: 'Today',
        status: 'INQUIRY_SENT',
        cultivatorName: inquiryForm.name,
        phone: inquiryForm.phone,
        proposedCrop: inquiryForm.proposedCrop || 'Rice / Cotton',
        preferredTenure: inquiryForm.preferredTenure || '3 Years',
        message: inquiryForm.message,
      };
      setMyInquiries((prev) => [newInquiry, ...prev]);
      triggerHUD(`Lease Inquiry Registered for ${parcel.acreage} Acres!`);
    }
  };

  // Landowner lists new parcel
  const postNewLandListing = async (formData) => {
    try {
      await landService.listLand({
        title: formData.title,
        description: formData.description || `${formData.acreage} Acres farmland available for agricultural lease.`,
        location: formData.location,
        acreage: parseFloat(formData.acreage) || 10,
        annualRentPerAcre: parseFloat(formData.annualRentPerAcre) || 35000,
        soilType: formData.soilType || 'BLACK_COTTON',
        waterSource: formData.waterSource || 'RIVER_LIFT',
      });
      refreshLand();
      triggerHUD(`Farmland Parcel (${formData.acreage} Acres) Published on AGRI NEXUS!`);
    } catch (e) {
      console.warn('API land listing failed, fallback to local state', e);
      const newOwnerListing = {
        id: `land-custom-${Date.now()}`,
        title: formData.title,
        location: formData.location,
        acreage: formData.acreage,
        annualRentPerAcre: formData.annualRentPerAcre,
        waterSource: formData.waterSource,
        status: 'LISTED_VERIFIED',
        postedDate: 'Today',
        inquiriesCount: 0,
      };
      setMyListedLands((prev) => [newOwnerListing, ...prev]);
      triggerHUD(`Farmland Parcel (${formData.acreage} Acres) Published on AGRI NEXUS!`);
    }
  };

  // Filtered Parcels
  const filteredParcels = useMemo(() => {
    return landParcels.filter((parcel) => {
      if (activeSoilType !== 'all' && parcel.soilType !== activeSoilType) {
        return false;
      }
      if (activeWaterSource !== 'all' && parcel.waterSource !== activeWaterSource) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const match =
          parcel.title.toLowerCase().includes(q) ||
          parcel.location.toLowerCase().includes(q) ||
          parcel.district.toLowerCase().includes(q) ||
          parcel.ownerName.toLowerCase().includes(q) ||
          parcel.soilTypeName.toLowerCase().includes(q) ||
          parcel.suitableCrops.some((c) => c.toLowerCase().includes(q));
        if (!match) return false;
      }
      return true;
    });
  }, [activeSoilType, activeWaterSource, searchQuery]);

  return (
    <LandContext.Provider
      value={{
        activeRole,
        setActiveRole,
        activeSoilType,
        setActiveSoilType,
        activeWaterSource,
        setActiveWaterSource,
        searchQuery,
        setSearchQuery: handleSearch,
        selectedParcel,
        setSelectedParcel: handleSelectParcel,
        isListLandModalOpen,
        setIsListLandModalOpen,
        isInquiryModalOpen,
        setIsInquiryModalOpen,
        isCalculatorModalOpen,
        setIsCalculatorModalOpen,
        travelHUDMessage,
        activeEnvironment,
        currentPropertyHUD,
        switchEnvironment,
        environmentPresets: ENVIRONMENT_PRESETS,
        myInquiries,
        myListedLands,
        submitLeaseInquiry,
        postNewLandListing,
        filteredParcels,
        allSoilTypes: SOIL_TYPES,
        allWaterSources: WATER_SOURCES,
        allParcels: DEMO_LAND_PARCELS,
        leaseBenchmarks: DISTRICT_LEASE_BENCHMARKS,
      }}
    >
      {children}
    </LandContext.Provider>
  );
};

export const useLand = () => {
  const ctx = useContext(LandContext);
  if (!ctx) throw new Error('useLand must be used within LandProvider');
  return ctx;
};
