package com.agrinexus.admin.dto;

import com.agrinexus.marketplace.entity.ProductCategory;
import com.agrinexus.marketplace.entity.ProductStatus;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class AdminProductResponse {

    private Long id;
    private String name;
    private String description;
    private ProductCategory category;
    private String brand;
    private BigDecimal price;
    private String unit;
    private Integer stockQuantity;
    private ProductStatus availabilityStatus;
    private boolean active;
    private Long sellerId;
    private String sellerName;
    private String sellerEmail;
    private String location;
    private String district;
    private String state;
    private LocalDateTime createdAt;

    public AdminProductResponse() {
    }

    public AdminProductResponse(Long id, String name, String description, ProductCategory category, String brand, BigDecimal price, String unit, Integer stockQuantity, ProductStatus availabilityStatus, boolean active, Long sellerId, String sellerName, String sellerEmail, String location, String district, String state, LocalDateTime createdAt) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.category = category;
        this.brand = brand;
        this.price = price;
        this.unit = unit;
        this.stockQuantity = stockQuantity;
        this.availabilityStatus = availabilityStatus;
        this.active = active;
        this.sellerId = sellerId;
        this.sellerName = sellerName;
        this.sellerEmail = sellerEmail;
        this.location = location;
        this.district = district;
        this.state = state;
        this.createdAt = createdAt;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public ProductCategory getCategory() { return category; }
    public void setCategory(ProductCategory category) { this.category = category; }
    public String getBrand() { return brand; }
    public void setBrand(String brand) { this.brand = brand; }
    public BigDecimal getPrice() { return price; }
    public void setPrice(BigDecimal price) { this.price = price; }
    public String getUnit() { return unit; }
    public void setUnit(String unit) { this.unit = unit; }
    public Integer getStockQuantity() { return stockQuantity; }
    public void setStockQuantity(Integer stockQuantity) { this.stockQuantity = stockQuantity; }
    public ProductStatus getAvailabilityStatus() { return availabilityStatus; }
    public void setAvailabilityStatus(ProductStatus availabilityStatus) { this.availabilityStatus = availabilityStatus; }
    public boolean isActive() { return active; }
    public void setActive(boolean active) { this.active = active; }
    public Long getSellerId() { return sellerId; }
    public void setSellerId(Long sellerId) { this.sellerId = sellerId; }
    public String getSellerName() { return sellerName; }
    public void setSellerName(String sellerName) { this.sellerName = sellerName; }
    public String getSellerEmail() { return sellerEmail; }
    public void setSellerEmail(String sellerEmail) { this.sellerEmail = sellerEmail; }
    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }
    public String getDistrict() { return district; }
    public void setDistrict(String district) { this.district = district; }
    public String getState() { return state; }
    public void setState(String state) { this.state = state; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
