package com.agrinexus.admin.dto;

import java.math.BigDecimal;

public class MarketplaceStatisticsResponse {

    private long products;
    private long activeProducts;
    private long orders;
    private long activeSellers;
    private long activeBuyers;
    private BigDecimal grossOrderValue;

    public MarketplaceStatisticsResponse() {
    }

    public MarketplaceStatisticsResponse(long products, long activeProducts, long orders, long activeSellers, long activeBuyers, BigDecimal grossOrderValue) {
        this.products = products;
        this.activeProducts = activeProducts;
        this.orders = orders;
        this.activeSellers = activeSellers;
        this.activeBuyers = activeBuyers;
        this.grossOrderValue = grossOrderValue;
    }

    public long getProducts() { return products; }
    public void setProducts(long products) { this.products = products; }
    public long getActiveProducts() { return activeProducts; }
    public void setActiveProducts(long activeProducts) { this.activeProducts = activeProducts; }
    public long getOrders() { return orders; }
    public void setOrders(long orders) { this.orders = orders; }
    public long getActiveSellers() { return activeSellers; }
    public void setActiveSellers(long activeSellers) { this.activeSellers = activeSellers; }
    public long getActiveBuyers() { return activeBuyers; }
    public void setActiveBuyers(long activeBuyers) { this.activeBuyers = activeBuyers; }
    public BigDecimal getGrossOrderValue() { return grossOrderValue; }
    public void setGrossOrderValue(BigDecimal grossOrderValue) { this.grossOrderValue = grossOrderValue; }
}
