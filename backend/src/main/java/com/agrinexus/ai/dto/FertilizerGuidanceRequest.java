package com.agrinexus.ai.dto;

import java.math.BigDecimal;

public class FertilizerGuidanceRequest {

    private String cropName;
    private String growthStage; // SOWING, TILLERING, FLOWERING, GRAIN_FILLING
    private BigDecimal farmAreaAcres;
    private Double nitrogenLevel; // N ppm or kg/ha
    private Double phosphorusLevel; // P
    private Double potassiumLevel; // K
    private String soilType;

    public FertilizerGuidanceRequest() {
    }

    public FertilizerGuidanceRequest(String cropName, String growthStage, BigDecimal farmAreaAcres, Double nitrogenLevel, Double phosphorusLevel, Double potassiumLevel, String soilType) {
        this.cropName = cropName;
        this.growthStage = growthStage;
        this.farmAreaAcres = farmAreaAcres;
        this.nitrogenLevel = nitrogenLevel;
        this.phosphorusLevel = phosphorusLevel;
        this.potassiumLevel = potassiumLevel;
        this.soilType = soilType;
    }

    public String getCropName() { return cropName; }
    public void setCropName(String cropName) { this.cropName = cropName; }

    public String getGrowthStage() { return growthStage; }
    public void setGrowthStage(String growthStage) { this.growthStage = growthStage; }

    public BigDecimal getFarmAreaAcres() { return farmAreaAcres; }
    public void setFarmAreaAcres(BigDecimal farmAreaAcres) { this.farmAreaAcres = farmAreaAcres; }

    public Double getNitrogenLevel() { return nitrogenLevel; }
    public void setNitrogenLevel(Double nitrogenLevel) { this.nitrogenLevel = nitrogenLevel; }

    public Double getPhosphorusLevel() { return phosphorusLevel; }
    public void setPhosphorusLevel(Double phosphorusLevel) { this.phosphorusLevel = phosphorusLevel; }

    public Double getPotassiumLevel() { return potassiumLevel; }
    public void setPotassiumLevel(Double potassiumLevel) { this.potassiumLevel = potassiumLevel; }

    public String getSoilType() { return soilType; }
    public void setSoilType(String soilType) { this.soilType = soilType; }
}
