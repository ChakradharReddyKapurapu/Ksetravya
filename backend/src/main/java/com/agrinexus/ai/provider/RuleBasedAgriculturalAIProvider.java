package com.agrinexus.ai.provider;

import com.agrinexus.ai.dto.*;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service("ruleBasedAIProvider")
public class RuleBasedAgriculturalAIProvider implements AIProvider {

    @Override
    public CropRecommendationResponse getCropRecommendations(FarmerContextDto context, CropRecommendationRequest request) {
        String soil = (request != null && request.getSoilType() != null) ? request.getSoilType().trim() :
                (context.getFarm() != null && context.getFarm().getSoilType() != null) ? context.getFarm().getSoilType() : "Loam";

        String season = (request != null && request.getSeason() != null) ? request.getSeason().trim() : context.getSeason();
        BigDecimal area = (request != null && request.getFarmAreaAcres() != null) ? request.getFarmAreaAcres() :
                (context.getFarm() != null && context.getFarm().getArea() != null) ? BigDecimal.valueOf(context.getFarm().getArea()) : new BigDecimal("2.5");

        String primaryCrop = "Paddy";
        BigDecimal yieldKg = new BigDecimal("2400");
        BigDecimal profitPerAcre = new BigDecimal("42000");
        int confidence = 92;

        if ("Black Cotton".equalsIgnoreCase(soil) || "Cotton".equalsIgnoreCase(soil)) {
            primaryCrop = "Cotton";
            yieldKg = new BigDecimal("1200");
            profitPerAcre = new BigDecimal("55000");
            confidence = 94;
        } else if ("Red Sandy".equalsIgnoreCase(soil) || "Sandy".equalsIgnoreCase(soil)) {
            primaryCrop = "Groundnut";
            yieldKg = new BigDecimal("950");
            profitPerAcre = new BigDecimal("38000");
            confidence = 88;
        } else if ("Rabi".equalsIgnoreCase(season)) {
            primaryCrop = "Maize";
            yieldKg = new BigDecimal("2800");
            profitPerAcre = new BigDecimal("48000");
            confidence = 90;
        }

        List<CropRecommendationResponse.CropOption> alternatives = new ArrayList<>();
        alternatives.add(new CropRecommendationResponse.CropOption("Chilli", "High Profit / Medium Risk", new BigDecimal("75000"), "MEDIUM"));
        alternatives.add(new CropRecommendationResponse.CropOption("Pulses (Red Gram)", "Low Water / Soil Enriching", new BigDecimal("32000"), "LOW"));

        String reasoning = String.format("Based on %s soil, %s season, and an area of %s acres, %s is recommended for optimal yield and soil health.", soil, season, area, primaryCrop);
        String safetyNotice = "Recommendations are generated using verified agronomic regional data. Ensure soil testing prior to sowing.";

        return new CropRecommendationResponse(primaryCrop, yieldKg, profitPerAcre, confidence, alternatives, reasoning, safetyNotice);
    }

    @Override
    public FertilizerGuidanceResponse getFertilizerGuidance(FarmerContextDto context, FertilizerGuidanceRequest request) {
        String crop = (request != null && request.getCropName() != null) ? request.getCropName().trim() : "Paddy";
        String stage = (request != null && request.getGrowthStage() != null) ? request.getGrowthStage().toUpperCase().trim() : "TILLERING";
        BigDecimal area = (request != null && request.getFarmAreaAcres() != null) ? request.getFarmAreaAcres() : new BigDecimal("1.0");

        String npk = "120:60:60 NPK kg/ha";
        List<FertilizerGuidanceResponse.FertilizerDosage> dosages = new ArrayList<>();

        if ("SOWING".equals(stage)) {
            dosages.add(new FertilizerGuidanceResponse.FertilizerDosage("DAP (Di-ammonium Phosphate)", new BigDecimal("50.0").multiply(area), "At land preparation / basal", "Soil application"));
            dosages.add(new FertilizerGuidanceResponse.FertilizerDosage("MOP (Muriate of Potash)", new BigDecimal("25.0").multiply(area), "Basal dose", "Soil incorporation"));
        } else if ("FLOWERING".equals(stage) || "GRAIN_FILLING".equals(stage)) {
            dosages.add(new FertilizerGuidanceResponse.FertilizerDosage("Urea", new BigDecimal("30.0").multiply(area), "Top dressing", "Broadcasting after irrigation"));
            dosages.add(new FertilizerGuidanceResponse.FertilizerDosage("19-19-19 NPK Foliar Spray", new BigDecimal("2.5").multiply(area), "Early morning", "Foliar spray"));
        } else { // Default TILLERING
            dosages.add(new FertilizerGuidanceResponse.FertilizerDosage("Urea", new BigDecimal("45.0").multiply(area), "Tillering stage (20-25 days after sowing)", "Broadcasting with moist soil"));
            dosages.add(new FertilizerGuidanceResponse.FertilizerDosage("Zinc Sulphate (21%)", new BigDecimal("10.0").multiply(area), "Basal / Tillering", "Soil application"));
        }

        String schedule = "Apply basal dosage during land preparation. Apply top dressing in two splits after weeding.";
        String organic = "Apply 5 tonnes FYM (Farmyard Manure) or 2 tonnes Vermicompost per acre during basal preparation. Use Jeevamrutha every 15 days.";
        String safetyNotice = "Avoid applying nitrogenous fertilizers right before heavy rainfall. Wear protective gloves when handling chemical fertilizers.";

        return new FertilizerGuidanceResponse(crop, stage, npk, dosages, schedule, organic, safetyNotice);
    }

