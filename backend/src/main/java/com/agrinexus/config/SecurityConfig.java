package com.agrinexus.config;

import com.agrinexus.auth.CustomUserDetailsService;
import com.agrinexus.auth.JwtAuthenticationEntryPoint;
import com.agrinexus.auth.JwtAuthenticationFilter;
import com.agrinexus.security.RateLimitingFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfigurationSource;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    private final CustomUserDetailsService userDetailsService;
    private final JwtAuthenticationEntryPoint unauthorizedHandler;
    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final RateLimitingFilter rateLimitingFilter;
    private final CorsConfigurationSource corsConfigurationSource;

    public SecurityConfig(CustomUserDetailsService userDetailsService,
                          JwtAuthenticationEntryPoint unauthorizedHandler,
                          JwtAuthenticationFilter jwtAuthenticationFilter,
                          RateLimitingFilter rateLimitingFilter,
                          CorsConfigurationSource corsConfigurationSource) {
        this.userDetailsService = userDetailsService;
        this.unauthorizedHandler = unauthorizedHandler;
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
        this.rateLimitingFilter = rateLimitingFilter;
        this.corsConfigurationSource = corsConfigurationSource;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService);
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .cors(cors -> cors.configurationSource(corsConfigurationSource))
                .csrf(AbstractHttpConfigurer::disable)
                .headers(headers -> headers
                        .frameOptions(frame -> frame.deny())
                        .contentTypeOptions(contentType -> {})
                        .httpStrictTransportSecurity(hsts -> hsts.includeSubDomains(true).maxAgeInSeconds(31536000))
                )
                .exceptionHandling(exception -> exception.authenticationEntryPoint(unauthorizedHandler))
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                        // Public Health & Actuator endpoints
                        .requestMatchers("/", "/api/health", "/actuator/health", "/actuator/info").permitAll()
                        // Public Auth endpoints (registration & login only)
                        .requestMatchers(org.springframework.http.HttpMethod.POST, "/api/auth/register", "/api/auth/login").permitAll()
                        // Public API documentation & error path
                        .requestMatchers("/v3/api-docs/**", "/swagger-ui/**", "/swagger-ui.html", "/error").permitAll()
                        // Public Tools catalog & details browsing
                        .requestMatchers(org.springframework.http.HttpMethod.GET, "/api/tools", "/api/tools/search", "/api/tools/{id:[0-9]+}").permitAll()
                        // Public Seeds catalog & crop/season browsing
                        .requestMatchers(org.springframework.http.HttpMethod.GET, "/api/seeds", "/api/seeds/search", "/api/seeds/crop/**", "/api/seeds/season/**", "/api/seeds/{id:[0-9]+}").permitAll()
                        // Public Crop Protection advisories & symptom search
                        .requestMatchers(org.springframework.http.HttpMethod.GET, "/api/crop-protection", "/api/crop-protection/search", "/api/crop-protection/symptoms", "/api/crop-protection/{id:[0-9]+}").permitAll()
                        // Public Marketplace products catalog & search
                        .requestMatchers(org.springframework.http.HttpMethod.GET, "/api/marketplace/products", "/api/marketplace/products/search", "/api/marketplace/products/{id:[0-9]+}").permitAll()
                        // Public Jobs catalog & search
                        .requestMatchers(org.springframework.http.HttpMethod.GET, "/api/jobs", "/api/jobs/search", "/api/jobs/{id:[0-9]+}").permitAll()
                        // Public Land Lease catalog & search
                        .requestMatchers(org.springframework.http.HttpMethod.GET, "/api/land", "/api/land/search", "/api/land/{id:[0-9]+}").permitAll()
                        // Public Weather endpoints
                        .requestMatchers(org.springframework.http.HttpMethod.GET, "/api/weather/current", "/api/weather/current/location", "/api/weather/forecast").permitAll()
                        // Public Market Price endpoints
                        .requestMatchers(org.springframework.http.HttpMethod.GET, "/api/market-prices", "/api/market-prices/search", "/api/market-prices/{id:[0-9]+}", "/api/market-prices/crop/**", "/api/market-prices/location", "/api/market-prices/history", "/api/market-prices/trend", "/api/market-prices/compare", "/api/market-prices/summary").permitAll()
                        // Public Analytics endpoints
                        .requestMatchers(org.springframework.http.HttpMethod.GET, "/api/analytics/crops", "/api/analytics/crops/compare", "/api/analytics/crops/{crop}/cost", "/api/analytics/crops/{crop}/revenue", "/api/analytics/crops/{crop}/profit", "/api/analytics/profitability", "/api/analytics/market/**").permitAll()
                        .requestMatchers(org.springframework.http.HttpMethod.POST, "/api/analytics/scenario").permitAll()
                        // Admin endpoints
                        .requestMatchers("/api/admin/**").hasRole("ADMIN")
                        // Crop Protection Mutations (Admin only)
                        .requestMatchers(org.springframework.http.HttpMethod.POST, "/api/crop-protection").hasRole("ADMIN")
                        .requestMatchers(org.springframework.http.HttpMethod.PATCH, "/api/crop-protection/**").hasRole("ADMIN")
                        .requestMatchers(org.springframework.http.HttpMethod.DELETE, "/api/crop-protection/**").hasRole("ADMIN")
                        // Protected Auth & Domain Endpoints
                        .requestMatchers("/api/auth/me").authenticated()
                        .requestMatchers("/api/users/**").authenticated()
                        .requestMatchers("/api/farms/**").authenticated()
                        .requestMatchers("/api/tools/**").authenticated()
                        .requestMatchers("/api/seeds/recommended-for-farm", "/api/seeds/my").authenticated()
                        .requestMatchers("/api/seeds/**").authenticated()
                        .requestMatchers("/api/crop-protection/relevant-for-farm", "/api/crop-protection/recommendations").authenticated()
                        .requestMatchers("/api/crop-protection/**").authenticated()
                        .requestMatchers("/api/marketplace/cart/**").authenticated()
                        .requestMatchers("/api/marketplace/orders/**").authenticated()
                        .requestMatchers("/api/marketplace/**").authenticated()
                        .requestMatchers("/api/jobs/recommended", "/api/jobs/my", "/api/jobs/applications/**").authenticated()
                        .requestMatchers("/api/jobs/**").authenticated()
                        .requestMatchers("/api/workers/**").authenticated()
                        .requestMatchers("/api/land/my", "/api/land/applications/**").authenticated()
                        .requestMatchers("/api/land/**").authenticated()
                        .requestMatchers("/api/weather/farm", "/api/weather/farm/forecast").authenticated()
                        .requestMatchers("/api/market-prices/farm").authenticated()
                        .requestMatchers(org.springframework.http.HttpMethod.POST, "/api/market-prices").authenticated()
                        .requestMatchers("/api/analytics/dashboard", "/api/analytics/farm", "/api/analytics/weather", "/api/analytics/weather/insights", "/api/analytics/crop-recommendations").authenticated()
                        .requestMatchers("/api/analytics/**").authenticated()
                        .requestMatchers("/ws/**").permitAll()
                        .requestMatchers("/api/notifications/**").authenticated()
                        .requestMatchers("/api/conversations/**").authenticated()
                        .requestMatchers(org.springframework.http.HttpMethod.POST, "/api/payments/webhook").permitAll()
                        .requestMatchers("/api/payments/**").authenticated()
                        .requestMatchers("/api/worker/earnings").authenticated()
                        .requestMatchers("/api/attachments/**").authenticated()
                        .requestMatchers("/api/ai/**").authenticated()
                        .requestMatchers("/api/**").authenticated()
                        .anyRequest().authenticated()
                );

        http.authenticationProvider(authenticationProvider());
        http.addFilterBefore(rateLimitingFilter, UsernamePasswordAuthenticationFilter.class);
        http.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
