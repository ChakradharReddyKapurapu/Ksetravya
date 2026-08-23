package com.agrinexus.weather.dto;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

public class WeatherForecastResponse {

    private String location;
    private String district;
    private String state;
    private Double latitude;
    private Double longitude;
    private List<WeatherDailyForecast> forecasts = new ArrayList<>();

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss'Z'", timezone = "UTC")
    private Instant retrievedAt;

    private String source;
    private boolean cached;
    private boolean stale;
    private boolean available = true;

    public WeatherForecastResponse() {
    }

    public WeatherForecastResponse(String location, String district, String state, Double latitude, Double longitude, List<WeatherDailyForecast> forecasts, Instant retrievedAt, String source, boolean cached, boolean stale, boolean available) {
        this.location = location;
        this.district = district;
        this.state = state;
        this.latitude = latitude;
        this.longitude = longitude;
        this.forecasts = forecasts != null ? forecasts : new ArrayList<>();
        this.retrievedAt = retrievedAt != null ? retrievedAt : Instant.now();
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
    public List<WeatherDailyForecast> getForecasts() { return forecasts; }
    public void setForecasts(List<WeatherDailyForecast> forecasts) { this.forecasts = forecasts; }
    public Instant getRetrievedAt() { return retrievedAt; }
    public void setRetrievedAt(Instant retrievedAt) { this.retrievedAt = retrievedAt; }
    public String getSource() { return source; }
    public void setSource(String source) { this.source = source; }
    public boolean isCached() { return cached; }
    public void setCached(boolean cached) { this.cached = cached; }
    public boolean isStale() { return stale; }
    public void setStale(boolean stale) { this.stale = stale; }
    public boolean isAvailable() { return available; }
    public void setAvailable(boolean available) { this.available = available; }
}
