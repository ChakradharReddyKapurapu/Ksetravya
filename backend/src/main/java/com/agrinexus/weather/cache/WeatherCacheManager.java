package com.agrinexus.weather.cache;

import com.agrinexus.weather.dto.WeatherForecastResponse;
import com.agrinexus.weather.dto.WeatherResponse;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class WeatherCacheManager {

    private final Map<String, CacheEntry<WeatherResponse>> currentCache = new ConcurrentHashMap<>();
    private final Map<String, CacheEntry<WeatherForecastResponse>> forecastCache = new ConcurrentHashMap<>();

    public Optional<WeatherResponse> getCurrent(String key, int ttlMinutes) {
        CacheEntry<WeatherResponse> entry = currentCache.get(key);
        if (entry == null) return Optional.empty();

        if (entry.isExpired(ttlMinutes)) {
            return Optional.empty();
        }

        WeatherResponse copy = entry.data();
        copy.setCached(true);
        copy.setStale(false);
        return Optional.of(copy);
    }

    public Optional<WeatherResponse> getStaleCurrent(String key) {
        CacheEntry<WeatherResponse> entry = currentCache.get(key);
        if (entry == null) return Optional.empty();

        WeatherResponse copy = entry.data();
        copy.setCached(true);
        copy.setStale(true);
        return Optional.of(copy);
    }

    public void putCurrent(String key, WeatherResponse data) {
        currentCache.put(key, new CacheEntry<>(data, Instant.now()));
    }

    public Optional<WeatherForecastResponse> getForecast(String key, int ttlMinutes) {
        CacheEntry<WeatherForecastResponse> entry = forecastCache.get(key);
        if (entry == null) return Optional.empty();

        if (entry.isExpired(ttlMinutes)) {
            return Optional.empty();
        }

        WeatherForecastResponse copy = entry.data();
        copy.setCached(true);
        copy.setStale(false);
        return Optional.of(copy);
    }

    public Optional<WeatherForecastResponse> getStaleForecast(String key) {
        CacheEntry<WeatherForecastResponse> entry = forecastCache.get(key);
        if (entry == null) return Optional.empty();

        WeatherForecastResponse copy = entry.data();
        copy.setCached(true);
        copy.setStale(true);
        return Optional.of(copy);
    }

    public void putForecast(String key, WeatherForecastResponse data) {
        forecastCache.put(key, new CacheEntry<>(data, Instant.now()));
    }

    public void clear() {
        currentCache.clear();
        forecastCache.clear();
    }

    public record CacheEntry<T>(T data, Instant createdAt) {
        public boolean isExpired(int ttlMinutes) {
            return Instant.now().isAfter(createdAt.plusSeconds(ttlMinutes * 60L));
        }
    }
}
