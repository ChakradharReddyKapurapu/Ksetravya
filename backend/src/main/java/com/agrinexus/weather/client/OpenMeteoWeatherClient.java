package com.agrinexus.weather.client;

import com.agrinexus.weather.config.WeatherProperties;
import com.agrinexus.weather.dto.WeatherDailyForecast;
import com.agrinexus.weather.dto.WeatherForecastResponse;
import com.agrinexus.weather.dto.WeatherResponse;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

import java.time.Instant;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Component
public class OpenMeteoWeatherClient implements WeatherProvider {

    private static final Logger log = LoggerFactory.getLogger(OpenMeteoWeatherClient.class);

    private final RestClient restClient;
    private final WeatherProperties properties;
    private final ObjectMapper objectMapper;

    public OpenMeteoWeatherClient(RestClient restClient, WeatherProperties properties, ObjectMapper objectMapper) {
        this.restClient = restClient;
        this.properties = properties;
        this.objectMapper = objectMapper;
    }

    @Override
    public Optional<WeatherResponse> getCurrentWeather(double latitude, double longitude, String locationName, String district, String state) {
        try {
            String url = String.format(
                    "%s?latitude=%.4f&longitude=%.4f&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,wind_direction_10m&timezone=auto",
                    properties.getBaseUrl(), latitude, longitude
            );

            String responseBody = restClient.get()
                    .uri(url)
                    .retrieve()
                    .body(String.class);

            if (responseBody == null || responseBody.isEmpty()) {
                return Optional.empty();
            }

            JsonNode root = objectMapper.readTree(responseBody);
            JsonNode current = root.path("current");
            if (current.isMissingNode()) {
                return Optional.empty();
            }

            int wmoCode = current.path("weather_code").asInt(0);
            WmoInterpretation interp = interpretWmoCode(wmoCode);

            WeatherResponse resp = new WeatherResponse(
                    locationName != null ? locationName : String.format("%.2f, %.2f", latitude, longitude),
                    district,
                    state,
                    latitude,
                    longitude,
                    current.path("temperature_2m").asDouble(28.0),
                    current.path("apparent_temperature").asDouble(30.0),
                    current.path("relative_humidity_2m").asInt(65),
                    current.path("precipitation").asDouble(0.0),
                    0,
                    current.path("wind_speed_10m").asDouble(12.0),
                    current.path("wind_direction_10m").asDouble(180.0),
                    interp.condition,
                    interp.label,
                    interp.description,
                    interp.icon,
                    Instant.now(),
                    "Open-Meteo REST API (Asia/Kolkata)",
                    false,
                    false,
                    true
            );

            return Optional.of(resp);
        } catch (Exception e) {
            log.warn("Weather provider request failed for coordinates [{}, {}]: {}", latitude, longitude, e.getMessage());
            return Optional.empty();
        }
    }

    @Override
    public Optional<WeatherForecastResponse> getForecast(double latitude, double longitude, int days, String locationName, String district, String state) {
        try {
            int forecastDays = Math.min(Math.max(days, 1), 14);
            String url = String.format(
                    "%s?latitude=%.4f&longitude=%.4f&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max,wind_speed_10m_max&forecast_days=%d&timezone=auto",
                    properties.getBaseUrl(), latitude, longitude, forecastDays
            );

            String responseBody = restClient.get()
                    .uri(url)
                    .retrieve()
                    .body(String.class);

            if (responseBody == null || responseBody.isEmpty()) {
                return Optional.empty();
            }

            JsonNode root = objectMapper.readTree(responseBody);
            JsonNode daily = root.path("daily");
            if (daily.isMissingNode()) {
                return Optional.empty();
            }

            JsonNode times = daily.path("time");
            JsonNode maxTemps = daily.path("temperature_2m_max");
            JsonNode minTemps = daily.path("temperature_2m_min");
            JsonNode precipSums = daily.path("precipitation_sum");
            JsonNode precipProbs = daily.path("precipitation_probability_max");
            JsonNode weatherCodes = daily.path("weather_code");
            JsonNode maxWinds = daily.path("wind_speed_10m_max");

            List<WeatherDailyForecast> forecasts = new ArrayList<>();
            for (int i = 0; i < times.size(); i++) {
                LocalDate date = LocalDate.parse(times.get(i).asText());
                int code = weatherCodes.get(i).asInt(0);
                WmoInterpretation interp = interpretWmoCode(code);

                WeatherDailyForecast df = new WeatherDailyForecast(
                        date,
                        minTemps.get(i).asDouble(22.0),
                        maxTemps.get(i).asDouble(34.0),
                        60,
                        precipProbs.get(i).asInt(0),
                        precipSums.get(i).asDouble(0.0),
                        interp.condition,
                        interp.label,
                        interp.icon,
                        maxWinds.get(i).asDouble(15.0)
                );
                forecasts.add(df);
            }

            WeatherForecastResponse resp = new WeatherForecastResponse(
                    locationName != null ? locationName : String.format("%.2f, %.2f", latitude, longitude),
                    district,
                    state,
                    latitude,
                    longitude,
                    forecasts,
                    Instant.now(),
                    "Open-Meteo Daily REST API (Asia/Kolkata)",
                    false,
                    false,
                    true
            );

            return Optional.of(resp);
        } catch (Exception e) {
            log.warn("Weather forecast request failed for coordinates [{}, {}]: {}", latitude, longitude, e.getMessage());
            return Optional.empty();
        }
    }

    public static WmoInterpretation interpretWmoCode(int code) {
        if (code == 0) {
            return new WmoInterpretation("clear", "Clear Sky", "Sunny, dry weather with bright sunlight.", "☀️");
        } else if (code == 1 || code == 2) {
            return new WmoInterpretation("partly_cloudy", "Partly Cloudy", "Scattered clouds with intermittent sunlight.", "🌤️");
        } else if (code == 3) {
            return new WmoInterpretation("cloudy", "Overcast", "Continuous cloud cover across the field canopy.", "☁️");
        } else if (code == 45 || code == 48) {
            return new WmoInterpretation("fog", "Fog & Mist", "High atmospheric humidity with reduced visibility.", "🌫️");
        } else if (code >= 51 && code <= 55) {
            return new WmoInterpretation("drizzle", "Light Drizzle", "Intermittent fine drizzle over fields.", "🌦️");
        } else if (code >= 61 && code <= 65) {
            return new WmoInterpretation("rain", "Moderate Rain", "Sustained agricultural rainfall.", "🌧️");
        } else if (code >= 80 && code <= 82) {
            return new WmoInterpretation("showers", "Rain Showers", "Passing heavy shower clouds.", "🌦️");
        } else if (code >= 95) {
            return new WmoInterpretation("thunderstorm", "Thunderstorm", "Convective thunderstorm with gusty winds.", "⛈️");
        }
        return new WmoInterpretation("clear", "Fair Weather", "Normal field conditions.", "☀️");
    }

    public record WmoInterpretation(String condition, String label, String description, String icon) {}
}
