package com.agrinexus.admin.dto;

import com.agrinexus.land.entity.LandSoilType;
import com.agrinexus.land.entity.LandStatus;
import com.agrinexus.land.entity.WaterSourceType;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class AdminLandResponse {

    private Long id;
    private String title;
    private String description;
    private String location;
    private String district;
    private String state;
    private BigDecimal acreage;
    private LandSoilType soilType;
    private WaterSourceType waterSource;
    private BigDecimal annualRentPerAcre;
    private BigDecimal totalAnnualRent;
    private LandStatus status;
    private boolean active;
    private Long ownerId;
    private String ownerName;
    private String ownerEmail;
    private LocalDateTime createdAt;

    public AdminLandResponse() {
    }

    public AdminLandResponse(Long id, String title, String description, String location, String district, String state, BigDecimal acreage, LandSoilType soilType, WaterSourceType waterSource, BigDecimal annualRentPerAcre, BigDecimal totalAnnualRent, LandStatus status, boolean active, Long ownerId, String ownerName, String ownerEmail, LocalDateTime createdAt) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.location = location;
        this.district = district;
        this.state = state;
        this.acreage = acreage;
        this.soilType = soilType;
        this.waterSource = waterSource;
        this.annualRentPerAcre = annualRentPerAcre;
        this.totalAnnualRent = totalAnnualRent;
        this.status = status;
        this.active = active;
        this.ownerId = ownerId;
        this.ownerName = ownerName;
        this.ownerEmail = ownerEmail;
        this.createdAt = createdAt;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }
    public String getDistrict() { return district; }
    public void setDistrict(String district) { this.district = district; }
    public String getState() { return state; }
    public void setState(String state) { this.state = state; }
    public BigDecimal getAcreage() { return acreage; }
    public void setAcreage(BigDecimal acreage) { this.acreage = acreage; }
    public LandSoilType getSoilType() { return soilType; }
    public void setSoilType(LandSoilType soilType) { this.soilType = soilType; }
    public WaterSourceType getWaterSource() { return waterSource; }
    public void setWaterSource(WaterSourceType waterSource) { this.waterSource = waterSource; }
    public BigDecimal getAnnualRentPerAcre() { return annualRentPerAcre; }
    public void setAnnualRentPerAcre(BigDecimal annualRentPerAcre) { this.annualRentPerAcre = annualRentPerAcre; }
    public BigDecimal getTotalAnnualRent() { return totalAnnualRent; }
    public void setTotalAnnualRent(BigDecimal totalAnnualRent) { this.totalAnnualRent = totalAnnualRent; }
    public LandStatus getStatus() { return status; }
    public void setStatus(LandStatus status) { this.status = status; }
    public boolean isActive() { return active; }
    public void setActive(boolean active) { this.active = active; }
    public Long getOwnerId() { return ownerId; }
    public void setOwnerId(Long ownerId) { this.ownerId = ownerId; }
    public String getOwnerName() { return ownerName; }
    public void setOwnerName(String ownerName) { this.ownerName = ownerName; }
    public String getOwnerEmail() { return ownerEmail; }
    public void setOwnerEmail(String ownerEmail) { this.ownerEmail = ownerEmail; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
