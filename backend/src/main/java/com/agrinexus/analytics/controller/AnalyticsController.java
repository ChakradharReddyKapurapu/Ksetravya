package com.agrinexus.analytics.controller;

import com.agrinexus.analytics.dto.*;
import com.agrinexus.analytics.service.AnalyticsService;
import com.agrinexus.auth.UserPrincipal;
import com.agrinexus.common.ApiResponse;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/analytics")
public class AnalyticsController {

    private final AnalyticsService analyticsService;

    public AnalyticsController(AnalyticsService analyticsService) {
        this.analyticsService = analyticsService;
    }

    @GetMapping("/dashboard")
    public ResponseEntity<ApiResponse<FarmerDashboardResponse>> getFarmerDashboard(
            @AuthenticationPrincipal UserPrincipal userPrincipal) {

        FarmerDashboardResponse response = analyticsService.getFarmerDashboard(userPrincipal.getUsername());
        return ResponseEntity.ok(ApiResponse.success("Farmer dashboard analytics compiled successfully", response));
    }

    @GetMapping("/farm")
    public ResponseEntity<ApiResponse<FarmAnalyticsResponse>> getFarmAnalytics(
            @AuthenticationPrincipal UserPrincipal userPrincipal) {

        FarmAnalyticsResponse response = analyticsService.getFarmAnalytics(userPrincipal.getUsername());
        return ResponseEntity.ok(ApiResponse.success("Farm analytics profile retrieved", response));
    }

    @GetMapping("/crops")
    public ResponseEntity<ApiResponse<List<CropAnalyticsResponse>>> getCropAnalytics(
            @AuthenticationPrincipal UserPrincipal userPrincipal) {

        String email = userPrincipal != null ? userPrincipal.getUsername() : null;
        List<CropAnalyticsResponse> response = analyticsService.getCropAnalyticsList(email);
        return ResponseEntity.ok(ApiResponse.success("Crop economic analytics retrieved", response));
    }

    @GetMapping("/crops/compare")
    public ResponseEntity<ApiResponse<List<CropComparisonResponse>>> compareCrops(
            @RequestParam String crop1,
            @RequestParam(required = false) String crop2,
            @RequestParam(required = false) String crop3,
            @RequestParam(required = false) String crop4,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {

        String email = userPrincipal != null ? userPrincipal.getUsername() : null;
        List<CropComparisonResponse> response = analyticsService.compareCrops(crop1, crop2, crop3, crop4, email);
        return ResponseEntity.ok(ApiResponse.success("Crop economic comparison compiled", response));
    }

    @GetMapping("/crops/{crop}/cost")
    public ResponseEntity<ApiResponse<CropCostResponse>> getCropCostBreakdown(
            @PathVariable String crop,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {

        String email = userPrincipal != null ? userPrincipal.getUsername() : null;
        CropCostResponse response = analyticsService.getCropCostBreakdown(crop, email);
        return ResponseEntity.ok(ApiResponse.success("Crop cost breakdown calculated", response));
    }

    @GetMapping("/crops/{crop}/revenue")
    public ResponseEntity<ApiResponse<CropRevenueResponse>> getCropRevenueEstimation(
            @PathVariable String crop,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {

        String email = userPrincipal != null ? userPrincipal.getUsername() : null;
        CropRevenueResponse response = analyticsService.getCropRevenueEstimation(crop, email);
        return ResponseEntity.ok(ApiResponse.success("Crop revenue estimation calculated", response));
    }

    @GetMapping("/crops/{crop}/profit")
    public ResponseEntity<ApiResponse<CropProfitResponse>> getCropProfitLoss(
            @PathVariable String crop,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {

        String email = userPrincipal != null ? userPrincipal.getUsername() : null;
        CropProfitResponse response = analyticsService.getCropProfitLoss(crop, email);
        return ResponseEntity.ok(ApiResponse.success("Crop profit and loss projection calculated", response));
    }

    @GetMapping("/profitability")
    public ResponseEntity<ApiResponse<List<CropAnalyticsResponse>>> getProfitabilityRanking(
            @RequestParam(required = false) List<String> crops,
            @RequestParam(required = false) String district,
            @RequestParam(required = false) BigDecimal area) {

        List<CropAnalyticsResponse> response = analyticsService.getProfitabilityRanking(crops, district, area);
        return ResponseEntity.ok(ApiResponse.success("Crop profitability rankings compiled", response));
    }

    @GetMapping("/market/{crop}")
    public ResponseEntity<ApiResponse<MarketAnalyticsResponse>> getMarketAnalytics(
            @PathVariable String crop) {

        MarketAnalyticsResponse response = analyticsService.getMarketAnalytics(crop);
        return ResponseEntity.ok(ApiResponse.success("Mandi market analytics compiled", response));
    }

    @GetMapping("/market/{crop}/trend")
    public ResponseEntity<ApiResponse<com.agrinexus.market.dto.MarketPriceTrendResponse>> getMarketPriceTrend(
            @PathVariable String crop,
            @RequestParam(required = false) String market,
            @RequestParam(required = false) String period) {

        com.agrinexus.market.dto.MarketPriceTrendResponse response = analyticsService.getMarketPriceTrend(crop, market, period);
        return ResponseEntity.ok(ApiResponse.success("Mandi market price trend compiled", response));
    }

    @GetMapping("/weather")
    public ResponseEntity<ApiResponse<WeatherAnalyticsResponse>> getWeatherAnalytics(
            @AuthenticationPrincipal UserPrincipal userPrincipal) {

        WeatherAnalyticsResponse response = analyticsService.getWeatherAnalytics(userPrincipal.getUsername());
        return ResponseEntity.ok(ApiResponse.success("Farm weather analytics compiled", response));
    }

    @GetMapping("/weather/insights")
    public ResponseEntity<ApiResponse<List<WeatherInsightResponse>>> getWeatherInsights(
            @AuthenticationPrincipal UserPrincipal userPrincipal) {

        List<WeatherInsightResponse> response = analyticsService.getWeatherInsights(userPrincipal.getUsername());
        return ResponseEntity.ok(ApiResponse.success("Weather advisory insights compiled", response));
    }

    @GetMapping("/crop-recommendations")
    public ResponseEntity<ApiResponse<List<CropRecommendationResponse>>> getCropRecommendations(
            @AuthenticationPrincipal UserPrincipal userPrincipal) {

        List<CropRecommendationResponse> response = analyticsService.getCropRecommendations(userPrincipal.getUsername());
        return ResponseEntity.ok(ApiResponse.success("Rule-based crop recommendations compiled", response));
    }

    @PostMapping("/scenario")
    public ResponseEntity<ApiResponse<ScenarioResponse>> calculateScenario(
            @Valid @RequestBody ScenarioRequest request) {

        ScenarioResponse response = analyticsService.calculateScenario(request);
        return ResponseEntity.ok(ApiResponse.success("Scenario economic simulation calculated", response));
    }
}
