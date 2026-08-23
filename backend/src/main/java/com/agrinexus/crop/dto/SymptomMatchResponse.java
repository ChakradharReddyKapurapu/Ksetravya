package com.agrinexus.crop.dto;

import java.util.ArrayList;
import java.util.List;

public class SymptomMatchResponse {

    private CropProtectionResponse record;
    private String label = "Possible matching condition";
    private String disclaimer = "Symptom matching is indicative. Physical inspection by local agricultural extension officers is recommended.";
    private List<String> matchedSymptoms = new ArrayList<>();

    public SymptomMatchResponse() {
    }

    public SymptomMatchResponse(CropProtectionResponse record, String label, String disclaimer, List<String> matchedSymptoms) {
        this.record = record;
        this.label = label != null ? label : "Possible matching condition";
        this.disclaimer = disclaimer != null ? disclaimer : "Symptom matching is indicative. Physical inspection by local agricultural extension officers is recommended.";
        this.matchedSymptoms = matchedSymptoms != null ? matchedSymptoms : new ArrayList<>();
    }

    public CropProtectionResponse getRecord() { return record; }
    public void setRecord(CropProtectionResponse record) { this.record = record; }
    public String getLabel() { return label; }
    public void setLabel(String label) { this.label = label; }
    public String getDisclaimer() { return disclaimer; }
    public void setDisclaimer(String disclaimer) { this.disclaimer = disclaimer; }
    public List<String> getMatchedSymptoms() { return matchedSymptoms; }
    public void setMatchedSymptoms(List<String> matchedSymptoms) { this.matchedSymptoms = matchedSymptoms; }
}
