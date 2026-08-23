package com.agrinexus;

import com.agrinexus.ai.controller.AIController;
import com.agrinexus.ai.dto.*;
import com.agrinexus.ai.service.AgriculturalAIService;
import com.agrinexus.auth.UserPrincipal;
import com.agrinexus.farm.entity.Farm;
import com.agrinexus.farm.repository.FarmRepository;
import com.agrinexus.user.Role;
import com.agrinexus.user.User;
import com.agrinexus.user.UserRepository;
import com.agrinexus.user.UserStatus;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.math.BigDecimal;
import java.util.Arrays;

@SpringBootTest
public class AIAgriculturalIntelligenceIntegrationTest {

    @Autowired
    private AgriculturalAIService aiService;

    @Autowired
    private AIController aiController;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private FarmRepository farmRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    private User farmerUser;

    @BeforeEach
    void setUp() {
        farmerUser = userRepository.findByEmail("ai.farmer@agrinexus.com").orElseGet(() -> {
            User u = User.builder()
                    .firstName("Venkatesh")
                    .lastName("Farmer")
                    .email("ai.farmer@agrinexus.com")
                    .password(passwordEncoder.encode("Password123!"))
                    .phone("9848099111")
                    .role(Role.FARMER)
                    .enabled(true)
                    .build();
            u.setStatus(UserStatus.ACTIVE);
            return userRepository.save(u);
        });

        if (farmRepository.findByUserId(farmerUser.getId()).isEmpty()) {
            Farm farm = new Farm();
            farm.setUser(farmerUser);
            farm.setFarmName("Venkatesh Model Farm");
            farm.setLocation("Tenali");
            farm.setDistrict("Guntur");
            farm.setState("Andhra Pradesh");
            farm.setSoilType("Clay Loam");
            farm.setArea(3.5);
            farm.setCurrentCrop("Paddy");
            farmRepository.save(farm);
        }
    }

    @Test
    @DisplayName("Test AI Crop Recommendations")
    void testCropRecommendations() {
        UserPrincipal principal = UserPrincipal.create(farmerUser);
        CropRecommendationRequest req = new CropRecommendationRequest("Black Cotton", "Kharif", new BigDecimal("4.0"), "IRRIGATED", "LOCAL_MANDI");

        ResponseEntity<AIController.ApiResponse<CropRecommendationResponse>> res = aiController.getCropRecommendations(principal, req);

        Assertions.assertEquals(200, res.getStatusCode().value());
        Assertions.assertNotNull(res.getBody());
        Assertions.assertTrue(res.getBody().isSuccess());

        CropRecommendationResponse data = res.getBody().getData();
        Assertions.assertEquals("Cotton", data.getPrimaryRecommendedCrop());
        Assertions.assertNotNull(data.getConfidenceScorePercentage());
        Assertions.assertNotNull(data.getSafetyNotice());
    }

    @Test
    @DisplayName("Test AI Fertilizer Guidance")
    void testFertilizerGuidance() {
        UserPrincipal principal = UserPrincipal.create(farmerUser);
        FertilizerGuidanceRequest req = new FertilizerGuidanceRequest("Paddy", "TILLERING", new BigDecimal("2.5"), 120.0, 60.0, 60.0, "Clay Loam");

        ResponseEntity<AIController.ApiResponse<FertilizerGuidanceResponse>> res = aiController.getFertilizerGuidance(principal, req);

        Assertions.assertEquals(200, res.getStatusCode().value());
        FertilizerGuidanceResponse data = res.getBody().getData();
        Assertions.assertEquals("Paddy", data.getCropName());
        Assertions.assertEquals("TILLERING", data.getGrowthStage());
        Assertions.assertFalse(data.getDosages().isEmpty());
    }

    @Test
    @DisplayName("Test Weather-Aware AI Recommendations")
    void testWeatherRecommendations() {
        UserPrincipal principal = UserPrincipal.create(farmerUser);
        ResponseEntity<AIController.ApiResponse<WeatherRecommendationResponse>> res = aiController.getWeatherRecommendations(principal);

        Assertions.assertEquals(200, res.getStatusCode().value());
        WeatherRecommendationResponse data = res.getBody().getData();
        Assertions.assertNotNull(data.getLocation());
        Assertions.assertFalse(data.getImmediateActionItems().isEmpty());
    }

    @Test
    @DisplayName("Test Market Price Insights")
    void testMarketPriceInsights() {
        UserPrincipal principal = UserPrincipal.create(farmerUser);
        ResponseEntity<AIController.ApiResponse<MarketInsightResponse>> res = aiController.getMarketPriceInsights(principal, "Chilli");

        Assertions.assertEquals(200, res.getStatusCode().value());
        MarketInsightResponse data = res.getBody().getData();
        Assertions.assertEquals("Chilli", data.getCommodity());
        Assertions.assertFalse(data.getTopMandis().isEmpty());
    }

