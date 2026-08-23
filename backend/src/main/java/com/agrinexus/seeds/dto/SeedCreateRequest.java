package com.agrinexus.seeds.dto;

import com.agrinexus.seeds.entity.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;

public class SeedCreateRequest {

    @NotBlank(message = "Seed name is required")
    @Size(max = 150, message = "Name must not exceed 150 characters")
    private String name;

    @Size(max = 2000, message = "Description must not exceed 2000 characters")
    private String description;

    @NotNull(message = "Crop type is required")
    private CropType crop;

    private SeedCategory category;

    @Size(max = 150, message = "Variety must not exceed 150 characters")
    private String variety;

    @Size(max = 100, message = "Brand must not exceed 100 characters")
    private String brand;

    private SeedType seedType = SeedType.CERTIFIED;

    private SeasonType season = SeasonType.KHARIF;

    @PositiveOrZero(message = "Duration days must be positive or zero")
    private Integer durationDays;

    @Size(max = 60, message = "Duration text must not exceed 60 characters")
    private String durationText;

    private Set<SoilType> soilTypes = new HashSet<>();

    private Set<String> suitableRegions = new HashSet<>();

    private WaterRequirement waterRequirement = WaterRequirement.MEDIUM;

    @Size(max = 100, message = "Irrigation requirement must not exceed 100 characters")
    private String irrigationRequirement;

    @Size(max = 100, message = "Yield potential must not exceed 100 characters")
    private String yieldPotential;

    @Size(max = 30, message = "Germination rate must not exceed 30 characters")
    private String germinationRate;

    @Size(max = 250, message = "Disease resistance must not exceed 250 characters")
    private String diseaseResistance;

    @NotNull(message = "Price is required")
    @PositiveOrZero(message = "Price must be positive or zero")
    private BigDecimal price;

    @Size(max = 30, message = "Price unit must not exceed 30 characters")
    private String priceUnit = "KG";

    @Size(max = 50, message = "Pack size must not exceed 50 characters")
    private String packSize;

    @PositiveOrZero(message = "Quantity available must be positive or zero")
    private Integer quantityAvailable = 100;

    private SeedAvailabilityStatus availabilityStatus = SeedAvailabilityStatus.AVAILABLE;

    @Size(max = 500, message = "Image URL must not exceed 500 characters")
    private String imageUrl;

    public SeedCreateRequest() {
    }

    public SeedCreateRequest(String name, String description, CropType crop, SeedCategory category, String variety, String brand, SeedType seedType, SeasonType season, Integer durationDays, String durationText, Set<SoilType> soilTypes, Set<String> suitableRegions, WaterRequirement waterRequirement, String irrigationRequirement, String yieldPotential, String germinationRate, String diseaseResistance, BigDecimal price, String priceUnit, String packSize, Integer quantityAvailable, SeedAvailabilityStatus availabilityStatus, String imageUrl) {
        this.name = name;
        this.description = description;
        this.crop = crop;
        this.category = category;
        this.variety = variety;
        this.brand = brand;
        this.seedType = seedType != null ? seedType : SeedType.CERTIFIED;
        this.season = season != null ? season : SeasonType.KHARIF;
        this.durationDays = durationDays;
        this.durationText = durationText;
        this.soilTypes = soilTypes != null ? soilTypes : new HashSet<>();
        this.suitableRegions = suitableRegions != null ? suitableRegions : new HashSet<>();
        this.waterRequirement = waterRequirement != null ? waterRequirement : WaterRequirement.MEDIUM;
        this.irrigationRequirement = irrigationRequirement;
        this.yieldPotential = yieldPotential;
        this.germinationRate = germinationRate;
        this.diseaseResistance = diseaseResistance;
        this.price = price;
        this.priceUnit = priceUnit != null ? priceUnit : "KG";
        this.packSize = packSize;
        this.quantityAvailable = quantityAvailable != null ? quantityAvailable : 100;
        this.availabilityStatus = availabilityStatus != null ? availabilityStatus : SeedAvailabilityStatus.AVAILABLE;
        this.imageUrl = imageUrl;
    }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public CropType getCrop() { return crop; }
    public void setCrop(CropType crop) { this.crop = crop; }
    public SeedCategory getCategory() { return category; }
    public void setCategory(SeedCategory category) { this.category = category; }
    public String getVariety() { return variety; }
    public void setVariety(String variety) { this.variety = variety; }
    public String getBrand() { return brand; }
    public void setBrand(String brand) { this.brand = brand; }
    public SeedType getSeedType() { return seedType; }
    public void setSeedType(SeedType seedType) { this.seedType = seedType; }
    public SeasonType getSeason() { return season; }
    public void setSeason(SeasonType season) { this.season = season; }
    public Integer getDurationDays() { return durationDays; }
    public void setDurationDays(Integer durationDays) { this.durationDays = durationDays; }
    public String getDurationText() { return durationText; }
    public void setDurationText(String durationText) { this.durationText = durationText; }
    public Set<SoilType> getSoilTypes() { return soilTypes; }
    public void setSoilTypes(Set<SoilType> soilTypes) { this.soilTypes = soilTypes; }
    public Set<String> getSuitableRegions() { return suitableRegions; }
    public void setSuitableRegions(Set<String> suitableRegions) { this.suitableRegions = suitableRegions; }
    public WaterRequirement getWaterRequirement() { return waterRequirement; }
    public void setWaterRequirement(WaterRequirement waterRequirement) { this.waterRequirement = waterRequirement; }
    public String getIrrigationRequirement() { return irrigationRequirement; }
    public void setIrrigationRequirement(String irrigationRequirement) { this.irrigationRequirement = irrigationRequirement; }
    public String getYieldPotential() { return yieldPotential; }
    public void setYieldPotential(String yieldPotential) { this.yieldPotential = yieldPotential; }
    public String getGerminationRate() { return germinationRate; }
    public void setGerminationRate(String germinationRate) { this.germinationRate = germinationRate; }
    public String getDiseaseResistance() { return diseaseResistance; }
    public void setDiseaseResistance(String diseaseResistance) { this.diseaseResistance = diseaseResistance; }
    public BigDecimal getPrice() { return price; }
    public void setPrice(BigDecimal price) { this.price = price; }
    public String getPriceUnit() { return priceUnit; }
    public void setPriceUnit(String priceUnit) { this.priceUnit = priceUnit; }
    public String getPackSize() { return packSize; }
    public void setPackSize(String packSize) { this.packSize = packSize; }
    public Integer getQuantityAvailable() { return quantityAvailable; }
    public void setQuantityAvailable(Integer quantityAvailable) { this.quantityAvailable = quantityAvailable; }
    public SeedAvailabilityStatus getAvailabilityStatus() { return availabilityStatus; }
    public void setAvailabilityStatus(SeedAvailabilityStatus availabilityStatus) { this.availabilityStatus = availabilityStatus; }
    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
}
