package com.agrinexus.ai.dto;

import java.util.List;

public class CropComparisonRequest {

    private List<String> cropNames; // E.g., ["Paddy", "Cotton", "Maize"]
    private Double farmAreaAcres;

    public CropComparisonRequest() {
    }

    public CropComparisonRequest(List<String> cropNames, Double farmAreaAcres) {
        this.cropNames = cropNames;
        this.farmAreaAcres = farmAreaAcres;
    }

    public List<String> getCropNames() { return cropNames; }
    public void setCropNames(List<String> cropNames) { this.cropNames = cropNames; }

    public Double getFarmAreaAcres() { return farmAreaAcres; }
    public void setFarmAreaAcres(Double farmAreaAcres) { this.farmAreaAcres = farmAreaAcres; }
}
