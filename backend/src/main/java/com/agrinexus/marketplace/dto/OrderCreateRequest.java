package com.agrinexus.marketplace.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class OrderCreateRequest {

    @NotBlank(message = "Shipping delivery address is required")
    @Size(max = 500, message = "Shipping address must not exceed 500 characters")
    private String shippingAddress;

    @NotBlank(message = "Contact phone number is required")
    @Size(max = 30, message = "Phone must not exceed 30 characters")
    private String phone;

    @Size(max = 1000, message = "Order notes must not exceed 1000 characters")
    private String orderNotes;

    public OrderCreateRequest() {
    }

    public OrderCreateRequest(String shippingAddress, String phone, String orderNotes) {
        this.shippingAddress = shippingAddress;
        this.phone = phone;
        this.orderNotes = orderNotes;
    }

    public String getShippingAddress() { return shippingAddress; }
    public void setShippingAddress(String shippingAddress) { this.shippingAddress = shippingAddress; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    public String getOrderNotes() { return orderNotes; }
    public void setOrderNotes(String orderNotes) { this.orderNotes = orderNotes; }
}
