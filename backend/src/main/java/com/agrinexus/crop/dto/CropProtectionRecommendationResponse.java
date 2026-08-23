package com.agrinexus.crop.dto;

import java.util.ArrayList;
import java.util.List;

public class CropProtectionRecommendationResponse {

    private CropProtectionResponse record;
    private Integer matchScore;
    private String label = "Configured agricultural advisory relevance";
    private String disclaimer = "Informational advisory based on configured farm context and agro-climatic parameters. Not a certified physical plant pathology diagnosis.";
    private List<String> matchedFactors = new ArrayList<>();
    private List<String> unmatchedFactors = new ArrayList<>();

    public CropProtectionRecommendationResponse() {
    }

    public CropProtectionRecommendationResponse(CropProtectionResponse record, Integer matchScore, String label, String disclaimer, List<String> matchedFactors, List<String> unmatchedFactors) {
        this.record = record;
        this.matchScore = matchScore;
        this.label = label != null ? label : "Configured agricultural advisory relevance";
        this.disclaimer = disclaimer != null ? disclaimer : "Informational advisory based on configured farm context and agro-climatic parameters. Not a certified physical plant pathology diagnosis.";
        this.matchedFactors = matchedFactors != null ? matchedFactors : new ArrayList<>();
        this.unmatchedFactors = unmatchedFactors != null ? unmatchedFactors : new ArrayList<>();
    }

    public CropProtectionResponse getRecord() { return record; }
    public void setRecord(CropProtectionResponse record) { this.record = record; }
    public Integer getMatchScore() { return matchScore; }
    public void setMatchScore(Integer matchScore) { this.matchScore = matchScore; }
    public String getLabel() { return label; }
    public void setLabel(String label) { this.label = label; }
    public String getDisclaimer() { return disclaimer; }
    public void setDisclaimer(String disclaimer) { this.disclaimer = disclaimer; }
    public List<String> getMatchedFactors() { return matchedFactors; }
    public void setMatchedFactors(List<String> matchedFactors) { this.matchedFactors = matchedFactors; }
    public List<String> getUnmatchedFactors() { return unmatchedFactors; }
    public void setUnmatchedFactors(List<String> unmatchedFactors) { this.unmatchedFactors = unmatchedFactors; }
}
