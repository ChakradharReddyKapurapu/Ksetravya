package com.agrinexus.tools.dto;

import com.agrinexus.tools.entity.ToolAvailabilityStatus;
import com.agrinexus.tools.entity.ToolCategory;
import com.agrinexus.tools.entity.ToolCondition;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;

public class ToolCreateRequest {

    @NotBlank(message = "Tool/Machinery name is required")
    @Size(max = 150, message = "Name must not exceed 150 characters")
    private String name;

    @Size(max = 2000, message = "Description must not exceed 2000 characters")
    private String description;

    @NotNull(message = "Tool category is required")
    private ToolCategory category;

    @Size(max = 100, message = "Brand must not exceed 100 characters")
    private String brand;

    @Size(max = 100, message = "Model must not exceed 100 characters")
    private String model;

    @Size(max = 100, message = "Type must not exceed 100 characters")
    private String type;

    private ToolCondition condition = ToolCondition.GOOD;

    @PositiveOrZero(message = "Power output must be positive or zero")
    private Double power;

    @Size(max = 20, message = "Power unit must not exceed 20 characters")
    private String powerUnit = "HP";

    @NotBlank(message = "Location is required")
    @Size(max = 200, message = "Location must not exceed 200 characters")
    private String location;

    @NotBlank(message = "District is required")
    @Size(max = 100, message = "District must not exceed 100 characters")
    private String district;

    @NotBlank(message = "State is required")
    @Size(max = 100, message = "State must not exceed 100 characters")
    private String state;

    @NotNull(message = "Price per day is required")
    @PositiveOrZero(message = "Price per day must be positive or zero")
    private BigDecimal pricePerDay;

    @PositiveOrZero(message = "Price per hour must be positive or zero")
    private BigDecimal pricePerHour;

    @PositiveOrZero(message = "Security deposit must be positive or zero")
    private BigDecimal securityDeposit;

    private ToolAvailabilityStatus availabilityStatus = ToolAvailabilityStatus.AVAILABLE;

    @Size(max = 500, message = "Image URL must not exceed 500 characters")
    private String imageUrl;

    private Integer year;

    @Size(max = 50, message = "Fuel type must not exceed 50 characters")
    private String fuelType;

    private Boolean operatorRequired = false;

    private Boolean deliveryAvailable = false;

    public ToolCreateRequest() {
    }

    public ToolCreateRequest(String name, String description, ToolCategory category, String brand, String model, String type, ToolCondition condition, Double power, String powerUnit, String location, String district, String state, BigDecimal pricePerDay, BigDecimal pricePerHour, BigDecimal securityDeposit, ToolAvailabilityStatus availabilityStatus, String imageUrl, Integer year, String fuelType, Boolean operatorRequired, Boolean deliveryAvailable) {
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
    }

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
}
