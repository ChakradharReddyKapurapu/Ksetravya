package com.agrinexus.tools.entity;

import com.agrinexus.user.User;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "tools", indexes = {
    @Index(name = "idx_tool_category", columnList = "category"),
    @Index(name = "idx_tool_district", columnList = "district"),
    @Index(name = "idx_tool_state", columnList = "state"),
    @Index(name = "idx_tool_availability", columnList = "availability_status"),
    @Index(name = "idx_tool_owner", columnList = "owner_id")
})
public class Tool {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "owner_id", nullable = false)
    private User owner;

    @Column(nullable = false, length = 150)
    private String name;

    @Column(length = 2000)
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 40)
    private ToolCategory category;

    @Column(length = 100)
    private String brand;

    @Column(length = 100)
    private String model;

    @Column(length = 100)
    private String type;

    @Enumerated(EnumType.STRING)
    @Column(name = "tool_condition", nullable = false, length = 30)
    private ToolCondition condition = ToolCondition.GOOD;

    @Column
    private Double power;

    @Column(name = "power_unit", length = 20)
    private String powerUnit = "HP";

    @Column(nullable = false, length = 200)
    private String location;

    @Column(nullable = false, length = 100)
    private String district;

    @Column(nullable = false, length = 100)
    private String state;

    @Column(name = "price_per_day", nullable = false, precision = 12, scale = 2)
    private BigDecimal pricePerDay;

    @Column(name = "price_per_hour", precision = 12, scale = 2)
    private BigDecimal pricePerHour;

    @Column(name = "security_deposit", precision = 12, scale = 2)
    private BigDecimal securityDeposit;

    @Enumerated(EnumType.STRING)
    @Column(name = "availability_status", nullable = false, length = 30)
    private ToolAvailabilityStatus availabilityStatus = ToolAvailabilityStatus.AVAILABLE;

    @Column(name = "image_url", length = 500)
    private String imageUrl;

    @Column(name = "model_year")
    private Integer year;

    @Column(name = "fuel_type", length = 50)
    private String fuelType;

    @Column(name = "operator_required", nullable = false)
    private Boolean operatorRequired = false;

    @Column(name = "delivery_available", nullable = false)
    private Boolean deliveryAvailable = false;

    @Column(nullable = false)
    private Boolean active = true;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    public Tool() {
    }

    public Tool(Long id, User owner, String name, String description, ToolCategory category, String brand, String model, String type, ToolCondition condition, Double power, String powerUnit, String location, String district, String state, BigDecimal pricePerDay, BigDecimal pricePerHour, BigDecimal securityDeposit, ToolAvailabilityStatus availabilityStatus, String imageUrl, Integer year, String fuelType, Boolean operatorRequired, Boolean deliveryAvailable, Boolean active, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.owner = owner;
        this.name = name;
        this.description = description;
        this.category = category;
        this.brand = brand;
        this.model = model;
        this.type = type;
        this.condition = condition != null ? condition : ToolCondition.GOOD;
        this.power = power;
        this.powerUnit = powerUnit != null ? powerUnit : "HP";
        this.location = location;
        this.district = district;
        this.state = state;
        this.pricePerDay = pricePerDay;
        this.pricePerHour = pricePerHour;
        this.securityDeposit = securityDeposit;
        this.availabilityStatus = availabilityStatus != null ? availabilityStatus : ToolAvailabilityStatus.AVAILABLE;
        this.imageUrl = imageUrl;
        this.year = year;
        this.fuelType = fuelType;
        this.operatorRequired = operatorRequired != null ? operatorRequired : false;
        this.deliveryAvailable = deliveryAvailable != null ? deliveryAvailable : false;
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
        private String name;
        private String description;
        private ToolCategory category;
        private String brand;
        private String model;
        private String type;
        private ToolCondition condition = ToolCondition.GOOD;
        private Double power;
        private String powerUnit = "HP";
        private String location;
        private String district;
        private String state;
        private BigDecimal pricePerDay;
        private BigDecimal pricePerHour;
        private BigDecimal securityDeposit;
        private ToolAvailabilityStatus availabilityStatus = ToolAvailabilityStatus.AVAILABLE;
        private String imageUrl;
        private Integer year;
        private String fuelType;
        private Boolean operatorRequired = false;
        private Boolean deliveryAvailable = false;
        private Boolean active = true;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;

        public Builder id(Long id) { this.id = id; return this; }
        public Builder owner(User owner) { this.owner = owner; return this; }
        public Builder name(String name) { this.name = name; return this; }
        public Builder description(String description) { this.description = description; return this; }
        public Builder category(ToolCategory category) { this.category = category; return this; }
        public Builder brand(String brand) { this.brand = brand; return this; }
        public Builder model(String model) { this.model = model; return this; }
        public Builder type(String type) { this.type = type; return this; }
        public Builder condition(ToolCondition condition) { this.condition = condition; return this; }
        public Builder power(Double power) { this.power = power; return this; }
        public Builder powerUnit(String powerUnit) { this.powerUnit = powerUnit; return this; }
        public Builder location(String location) { this.location = location; return this; }
        public Builder district(String district) { this.district = district; return this; }
        public Builder state(String state) { this.state = state; return this; }
        public Builder pricePerDay(BigDecimal pricePerDay) { this.pricePerDay = pricePerDay; return this; }
        public Builder pricePerHour(BigDecimal pricePerHour) { this.pricePerHour = pricePerHour; return this; }
        public Builder securityDeposit(BigDecimal securityDeposit) { this.securityDeposit = securityDeposit; return this; }
        public Builder availabilityStatus(ToolAvailabilityStatus availabilityStatus) { this.availabilityStatus = availabilityStatus; return this; }
        public Builder imageUrl(String imageUrl) { this.imageUrl = imageUrl; return this; }
        public Builder year(Integer year) { this.year = year; return this; }
        public Builder fuelType(String fuelType) { this.fuelType = fuelType; return this; }
        public Builder operatorRequired(Boolean operatorRequired) { this.operatorRequired = operatorRequired; return this; }
        public Builder deliveryAvailable(Boolean deliveryAvailable) { this.deliveryAvailable = deliveryAvailable; return this; }
        public Builder active(Boolean active) { this.active = active; return this; }
        public Builder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }
        public Builder updatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; return this; }

        public Tool build() {
            return new Tool(id, owner, name, description, category, brand, model, type, condition, power, powerUnit, location, district, state, pricePerDay, pricePerHour, securityDeposit, availabilityStatus, imageUrl, year, fuelType, operatorRequired, deliveryAvailable, active, createdAt, updatedAt);
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public User getOwner() { return owner; }
    public void setOwner(User owner) { this.owner = owner; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public ToolCategory getCategory() { return category; }
    public void setCategory(ToolCategory category) { this.category = category; }
    public String getBrand() { return brand; }
    public void setBrand(String brand) { this.brand = brand; }
    public String getModel() { return model; }
    public void setModel(String model) { this.model = model; }
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
    public ToolCondition getCondition() { return condition; }
    public void setCondition(ToolCondition condition) { this.condition = condition; }
    public Double getPower() { return power; }
    public void setPower(Double power) { this.power = power; }
    public String getPowerUnit() { return powerUnit; }
    public void setPowerUnit(String powerUnit) { this.powerUnit = powerUnit; }
    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }
    public String getDistrict() { return district; }
    public void setDistrict(String district) { this.district = district; }
    public String getState() { return state; }
    public void setState(String state) { this.state = state; }
    public BigDecimal getPricePerDay() { return pricePerDay; }
    public void setPricePerDay(BigDecimal pricePerDay) { this.pricePerDay = pricePerDay; }
    public BigDecimal getPricePerHour() { return pricePerHour; }
    public void setPricePerHour(BigDecimal pricePerHour) { this.pricePerHour = pricePerHour; }
    public BigDecimal getSecurityDeposit() { return securityDeposit; }
    public void setSecurityDeposit(BigDecimal securityDeposit) { this.securityDeposit = securityDeposit; }
    public ToolAvailabilityStatus getAvailabilityStatus() { return availabilityStatus; }
    public void setAvailabilityStatus(ToolAvailabilityStatus availabilityStatus) { this.availabilityStatus = availabilityStatus; }
    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    public Integer getYear() { return year; }
    public void setYear(Integer year) { this.year = year; }
    public String getFuelType() { return fuelType; }
    public void setFuelType(String fuelType) { this.fuelType = fuelType; }
    public Boolean getOperatorRequired() { return operatorRequired; }
    public void setOperatorRequired(Boolean operatorRequired) { this.operatorRequired = operatorRequired; }
    public Boolean getDeliveryAvailable() { return deliveryAvailable; }
    public void setDeliveryAvailable(Boolean deliveryAvailable) { this.deliveryAvailable = deliveryAvailable; }
    public Boolean getActive() { return active; }
    public void setActive(Boolean active) { this.active = active; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
