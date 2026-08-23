package com.agrinexus.land.dto;

import com.agrinexus.land.entity.LandSoilType;
import com.agrinexus.land.entity.WaterSourceType;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;
import java.util.Set;

public class LandParcelCreateRequest {

    @NotBlank(message = "Title is required")
    @Size(max = 200, message = "Title must not exceed 200 characters")
    private String title;

    @Size(max = 3000, message = "Description must not exceed 3000 characters")
    private String description;

    @Size(max = 100, message = "Survey number must not exceed 100 characters")
    private String surveyNumber;

    @NotBlank(message = "Location is required")
    @Size(max = 200, message = "Location must not exceed 200 characters")
    private String location;

    @NotBlank(message = "District is required")
    @Size(max = 100, message = "District must not exceed 100 characters")
    private String district;

    @NotBlank(message = "State is required")
    @Size(max = 100, message = "State must not exceed 100 characters")
    private String state;

    @NotNull(message = "Acreage is required")
    @Positive(message = "Acreage must be greater than zero")
    private BigDecimal acreage;

    @NotNull(message = "Soil type is required")
    private LandSoilType soilType;

    @Size(max = 100, message = "Soil type name must not exceed 100 characters")
    private String soilTypeName;

    @NotNull(message = "Water source is required")
    private WaterSourceType waterSource;

    @Size(max = 150, message = "Water source name must not exceed 150 characters")
    private String waterSourceName;

    private Boolean hasRiver = false;
    private Boolean hasBorewell = false;
    private Boolean hasDrip = false;
    private Boolean hasCanal = false;

    @NotNull(message = "Annual rent per acre is required")
    @PositiveOrZero(message = "Annual rent must be positive or zero")
    private BigDecimal annualRentPerAcre;

    private Integer securityDepositMonths = 3;

    @Size(max = 100, message = "Lease tenure must not exceed 100 characters")
    private String leaseTenure;

    @Size(max = 100, message = "Available from note must not exceed 100 characters")
    private String availableFrom = "Immediate";

    private Boolean verifiedTitle = true;

    @Size(max = 150, message = "Road access note must not exceed 150 characters")
    private String roadAccess;

    @Size(max = 150, message = "Electricity note must not exceed 150 characters")
    private String electricity;

    @Size(max = 150, message = "Fencing note must not exceed 150 characters")
    private String fencing;

    private Integer soilHealthScore;

    private Set<String> suitableCrops;

    public LandParcelCreateRequest() {
    }

    public LandParcelCreateRequest(String title, String description, String surveyNumber, String location, String district, String state, BigDecimal acreage, LandSoilType soilType, String soilTypeName, WaterSourceType waterSource, String waterSourceName, Boolean hasRiver, Boolean hasBorewell, Boolean hasDrip, Boolean hasCanal, BigDecimal annualRentPerAcre, Integer securityDepositMonths, String leaseTenure, String availableFrom, Boolean verifiedTitle, String roadAccess, String electricity, String fencing, Integer soilHealthScore, Set<String> suitableCrops) {
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
        this.hasRiver = hasRiver != null ? hasRiver : false;
        this.hasBorewell = hasBorewell != null ? hasBorewell : false;
        this.hasDrip = hasDrip != null ? hasDrip : false;
        this.hasCanal = hasCanal != null ? hasCanal : false;
        this.annualRentPerAcre = annualRentPerAcre;
        this.securityDepositMonths = securityDepositMonths != null ? securityDepositMonths : 3;
        this.leaseTenure = leaseTenure;
        this.availableFrom = availableFrom != null ? availableFrom : "Immediate";
        this.verifiedTitle = verifiedTitle != null ? verifiedTitle : true;
        this.roadAccess = roadAccess;
        this.electricity = electricity;
        this.fencing = fencing;
        this.soilHealthScore = soilHealthScore;
        this.suitableCrops = suitableCrops;
    }

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
}
