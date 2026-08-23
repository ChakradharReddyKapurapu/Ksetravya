package com.agrinexus.ai.controller;

import com.agrinexus.ai.dto.*;
import com.agrinexus.ai.service.AgriculturalAIService;
import com.agrinexus.auth.UserPrincipal;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai")
public class AIController {

    private final AgriculturalAIService aiService;

    public AIController(AgriculturalAIService aiService) {
        this.aiService = aiService;
    }

    @PostMapping("/crop-recommendations")
    public ResponseEntity<ApiResponse<CropRecommendationResponse>> getCropRecommendations(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @RequestBody(required = false) CropRecommendationRequest request) {

        validateAuthenticatedUser(userPrincipal);
        CropRecommendationResponse response = aiService.getCropRecommendations(userPrincipal.getUsername(), request);
        return ResponseEntity.ok(ApiResponse.success(response, "Crop recommendations generated successfully"));
    }

    @PostMapping("/fertilizer-guidance")
    public ResponseEntity<ApiResponse<FertilizerGuidanceResponse>> getFertilizerGuidance(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @RequestBody(required = false) FertilizerGuidanceRequest request) {

        validateAuthenticatedUser(userPrincipal);
        FertilizerGuidanceResponse response = aiService.getFertilizerGuidance(userPrincipal.getUsername(), request);
        return ResponseEntity.ok(ApiResponse.success(response, "Fertilizer guidance calculated successfully"));
    }

    @GetMapping("/weather-recommendations")
    public ResponseEntity<ApiResponse<WeatherRecommendationResponse>> getWeatherRecommendations(
            @AuthenticationPrincipal UserPrincipal userPrincipal) {

        validateAuthenticatedUser(userPrincipal);
        WeatherRecommendationResponse response = aiService.getWeatherRecommendations(userPrincipal.getUsername());
        return ResponseEntity.ok(ApiResponse.success(response, "Weather-aware recommendations fetched successfully"));
    }

    @GetMapping("/market-insights")
    public ResponseEntity<ApiResponse<MarketInsightResponse>> getMarketPriceInsights(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @RequestParam(value = "commodity", required = false, defaultValue = "Paddy") String commodity) {

        validateAuthenticatedUser(userPrincipal);
        MarketInsightResponse response = aiService.getMarketPriceInsights(userPrincipal.getUsername(), commodity);
        return ResponseEntity.ok(ApiResponse.success(response, "Market price insights generated successfully"));
    }

    @PostMapping("/profit-loss-estimate")
    public ResponseEntity<ApiResponse<ProfitLossEstimateResponse>> estimateProfitLoss(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @RequestBody(required = false) ProfitLossEstimateRequest request) {

        validateAuthenticatedUser(userPrincipal);
        ProfitLossEstimateResponse response = aiService.estimateProfitLoss(userPrincipal.getUsername(), request);
        return ResponseEntity.ok(ApiResponse.success(response, "Profit & loss estimate calculated successfully"));
    }

    @PostMapping("/crop-comparison")
    public ResponseEntity<ApiResponse<CropComparisonResponse>> compareCrops(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @RequestBody(required = false) CropComparisonRequest request) {

        validateAuthenticatedUser(userPrincipal);
        CropComparisonResponse response = aiService.compareCrops(userPrincipal.getUsername(), request);
        return ResponseEntity.ok(ApiResponse.success(response, "Crop comparison completed successfully"));
    }

    @PostMapping("/farming-plan")
    public ResponseEntity<ApiResponse<FarmingPlanResponse>> generateFarmingPlan(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @RequestBody(required = false) FarmingPlanRequest request) {

        validateAuthenticatedUser(userPrincipal);
        FarmingPlanResponse response = aiService.generateFarmingPlan(userPrincipal.getUsername(), request);
        return ResponseEntity.ok(ApiResponse.success(response, "Structured farming plan generated successfully"));
    }

    @PostMapping("/query")
    public ResponseEntity<ApiResponse<AgriQueryResponse>> answerAgriQuery(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @RequestBody AgriQueryRequest request) {

        validateAuthenticatedUser(userPrincipal);
        AgriQueryResponse response = aiService.answerAgriQuery(userPrincipal.getUsername(), request);
        return ResponseEntity.ok(ApiResponse.success(response, "Agri query processed successfully"));
    }

    @PostMapping("/crop-health")
    public ResponseEntity<ApiResponse<CropHealthAnalysisResponse>> analyzeCropHealth(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @RequestBody(required = false) CropHealthAnalysisRequest request) {

        validateAuthenticatedUser(userPrincipal);
        CropHealthAnalysisResponse response = aiService.analyzeCropHealth(userPrincipal.getUsername(), request);
        return ResponseEntity.ok(ApiResponse.success(response, "Crop health analysis completed successfully"));
    }

    @GetMapping("/personalized-recommendations")
    public ResponseEntity<ApiResponse<PersonalizedDashboardRecommendationResponse>> getPersonalizedRecommendations(
            @AuthenticationPrincipal UserPrincipal userPrincipal) {

        validateAuthenticatedUser(userPrincipal);
        PersonalizedDashboardRecommendationResponse response = aiService.getPersonalizedRecommendations(userPrincipal.getUsername());
        return ResponseEntity.ok(ApiResponse.success(response, "Personalized recommendations retrieved successfully"));
    }

    private void validateAuthenticatedUser(UserPrincipal userPrincipal) {
        if (userPrincipal == null) {
            throw new AccessDeniedException("Unauthenticated user");
        }
    }

    public static class ApiResponse<T> {
        private boolean success;
        private String message;
        private T data;

        public ApiResponse() {
        }

        public ApiResponse(boolean success, String message, T data) {
            this.success = success;
            this.message = message;
            this.data = data;
        }

        public static <T> ApiResponse<T> success(T data, String message) {
            return new ApiResponse<>(true, message, data);
        }

        public boolean isSuccess() { return success; }
        public void setSuccess(boolean success) { this.success = success; }

        public String getMessage() { return message; }
        public void setMessage(String message) { this.message = message; }

        public T getData() { return data; }
        public void setData(T data) { this.data = data; }
    }
}
