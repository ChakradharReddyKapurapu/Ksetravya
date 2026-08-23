package com.agrinexus.ai.dto;

import java.math.BigDecimal;
import java.util.List;

public class CropRecommendationRequest {

    private String soilType;
    private String season;
    private BigDecimal farmAreaAcres;
    private String irrigationType;
    private String targetMarket;

    public CropRecommendationRequest() {
    }

    public CropRecommendationRequest(String soilType, String season, BigDecimal farmAreaAcres, String irrigationType, String targetMarket) {
        this.soilType = soilType;
        this.season = season;
        this.farmAreaAcres = farmAreaAcres;
        this.irrigationType = irrigationType;
        this.targetMarket = targetMarket;
    }

    public String getSoilType() { return soilType; }
    public void setSoilType(String soilType) { this.soilType = soilType; }

    public String getSeason() { return season; }
    public void setSeason(String season) { this.season = season; }

    public BigDecimal getFarmAreaAcres() { return farmAreaAcres; }
    public void setFarmAreaAcres(BigDecimal farmAreaAcres) { this.farmAreaAcres = farmAreaAcres; }

    public String getIrrigationType() { return irrigationType; }
    public void setIrrigationType(String irrigationType) { this.irrigationType = irrigationType; }

    public String getTargetMarket() { return targetMarket; }
    public void setTargetMarket(String targetMarket) { this.targetMarket = targetMarket; }
}
