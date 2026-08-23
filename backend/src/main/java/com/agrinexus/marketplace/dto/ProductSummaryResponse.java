package com.agrinexus.marketplace.dto;

import com.agrinexus.marketplace.entity.Product;
import com.agrinexus.marketplace.entity.ProductCategory;
import com.agrinexus.marketplace.entity.ProductStatus;

import java.math.BigDecimal;

public class ProductSummaryResponse {

    private Long id;
    private String name;
    private ProductCategory category;
    private String subcategory;
    private String brand;
    private BigDecimal price;
    private String unit;
    private Integer stockQuantity;
    private ProductStatus availabilityStatus;
    private String district;
    private String state;
    private String imageUrl;
    private Double rating;

    public ProductSummaryResponse() {
    }

    public ProductSummaryResponse(Long id, String name, ProductCategory category, String subcategory, String brand, BigDecimal price, String unit, Integer stockQuantity, ProductStatus availabilityStatus, String district, String state, String imageUrl, Double rating) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.subcategory = subcategory;
        this.brand = brand;
        this.price = price;
        this.unit = unit;
        this.stockQuantity = stockQuantity;
        this.availabilityStatus = availabilityStatus;
        this.district = district;
        this.state = state;
        this.imageUrl = imageUrl;
        this.rating = rating;
    }

    public static ProductSummaryResponse fromEntity(Product product) {
        if (product == null) return null;
        return new ProductSummaryResponse(
                product.getId(),
                product.getName(),
                product.getCategory(),
                product.getSubcategory(),
                product.getBrand(),
                product.getPrice(),
                product.getUnit(),
                product.getStockQuantity(),
                product.getAvailabilityStatus(),
                product.getDistrict(),
                product.getState(),
                product.getImageUrl(),
                product.getRating()
        );
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
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
    public String getDistrict() { return district; }
    public void setDistrict(String district) { this.district = district; }
    public String getState() { return state; }
    public void setState(String state) { this.state = state; }
    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    public Double getRating() { return rating; }
    public void setRating(Double rating) { this.rating = rating; }
}
