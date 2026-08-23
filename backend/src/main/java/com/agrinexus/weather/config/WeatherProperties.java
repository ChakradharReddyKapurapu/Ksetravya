package com.agrinexus.weather.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "weather")
public class WeatherProperties {

    private String apiKey;
    private String baseUrl = "https://api.open-meteo.com/v1/forecast";
    private String provider = "open-meteo";
    private int currentTtlMinutes = 10;
    private int forecastTtlMinutes = 30;

    public String getApiKey() { return apiKey; }
    public void setApiKey(String apiKey) { this.apiKey = apiKey; }
    public String getBaseUrl() { return baseUrl; }
    public void setBaseUrl(String baseUrl) { this.baseUrl = baseUrl; }
    public String getProvider() { return provider; }
    public void setProvider(String provider) { this.provider = provider; }
    public int getCurrentTtlMinutes() { return currentTtlMinutes; }
    public void setCurrentTtlMinutes(int currentTtlMinutes) { this.currentTtlMinutes = currentTtlMinutes; }
    public int getForecastTtlMinutes() { return forecastTtlMinutes; }
    public void setForecastTtlMinutes(int forecastTtlMinutes) { this.forecastTtlMinutes = forecastTtlMinutes; }
}
