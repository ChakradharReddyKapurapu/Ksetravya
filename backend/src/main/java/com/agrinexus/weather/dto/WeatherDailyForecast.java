package com.agrinexus.weather.dto;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDate;

public class WeatherDailyForecast {

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate forecastDate;

    private Double minTemperature;
    private Double maxTemperature;
    private Integer humidity;
    private Integer precipitationProbability;
    private Double precipitation;
    private String condition;
    private String conditionLabel;
    private String icon;
    private Double maxWindSpeed;

    public WeatherDailyForecast() {
    }

    public WeatherDailyForecast(LocalDate forecastDate, Double minTemperature, Double maxTemperature, Integer humidity, Integer precipitationProbability, Double precipitation, String condition, String conditionLabel, String icon, Double maxWindSpeed) {
        this.forecastDate = forecastDate;
        this.minTemperature = minTemperature;
        this.maxTemperature = maxTemperature;
        this.humidity = humidity;
        this.precipitationProbability = precipitationProbability;
        this.precipitation = precipitation;
        this.condition = condition;
        this.conditionLabel = conditionLabel;
        this.icon = icon;
        this.maxWindSpeed = maxWindSpeed;
    }

    public LocalDate getForecastDate() { return forecastDate; }
    public void setForecastDate(LocalDate forecastDate) { this.forecastDate = forecastDate; }
    public Double getMinTemperature() { return minTemperature; }
    public void setMinTemperature(Double minTemperature) { this.minTemperature = minTemperature; }
    public Double getMaxTemperature() { return maxTemperature; }
    public void setMaxTemperature(Double maxTemperature) { this.maxTemperature = maxTemperature; }
    public Integer getHumidity() { return humidity; }
    public void setHumidity(Integer humidity) { this.humidity = humidity; }
    public Integer getPrecipitationProbability() { return precipitationProbability; }
    public void setPrecipitationProbability(Integer precipitationProbability) { this.precipitationProbability = precipitationProbability; }
    public Double getPrecipitation() { return precipitation; }
    public void setPrecipitation(Double precipitation) { this.precipitation = precipitation; }
    public String getCondition() { return condition; }
    public void setCondition(String condition) { this.condition = condition; }
    public String getConditionLabel() { return conditionLabel; }
    public void setConditionLabel(String conditionLabel) { this.conditionLabel = conditionLabel; }
    public String getIcon() { return icon; }
    public void setIcon(String icon) { this.icon = icon; }
    public Double getMaxWindSpeed() { return maxWindSpeed; }
    public void setMaxWindSpeed(Double maxWindSpeed) { this.maxWindSpeed = maxWindSpeed; }
}
