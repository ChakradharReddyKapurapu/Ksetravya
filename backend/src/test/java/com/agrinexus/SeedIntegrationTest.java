package com.agrinexus;

import com.agrinexus.auth.dto.LoginRequest;
import com.agrinexus.auth.dto.RegisterRequest;
import com.agrinexus.farm.dto.FarmCreateRequest;
import com.agrinexus.seeds.dto.SeedCreateRequest;
import com.agrinexus.seeds.dto.SeedUpdateRequest;
import com.agrinexus.seeds.entity.*;
import com.agrinexus.seeds.repository.SeedRepository;
import com.agrinexus.user.UserRepository;
import com.fasterxml.jackson.databind.JsonNode;
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
import java.util.Set;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@Transactional
class SeedIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SeedRepository seedRepository;

    @Autowired
    private com.agrinexus.farm.repository.FarmRepository farmRepository;

    @Autowired
    private ObjectMapper objectMapper;

    private String supplierToken;
    private String farmerToken;
    private Long supplierId;

    private static final String SUPPLIER_EMAIL = "seed.supplier@example.com";
    private static final String FARMER_EMAIL = "seed.farmer@example.com";
    private static final String PASSWORD = "Password123!";

    @BeforeEach
    void setUp() throws Exception {
        seedRepository.deleteAll();
        userRepository.findByEmail(SUPPLIER_EMAIL).ifPresent(userRepository::delete);
        userRepository.findByEmail(FARMER_EMAIL).ifPresent(user -> {
            farmRepository.findByUserId(user.getId()).ifPresent(farmRepository::delete);
            userRepository.delete(user);
        });

        // Register Supplier
        RegisterRequest supReg = new RegisterRequest("Andhra", "Seeds Hub", SUPPLIER_EMAIL, PASSWORD, "9848011223");
        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(supReg)))
                .andExpect(status().isCreated());

        LoginRequest supLogin = new LoginRequest(SUPPLIER_EMAIL, PASSWORD);
        MvcResult supRes = mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(supLogin)))
                .andExpect(status().isOk())
                .andReturn();
        JsonNode supJson = objectMapper.readTree(supRes.getResponse().getContentAsString()).get("data");
        supplierToken = supJson.get("token").asText();
        supplierId = supJson.get("user").get("id").asLong();

        // Register Farmer & Setup Farm Context
        RegisterRequest farmerReg = new RegisterRequest("Chakradhar", "Reddy", FARMER_EMAIL, PASSWORD, "9848099887");
        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(farmerReg)))
                .andExpect(status().isCreated());

        LoginRequest farmerLogin = new LoginRequest(FARMER_EMAIL, PASSWORD);
        MvcResult farmerRes = mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(farmerLogin)))
                .andExpect(status().isOk())
                .andReturn();
        farmerToken = objectMapper.readTree(farmerRes.getResponse().getContentAsString()).get("data").get("token").asText();

        // Create Farm Context for farmer
        FarmCreateRequest farmReq = new FarmCreateRequest(
                "Reddy Agro Fields",
                "Guntur Rural",
                "Guntur",
                "Andhra Pradesh",
                "522020",
                5.0,
                "Acres",
                "Black Cotton Soil",
                "Borewell + Krishna Canal",
                "Drip Irrigation",
                "Groundnut",
                "Kharif"
        );

        mockMvc.perform(post("/api/farms")
                        .header("Authorization", "Bearer " + farmerToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(farmReq)))
                .andExpect(status().isCreated());
    }

    private Long createSampleSeed(String name, CropType crop, String variety, SeasonType season, Set<SoilType> soils, BigDecimal price) throws Exception {
        SeedCreateRequest request = new SeedCreateRequest(
                name,
                "Certified high yielding seed variety with excellent drought tolerance and seed vigor.",
                crop,
                SeedCategory.OILSEEDS,
                variety,
                "APSSDC Certified",
                SeedType.CERTIFIED,
                season,
                110,
                "105-115 Days",
                soils,
                Set.of("Andhra Pradesh", "Telangana", "Karnataka"),
                WaterRequirement.MEDIUM,
                "2-3 protective irrigations at pod development",
                "25-30 Quintals/Hectare",
                "94%",
                "Tolerant to leaf spot and rust",
                price,
                "KG",
                "30 KG Bag",
                200,
                SeedAvailabilityStatus.AVAILABLE,
                "https://images.unsplash.com/photo-groundnut-seed"
        );

        MvcResult result = mockMvc.perform(post("/api/seeds")
                        .header("Authorization", "Bearer " + supplierToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.success").value(true))
                .andReturn();

        return objectMapper.readTree(result.getResponse().getContentAsString()).get("data").get("id").asLong();
    }

    @Test
    @DisplayName("1. Create Seed Listing with Agronomic Metadata and Verify Response")
    void testCreateSeed() throws Exception {
        SeedCreateRequest request = new SeedCreateRequest(
                "BPT 5204 Samba Mahsuri Rice Seed",
                "Premium fine grain paddy seed with superior cooking quality and blast tolerance.",
                CropType.RICE,
                SeedCategory.CEREALS,
                "BPT 5204 (Samba Mahsuri)",
                "APSSDC Foundation",
                SeedType.CERTIFIED,
                SeasonType.KHARIF,
                145,
                "140-150 Days",
                Set.of(SoilType.BLACK, SoilType.ALLUVIAL, SoilType.CLAY),
                Set.of("Andhra Pradesh", "Telangana"),
                WaterRequirement.HIGH,
                "Flooded canal / regular borewell",
                "28-32 Quintals/Acre",
                "96%",
                "Moderate blast tolerance",
                BigDecimal.valueOf(55),
                "KG",
                "25 KG Bag",
                150,
                SeedAvailabilityStatus.AVAILABLE,
                "https://images.unsplash.com/photo-rice-seed"
        );

        mockMvc.perform(post("/api/seeds")
                        .header("Authorization", "Bearer " + supplierToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.data.name").value("BPT 5204 Samba Mahsuri Rice Seed"))
                .andExpect(jsonPath("$.data.crop").value("RICE"))
                .andExpect(jsonPath("$.data.variety").value("BPT 5204 (Samba Mahsuri)"))
                .andExpect(jsonPath("$.data.price").value(55))
                .andExpect(jsonPath("$.data.priceUnit").value("KG"))
                .andExpect(jsonPath("$.data.supplier.fullName").value("Andhra Seeds Hub"));
    }

    @Test
    @DisplayName("2. Browse Seeds Catalog with Filtering, Search, and Sorting")
    void testBrowseAndFilterSeeds() throws Exception {
        createSampleSeed("Kadigiri Kadiri-6 Groundnut Seed", CropType.GROUNDNUT, "K-6", SeasonType.KHARIF, Set.of(SoilType.BLACK, SoilType.RED), BigDecimal.valueOf(120));
        createSampleSeed("MTU 1010 Rice Seed", CropType.RICE, "MTU 1010", SeasonType.RABI, Set.of(SoilType.ALLUVIAL, SoilType.CLAY), BigDecimal.valueOf(48));
        createSampleSeed("Pioneer Hybrid Maize Seed", CropType.MAIZE, "P-3396", SeasonType.KHARIF, Set.of(SoilType.LOAMY, SoilType.BLACK), BigDecimal.valueOf(280));

        // Public Catalog List
        mockMvc.perform(get("/api/seeds")
                        .param("page", "0")
                        .param("size", "10"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.totalElements").value(3));

        // Crop Filter
        mockMvc.perform(get("/api/seeds/crop/GROUNDNUT"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.content[0].crop").value("GROUNDNUT"));

        // Season Filter
        mockMvc.perform(get("/api/seeds/season/KHARIF"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.content").isArray())
                .andExpect(jsonPath("$.data.totalElements").value(2));

        // Search Query
        mockMvc.perform(get("/api/seeds/search")
                        .param("query", "Kadiri"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.content[0].variety").value("K-6"));

        // Sorting Price Ascending
        mockMvc.perform(get("/api/seeds")
                        .param("sort", "priceAsc"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.content[0].price").value(48))
                .andExpect(jsonPath("$.data.content[1].price").value(120))
                .andExpect(jsonPath("$.data.content[2].price").value(280));
    }

    @Test
    @DisplayName("3. Get Seed Details and Update/Delete Operations")
    void testSeedDetailsUpdateAndDelete() throws Exception {
        Long seedId = createSampleSeed("Kadiri-6 Groundnut Seed", CropType.GROUNDNUT, "K-6", SeasonType.KHARIF, Set.of(SoilType.RED), BigDecimal.valueOf(120));

        // Details
        mockMvc.perform(get("/api/seeds/" + seedId))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.id").value(seedId))
                .andExpect(jsonPath("$.data.name").value("Kadiri-6 Groundnut Seed"))
                .andExpect(jsonPath("$.data.supplier.fullName").value("Andhra Seeds Hub"));

        // Update
        SeedUpdateRequest updateReq = new SeedUpdateRequest();
        updateReq.setPrice(BigDecimal.valueOf(130));
        updateReq.setQuantityAvailable(250);

        mockMvc.perform(patch("/api/seeds/" + seedId)
                        .header("Authorization", "Bearer " + supplierToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(updateReq)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.price").value(130))
                .andExpect(jsonPath("$.data.quantityAvailable").value(250));

        // Delete/Archive
        mockMvc.perform(delete("/api/seeds/" + seedId)
                        .header("Authorization", "Bearer " + supplierToken))
                .andExpect(status().isOk());

        mockMvc.perform(get("/api/seeds/" + seedId))
                .andExpect(status().isNotFound());
    }

    @Test
    @DisplayName("4. Farm Context Indicative Seed Recommendations and Rule-Based Suitability Scoring")
    void testFarmContextIndicativeRecommendations() throws Exception {
        // Farmer has: Crop=Groundnut, Season=Kharif, Soil=Black Cotton, State=Andhra Pradesh, Irrigation=Drip + Canal
        Long matchingSeedId = createSampleSeed("Kadiri-6 Groundnut Seed", CropType.GROUNDNUT, "K-6", SeasonType.KHARIF, Set.of(SoilType.BLACK, SoilType.RED), BigDecimal.valueOf(120));
        Long differentSeedId = createSampleSeed("Wheat HD-2967", CropType.WHEAT, "HD-2967", SeasonType.RABI, Set.of(SoilType.ALLUVIAL), BigDecimal.valueOf(60));

        MvcResult recResult = mockMvc.perform(get("/api/seeds/recommended-for-farm")
                        .header("Authorization", "Bearer " + farmerToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data").isArray())
                .andReturn();

        JsonNode recommendations = objectMapper.readTree(recResult.getResponse().getContentAsString()).get("data");
        assertThat(recommendations.size()).isGreaterThanOrEqualTo(2);

        // Groundnut seed should rank #1 with high score (> 80)
        JsonNode topRec = recommendations.get(0);
        assertThat(topRec.get("seed").get("id").asLong()).isEqualTo(matchingSeedId);
        assertThat(topRec.get("score").asInt()).isGreaterThanOrEqualTo(80);
        assertThat(topRec.get("label").asText()).isEqualTo("Rule-based suitability score");
        assertThat(topRec.get("matchedFactors").size()).isGreaterThanOrEqualTo(3);
    }
}
