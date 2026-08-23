package com.agrinexus.ai.provider;

import com.agrinexus.ai.dto.*;

public interface AIProvider {

    CropRecommendationResponse getCropRecommendations(FarmerContextDto context, CropRecommendationRequest request);

    FertilizerGuidanceResponse getFertilizerGuidance(FarmerContextDto context, FertilizerGuidanceRequest request);

    WeatherRecommendationResponse getWeatherRecommendations(FarmerContextDto context);

    MarketInsightResponse getMarketPriceInsights(FarmerContextDto context, String commodity);

    ProfitLossEstimateResponse estimateProfitLoss(FarmerContextDto context, ProfitLossEstimateRequest request);

    CropComparisonResponse compareCrops(FarmerContextDto context, CropComparisonRequest request);

    FarmingPlanResponse generateFarmingPlan(FarmerContextDto context, FarmingPlanRequest request);

    AgriQueryResponse answerAgriQuery(FarmerContextDto context, AgriQueryRequest request);

    CropHealthAnalysisResponse analyzeCropHealth(FarmerContextDto context, CropHealthAnalysisRequest request);

    PersonalizedDashboardRecommendationResponse getPersonalizedRecommendations(FarmerContextDto context);
}
