package com.agrinexus.analytics.dto;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class CropRevenueResponse {

    private String crop;
    private String displayName;
    private BigDecimal areaAcres;
    private BigDecimal estimatedYield;
    private String yieldUnit;
    private BigDecimal referencePrice;
    private String priceUnit;
    private LocalDate priceDate;
    private String priceSource;
    private BigDecimal estimatedRevenue;
    private List<String> assumptions = new ArrayList<>();

    public CropRevenueResponse() {
    }

    public CropRevenueResponse(String crop, String displayName, BigDecimal areaAcres, BigDecimal estimatedYield, String yieldUnit, BigDecimal referencePrice, String priceUnit, LocalDate priceDate, String priceSource, BigDecimal estimatedRevenue, List<String> assumptions) {
        this.crop = crop;
        this.displayName = displayName;
        this.areaAcres = areaAcres;
        this.estimatedYield = estimatedYield;
        this.yieldUnit = yieldUnit;
        this.referencePrice = referencePrice;
        this.priceUnit = priceUnit;
        this.priceDate = priceDate;
        this.priceSource = priceSource;
        this.estimatedRevenue = estimatedRevenue;
        this.assumptions = assumptions != null ? assumptions : new ArrayList<>();
    }

    public String getCrop() { return crop; }
    public void setCrop(String crop) { this.crop = crop; }
    public String getDisplayName() { return displayName; }
    public void setDisplayName(String displayName) { this.displayName = displayName; }
    public BigDecimal getAreaAcres() { return areaAcres; }
    public void setAreaAcres(BigDecimal areaAcres) { this.areaAcres = areaAcres; }
    public BigDecimal getEstimatedYield() { return estimatedYield; }
    public void setEstimatedYield(BigDecimal estimatedYield) { this.estimatedYield = estimatedYield; }
    public String getYieldUnit() { return yieldUnit; }
    public void setYieldUnit(String yieldUnit) { this.yieldUnit = yieldUnit; }
    public BigDecimal getReferencePrice() { return referencePrice; }
    public void setReferencePrice(BigDecimal referencePrice) { this.referencePrice = referencePrice; }
    public String getPriceUnit() { return priceUnit; }
    public void setPriceUnit(String priceUnit) { this.priceUnit = priceUnit; }
    public LocalDate getPriceDate() { return priceDate; }
    public void setPriceDate(LocalDate priceDate) { this.priceDate = priceDate; }
    public String getPriceSource() { return priceSource; }
    public void setPriceSource(String priceSource) { this.priceSource = priceSource; }
    public BigDecimal getEstimatedRevenue() { return estimatedRevenue; }
    public void setEstimatedRevenue(BigDecimal estimatedRevenue) { this.estimatedRevenue = estimatedRevenue; }
    public List<String> getAssumptions() { return assumptions; }
    public void setAssumptions(List<String> assumptions) { this.assumptions = assumptions; }
}
