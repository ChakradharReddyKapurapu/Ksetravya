package com.agrinexus.weather.dto;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.Instant;

public class WeatherErrorResponse {

    private boolean available = false;
    private String message;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss'Z'", timezone = "UTC")
    private Instant timestamp = Instant.now();

    public WeatherErrorResponse() {
    }

    public WeatherErrorResponse(String message) {
        this.available = false;
        this.message = message;
        this.timestamp = Instant.now();
    }

    public boolean isAvailable() { return available; }
    public void setAvailable(boolean available) { this.available = available; }
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
    public Instant getTimestamp() { return timestamp; }
    public void setTimestamp(Instant timestamp) { this.timestamp = timestamp; }
}
