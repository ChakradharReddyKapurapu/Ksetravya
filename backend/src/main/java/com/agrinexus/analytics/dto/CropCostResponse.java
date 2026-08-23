package com.agrinexus.analytics.dto;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

public class CropCostResponse {

    private String crop;
    private String displayName;
    private BigDecimal areaAcres;
    private BigDecimal seedCost;
    private BigDecimal fertilizerCost;
    private BigDecimal cropProtectionCost;
    private BigDecimal labourCost;
    private BigDecimal machineryCost;
    private BigDecimal irrigationCost;
    private BigDecimal landLeaseCost;
    private BigDecimal transportCost;
    private BigDecimal otherCost;
    private BigDecimal totalCost;
    private List<String> assumptions = new ArrayList<>();

    public CropCostResponse() {
    }

    public CropCostResponse(String crop, String displayName, BigDecimal areaAcres, BigDecimal seedCost, BigDecimal fertilizerCost, BigDecimal cropProtectionCost, BigDecimal labourCost, BigDecimal machineryCost, BigDecimal irrigationCost, BigDecimal landLeaseCost, BigDecimal transportCost, BigDecimal otherCost, BigDecimal totalCost, List<String> assumptions) {
        this.crop = crop;
        this.displayName = displayName;
        this.areaAcres = areaAcres;
        this.seedCost = seedCost;
        this.fertilizerCost = fertilizerCost;
        this.cropProtectionCost = cropProtectionCost;
        this.labourCost = labourCost;
        this.machineryCost = machineryCost;
        this.irrigationCost = irrigationCost;
        this.landLeaseCost = landLeaseCost;
        this.transportCost = transportCost;
        this.otherCost = otherCost;
        this.totalCost = totalCost;
        this.assumptions = assumptions != null ? assumptions : new ArrayList<>();
    }

    public String getCrop() { return crop; }
    public void setCrop(String crop) { this.crop = crop; }
    public String getDisplayName() { return displayName; }
    public void setDisplayName(String displayName) { this.displayName = displayName; }
    public BigDecimal getAreaAcres() { return areaAcres; }
    public void setAreaAcres(BigDecimal areaAcres) { this.areaAcres = areaAcres; }
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
    public BigDecimal getTransportCost() { return transportCost; }
    public void setTransportCost(BigDecimal transportCost) { this.transportCost = transportCost; }
    public BigDecimal getOtherCost() { return otherCost; }
    public void setOtherCost(BigDecimal otherCost) { this.otherCost = otherCost; }
    public BigDecimal getTotalCost() { return totalCost; }
    public void setTotalCost(BigDecimal totalCost) { this.totalCost = totalCost; }
    public List<String> getAssumptions() { return assumptions; }
    public void setAssumptions(List<String> assumptions) { this.assumptions = assumptions; }
}
