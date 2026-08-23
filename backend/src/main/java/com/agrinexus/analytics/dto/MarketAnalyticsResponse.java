package com.agrinexus.analytics.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

public class MarketAnalyticsResponse {

    private String commodity;
    private BigDecimal latestPrice;
    private BigDecimal previousPrice;
    private BigDecimal minimumPrice;
    private BigDecimal maximumPrice;
    private BigDecimal averagePrice;
    private BigDecimal percentageChange;
    private String trendDirection;
    private String primaryMarket;
    private LocalDate priceDate;
    private String source;
    private boolean dataAvailable;

    public MarketAnalyticsResponse() {
    }

    public MarketAnalyticsResponse(String commodity, BigDecimal latestPrice, BigDecimal previousPrice, BigDecimal minimumPrice, BigDecimal maximumPrice, BigDecimal averagePrice, BigDecimal percentageChange, String trendDirection, String primaryMarket, LocalDate priceDate, String source, boolean dataAvailable) {
        this.commodity = commodity;
        this.latestPrice = latestPrice;
        this.previousPrice = previousPrice;
        this.minimumPrice = minimumPrice;
        this.maximumPrice = maximumPrice;
        this.averagePrice = averagePrice;
        this.percentageChange = percentageChange;
        this.trendDirection = trendDirection;
        this.primaryMarket = primaryMarket;
        this.priceDate = priceDate;
        this.source = source;
        this.dataAvailable = dataAvailable;
    }

    public String getCommodity() { return commodity; }
    public void setCommodity(String commodity) { this.commodity = commodity; }
    public BigDecimal getLatestPrice() { return latestPrice; }
    public void setLatestPrice(BigDecimal latestPrice) { this.latestPrice = latestPrice; }
    public BigDecimal getPreviousPrice() { return previousPrice; }
    public void setPreviousPrice(BigDecimal previousPrice) { this.previousPrice = previousPrice; }
    public BigDecimal getMinimumPrice() { return minimumPrice; }
    public void setMinimumPrice(BigDecimal minimumPrice) { this.minimumPrice = minimumPrice; }
    public BigDecimal getMaximumPrice() { return maximumPrice; }
    public void setMaximumPrice(BigDecimal maximumPrice) { this.maximumPrice = maximumPrice; }
    public BigDecimal getAveragePrice() { return averagePrice; }
    public void setAveragePrice(BigDecimal averagePrice) { this.averagePrice = averagePrice; }
    public BigDecimal getPercentageChange() { return percentageChange; }
    public void setPercentageChange(BigDecimal percentageChange) { this.percentageChange = percentageChange; }
    public String getTrendDirection() { return trendDirection; }
    public void setTrendDirection(String trendDirection) { this.trendDirection = trendDirection; }
    public String getPrimaryMarket() { return primaryMarket; }
    public void setPrimaryMarket(String primaryMarket) { this.primaryMarket = primaryMarket; }
    public LocalDate getPriceDate() { return priceDate; }
    public void setPriceDate(LocalDate priceDate) { this.priceDate = priceDate; }
    public String getSource() { return source; }
    public void setSource(String source) { this.source = source; }
    public boolean isDataAvailable() { return dataAvailable; }
    public void setDataAvailable(boolean dataAvailable) { this.dataAvailable = dataAvailable; }
}
