package com.agrinexus.ai.dto;

import com.agrinexus.farm.dto.FarmResponse;
import com.agrinexus.weather.dto.WeatherResponse;

import java.util.List;

public class FarmerContextDto {

    private Long farmerId;
    private String farmerName;
    private String email;
    private String phone;
    private FarmResponse farm;
    private WeatherResponse currentWeather;
    private String season;
    private List<String> activeCrops;

    public FarmerContextDto() {
    }

    public FarmerContextDto(Long farmerId, String farmerName, String email, String phone, FarmResponse farm, WeatherResponse currentWeather, String season, List<String> activeCrops) {
        this.farmerId = farmerId;
        this.farmerName = farmerName;
        this.email = email;
        this.phone = phone;
        this.farm = farm;
        this.currentWeather = currentWeather;
        this.season = season;
        this.activeCrops = activeCrops;
    }

    public Long getFarmerId() { return farmerId; }
    public void setFarmerId(Long farmerId) { this.farmerId = farmerId; }

    public String getFarmerName() { return farmerName; }
    public void setFarmerName(String farmerName) { this.farmerName = farmerName; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public FarmResponse getFarm() { return farm; }
    public void setFarm(FarmResponse farm) { this.farm = farm; }

    public WeatherResponse getCurrentWeather() { return currentWeather; }
    public void setCurrentWeather(WeatherResponse currentWeather) { this.currentWeather = currentWeather; }

    public String getSeason() { return season; }
    public void setSeason(String season) { this.season = season; }

    public List<String> getActiveCrops() { return activeCrops; }
    public void setActiveCrops(List<String> activeCrops) { this.activeCrops = activeCrops; }
}
