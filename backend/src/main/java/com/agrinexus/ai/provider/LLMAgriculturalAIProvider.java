package com.agrinexus.ai.provider;

import com.agrinexus.ai.dto.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

@Service
@Primary
public class LLMAgriculturalAIProvider implements AIProvider {

    private static final Logger log = LoggerFactory.getLogger(LLMAgriculturalAIProvider.class);

    private final AIProvider fallbackProvider;

    @Value("${agrinexus.ai.llm.enabled:false}")
    private boolean llmEnabled;

    @Value("${agrinexus.ai.llm.api-key:}")
    private String apiKey;

    public LLMAgriculturalAIProvider(@Qualifier("ruleBasedAIProvider") AIProvider fallbackProvider) {
        this.fallbackProvider = fallbackProvider;
    }

    @Override
    public CropRecommendationResponse getCropRecommendations(FarmerContextDto context, CropRecommendationRequest request) {
        if (shouldUseLLM()) {
            try {
                log.info("Executing LLM Crop Recommendation for farmer {}", context.getFarmerName());
                // Future external LLM API call integration point
            } catch (Exception e) {
                log.warn("LLM API execution failed, falling back to RuleBasedAIProvider", e);
            }
        }
        return fallbackProvider.getCropRecommendations(context, request);
    }

    @Override
    public FertilizerGuidanceResponse getFertilizerGuidance(FarmerContextDto context, FertilizerGuidanceRequest request) {
        if (shouldUseLLM()) {
            try {
                log.info("Executing LLM Fertilizer Guidance for farmer {}", context.getFarmerName());
            } catch (Exception e) {
                log.warn("LLM API execution failed, falling back to RuleBasedAIProvider", e);
            }
        }
        return fallbackProvider.getFertilizerGuidance(context, request);
    }

    @Override
    public WeatherRecommendationResponse getWeatherRecommendations(FarmerContextDto context) {
        return fallbackProvider.getWeatherRecommendations(context);
    }

    @Override
    public MarketInsightResponse getMarketPriceInsights(FarmerContextDto context, String commodity) {
        return fallbackProvider.getMarketPriceInsights(context, commodity);
    }

    @Override
    public ProfitLossEstimateResponse estimateProfitLoss(FarmerContextDto context, ProfitLossEstimateRequest request) {
        return fallbackProvider.estimateProfitLoss(context, request);
    }

    @Override
    public CropComparisonResponse compareCrops(FarmerContextDto context, CropComparisonRequest request) {
        return fallbackProvider.compareCrops(context, request);
    }

    @Override
    public FarmingPlanResponse generateFarmingPlan(FarmerContextDto context, FarmingPlanRequest request) {
        return fallbackProvider.generateFarmingPlan(context, request);
    }

    @Override
    public AgriQueryResponse answerAgriQuery(FarmerContextDto context, AgriQueryRequest request) {
        if (shouldUseLLM()) {
            try {
                log.info("Executing LLM Agri Query for: {}", request.getQuery());
            } catch (Exception e) {
                log.warn("LLM API query failed, falling back to RuleBasedAIProvider", e);
            }
        }
        return fallbackProvider.answerAgriQuery(context, request);
    }

    @Override
    public CropHealthAnalysisResponse analyzeCropHealth(FarmerContextDto context, CropHealthAnalysisRequest request) {
        return fallbackProvider.analyzeCropHealth(context, request);
    }

    @Override
    public PersonalizedDashboardRecommendationResponse getPersonalizedRecommendations(FarmerContextDto context) {
        return fallbackProvider.getPersonalizedRecommendations(context);
    }

    private boolean shouldUseLLM() {
        return llmEnabled && apiKey != null && !apiKey.trim().isEmpty();
    }
}
