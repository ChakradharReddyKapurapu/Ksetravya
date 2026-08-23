package com.agrinexus.market.dto;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

public class MarketPriceTrendResponse {

    private String commodity;
    private String market;
    private String period;
    private BigDecimal startPrice;
    private BigDecimal endPrice;
    private BigDecimal minimumPrice;
    private BigDecimal maximumPrice;
    private BigDecimal averagePrice;
    private BigDecimal percentageChange;
    private String trendDirection;
    private List<MarketPriceTrendPoint> points = new ArrayList<>();
    private String source;
    private String analysisNote = "Historical mandi price analysis (Not a guaranteed future price prediction).";

    public MarketPriceTrendResponse() {
    }

    public MarketPriceTrendResponse(String commodity, String market, String period, BigDecimal startPrice, BigDecimal endPrice, BigDecimal minimumPrice, BigDecimal maximumPrice, BigDecimal averagePrice, BigDecimal percentageChange, String trendDirection, List<MarketPriceTrendPoint> points, String source) {
        this.commodity = commodity;
        this.market = market;
        this.period = period;
        this.startPrice = startPrice;
        this.endPrice = endPrice;
        this.minimumPrice = minimumPrice;
        this.maximumPrice = maximumPrice;
        this.averagePrice = averagePrice;
        this.percentageChange = percentageChange;
        this.trendDirection = trendDirection;
        this.points = points != null ? points : new ArrayList<>();
        this.source = source;
    }

    public String getCommodity() { return commodity; }
    public void setCommodity(String commodity) { this.commodity = commodity; }
    public String getMarket() { return market; }
    public void setMarket(String market) { this.market = market; }
    public String getPeriod() { return period; }
    public void setPeriod(String period) { this.period = period; }
    public BigDecimal getStartPrice() { return startPrice; }
    public void setStartPrice(BigDecimal startPrice) { this.startPrice = startPrice; }
    public BigDecimal getEndPrice() { return endPrice; }
    public void setEndPrice(BigDecimal endPrice) { this.endPrice = endPrice; }
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
    public List<MarketPriceTrendPoint> getPoints() { return points; }
    public void setPoints(List<MarketPriceTrendPoint> points) { this.points = points; }
    public String getSource() { return source; }
    public void setSource(String source) { this.source = source; }
    public String getAnalysisNote() { return analysisNote; }
    public void setAnalysisNote(String analysisNote) { this.analysisNote = analysisNote; }
}
