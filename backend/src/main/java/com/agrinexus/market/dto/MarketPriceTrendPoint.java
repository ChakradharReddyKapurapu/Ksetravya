package com.agrinexus.market.dto;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.math.BigDecimal;
import java.time.LocalDate;

public class MarketPriceTrendPoint {

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate priceDate;

    private BigDecimal modalPrice;
    private BigDecimal minPrice;
    private BigDecimal maxPrice;

    public MarketPriceTrendPoint() {
    }

    public MarketPriceTrendPoint(LocalDate priceDate, BigDecimal modalPrice, BigDecimal minPrice, BigDecimal maxPrice) {
        this.priceDate = priceDate;
        this.modalPrice = modalPrice;
        this.minPrice = minPrice;
        this.maxPrice = maxPrice;
    }

    public LocalDate getPriceDate() { return priceDate; }
    public void setPriceDate(LocalDate priceDate) { this.priceDate = priceDate; }
    public BigDecimal getModalPrice() { return modalPrice; }
    public void setModalPrice(BigDecimal modalPrice) { this.modalPrice = modalPrice; }
    public BigDecimal getMinPrice() { return minPrice; }
    public void setMinPrice(BigDecimal minPrice) { this.minPrice = minPrice; }
    public BigDecimal getMaxPrice() { return maxPrice; }
    public void setMaxPrice(BigDecimal maxPrice) { this.maxPrice = maxPrice; }
}
