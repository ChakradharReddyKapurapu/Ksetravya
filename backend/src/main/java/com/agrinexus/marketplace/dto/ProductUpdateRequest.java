package com.agrinexus.marketplace.dto;

import com.agrinexus.marketplace.entity.ProductCategory;
import com.agrinexus.marketplace.entity.ProductStatus;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;

public class ProductUpdateRequest {

    @Size(max = 150, message = "Name must not exceed 150 characters")
    private String name;

    @Size(max = 3000, message = "Description must not exceed 3000 characters")
    private String description;

    private ProductCategory category;

    @Size(max = 100, message = "Subcategory must not exceed 100 characters")
    private String subcategory;

    @Size(max = 100, message = "Brand must not exceed 100 characters")
    private String brand;

    @PositiveOrZero(message = "Price must be positive or zero")
    private BigDecimal price;

    @Size(max = 30, message = "Unit must not exceed 30 characters")
    private String unit;

    @PositiveOrZero(message = "Stock quantity must be positive or zero")
    private Integer stockQuantity;

    private ProductStatus availabilityStatus;

    @Size(max = 200, message = "Location must not exceed 200 characters")
    private String location;

    @Size(max = 100, message = "District must not exceed 100 characters")
    private String district;

    @Size(max = 100, message = "State must not exceed 100 characters")
    private String state;

    @Size(max = 500, message = "Image URL must not exceed 500 characters")
    private String imageUrl;

    public ProductUpdateRequest() {
    }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public ProductCategory getCategory() { return category; }
    public void setCategory(ProductCategory category) { this.category = category; }
    public String getSubcategory() { return subcategory; }
    public void setSubcategory(String subcategory) { this.subcategory = subcategory; }
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
    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }
    public String getDistrict() { return district; }
    public void setDistrict(String district) { this.district = district; }
    public String getState() { return state; }
    public void setState(String state) { this.state = state; }
    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
}
