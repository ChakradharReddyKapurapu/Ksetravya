package com.agrinexus.crop.dto;

import com.agrinexus.crop.entity.CropProtection;
import com.agrinexus.crop.entity.ProtectionType;
import com.agrinexus.crop.entity.SeverityLevel;
import com.agrinexus.seeds.entity.CropType;
import com.agrinexus.seeds.entity.SeasonType;

import java.util.Set;

public class CropProtectionSummaryResponse {

    private Long id;
    private String name;
    private String scientificName;
    private ProtectionType type;
    private CropType crop;
    private SeverityLevel severity;
    private SeasonType season;
    private Set<String> symptoms;
    private String imageUrl;

    public CropProtectionSummaryResponse() {
    }

    public CropProtectionSummaryResponse(Long id, String name, String scientificName, ProtectionType type, CropType crop, SeverityLevel severity, SeasonType season, Set<String> symptoms, String imageUrl) {
        this.id = id;
        this.name = name;
        this.scientificName = scientificName;
        this.type = type;
        this.crop = crop;
        this.severity = severity;
        this.season = season;
        this.symptoms = symptoms;
        this.imageUrl = imageUrl;
    }

    public static CropProtectionSummaryResponse fromEntity(CropProtection cp) {
        if (cp == null) return null;
        return new CropProtectionSummaryResponse(
                cp.getId(),
                cp.getName(),
                cp.getScientificName(),
                cp.getType(),
                cp.getCrop(),
                cp.getSeverity(),
                cp.getSeason(),
                cp.getSymptoms(),
                cp.getImageUrl()
        );
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getScientificName() { return scientificName; }
    public void setScientificName(String scientificName) { this.scientificName = scientificName; }
    public ProtectionType getType() { return type; }
    public void setType(ProtectionType type) { this.type = type; }
    public CropType getCrop() { return crop; }
    public void setCrop(CropType crop) { this.crop = crop; }
    public SeverityLevel getSeverity() { return severity; }
    public void setSeverity(SeverityLevel severity) { this.severity = severity; }
    public SeasonType getSeason() { return season; }
    public void setSeason(SeasonType season) { this.season = season; }
    public Set<String> getSymptoms() { return symptoms; }
    public void setSymptoms(Set<String> symptoms) { this.symptoms = symptoms; }
    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
}
