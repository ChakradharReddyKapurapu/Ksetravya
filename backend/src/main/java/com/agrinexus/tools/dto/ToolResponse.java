package com.agrinexus.tools.dto;

import com.agrinexus.tools.entity.Tool;
import com.agrinexus.tools.entity.ToolAvailabilityStatus;
import com.agrinexus.tools.entity.ToolCategory;
import com.agrinexus.tools.entity.ToolCondition;
import com.fasterxml.jackson.annotation.JsonFormat;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class ToolResponse {

    private Long id;
    private String name;
    private String description;
    private ToolCategory category;
    private String brand;
    private String model;
    private String type;
    private ToolCondition condition;
    private Double power;
    private String powerUnit;
    private String location;
    private String district;
    private String state;
    private BigDecimal pricePerDay;
    private BigDecimal pricePerHour;
    private BigDecimal securityDeposit;
    private ToolAvailabilityStatus availabilityStatus;
    private String imageUrl;
    private Integer year;
    private String fuelType;
    private Boolean operatorRequired;
    private Boolean deliveryAvailable;
    private ToolOwnerSummary owner;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime createdAt;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime updatedAt;

    public ToolResponse() {
    }

    public ToolResponse(Long id, String name, String description, ToolCategory category, String brand, String model, String type, ToolCondition condition, Double power, String powerUnit, String location, String district, String state, BigDecimal pricePerDay, BigDecimal pricePerHour, BigDecimal securityDeposit, ToolAvailabilityStatus availabilityStatus, String imageUrl, Integer year, String fuelType, Boolean operatorRequired, Boolean deliveryAvailable, ToolOwnerSummary owner, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.category = category;
        this.brand = brand;
        this.model = model;
        this.type = type;
        this.condition = condition;
        this.power = power;
        this.powerUnit = powerUnit;
        this.location = location;
        this.district = district;
        this.state = state;
        this.pricePerDay = pricePerDay;
        this.pricePerHour = pricePerHour;
        this.securityDeposit = securityDeposit;
        this.availabilityStatus = availabilityStatus;
        this.imageUrl = imageUrl;
        this.year = year;
        this.fuelType = fuelType;
        this.operatorRequired = operatorRequired;
        this.deliveryAvailable = deliveryAvailable;
        this.owner = owner;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public static ToolResponse fromEntity(Tool tool) {
        if (tool == null) return null;
        return new ToolResponse(
                tool.getId(),
                tool.getName(),
                tool.getDescription(),
                tool.getCategory(),
                tool.getBrand(),
                tool.getModel(),
                tool.getType(),
                tool.getCondition(),
                tool.getPower(),
                tool.getPowerUnit(),
                tool.getLocation(),
                tool.getDistrict(),
                tool.getState(),
                tool.getPricePerDay(),
                tool.getPricePerHour(),
                tool.getSecurityDeposit(),
                tool.getAvailabilityStatus(),
                tool.getImageUrl(),
                tool.getYear(),
                tool.getFuelType(),
                tool.getOperatorRequired(),
                tool.getDeliveryAvailable(),
                ToolOwnerSummary.fromEntity(tool.getOwner()),
                tool.getCreatedAt(),
                tool.getUpdatedAt()
        );
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
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
    public ToolOwnerSummary getOwner() { return owner; }
    public void setOwner(ToolOwnerSummary owner) { this.owner = owner; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