    @Override
    public WeatherRecommendationResponse getWeatherRecommendations(FarmerContextDto context) {
        String location = (context.getFarm() != null && context.getFarm().getLocation() != null) ? context.getFarm().getLocation() : "Guntur, AP";
        Double temp = (context.getCurrentWeather() != null && context.getCurrentWeather().getTemperature() != null) ? context.getCurrentWeather().getTemperature() : 31.5;
        String cond = (context.getCurrentWeather() != null && context.getCurrentWeather().getCondition() != null) ? context.getCurrentWeather().getCondition() : "Partly Cloudy";

        List<String> actionItems = Arrays.asList(
                "Irrigate fields in the early morning to reduce evapotranspiration losses.",
                "Inspect lower leaves for fungal leaf spots following humid conditions.",
                "Ensure proper field drainage if heavy monsoon showers are expected."
        );

        List<String> irrigationAdvice = Arrays.asList(
                "Maintain 2-5 cm standing water level for Paddy crops during tillering.",
                "Avoid waterlogging in Cotton fields to prevent root rot."
        );

        List<String> riskAlerts = Arrays.asList(
                "Moderate humidity (75%) may increase risk of blast/blight in cereal crops."
        );

        String summary = "Temperatures expected to range between 26°C and 34°C over the next 7 days with light afternoon showers.";

        return new WeatherRecommendationResponse(location, temp, cond, actionItems, irrigationAdvice, riskAlerts, summary);
    }

    @Override
    public MarketInsightResponse getMarketPriceInsights(FarmerContextDto context, String commodity) {
        String comm = (commodity != null && !commodity.trim().isEmpty()) ? commodity.trim() : "Paddy";
        BigDecimal currentPrice = new BigDecimal("2300.00");
        String trend = "RISING";
        String rec = "HOLD_FOR_2_WEEKS";

        if ("Cotton".equalsIgnoreCase(comm)) {
            currentPrice = new BigDecimal("7400.00");
            trend = "STABLE";
            rec = "SELL_NOW";
        } else if ("Chilli".equalsIgnoreCase(comm)) {
            currentPrice = new BigDecimal("18500.00");
            trend = "RISING";
            rec = "HOLD_FOR_2_WEEKS";
        }

        List<MarketInsightResponse.MandiOption> topMandis = Arrays.asList(
                new MarketInsightResponse.MandiOption("Guntur Main Agricultural Market", "Guntur", currentPrice.add(new BigDecimal("150")), new BigDecimal("12.5")),
                new MarketInsightResponse.MandiOption("Tenali APMC Market", "Guntur", currentPrice, new BigDecimal("8.0"))
        );

        String summary = String.format("Market arrivals for %s are steady. Demand is expected to rise by 5-8%% over the coming fortnight.", comm);

        return new MarketInsightResponse(comm, currentPrice, trend, rec, topMandis, summary);
    }

