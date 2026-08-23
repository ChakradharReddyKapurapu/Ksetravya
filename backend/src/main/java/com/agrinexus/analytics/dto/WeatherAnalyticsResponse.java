package com.agrinexus.analytics.dto;

import com.agrinexus.weather.dto.WeatherDailyForecast;
import com.agrinexus.weather.dto.WeatherResponse;

import java.util.ArrayList;
import java.util.List;

public class WeatherAnalyticsResponse {

    private String location;
    private Double currentTemperature;
    private Double feelsLike;
    private Integer humidity;
    private Double rainfall;
    private Double windSpeed;
    private String condition;
    private String conditionLabel;
    private String icon;
    private List<WeatherDailyForecast> forecastSummary = new ArrayList<>();
    private List<WeatherInsightResponse> insights = new ArrayList<>();
    private String source;
    private boolean cached;
    private boolean stale;

    public WeatherAnalyticsResponse() {
    }

    public WeatherAnalyticsResponse(String location, Double currentTemperature, Double feelsLike, Integer humidity, Double rainfall, Double windSpeed, String condition, String conditionLabel, String icon, List<WeatherDailyForecast> forecastSummary, List<WeatherInsightResponse> insights, String source, boolean cached, boolean stale) {
        this.location = location;
        this.currentTemperature = currentTemperature;
        this.feelsLike = feelsLike;
        this.humidity = humidity;
        this.rainfall = rainfall;
        this.windSpeed = windSpeed;
        this.condition = condition;
        this.conditionLabel = conditionLabel;
        this.icon = icon;
        this.forecastSummary = forecastSummary != null ? forecastSummary : new ArrayList<>();
        this.insights = insights != null ? insights : new ArrayList<>();
        this.source = source;
        this.cached = cached;
        this.stale = stale;
    }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }
    public Double getCurrentTemperature() { return currentTemperature; }
    public void setCurrentTemperature(Double currentTemperature) { this.currentTemperature = currentTemperature; }
    public Double getTemperature() { return currentTemperature; }
    public Double getFeelsLike() { return feelsLike; }
    public void setFeelsLike(Double feelsLike) { this.feelsLike = feelsLike; }
    public Integer getHumidity() { return humidity; }
    public void setHumidity(Integer humidity) { this.humidity = humidity; }
    public Double getRainfall() { return rainfall; }
    public void setRainfall(Double rainfall) { this.rainfall = rainfall; }
    public Double getWindSpeed() { return windSpeed; }
    public void setWindSpeed(Double windSpeed) { this.windSpeed = windSpeed; }
    public String getCondition() { return condition; }
    public void setCondition(String condition) { this.condition = condition; }
    public String getConditionLabel() { return conditionLabel; }
    public void setConditionLabel(String conditionLabel) { this.conditionLabel = conditionLabel; }
    public String getIcon() { return icon; }
    public void setIcon(String icon) { this.icon = icon; }
    public List<WeatherDailyForecast> getForecastSummary() { return forecastSummary; }
    public void setForecastSummary(List<WeatherDailyForecast> forecastSummary) { this.forecastSummary = forecastSummary; }
    public List<WeatherInsightResponse> getInsights() { return insights; }
    public void setInsights(List<WeatherInsightResponse> insights) { this.insights = insights; }
    public String getSource() { return source; }
    public void setSource(String source) { this.source = source; }
    public boolean isCached() { return cached; }
    public void setCached(boolean cached) { this.cached = cached; }
    public boolean isStale() { return stale; }
    public void setStale(boolean stale) { this.stale = stale; }
}
