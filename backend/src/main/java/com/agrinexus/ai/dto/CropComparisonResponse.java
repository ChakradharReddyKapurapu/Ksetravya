package com.agrinexus.ai.dto;

import java.math.BigDecimal;
import java.util.List;

public class CropComparisonResponse {

    private List<CropComparisonItem> comparisonItems;
    private String winnerCrop;
    private String comparisonSummary;

    public CropComparisonResponse() {
    }

    public CropComparisonResponse(List<CropComparisonItem> comparisonItems, String winnerCrop, String comparisonSummary) {
        this.comparisonItems = comparisonItems;
        this.winnerCrop = winnerCrop;
        this.comparisonSummary = comparisonSummary;
    }

    public static class CropComparisonItem {
        private String cropName;
        private Integer durationDays;
        private BigDecimal expectedYieldPerAcreQuintals;
        private BigDecimal estimatedCostPerAcre;
        private BigDecimal estimatedProfitPerAcre;
        private String waterRequirement; // HIGH, MEDIUM, LOW
        private String riskLevel; // LOW, MEDIUM, HIGH

        public CropComparisonItem() {
        }

        public CropComparisonItem(String cropName, Integer durationDays, BigDecimal expectedYieldPerAcreQuintals, BigDecimal estimatedCostPerAcre, BigDecimal estimatedProfitPerAcre, String waterRequirement, String riskLevel) {
            this.cropName = cropName;
            this.durationDays = durationDays;
            this.expectedYieldPerAcreQuintals = expectedYieldPerAcreQuintals;
            this.estimatedCostPerAcre = estimatedCostPerAcre;
            this.estimatedProfitPerAcre = estimatedProfitPerAcre;
            this.waterRequirement = waterRequirement;
            this.riskLevel = riskLevel;
        }

        public String getCropName() { return cropName; }
        public void setCropName(String cropName) { this.cropName = cropName; }

        public Integer getDurationDays() { return durationDays; }
        public void setDurationDays(Integer durationDays) { this.durationDays = durationDays; }

        public BigDecimal getExpectedYieldPerAcreQuintals() { return expectedYieldPerAcreQuintals; }
        public void setExpectedYieldPerAcreQuintals(BigDecimal expectedYieldPerAcreQuintals) { this.expectedYieldPerAcreQuintals = expectedYieldPerAcreQuintals; }

        public BigDecimal getEstimatedCostPerAcre() { return estimatedCostPerAcre; }
        public void setEstimatedCostPerAcre(BigDecimal estimatedCostPerAcre) { this.estimatedCostPerAcre = estimatedCostPerAcre; }

        public BigDecimal getEstimatedProfitPerAcre() { return estimatedProfitPerAcre; }
        public void setEstimatedProfitPerAcre(BigDecimal estimatedProfitPerAcre) { this.estimatedProfitPerAcre = estimatedProfitPerAcre; }

        public String getWaterRequirement() { return waterRequirement; }
        public void setWaterRequirement(String waterRequirement) { this.waterRequirement = waterRequirement; }

        public String getRiskLevel() { return riskLevel; }
        public void setRiskLevel(String riskLevel) { this.riskLevel = riskLevel; }
    }

    public List<CropComparisonItem> getComparisonItems() { return comparisonItems; }
    public void setComparisonItems(List<CropComparisonItem> comparisonItems) { this.comparisonItems = comparisonItems; }

    public String getWinnerCrop() { return winnerCrop; }
    public void setWinnerCrop(String winnerCrop) { this.winnerCrop = winnerCrop; }

    public String getComparisonSummary() { return comparisonSummary; }
    public void setComparisonSummary(String comparisonSummary) { this.comparisonSummary = comparisonSummary; }
}
