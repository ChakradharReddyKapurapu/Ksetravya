package com.agrinexus.seeds.dto;

import com.agrinexus.seeds.entity.*;
import com.fasterxml.jackson.annotation.JsonFormat;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Set;

public class SeedResponse {

    private Long id;
    private String name;
    private String description;
    private CropType crop;
    private SeedCategory category;
    private String variety;
    private String brand;
    private SeedType seedType;
    private SeasonType season;
    private Integer durationDays;
    private String durationText;
    private Set<SoilType> soilTypes;
    private Set<String> suitableRegions;
    private WaterRequirement waterRequirement;
    private String irrigationRequirement;
    private String yieldPotential;
    private String germinationRate;
    private String diseaseResistance;
    private BigDecimal price;
    private String priceUnit;
    private String packSize;
    private Integer quantityAvailable;
    private SeedAvailabilityStatus availabilityStatus;
    private String imageUrl;
    private SeedSupplierSummary supplier;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime createdAt;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime updatedAt;

    public SeedResponse() {
    }

    public SeedResponse(Long id, String name, String description, CropType crop, SeedCategory category, String variety, String brand, SeedType seedType, SeasonType season, Integer durationDays, String durationText, Set<SoilType> soilTypes, Set<String> suitableRegions, WaterRequirement waterRequirement, String irrigationRequirement, String yieldPotential, String germinationRate, String diseaseResistance, BigDecimal price, String priceUnit, String packSize, Integer quantityAvailable, SeedAvailabilityStatus availabilityStatus, String imageUrl, SeedSupplierSummary supplier, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.crop = crop;
        this.category = category;
        this.variety = variety;
        this.brand = brand;
        this.seedType = seedType;
        this.season = season;
        this.durationDays = durationDays;
        this.durationText = durationText;
        this.soilTypes = soilTypes;
        this.suitableRegions = suitableRegions;
        this.waterRequirement = waterRequirement;
        this.irrigationRequirement = irrigationRequirement;
        this.yieldPotential = yieldPotential;
        this.germinationRate = germinationRate;
        this.diseaseResistance = diseaseResistance;
        this.price = price;
        this.priceUnit = priceUnit;
        this.packSize = packSize;
        this.quantityAvailable = quantityAvailable;
        this.availabilityStatus = availabilityStatus;
        this.imageUrl = imageUrl;
        this.supplier = supplier;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public static SeedResponse fromEntity(Seed seed) {
        if (seed == null) return null;
        return new SeedResponse(
                seed.getId(),
                seed.getName(),
                seed.getDescription(),
                seed.getCrop(),
                seed.getCategory(),
                seed.getVariety(),
                seed.getBrand(),
                seed.getSeedType(),
                seed.getSeason(),
                seed.getDurationDays(),
                seed.getDurationText(),
                seed.getSoilTypes(),
                seed.getSuitableRegions(),
                seed.getWaterRequirement(),
                seed.getIrrigationRequirement(),
                seed.getYieldPotential(),
                seed.getGerminationRate(),
                seed.getDiseaseResistance(),
                seed.getPrice(),
                seed.getPriceUnit(),
                seed.getPackSize(),
                seed.getQuantityAvailable(),
                seed.getAvailabilityStatus(),
                seed.getImageUrl(),
                SeedSupplierSummary.fromEntity(seed.getSupplier()),
                seed.getCreatedAt(),
                seed.getUpdatedAt()
        );
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
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
    public SeedSupplierSummary getSupplier() { return supplier; }
    public void setSupplier(SeedSupplierSummary supplier) { this.supplier = supplier; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
