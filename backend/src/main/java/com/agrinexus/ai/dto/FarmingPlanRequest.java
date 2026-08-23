package com.agrinexus.ai.dto;

import java.math.BigDecimal;

public class FarmingPlanRequest {

    private String cropName;
    private BigDecimal farmAreaAcres;
    private String sowingMonth;
    private String location;

    public FarmingPlanRequest() {
    }

    public FarmingPlanRequest(String cropName, BigDecimal farmAreaAcres, String sowingMonth, String location) {
        this.cropName = cropName;
        this.farmAreaAcres = farmAreaAcres;
        this.sowingMonth = sowingMonth;
        this.location = location;
    }

    public String getCropName() { return cropName; }
    public void setCropName(String cropName) { this.cropName = cropName; }

    public BigDecimal getFarmAreaAcres() { return farmAreaAcres; }
    public void setFarmAreaAcres(BigDecimal farmAreaAcres) { this.farmAreaAcres = farmAreaAcres; }

    public String getSowingMonth() { return sowingMonth; }
    public void setSowingMonth(String sowingMonth) { this.sowingMonth = sowingMonth; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }
}
