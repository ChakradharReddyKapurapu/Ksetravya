package com.agrinexus.ai.dto;

import java.math.BigDecimal;
import java.util.List;

public class CropRecommendationResponse {

    private String primaryRecommendedCrop;
    private BigDecimal expectedYieldPerAcreKg;
    private BigDecimal estimatedProfitPerAcre;
    private Integer confidenceScorePercentage;
    private List<CropOption> alternativeCrops;
    private String reasoning;
    private String safetyNotice;

    public CropRecommendationResponse() {
    }

    public CropRecommendationResponse(String primaryRecommendedCrop, BigDecimal expectedYieldPerAcreKg, BigDecimal estimatedProfitPerAcre, Integer confidenceScorePercentage, List<CropOption> alternativeCrops, String reasoning, String safetyNotice) {
        this.primaryRecommendedCrop = primaryRecommendedCrop;
        this.expectedYieldPerAcreKg = expectedYieldPerAcreKg;
        this.estimatedProfitPerAcre = estimatedProfitPerAcre;
        this.confidenceScorePercentage = confidenceScorePercentage;
        this.alternativeCrops = alternativeCrops;
        this.reasoning = reasoning;
        this.safetyNotice = safetyNotice;
    }

    public static class CropOption {
        private String cropName;
        private String suitability;
        private BigDecimal estimatedRevenuePerAcre;
        private String waterRequirement;

        public CropOption() {
        }

        public CropOption(String cropName, String suitability, BigDecimal estimatedRevenuePerAcre, String waterRequirement) {
            this.cropName = cropName;
            this.suitability = suitability;
            this.estimatedRevenuePerAcre = estimatedRevenuePerAcre;
            this.waterRequirement = waterRequirement;
        }

        public String getCropName() { return cropName; }
        public void setCropName(String cropName) { this.cropName = cropName; }

        public String getSuitability() { return suitability; }
        public void setSuitability(String suitability) { this.suitability = suitability; }

        public BigDecimal getEstimatedRevenuePerAcre() { return estimatedRevenuePerAcre; }
        public void setEstimatedRevenuePerAcre(BigDecimal estimatedRevenuePerAcre) { this.estimatedRevenuePerAcre = estimatedRevenuePerAcre; }

        public String getWaterRequirement() { return waterRequirement; }
        public void setWaterRequirement(String waterRequirement) { this.waterRequirement = waterRequirement; }
    }

    public String getPrimaryRecommendedCrop() { return primaryRecommendedCrop; }
    public void setPrimaryRecommendedCrop(String primaryRecommendedCrop) { this.primaryRecommendedCrop = primaryRecommendedCrop; }

    public BigDecimal getExpectedYieldPerAcreKg() { return expectedYieldPerAcreKg; }
    public void setExpectedYieldPerAcreKg(BigDecimal expectedYieldPerAcreKg) { this.expectedYieldPerAcreKg = expectedYieldPerAcreKg; }

    public BigDecimal getEstimatedProfitPerAcre() { return estimatedProfitPerAcre; }
    public void setEstimatedProfitPerAcre(BigDecimal estimatedProfitPerAcre) { this.estimatedProfitPerAcre = estimatedProfitPerAcre; }

    public Integer getConfidenceScorePercentage() { return confidenceScorePercentage; }
    public void setConfidenceScorePercentage(Integer confidenceScorePercentage) { this.confidenceScorePercentage = confidenceScorePercentage; }

    public List<CropOption> getAlternativeCrops() { return alternativeCrops; }
    public void setAlternativeCrops(List<CropOption> alternativeCrops) { this.alternativeCrops = alternativeCrops; }

    public String getReasoning() { return reasoning; }
    public void setReasoning(String reasoning) { this.reasoning = reasoning; }

    public String getSafetyNotice() { return safetyNotice; }
    public void setSafetyNotice(String safetyNotice) { this.safetyNotice = safetyNotice; }
}
