package com.agrinexus;

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
class WeatherAndMarketIntegrationTest {

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
    private static final String FARMER_EMAIL = "weather.farmer@agrinexus.com";
    private static final String PASSWORD = "Password123!";

    @BeforeEach
    void setUp() throws Exception {
        marketPriceRepository.deleteAll();
        farmRepository.deleteAll();
        userRepository.findByEmail(FARMER_EMAIL).ifPresent(userRepository::delete);

        // Register and login farmer
        RegisterRequest farmerReg = new RegisterRequest("Venkatesh", "Reddy", FARMER_EMAIL, PASSWORD, "9848099888");
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

        // Create Farm for the farmer
        User user = userRepository.findByEmail(FARMER_EMAIL).orElseThrow();
        Farm farm = Farm.builder()
                .user(user)
                .farmName("Reddy Agro Farms")
                .location("Chandragiri / Tirupati Mandal")
                .district("Tirupati")
                .state("Andhra Pradesh")
                .area(15.0)
                .soilType("RED_LOAM")
                .irrigationType("BOREWELL")
                .currentCrop("GROUNDNUT")
                .build();
        farmRepository.save(farm);
    }

    private void createSampleMarketPrice(String commodity, String variety, String market, String district, String state, BigDecimal minPrice, BigDecimal maxPrice, BigDecimal modalPrice, LocalDate date) throws Exception {
        MarketPriceCreateRequest req = new MarketPriceCreateRequest(
                commodity,
                variety,
                market,
                district,
                state,
                minPrice,
                maxPrice,
                modalPrice,
                PriceUnit.PER_QUINTAL,
                date,
                "APMC Mandi Yard Official Record",
                "1,500 Quintals"
        );

        mockMvc.perform(post("/api/market-prices")
                        .header("Authorization", "Bearer " + farmerToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isCreated());
    }

    @Test
    @DisplayName("1. Weather APIs: Current, Location, Forecast, and Farm Context Weather")
    void testWeatherEndpoints() throws Exception {
        // Current weather by coordinates
        mockMvc.perform(get("/api/weather/current")
                        .param("latitude", "13.6288")
                        .param("longitude", "79.4192")
                        .param("location", "Tirupati Farmlands"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.available").value(true))
                .andExpect(jsonPath("$.data.temperature").exists());

        // Location weather
        mockMvc.perform(get("/api/weather/current/location")
                        .param("district", "Guntur")
                        .param("state", "Andhra Pradesh"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.district").value("Guntur"));

        // Daily Forecast
        mockMvc.perform(get("/api/weather/forecast")
                        .param("latitude", "16.3067")
                        .param("longitude", "80.4365")
                        .param("days", "5"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.forecasts.length()").value(5));

        // Farm Weather (Context derived from authenticated user's farm in Tirupati)
        mockMvc.perform(get("/api/weather/farm")
                        .header("Authorization", "Bearer " + farmerToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.district").value("Tirupati"));

        // Farm Forecast
        mockMvc.perform(get("/api/weather/farm/forecast")
                        .header("Authorization", "Bearer " + farmerToken)
                        .param("days", "7"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.forecasts.length()").value(7));
    }

    @Test
    @DisplayName("2. Market Prices: Ingestion, Catalog, Filter, and Search")
    void testMarketPricesCatalogAndSearch() throws Exception {
        LocalDate today = LocalDate.now();
        createSampleMarketPrice("GROUNDNUT", "Dharani (Kadiri-6)", "Tirupati APMC Market", "Tirupati", "Andhra Pradesh", new BigDecimal("6800.00"), new BigDecimal("7400.00"), new BigDecimal("7200.00"), today);
        createSampleMarketPrice("GROUNDNUT", "JL-24", "Anantapur Groundnut Yard", "Anantapur", "Andhra Pradesh", new BigDecimal("6500.00"), new BigDecimal("7100.00"), new BigDecimal("6900.00"), today);
        createSampleMarketPrice("CHILLI", "Teja Export Grade", "Guntur Chilli Yard", "Guntur", "Andhra Pradesh", new BigDecimal("18000.00"), new BigDecimal("22500.00"), new BigDecimal("21000.00"), today);
        createSampleMarketPrice("RICE", "Sona Masoori", "Nellore Grain Mandi", "SPSR Nellore", "Andhra Pradesh", new BigDecimal("3800.00"), new BigDecimal("4400.00"), new BigDecimal("4200.00"), today);

        // Catalog
        mockMvc.perform(get("/api/market-prices")
                        .param("page", "0")
                        .param("size", "10"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.totalElements").value(4));

        // Filter by commodity
        mockMvc.perform(get("/api/market-prices")
                        .param("commodity", "GROUNDNUT"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.totalElements").value(2));

        // Filter by district
        mockMvc.perform(get("/api/market-prices")
                        .param("district", "Guntur"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.totalElements").value(1))
                .andExpect(jsonPath("$.data.content[0].commodity").value("CHILLI"));

        // Search
        mockMvc.perform(get("/api/market-prices/search")
                        .param("query", "Teja"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.content[0].variety").value("Teja Export Grade"));

        // Crop endpoint
        mockMvc.perform(get("/api/market-prices/crop/GROUNDNUT"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.length()").value(2));

        // Location endpoint
        mockMvc.perform(get("/api/market-prices/location")
                        .param("district", "Tirupati"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.length()").value(1));
    }

    @Test
    @DisplayName("3. Historical Trends, Date Range Validation, and Cross-Market Comparison")
    void testTrendsAndComparison() throws Exception {
        LocalDate d1 = LocalDate.now().minusDays(60);
        LocalDate d2 = LocalDate.now().minusDays(30);
        LocalDate d3 = LocalDate.now();

        createSampleMarketPrice("GROUNDNUT", "Dharani", "Tirupati APMC Market", "Tirupati", "Andhra Pradesh", new BigDecimal("6200.00"), new BigDecimal("6800.00"), new BigDecimal("6500.00"), d1);
        createSampleMarketPrice("GROUNDNUT", "Dharani", "Tirupati APMC Market", "Tirupati", "Andhra Pradesh", new BigDecimal("6600.00"), new BigDecimal("7200.00"), new BigDecimal("7000.00"), d2);
        createSampleMarketPrice("GROUNDNUT", "Dharani", "Tirupati APMC Market", "Tirupati", "Andhra Pradesh", new BigDecimal("7000.00"), new BigDecimal("7600.00"), new BigDecimal("7400.00"), d3);

        // Historical Prices
        mockMvc.perform(get("/api/market-prices/history")
                        .param("commodity", "GROUNDNUT")
                        .param("from", d1.toString())
                        .param("to", d3.toString()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.length()").value(3));

        // Invalid Date Range -> 400 Bad Request
        mockMvc.perform(get("/api/market-prices/history")
                        .param("commodity", "GROUNDNUT")
                        .param("from", d3.toString())
                        .param("to", d1.toString()))
                .andExpect(status().isBadRequest());

        // Trend Analysis (6500 to 7400 = +13.85% change)
        mockMvc.perform(get("/api/market-prices/trend")
                        .param("commodity", "GROUNDNUT")
                        .param("market", "Tirupati APMC Market")
                        .param("period", "90D"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.startPrice").value(6500.00))
                .andExpect(jsonPath("$.data.endPrice").value(7400.00))
                .andExpect(jsonPath("$.data.trendDirection").value("up"))
                .andExpect(jsonPath("$.data.percentageChange").value(13.85));

        // Cross-Market Comparison for GROUNDNUT
        createSampleMarketPrice("GROUNDNUT", "JL-24", "Anantapur Groundnut Yard", "Anantapur", "Andhra Pradesh", new BigDecimal("6400.00"), new BigDecimal("7000.00"), new BigDecimal("6800.00"), d3);
        createSampleMarketPrice("GROUNDNUT", "Dharani", "Kurnool Agricultural Market", "Kurnool", "Andhra Pradesh", new BigDecimal("7100.00"), new BigDecimal("7800.00"), new BigDecimal("7500.00"), d3);

        mockMvc.perform(get("/api/market-prices/compare")
                        .param("commodity", "GROUNDNUT"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.markets.length()").value(3))
                .andExpect(jsonPath("$.data.lowestPriceMarket").value("Anantapur Groundnut Yard"))
                .andExpect(jsonPath("$.data.highestPriceMarket").value("Kurnool Agricultural Market"));

        // Summary
        mockMvc.perform(get("/api/market-prices/summary"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data[0].commodity").value("GROUNDNUT"));

        // Farm Market Prices (Farm has currentCrop="GROUNDNUT")
        mockMvc.perform(get("/api/market-prices/farm")
                        .header("Authorization", "Bearer " + farmerToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data[0].commodity").value("GROUNDNUT"));
    }
}
