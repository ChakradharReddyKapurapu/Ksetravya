package com.agrinexus.crop.service;

import com.agrinexus.crop.dto.*;
import com.agrinexus.crop.entity.CropProtection;
import com.agrinexus.crop.entity.PlantPart;
import com.agrinexus.crop.entity.ProtectionType;
import com.agrinexus.crop.entity.SeverityLevel;
import com.agrinexus.crop.repository.CropProtectionRepository;
import com.agrinexus.crop.repository.CropProtectionSpecification;
import com.agrinexus.exception.ResourceNotFoundException;
import com.agrinexus.seeds.entity.CropType;
import com.agrinexus.seeds.entity.SeasonType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CropProtectionService {

    private final CropProtectionRepository cropProtectionRepository;

    public CropProtectionService(CropProtectionRepository cropProtectionRepository) {
        this.cropProtectionRepository = cropProtectionRepository;
    }

    @Transactional(readOnly = true)
    public Page<CropProtectionResponse> getAll(
            String query,
            String cropStr,
            String typeStr,
            String severityStr,
            String seasonStr,
            String plantPartStr,
            String symptomQuery,
            Pageable pageable) {

        CropType crop = CropType.fromString(cropStr);
        ProtectionType type = ProtectionType.fromString(typeStr);
        SeverityLevel severity = SeverityLevel.fromString(severityStr);
        SeasonType season = SeasonType.fromString(seasonStr);
        PlantPart plantPart = PlantPart.fromString(plantPartStr);

        Specification<CropProtection> spec = CropProtectionSpecification.filter(
                query, crop, type, severity, season, plantPart, symptomQuery
        );

        return cropProtectionRepository.findAll(spec, pageable).map(CropProtectionResponse::fromEntity);
    }

    @Transactional(readOnly = true)
    public CropProtectionResponse getById(Long id) {
        CropProtection cp = cropProtectionRepository.findByIdAndActiveTrue(id)
                .orElseThrow(() -> new ResourceNotFoundException("Crop protection advisory not found with ID: " + id));

        return CropProtectionResponse.fromEntity(cp);
    }

    @Transactional(readOnly = true)
    public Page<CropProtectionResponse> search(String query, Pageable pageable) {
        Specification<CropProtection> spec = CropProtectionSpecification.filter(
                query, null, null, null, null, null, null
        );
        return cropProtectionRepository.findAll(spec, pageable).map(CropProtectionResponse::fromEntity);
    }

    @Transactional(readOnly = true)
    public List<SymptomMatchResponse> searchBySymptoms(String symptomQuery) {
        if (symptomQuery == null || symptomQuery.trim().isEmpty()) {
            return List.of();
        }

        String search = symptomQuery.trim().toLowerCase();
        List<CropProtection> activeList = cropProtectionRepository.findByActiveTrue();
        List<SymptomMatchResponse> results = new ArrayList<>();

        for (CropProtection cp : activeList) {
            List<String> matched = cp.getSymptoms().stream()
                    .filter(s -> s.toLowerCase().contains(search) || search.contains(s.toLowerCase()))
                    .collect(Collectors.toList());

            if (!matched.isEmpty() || cp.getName().toLowerCase().contains(search) || (cp.getDescription() != null && cp.getDescription().toLowerCase().contains(search))) {
                if (matched.isEmpty()) {
                    matched.add("General profile match for keyword: " + symptomQuery);
                }
                results.add(new SymptomMatchResponse(
                        CropProtectionResponse.fromEntity(cp),
                        "Possible matching condition",
                        "Symptom matching is indicative. Physical inspection by local agricultural extension officers is recommended.",
                        matched
                ));
            }
        }

        return results;
    }

    @Transactional
    public CropProtectionResponse create(CropProtectionCreateRequest request, Long adminUserId) {
        CropProtection cp = CropProtection.builder()
                .name(request.getName().trim())
                .scientificName(request.getScientificName() != null ? request.getScientificName().trim() : null)
                .type(request.getType() != null ? request.getType() : ProtectionType.DISEASE)
                .description(request.getDescription() != null ? request.getDescription().trim() : null)
                .crop(request.getCrop())
                .severity(request.getSeverity() != null ? request.getSeverity() : SeverityLevel.MEDIUM)
                .season(request.getSeason() != null ? request.getSeason() : SeasonType.KHARIF)
                .symptoms(request.getSymptoms())
                .affectedParts(request.getAffectedParts())
                .causes(request.getCauses() != null ? request.getCauses().trim() : null)
                .prevention(request.getPrevention() != null ? request.getPrevention().trim() : null)
                .preventionMethods(request.getPreventionMethods())
                .organicMethods(request.getOrganicMethods() != null ? request.getOrganicMethods().trim() : null)
                .culturalMethods(request.getCulturalMethods() != null ? request.getCulturalMethods().trim() : null)
                .chemicalMethods(request.getChemicalMethods() != null ? request.getChemicalMethods().trim() : null)
                .environmentalConditions(request.getEnvironmentalConditions() != null ? request.getEnvironmentalConditions().trim() : null)
                .imageUrl(request.getImageUrl() != null ? request.getImageUrl().trim() : null)
                .createdById(adminUserId)
                .active(true)
                .build();

        CropProtection saved = cropProtectionRepository.save(cp);
        return CropProtectionResponse.fromEntity(saved);
    }

    @Transactional
    public CropProtectionResponse update(Long id, CropProtectionUpdateRequest request) {
        CropProtection cp = cropProtectionRepository.findByIdAndActiveTrue(id)
                .orElseThrow(() -> new ResourceNotFoundException("Crop protection advisory not found with ID: " + id));

        if (request.getName() != null && !request.getName().trim().isEmpty()) {
            cp.setName(request.getName().trim());
        }
        if (request.getScientificName() != null) {
            cp.setScientificName(request.getScientificName().trim());
        }
        if (request.getType() != null) {
            cp.setType(request.getType());
        }
        if (request.getDescription() != null) {
            cp.setDescription(request.getDescription().trim());
        }
        if (request.getCrop() != null) {
            cp.setCrop(request.getCrop());
        }
        if (request.getSeverity() != null) {
            cp.setSeverity(request.getSeverity());
        }
        if (request.getSeason() != null) {
            cp.setSeason(request.getSeason());
        }
        if (request.getSymptoms() != null) {
            cp.setSymptoms(request.getSymptoms());
        }
        if (request.getAffectedParts() != null) {
            cp.setAffectedParts(request.getAffectedParts());
        }
        if (request.getCauses() != null) {
            cp.setCauses(request.getCauses().trim());
        }
        if (request.getPrevention() != null) {
            cp.setPrevention(request.getPrevention().trim());
        }
        if (request.getPreventionMethods() != null) {
            cp.setPreventionMethods(request.getPreventionMethods());
        }
        if (request.getOrganicMethods() != null) {
            cp.setOrganicMethods(request.getOrganicMethods().trim());
        }
        if (request.getCulturalMethods() != null) {
            cp.setCulturalMethods(request.getCulturalMethods().trim());
        }
        if (request.getChemicalMethods() != null) {
            cp.setChemicalMethods(request.getChemicalMethods().trim());
        }
        if (request.getEnvironmentalConditions() != null) {
            cp.setEnvironmentalConditions(request.getEnvironmentalConditions().trim());
        }
        if (request.getImageUrl() != null) {
            cp.setImageUrl(request.getImageUrl().trim());
        }

        CropProtection updated = cropProtectionRepository.save(cp);
        return CropProtectionResponse.fromEntity(updated);
    }

    @Transactional
    public void delete(Long id) {
        CropProtection cp = cropProtectionRepository.findByIdAndActiveTrue(id)
                .orElseThrow(() -> new ResourceNotFoundException("Crop protection advisory not found with ID: " + id));

        cp.setActive(false);
        cropProtectionRepository.save(cp);
    }
}
