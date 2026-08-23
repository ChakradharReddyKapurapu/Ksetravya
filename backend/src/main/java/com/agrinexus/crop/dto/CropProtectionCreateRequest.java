package com.agrinexus.crop.dto;

import com.agrinexus.crop.entity.PlantPart;
import com.agrinexus.crop.entity.ProtectionType;
import com.agrinexus.crop.entity.SeverityLevel;
import com.agrinexus.seeds.entity.CropType;
import com.agrinexus.seeds.entity.SeasonType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.HashSet;
import java.util.Set;

public class CropProtectionCreateRequest {

    @NotBlank(message = "Problem name is required")
    @Size(max = 150, message = "Name must not exceed 150 characters")
    private String name;

    @Size(max = 150, message = "Scientific name must not exceed 150 characters")
    private String scientificName;

    @NotNull(message = "Protection type is required")
    private ProtectionType type;

    @Size(max = 3000, message = "Description must not exceed 3000 characters")
    private String description;

    @NotNull(message = "Target crop is required")
    private CropType crop;

    private SeverityLevel severity = SeverityLevel.MEDIUM;

    private SeasonType season = SeasonType.KHARIF;

    private Set<String> symptoms = new HashSet<>();

    private Set<PlantPart> affectedParts = new HashSet<>();

    @Size(max = 2000, message = "Causes must not exceed 2000 characters")
    private String causes;

    @Size(max = 2000, message = "Prevention must not exceed 2000 characters")
    private String prevention;

    private Set<String> preventionMethods = new HashSet<>();

    @Size(max = 2000, message = "Organic methods must not exceed 2000 characters")
    private String organicMethods;

    @Size(max = 2000, message = "Cultural methods must not exceed 2000 characters")
    private String culturalMethods;

    @Size(max = 3000, message = "Chemical methods must not exceed 3000 characters")
    private String chemicalMethods;

    @Size(max = 1000, message = "Environmental conditions must not exceed 1000 characters")
    private String environmentalConditions;

    @Size(max = 500, message = "Image URL must not exceed 500 characters")
    private String imageUrl;

    public CropProtectionCreateRequest() {
    }

    public CropProtectionCreateRequest(String name, String scientificName, ProtectionType type, String description, CropType crop, SeverityLevel severity, SeasonType season, Set<String> symptoms, Set<PlantPart> affectedParts, String causes, String prevention, Set<String> preventionMethods, String organicMethods, String culturalMethods, String chemicalMethods, String environmentalConditions, String imageUrl) {
        this.name = name;
        this.scientificName = scientificName;
        this.type = type != null ? type : ProtectionType.DISEASE;
        this.description = description;
        this.crop = crop;
        this.severity = severity != null ? severity : SeverityLevel.MEDIUM;
        this.season = season != null ? season : SeasonType.KHARIF;
        this.symptoms = symptoms != null ? symptoms : new HashSet<>();
        this.affectedParts = affectedParts != null ? affectedParts : new HashSet<>();
        this.causes = causes;
        this.prevention = prevention;
        this.preventionMethods = preventionMethods != null ? preventionMethods : new HashSet<>();
        this.organicMethods = organicMethods;
        this.culturalMethods = culturalMethods;
        this.chemicalMethods = chemicalMethods;
        this.environmentalConditions = environmentalConditions;
        this.imageUrl = imageUrl;
    }

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
}
