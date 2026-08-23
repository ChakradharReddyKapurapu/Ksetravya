package com.agrinexus.analytics.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;

import java.math.BigDecimal;

public class ScenarioRequest {

    @NotBlank(message = "Crop name is required")
    private String crop;

    @NotNull(message = "Cultivation area is required")
    @Positive(message = "Area must be positive")
    private BigDecimal area;

    private String areaUnit = "ACRE";

    @PositiveOrZero(message = "Land rent must be positive or zero")
    private BigDecimal landRent;

    @PositiveOrZero(message = "Labour cost must be positive or zero")
    private BigDecimal labourCost;

    @PositiveOrZero(message = "Seed cost must be positive or zero")
    private BigDecimal seedCost;

    @PositiveOrZero(message = "Fertilizer cost must be positive or zero")
    private BigDecimal fertilizerCost;

    @PositiveOrZero(message = "Crop protection cost must be positive or zero")
    private BigDecimal cropProtectionCost;

    @PositiveOrZero(message = "Other cost must be positive or zero")
    private BigDecimal otherCost;

    @PositiveOrZero(message = "Custom yield must be positive or zero")
    private BigDecimal customYield;

    @PositiveOrZero(message = "Custom selling price must be positive or zero")
    private BigDecimal customPrice;

    public ScenarioRequest() {
    }

    public ScenarioRequest(String crop, BigDecimal area, String areaUnit, BigDecimal landRent, BigDecimal labourCost, BigDecimal seedCost, BigDecimal fertilizerCost, BigDecimal cropProtectionCost, BigDecimal otherCost, BigDecimal customYield, BigDecimal customPrice) {
        this.crop = crop;
        this.area = area;
        this.areaUnit = areaUnit != null ? areaUnit : "ACRE";
        this.landRent = landRent;
        this.labourCost = labourCost;
        this.seedCost = seedCost;
        this.fertilizerCost = fertilizerCost;
        this.cropProtectionCost = cropProtectionCost;
        this.otherCost = otherCost;
        this.customYield = customYield;
        this.customPrice = customPrice;
    }

    public String getCrop() { return crop; }
    public void setCrop(String crop) { this.crop = crop; }
    public BigDecimal getArea() { return area; }
    public void setArea(BigDecimal area) { this.area = area; }
    public String getAreaUnit() { return areaUnit; }
    public void setAreaUnit(String areaUnit) { this.areaUnit = areaUnit; }
    public BigDecimal getLandRent() { return landRent; }
    public void setLandRent(BigDecimal landRent) { this.landRent = landRent; }
    public BigDecimal getLabourCost() { return labourCost; }
    public void setLabourCost(BigDecimal labourCost) { this.labourCost = labourCost; }
    public BigDecimal getSeedCost() { return seedCost; }
    public void setSeedCost(BigDecimal seedCost) { this.seedCost = seedCost; }
    public BigDecimal getFertilizerCost() { return fertilizerCost; }
    public void setFertilizerCost(BigDecimal fertilizerCost) { this.fertilizerCost = fertilizerCost; }
    public BigDecimal getCropProtectionCost() { return cropProtectionCost; }
    public void setCropProtectionCost(BigDecimal cropProtectionCost) { this.cropProtectionCost = cropProtectionCost; }
    public BigDecimal getOtherCost() { return otherCost; }
    public void setOtherCost(BigDecimal otherCost) { this.otherCost = otherCost; }
    public BigDecimal getCustomYield() { return customYield; }
    public void setCustomYield(BigDecimal customYield) { this.customYield = customYield; }
    public BigDecimal getCustomPrice() { return customPrice; }
    public void setCustomPrice(BigDecimal customPrice) { this.customPrice = customPrice; }
}
