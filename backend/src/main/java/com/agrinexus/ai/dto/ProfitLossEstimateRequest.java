package com.agrinexus.ai.dto;

import java.math.BigDecimal;

public class ProfitLossEstimateRequest {

    private String cropName;
    private BigDecimal farmAreaAcres;
    private BigDecimal expectedYieldQuintals;
    private BigDecimal expectedMarketPricePerQuintal;

    public ProfitLossEstimateRequest() {
    }

    public ProfitLossEstimateRequest(String cropName, BigDecimal farmAreaAcres, BigDecimal expectedYieldQuintals, BigDecimal expectedMarketPricePerQuintal) {
        this.cropName = cropName;
        this.farmAreaAcres = farmAreaAcres;
        this.expectedYieldQuintals = expectedYieldQuintals;
        this.expectedMarketPricePerQuintal = expectedMarketPricePerQuintal;
    }

    public String getCropName() { return cropName; }
    public void setCropName(String cropName) { this.cropName = cropName; }

    public BigDecimal getFarmAreaAcres() { return farmAreaAcres; }
    public void setFarmAreaAcres(BigDecimal farmAreaAcres) { this.farmAreaAcres = farmAreaAcres; }

    public BigDecimal getExpectedYieldQuintals() { return expectedYieldQuintals; }
    public void setExpectedYieldQuintals(BigDecimal expectedYieldQuintals) { this.expectedYieldQuintals = expectedYieldQuintals; }

    public BigDecimal getExpectedMarketPricePerQuintal() { return expectedMarketPricePerQuintal; }
    public void setExpectedMarketPricePerQuintal(BigDecimal expectedMarketPricePerQuintal) { this.expectedMarketPricePerQuintal = expectedMarketPricePerQuintal; }
}
