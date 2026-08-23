package com.agrinexus.land.entity;

import com.agrinexus.user.User;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "land_parcels", indexes = {
    @Index(name = "idx_lp_status", columnList = "status"),
    @Index(name = "idx_lp_soil_type", columnList = "soil_type"),
    @Index(name = "idx_lp_water_source", columnList = "water_source"),
    @Index(name = "idx_lp_district", columnList = "district"),
    @Index(name = "idx_lp_state", columnList = "state"),
    @Index(name = "idx_lp_owner", columnList = "owner_id"),
    @Index(name = "idx_lp_active", columnList = "active")
})
public class LandParcel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "owner_id", nullable = false)
    private User owner;

    @Column(nullable = false, length = 200)
    private String title;

    @Column(length = 3000)
    private String description;

    @Column(name = "survey_number", length = 100)
    private String surveyNumber;

    @Column(nullable = false, length = 200)
    private String location;

    @Column(nullable = false, length = 100)
    private String district;

    @Column(nullable = false, length = 100)
    private String state;

    @Column(nullable = false, precision = 8, scale = 2)
    private BigDecimal acreage;

    @Enumerated(EnumType.STRING)
    @Column(name = "soil_type", nullable = false, length = 50)
    private LandSoilType soilType;

    @Column(name = "soil_type_name", length = 100)
    private String soilTypeName;

    @Enumerated(EnumType.STRING)
    @Column(name = "water_source", nullable = false, length = 50)
    private WaterSourceType waterSource;

    @Column(name = "water_source_name", length = 150)
    private String waterSourceName;

    @Column(name = "has_river", nullable = false)
    private Boolean hasRiver = false;

    @Column(name = "has_borewell", nullable = false)
    private Boolean hasBorewell = false;

    @Column(name = "has_drip", nullable = false)
    private Boolean hasDrip = false;

    @Column(name = "has_canal", nullable = false)
    private Boolean hasCanal = false;

    @Column(name = "annual_rent_per_acre", nullable = false, precision = 12, scale = 2)
    private BigDecimal annualRentPerAcre;

    @Column(name = "total_annual_rent", nullable = false, precision = 12, scale = 2)
    private BigDecimal totalAnnualRent;

    @Column(name = "security_deposit_months")
    private Integer securityDepositMonths = 3;

    @Column(name = "lease_tenure", length = 100)
    private String leaseTenure;

    @Column(name = "available_from", length = 100)
    private String availableFrom = "Immediate";

    @Column(name = "verified_title", nullable = false)
    private Boolean verifiedTitle = true;

    @Column(name = "road_access", length = 150)
    private String roadAccess;

    @Column(length = 150)
    private String electricity;

    @Column(length = 150)
    private String fencing;

    @Column(name = "soil_health_score")
    private Integer soilHealthScore;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "land_suitable_crops", joinColumns = @JoinColumn(name = "parcel_id"))
    @Column(name = "crop", length = 100)
    private Set<String> suitableCrops = new HashSet<>();

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private LandStatus status = LandStatus.AVAILABLE;

    @Column(nullable = false)
    private Boolean active = true;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    public LandParcel() {
    }

    public LandParcel(Long id, User owner, String title, String description, String surveyNumber, String location, String district, String state, BigDecimal acreage, LandSoilType soilType, String soilTypeName, WaterSourceType waterSource, String waterSourceName, Boolean hasRiver, Boolean hasBorewell, Boolean hasDrip, Boolean hasCanal, BigDecimal annualRentPerAcre, BigDecimal totalAnnualRent, Integer securityDepositMonths, String leaseTenure, String availableFrom, Boolean verifiedTitle, String roadAccess, String electricity, String fencing, Integer soilHealthScore, Set<String> suitableCrops, LandStatus status, Boolean active, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.owner = owner;
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
        this.totalAnnualRent = totalAnnualRent;
        this.securityDepositMonths = securityDepositMonths != null ? securityDepositMonths : 3;
        this.leaseTenure = leaseTenure;
        this.availableFrom = availableFrom != null ? availableFrom : "Immediate";
        this.verifiedTitle = verifiedTitle != null ? verifiedTitle : true;
        this.roadAccess = roadAccess;
        this.electricity = electricity;
        this.fencing = fencing;
        this.soilHealthScore = soilHealthScore;
        this.suitableCrops = suitableCrops != null ? suitableCrops : new HashSet<>();
        this.status = status != null ? status : LandStatus.AVAILABLE;
        this.active = active != null ? active : true;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {
        private Long id;
        private User owner;
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
        private Boolean hasRiver = false;
        private Boolean hasBorewell = false;
        private Boolean hasDrip = false;
        private Boolean hasCanal = false;
        private BigDecimal annualRentPerAcre;
        private BigDecimal totalAnnualRent;
        private Integer securityDepositMonths = 3;
        private String leaseTenure;
        private String availableFrom = "Immediate";
        private Boolean verifiedTitle = true;
        private String roadAccess;
        private String electricity;
        private String fencing;
        private Integer soilHealthScore;
        private Set<String> suitableCrops = new HashSet<>();
        private LandStatus status = LandStatus.AVAILABLE;
        private Boolean active = true;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;

        public Builder id(Long id) { this.id = id; return this; }
        public Builder owner(User owner) { this.owner = owner; return this; }
        public Builder title(String title) { this.title = title; return this; }
        public Builder description(String description) { this.description = description; return this; }
        public Builder surveyNumber(String surveyNumber) { this.surveyNumber = surveyNumber; return this; }
        public Builder location(String location) { this.location = location; return this; }
        public Builder district(String district) { this.district = district; return this; }
        public Builder state(String state) { this.state = state; return this; }
        public Builder acreage(BigDecimal acreage) { this.acreage = acreage; return this; }
        public Builder soilType(LandSoilType soilType) { this.soilType = soilType; return this; }
        public Builder soilTypeName(String soilTypeName) { this.soilTypeName = soilTypeName; return this; }
        public Builder waterSource(WaterSourceType waterSource) { this.waterSource = waterSource; return this; }
        public Builder waterSourceName(String waterSourceName) { this.waterSourceName = waterSourceName; return this; }
        public Builder hasRiver(Boolean hasRiver) { this.hasRiver = hasRiver; return this; }
        public Builder hasBorewell(Boolean hasBorewell) { this.hasBorewell = hasBorewell; return this; }
        public Builder hasDrip(Boolean hasDrip) { this.hasDrip = hasDrip; return this; }
        public Builder hasCanal(Boolean hasCanal) { this.hasCanal = hasCanal; return this; }
        public Builder annualRentPerAcre(BigDecimal annualRentPerAcre) { this.annualRentPerAcre = annualRentPerAcre; return this; }
        public Builder totalAnnualRent(BigDecimal totalAnnualRent) { this.totalAnnualRent = totalAnnualRent; return this; }
        public Builder securityDepositMonths(Integer securityDepositMonths) { this.securityDepositMonths = securityDepositMonths; return this; }
        public Builder leaseTenure(String leaseTenure) { this.leaseTenure = leaseTenure; return this; }
        public Builder availableFrom(String availableFrom) { this.availableFrom = availableFrom; return this; }
        public Builder verifiedTitle(Boolean verifiedTitle) { this.verifiedTitle = verifiedTitle; return this; }
        public Builder roadAccess(String roadAccess) { this.roadAccess = roadAccess; return this; }
        public Builder electricity(String electricity) { this.electricity = electricity; return this; }
        public Builder fencing(String fencing) { this.fencing = fencing; return this; }
        public Builder soilHealthScore(Integer soilHealthScore) { this.soilHealthScore = soilHealthScore; return this; }
        public Builder suitableCrops(Set<String> suitableCrops) { this.suitableCrops = suitableCrops; return this; }
        public Builder status(LandStatus status) { this.status = status; return this; }
        public Builder active(Boolean active) { this.active = active; return this; }
        public Builder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }
        public Builder updatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; return this; }

        public LandParcel build() {
            return new LandParcel(id, owner, title, description, surveyNumber, location, district, state, acreage, soilType, soilTypeName, waterSource, waterSourceName, hasRiver, hasBorewell, hasDrip, hasCanal, annualRentPerAcre, totalAnnualRent, securityDepositMonths, leaseTenure, availableFrom, verifiedTitle, roadAccess, electricity, fencing, soilHealthScore, suitableCrops, status, active, createdAt, updatedAt);
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public User getOwner() { return owner; }
    public void setOwner(User owner) { this.owner = owner; }
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
    public Boolean getActive() { return active; }
    public void setActive(Boolean active) { this.active = active; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