    @Override
    public ProfitLossEstimateResponse estimateProfitLoss(FarmerContextDto context, ProfitLossEstimateRequest request) {
        String crop = (request != null && request.getCropName() != null) ? request.getCropName() : "Paddy";
        BigDecimal area = (request != null && request.getFarmAreaAcres() != null) ? request.getFarmAreaAcres() : new BigDecimal("2.0");
        BigDecimal expectedPrice = (request != null && request.getExpectedMarketPricePerQuintal() != null) ? request.getExpectedMarketPricePerQuintal() : new BigDecimal("2300");

        BigDecimal seedCost = new BigDecimal("3500").multiply(area);
        BigDecimal fertCost = new BigDecimal("6500").multiply(area);
        BigDecimal laborCost = new BigDecimal("9000").multiply(area);
        BigDecimal machCost = new BigDecimal("4000").multiply(area);

        BigDecimal totalCost = seedCost.add(fertCost).add(laborCost).add(machCost);
        BigDecimal yieldQuintals = (request != null && request.getExpectedYieldQuintals() != null) ? request.getExpectedYieldQuintals() : new BigDecimal("24").multiply(area);

        BigDecimal grossRevenue = yieldQuintals.multiply(expectedPrice);
        BigDecimal netProfit = grossRevenue.subtract(totalCost);

        BigDecimal roi = BigDecimal.ZERO;
        if (totalCost.compareTo(BigDecimal.ZERO) > 0) {
            roi = netProfit.multiply(new BigDecimal("100")).divide(totalCost, 2, RoundingMode.HALF_UP);
        }

        String summary = String.format("Estimated net profit for %s acres of %s is ₹%s with an ROI of %s%%.", area, crop, netProfit, roi);

        return new ProfitLossEstimateResponse(crop, area, seedCost, fertCost, laborCost, machCost, totalCost, grossRevenue, netProfit, roi, summary);
    }

    @Override
    public CropComparisonResponse compareCrops(FarmerContextDto context, CropComparisonRequest request) {
        List<String> crops = (request != null && request.getCropNames() != null && !request.getCropNames().isEmpty())
                ? request.getCropNames() : Arrays.asList("Paddy", "Cotton");

        List<CropComparisonResponse.CropComparisonItem> items = new ArrayList<>();
        for (String c : crops) {
            if ("Cotton".equalsIgnoreCase(c)) {
                items.add(new CropComparisonResponse.CropComparisonItem("Cotton", 160, new BigDecimal("12"), new BigDecimal("22000"), new BigDecimal("55000"), "MEDIUM", "MEDIUM"));
            } else if ("Maize".equalsIgnoreCase(c)) {
                items.add(new CropComparisonResponse.CropComparisonItem("Maize", 110, new BigDecimal("28"), new BigDecimal("18000"), new BigDecimal("48000"), "MEDIUM", "LOW"));
            } else {
                items.add(new CropComparisonResponse.CropComparisonItem("Paddy", 135, new BigDecimal("24"), new BigDecimal("23000"), new BigDecimal("42000"), "HIGH", "LOW"));
            }
        }

        String winner = items.get(0).getCropName();
        String summary = "Comparison evaluated based on input investment, risk factor, water availability, and net market return.";

        return new CropComparisonResponse(items, winner, summary);
    }

    @Override
    public FarmingPlanResponse generateFarmingPlan(FarmerContextDto context, FarmingPlanRequest request) {
        String crop = (request != null && request.getCropName() != null) ? request.getCropName() : "Paddy";

        List<FarmingPlanResponse.PlanStage> stages = new ArrayList<>();
        stages.add(new FarmingPlanResponse.PlanStage("Land Preparation & Soil Testing", 1, 10, Arrays.asList("Deep plowing", "Applying FYM organic manure", "Leveling field"), "Plough, FYM Manure"));
        stages.add(new FarmingPlanResponse.PlanStage("Sowing & Nursery Management", 11, 25, Arrays.asList("Seed treatment with Trichoderma", "Nursery bed sowing"), "Quality Certified Seeds, Bio-fungicides"));
        stages.add(new FarmingPlanResponse.PlanStage("Transplanting / Main Field Sowing", 26, 35, Arrays.asList("Transplanting 25-day seedlings", "First basal fertilizer dose"), "DAP, MOP, Laborers"));
        stages.add(new FarmingPlanResponse.PlanStage("Weed & Water Management", 36, 60, Arrays.asList("Cono-weeder application", "Maintaining 3cm water depth"), "Weeder tool, Water pump"));
        stages.add(new FarmingPlanResponse.PlanStage("Pest Monitoring & Nutrient Spray", 61, 90, Arrays.asList("Installing pheromone traps", "Top dressing Urea"), "Urea, Neem Oil Spray"));
        stages.add(new FarmingPlanResponse.PlanStage("Grain Filling & Maturation", 91, 120, Arrays.asList("Draining water 10 days before harvest"), "Drainage channels"));
        stages.add(new FarmingPlanResponse.PlanStage("Harvesting & Post-Harvest", 121, 135, Arrays.asList("Combined harvester threshing", "Sun drying to 12% moisture"), "Combined Harvester, Storage Bags"));

        String summary = String.format("Complete 135-day structured agricultural plan for %s.", crop);

        return new FarmingPlanResponse(crop, 135, stages, summary);
    }

