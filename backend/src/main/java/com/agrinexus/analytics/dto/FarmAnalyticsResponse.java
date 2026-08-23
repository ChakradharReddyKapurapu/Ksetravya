package com.agrinexus.analytics.dto;

import java.math.BigDecimal;

public class FarmAnalyticsResponse {

    private Long farmId;
    private String farmName;
    private String location;
    private String district;
    private String state;
    private Double area;
    private String areaUnit;
    private BigDecimal normalizedAreaAcres;
    private String soilType;
    private String waterAvailability;
    private String irrigationType;
    private String currentCrop;

    public FarmAnalyticsResponse() {
    }

    public FarmAnalyticsResponse(Long farmId, String farmName, String location, String district, String state, Double area, String areaUnit, BigDecimal normalizedAreaAcres, String soilType, String waterAvailability, String irrigationType, String currentCrop) {
        this.farmId = farmId;
        this.farmName = farmName;
        this.location = location;
        this.district = district;
        this.state = state;
        this.area = area;
        this.areaUnit = areaUnit;
        this.normalizedAreaAcres = normalizedAreaAcres;
        this.soilType = soilType;
        this.waterAvailability = waterAvailability;
        this.irrigationType = irrigationType;
        this.currentCrop = currentCrop;
    }

    public Long getFarmId() { return farmId; }
    public void setFarmId(Long farmId) { this.farmId = farmId; }
    public String getFarmName() { return farmName; }
    public void setFarmName(String farmName) { this.farmName = farmName; }
    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }
    public String getDistrict() { return district; }
    public void setDistrict(String district) { this.district = district; }
    public String getState() { return state; }
    public void setState(String state) { this.state = state; }
    public Double getArea() { return area; }
    public void setArea(Double area) { this.area = area; }
    public String getAreaUnit() { return areaUnit; }
    public void setAreaUnit(String areaUnit) { this.areaUnit = areaUnit; }
    public BigDecimal getNormalizedAreaAcres() { return normalizedAreaAcres; }
    public void setNormalizedAreaAcres(BigDecimal normalizedAreaAcres) { this.normalizedAreaAcres = normalizedAreaAcres; }
    public String getSoilType() { return soilType; }
    public void setSoilType(String soilType) { this.soilType = soilType; }
    public String getWaterAvailability() { return waterAvailability; }
    public void setWaterAvailability(String waterAvailability) { this.waterAvailability = waterAvailability; }
    public String getIrrigationType() { return irrigationType; }
    public void setIrrigationType(String irrigationType) { this.irrigationType = irrigationType; }
    public String getCurrentCrop() { return currentCrop; }
    public void setCurrentCrop(String currentCrop) { this.currentCrop = currentCrop; }
}
