package com.agrinexus.ai.dto;

import java.math.BigDecimal;
import java.util.List;

public class MarketInsightResponse {

    private String commodity;
    private BigDecimal currentPricePerQuintal;
    private String priceTrend; // RISING, STABLE, DECLINING
    private String recommendedAction; // SELL_NOW, HOLD_FOR_2_WEEKS, SELL_IN_NEIGHBORING_MANDI
    private List<MandiOption> topMandis;
    private String marketAnalysisSummary;

    public MarketInsightResponse() {
    }

    public MarketInsightResponse(String commodity, BigDecimal currentPricePerQuintal, String priceTrend, String recommendedAction, List<MandiOption> topMandis, String marketAnalysisSummary) {
        this.commodity = commodity;
        this.currentPricePerQuintal = currentPricePerQuintal;
        this.priceTrend = priceTrend;
        this.recommendedAction = recommendedAction;
        this.topMandis = topMandis;
        this.marketAnalysisSummary = marketAnalysisSummary;
    }

    public static class MandiOption {
        private String mandiName;
        private String district;
        private BigDecimal pricePerQuintal;
        private BigDecimal distanceKm;

        public MandiOption() {
        }

        public MandiOption(String mandiName, String district, BigDecimal pricePerQuintal, BigDecimal distanceKm) {
            this.mandiName = mandiName;
            this.district = district;
            this.pricePerQuintal = pricePerQuintal;
            this.distanceKm = distanceKm;
        }

        public String getMandiName() { return mandiName; }
        public void setMandiName(String mandiName) { this.mandiName = mandiName; }

        public String getDistrict() { return district; }
        public void setDistrict(String district) { this.district = district; }

        public BigDecimal getPricePerQuintal() { return pricePerQuintal; }
        public void setPricePerQuintal(BigDecimal pricePerQuintal) { this.pricePerQuintal = pricePerQuintal; }

        public BigDecimal getDistanceKm() { return distanceKm; }
        public void setDistanceKm(BigDecimal distanceKm) { this.distanceKm = distanceKm; }
    }

    public String getCommodity() { return commodity; }
    public void setCommodity(String commodity) { this.commodity = commodity; }

    public BigDecimal getCurrentPricePerQuintal() { return currentPricePerQuintal; }
    public void setCurrentPricePerQuintal(BigDecimal currentPricePerQuintal) { this.currentPricePerQuintal = currentPricePerQuintal; }

    public String getPriceTrend() { return priceTrend; }
    public void setPriceTrend(String priceTrend) { this.priceTrend = priceTrend; }

    public String getRecommendedAction() { return recommendedAction; }
    public void setRecommendedAction(String recommendedAction) { this.recommendedAction = recommendedAction; }

    public List<MandiOption> getTopMandis() { return topMandis; }
    public void setTopMandis(List<MandiOption> topMandis) { this.topMandis = topMandis; }

    public String getMarketAnalysisSummary() { return marketAnalysisSummary; }
    public void setMarketAnalysisSummary(String marketAnalysisSummary) { this.marketAnalysisSummary = marketAnalysisSummary; }
}
