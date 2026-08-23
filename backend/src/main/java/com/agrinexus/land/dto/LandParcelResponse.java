package com.agrinexus.land.dto;

import com.agrinexus.land.entity.LandParcel;
import com.agrinexus.land.entity.LandSoilType;
import com.agrinexus.land.entity.LandStatus;
import com.agrinexus.land.entity.WaterSourceType;
import com.fasterxml.jackson.annotation.JsonFormat;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Set;

public class LandParcelResponse {

    private Long id;
    private String title;
    private String description;
    private String surveyNumber;
    private String location;
    private String district;
    private String state;
    private BigDecimal acreage;
    private LandSoilType soilType;
    private String soilTypeName;
    private WaterSourceType waterSource;
    private String waterSourceName;
    private Boolean hasRiver;
    private Boolean hasBorewell;
    private Boolean hasDrip;
    private Boolean hasCanal;
    private BigDecimal annualRentPerAcre;
    private BigDecimal totalAnnualRent;
    private Integer securityDepositMonths;
    private String leaseTenure;
    private String availableFrom;
    private Boolean verifiedTitle;
    private String roadAccess;
    private String electricity;
    private String fencing;
    private Integer soilHealthScore;
    private Set<String> suitableCrops;
    private LandStatus status;
    private LandOwnerSummary owner;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime createdAt;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime updatedAt;

    public LandParcelResponse() {
    }

    public LandParcelResponse(Long id, String title, String description, String surveyNumber, String location, String district, String state, BigDecimal acreage, LandSoilType soilType, String soilTypeName, WaterSourceType waterSource, String waterSourceName, Boolean hasRiver, Boolean hasBorewell, Boolean hasDrip, Boolean hasCanal, BigDecimal annualRentPerAcre, BigDecimal totalAnnualRent, Integer securityDepositMonths, String leaseTenure, String availableFrom, Boolean verifiedTitle, String roadAccess, String electricity, String fencing, Integer soilHealthScore, Set<String> suitableCrops, LandStatus status, LandOwnerSummary owner, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.surveyNumber = surveyNumber;
        this.location = location;
        this.district = district;
        this.state = state;
        this.acreage = acreage;
        this.soilType = soilType;
        this.soilTypeName = soilTypeName;
        this.waterSource = waterSource;
        this.waterSourceName = waterSourceName;
        this.hasRiver = hasRiver;
        this.hasBorewell = hasBorewell;
        this.hasDrip = hasDrip;
        this.hasCanal = hasCanal;
        this.annualRentPerAcre = annualRentPerAcre;
        this.totalAnnualRent = totalAnnualRent;
        this.securityDepositMonths = securityDepositMonths;
        this.leaseTenure = leaseTenure;
        this.availableFrom = availableFrom;
        this.verifiedTitle = verifiedTitle;
        this.roadAccess = roadAccess;
        this.electricity = electricity;
        this.fencing = fencing;
        this.soilHealthScore = soilHealthScore;
        this.suitableCrops = suitableCrops;
        this.status = status;
        this.owner = owner;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public static LandParcelResponse fromEntity(LandParcel lp) {
        if (lp == null) return null;
        return new LandParcelResponse(
                lp.getId(),
                lp.getTitle(),
                lp.getDescription(),
                lp.getSurveyNumber(),
                lp.getLocation(),
                lp.getDistrict(),
                lp.getState(),
                lp.getAcreage(),
                lp.getSoilType(),
                lp.getSoilTypeName(),
                lp.getWaterSource(),
                lp.getWaterSourceName(),
                lp.getHasRiver(),
                lp.getHasBorewell(),
                lp.getHasDrip(),
                lp.getHasCanal(),
                lp.getAnnualRentPerAcre(),
                lp.getTotalAnnualRent(),
                lp.getSecurityDepositMonths(),
                lp.getLeaseTenure(),
                lp.getAvailableFrom(),
                lp.getVerifiedTitle(),
                lp.getRoadAccess(),
                lp.getElectricity(),
                lp.getFencing(),
                lp.getSoilHealthScore(),
                lp.getSuitableCrops(),
                lp.getStatus(),
                LandOwnerSummary.fromEntity(lp.getOwner()),
                lp.getCreatedAt(),
                lp.getUpdatedAt()
        );
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getSurveyNumber() { return surveyNumber; }
    public void setSurveyNumber(String surveyNumber) { this.surveyNumber = surveyNumber; }
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
    public String getSoilTypeName() { return soilTypeName; }
    public void setSoilTypeName(String soilTypeName) { this.soilTypeName = soilTypeName; }
    public WaterSourceType getWaterSource() { return waterSource; }
    public void setWaterSource(WaterSourceType waterSource) { this.waterSource = waterSource; }
    public String getWaterSourceName() { return waterSourceName; }
    public void setWaterSourceName(String waterSourceName) { this.waterSourceName = waterSourceName; }
    public Boolean getHasRiver() { return hasRiver; }
    public void setHasRiver(Boolean hasRiver) { this.hasRiver = hasRiver; }
    public Boolean getHasBorewell() { return hasBorewell; }
    public void setHasBorewell(Boolean hasBorewell) { this.hasBorewell = hasBorewell; }
    public Boolean getHasDrip() { return hasDrip; }
    public void setHasDrip(Boolean hasDrip) { this.hasDrip = hasDrip; }
    public Boolean getHasCanal() { return hasCanal; }
    public void setHasCanal(Boolean hasCanal) { this.hasCanal = hasCanal; }
    public BigDecimal getAnnualRentPerAcre() { return annualRentPerAcre; }
    public void setAnnualRentPerAcre(BigDecimal annualRentPerAcre) { this.annualRentPerAcre = annualRentPerAcre; }
    public BigDecimal getTotalAnnualRent() { return totalAnnualRent; }
    public void setTotalAnnualRent(BigDecimal totalAnnualRent) { this.totalAnnualRent = totalAnnualRent; }
    public Integer getSecurityDepositMonths() { return securityDepositMonths; }
    public void setSecurityDepositMonths(Integer securityDepositMonths) { this.securityDepositMonths = securityDepositMonths; }
    public String getLeaseTenure() { return leaseTenure; }
    public void setLeaseTenure(String leaseTenure) { this.leaseTenure = leaseTenure; }
    public String getAvailableFrom() { return availableFrom; }
    public void setAvailableFrom(String availableFrom) { this.availableFrom = availableFrom; }
    public Boolean getVerifiedTitle() { return verifiedTitle; }
    public void setVerifiedTitle(Boolean verifiedTitle) { this.verifiedTitle = verifiedTitle; }
    public String getRoadAccess() { return roadAccess; }
    public void setRoadAccess(String roadAccess) { this.roadAccess = roadAccess; }
    public String getElectricity() { return electricity; }
    public void setElectricity(String electricity) { this.electricity = electricity; }
    public String getFencing() { return fencing; }
    public void setFencing(String fencing) { this.fencing = fencing; }
    public Integer getSoilHealthScore() { return soilHealthScore; }
    public void setSoilHealthScore(Integer soilHealthScore) { this.soilHealthScore = soilHealthScore; }
    public Set<String> getSuitableCrops() { return suitableCrops; }
    public void setSuitableCrops(Set<String> suitableCrops) { this.suitableCrops = suitableCrops; }
    public LandStatus getStatus() { return status; }
    public void setStatus(LandStatus status) { this.status = status; }
    public LandOwnerSummary getOwner() { return owner; }
    public void setOwner(LandOwnerSummary owner) { this.owner = owner; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
