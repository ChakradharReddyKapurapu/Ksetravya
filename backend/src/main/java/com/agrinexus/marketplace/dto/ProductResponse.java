package com.agrinexus.marketplace.dto;

import com.agrinexus.marketplace.entity.Product;
import com.agrinexus.marketplace.entity.ProductCategory;
import com.agrinexus.marketplace.entity.ProductStatus;
import com.fasterxml.jackson.annotation.JsonFormat;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class ProductResponse {

    private Long id;
    private String name;
    private String description;
    private ProductCategory category;
    private String subcategory;
    private String brand;
    private BigDecimal price;
    private String unit;
    private Integer stockQuantity;
    private ProductStatus availabilityStatus;
    private String location;
    private String district;
    private String state;
    private String imageUrl;
    private Double rating;
    private Integer reviewCount;
    private ProductSellerSummary seller;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime createdAt;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime updatedAt;

    public ProductResponse() {
    }

    public ProductResponse(Long id, String name, String description, ProductCategory category, String subcategory, String brand, BigDecimal price, String unit, Integer stockQuantity, ProductStatus availabilityStatus, String location, String district, String state, String imageUrl, Double rating, Integer reviewCount, ProductSellerSummary seller, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.category = category;
        this.subcategory = subcategory;
        this.brand = brand;
        this.price = price;
        this.unit = unit;
        this.stockQuantity = stockQuantity;
        this.availabilityStatus = availabilityStatus;
        this.location = location;
        this.district = district;
        this.state = state;
        this.imageUrl = imageUrl;
        this.rating = rating;
        this.reviewCount = reviewCount;
        this.seller = seller;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public static ProductResponse fromEntity(Product product) {
        if (product == null) return null;
        return new ProductResponse(
                product.getId(),
                product.getName(),
                product.getDescription(),
                product.getCategory(),
                product.getSubcategory(),
                product.getBrand(),
                product.getPrice(),
                product.getUnit(),
                product.getStockQuantity(),
                product.getAvailabilityStatus(),
                product.getLocation(),
                product.getDistrict(),
                product.getState(),
                product.getImageUrl(),
                product.getRating(),
                product.getReviewCount(),
                ProductSellerSummary.fromEntity(product.getSeller()),
                product.getCreatedAt(),
                product.getUpdatedAt()
        );
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
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
    public Double getRating() { return rating; }
    public void setRating(Double rating) { this.rating = rating; }
    public Integer getReviewCount() { return reviewCount; }
    public void setReviewCount(Integer reviewCount) { this.reviewCount = reviewCount; }
    public ProductSellerSummary getSeller() { return seller; }
    public void setSeller(ProductSellerSummary seller) { this.seller = seller; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
