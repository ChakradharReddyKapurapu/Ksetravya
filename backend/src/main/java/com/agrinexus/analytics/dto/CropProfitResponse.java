package com.agrinexus.analytics.dto;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

public class CropProfitResponse {

    private String crop;
    private String displayName;
    private BigDecimal areaAcres;
    private BigDecimal totalCost;
    private BigDecimal estimatedRevenue;
    private BigDecimal estimatedProfit;
    private BigDecimal profitMargin;
    private String status;
    private String riskLevel;
    private List<String> assumptions = new ArrayList<>();

    public CropProfitResponse() {
    }

    public CropProfitResponse(String crop, String displayName, BigDecimal areaAcres, BigDecimal totalCost, BigDecimal estimatedRevenue, BigDecimal estimatedProfit, BigDecimal profitMargin, String status, String riskLevel, List<String> assumptions) {
        this.crop = crop;
        this.displayName = displayName;
        this.areaAcres = areaAcres;
        this.totalCost = totalCost;
        this.estimatedRevenue = estimatedRevenue;
        this.estimatedProfit = estimatedProfit;
        this.profitMargin = profitMargin;
        this.status = status;
        this.riskLevel = riskLevel;
        this.assumptions = assumptions != null ? assumptions : new ArrayList<>();
    }

    public String getCrop() { return crop; }
    public void setCrop(String crop) { this.crop = crop; }
    public String getDisplayName() { return displayName; }
    public void setDisplayName(String displayName) { this.displayName = displayName; }
    public BigDecimal getAreaAcres() { return areaAcres; }
    public void setAreaAcres(BigDecimal areaAcres) { this.areaAcres = areaAcres; }
    public BigDecimal getTotalCost() { return totalCost; }
    public void setTotalCost(BigDecimal totalCost) { this.totalCost = totalCost; }
    public BigDecimal getEstimatedRevenue() { return estimatedRevenue; }
    public void setEstimatedRevenue(BigDecimal estimatedRevenue) { this.estimatedRevenue = estimatedRevenue; }
    public BigDecimal getEstimatedProfit() { return estimatedProfit; }
    public void setEstimatedProfit(BigDecimal estimatedProfit) { this.estimatedProfit = estimatedProfit; }
    public BigDecimal getProfitMargin() { return profitMargin; }
    public void setProfitMargin(BigDecimal profitMargin) { this.profitMargin = profitMargin; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public String getRiskLevel() { return riskLevel; }
    public void setRiskLevel(String riskLevel) { this.riskLevel = riskLevel; }
    public List<String> getAssumptions() { return assumptions; }
    public void setAssumptions(List<String> assumptions) { this.assumptions = assumptions; }
}
