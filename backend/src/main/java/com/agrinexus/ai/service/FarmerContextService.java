package com.agrinexus.ai.service;

import com.agrinexus.ai.dto.FarmerContextDto;
import com.agrinexus.exception.ResourceNotFoundException;
import com.agrinexus.farm.dto.FarmResponse;
import com.agrinexus.farm.service.FarmService;
import com.agrinexus.user.User;
import com.agrinexus.user.UserRepository;
import com.agrinexus.weather.dto.WeatherResponse;
import com.agrinexus.weather.service.WeatherService;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class FarmerContextService {

    private final UserRepository userRepository;
    private final FarmService farmService;
    private final WeatherService weatherService;

    public FarmerContextService(
            UserRepository userRepository,
            FarmService farmService,
            WeatherService weatherService) {
        this.userRepository = userRepository;
        this.farmService = farmService;
        this.weatherService = weatherService;
    }

    public FarmerContextDto getFarmerContext(String farmerEmail) {
        User farmer = userRepository.findByEmail(farmerEmail)
                .orElseThrow(() -> new ResourceNotFoundException("Farmer not found with email: " + farmerEmail));

        FarmResponse farm = null;
        try {
            farm = farmService.getFarmByEmail(farmerEmail);
        } catch (Exception e) {
            // Farm profile optional
        }

        WeatherResponse weather = null;
        try {
            weather = weatherService.getFarmWeather(farmerEmail);
        } catch (Exception e) {
            try {
                weather = weatherService.getLocationWeather("Guntur", "Andhra Pradesh", "Tenali");
            } catch (Exception ex) {
                // Weather service fallback
            }
        }

        String season = determineCurrentSeason(LocalDate.now().getMonthValue());

        List<String> activeCrops = new ArrayList<>();
        if (farm != null && farm.getCurrentCrop() != null && !farm.getCurrentCrop().trim().isEmpty()) {
            activeCrops.add(farm.getCurrentCrop().trim());
        } else {
            activeCrops.add("Paddy");
            activeCrops.add("Cotton");
        }

        return new FarmerContextDto(
                farmer.getId(),
                farmer.getFullName(),
                farmer.getEmail(),
                farmer.getPhone(),
                farm,
                weather,
                season,
                activeCrops
        );
    }

    private String determineCurrentSeason(int month) {
        if (month >= 6 && month <= 10) {
            return "Kharif";
        } else if (month >= 11 || month <= 3) {
            return "Rabi";
        } else {
            return "Zaid";
        }
    }
}
