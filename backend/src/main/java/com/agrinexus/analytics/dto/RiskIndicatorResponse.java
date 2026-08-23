package com.agrinexus.analytics.dto;

public class RiskIndicatorResponse {

    private String riskType;
    private String riskLevel; // LOW, MEDIUM, HIGH, UNKNOWN
    private String description;
    private String mitigatingFactor;

    public RiskIndicatorResponse() {
    }

    public RiskIndicatorResponse(String riskType, String riskLevel, String description, String mitigatingFactor) {
        this.riskType = riskType;
        this.riskLevel = riskLevel;
        this.description = description;
        this.mitigatingFactor = mitigatingFactor;
    }

    public String getRiskType() { return riskType; }
    public void setRiskType(String riskType) { this.riskType = riskType; }
    public String getRiskLevel() { return riskLevel; }
    public void setRiskLevel(String riskLevel) { this.riskLevel = riskLevel; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getMitigatingFactor() { return mitigatingFactor; }
    public void setMitigatingFactor(String mitigatingFactor) { this.mitigatingFactor = mitigatingFactor; }
}
