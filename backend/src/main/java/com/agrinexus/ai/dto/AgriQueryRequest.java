package com.agrinexus.ai.dto;

public class AgriQueryRequest {

    private String query;
    private String cropName;
    private String topic; // PEST_CONTROL, SOIL_HEALTH, GOVERNMENT_SCHEMES, CROP_DISEASE, GENERAL

    public AgriQueryRequest() {
    }

    public AgriQueryRequest(String query, String cropName, String topic) {
        this.query = query;
        this.cropName = cropName;
        this.topic = topic;
    }

    public String getQuery() { return query; }
    public void setQuery(String query) { this.query = query; }

    public String getCropName() { return cropName; }
    public void setCropName(String cropName) { this.cropName = cropName; }

    public String getTopic() { return topic; }
    public void setTopic(String topic) { this.topic = topic; }
}
