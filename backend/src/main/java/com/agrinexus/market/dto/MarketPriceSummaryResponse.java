package com.agrinexus.market.dto;

import com.agrinexus.market.entity.PriceUnit;
import com.fasterxml.jackson.annotation.JsonFormat;

import java.math.BigDecimal;
import java.time.LocalDate;

public class MarketPriceSummaryResponse {

    private String commodity;
    private BigDecimal latestModalPrice;
    private BigDecimal previousModalPrice;
    private BigDecimal change;
    private BigDecimal percentageChange;
    private String trendDirection;
    private PriceUnit unit;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate priceDate;

    private String primaryMarket;
    private String source;

    public MarketPriceSummaryResponse() {
    }

    public MarketPriceSummaryResponse(String commodity, BigDecimal latestModalPrice, BigDecimal previousModalPrice, BigDecimal change, BigDecimal percentageChange, String trendDirection, PriceUnit unit, LocalDate priceDate, String primaryMarket, String source) {
        this.commodity = commodity;
        this.latestModalPrice = latestModalPrice;
        this.previousModalPrice = previousModalPrice;
        this.change = change;
        this.percentageChange = percentageChange;
        this.trendDirection = trendDirection;
        this.unit = unit;
        this.priceDate = priceDate;
        this.primaryMarket = primaryMarket;
        this.source = source;
    }

    public String getCommodity() { return commodity; }
    public void setCommodity(String commodity) { this.commodity = commodity; }
    public BigDecimal getLatestModalPrice() { return latestModalPrice; }
    public void setLatestModalPrice(BigDecimal latestModalPrice) { this.latestModalPrice = latestModalPrice; }
    public BigDecimal getPreviousModalPrice() { return previousModalPrice; }
    public void setPreviousModalPrice(BigDecimal previousModalPrice) { this.previousModalPrice = previousModalPrice; }
    public BigDecimal getChange() { return change; }
    public void setChange(BigDecimal change) { this.change = change; }
    public BigDecimal getPercentageChange() { return percentageChange; }
    public void setPercentageChange(BigDecimal percentageChange) { this.percentageChange = percentageChange; }
    public String getTrendDirection() { return trendDirection; }
    public void setTrendDirection(String trendDirection) { this.trendDirection = trendDirection; }
    public PriceUnit getUnit() { return unit; }
    public void setUnit(PriceUnit unit) { this.unit = unit; }
    public LocalDate getPriceDate() { return priceDate; }
    public void setPriceDate(LocalDate priceDate) { this.priceDate = priceDate; }
    public String getPrimaryMarket() { return primaryMarket; }
    public void setPrimaryMarket(String primaryMarket) { this.primaryMarket = primaryMarket; }
    public String getSource() { return source; }
    public void setSource(String source) { this.source = source; }
}
