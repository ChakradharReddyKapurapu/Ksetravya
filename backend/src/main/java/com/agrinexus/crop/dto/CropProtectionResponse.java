package com.agrinexus.crop.dto;

import com.agrinexus.crop.entity.CropProtection;
import com.agrinexus.crop.entity.PlantPart;
import com.agrinexus.crop.entity.ProtectionType;
import com.agrinexus.crop.entity.SeverityLevel;
import com.agrinexus.seeds.entity.CropType;
import com.agrinexus.seeds.entity.SeasonType;
import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDateTime;
import java.util.Set;

public class CropProtectionResponse {

    private Long id;
    private String name;
    private String scientificName;
    private ProtectionType type;
    private String description;
    private CropType crop;
    private SeverityLevel severity;
    private SeasonType season;
    private Set<String> symptoms;
    private Set<PlantPart> affectedParts;
    private String causes;
    private String prevention;
    private Set<String> preventionMethods;
    private String organicMethods;
    private String culturalMethods;
    private String chemicalMethods;
    private String environmentalConditions;
    private String imageUrl;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime createdAt;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime updatedAt;

    public CropProtectionResponse() {
    }

    public CropProtectionResponse(Long id, String name, String scientificName, ProtectionType type, String description, CropType crop, SeverityLevel severity, SeasonType season, Set<String> symptoms, Set<PlantPart> affectedParts, String causes, String prevention, Set<String> preventionMethods, String organicMethods, String culturalMethods, String chemicalMethods, String environmentalConditions, String imageUrl, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.name = name;
        this.scientificName = scientificName;
        this.type = type;
        this.description = description;
        this.crop = crop;
        this.severity = severity;
        this.season = season;
        this.symptoms = symptoms;
        this.affectedParts = affectedParts;
        this.causes = causes;
        this.prevention = prevention;
        this.preventionMethods = preventionMethods;
        this.organicMethods = organicMethods;
        this.culturalMethods = culturalMethods;
        this.chemicalMethods = chemicalMethods;
        this.environmentalConditions = environmentalConditions;
        this.imageUrl = imageUrl;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public static CropProtectionResponse fromEntity(CropProtection cp) {
        if (cp == null) return null;
        return new CropProtectionResponse(
                cp.getId(),
                cp.getName(),
                cp.getScientificName(),
                cp.getType(),
                cp.getDescription(),
                cp.getCrop(),
                cp.getSeverity(),
                cp.getSeason(),
                cp.getSymptoms(),
                cp.getAffectedParts(),
                cp.getCauses(),
                cp.getPrevention(),
                cp.getPreventionMethods(),
                cp.getOrganicMethods(),
                cp.getCulturalMethods(),
                cp.getChemicalMethods(),
                cp.getEnvironmentalConditions(),
                cp.getImageUrl(),
                cp.getCreatedAt(),
                cp.getUpdatedAt()
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
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public CropType getCrop() { return crop; }
    public void setCrop(CropType crop) { this.crop = crop; }
    public SeverityLevel getSeverity() { return severity; }
    public void setSeverity(SeverityLevel severity) { this.severity = severity; }
    public SeasonType getSeason() { return season; }
    public void setSeason(SeasonType season) { this.season = season; }
    public Set<String> getSymptoms() { return symptoms; }
    public void setSymptoms(Set<String> symptoms) { this.symptoms = symptoms; }
    public Set<PlantPart> getAffectedParts() { return affectedParts; }
    public void setAffectedParts(Set<PlantPart> affectedParts) { this.affectedParts = affectedParts; }
    public String getCauses() { return causes; }
    public void setCauses(String causes) { this.causes = causes; }
    public String getPrevention() { return prevention; }
    public void setPrevention(String prevention) { this.prevention = prevention; }
    public Set<String> getPreventionMethods() { return preventionMethods; }
    public void setPreventionMethods(Set<String> preventionMethods) { this.preventionMethods = preventionMethods; }
    public String getOrganicMethods() { return organicMethods; }
    public void setOrganicMethods(String organicMethods) { this.organicMethods = organicMethods; }
    public String getCulturalMethods() { return culturalMethods; }
    public void setCulturalMethods(String culturalMethods) { this.culturalMethods = culturalMethods; }
    public String getChemicalMethods() { return chemicalMethods; }
    public void setChemicalMethods(String chemicalMethods) { this.chemicalMethods = chemicalMethods; }
    public String getEnvironmentalConditions() { return environmentalConditions; }
    public void setEnvironmentalConditions(String environmentalConditions) { this.environmentalConditions = environmentalConditions; }
    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
