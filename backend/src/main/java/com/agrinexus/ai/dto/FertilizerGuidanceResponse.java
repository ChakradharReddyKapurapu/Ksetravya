package com.agrinexus.ai.dto;

import java.math.BigDecimal;
import java.util.List;

public class FertilizerGuidanceResponse {

    private String cropName;
    private String growthStage;
    private String recommendedNpkRatio;
    private List<FertilizerDosage> dosages;
    private String applicationSchedule;
    private String organicAlternatives;
    private String safetyNotice;

    public FertilizerGuidanceResponse() {
    }

    public FertilizerGuidanceResponse(String cropName, String growthStage, String recommendedNpkRatio, List<FertilizerDosage> dosages, String applicationSchedule, String organicAlternatives, String safetyNotice) {
        this.cropName = cropName;
        this.growthStage = growthStage;
        this.recommendedNpkRatio = recommendedNpkRatio;
        this.dosages = dosages;
        this.applicationSchedule = applicationSchedule;
        this.organicAlternatives = organicAlternatives;
        this.safetyNotice = safetyNotice;
    }

    public static class FertilizerDosage {
        private String fertilizerName; // Urea, DAP, MOP
        private BigDecimal quantityKg;
        private String applicationTiming;
        private String method;

        public FertilizerDosage() {
        }

        public FertilizerDosage(String fertilizerName, BigDecimal quantityKg, String applicationTiming, String method) {
            this.fertilizerName = fertilizerName;
            this.quantityKg = quantityKg;
            this.applicationTiming = applicationTiming;
            this.method = method;
        }

        public String getFertilizerName() { return fertilizerName; }
        public void setFertilizerName(String fertilizerName) { this.fertilizerName = fertilizerName; }

        public BigDecimal getQuantityKg() { return quantityKg; }
        public void setQuantityKg(BigDecimal quantityKg) { this.quantityKg = quantityKg; }

        public String getApplicationTiming() { return applicationTiming; }
        public void setApplicationTiming(String applicationTiming) { this.applicationTiming = applicationTiming; }

        public String getMethod() { return method; }
        public void setMethod(String method) { this.method = method; }
    }

    public String getCropName() { return cropName; }
    public void setCropName(String cropName) { this.cropName = cropName; }

    public String getGrowthStage() { return growthStage; }
    public void setGrowthStage(String growthStage) { this.growthStage = growthStage; }

    public String getRecommendedNpkRatio() { return recommendedNpkRatio; }
    public void setRecommendedNpkRatio(String recommendedNpkRatio) { this.recommendedNpkRatio = recommendedNpkRatio; }

    public List<FertilizerDosage> getDosages() { return dosages; }
    public void setDosages(List<FertilizerDosage> dosages) { this.dosages = dosages; }

    public String getApplicationSchedule() { return applicationSchedule; }
    public void setApplicationSchedule(String applicationSchedule) { this.applicationSchedule = applicationSchedule; }

    public String getOrganicAlternatives() { return organicAlternatives; }
    public void setOrganicAlternatives(String organicAlternatives) { this.organicAlternatives = organicAlternatives; }

    public String getSafetyNotice() { return safetyNotice; }
    public void setSafetyNotice(String safetyNotice) { this.safetyNotice = safetyNotice; }
}
