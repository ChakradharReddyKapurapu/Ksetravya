package com.agrinexus.analytics.dto;

import com.agrinexus.farm.dto.FarmResponse;
import com.agrinexus.weather.dto.WeatherResponse;

import java.util.ArrayList;
import java.util.List;

public class FarmerDashboardResponse {

    private FarmResponse farm;
    private WeatherResponse weather;
    private List<CropAnalyticsResponse> cropAnalytics = new ArrayList<>();
    private List<CropRecommendationResponse> recommendations = new ArrayList<>();
    private List<WeatherInsightResponse> weatherInsights = new ArrayList<>();
    private String platformStatus = "OPERATIONAL";

    public FarmerDashboardResponse() {
    }

    public FarmerDashboardResponse(FarmResponse farm, WeatherResponse weather, List<CropAnalyticsResponse> cropAnalytics, List<CropRecommendationResponse> recommendations, List<WeatherInsightResponse> weatherInsights) {
        this.farm = farm;
        this.weather = weather;
        this.cropAnalytics = cropAnalytics != null ? cropAnalytics : new ArrayList<>();
        this.recommendations = recommendations != null ? recommendations : new ArrayList<>();
        this.weatherInsights = weatherInsights != null ? weatherInsights : new ArrayList<>();
    }

    public FarmResponse getFarm() { return farm; }
    public void setFarm(FarmResponse farm) { this.farm = farm; }
    public WeatherResponse getWeather() { return weather; }
    public void setWeather(WeatherResponse weather) { this.weather = weather; }
    public List<CropAnalyticsResponse> getCropAnalytics() { return cropAnalytics; }
    public void setCropAnalytics(List<CropAnalyticsResponse> cropAnalytics) { this.cropAnalytics = cropAnalytics; }
    public List<CropRecommendationResponse> getRecommendations() { return recommendations; }
    public void setRecommendations(List<CropRecommendationResponse> recommendations) { this.recommendations = recommendations; }
    public List<WeatherInsightResponse> getWeatherInsights() { return weatherInsights; }
    public void setWeatherInsights(List<WeatherInsightResponse> weatherInsights) { this.weatherInsights = weatherInsights; }
    public String getPlatformStatus() { return platformStatus; }
    public void setPlatformStatus(String platformStatus) { this.platformStatus = platformStatus; }
}
