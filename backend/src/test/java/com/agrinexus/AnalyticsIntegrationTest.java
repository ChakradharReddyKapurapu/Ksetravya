package com.agrinexus;

import com.agrinexus.analytics.dto.ScenarioRequest;
import com.agrinexus.auth.dto.LoginRequest;
import com.agrinexus.auth.dto.RegisterRequest;
import com.agrinexus.farm.entity.Farm;
import com.agrinexus.farm.repository.FarmRepository;
import com.agrinexus.market.dto.MarketPriceCreateRequest;
import com.agrinexus.market.entity.PriceUnit;
import com.agrinexus.market.repository.MarketPriceRepository;
import com.agrinexus.user.User;
import com.agrinexus.user.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@Transactional
class AnalyticsIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private FarmRepository farmRepository;

    @Autowired
    private MarketPriceRepository marketPriceRepository;

    @Autowired
    private ObjectMapper objectMapper;

    private String farmerToken;
    private static final String FARMER_EMAIL = "analytics.farmer@agrinexus.com";
    private static final String PASSWORD = "Password123!";

    @BeforeEach
    void setUp() throws Exception {
        marketPriceRepository.deleteAll();
        farmRepository.deleteAll();
        userRepository.findByEmail(FARMER_EMAIL).ifPresent(userRepository::delete);

        // 1. Register and login farmer
        RegisterRequest farmerReg = new RegisterRequest("Ramanjaneyulu", "Reddy", FARMER_EMAIL, PASSWORD, "9848011999");
        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(farmerReg)))
                .andExpect(status().isCreated());

        LoginRequest login = new LoginRequest(FARMER_EMAIL, PASSWORD);
        MvcResult res = mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(login)))
                .andExpect(status().isOk())
                .andReturn();
        farmerToken = objectMapper.readTree(res.getResponse().getContentAsString()).get("data").get("token").asText();

        // 2. Setup Farm Profile
        User user = userRepository.findByEmail(FARMER_EMAIL).orElseThrow();
        Farm farm = Farm.builder()
                .user(user)
                .farmName("Sri Lakshmi Venkateswara Agro Estates")
                .location("Chandragiri Agricultural Zone")
                .district("Tirupati")
                .state("Andhra Pradesh")
                .area(10.0)
                .areaUnit("Acres")
                .soilType("RED_LOAM")
                .waterAvailability("MEDIUM")
                .irrigationType("BOREWELL")
                .currentCrop("GROUNDNUT")
                .build();
        farmRepository.save(farm);

        // 3. Ingest sample market price
        MarketPriceCreateRequest mpReq = new MarketPriceCreateRequest(
                "GROUNDNUT",
                "Kadiri Bold",
                "Tirupati APMC Market",
                "Tirupati",
                "Andhra Pradesh",
                new BigDecimal("6800.00"),
                new BigDecimal("7600.00"),
                new BigDecimal("7400.00"),
                PriceUnit.PER_QUINTAL,
                LocalDate.now(),
                "APMC Mandi Registry",
                "1,200 Qtl"
        );
        mockMvc.perform(post("/api/market-prices")
                        .header("Authorization", "Bearer " + farmerToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(mpReq)))
                .andExpect(status().isCreated());
    }

    @Test
    @DisplayName("1. Farmer Dashboard, Farm Analytics, and Weather Insights")
    void testDashboardAndFarmAnalytics() throws Exception {
        // Consolidated Farmer Dashboard
        mockMvc.perform(get("/api/analytics/dashboard")
                        .header("Authorization", "Bearer " + farmerToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.farm.farmName").value("Sri Lakshmi Venkateswara Agro Estates"))
                .andExpect(jsonPath("$.data.cropAnalytics").isArray())
                .andExpect(jsonPath("$.data.recommendations").isArray());

        // Farm Analytics Profile
        mockMvc.perform(get("/api/analytics/farm")
                        .header("Authorization", "Bearer " + farmerToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.district").value("Tirupati"))
                .andExpect(jsonPath("$.data.normalizedAreaAcres").value(10.0));

        // Weather Analytics
        mockMvc.perform(get("/api/analytics/weather")
                        .header("Authorization", "Bearer " + farmerToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.temperature").exists());

        // Weather Insights
        mockMvc.perform(get("/api/analytics/weather/insights")
                        .header("Authorization", "Bearer " + farmerToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data").isArray());
    }

    @Test
    @DisplayName("2. Crop Economic Models: Cost Breakdown, Revenue, Profit & Loss, and Crop Comparison")
    void testCropEconomicsAndComparison() throws Exception {
        // Cost Breakdown for Groundnut
        mockMvc.perform(get("/api/analytics/crops/GROUNDNUT/cost")
                        .header("Authorization", "Bearer " + farmerToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.crop").value("GROUNDNUT"))
                .andExpect(jsonPath("$.data.seedCost").exists())
                .andExpect(jsonPath("$.data.totalCost").exists());

        // Revenue for Groundnut
        mockMvc.perform(get("/api/analytics/crops/GROUNDNUT/revenue")
                        .header("Authorization", "Bearer " + farmerToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.estimatedYield").exists())
                .andExpect(jsonPath("$.data.estimatedRevenue").exists());

        // Profit for Groundnut
        mockMvc.perform(get("/api/analytics/crops/GROUNDNUT/profit")
                        .header("Authorization", "Bearer " + farmerToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.status").value("ESTIMATED_PROFIT"))
                .andExpect(jsonPath("$.data.profitMargin").exists());

        // Crop Comparison (Groundnut vs Cotton vs Rice)
        mockMvc.perform(get("/api/analytics/crops/compare")
                        .header("Authorization", "Bearer " + farmerToken)
                        .param("crop1", "GROUNDNUT")
                        .param("crop2", "COTTON")
                        .param("crop3", "RICE"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.length()").value(3))
                .andExpect(jsonPath("$.data[0].crop").value("GROUNDNUT"))
                .andExpect(jsonPath("$.data[1].crop").value("COTTON"))
                .andExpect(jsonPath("$.data[2].crop").value("RICE"));

        // Profitability Ranking
        mockMvc.perform(get("/api/analytics/profitability"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data").isArray())
                .andExpect(jsonPath("$.data.length()").value(6));
    }

    @Test
    @DisplayName("3. Rule-Based Crop Recommendations with Explainable Suitability Scores")
    void testCropRecommendations() throws Exception {
        mockMvc.perform(get("/api/analytics/crop-recommendations")
                        .header("Authorization", "Bearer " + farmerToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data").isArray())
                .andExpect(jsonPath("$.data[0].score").isNumber())
                .andExpect(jsonPath("$.data[0].matchedFactors").isArray())
                .andExpect(jsonPath("$.data[0].assumptions").isArray())
                .andExpect(jsonPath("$.data[0].riskLevel").exists());
    }

    @Test
    @DisplayName("4. Temporary Scenario Simulator: Cost & Profit Calculations Without Database Mutation")
    void testScenarioSimulator() throws Exception {
        ScenarioRequest req = new ScenarioRequest(
                "CHILLI",
                new BigDecimal("5.0"),
                "ACRE",
                new BigDecimal("25000.00"),
                new BigDecimal("40000.00"),
                new BigDecimal("12000.00"),
                new BigDecimal("18000.00"),
                new BigDecimal("15000.00"),
                new BigDecimal("5000.00"),
                new BigDecimal("110.00"), // 110 Quintals total
                new BigDecimal("21000.00") // ₹21,000 / Qtl
        );

        mockMvc.perform(post("/api/analytics/scenario")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.crop").value("CHILLI"))
                .andExpect(jsonPath("$.data.status").value("ESTIMATED_PROFIT"))
                .andExpect(jsonPath("$.data.totalCost").exists())
                .andExpect(jsonPath("$.data.estimatedRevenue").exists())
                .andExpect(jsonPath("$.data.estimatedProfit").exists())
                .andExpect(jsonPath("$.data.assumptions").isArray());

        // Verify Market Analytics Endpoint
        mockMvc.perform(get("/api/analytics/market/GROUNDNUT"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.commodity").value("GROUNDNUT"))
                .andExpect(jsonPath("$.data.dataAvailable").value(true));

        // Verify Market Trend Endpoint
        mockMvc.perform(get("/api/analytics/market/GROUNDNUT/trend")
                        .param("period", "90D"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.commodity").value("GROUNDNUT"))
                .andExpect(jsonPath("$.data.period").value("90D"));
    }
}
