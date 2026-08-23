package com.agrinexus.weather.dto;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.Instant;
import java.time.LocalDateTime;

public class WeatherResponse {

    private String location;
    private String district;
    private String state;
    private Double latitude;
    private Double longitude;
    private Double temperature;
    private Double feelsLike;
    private Integer humidity;
    private Double precipitation;
    private Integer precipitationProbability;
    private Double windSpeed;
    private Double windDirection;
    private String condition;
    private String conditionLabel;
    private String conditionDescription;
    private String icon;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss'Z'", timezone = "UTC")
    private Instant observedAt;

    private String source;
    private boolean cached;
    private boolean stale;
    private boolean available = true;

    public WeatherResponse() {
    }

    public WeatherResponse(String location, String district, String state, Double latitude, Double longitude, Double temperature, Double feelsLike, Integer humidity, Double precipitation, Integer precipitationProbability, Double windSpeed, Double windDirection, String condition, String conditionLabel, String conditionDescription, String icon, Instant observedAt, String source, boolean cached, boolean stale, boolean available) {
        this.location = location;
        this.district = district;
        this.state = state;
        this.latitude = latitude;
        this.longitude = longitude;
        this.temperature = temperature;
        this.feelsLike = feelsLike;
        this.humidity = humidity;
        this.precipitation = precipitation;
        this.precipitationProbability = precipitationProbability;
        this.windSpeed = windSpeed;
        this.windDirection = windDirection;
        this.condition = condition;
        this.conditionLabel = conditionLabel;
        this.conditionDescription = conditionDescription;
        this.icon = icon;
        this.observedAt = observedAt != null ? observedAt : Instant.now();
        this.source = source;
        this.cached = cached;
        this.stale = stale;
        this.available = available;
    }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }
    public String getDistrict() { return district; }
    public void setDistrict(String district) { this.district = district; }
    public String getState() { return state; }
    public void setState(String state) { this.state = state; }
    public Double getLatitude() { return latitude; }
    public void setLatitude(Double latitude) { this.latitude = latitude; }
    public Double getLongitude() { return longitude; }
    public void setLongitude(Double longitude) { this.longitude = longitude; }
    public Double getTemperature() { return temperature; }
    public void setTemperature(Double temperature) { this.temperature = temperature; }
    public Double getFeelsLike() { return feelsLike; }
    public void setFeelsLike(Double feelsLike) { this.feelsLike = feelsLike; }
    public Integer getHumidity() { return humidity; }
    public void setHumidity(Integer humidity) { this.humidity = humidity; }
    public Double getPrecipitation() { return precipitation; }
    public void setPrecipitation(Double precipitation) { this.precipitation = precipitation; }
    public Integer getPrecipitationProbability() { return precipitationProbability; }
    public void setPrecipitationProbability(Integer precipitationProbability) { this.precipitationProbability = precipitationProbability; }
    public Double getWindSpeed() { return windSpeed; }
    public void setWindSpeed(Double windSpeed) { this.windSpeed = windSpeed; }
    public Double getWindDirection() { return windDirection; }
    public void setWindDirection(Double windDirection) { this.windDirection = windDirection; }
    public String getCondition() { return condition; }
    public void setCondition(String condition) { this.condition = condition; }
    public String getConditionLabel() { return conditionLabel; }
    public void setConditionLabel(String conditionLabel) { this.conditionLabel = conditionLabel; }
    public String getConditionDescription() { return conditionDescription; }
    public void setConditionDescription(String conditionDescription) { this.conditionDescription = conditionDescription; }
    public String getIcon() { return icon; }
    public void setIcon(String icon) { this.icon = icon; }
    public Instant getObservedAt() { return observedAt; }
    public void setObservedAt(Instant observedAt) { this.observedAt = observedAt; }
    public String getSource() { return source; }
    public void setSource(String source) { this.source = source; }
    public boolean isCached() { return cached; }
    public void setCached(boolean cached) { this.cached = cached; }
    public boolean isStale() { return stale; }
    public void setStale(boolean stale) { this.stale = stale; }
    public boolean isAvailable() { return available; }
    public void setAvailable(boolean available) { this.available = available; }
}
