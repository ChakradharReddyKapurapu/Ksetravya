package com.agrinexus.weather.controller;

import com.agrinexus.auth.UserPrincipal;
import com.agrinexus.common.ApiResponse;
import com.agrinexus.weather.dto.WeatherForecastResponse;
import com.agrinexus.weather.dto.WeatherResponse;
import com.agrinexus.weather.service.WeatherService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/weather")
public class WeatherController {

    private final WeatherService weatherService;

    public WeatherController(WeatherService weatherService) {
        this.weatherService = weatherService;
    }

    @GetMapping("/current")
    public ResponseEntity<ApiResponse<WeatherResponse>> getCurrentWeather(
            @RequestParam(required = false) Double latitude,
            @RequestParam(required = false) Double longitude,
            @RequestParam(required = false) String location,
            @RequestParam(required = false) String district,
            @RequestParam(required = false) String state) {

        if (latitude == null || longitude == null) {
            // Default to Guntur/Amaravati if omitted
            latitude = 16.3067;
            longitude = 80.4365;
            if (location == null) location = "Guntur Agricultural Hub";
            if (district == null) district = "Guntur";
            if (state == null) state = "Andhra Pradesh";
        }

        WeatherResponse response = weatherService.getCurrentWeather(latitude, longitude, location, district, state);
        return ResponseEntity.ok(ApiResponse.success("Current weather observations retrieved", response));
    }

    @GetMapping("/current/location")
    public ResponseEntity<ApiResponse<WeatherResponse>> getLocationWeather(
            @RequestParam(required = false) String district,
            @RequestParam(required = false) String state,
            @RequestParam(required = false) String location) {

        WeatherResponse response = weatherService.getLocationWeather(district, state, location);
        return ResponseEntity.ok(ApiResponse.success("Location-specific weather observations retrieved", response));
    }

    @GetMapping("/farm")
    public ResponseEntity<ApiResponse<WeatherResponse>> getFarmWeather(
            @AuthenticationPrincipal UserPrincipal userPrincipal) {

        WeatherResponse response = weatherService.getFarmWeather(userPrincipal.getUsername());
        return ResponseEntity.ok(ApiResponse.success("Farm weather observations retrieved", response));
    }

    @GetMapping("/forecast")
    public ResponseEntity<ApiResponse<WeatherForecastResponse>> getForecast(
            @RequestParam(required = false) Double latitude,
            @RequestParam(required = false) Double longitude,
            @RequestParam(defaultValue = "7") Integer days,
            @RequestParam(required = false) String location,
            @RequestParam(required = false) String district,
            @RequestParam(required = false) String state) {

        if (latitude == null || longitude == null) {
            latitude = 16.3067;
            longitude = 80.4365;
            if (location == null) location = "Guntur Agricultural Hub";
            if (district == null) district = "Guntur";
            if (state == null) state = "Andhra Pradesh";
        }

        WeatherForecastResponse response = weatherService.getForecast(latitude, longitude, days, location, district, state);
        return ResponseEntity.ok(ApiResponse.success("Weather forecast retrieved", response));
    }

    @GetMapping("/farm/forecast")
    public ResponseEntity<ApiResponse<WeatherForecastResponse>> getFarmForecast(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @RequestParam(defaultValue = "7") Integer days) {

        WeatherForecastResponse response = weatherService.getFarmForecast(userPrincipal.getUsername(), days);
        return ResponseEntity.ok(ApiResponse.success("Farm weather forecast retrieved", response));
    }
}
