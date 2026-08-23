package com.agrinexus.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;

@Component
public class RateLimitingFilter extends OncePerRequestFilter {

    private static final Logger log = LoggerFactory.getLogger(RateLimitingFilter.class);

    @Value("${agrinexus.rate-limiting.enabled:true}")
    private boolean rateLimitingEnabled;

    private final Map<String, RequestBucket> buckets = new ConcurrentHashMap<>();

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain) throws ServletException, IOException {

        if (!rateLimitingEnabled) {
            filterChain.doFilter(request, response);
            return;
        }

        String path = request.getRequestURI();
        String clientIp = getClientIP(request);

        int maxAllowed = resolveMaxAllowedRequests(path);

        if (maxAllowed > 0) {
            String bucketKey = clientIp + ":" + getEndpointCategory(path);
            RequestBucket bucket = buckets.computeIfAbsent(bucketKey, k -> new RequestBucket());

            if (!bucket.allowRequest(maxAllowed)) {
                log.warn("Rate limit exceeded for IP {} on path {}", clientIp, path);
                response.setStatus(429); // HTTP 429 Too Many Requests
                response.setContentType("application/json");
                response.getWriter().write("""
                        {
                          "success": false,
                          "message": "Rate limit exceeded. Please wait a moment before trying again.",
                          "code": "RATE_LIMIT_EXCEEDED"
                        }
                        """);
                return;
            }
        }

        filterChain.doFilter(request, response);
    }

    private int resolveMaxAllowedRequests(String path) {
        if (path.startsWith("/api/auth/login")) return 15;
        if (path.startsWith("/api/auth/register")) return 10;
        if (path.startsWith("/api/ai/")) return 60;
        if (path.startsWith("/api/payments/")) return 40;
        return 0;
    }

    private String getEndpointCategory(String path) {
        if (path.startsWith("/api/auth/")) return "AUTH";
        if (path.startsWith("/api/ai/")) return "AI";
        if (path.startsWith("/api/payments/")) return "PAYMENT";
        return "GENERAL";
    }

    private String getClientIP(HttpServletRequest request) {
        String xfHeader = request.getHeader("X-Forwarded-For");
        if (xfHeader == null || xfHeader.isEmpty()) {
            return request.getRemoteAddr();
        }
        return xfHeader.split(",")[0];
    }

    private static class RequestBucket {
        private long windowStartTime = System.currentTimeMillis();
        private final AtomicInteger requestCount = new AtomicInteger(0);

        public synchronized boolean allowRequest(int maxLimit) {
            long now = System.currentTimeMillis();
            if (now - windowStartTime > 60000) { // 1 minute window
                windowStartTime = now;
                requestCount.set(0);
            }
            return requestCount.incrementAndGet() <= maxLimit;
        }
    }
}
