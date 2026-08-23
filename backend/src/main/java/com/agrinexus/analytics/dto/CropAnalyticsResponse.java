package com.agrinexus.analytics.dto;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

public class CropAnalyticsResponse {

    private String crop;
    private String displayName;
    private String icon;
    private int durationDays;
    private BigDecimal areaAcres;
    private BigDecimal estimatedCost;
    private BigDecimal estimatedRevenue;
    private BigDecimal estimatedProfit;
    private BigDecimal profitMargin;
    private String status;
    private BigDecimal marketPrice;
    private String priceUnit;
    private String riskLevel;
    private String marketTimingInsight;
    private List<String> assumptions = new ArrayList<>();

    public CropAnalyticsResponse() {
    }

    public CropAnalyticsResponse(String crop, String displayName, String icon, int durationDays, BigDecimal areaAcres, BigDecimal estimatedCost, BigDecimal estimatedRevenue, BigDecimal estimatedProfit, BigDecimal profitMargin, String status, BigDecimal marketPrice, String priceUnit, String riskLevel, String marketTimingInsight, List<String> assumptions) {
        this.crop = crop;
        this.displayName = displayName;
        this.icon = icon;
        this.durationDays = durationDays;
        this.areaAcres = areaAcres;
        this.estimatedCost = estimatedCost;
        this.estimatedRevenue = estimatedRevenue;
        this.estimatedProfit = estimatedProfit;
        this.profitMargin = profitMargin;
        this.status = status;
        this.marketPrice = marketPrice;
        this.priceUnit = priceUnit;
        this.riskLevel = riskLevel;
        this.marketTimingInsight = marketTimingInsight;
        this.assumptions = assumptions != null ? assumptions : new ArrayList<>();
    }

    public String getCrop() { return crop; }
    public void setCrop(String crop) { this.crop = crop; }
    public String getDisplayName() { return displayName; }
    public void setDisplayName(String displayName) { this.displayName = displayName; }
    public String getIcon() { return icon; }
    public void setIcon(String icon) { this.icon = icon; }
    public int getDurationDays() { return durationDays; }
    public void setDurationDays(int durationDays) { this.durationDays = durationDays; }
    public BigDecimal getAreaAcres() { return areaAcres; }
    public void setAreaAcres(BigDecimal areaAcres) { this.areaAcres = areaAcres; }
    public BigDecimal getEstimatedCost() { return estimatedCost; }
    public void setEstimatedCost(BigDecimal estimatedCost) { this.estimatedCost = estimatedCost; }
    public BigDecimal getEstimatedRevenue() { return estimatedRevenue; }
    public void setEstimatedRevenue(BigDecimal estimatedRevenue) { this.estimatedRevenue = estimatedRevenue; }
    public BigDecimal getEstimatedProfit() { return estimatedProfit; }
    public void setEstimatedProfit(BigDecimal estimatedProfit) { this.estimatedProfit = estimatedProfit; }
    public BigDecimal getProfitMargin() { return profitMargin; }
    public void setProfitMargin(BigDecimal profitMargin) { this.profitMargin = profitMargin; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public BigDecimal getMarketPrice() { return marketPrice; }
    public void setMarketPrice(BigDecimal marketPrice) { this.marketPrice = marketPrice; }
    public String getPriceUnit() { return priceUnit; }
    public void setPriceUnit(String priceUnit) { this.priceUnit = priceUnit; }
    public String getRiskLevel() { return riskLevel; }
    public void setRiskLevel(String riskLevel) { this.riskLevel = riskLevel; }
    public String getMarketTimingInsight() { return marketTimingInsight; }
    public void setMarketTimingInsight(String marketTimingInsight) { this.marketTimingInsight = marketTimingInsight; }
    public List<String> getAssumptions() { return assumptions; }
    public void setAssumptions(List<String> assumptions) { this.assumptions = assumptions; }
}
