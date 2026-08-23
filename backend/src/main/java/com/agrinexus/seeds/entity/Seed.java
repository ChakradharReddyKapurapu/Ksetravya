package com.agrinexus.seeds.entity;

import com.agrinexus.user.User;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "seeds", indexes = {
    @Index(name = "idx_seed_crop", columnList = "crop"),
    @Index(name = "idx_seed_season", columnList = "season"),
    @Index(name = "idx_seed_seed_type", columnList = "seed_type"),
    @Index(name = "idx_seed_availability", columnList = "availability_status"),
    @Index(name = "idx_seed_supplier", columnList = "supplier_id")
})
public class Seed {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "supplier_id")
    private User supplier;

    @Column(nullable = false, length = 150)
    private String name;

    @Column(length = 2000)
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 40)
    private CropType crop;

    @Enumerated(EnumType.STRING)
    @Column(length = 40)
    private SeedCategory category;

    @Column(length = 150)
    private String variety;

    @Column(length = 100)
    private String brand;

    @Enumerated(EnumType.STRING)
    @Column(name = "seed_type", nullable = false, length = 40)
    private SeedType seedType = SeedType.CERTIFIED;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 40)
    private SeasonType season = SeasonType.KHARIF;

    @Column(name = "duration_days")
    private Integer durationDays;

    @Column(name = "duration_text", length = 60)
    private String durationText;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "seed_soil_types", joinColumns = @JoinColumn(name = "seed_id"))
    @Enumerated(EnumType.STRING)
    @Column(name = "soil_type", length = 40)
    private Set<SoilType> soilTypes = new HashSet<>();

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "seed_suitable_regions", joinColumns = @JoinColumn(name = "seed_id"))
    @Column(name = "region_name", length = 100)
    private Set<String> suitableRegions = new HashSet<>();

    @Enumerated(EnumType.STRING)
    @Column(name = "water_requirement", length = 30)
    private WaterRequirement waterRequirement = WaterRequirement.MEDIUM;

    @Column(name = "irrigation_requirement", length = 100)
    private String irrigationRequirement;

    @Column(name = "yield_potential", length = 100)
    private String yieldPotential;

    @Column(name = "germination_rate", length = 30)
    private String germinationRate;

    @Column(name = "disease_resistance", length = 250)
    private String diseaseResistance;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal price;

    @Column(name = "price_unit", length = 30)
    private String priceUnit = "KG";

    @Column(name = "pack_size", length = 50)
    private String packSize;

    @Column(name = "quantity_available")
    private Integer quantityAvailable = 100;

    @Enumerated(EnumType.STRING)
    @Column(name = "availability_status", nullable = false, length = 30)
    private SeedAvailabilityStatus availabilityStatus = SeedAvailabilityStatus.AVAILABLE;

    @Column(name = "image_url", length = 500)
    private String imageUrl;

    @Column(nullable = false)
    private Boolean active = true;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    public Seed() {
    }

    public Seed(Long id, User supplier, String name, String description, CropType crop, SeedCategory category, String variety, String brand, SeedType seedType, SeasonType season, Integer durationDays, String durationText, Set<SoilType> soilTypes, Set<String> suitableRegions, WaterRequirement waterRequirement, String irrigationRequirement, String yieldPotential, String germinationRate, String diseaseResistance, BigDecimal price, String priceUnit, String packSize, Integer quantityAvailable, SeedAvailabilityStatus availabilityStatus, String imageUrl, Boolean active, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.supplier = supplier;
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
        this.active = active != null ? active : true;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {
        private Long id;
        private User supplier;
        private String name;
        private String description;
        private CropType crop;
        private SeedCategory category;
        private String variety;
        private String brand;
        private SeedType seedType = SeedType.CERTIFIED;
        private SeasonType season = SeasonType.KHARIF;
        private Integer durationDays;
        private String durationText;
        private Set<SoilType> soilTypes = new HashSet<>();
        private Set<String> suitableRegions = new HashSet<>();
        private WaterRequirement waterRequirement = WaterRequirement.MEDIUM;
        private String irrigationRequirement;
        private String yieldPotential;
        private String germinationRate;
        private String diseaseResistance;
        private BigDecimal price;
        private String priceUnit = "KG";
        private String packSize;
        private Integer quantityAvailable = 100;
        private SeedAvailabilityStatus availabilityStatus = SeedAvailabilityStatus.AVAILABLE;
        private String imageUrl;
        private Boolean active = true;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;

        public Builder id(Long id) { this.id = id; return this; }
        public Builder supplier(User supplier) { this.supplier = supplier; return this; }
        public Builder name(String name) { this.name = name; return this; }
        public Builder description(String description) { this.description = description; return this; }
        public Builder crop(CropType crop) { this.crop = crop; return this; }
        public Builder category(SeedCategory category) { this.category = category; return this; }
        public Builder variety(String variety) { this.variety = variety; return this; }
        public Builder brand(String brand) { this.brand = brand; return this; }
        public Builder seedType(SeedType seedType) { this.seedType = seedType; return this; }
        public Builder season(SeasonType season) { this.season = season; return this; }
        public Builder durationDays(Integer durationDays) { this.durationDays = durationDays; return this; }
        public Builder durationText(String durationText) { this.durationText = durationText; return this; }
        public Builder soilTypes(Set<SoilType> soilTypes) { this.soilTypes = soilTypes; return this; }
        public Builder suitableRegions(Set<String> suitableRegions) { this.suitableRegions = suitableRegions; return this; }
        public Builder waterRequirement(WaterRequirement waterRequirement) { this.waterRequirement = waterRequirement; return this; }
        public Builder irrigationRequirement(String irrigationRequirement) { this.irrigationRequirement = irrigationRequirement; return this; }
        public Builder yieldPotential(String yieldPotential) { this.yieldPotential = yieldPotential; return this; }
        public Builder germinationRate(String germinationRate) { this.germinationRate = germinationRate; return this; }
        public Builder diseaseResistance(String diseaseResistance) { this.diseaseResistance = diseaseResistance; return this; }
        public Builder price(BigDecimal price) { this.price = price; return this; }
        public Builder priceUnit(String priceUnit) { this.priceUnit = priceUnit; return this; }
        public Builder packSize(String packSize) { this.packSize = packSize; return this; }
        public Builder quantityAvailable(Integer quantityAvailable) { this.quantityAvailable = quantityAvailable; return this; }
        public Builder availabilityStatus(SeedAvailabilityStatus availabilityStatus) { this.availabilityStatus = availabilityStatus; return this; }
        public Builder imageUrl(String imageUrl) { this.imageUrl = imageUrl; return this; }
        public Builder active(Boolean active) { this.active = active; return this; }
        public Builder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }
        public Builder updatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; return this; }

        public Seed build() {
            return new Seed(id, supplier, name, description, crop, category, variety, brand, seedType, season, durationDays, durationText, soilTypes, suitableRegions, waterRequirement, irrigationRequirement, yieldPotential, germinationRate, diseaseResistance, price, priceUnit, packSize, quantityAvailable, availabilityStatus, imageUrl, active, createdAt, updatedAt);
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public User getSupplier() { return supplier; }
    public void setSupplier(User supplier) { this.supplier = supplier; }
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
    public Boolean getActive() { return active; }
    public void setActive(Boolean active) { this.active = active; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
