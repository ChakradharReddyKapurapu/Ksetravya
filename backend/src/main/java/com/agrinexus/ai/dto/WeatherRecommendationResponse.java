package com.agrinexus.ai.dto;

import java.util.List;

public class WeatherRecommendationResponse {

    private String location;
    private Double currentTemperature;
    private String weatherCondition;
    private List<String> immediateActionItems;
    private List<String> irrigationAdvice;
    private List<String> riskAlerts; // Heatwave, frost, heavy rain, pest outbreak
    private String sevenDayForecastSummary;

    public WeatherRecommendationResponse() {
    }

    public WeatherRecommendationResponse(String location, Double currentTemperature, String weatherCondition, List<String> immediateActionItems, List<String> irrigationAdvice, List<String> riskAlerts, String forecastSummary) {
        this.location = location;
        this.currentTemperature = currentTemperature;
        this.weatherCondition = weatherCondition;
        this.immediateActionItems = immediateActionItems;
        this.irrigationAdvice = irrigationAdvice;
        this.riskAlerts = riskAlerts;
        this.sevenDayForecastSummary = forecastSummary;
    }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public Double getCurrentTemperature() { return currentTemperature; }
    public void setCurrentTemperature(Double currentTemperature) { this.currentTemperature = currentTemperature; }

    public String getWeatherCondition() { return weatherCondition; }
    public void setWeatherCondition(String weatherCondition) { this.weatherCondition = weatherCondition; }

    public List<String> getImmediateActionItems() { return immediateActionItems; }
    public void setImmediateActionItems(List<String> immediateActionItems) { this.immediateActionItems = immediateActionItems; }

    public List<String> getIrrigationAdvice() { return irrigationAdvice; }
    public void setIrrigationAdvice(List<String> irrigationAdvice) { this.irrigationAdvice = irrigationAdvice; }

    public List<String> getRiskAlerts() { return riskAlerts; }
    public void setRiskAlerts(List<String> riskAlerts) { this.riskAlerts = riskAlerts; }

    public String getSevenDayForecastSummary() { return sevenDayForecastSummary; }
    public void setSevenDayForecastSummary(String forecastSummary) { this.sevenDayForecastSummary = forecastSummary; }
}
