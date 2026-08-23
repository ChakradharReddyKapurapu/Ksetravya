package com.agrinexus.ai.dto;

public class CropHealthAnalysisRequest {

    private String cropName;
    private String symptomsDescription;
    private String imageUrl;

    public CropHealthAnalysisRequest() {
    }

    public CropHealthAnalysisRequest(String cropName, String symptomsDescription, String imageUrl) {
        this.cropName = cropName;
        this.symptomsDescription = symptomsDescription;
        this.imageUrl = imageUrl;
    }

    public String getCropName() { return cropName; }
    public void setCropName(String cropName) { this.cropName = cropName; }

    public String getSymptomsDescription() { return symptomsDescription; }
    public void setSymptomsDescription(String symptomsDescription) { this.symptomsDescription = symptomsDescription; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
}
