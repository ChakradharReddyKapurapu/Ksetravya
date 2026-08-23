package com.agrinexus.analytics.service;

import com.agrinexus.analytics.calculator.AreaUnitConverter;
import com.agrinexus.analytics.calculator.CropEconomicsCalculator;
import com.agrinexus.analytics.calculator.CropProfileConfig;
import com.agrinexus.analytics.dto.*;
import com.agrinexus.analytics.recommendation.RuleBasedCropRecommendationEngine;
import com.agrinexus.exception.BadRequestException;
import com.agrinexus.exception.ResourceNotFoundException;
import com.agrinexus.exception.UnauthorizedException;
import com.agrinexus.farm.dto.FarmResponse;
import com.agrinexus.farm.entity.Farm;
import com.agrinexus.farm.repository.FarmRepository;
import com.agrinexus.market.entity.MarketPrice;
import com.agrinexus.market.repository.MarketPriceRepository;
import com.agrinexus.market.service.MarketPriceService;
import com.agrinexus.market.dto.MarketPriceTrendResponse;
import com.agrinexus.user.User;
import com.agrinexus.user.UserRepository;
import com.agrinexus.weather.dto.WeatherDailyForecast;
import com.agrinexus.weather.dto.WeatherForecastResponse;
import com.agrinexus.weather.dto.WeatherResponse;
import com.agrinexus.weather.service.WeatherService;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class AnalyticsService {

    private final FarmRepository farmRepository;
    private final UserRepository userRepository;
    private final WeatherService weatherService;
    private final MarketPriceRepository marketPriceRepository;
    private final MarketPriceService marketPriceService;

    public AnalyticsService(FarmRepository farmRepository, UserRepository userRepository, WeatherService weatherService, MarketPriceRepository marketPriceRepository, MarketPriceService marketPriceService) {
        this.farmRepository = farmRepository;
        this.userRepository = userRepository;
        this.weatherService = weatherService;
        this.marketPriceRepository = marketPriceRepository;
        this.marketPriceService = marketPriceService;
    }

    private Farm getFarmerFarm(String farmerEmail) {
        User user = userRepository.findByEmail(farmerEmail.toLowerCase().trim())
                .orElseThrow(() -> new UnauthorizedException("Authenticated user not found."));

        return farmRepository.findByUserId(user.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Farm profile not configured. Please setup your farm profile to view analytics."));
    }

    private BigDecimal getFarmNormalizedAcres(Farm farm) {
        if (farm == null || farm.getArea() == null) {
            return BigDecimal.ONE;
        }
        return AreaUnitConverter.toAcres(BigDecimal.valueOf(farm.getArea()), farm.getAreaUnit());
    }

    @Transactional(readOnly = true)
    public FarmerDashboardResponse getFarmerDashboard(String farmerEmail) {
        Farm farm = getFarmerFarm(farmerEmail);
        FarmResponse farmResp = FarmResponse.fromEntity(farm);

        WeatherResponse weather = null;
        try {
            weather = weatherService.getFarmWeather(farmerEmail);
        } catch (Exception ignored) {}

        List<CropAnalyticsResponse> cropAnalytics = getCropAnalyticsList(farmerEmail);
        List<CropRecommendationResponse> recommendations = getCropRecommendations(farmerEmail);
        List<WeatherInsightResponse> weatherInsights = getWeatherInsights(farmerEmail);

        return new FarmerDashboardResponse(farmResp, weather, cropAnalytics, recommendations, weatherInsights);
    }

    @Transactional(readOnly = true)
    public FarmAnalyticsResponse getFarmAnalytics(String farmerEmail) {
        Farm farm = getFarmerFarm(farmerEmail);
        BigDecimal normalizedAcres = getFarmNormalizedAcres(farm);

        return new FarmAnalyticsResponse(
                farm.getId(),
                farm.getFarmName(),
                farm.getLocation(),
                farm.getDistrict(),
                farm.getState(),
                farm.getArea(),
                farm.getAreaUnit(),
                normalizedAcres,
                farm.getSoilType(),
                farm.getWaterAvailability(),
                farm.getIrrigationType(),
                farm.getCurrentCrop()
        );
    }

    @Transactional(readOnly = true)
    public List<CropAnalyticsResponse> getCropAnalyticsList(String farmerEmail) {
        BigDecimal areaAcres = BigDecimal.ONE;
        if (farmerEmail != null) {
            try {
                Farm farm = getFarmerFarm(farmerEmail);
                areaAcres = getFarmNormalizedAcres(farm);
            } catch (Exception ignored) {}
        }

        List<CropAnalyticsResponse> results = new ArrayList<>();
        for (CropProfileConfig.AgronomicProfile profile : CropProfileConfig.getAllProfiles()) {
            BigDecimal marketPrice = findLatestMarketPrice(profile.cropCode());
            CropEconomicsCalculator.EconomicCalculation calc = CropEconomicsCalculator.calculateEconomics(
                    profile, areaAcres, BigDecimal.ZERO, marketPrice
            );

            results.add(new CropAnalyticsResponse(
                    profile.cropCode(),
                    profile.displayName(),
                    profile.icon(),
                    profile.typicalDurationDays(),
                    areaAcres,
                    calc.totalCost(),
                    calc.estimatedRevenue(),
                    calc.estimatedProfit(),
                    calc.profitMargin(),
                    calc.status(),
                    calc.referencePrice(),
                    calc.priceUnit(),
                    profile.defaultRiskLevel(),
                    profile.marketTimingInsight(),
                    calc.assumptions()
            ));
        }

        return results;
    }

    @Transactional(readOnly = true)
    public List<CropComparisonResponse> compareCrops(String crop1, String crop2, String crop3, String crop4, String farmerEmail) {
        if (crop1 == null || crop1.trim().isEmpty()) {
            throw new BadRequestException("At least one crop must be specified for comparison.");
        }

        BigDecimal areaAcres = BigDecimal.ONE;
        if (farmerEmail != null) {
            try {
                Farm farm = getFarmerFarm(farmerEmail);
                areaAcres = getFarmNormalizedAcres(farm);
            } catch (Exception ignored) {}
        }

        List<String> cropNames = new ArrayList<>();
        cropNames.add(crop1);
        if (crop2 != null && !crop2.trim().isEmpty()) cropNames.add(crop2);
        if (crop3 != null && !crop3.trim().isEmpty()) cropNames.add(crop3);
        if (crop4 != null && !crop4.trim().isEmpty()) cropNames.add(crop4);

        List<CropComparisonResponse> comparisons = new ArrayList<>();
        for (String cName : cropNames) {
            CropProfileConfig.AgronomicProfile profile = CropProfileConfig.getProfile(cName)
                    .orElseThrow(() -> new ResourceNotFoundException("Agronomic economic profile not found for crop: " + cName));

            BigDecimal marketPrice = findLatestMarketPrice(profile.cropCode());
            CropEconomicsCalculator.EconomicCalculation calc = CropEconomicsCalculator.calculateEconomics(
                    profile, areaAcres, BigDecimal.ZERO, marketPrice
            );

            comparisons.add(new CropComparisonResponse(
                    profile.cropCode(),
                    profile.displayName(),
                    profile.icon(),
                    areaAcres,
                    calc.totalCost(),
                    calc.estimatedRevenue(),
                    calc.estimatedProfit(),
                    calc.profitMargin(),
                    profile.typicalDurationDays(),
                    calc.referencePrice(),
                    calc.priceUnit(),
                    null,
                    "APMC Mandi Benchmark Registry",
                    calc.assumptions()
            ));
        }

        return comparisons;
    }

    @Transactional(readOnly = true)
    public CropCostResponse getCropCostBreakdown(String cropName, String farmerEmail) {
        CropProfileConfig.AgronomicProfile profile = CropProfileConfig.getProfile(cropName)
                .orElseThrow(() -> new ResourceNotFoundException("Agronomic economic profile not found for crop: " + cropName));

        BigDecimal areaAcres = BigDecimal.ONE;
        if (farmerEmail != null) {
            try {
                Farm farm = getFarmerFarm(farmerEmail);
                areaAcres = getFarmNormalizedAcres(farm);
            } catch (Exception ignored) {}
        }

        CropEconomicsCalculator.EconomicCalculation calc = CropEconomicsCalculator.calculateEconomics(
                profile, areaAcres, BigDecimal.ZERO, null
        );

        return new CropCostResponse(
                profile.cropCode(),
                profile.displayName(),
                areaAcres,
                calc.seedCost(),
                calc.fertilizerCost(),
                calc.cropProtectionCost(),
                calc.labourCost(),
                calc.machineryCost(),
                calc.irrigationCost(),
                calc.landLeaseCost(),
                calc.transportCost(),
                calc.otherCost(),
                calc.totalCost(),
                calc.assumptions()
        );
    }

    @Transactional(readOnly = true)
    public CropRevenueResponse getCropRevenueEstimation(String cropName, String farmerEmail) {
        CropProfileConfig.AgronomicProfile profile = CropProfileConfig.getProfile(cropName)
                .orElseThrow(() -> new ResourceNotFoundException("Agronomic economic profile not found for crop: " + cropName));

        BigDecimal areaAcres = BigDecimal.ONE;
        if (farmerEmail != null) {
            try {
                Farm farm = getFarmerFarm(farmerEmail);
                areaAcres = getFarmNormalizedAcres(farm);
            } catch (Exception ignored) {}
        }

        BigDecimal marketPrice = findLatestMarketPrice(profile.cropCode());
        CropEconomicsCalculator.EconomicCalculation calc = CropEconomicsCalculator.calculateEconomics(
                profile, areaAcres, BigDecimal.ZERO, marketPrice
        );

        return new CropRevenueResponse(
                profile.cropCode(),
                profile.displayName(),
                areaAcres,
                calc.estimatedYield(),
                calc.yieldUnit(),
                calc.referencePrice(),
                calc.priceUnit(),
                null,
                "APMC Mandi Realization Benchmark",
                calc.estimatedRevenue(),
                calc.assumptions()
        );
    }

    @Transactional(readOnly = true)
    public CropProfitResponse getCropProfitLoss(String cropName, String farmerEmail) {
        CropProfileConfig.AgronomicProfile profile = CropProfileConfig.getProfile(cropName)
                .orElseThrow(() -> new ResourceNotFoundException("Agronomic economic profile not found for crop: " + cropName));

        BigDecimal areaAcres = BigDecimal.ONE;
        if (farmerEmail != null) {
            try {
                Farm farm = getFarmerFarm(farmerEmail);
                areaAcres = getFarmNormalizedAcres(farm);
            } catch (Exception ignored) {}
        }

        BigDecimal marketPrice = findLatestMarketPrice(profile.cropCode());
        CropEconomicsCalculator.EconomicCalculation calc = CropEconomicsCalculator.calculateEconomics(
                profile, areaAcres, BigDecimal.ZERO, marketPrice
        );

        return new CropProfitResponse(
                profile.cropCode(),
                profile.displayName(),
                areaAcres,
                calc.totalCost(),
                calc.estimatedRevenue(),
                calc.estimatedProfit(),
                calc.profitMargin(),
                calc.status(),
                profile.defaultRiskLevel(),
                calc.assumptions()
        );
    }

    @Transactional(readOnly = true)
    public List<CropAnalyticsResponse> getProfitabilityRanking(List<String> crops, String district, BigDecimal area) {
        BigDecimal areaAcres = area != null && area.compareTo(BigDecimal.ZERO) > 0 ? area : BigDecimal.ONE;

        Collection<CropProfileConfig.AgronomicProfile> profiles;
        if (crops != null && !crops.isEmpty()) {
            profiles = crops.stream()
                    .map(CropProfileConfig::getProfile)
                    .filter(Optional::isPresent)
                    .map(Optional::get)
                    .collect(Collectors.toList());
        } else {
            profiles = CropProfileConfig.getAllProfiles();
        }

        List<CropAnalyticsResponse> ranked = new ArrayList<>();
        for (CropProfileConfig.AgronomicProfile profile : profiles) {
            BigDecimal marketPrice = findLatestMarketPrice(profile.cropCode());
            CropEconomicsCalculator.EconomicCalculation calc = CropEconomicsCalculator.calculateEconomics(
                    profile, areaAcres, BigDecimal.ZERO, marketPrice
            );

            ranked.add(new CropAnalyticsResponse(
                    profile.cropCode(),
                    profile.displayName(),
                    profile.icon(),
                    profile.typicalDurationDays(),
                    areaAcres,
                    calc.totalCost(),
                    calc.estimatedRevenue(),
                    calc.estimatedProfit(),
                    calc.profitMargin(),
                    calc.status(),
                    calc.referencePrice(),
                    calc.priceUnit(),
                    profile.defaultRiskLevel(),
                    profile.marketTimingInsight(),
                    calc.assumptions()
            ));
        }

        // Rank descending by estimatedProfit
        ranked.sort((a, b) -> b.getEstimatedProfit().compareTo(a.getEstimatedProfit()));
        return ranked;
    }

    @Transactional(readOnly = true)
    public MarketAnalyticsResponse getMarketAnalytics(String cropName) {
        if (cropName == null || cropName.trim().isEmpty()) {
            throw new BadRequestException("Crop commodity name is required.");
        }

        List<MarketPrice> records = marketPriceRepository
                .findByCommodityIgnoreCaseAndActiveTrueOrderByPriceDateDesc(cropName.trim());

        if (records.isEmpty()) {
            return new MarketAnalyticsResponse(
                    cropName.toUpperCase(),
                    BigDecimal.ZERO, BigDecimal.ZERO, BigDecimal.ZERO, BigDecimal.ZERO, BigDecimal.ZERO, BigDecimal.ZERO,
                    "neutral", "N/A", null, "Market price data is unavailable.", false
            );
        }

        MarketPrice latest = records.get(0);
        MarketPrice prev = records.size() > 1 ? records.get(1) : latest;

        BigDecimal minPrice = records.stream().map(MarketPrice::getMinimumPrice).min(BigDecimal::compareTo).orElse(latest.getMinimumPrice());
        BigDecimal maxPrice = records.stream().map(MarketPrice::getMaximumPrice).max(BigDecimal::compareTo).orElse(latest.getMaximumPrice());

        BigDecimal sum = records.stream().map(MarketPrice::getModalPrice).reduce(BigDecimal.ZERO, BigDecimal::add);
        BigDecimal avgPrice = sum.divide(BigDecimal.valueOf(records.size()), 2, RoundingMode.HALF_UP);

        BigDecimal pctChange = BigDecimal.ZERO;
        String dir = "neutral";
        if (prev.getModalPrice().compareTo(BigDecimal.ZERO) > 0) {
            BigDecimal diff = latest.getModalPrice().subtract(prev.getModalPrice());
            pctChange = diff.multiply(BigDecimal.valueOf(100)).divide(prev.getModalPrice(), 2, RoundingMode.HALF_UP);
            if (pctChange.compareTo(BigDecimal.ZERO) > 0) dir = "up";
            else if (pctChange.compareTo(BigDecimal.ZERO) < 0) dir = "down";
        }

        return new MarketAnalyticsResponse(
                latest.getCommodity(),
                latest.getModalPrice(),
                prev.getModalPrice(),
                minPrice,
                maxPrice,
                avgPrice,
                pctChange,
                dir,
                latest.getMarket(),
                latest.getPriceDate(),
                latest.getSource(),
                true
        );
    }

    @Transactional(readOnly = true)
    public MarketPriceTrendResponse getMarketPriceTrend(String cropName, String market, String period) {
        return marketPriceService.getPriceTrend(cropName, market, period);
    }

    @Transactional(readOnly = true)
    public WeatherAnalyticsResponse getWeatherAnalytics(String farmerEmail) {
        WeatherResponse curr = weatherService.getFarmWeather(farmerEmail);
        WeatherForecastResponse fc = weatherService.getFarmForecast(farmerEmail, 7);

        List<WeatherInsightResponse> insights = generateWeatherInsights(curr, fc.getForecasts());

        return new WeatherAnalyticsResponse(
                curr.getLocation(),
                curr.getTemperature(),
                curr.getFeelsLike(),
                curr.getHumidity(),
                curr.getPrecipitation(),
                curr.getWindSpeed(),
                curr.getCondition(),
                curr.getConditionLabel(),
                curr.getIcon(),
                fc.getForecasts(),
                insights,
                curr.getSource(),
                curr.isCached(),
                curr.isStale()
        );
    }

    @Transactional(readOnly = true)
    public List<WeatherInsightResponse> getWeatherInsights(String farmerEmail) {
        WeatherResponse curr = null;
        WeatherForecastResponse fc = null;
        try {
            curr = weatherService.getFarmWeather(farmerEmail);
            fc = weatherService.getFarmForecast(farmerEmail, 7);
        } catch (Exception ignored) {}

        return generateWeatherInsights(curr, fc != null ? fc.getForecasts() : Collections.emptyList());
    }

    private List<WeatherInsightResponse> generateWeatherInsights(WeatherResponse curr, List<WeatherDailyForecast> forecasts) {
        List<WeatherInsightResponse> insights = new ArrayList<>();

        if (forecasts != null) {
            boolean rainExpected = forecasts.stream().anyMatch(f -> f.getPrecipitationProbability() != null && f.getPrecipitationProbability() > 60);
            boolean heavyRain = forecasts.stream().anyMatch(f -> f.getPrecipitation() != null && f.getPrecipitation() > 15.0);
            boolean highTemp = forecasts.stream().anyMatch(f -> f.getMaxTemperature() != null && f.getMaxTemperature() > 38.0);
            boolean highWind = forecasts.stream().anyMatch(f -> f.getMaxWindSpeed() != null && f.getMaxWindSpeed() > 25.0);

            if (heavyRain) {
                insights.add(new WeatherInsightResponse(
                        "HEAVY_RAINFALL",
                        "Elevated Precipitation Expected",
                        "Forecast models indicate substantial rainfall over the next 48-72 hours.",
                        "WARNING",
                        "Ensure field drainage channels and bunds are clear to avoid root zone waterlogging."
                ));
            } else if (rainExpected) {
                insights.add(new WeatherInsightResponse(
                        "RAIN_FORECAST",
                        "Passing Rain Showers Forecast",
                        "Moderate rain probability observed across regional meteorological forecast window.",
                        "INFO",
                        "Consider scheduling foliar sprays and top-dress fertilizer applications around rain intervals."
                ));
            } else {
                insights.add(new WeatherInsightResponse(
                        "DRY_WINDOW",
                        "Favorable Dry Window for Field Work",
                        "Dry atmospheric conditions with steady sunshine observed over the upcoming week.",
                        "FAVORABLE",
                        "Ideal conditions for harvesting, land tillage, spraying, and sun-drying produce."
                ));
            }

            if (highTemp) {
                insights.add(new WeatherInsightResponse(
                        "HEAT_STRESS",
                        "High Temperature Alert (>38°C)",
                        "Peak daytime temperatures may elevate evapotranspiration rates.",
                        "ADVISORY",
                        "Maintain soil moisture using evening drip or micro-sprinkler cycles to buffer crop heat stress."
                ));
            }

            if (highWind) {
                insights.add(new WeatherInsightResponse(
                        "WIND_ADVISORY",
                        "Elevated Gust Speeds (>25 km/h)",
                        "Wind speeds may cause chemical spray drift and moisture depletion.",
                        "ADVISORY",
                        "Postpone tractor-mounted broad-acre pesticide spraying until wind conditions calm."
                ));
            }
        }

        return insights;
    }

    @Transactional(readOnly = true)
    public List<CropRecommendationResponse> getCropRecommendations(String farmerEmail) {
        Farm farm = getFarmerFarm(farmerEmail);
        WeatherResponse weather = null;
        try {
            weather = weatherService.getFarmWeather(farmerEmail);
        } catch (Exception ignored) {}

        List<CropRecommendationResponse> list = new ArrayList<>();

        for (CropProfileConfig.AgronomicProfile profile : CropProfileConfig.getAllProfiles()) {
            List<MarketPrice> mandiPrices = marketPriceRepository
                    .findByCommodityIgnoreCaseAndActiveTrueOrderByPriceDateDesc(profile.cropCode());

            RuleBasedCropRecommendationEngine.RecommendationResult eval =
                    RuleBasedCropRecommendationEngine.evaluateCrop(profile, farm, weather, mandiPrices);

            BigDecimal marketPrice = findLatestMarketPrice(profile.cropCode());
            CropEconomicsCalculator.EconomicCalculation calc = CropEconomicsCalculator.calculateEconomics(
                    profile, BigDecimal.ONE, BigDecimal.ZERO, marketPrice
            );

            list.add(new CropRecommendationResponse(
                    eval.cropCode(),
                    eval.displayName(),
                    eval.icon(),
                    eval.score(),
                    eval.label(),
                    calc.estimatedProfit(),
                    calc.profitMargin(),
                    eval.riskLevel(),
                    eval.matchedFactors(),
                    eval.warnings(),
                    eval.assumptions()
            ));
        }

        // Sort descending by score
        list.sort((a, b) -> Integer.compare(b.getScore(), a.getScore()));
        return list;
    }

    public ScenarioResponse calculateScenario(ScenarioRequest request) {
        if (request == null || request.getCrop() == null || request.getCrop().trim().isEmpty()) {
            throw new BadRequestException("Crop name is required for scenario simulation.");
        }

        BigDecimal areaAcres = AreaUnitConverter.toAcres(request.getArea(), request.getAreaUnit());

        CropEconomicsCalculator.EconomicCalculation calc = CropEconomicsCalculator.calculateCustomScenario(
                request.getCrop(),
                areaAcres,
                request.getLandRent(),
                request.getLabourCost(),
                request.getSeedCost(),
                request.getFertilizerCost(),
                request.getCropProtectionCost(),
                request.getOtherCost(),
                request.getCustomYield(),
                request.getCustomPrice()
        );

        return new ScenarioResponse(
                request.getCrop().toUpperCase(),
                request.getArea(),
                request.getAreaUnit(),
                areaAcres,
                calc.totalCost(),
                calc.seedCost(),
                calc.fertilizerCost(),
                calc.cropProtectionCost(),
                calc.labourCost(),
                calc.machineryCost(),
                calc.irrigationCost(),
                calc.landLeaseCost(),
                calc.otherCost(),
                calc.estimatedYield(),
                calc.yieldUnit(),
                calc.referencePrice(),
                calc.estimatedRevenue(),
                calc.estimatedProfit(),
                calc.profitMargin(),
                calc.status(),
                calc.assumptions()
        );
    }

    private BigDecimal findLatestMarketPrice(String cropCode) {
        List<MarketPrice> latest = marketPriceRepository.findLatestByCommodity(cropCode, PageRequest.of(0, 1));
        if (!latest.isEmpty()) {
            return latest.get(0).getModalPrice();
        }
        return null;
    }
}
