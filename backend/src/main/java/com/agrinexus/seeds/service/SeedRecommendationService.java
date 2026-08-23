package com.agrinexus.seeds.service;

import com.agrinexus.exception.ResourceNotFoundException;
import com.agrinexus.farm.entity.Farm;
import com.agrinexus.farm.repository.FarmRepository;
import com.agrinexus.seeds.dto.SeedRecommendationResponse;
import com.agrinexus.seeds.dto.SeedResponse;
import com.agrinexus.seeds.entity.CropType;
import com.agrinexus.seeds.entity.SeasonType;
import com.agrinexus.seeds.entity.Seed;
import com.agrinexus.seeds.entity.SoilType;
import com.agrinexus.seeds.entity.WaterRequirement;
import com.agrinexus.seeds.repository.SeedRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@Service
public class SeedRecommendationService {

    private final SeedRepository seedRepository;
    private final FarmRepository farmRepository;

    public SeedRecommendationService(SeedRepository seedRepository, FarmRepository farmRepository) {
        this.seedRepository = seedRepository;
        this.farmRepository = farmRepository;
    }

    @Transactional(readOnly = true)
    public List<SeedRecommendationResponse> getRecommendedSeedsForFarm(String userEmail) {
        Farm farm = farmRepository.findByUserEmail(userEmail.toLowerCase().trim())
                .orElseThrow(() -> new ResourceNotFoundException("No farm profile found for this account. Create a farm profile via POST /api/farms to receive indicative suitability recommendations."));

        List<Seed> activeSeeds = seedRepository.findByActiveTrue();
        List<SeedRecommendationResponse> recommendations = new ArrayList<>();

        for (Seed seed : activeSeeds) {
            int score = 0;
            List<String> matchedFactors = new ArrayList<>();
            List<String> unmatchedFactors = new ArrayList<>();

            // 1. Crop Match (30 pts)
            if (farm.getCurrentCrop() != null && !farm.getCurrentCrop().trim().isEmpty()) {
                CropType farmCrop = CropType.fromString(farm.getCurrentCrop());
                if (farmCrop != null && farmCrop == seed.getCrop()) {
                    score += 30;
                    matchedFactors.add("Crop Alignment: Matches active farm crop (" + seed.getCrop() + ")");
                } else if (seed.getName().toLowerCase().contains(farm.getCurrentCrop().toLowerCase())) {
                    score += 25;
                    matchedFactors.add("Crop Name Proximity: Variety aligned with " + farm.getCurrentCrop());
                } else {
                    unmatchedFactors.add("Crop variance: Farm currently cultivating " + farm.getCurrentCrop());
                }
            } else {
                score += 15; // Neutral baseline when crop unspecified
            }

            // 2. Season Match (25 pts)
            if (farm.getSeason() != null && !farm.getSeason().trim().isEmpty()) {
                SeasonType farmSeason = SeasonType.fromString(farm.getSeason());
                if (farmSeason != null && (farmSeason == seed.getSeason() || seed.getSeason() == SeasonType.YEAR_ROUND)) {
                    score += 25;
                    matchedFactors.add("Season Alignment: Configured for " + seed.getSeason() + " cycle");
                } else {
                    unmatchedFactors.add("Season variance: Seed specified for " + seed.getSeason() + " season");
                }
            } else {
                score += 15;
            }

            // 3. Soil Match (20 pts)
            if (farm.getSoilType() != null && !farm.getSoilType().trim().isEmpty()) {
                SoilType farmSoil = SoilType.fromString(farm.getSoilType());
                if (seed.getSoilTypes().isEmpty() || (farmSoil != null && seed.getSoilTypes().contains(farmSoil))) {
                    score += 20;
                    matchedFactors.add("Soil Compatibility: Well-suited for " + farm.getSoilType());
                } else {
                    unmatchedFactors.add("Soil preference: Seed optimized for " + seed.getSoilTypes());
                }
            } else {
                score += 10;
            }

            // 4. Regional Suitability (15 pts)
            if (farm.getState() != null && !farm.getState().trim().isEmpty()) {
                String farmState = farm.getState().toLowerCase().trim();
                boolean regionMatch = seed.getSuitableRegions().isEmpty() ||
                        seed.getSuitableRegions().stream().anyMatch(r -> r.toLowerCase().contains(farmState) || farmState.contains(r.toLowerCase()));

                if (regionMatch) {
                    score += 15;
                    matchedFactors.add("Regional Suitability: Recommended for " + farm.getState() + " agro-climatic zone");
                } else {
                    unmatchedFactors.add("Regional zone: Configured primarily for " + seed.getSuitableRegions());
                }
            } else {
                score += 10;
            }

            // 5. Water & Irrigation (10 pts)
            boolean hasGoodIrrigation = farm.getWaterAvailability() != null &&
                    (farm.getWaterAvailability().toLowerCase().contains("borewell") ||
                     farm.getWaterAvailability().toLowerCase().contains("canal") ||
                     farm.getWaterAvailability().toLowerCase().contains("available") ||
                     farm.getWaterAvailability().toLowerCase().contains("high"));

            if (hasGoodIrrigation || seed.getWaterRequirement() == WaterRequirement.LOW) {
                score += 10;
                matchedFactors.add("Irrigation & Hydrology: " + (seed.getWaterRequirement() != null ? seed.getWaterRequirement() : "Standard") + " water requirement satisfies farm infrastructure");
            } else {
                unmatchedFactors.add("Water demand: Seed has " + seed.getWaterRequirement() + " water demand");
            }

            score = Math.min(100, Math.max(0, score));

            recommendations.add(new SeedRecommendationResponse(
                    SeedResponse.fromEntity(seed),
                    score,
                    "Rule-based suitability score",
                    "Indicative suitability based on configured farm context and agronomic parameters. Not guaranteed agricultural advice.",
                    matchedFactors,
                    unmatchedFactors
            ));
        }

        recommendations.sort(Comparator.comparingInt(SeedRecommendationResponse::getScore).reversed());
        return recommendations;
    }
}
