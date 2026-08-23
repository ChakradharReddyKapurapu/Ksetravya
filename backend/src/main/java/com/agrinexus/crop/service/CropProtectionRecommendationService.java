package com.agrinexus.crop.service;

import com.agrinexus.crop.dto.CropProtectionRecommendationResponse;
import com.agrinexus.crop.dto.CropProtectionResponse;
import com.agrinexus.crop.entity.CropProtection;
import com.agrinexus.crop.repository.CropProtectionRepository;
import com.agrinexus.exception.ResourceNotFoundException;
import com.agrinexus.farm.entity.Farm;
import com.agrinexus.farm.repository.FarmRepository;
import com.agrinexus.seeds.entity.CropType;
import com.agrinexus.seeds.entity.SeasonType;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@Service
public class CropProtectionRecommendationService {

    private final CropProtectionRepository cropProtectionRepository;
    private final FarmRepository farmRepository;

    public CropProtectionRecommendationService(CropProtectionRepository cropProtectionRepository, FarmRepository farmRepository) {
        this.cropProtectionRepository = cropProtectionRepository;
        this.farmRepository = farmRepository;
    }

    @Transactional(readOnly = true)
    public List<CropProtectionRecommendationResponse> getRelevantForFarm(String userEmail) {
        Farm farm = farmRepository.findByUserEmail(userEmail.toLowerCase().trim())
                .orElseThrow(() -> new ResourceNotFoundException("No farm profile found for this account. Create a farm profile via POST /api/farms to receive relevant crop health advisories."));

        List<CropProtection> activeRecords = cropProtectionRepository.findByActiveTrue();
        List<CropProtectionRecommendationResponse> results = new ArrayList<>();

        for (CropProtection cp : activeRecords) {
            int score = 0;
            List<String> matchedFactors = new ArrayList<>();
            List<String> unmatchedFactors = new ArrayList<>();

            // 1. Crop Match (35 pts)
            if (farm.getCurrentCrop() != null && !farm.getCurrentCrop().trim().isEmpty()) {
                CropType farmCrop = CropType.fromString(farm.getCurrentCrop());
                if (farmCrop != null && farmCrop == cp.getCrop()) {
                    score += 35;
                    matchedFactors.add("Target Crop Match: Advisory configured for " + cp.getCrop());
                } else if (cp.getName().toLowerCase().contains(farm.getCurrentCrop().toLowerCase())) {
                    score += 30;
                    matchedFactors.add("Crop Proximity: Condition observed in " + farm.getCurrentCrop());
                } else {
                    unmatchedFactors.add("Crop difference: Farm currently cultivating " + farm.getCurrentCrop());
                }
            } else {
                score += 15;
            }

            // 2. Season Match (25 pts)
            if (farm.getSeason() != null && !farm.getSeason().trim().isEmpty()) {
                SeasonType farmSeason = SeasonType.fromString(farm.getSeason());
                if (farmSeason != null && (farmSeason == cp.getSeason() || cp.getSeason() == SeasonType.YEAR_ROUND)) {
                    score += 25;
                    matchedFactors.add("Seasonal Vulnerability: Highest incidence during " + cp.getSeason() + " cycle");
                } else {
                    unmatchedFactors.add("Seasonal variance: Prevalent during " + cp.getSeason() + " season");
                }
            } else {
                score += 15;
            }

            // 3. Environmental / Soil & Water Trigger (20 pts)
            boolean hasMoisture = farm.getWaterAvailability() != null &&
                    (farm.getWaterAvailability().toLowerCase().contains("borewell") ||
                     farm.getWaterAvailability().toLowerCase().contains("canal") ||
                     farm.getWaterAvailability().toLowerCase().contains("available"));

            if (hasMoisture) {
                score += 20;
                matchedFactors.add("Agro-Climatic Trigger: Irrigation & moisture profile aligns with pathogen/pest emergence criteria");
            } else {
                score += 10;
                unmatchedFactors.add("Hydrology difference: Requires specific environmental trigger conditions");
            }

            // 4. Regional Zone (20 pts)
            if (farm.getState() != null && !farm.getState().trim().isEmpty()) {
                score += 20;
                matchedFactors.add("Regional Zone: Configured for " + farm.getState() + " agricultural territory");
            } else {
                score += 10;
            }

            score = Math.min(100, Math.max(0, score));

            results.add(new CropProtectionRecommendationResponse(
                    CropProtectionResponse.fromEntity(cp),
                    score,
                    "Configured agricultural advisory relevance",
                    "Informational advisory based on configured farm context and agro-climatic parameters. Not a certified physical plant pathology diagnosis.",
                    matchedFactors,
                    unmatchedFactors
            ));
        }

        results.sort(Comparator.comparingInt(CropProtectionRecommendationResponse::getMatchScore).reversed());
        return results;
    }
}
