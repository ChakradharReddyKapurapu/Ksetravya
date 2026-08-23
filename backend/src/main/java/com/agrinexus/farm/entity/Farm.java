package com.agrinexus.farm.entity;

import com.agrinexus.user.User;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "farms", indexes = {
    @Index(name = "idx_farm_user", columnList = "user_id", unique = true)
})
public class Farm {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    @Column(name = "farm_name", length = 120)
    private String farmName;

    @Column(nullable = false, length = 200)
    private String location;

    @Column(length = 100)
    private String district;

    @Column(nullable = false, length = 100)
    private String state;

    @Column(length = 10)
    private String pincode;

    @Column(nullable = false)
    private Double area;

    @Column(name = "area_unit", length = 30)
    private String areaUnit = "Acres";

    @Column(name = "soil_type", length = 80)
    private String soilType;

    @Column(name = "water_availability", length = 60)
    private String waterAvailability;

    @Column(name = "irrigation_type", length = 60)
    private String irrigationType;

    @Column(name = "current_crop", length = 100)
    private String currentCrop;

    @Column(length = 50)
    private String season;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    public Farm() {
    }

    public Farm(Long id, User user, String farmName, String location, String district, String state, String pincode, Double area, String areaUnit, String soilType, String waterAvailability, String irrigationType, String currentCrop, String season, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.user = user;
        this.farmName = farmName;
        this.location = location;
        this.district = district;
        this.state = state;
        this.pincode = pincode;
        this.area = area;
        this.areaUnit = areaUnit != null ? areaUnit : "Acres";
        this.soilType = soilType;
        this.waterAvailability = waterAvailability;
        this.irrigationType = irrigationType;
        this.currentCrop = currentCrop;
        this.season = season;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {
        private Long id;
        private User user;
        private String farmName;
        private String location;
        private String district;
        private String state;
        private String pincode;
        private Double area;
        private String areaUnit = "Acres";
        private String soilType;
        private String waterAvailability;
        private String irrigationType;
        private String currentCrop;
        private String season;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;

        public Builder id(Long id) {
            this.id = id;
            return this;
        }

        public Builder user(User user) {
            this.user = user;
            return this;
        }

        public Builder farmName(String farmName) {
            this.farmName = farmName;
            return this;
        }

        public Builder location(String location) {
            this.location = location;
            return this;
        }

        public Builder district(String district) {
            this.district = district;
            return this;
        }

        public Builder state(String state) {
            this.state = state;
            return this;
        }

        public Builder pincode(String pincode) {
            this.pincode = pincode;
            return this;
        }

        public Builder area(Double area) {
            this.area = area;
            return this;
        }

        public Builder areaUnit(String areaUnit) {
            this.areaUnit = areaUnit;
            return this;
        }

        public Builder soilType(String soilType) {
            this.soilType = soilType;
            return this;
        }

        public Builder waterAvailability(String waterAvailability) {
            this.waterAvailability = waterAvailability;
            return this;
        }

        public Builder irrigationType(String irrigationType) {
            this.irrigationType = irrigationType;
            return this;
        }

        public Builder currentCrop(String currentCrop) {
            this.currentCrop = currentCrop;
            return this;
        }

        public Builder season(String season) {
            this.season = season;
            return this;
        }

        public Builder createdAt(LocalDateTime createdAt) {
            this.createdAt = createdAt;
            return this;
        }

        public Builder updatedAt(LocalDateTime updatedAt) {
            this.updatedAt = updatedAt;
            return this;
        }

        public Farm build() {
            return new Farm(id, user, farmName, location, district, state, pincode, area, areaUnit, soilType, waterAvailability, irrigationType, currentCrop, season, createdAt, updatedAt);
        }
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getFarmName() {
        return farmName;
    }

    public void setFarmName(String farmName) {
        this.farmName = farmName;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getDistrict() {
        return district;
    }

    public void setDistrict(String district) {
        this.district = district;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getPincode() {
        return pincode;
    }

    public void setPincode(String pincode) {
        this.pincode = pincode;
    }

    public Double getArea() {
        return area;
    }

    public void setArea(Double area) {
        this.area = area;
    }

    public String getAreaUnit() {
        return areaUnit;
    }

    public void setAreaUnit(String areaUnit) {
        this.areaUnit = areaUnit;
    }

    public String getSoilType() {
        return soilType;
    }

    public void setSoilType(String soilType) {
        this.soilType = soilType;
    }

    public String getWaterAvailability() {
        return waterAvailability;
    }

    public void setWaterAvailability(String waterAvailability) {
        this.waterAvailability = waterAvailability;
    }

    public String getIrrigationType() {
        return irrigationType;
    }

    public void setIrrigationType(String irrigationType) {
        this.irrigationType = irrigationType;
    }

    public String getCurrentCrop() {
        return currentCrop;
    }

    public void setCurrentCrop(String currentCrop) {
        this.currentCrop = currentCrop;
    }

    public String getSeason() {
        return season;
    }

    public void setSeason(String season) {
        this.season = season;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}
