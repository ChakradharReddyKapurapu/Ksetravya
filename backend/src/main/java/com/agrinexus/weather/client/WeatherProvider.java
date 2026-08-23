package com.agrinexus.weather.client;

import com.agrinexus.weather.dto.WeatherForecastResponse;
import com.agrinexus.weather.dto.WeatherResponse;

import java.util.Optional;

public interface WeatherProvider {

    Optional<WeatherResponse> getCurrentWeather(double latitude, double longitude, String locationName, String district, String state);

    Optional<WeatherForecastResponse> getForecast(double latitude, double longitude, int days, String locationName, String district, String state);
}
