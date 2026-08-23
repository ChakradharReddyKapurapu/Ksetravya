import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  AP_DISTRICT_PRESETS,
  fetchLiveWeather,
  searchLocations,
} from '../services/weatherService';

const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  // Active selected location (Default: Tirupati, Andhra Pradesh matching reference image)
  const [currentLocation, setCurrentLocation] = useState(AP_DISTRICT_PRESETS[0]);
  const [liveWeatherData, setLiveWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  // Active 3D Weather Environment Condition:
  // 'thunderstorm' | 'rain' | 'cloudy' | 'partly_cloudy' | 'clear' | 'fog' | 'windy' | 'night'
  const [activeWeatherCondition, setActiveWeatherCondition] = useState('thunderstorm');
  const [isManualOverride, setIsManualOverride] = useState(false);

  // Search & Geolocation state
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [travelHUDMessage, setTravelHUDMessage] = useState(null);

  const triggerHUD = (msg) => {
    setTravelHUDMessage(msg);
    setTimeout(() => setTravelHUDMessage(null), 3000);
  };

  // Load weather for a given lat/lon
  const loadWeather = useCallback(async (lat, lon, locName = 'Selected Location') => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const data = await fetchLiveWeather(lat, lon);
      setLiveWeatherData(data);

      if (!isManualOverride) {
        setActiveWeatherCondition(data.current.parsedCondition.condition);
      }
      triggerHUD(`Live Weather Updated for ${locName}`);
    } catch (err) {
      console.error('Weather load error:', err);
      setErrorMessage('Live weather is temporarily unavailable. Please check your connection or retry.');
    } finally {
      setIsLoading(false);
    }
  }, [isManualOverride]);

  // Initial load for default location
  useEffect(() => {
    loadWeather(currentLocation.lat, currentLocation.lon, `${currentLocation.name}, ${currentLocation.state}`);
  }, [currentLocation, loadWeather]);

  // Request Browser Geolocation
  const useBrowserLocation = () => {
    if (!navigator.geolocation) {
      triggerHUD('Geolocation is not supported by your browser.');
      return;
    }

    triggerHUD('Requesting Browser Location Access...');
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const userLoc = {
          id: 'user-current-loc',
          name: 'My Current Location',
          district: 'Live GPS',
          state: 'Andhra Pradesh / Local',
          lat: latitude,
          lon: longitude,
        };
        setCurrentLocation(userLoc);
        loadWeather(latitude, longitude, 'Your Current Location');
      },
      (err) => {
        console.warn('Geolocation denied/failed:', err);
        triggerHUD('Location access was not provided. Continuing with selected city.');
      },
      { timeout: 10000, enableHighAccuracy: false }
    );
  };

  // Select City Preset or Search Result
  const selectCity = (cityObj) => {
    setCurrentLocation(cityObj);
    setSearchQuery('');
    setSearchResults([]);
    loadWeather(cityObj.lat, cityObj.lon, `${cityObj.name}, ${cityObj.state || ''}`);
  };

  // City Search Handler
  const handleSearchInput = async (q) => {
    setSearchQuery(q);
    if (!q || q.trim().length < 2) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const results = await searchLocations(q);
      setSearchResults(results);
    } catch (err) {
      console.warn('Search geocoding error:', err);
    } finally {
      setIsSearching(false);
    }
  };

  // Manual Environment Condition Switcher (For test & preview)
  const setConditionOverride = (conditionKey) => {
    setIsManualOverride(true);
    setActiveWeatherCondition(conditionKey);
    triggerHUD(`Atmosphere Engine: Set to ${conditionKey.toUpperCase()}`);
  };

  const resetToLiveCondition = () => {
    setIsManualOverride(false);
    if (liveWeatherData) {
      setActiveWeatherCondition(liveWeatherData.current.parsedCondition.condition);
      triggerHUD('Atmosphere Engine: Synced with Live Weather API');
    }
  };

  return (
    <WeatherContext.Provider
      value={{
        currentLocation,
        liveWeatherData,
        isLoading,
        errorMessage,
        activeWeatherCondition,
        isManualOverride,
        searchQuery,
        searchResults,
        isSearching,
        travelHUDMessage,
        districtPresets: AP_DISTRICT_PRESETS,
        useBrowserLocation,
        selectCity,
        handleSearchInput,
        setConditionOverride,
        resetToLiveCondition,
        reloadWeather: () => loadWeather(currentLocation.lat, currentLocation.lon, currentLocation.name),
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => {
  const ctx = useContext(WeatherContext);
  if (!ctx) throw new Error('useWeather must be used within WeatherProvider');
  return ctx;
};
