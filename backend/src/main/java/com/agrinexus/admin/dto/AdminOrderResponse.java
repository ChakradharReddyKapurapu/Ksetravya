package com.agrinexus.admin.dto;

import com.agrinexus.marketplace.entity.OrderStatus;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class AdminOrderResponse {

    private Long id;
    private Long buyerId;
    private String buyerName;
    private String buyerEmail;
    private OrderStatus status;
    private BigDecimal subtotal;
    private BigDecimal totalAmount;
    private String shippingAddress;
    private String contactPhone;
    private int itemCount;
    private LocalDateTime createdAt;

    public AdminOrderResponse() {
    }

    public AdminOrderResponse(Long id, Long buyerId, String buyerName, String buyerEmail, OrderStatus status, BigDecimal subtotal, BigDecimal totalAmount, String shippingAddress, String contactPhone, int itemCount, LocalDateTime createdAt) {
        this.id = id;
        this.buyerId = buyerId;
        this.buyerName = buyerName;
        this.buyerEmail = buyerEmail;
        this.status = status;
        this.subtotal = subtotal;
        this.totalAmount = totalAmount;
        this.shippingAddress = shippingAddress;
        this.contactPhone = contactPhone;
        this.itemCount = itemCount;
        this.createdAt = createdAt;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getBuyerId() { return buyerId; }
    public void setBuyerId(Long buyerId) { this.buyerId = buyerId; }
    public String getBuyerName() { return buyerName; }
    public void setBuyerName(String buyerName) { this.buyerName = buyerName; }
    public String getBuyerEmail() { return buyerEmail; }
    public void setBuyerEmail(String buyerEmail) { this.buyerEmail = buyerEmail; }
    public OrderStatus getStatus() { return status; }
    public void setStatus(OrderStatus status) { this.status = status; }
    public BigDecimal getSubtotal() { return subtotal; }
    public void setSubtotal(BigDecimal subtotal) { this.subtotal = subtotal; }
    public BigDecimal getTotalAmount() { return totalAmount; }
    public void setTotalAmount(BigDecimal totalAmount) { this.totalAmount = totalAmount; }
    public String getShippingAddress() { return shippingAddress; }
    public void setShippingAddress(String shippingAddress) { this.shippingAddress = shippingAddress; }
    public String getContactPhone() { return contactPhone; }
    public void setContactPhone(String contactPhone) { this.contactPhone = contactPhone; }
    public int getItemCount() { return itemCount; }
    public void setItemCount(int itemCount) { this.itemCount = itemCount; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
