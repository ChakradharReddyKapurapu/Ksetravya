package com.agrinexus.analytics.dto;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

public class ScenarioResponse {

    private String crop;
    private BigDecimal area;
    private String areaUnit;
    private BigDecimal normalizedAreaAcres;
    private BigDecimal totalCost;
    private BigDecimal seedCost;
    private BigDecimal fertilizerCost;
    private BigDecimal cropProtectionCost;
    private BigDecimal labourCost;
    private BigDecimal machineryCost;
    private BigDecimal irrigationCost;
    private BigDecimal landLeaseCost;
    private BigDecimal otherCost;
    private BigDecimal estimatedYield;
    private String yieldUnit;
    private BigDecimal sellingPrice;
    private BigDecimal estimatedRevenue;
    private BigDecimal estimatedProfit;
    private BigDecimal profitMargin;
    private String status;
    private List<String> assumptions = new ArrayList<>();

    public ScenarioResponse() {
    }

    public ScenarioResponse(String crop, BigDecimal area, String areaUnit, BigDecimal normalizedAreaAcres, BigDecimal totalCost, BigDecimal seedCost, BigDecimal fertilizerCost, BigDecimal cropProtectionCost, BigDecimal labourCost, BigDecimal machineryCost, BigDecimal irrigationCost, BigDecimal landLeaseCost, BigDecimal otherCost, BigDecimal estimatedYield, String yieldUnit, BigDecimal sellingPrice, BigDecimal estimatedRevenue, BigDecimal estimatedProfit, BigDecimal profitMargin, String status, List<String> assumptions) {
        this.crop = crop;
        this.area = area;
        this.areaUnit = areaUnit;
        this.normalizedAreaAcres = normalizedAreaAcres;
        this.totalCost = totalCost;
        this.seedCost = seedCost;
        this.fertilizerCost = fertilizerCost;
        this.cropProtectionCost = cropProtectionCost;
        this.labourCost = labourCost;
        this.machineryCost = machineryCost;
        this.irrigationCost = irrigationCost;
        this.landLeaseCost = landLeaseCost;
        this.otherCost = otherCost;
        this.estimatedYield = estimatedYield;
        this.yieldUnit = yieldUnit;
        this.sellingPrice = sellingPrice;
        this.estimatedRevenue = estimatedRevenue;
        this.estimatedProfit = estimatedProfit;
        this.profitMargin = profitMargin;
        this.status = status;
        this.assumptions = assumptions != null ? assumptions : new ArrayList<>();
    }

    public String getCrop() { return crop; }
    public void setCrop(String crop) { this.crop = crop; }
    public BigDecimal getArea() { return area; }
    public void setArea(BigDecimal area) { this.area = area; }
    public String getAreaUnit() { return areaUnit; }
    public void setAreaUnit(String areaUnit) { this.areaUnit = areaUnit; }
    public BigDecimal getNormalizedAreaAcres() { return normalizedAreaAcres; }
    public void setNormalizedAreaAcres(BigDecimal normalizedAreaAcres) { this.normalizedAreaAcres = normalizedAreaAcres; }
    public BigDecimal getTotalCost() { return totalCost; }
    public void setTotalCost(BigDecimal totalCost) { this.totalCost = totalCost; }
    public BigDecimal getSeedCost() { return seedCost; }
    public void setSeedCost(BigDecimal seedCost) { this.seedCost = seedCost; }
    public BigDecimal getFertilizerCost() { return fertilizerCost; }
    public void setFertilizerCost(BigDecimal fertilizerCost) { this.fertilizerCost = fertilizerCost; }
    public BigDecimal getCropProtectionCost() { return cropProtectionCost; }
    public void setCropProtectionCost(BigDecimal cropProtectionCost) { this.cropProtectionCost = cropProtectionCost; }
    public BigDecimal getLabourCost() { return labourCost; }
    public void setLabourCost(BigDecimal labourCost) { this.labourCost = labourCost; }
    public BigDecimal getMachineryCost() { return machineryCost; }
    public void setMachineryCost(BigDecimal machineryCost) { this.machineryCost = machineryCost; }
    public BigDecimal getIrrigationCost() { return irrigationCost; }
    public void setIrrigationCost(BigDecimal irrigationCost) { this.irrigationCost = irrigationCost; }
    public BigDecimal getLandLeaseCost() { return landLeaseCost; }
    public void setLandLeaseCost(BigDecimal landLeaseCost) { this.landLeaseCost = landLeaseCost; }
    public BigDecimal getOtherCost() { return otherCost; }
    public void setOtherCost(BigDecimal otherCost) { this.otherCost = otherCost; }
    public BigDecimal getEstimatedYield() { return estimatedYield; }
    public void setEstimatedYield(BigDecimal estimatedYield) { this.estimatedYield = estimatedYield; }
    public String getYieldUnit() { return yieldUnit; }
    public void setYieldUnit(String yieldUnit) { this.yieldUnit = yieldUnit; }
    public BigDecimal getSellingPrice() { return sellingPrice; }
    public void setSellingPrice(BigDecimal sellingPrice) { this.sellingPrice = sellingPrice; }
    public BigDecimal getEstimatedRevenue() { return estimatedRevenue; }
    public void setEstimatedRevenue(BigDecimal estimatedRevenue) { this.estimatedRevenue = estimatedRevenue; }
    public BigDecimal getEstimatedProfit() { return estimatedProfit; }
    public void setEstimatedProfit(BigDecimal estimatedProfit) { this.estimatedProfit = estimatedProfit; }
    public BigDecimal getProfitMargin() { return profitMargin; }
    public void setProfitMargin(BigDecimal profitMargin) { this.profitMargin = profitMargin; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public List<String> getAssumptions() { return assumptions; }
    public void setAssumptions(List<String> assumptions) { this.assumptions = assumptions; }
}
