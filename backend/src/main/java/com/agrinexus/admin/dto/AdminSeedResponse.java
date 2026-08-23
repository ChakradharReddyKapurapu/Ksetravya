package com.agrinexus.admin.dto;

import com.agrinexus.seeds.entity.CropType;
import com.agrinexus.seeds.entity.SeedAvailabilityStatus;
import com.agrinexus.seeds.entity.SeedCategory;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class AdminSeedResponse {

    private Long id;
    private String name;
    private String description;
    private CropType crop;
    private SeedCategory category;
    private String variety;
    private String brand;
    private BigDecimal pricePerUnit;
    private String unit;
    private SeedAvailabilityStatus availabilityStatus;
    private boolean active;
    private Long supplierId;
    private String supplierName;
    private String supplierEmail;
    private LocalDateTime createdAt;

    public AdminSeedResponse() {
    }

    public AdminSeedResponse(Long id, String name, String description, CropType crop, SeedCategory category, String variety, String brand, BigDecimal pricePerUnit, String unit, SeedAvailabilityStatus availabilityStatus, boolean active, Long supplierId, String supplierName, String supplierEmail, LocalDateTime createdAt) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.crop = crop;
        this.category = category;
        this.variety = variety;
        this.brand = brand;
        this.pricePerUnit = pricePerUnit;
        this.unit = unit;
        this.availabilityStatus = availabilityStatus;
        this.active = active;
        this.supplierId = supplierId;
        this.supplierName = supplierName;
        this.supplierEmail = supplierEmail;
        this.createdAt = createdAt;
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
    public BigDecimal getPricePerUnit() { return pricePerUnit; }
    public void setPricePerUnit(BigDecimal pricePerUnit) { this.pricePerUnit = pricePerUnit; }
    public String getUnit() { return unit; }
    public void setUnit(String unit) { this.unit = unit; }
    public SeedAvailabilityStatus getAvailabilityStatus() { return availabilityStatus; }
    public void setAvailabilityStatus(SeedAvailabilityStatus availabilityStatus) { this.availabilityStatus = availabilityStatus; }
    public boolean isActive() { return active; }
    public void setActive(boolean active) { this.active = active; }
    public Long getSupplierId() { return supplierId; }
    public void setSupplierId(Long supplierId) { this.supplierId = supplierId; }
    public String getSupplierName() { return supplierName; }
    public void setSupplierName(String supplierName) { this.supplierName = supplierName; }
    public String getSupplierEmail() { return supplierEmail; }
    public void setSupplierEmail(String supplierEmail) { this.supplierEmail = supplierEmail; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
