package com.agrinexus.analytics.recommendation;

import com.agrinexus.analytics.calculator.CropProfileConfig;
import com.agrinexus.farm.entity.Farm;
import com.agrinexus.market.entity.MarketPrice;
import com.agrinexus.weather.dto.WeatherResponse;

import java.util.ArrayList;
import java.util.List;

public class RuleBasedCropRecommendationEngine {

    public record RecommendationResult(
            String cropCode,
            String displayName,
            String icon,
            int score,
            String label,
            List<String> matchedFactors,
            List<String> warnings,
            List<String> assumptions,
            String riskLevel
    ) {}

    public static RecommendationResult evaluateCrop(
            CropProfileConfig.AgronomicProfile profile,
            Farm farm,
            WeatherResponse weather,
            List<MarketPrice> localMarketPrices) {

        int score = 40; // baseline score
        List<String> matchedFactors = new ArrayList<>();
        List<String> warnings = new ArrayList<>();
        List<String> assumptions = new ArrayList<>();

        // 1. Soil Match (+25 points)
        if (farm != null && farm.getSoilType() != null) {
            String farmSoil = farm.getSoilType().trim().toUpperCase().replace(" ", "_");
            boolean soilMatch = profile.preferredSoils().stream().anyMatch(ps -> farmSoil.contains(ps) || ps.contains(farmSoil));
            if (soilMatch) {
                score += 25;
                matchedFactors.add("Soil type (" + farm.getSoilType() + ") aligns with preferred agronomic conditions.");
            } else {
                warnings.add("Soil type (" + farm.getSoilType() + ") may require supplemental organic soil conditioning for optimal yield.");
            }
        }

        // 2. Irrigation Match (+20 points)
        if (farm != null && farm.getIrrigationType() != null) {
            String farmIrrig = farm.getIrrigationType().trim().toUpperCase().replace(" ", "_");
            boolean irrigMatch = profile.suitableIrrigation().stream().anyMatch(si -> farmIrrig.contains(si) || si.contains(farmIrrig));
            if (irrigMatch) {
                score += 20;
                matchedFactors.add("Irrigation infrastructure (" + farm.getIrrigationType() + ") satisfies crop water distribution needs.");
            } else {
                warnings.add("Irrigation type (" + farm.getIrrigationType() + ") may provide suboptimal moisture distribution.");
            }
        }

        // 3. Water Availability
        if (farm != null && farm.getWaterAvailability() != null) {
            String waterAvail = farm.getWaterAvailability().trim().toUpperCase();
            if ("HIGH".equals(profile.waterRequirement()) && "LOW".contains(waterAvail)) {
                score -= 15;
                warnings.add("High water requirement crop with reported low water availability. Risk of moisture stress.");
            } else if ("LOW".equals(profile.waterRequirement())) {
                score += 10;
                matchedFactors.add("Drought-tolerant / low water footprint suitable for local water buffer.");
            }
        }

        // 4. Market Price Track Record (+10 points)
        if (localMarketPrices != null && !localMarketPrices.isEmpty()) {
            score += 10;
            matchedFactors.add("Active local APMC mandi price history registered in " + localMarketPrices.get(0).getMarket() + ".");
        } else {
            warnings.add("Limited local mandi price records. Regional reference prices applied.");
        }

        // 5. Weather Context
        if (weather != null && weather.isAvailable()) {
            if ("clear".equalsIgnoreCase(weather.getCondition()) || "partly_cloudy".equalsIgnoreCase(weather.getCondition())) {
                matchedFactors.add("Current clear sunshine conditions favorable for field operations.");
            }
        }

        score = Math.min(Math.max(score, 10), 98); // Clamp 10 to 98

        assumptions.add("Rule-based relevance score derived from soil, water infrastructure, regional climate, and historical APMC trading records.");
        assumptions.add("This is an agronomic suitability ranking, not a guaranteed yield, profit, or weather outcome.");

        String riskLevel = score >= 75 ? "LOW" : (score >= 55 ? "MEDIUM" : "HIGH");

        return new RecommendationResult(
                profile.cropCode(),
                profile.displayName(),
                profile.icon(),
                score,
                "Rule-based agronomic relevance",
                matchedFactors,
                warnings,
                assumptions,
                riskLevel
        );
    }
}
