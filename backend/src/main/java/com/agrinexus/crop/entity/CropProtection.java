package com.agrinexus.crop.entity;

import com.agrinexus.seeds.entity.CropType;
import com.agrinexus.seeds.entity.SeasonType;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "crop_protection", indexes = {
    @Index(name = "idx_cp_crop", columnList = "crop"),
    @Index(name = "idx_cp_type", columnList = "type"),
    @Index(name = "idx_cp_severity", columnList = "severity"),
    @Index(name = "idx_cp_season", columnList = "season"),
    @Index(name = "idx_cp_active", columnList = "active")
})
public class CropProtection {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 150)
    private String name;

    @Column(name = "scientific_name", length = 150)
    private String scientificName;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 40)
    private ProtectionType type = ProtectionType.DISEASE;

    @Column(length = 3000)
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 40)
    private CropType crop;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private SeverityLevel severity = SeverityLevel.MEDIUM;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 40)
    private SeasonType season = SeasonType.KHARIF;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "crop_protection_symptoms", joinColumns = @JoinColumn(name = "protection_id"))
    @Column(name = "symptom", length = 200)
    private Set<String> symptoms = new HashSet<>();

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "crop_protection_affected_parts", joinColumns = @JoinColumn(name = "protection_id"))
    @Enumerated(EnumType.STRING)
    @Column(name = "plant_part", length = 40)
    private Set<PlantPart> affectedParts = new HashSet<>();

    @Column(length = 2000)
    private String causes;

    @Column(length = 2000)
    private String prevention;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "crop_protection_prevention_methods", joinColumns = @JoinColumn(name = "protection_id"))
    @Column(name = "method", length = 300)
    private Set<String> preventionMethods = new HashSet<>();

    @Column(name = "organic_methods", length = 2000)
    private String organicMethods;

    @Column(name = "cultural_methods", length = 2000)
    private String culturalMethods;

    @Column(name = "chemical_methods", length = 3000)
    private String chemicalMethods;

    @Column(name = "environmental_conditions", length = 1000)
    private String environmentalConditions;

    @Column(name = "image_url", length = 500)
    private String imageUrl;

    @Column(nullable = false)
    private Boolean active = true;

    @Column(name = "created_by_id")
    private Long createdById;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    public CropProtection() {
    }

    public CropProtection(Long id, String name, String scientificName, ProtectionType type, String description, CropType crop, SeverityLevel severity, SeasonType season, Set<String> symptoms, Set<PlantPart> affectedParts, String causes, String prevention, Set<String> preventionMethods, String organicMethods, String culturalMethods, String chemicalMethods, String environmentalConditions, String imageUrl, Boolean active, Long createdById, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
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
        this.active = active != null ? active : true;
        this.createdById = createdById;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {
        private Long id;
        private String name;
        private String scientificName;
        private ProtectionType type = ProtectionType.DISEASE;
        private String description;
        private CropType crop;
        private SeverityLevel severity = SeverityLevel.MEDIUM;
        private SeasonType season = SeasonType.KHARIF;
        private Set<String> symptoms = new HashSet<>();
        private Set<PlantPart> affectedParts = new HashSet<>();
        private String causes;
        private String prevention;
        private Set<String> preventionMethods = new HashSet<>();
        private String organicMethods;
        private String culturalMethods;
        private String chemicalMethods;
        private String environmentalConditions;
        private String imageUrl;
        private Boolean active = true;
        private Long createdById;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;

        public Builder id(Long id) { this.id = id; return this; }
        public Builder name(String name) { this.name = name; return this; }
        public Builder scientificName(String scientificName) { this.scientificName = scientificName; return this; }
        public Builder type(ProtectionType type) { this.type = type; return this; }
        public Builder description(String description) { this.description = description; return this; }
        public Builder crop(CropType crop) { this.crop = crop; return this; }
        public Builder severity(SeverityLevel severity) { this.severity = severity; return this; }
        public Builder season(SeasonType season) { this.season = season; return this; }
        public Builder symptoms(Set<String> symptoms) { this.symptoms = symptoms; return this; }
        public Builder affectedParts(Set<PlantPart> affectedParts) { this.affectedParts = affectedParts; return this; }
        public Builder causes(String causes) { this.causes = causes; return this; }
        public Builder prevention(String prevention) { this.prevention = prevention; return this; }
        public Builder preventionMethods(Set<String> preventionMethods) { this.preventionMethods = preventionMethods; return this; }
        public Builder organicMethods(String organicMethods) { this.organicMethods = organicMethods; return this; }
        public Builder culturalMethods(String culturalMethods) { this.culturalMethods = culturalMethods; return this; }
        public Builder chemicalMethods(String chemicalMethods) { this.chemicalMethods = chemicalMethods; return this; }
        public Builder environmentalConditions(String environmentalConditions) { this.environmentalConditions = environmentalConditions; return this; }
        public Builder imageUrl(String imageUrl) { this.imageUrl = imageUrl; return this; }
        public Builder active(Boolean active) { this.active = active; return this; }
        public Builder createdById(Long createdById) { this.createdById = createdById; return this; }
        public Builder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }
        public Builder updatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; return this; }

        public CropProtection build() {
            return new CropProtection(id, name, scientificName, type, description, crop, severity, season, symptoms, affectedParts, causes, prevention, preventionMethods, organicMethods, culturalMethods, chemicalMethods, environmentalConditions, imageUrl, active, createdById, createdAt, updatedAt);
        }
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
    public Boolean getActive() { return active; }
    public void setActive(Boolean active) { this.active = active; }
    public Long getCreatedById() { return createdById; }
    public void setCreatedById(Long createdById) { this.createdById = createdById; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
