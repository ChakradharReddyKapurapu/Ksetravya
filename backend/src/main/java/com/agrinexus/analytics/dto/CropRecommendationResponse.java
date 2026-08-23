package com.agrinexus.analytics.dto;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

public class CropRecommendationResponse {

    private String crop;
    private String displayName;
    private String icon;
    private int score;
    private String label;
    private BigDecimal estimatedProfitPerAcre;
    private BigDecimal profitMargin;
    private String riskLevel;
    private List<String> matchedFactors = new ArrayList<>();
    private List<String> warnings = new ArrayList<>();
    private List<String> assumptions = new ArrayList<>();

    public CropRecommendationResponse() {
    }

    public CropRecommendationResponse(String crop, String displayName, String icon, int score, String label, BigDecimal estimatedProfitPerAcre, BigDecimal profitMargin, String riskLevel, List<String> matchedFactors, List<String> warnings, List<String> assumptions) {
        this.crop = crop;
        this.displayName = displayName;
        this.icon = icon;
        this.score = score;
        this.label = label;
        this.estimatedProfitPerAcre = estimatedProfitPerAcre;
        this.profitMargin = profitMargin;
        this.riskLevel = riskLevel;
        this.matchedFactors = matchedFactors != null ? matchedFactors : new ArrayList<>();
        this.warnings = warnings != null ? warnings : new ArrayList<>();
        this.assumptions = assumptions != null ? assumptions : new ArrayList<>();
    }

    public String getCrop() { return crop; }
    public void setCrop(String crop) { this.crop = crop; }
    public String getDisplayName() { return displayName; }
    public void setDisplayName(String displayName) { this.displayName = displayName; }
    public String getIcon() { return icon; }
    public void setIcon(String icon) { this.icon = icon; }
    public int getScore() { return score; }
    public void setScore(int score) { this.score = score; }
    public String getLabel() { return label; }
    public void setLabel(String label) { this.label = label; }
    public BigDecimal getEstimatedProfitPerAcre() { return estimatedProfitPerAcre; }
    public void setEstimatedProfitPerAcre(BigDecimal estimatedProfitPerAcre) { this.estimatedProfitPerAcre = estimatedProfitPerAcre; }
    public BigDecimal getProfitMargin() { return profitMargin; }
    public void setProfitMargin(BigDecimal profitMargin) { this.profitMargin = profitMargin; }
    public String getRiskLevel() { return riskLevel; }
    public void setRiskLevel(String riskLevel) { this.riskLevel = riskLevel; }
    public List<String> getMatchedFactors() { return matchedFactors; }
    public void setMatchedFactors(List<String> matchedFactors) { this.matchedFactors = matchedFactors; }
    public List<String> getWarnings() { return warnings; }
    public void setWarnings(List<String> warnings) { this.warnings = warnings; }
    public List<String> getAssumptions() { return assumptions; }
    public void setAssumptions(List<String> assumptions) { this.assumptions = assumptions; }
}
