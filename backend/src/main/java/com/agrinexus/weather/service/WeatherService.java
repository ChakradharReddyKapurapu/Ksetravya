package com.agrinexus.weather.service;

import com.agrinexus.exception.BadRequestException;
import com.agrinexus.exception.ResourceNotFoundException;
import com.agrinexus.exception.UnauthorizedException;
import com.agrinexus.farm.entity.Farm;
import com.agrinexus.farm.repository.FarmRepository;
import com.agrinexus.user.User;
import com.agrinexus.user.UserRepository;
import com.agrinexus.weather.cache.WeatherCacheManager;
import com.agrinexus.weather.client.WeatherProvider;
import com.agrinexus.weather.config.WeatherProperties;
import com.agrinexus.weather.dto.WeatherDailyForecast;
import com.agrinexus.weather.dto.WeatherForecastResponse;
import com.agrinexus.weather.dto.WeatherResponse;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class WeatherService {

    private final WeatherProvider weatherProvider;
    private final WeatherCacheManager cacheManager;
    private final WeatherProperties properties;
    private final UserRepository userRepository;
    private final FarmRepository farmRepository;

    private static final Map<String, double[]> DISTRICT_COORDINATES = Map.ofEntries(
            Map.entry("tirupati", new double[]{13.6288, 79.4192}),
            Map.entry("guntur", new double[]{16.3067, 80.4365}),
            Map.entry("vijayawada", new double[]{16.5062, 80.6480}),
            Map.entry("ntr", new double[]{16.5062, 80.6480}),
            Map.entry("kurnool", new double[]{15.8281, 78.0373}),
            Map.entry("nellore", new double[]{14.4426, 79.9865}),
            Map.entry("spsr nellore", new double[]{14.4426, 79.9865}),
            Map.entry("kadapa", new double[]{14.4673, 78.8242}),
            Map.entry("ysr kadapa", new double[]{14.4673, 78.8242}),
            Map.entry("chittoor", new double[]{13.2172, 79.1003}),
            Map.entry("anantapur", new double[]{14.6819, 77.6006}),
            Map.entry("visakhapatnam", new double[]{17.6868, 83.2185}),
            Map.entry("east godavari", new double[]{17.0005, 81.8040}),
            Map.entry("west godavari", new double[]{16.7107, 81.0952}),
            Map.entry("krishna", new double[]{16.1809, 81.1303}),
            Map.entry("hyderabad", new double[]{17.3850, 78.4867}),
            Map.entry("bengaluru", new double[]{12.9716, 77.5946})
    );

    public WeatherService(WeatherProvider weatherProvider, WeatherCacheManager cacheManager, WeatherProperties properties, UserRepository userRepository, FarmRepository farmRepository) {
        this.weatherProvider = weatherProvider;
        this.cacheManager = cacheManager;
        this.properties = properties;
        this.userRepository = userRepository;
        this.farmRepository = farmRepository;
    }

    public WeatherResponse getCurrentWeather(Double latitude, Double longitude, String locationName, String district, String state) {
        if (latitude == null || longitude == null) {
            throw new BadRequestException("Latitude and Longitude must be provided.");
        }

        String cacheKey = String.format("curr_%.2f_%.2f", latitude, longitude);
        Optional<WeatherResponse> cached = cacheManager.getCurrent(cacheKey, properties.getCurrentTtlMinutes());
        if (cached.isPresent()) {
            return cached.get();
        }

        Optional<WeatherResponse> liveOpt = weatherProvider.getCurrentWeather(latitude, longitude, locationName, district, state);
        if (liveOpt.isPresent()) {
            WeatherResponse live = liveOpt.get();
            cacheManager.putCurrent(cacheKey, live);
            return live;
        }

        // Check stale cache
        Optional<WeatherResponse> staleOpt = cacheManager.getStaleCurrent(cacheKey);
        if (staleOpt.isPresent()) {
            return staleOpt.get();
        }

        // Fallback default response when provider is offline
        return generateFallbackCurrentWeather(latitude, longitude, locationName, district, state);
    }

    public WeatherResponse getLocationWeather(String district, String state, String location) {
        double[] coords = resolveCoordinates(district, location);
        String locName = location != null ? location : (district != null ? district : "Regional Farmland");
        return getCurrentWeather(coords[0], coords[1], locName, district, state);
    }

    @Transactional(readOnly = true)
    public WeatherResponse getFarmWeather(String farmerEmail) {
        User user = userRepository.findByEmail(farmerEmail.toLowerCase().trim())
                .orElseThrow(() -> new UnauthorizedException("Authenticated farmer not found"));

        Farm farm = farmRepository.findByUserId(user.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Farm profile not configured for user. Please setup farm profile first."));

        String district = farm.getDistrict();
        String location = farm.getLocation();
        String state = farm.getState();

        double[] coords = resolveCoordinates(district, location);
        String locName = farm.getFarmName() + " (" + farm.getLocation() + ")";
        return getCurrentWeather(coords[0], coords[1], locName, district, state);
    }

    public WeatherForecastResponse getForecast(Double latitude, Double longitude, Integer days, String locationName, String district, String state) {
        if (latitude == null || longitude == null) {
            throw new BadRequestException("Latitude and Longitude must be provided.");
        }

        int forecastDays = days != null ? Math.min(Math.max(days, 1), 14) : 7;
        String cacheKey = String.format("fc_%.2f_%.2f_%d", latitude, longitude, forecastDays);

        Optional<WeatherForecastResponse> cached = cacheManager.getForecast(cacheKey, properties.getForecastTtlMinutes());
        if (cached.isPresent()) {
            return cached.get();
        }

        Optional<WeatherForecastResponse> liveOpt = weatherProvider.getForecast(latitude, longitude, forecastDays, locationName, district, state);
        if (liveOpt.isPresent()) {
            WeatherForecastResponse live = liveOpt.get();
            cacheManager.putForecast(cacheKey, live);
            return live;
        }

        Optional<WeatherForecastResponse> staleOpt = cacheManager.getStaleForecast(cacheKey);
        if (staleOpt.isPresent()) {
            return staleOpt.get();
        }

        return generateFallbackForecast(latitude, longitude, forecastDays, locationName, district, state);
    }

    @Transactional(readOnly = true)
    public WeatherForecastResponse getFarmForecast(String farmerEmail, Integer days) {
        User user = userRepository.findByEmail(farmerEmail.toLowerCase().trim())
                .orElseThrow(() -> new UnauthorizedException("Authenticated farmer not found"));

        Farm farm = farmRepository.findByUserId(user.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Farm profile not configured for user. Please setup farm profile first."));

        String district = farm.getDistrict();
        String location = farm.getLocation();
        String state = farm.getState();

        double[] coords = resolveCoordinates(district, location);
        String locName = farm.getFarmName() + " (" + farm.getLocation() + ")";
        return getForecast(coords[0], coords[1], days, locName, district, state);
    }

    private double[] resolveCoordinates(String district, String location) {
        if (district != null) {
            String key = district.trim().toLowerCase();
            if (DISTRICT_COORDINATES.containsKey(key)) {
                return DISTRICT_COORDINATES.get(key);
            }
        }
        if (location != null) {
            String locKey = location.trim().toLowerCase();
            for (Map.Entry<String, double[]> entry : DISTRICT_COORDINATES.entrySet()) {
                if (locKey.contains(entry.getKey())) {
                    return entry.getValue();
                }
            }
        }
        // Default to Guntur / Amaravati agricultural basin
        return new double[]{16.3067, 80.4365};
    }

    private WeatherResponse generateFallbackCurrentWeather(double lat, double lon, String locationName, String district, String state) {
        return new WeatherResponse(
                locationName != null ? locationName : String.format("%.2f, %.2f", lat, lon),
                district,
                state,
                lat,
                lon,
                29.5,
                32.0,
                65,
                0.0,
                10,
                14.0,
                190.0,
                "clear",
                "Clear & Sunny",
                "Normal agricultural weather conditions.",
                "☀️",
                Instant.now(),
                "Fallback Weather Node",
                false,
                true,
                true
        );
    }

    private WeatherForecastResponse generateFallbackForecast(double lat, double lon, int days, String locationName, String district, String state) {
        List<WeatherDailyForecast> forecasts = new ArrayList<>();
        LocalDate today = LocalDate.now();
        for (int i = 0; i < days; i++) {
            forecasts.add(new WeatherDailyForecast(
                    today.plusDays(i),
                    23.0 + (i % 3),
                    34.0 + (i % 2),
                    60,
                    15,
                    0.0,
                    "partly_cloudy",
                    "Partly Cloudy",
                    "🌤️",
                    14.0
            ));
        }

        return new WeatherForecastResponse(
                locationName != null ? locationName : String.format("%.2f, %.2f", lat, lon),
                district,
                state,
                lat,
                lon,
                forecasts,
                Instant.now(),
                "Fallback Forecast Node",
                false,
                true,
                true
        );
    }
}