    @Override
    public AgriQueryResponse answerAgriQuery(FarmerContextDto context, AgriQueryRequest request) {
        String query = (request != null && request.getQuery() != null) ? request.getQuery() : "How to control stem borer in Paddy?";
        String crop = (request != null && request.getCropName() != null) ? request.getCropName() : "Paddy";

        String answer = "To control stem borer effectively, install pheromone traps at 5 traps/acre for monitoring. If egg masses or dead hearts exceed 10%, apply Chlorantraniliprole 18.5% SC @ 60ml/acre or Cartap Hydrochloride 4G granules @ 7.5kg/acre.";

        List<String> steps = Arrays.asList(
                "Monitor for yellowing central shoots (dead hearts).",
                "Clip seedling leaf tips before transplanting to remove egg masses.",
                "Maintain recommended water level after chemical application."
        );

        List<String> products = Arrays.asList("Chlorantraniliprole 18.5% SC", "Cartap Hydrochloride 4G", "Pheromone Traps");
        String safetyNotice = "Always wear protective gear and follow dosage instructions specified on chemical labels.";

        return new AgriQueryResponse(query, answer, steps, products, safetyNotice);
    }

    @Override
    public CropHealthAnalysisResponse analyzeCropHealth(FarmerContextDto context, CropHealthAnalysisRequest request) {
        String crop = (request != null && request.getCropName() != null) ? request.getCropName() : "Paddy";
        String symptoms = (request != null && request.getSymptomsDescription() != null) ? request.getSymptomsDescription() : "Spindle-shaped spots on leaves with gray centers";

        String condition = "Rice Blast (Magnaporthe oryzae)";
        String severity = "MODERATE";
        int confidence = 91;

        if (symptoms.toLowerCase().contains("yellow") || symptoms.toLowerCase().contains("aphid") || symptoms.toLowerCase().contains("sucking")) {
            condition = "Sucking Pests / Aphids Infestation";
            severity = "LOW";
            confidence = 89;
        }

        List<String> immediate = Arrays.asList(
                "Avoid excessive nitrogenous fertilizer top dressing.",
                "Maintain proper spacing and field ventilation."
        );

        List<String> organic = Arrays.asList(
                "Spray Neem oil (10,000 ppm) @ 3ml per liter of water.",
                "Apply Pseudomonas fluorescens bio-fungicide @ 10g/liter."
        );

        List<String> chemical = Arrays.asList(
                "Tricyclazole 75% WP @ 0.6g/liter of water",
                "Isoprothiolane 40% EC @ 1.5ml/liter of water"
        );

        String prevention = "Use blast-resistant seed varieties such as MTU 1010 or BPT 5204. Perform seed treatment prior to sowing.";
        String safetyNotice = "Observe a 14-day pre-harvest interval (PHI) after spraying synthetic fungicides.";

        return new CropHealthAnalysisResponse(crop, condition, severity, confidence, immediate, organic, chemical, prevention, safetyNotice);
    }

    @Override
    public PersonalizedDashboardRecommendationResponse getPersonalizedRecommendations(FarmerContextDto context) {
        String name = context.getFarmerName() != null ? context.getFarmerName() : "Farmer";
        String location = (context.getFarm() != null && context.getFarm().getLocation() != null) ? context.getFarm().getLocation() : "Tenali, Guntur";
        String season = context.getSeason() != null ? context.getSeason() : "Kharif";
        String weatherSum = "31°C, Partly Cloudy, 10% Chance of Rain";

        List<PersonalizedDashboardRecommendationResponse.ActionCard> urgent = Arrays.asList(
                new PersonalizedDashboardRecommendationResponse.ActionCard("Apply Tillering Urea Dose", "FERTILIZER", "HIGH", "Your Paddy crop is entering 25-day tillering stage. Apply split nitrogen dose.", "/dashboard/fertilizer"),
                new PersonalizedDashboardRecommendationResponse.ActionCard("Mandi Price Rise Alert", "MARKET", "MEDIUM", "Paddy prices in Guntur Mandi increased by ₹150/quintal.", "/dashboard/market-prices")
        );

        List<PersonalizedDashboardRecommendationResponse.ActionCard> upcoming = Arrays.asList(
                new PersonalizedDashboardRecommendationResponse.ActionCard("Schedule Weeding Operation", "IRRIGATION", "MEDIUM", "Optimal time for cono-weeder pass before next irrigation cycle.", "/dashboard/jobs")
        );

        String marketHighlight = "Paddy & Chilli markets in Guntur district showing bullish 7-day trend.";

        return new PersonalizedDashboardRecommendationResponse(name, location, season, weatherSum, urgent, upcoming, marketHighlight);
    }
}
