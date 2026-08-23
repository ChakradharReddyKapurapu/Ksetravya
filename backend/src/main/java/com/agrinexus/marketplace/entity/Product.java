package com.agrinexus.marketplace.entity;

import com.agrinexus.user.User;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "marketplace_products", indexes = {
    @Index(name = "idx_mp_category", columnList = "category"),
    @Index(name = "idx_mp_seller", columnList = "seller_id"),
    @Index(name = "idx_mp_status", columnList = "availability_status"),
    @Index(name = "idx_mp_district", columnList = "district"),
    @Index(name = "idx_mp_state", columnList = "state"),
    @Index(name = "idx_mp_active", columnList = "active")
})
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "seller_id", nullable = false)
    private User seller;

    @Column(nullable = false, length = 150)
    private String name;

    @Column(length = 3000)
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 40)
    private ProductCategory category;

    @Column(length = 100)
    private String subcategory;

    @Column(length = 100)
    private String brand;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal price;

    @Column(nullable = false, length = 30)
    private String unit = "KG";

    @Column(name = "stock_quantity", nullable = false)
    private Integer stockQuantity = 100;

    @Enumerated(EnumType.STRING)
    @Column(name = "availability_status", nullable = false, length = 30)
    private ProductStatus availabilityStatus = ProductStatus.ACTIVE;

    @Column(nullable = false, length = 200)
    private String location;

    @Column(nullable = false, length = 100)
    private String district;

    @Column(nullable = false, length = 100)
    private String state;

    @Column(name = "image_url", length = 500)
    private String imageUrl;

    @Column(name = "rating")
    private Double rating = 5.0;

    @Column(name = "review_count")
    private Integer reviewCount = 0;

    @Column(nullable = false)
    private Boolean active = true;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    public Product() {
    }

    public Product(Long id, User seller, String name, String description, ProductCategory category, String subcategory, String brand, BigDecimal price, String unit, Integer stockQuantity, ProductStatus availabilityStatus, String location, String district, String state, String imageUrl, Double rating, Integer reviewCount, Boolean active, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.seller = seller;
        this.name = name;
        this.description = description;
        this.category = category;
        this.subcategory = subcategory;
        this.brand = brand;
        this.price = price;
        this.unit = unit != null ? unit : "KG";
        this.stockQuantity = stockQuantity != null ? stockQuantity : 100;
        this.availabilityStatus = availabilityStatus != null ? availabilityStatus : ProductStatus.ACTIVE;
        this.location = location;
        this.district = district;
        this.state = state;
        this.imageUrl = imageUrl;
        this.rating = rating != null ? rating : 5.0;
        this.reviewCount = reviewCount != null ? reviewCount : 0;
        this.active = active != null ? active : true;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {
        private Long id;
        private User seller;
        private String name;
        private String description;
        private ProductCategory category;
        private String subcategory;
        private String brand;
        private BigDecimal price;
        private String unit = "KG";
        private Integer stockQuantity = 100;
        private ProductStatus availabilityStatus = ProductStatus.ACTIVE;
        private String location;
        private String district;
        private String state;
        private String imageUrl;
        private Double rating = 5.0;
        private Integer reviewCount = 0;
        private Boolean active = true;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;

        public Builder id(Long id) { this.id = id; return this; }
        public Builder seller(User seller) { this.seller = seller; return this; }
        public Builder name(String name) { this.name = name; return this; }
        public Builder description(String description) { this.description = description; return this; }
        public Builder category(ProductCategory category) { this.category = category; return this; }
        public Builder subcategory(String subcategory) { this.subcategory = subcategory; return this; }
        public Builder brand(String brand) { this.brand = brand; return this; }
        public Builder price(BigDecimal price) { this.price = price; return this; }
        public Builder unit(String unit) { this.unit = unit; return this; }
        public Builder stockQuantity(Integer stockQuantity) { this.stockQuantity = stockQuantity; return this; }
        public Builder availabilityStatus(ProductStatus availabilityStatus) { this.availabilityStatus = availabilityStatus; return this; }
        public Builder location(String location) { this.location = location; return this; }
        public Builder district(String district) { this.district = district; return this; }
        public Builder state(String state) { this.state = state; return this; }
        public Builder imageUrl(String imageUrl) { this.imageUrl = imageUrl; return this; }
        public Builder rating(Double rating) { this.rating = rating; return this; }
        public Builder reviewCount(Integer reviewCount) { this.reviewCount = reviewCount; return this; }
        public Builder active(Boolean active) { this.active = active; return this; }
        public Builder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }
        public Builder updatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; return this; }

        public Product build() {
            return new Product(id, seller, name, description, category, subcategory, brand, price, unit, stockQuantity, availabilityStatus, location, district, state, imageUrl, rating, reviewCount, active, createdAt, updatedAt);
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public User getSeller() { return seller; }
    public void setSeller(User seller) { this.seller = seller; }
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
    public Boolean getActive() { return active; }
    public void setActive(Boolean active) { this.active = active; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
