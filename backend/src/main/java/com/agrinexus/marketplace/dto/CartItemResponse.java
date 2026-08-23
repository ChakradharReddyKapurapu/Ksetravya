package com.agrinexus.marketplace.dto;

import com.agrinexus.marketplace.entity.CartItem;
import com.agrinexus.marketplace.entity.Product;
import com.agrinexus.marketplace.entity.ProductStatus;

import java.math.BigDecimal;

public class CartItemResponse {

    private Long id;
    private Long productId;
    private String productName;
    private String productImageUrl;
    private BigDecimal price;
    private String unit;
    private Integer stockQuantity;
    private Integer quantity;
    private BigDecimal subtotal;
    private ProductStatus availabilityStatus;

    public CartItemResponse() {
    }

    public CartItemResponse(Long id, Long productId, String productName, String productImageUrl, BigDecimal price, String unit, Integer stockQuantity, Integer quantity, BigDecimal subtotal, ProductStatus availabilityStatus) {
        this.id = id;
        this.productId = productId;
        this.productName = productName;
        this.productImageUrl = productImageUrl;
        this.price = price;
        this.unit = unit;
        this.stockQuantity = stockQuantity;
        this.quantity = quantity;
        this.subtotal = subtotal;
        this.availabilityStatus = availabilityStatus;
    }

    public static CartItemResponse fromEntity(CartItem item) {
        if (item == null) return null;
        Product p = item.getProduct();
        BigDecimal subtotal = p.getPrice().multiply(BigDecimal.valueOf(item.getQuantity()));
        return new CartItemResponse(
                item.getId(),
                p.getId(),
                p.getName(),
                p.getImageUrl(),
                p.getPrice(),
                p.getUnit(),
                p.getStockQuantity(),
                item.getQuantity(),
                subtotal,
                p.getAvailabilityStatus()
        );
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getProductId() { return productId; }
    public void setProductId(Long productId) { this.productId = productId; }
    public String getProductName() { return productName; }
    public void setProductName(String productName) { this.productName = productName; }
    public String getProductImageUrl() { return productImageUrl; }
    public void setProductImageUrl(String productImageUrl) { this.productImageUrl = productImageUrl; }
    public BigDecimal getPrice() { return price; }
    public void setPrice(BigDecimal price) { this.price = price; }
    public String getUnit() { return unit; }
    public void setUnit(String unit) { this.unit = unit; }
    public Integer getStockQuantity() { return stockQuantity; }
    public void setStockQuantity(Integer stockQuantity) { this.stockQuantity = stockQuantity; }
    public Integer getQuantity() { return quantity; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }
    public BigDecimal getSubtotal() { return subtotal; }
    public void setSubtotal(BigDecimal subtotal) { this.subtotal = subtotal; }
    public ProductStatus getAvailabilityStatus() { return availabilityStatus; }
    public void setAvailabilityStatus(ProductStatus availabilityStatus) { this.availabilityStatus = availabilityStatus; }
}
