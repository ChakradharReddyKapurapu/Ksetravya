package com.agrinexus.farm.dto;

import com.agrinexus.farm.entity.Farm;
import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDateTime;

public class FarmResponse {

    private Long id;
    private Long userId;
    private String farmerName;
    private String farmerEmail;
    private String farmName;
    private String location;
    private String district;
    private String state;
    private String pincode;
    private Double area;
    private String areaUnit;
    private String soilType;
    private String waterAvailability;
    private String irrigationType;
    private String currentCrop;
    private String season;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime createdAt;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime updatedAt;

    public FarmResponse() {
    }

    public FarmResponse(Long id, Long userId, String farmerName, String farmerEmail, String farmName, String location, String district, String state, String pincode, Double area, String areaUnit, String soilType, String waterAvailability, String irrigationType, String currentCrop, String season, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.userId = userId;
        this.farmerName = farmerName;
        this.farmerEmail = farmerEmail;
        this.farmName = farmName;
        this.location = location;
        this.district = district;
        this.state = state;
        this.pincode = pincode;
        this.area = area;
        this.areaUnit = areaUnit;
        this.soilType = soilType;
        this.waterAvailability = waterAvailability;
        this.irrigationType = irrigationType;
        this.currentCrop = currentCrop;
        this.season = season;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public static FarmResponse fromEntity(Farm farm) {
        if (farm == null) return null;
        return new FarmResponse(
                farm.getId(),
                farm.getUser() != null ? farm.getUser().getId() : null,
                farm.getUser() != null ? farm.getUser().getFullName() : null,
                farm.getUser() != null ? farm.getUser().getEmail() : null,
                farm.getFarmName(),
                farm.getLocation(),
                farm.getDistrict(),
                farm.getState(),
                farm.getPincode(),
                farm.getArea(),
                farm.getAreaUnit(),
                farm.getSoilType(),
                farm.getWaterAvailability(),
                farm.getIrrigationType(),
                farm.getCurrentCrop(),
                farm.getSeason(),
                farm.getCreatedAt(),
                farm.getUpdatedAt()
        );
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getFarmerName() {
        return farmerName;
    }

    public void setFarmerName(String farmerName) {
        this.farmerName = farmerName;
    }

    public String getFarmerEmail() {
        return farmerEmail;
    }

    public void setFarmerEmail(String farmerEmail) {
        this.farmerEmail = farmerEmail;
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

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}
