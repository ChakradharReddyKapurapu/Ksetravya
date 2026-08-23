package com.agrinexus.farm.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

public class FarmCreateRequest {

    @Size(max = 120, message = "Farm name must not exceed 120 characters")
    private String farmName;

    @NotBlank(message = "Location / village name is required")
    @Size(max = 200, message = "Location must not exceed 200 characters")
    private String location;

    @Size(max = 100, message = "District must not exceed 100 characters")
    private String district;

    @NotBlank(message = "State is required")
    @Size(max = 100, message = "State must not exceed 100 characters")
    private String state;

    @Size(max = 10, message = "Pincode must not exceed 10 characters")
    private String pincode;

    @NotNull(message = "Farm area is required")
    @Positive(message = "Farm area must be greater than zero")
    private Double area;

    @Size(max = 30, message = "Area unit must not exceed 30 characters")
    private String areaUnit = "Acres";

    @Size(max = 80, message = "Soil type must not exceed 80 characters")
    private String soilType;

    @Size(max = 60, message = "Water availability must not exceed 60 characters")
    private String waterAvailability;

    @Size(max = 60, message = "Irrigation type must not exceed 60 characters")
    private String irrigationType;

    @Size(max = 100, message = "Current crop must not exceed 100 characters")
    private String currentCrop;

    @Size(max = 50, message = "Season must not exceed 50 characters")
    private String season;

    public FarmCreateRequest() {
    }

    public FarmCreateRequest(String farmName, String location, String district, String state, String pincode, Double area, String areaUnit, String soilType, String waterAvailability, String irrigationType, String currentCrop, String season) {
        this.farmName = farmName;
        this.location = location;
        this.district = district;
        this.state = state;
        this.pincode = pincode;
        this.area = area;
        this.areaUnit = areaUnit != null ? areaUnit : "Acres";
        this.soilType = soilType;
        this.waterAvailability = waterAvailability;
        this.irrigationType = irrigationType;
        this.currentCrop = currentCrop;
        this.season = season;
    }

    public String getFarmName() {
        return farmName;
    }

    public void setFarmName(String farmName) {
        this.farmName = farmName;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getDistrict() {
        return district;
    }

    public void setDistrict(String district) {
        this.district = district;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getPincode() {
        return pincode;
    }

    public void setPincode(String pincode) {
        this.pincode = pincode;
    }

    public Double getArea() {
        return area;
    }

    public void setArea(Double area) {
        this.area = area;
    }

    public String getAreaUnit() {
        return areaUnit;
    }

    public void setAreaUnit(String areaUnit) {
        this.areaUnit = areaUnit;
    }

    public String getSoilType() {
        return soilType;
    }

    public void setSoilType(String soilType) {
        this.soilType = soilType;
    }

    public String getWaterAvailability() {
        return waterAvailability;
    }

    public void setWaterAvailability(String waterAvailability) {
        this.waterAvailability = waterAvailability;
    }

    public String getIrrigationType() {
        return irrigationType;
    }

    public void setIrrigationType(String irrigationType) {
        this.irrigationType = irrigationType;
    }

    public String getCurrentCrop() {
        return currentCrop;
    }

    public void setCurrentCrop(String currentCrop) {
        this.currentCrop = currentCrop;
    }

    public String getSeason() {
        return season;
    }

    public void setSeason(String season) {
        this.season = season;
    }
}
