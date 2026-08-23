package com.agrinexus.market.cache;

import org.springframework.stereotype.Component;

import java.time.Instant;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class MarketPriceCacheManager {

    private final Map<String, CacheEntry<Object>> cache = new ConcurrentHashMap<>();

    @SuppressWarnings("unchecked")
    public <T> Optional<T> get(String key, int ttlMinutes) {
        CacheEntry<Object> entry = cache.get(key);
        if (entry == null) return Optional.empty();

        if (entry.isExpired(ttlMinutes)) {
            return Optional.empty();
        }

        return Optional.of((T) entry.data());
    }

    public void put(String key, Object data) {
        cache.put(key, new CacheEntry<>(data, Instant.now()));
    }

    public void clear() {
        cache.clear();
    }

    public record CacheEntry<T>(T data, Instant createdAt) {
        public boolean isExpired(int ttlMinutes) {
            return Instant.now().isAfter(createdAt.plusSeconds(ttlMinutes * 60L));
        }
    }
}