    @Test
    @DisplayName("Test Profit/Loss Financial Estimate")
    void testProfitLossEstimation() {
        UserPrincipal principal = UserPrincipal.create(farmerUser);
        ProfitLossEstimateRequest req = new ProfitLossEstimateRequest("Paddy", new BigDecimal("2.0"), new BigDecimal("48.0"), new BigDecimal("2300.00"));

        ResponseEntity<AIController.ApiResponse<ProfitLossEstimateResponse>> res = aiController.estimateProfitLoss(principal, req);

        Assertions.assertEquals(200, res.getStatusCode().value());
        ProfitLossEstimateResponse data = res.getBody().getData();
        Assertions.assertTrue(data.getGrossRevenue().compareTo(BigDecimal.ZERO) > 0);
        Assertions.assertTrue(data.getNetProfit().compareTo(BigDecimal.ZERO) > 0);
    }

    @Test
    @DisplayName("Test Multi-Crop Side-by-Side Comparison")
    void testCropComparison() {
        UserPrincipal principal = UserPrincipal.create(farmerUser);
        CropComparisonRequest req = new CropComparisonRequest(Arrays.asList("Paddy", "Cotton", "Maize"), 3.0);

        ResponseEntity<AIController.ApiResponse<CropComparisonResponse>> res = aiController.compareCrops(principal, req);

        Assertions.assertEquals(200, res.getStatusCode().value());
        CropComparisonResponse data = res.getBody().getData();
        Assertions.assertEquals(3, data.getComparisonItems().size());
        Assertions.assertNotNull(data.getWinnerCrop());
    }

    @Test
    @DisplayName("Test 7-Stage Farming Plan Generation")
    void testFarmingPlanGeneration() {
        UserPrincipal principal = UserPrincipal.create(farmerUser);
        FarmingPlanRequest req = new FarmingPlanRequest("Paddy", new BigDecimal("3.0"), "June", "Tenali");

        ResponseEntity<AIController.ApiResponse<FarmingPlanResponse>> res = aiController.generateFarmingPlan(principal, req);

        Assertions.assertEquals(200, res.getStatusCode().value());
        FarmingPlanResponse data = res.getBody().getData();
        Assertions.assertEquals(7, data.getStages().size());
    }

    @Test
    @DisplayName("Test Agri Q&A Decision Support")
    void testAgriQueryAnswer() {
        UserPrincipal principal = UserPrincipal.create(farmerUser);
        AgriQueryRequest req = new AgriQueryRequest("How to control stem borer in Paddy?", "Paddy", "PEST_CONTROL");

        ResponseEntity<AIController.ApiResponse<AgriQueryResponse>> res = aiController.answerAgriQuery(principal, req);

        Assertions.assertEquals(200, res.getStatusCode().value());
        AgriQueryResponse data = res.getBody().getData();
        Assertions.assertNotNull(data.getAnswer());
        Assertions.assertFalse(data.getKeyActionSteps().isEmpty());
    }

    @Test
    @DisplayName("Test Crop Health Analysis & Disease Diagnosis")
    void testCropHealthAnalysis() {
        UserPrincipal principal = UserPrincipal.create(farmerUser);
        CropHealthAnalysisRequest req = new CropHealthAnalysisRequest("Paddy", "Spindle shaped brown spots on leaves", null);

        ResponseEntity<AIController.ApiResponse<CropHealthAnalysisResponse>> res = aiController.analyzeCropHealth(principal, req);

        Assertions.assertEquals(200, res.getStatusCode().value());
        CropHealthAnalysisResponse data = res.getBody().getData();
        Assertions.assertTrue(data.getDiagnosedCondition().contains("Blast"));
        Assertions.assertFalse(data.getOrganicTreatments().isEmpty());
    }

    @Test
    @DisplayName("Test Personalized Farmer Dashboard Feed")
    void testPersonalizedDashboardRecommendations() {
        UserPrincipal principal = UserPrincipal.create(farmerUser);
        ResponseEntity<AIController.ApiResponse<PersonalizedDashboardRecommendationResponse>> res = aiController.getPersonalizedRecommendations(principal);

        Assertions.assertEquals(200, res.getStatusCode().value());
        PersonalizedDashboardRecommendationResponse data = res.getBody().getData();
        Assertions.assertNotNull(data.getFarmerName());
        Assertions.assertFalse(data.getUrgentActions().isEmpty());
    }
}
