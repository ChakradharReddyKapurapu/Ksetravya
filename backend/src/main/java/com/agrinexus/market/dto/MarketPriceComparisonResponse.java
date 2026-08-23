package com.agrinexus.market.dto;

import java.util.ArrayList;
import java.util.List;

public class MarketPriceComparisonResponse {

    private String commodity;
    private String variety;
    private String queryLocation;
    private List<MarketPriceComparisonItem> markets = new ArrayList<>();
    private String lowestPriceMarket;
    private String highestPriceMarket;
    private String disclaimer = "Mandi price comparison for informational purposes. Market rates vary with moisture and quality grade.";

    public MarketPriceComparisonResponse() {
    }

    public MarketPriceComparisonResponse(String commodity, String variety, String queryLocation, List<MarketPriceComparisonItem> markets, String lowestPriceMarket, String highestPriceMarket) {
        this.commodity = commodity;
        this.variety = variety;
        this.queryLocation = queryLocation;
        this.markets = markets != null ? markets : new ArrayList<>();
        this.lowestPriceMarket = lowestPriceMarket;
        this.highestPriceMarket = highestPriceMarket;
    }

    public String getCommodity() { return commodity; }
    public void setCommodity(String commodity) { this.commodity = commodity; }
    public String getVariety() { return variety; }
    public void setVariety(String variety) { this.variety = variety; }
    public String getQueryLocation() { return queryLocation; }
    public void setQueryLocation(String queryLocation) { this.queryLocation = queryLocation; }
    public List<MarketPriceComparisonItem> getMarkets() { return markets; }
    public void setMarkets(List<MarketPriceComparisonItem> markets) { this.markets = markets; }
    public String getLowestPriceMarket() { return lowestPriceMarket; }
    public void setLowestPriceMarket(String lowestPriceMarket) { this.lowestPriceMarket = lowestPriceMarket; }
    public String getHighestPriceMarket() { return highestPriceMarket; }
    public void setHighestPriceMarket(String highestPriceMarket) { this.highestPriceMarket = highestPriceMarket; }
    public String getDisclaimer() { return disclaimer; }
    public void setDisclaimer(String disclaimer) { this.disclaimer = disclaimer; }
}
