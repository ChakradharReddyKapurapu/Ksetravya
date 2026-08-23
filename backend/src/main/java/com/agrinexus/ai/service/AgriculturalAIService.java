package com.agrinexus.ai.service;

import com.agrinexus.ai.dto.*;
import com.agrinexus.ai.provider.AIProvider;
import org.springframework.stereotype.Service;

@Service
public class AgriculturalAIService {

    private final FarmerContextService farmerContextService;
    private final AIProvider aiProvider;
    private final AISafetyValidationService safetyValidationService;

    public AgriculturalAIService(
            FarmerContextService farmerContextService,
            AIProvider aiProvider,
            AISafetyValidationService safetyValidationService) {
        this.farmerContextService = farmerContextService;
        this.aiProvider = aiProvider;
        this.safetyValidationService = safetyValidationService;
    }

    public CropRecommendationResponse getCropRecommendations(String farmerEmail, CropRecommendationRequest request) {
        FarmerContextDto context = farmerContextService.getFarmerContext(farmerEmail);
        CropRecommendationResponse response = aiProvider.getCropRecommendations(context, request);
        return safetyValidationService.validateCropRecommendation(response);
    }

    public FertilizerGuidanceResponse getFertilizerGuidance(String farmerEmail, FertilizerGuidanceRequest request) {
        FarmerContextDto context = farmerContextService.getFarmerContext(farmerEmail);
        FertilizerGuidanceResponse response = aiProvider.getFertilizerGuidance(context, request);
        return safetyValidationService.validateFertilizerGuidance(response);
    }

    public WeatherRecommendationResponse getWeatherRecommendations(String farmerEmail) {
        FarmerContextDto context = farmerContextService.getFarmerContext(farmerEmail);
        return aiProvider.getWeatherRecommendations(context);
    }

    public MarketInsightResponse getMarketPriceInsights(String farmerEmail, String commodity) {
        FarmerContextDto context = farmerContextService.getFarmerContext(farmerEmail);
        return aiProvider.getMarketPriceInsights(context, commodity);
    }

    public ProfitLossEstimateResponse estimateProfitLoss(String farmerEmail, ProfitLossEstimateRequest request) {
        FarmerContextDto context = farmerContextService.getFarmerContext(farmerEmail);
        return aiProvider.estimateProfitLoss(context, request);
    }

    public CropComparisonResponse compareCrops(String farmerEmail, CropComparisonRequest request) {
        FarmerContextDto context = farmerContextService.getFarmerContext(farmerEmail);
        return aiProvider.compareCrops(context, request);
    }

    public FarmingPlanResponse generateFarmingPlan(String farmerEmail, FarmingPlanRequest request) {
        FarmerContextDto context = farmerContextService.getFarmerContext(farmerEmail);
        return aiProvider.generateFarmingPlan(context, request);
    }

    public AgriQueryResponse answerAgriQuery(String farmerEmail, AgriQueryRequest request) {
        FarmerContextDto context = farmerContextService.getFarmerContext(farmerEmail);
        AgriQueryResponse response = aiProvider.answerAgriQuery(context, request);
        return safetyValidationService.validateAgriQuery(response);
    }

    public CropHealthAnalysisResponse analyzeCropHealth(String farmerEmail, CropHealthAnalysisRequest request) {
        FarmerContextDto context = farmerContextService.getFarmerContext(farmerEmail);
        CropHealthAnalysisResponse response = aiProvider.analyzeCropHealth(context, request);
        return safetyValidationService.validateCropHealthAnalysis(response);
    }

    public PersonalizedDashboardRecommendationResponse getPersonalizedRecommendations(String farmerEmail) {
        FarmerContextDto context = farmerContextService.getFarmerContext(farmerEmail);
        return aiProvider.getPersonalizedRecommendations(context);
    }
}
