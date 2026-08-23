import React, { createContext, useContext, useState, useEffect } from 'react';
import { checkWebGLSupport } from '../utils/webglDetector';

const PerformanceContext = createContext();

export const PerformanceProvider = ({ children }) => {
  // Quality options: 'immersive' | 'balanced' | 'performance'
  const [qualityMode, setQualityMode] = useState(() => {
    return localStorage.getItem('agri_nexus_quality') || 'immersive';
  });

  // Reduced motion detection
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [webglInfo, setWebglInfo] = useState({ supported: true, version: 2, renderer: '' });
  const [force2DFallback, setForce2DFallback] = useState(false);

  // 3D Scene Controls & Selected IoT Hotspot
  const [selectedHotspot, setSelectedHotspot] = useState(null);
  const [timeOfDay, setTimeOfDay] = useState('golden'); // 'golden', 'morning', 'sunrise', 'night'

  // Dynamic Weather System: 'sunny' | 'rainy' | 'cloudy'
  const [weatherState, setWeatherState] = useState('sunny');

  // Unified Environmental Wind: speed multiplier (0.5 to 2.5) & gust phase
  const [windSpeed, setWindSpeed] = useState(1.2);

  // Hovered Ecosystem Feature (for 3D Camera focus & object highlight):
  // null | 'tools' | 'jobs' | 'land' | 'marketplace' | 'weather' | 'analytics' | 'transport'
  const [hoveredFeature, setHoveredFeature] = useState(null);

  // 5 Live Ecosystem Tour Presets (matches reference UI)
  // 'panorama' | 'machinery' | 'river' | 'fields' | 'solar'
  const [activeTour, setActiveTour] = useState('panorama');

  // Track global page scroll progress (0 to 1)
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    // Check WebGL support
    const info = checkWebGLSupport();
    setWebglInfo(info);
    if (!info.supported) {
      setForce2DFallback(true);
    }

    // Check system reduced motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);

    // Track scroll
    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      mediaQuery.removeEventListener('change', handler);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem('agri_nexus_quality', qualityMode);
    document.body.classList.remove('perf-immersive', 'perf-balanced', 'perf-performance');
    document.body.classList.add(`perf-${qualityMode}`);
  }, [qualityMode]);

  // Cycle weather on user request
  const cycleWeather = () => {
    setWeatherState((prev) => {
      if (prev === 'sunny') return 'rainy';
      if (prev === 'rainy') return 'cloudy';
      return 'sunny';
    });
  };

  // Derived graphics settings based on quality mode
  const graphicsConfig = {
    immersive: {
      dpr: [1, 2],
      shadows: true,
      shadowMapSize: 2048,
      particleCount: 180,
      birdsCount: 18,
      waveResolution: 64,
      treeDensity: 1.0,
      droneActive: true,
    },
    balanced: {
      dpr: [1, 1.5],
      shadows: true,
      shadowMapSize: 1024,
      particleCount: 90,
      birdsCount: 10,
      waveResolution: 32,
      treeDensity: 0.7,
      droneActive: true,
    },
    performance: {
      dpr: [1, 1],
      shadows: false,
      shadowMapSize: 512,
      particleCount: 0,
      birdsCount: 6,
      waveResolution: 16,
      treeDensity: 0.4,
      droneActive: false,
    },
  }[qualityMode];

  return (
    <PerformanceContext.Provider
      value={{
        qualityMode,
        setQualityMode,
        graphicsConfig,
        prefersReducedMotion,
        webglInfo,
        force2DFallback,
        setForce2DFallback,
        selectedHotspot,
        setSelectedHotspot,
        timeOfDay,
        setTimeOfDay,
        weatherState,
        setWeatherState,
        cycleWeather,
        windSpeed,
        setWindSpeed,
        hoveredFeature,
        setHoveredFeature,
        activeTour,
        setActiveTour,
        scrollProgress,
      }}
    >
      {children}
    </PerformanceContext.Provider>
  );
};

export const usePerformance = () => {
  const ctx = useContext(PerformanceContext);
  if (!ctx) throw new Error('usePerformance must be used within PerformanceProvider');
  return ctx;
};
