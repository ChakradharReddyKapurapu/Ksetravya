package com.agrinexus.analytics.dto;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class CropComparisonResponse {

    private String crop;
    private String displayName;
    private String icon;
    private BigDecimal areaAcres;
    private BigDecimal estimatedCost;
    private BigDecimal estimatedRevenue;
    private BigDecimal estimatedProfit;
    private BigDecimal profitMargin;
    private int durationDays;
    private BigDecimal marketPrice;
    private String priceUnit;
    private LocalDate priceDate;
    private String source;
    private List<String> assumptions = new ArrayList<>();

    public CropComparisonResponse() {
    }

    public CropComparisonResponse(String crop, String displayName, String icon, BigDecimal areaAcres, BigDecimal estimatedCost, BigDecimal estimatedRevenue, BigDecimal estimatedProfit, BigDecimal profitMargin, int durationDays, BigDecimal marketPrice, String priceUnit, LocalDate priceDate, String source, List<String> assumptions) {
        this.crop = crop;
        this.displayName = displayName;
        this.icon = icon;
        this.areaAcres = areaAcres;
        this.estimatedCost = estimatedCost;
        this.estimatedRevenue = estimatedRevenue;
        this.estimatedProfit = estimatedProfit;
        this.profitMargin = profitMargin;
        this.durationDays = durationDays;
        this.marketPrice = marketPrice;
        this.priceUnit = priceUnit;
        this.priceDate = priceDate;
        this.source = source;
        this.assumptions = assumptions != null ? assumptions : new ArrayList<>();
    }

    public String getCrop() { return crop; }
    public void setCrop(String crop) { this.crop = crop; }
    public String getDisplayName() { return displayName; }
    public void setDisplayName(String displayName) { this.displayName = displayName; }
    public String getIcon() { return icon; }
    public void setIcon(String icon) { this.icon = icon; }
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
    public int getDurationDays() { return durationDays; }
    public void setDurationDays(int durationDays) { this.durationDays = durationDays; }
    public BigDecimal getMarketPrice() { return marketPrice; }
    public void setMarketPrice(BigDecimal marketPrice) { this.marketPrice = marketPrice; }
    public String getPriceUnit() { return priceUnit; }
    public void setPriceUnit(String priceUnit) { this.priceUnit = priceUnit; }
    public LocalDate getPriceDate() { return priceDate; }
    public void setPriceDate(LocalDate priceDate) { this.priceDate = priceDate; }
    public String getSource() { return source; }
    public void setSource(String source) { this.source = source; }
    public List<String> getAssumptions() { return assumptions; }
    public void setAssumptions(List<String> assumptions) { this.assumptions = assumptions; }
}
