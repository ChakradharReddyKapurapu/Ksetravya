package com.agrinexus.analytics.dto;

public class WeatherInsightResponse {

    private String type;
    private String title;
    private String description;
    private String severity;
    private String actionableAdvice;

    public WeatherInsightResponse() {
    }

    public WeatherInsightResponse(String type, String title, String description, String severity, String actionableAdvice) {
        this.type = type;
        this.title = title;
        this.description = description;
        this.severity = severity;
        this.actionableAdvice = actionableAdvice;
    }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getSeverity() { return severity; }
    public void setSeverity(String severity) { this.severity = severity; }
    public String getActionableAdvice() { return actionableAdvice; }
    public void setActionableAdvice(String actionableAdvice) { this.actionableAdvice = actionableAdvice; }
}
