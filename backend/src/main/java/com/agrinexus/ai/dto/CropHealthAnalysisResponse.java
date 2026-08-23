package com.agrinexus.ai.dto;

import java.util.List;

public class CropHealthAnalysisResponse {

    private String cropName;
    private String diagnosedCondition; // E.g., Rice Blast, Cotton Aphids, Nitrogen Deficiency
    private String severityLevel; // LOW, MODERATE, CRITICAL
    private Integer confidenceScorePercentage;
    private List<String> immediateTreatmentSteps;
    private List<String> organicTreatments;
    private List<String> recommendedChemicals;
    private String preventionAdvice;
    private String safetyNotice;

    public CropHealthAnalysisResponse() {
    }

    public CropHealthAnalysisResponse(String cropName, String diagnosedCondition, String severityLevel, Integer confidenceScorePercentage, List<String> immediateTreatmentSteps, List<String> organicTreatments, List<String> recommendedChemicals, String preventionAdvice, String safetyNotice) {
        this.cropName = cropName;
        this.diagnosedCondition = diagnosedCondition;
        this.severityLevel = severityLevel;
        this.confidenceScorePercentage = confidenceScorePercentage;
        this.immediateTreatmentSteps = immediateTreatmentSteps;
        this.organicTreatments = organicTreatments;
        this.recommendedChemicals = recommendedChemicals;
        this.preventionAdvice = preventionAdvice;
        this.safetyNotice = safetyNotice;
    }

    public String getCropName() { return cropName; }
    public void setCropName(String cropName) { this.cropName = cropName; }

    public String getDiagnosedCondition() { return diagnosedCondition; }
    public void setDiagnosedCondition(String diagnosedCondition) { this.diagnosedCondition = diagnosedCondition; }

    public String getSeverityLevel() { return severityLevel; }
    public void setSeverityLevel(String severityLevel) { this.severityLevel = severityLevel; }

    public Integer getConfidenceScorePercentage() { return confidenceScorePercentage; }
    public void setConfidenceScorePercentage(Integer confidenceScorePercentage) { this.confidenceScorePercentage = confidenceScorePercentage; }

    public List<String> getImmediateTreatmentSteps() { return immediateTreatmentSteps; }
    public void setImmediateTreatmentSteps(List<String> immediateTreatmentSteps) { this.immediateTreatmentSteps = immediateTreatmentSteps; }

    public List<String> getOrganicTreatments() { return organicTreatments; }
    public void setOrganicTreatments(List<String> organicTreatments) { this.organicTreatments = organicTreatments; }

    public List<String> getRecommendedChemicals() { return recommendedChemicals; }
    public void setRecommendedChemicals(List<String> recommendedChemicals) { this.recommendedChemicals = recommendedChemicals; }

    public String getPreventionAdvice() { return preventionAdvice; }
    public void setPreventionAdvice(String preventionAdvice) { this.preventionAdvice = preventionAdvice; }

    public String getSafetyNotice() { return safetyNotice; }
    public void setSafetyNotice(String safetyNotice) { this.safetyNotice = safetyNotice; }
}
