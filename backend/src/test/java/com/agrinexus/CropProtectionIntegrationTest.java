package com.agrinexus;

import com.agrinexus.auth.dto.LoginRequest;
import com.agrinexus.auth.dto.RegisterRequest;
import com.agrinexus.crop.dto.CropProtectionCreateRequest;
import com.agrinexus.crop.dto.CropProtectionUpdateRequest;
import com.agrinexus.crop.entity.PlantPart;
import com.agrinexus.crop.entity.ProtectionType;
import com.agrinexus.crop.entity.SeverityLevel;
import com.agrinexus.crop.repository.CropProtectionRepository;
import com.agrinexus.farm.dto.FarmCreateRequest;
import com.agrinexus.seeds.entity.CropType;
import com.agrinexus.seeds.entity.SeasonType;
import com.agrinexus.user.Role;
import com.agrinexus.user.User;
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
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.transaction.annotation.Transactional;

import java.util.Set;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@Transactional
class CropProtectionIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CropProtectionRepository cropProtectionRepository;

    @Autowired
    private com.agrinexus.farm.repository.FarmRepository farmRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private ObjectMapper objectMapper;

    private String adminToken;
    private String farmerToken;

    private static final String ADMIN_EMAIL = "crop.admin@agrinexus.com";
    private static final String FARMER_EMAIL = "crop.farmer@example.com";
    private static final String PASSWORD = "Password123!";

    @Autowired
    private com.agrinexus.admin.repository.AuditLogRepository auditLogRepository;

    @Autowired
    private com.agrinexus.notification.repository.NotificationRepository notificationRepository;

    @Autowired
    private com.agrinexus.notification.repository.NotificationPreferenceRepository preferenceRepository;

    @BeforeEach
    void setUp() throws Exception {
        auditLogRepository.deleteAll();
        notificationRepository.deleteAll();
        preferenceRepository.deleteAll();
        cropProtectionRepository.deleteAll();

        userRepository.findByEmail(ADMIN_EMAIL).ifPresent(userRepository::delete);
        userRepository.findByEmail(FARMER_EMAIL).ifPresent(user -> {
            farmRepository.findByUserId(user.getId()).ifPresent(farmRepository::delete);
            userRepository.delete(user);
        });

        // 1. Create ADMIN User directly
        User admin = User.builder()
                .firstName("AgriNexus")
                .lastName("Admin")
                .email(ADMIN_EMAIL)
                .password(passwordEncoder.encode(PASSWORD))
                .role(Role.ADMIN)
                .phone("9999900000")
                .enabled(true)
                .build();
        userRepository.save(admin);

        LoginRequest adminLogin = new LoginRequest(ADMIN_EMAIL, PASSWORD);
        MvcResult adminRes = mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(adminLogin)))
                .andExpect(status().isOk())
                .andReturn();
        adminToken = objectMapper.readTree(adminRes.getResponse().getContentAsString()).get("data").get("token").asText();

        // 2. Register & Login Farmer with Farm Profile
        RegisterRequest farmerReg = new RegisterRequest("Ravi", "Varma", FARMER_EMAIL, PASSWORD, "9848011223");
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

        // Create Farm Context for farmer: Crop=Rice, Season=Kharif, State=Andhra Pradesh
        FarmCreateRequest farmReq = new FarmCreateRequest(
                "Varma Paddy Fields",
                "Tenali Rural",
                "Guntur",
                "Andhra Pradesh",
                "522201",
                8.0,
                "Acres",
                "Alluvial Clay Soil",
                "Krishna Western Delta Canal",
                "Canal Flooding",
                "Rice",
                "Kharif"
        );

        mockMvc.perform(post("/api/farms")
                        .header("Authorization", "Bearer " + farmerToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(farmReq)))
                .andExpect(status().isCreated());
    }

    private Long createSampleRecord(String name, ProtectionType type, CropType crop, SeverityLevel severity, SeasonType season, Set<String> symptoms) throws Exception {
        CropProtectionCreateRequest request = new CropProtectionCreateRequest(
                name,
                "Magnaporthe oryzae",
                type,
                "Destructive fungal pathogen attacking rice leaves, nodes, and panicles causing severe yield losses.",
                crop,
                severity,
                season,
                symptoms,
                Set.of(PlantPart.LEAF, PlantPart.STEM),
                "Fungal spores spreading through airborne conidia in high humidity (>90%) and temperatures around 25-28°C.",
                "Field sanitation, balanced nitrogen fertilization, and planting resistant varieties like BPT 5204.",
                Set.of("Field sanitation", "Avoid excess nitrogen", "Use certified disease-free seeds", "Maintain optimal plant spacing"),
                "Neem oil spray (10,000 PPM), Pseudomonas fluorescens bio-agent seed treatment.",
                "Deep summer ploughing to destroy infected stubble and collateral weed hosts.",
                "Tricyclazole 75% WP or Azoxystrobin 18.2% + Difenoconazole 11.4% SC as per label instructions.",
                "Relative humidity > 85%, prolonged leaf wetness (8-10 hrs), moderate temperatures (24-28°C).",
                "https://images.unsplash.com/photo-rice-blast"
        );

        MvcResult result = mockMvc.perform(post("/api/crop-protection")
                        .header("Authorization", "Bearer " + adminToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.success").value(true))
                .andReturn();

        return objectMapper.readTree(result.getResponse().getContentAsString()).get("data").get("id").asLong();
    }

    @Test
    @DisplayName("1. Admin Create Crop Protection Advisory and Non-Admin Rejection")
    void testCreateProtectionAndRoleAuthorization() throws Exception {
        CropProtectionCreateRequest request = new CropProtectionCreateRequest(
                "Rice Blast (Magnaporthe oryzae)",
                "Magnaporthe oryzae",
                ProtectionType.DISEASE,
                "Diamond-shaped lesions with grey center and brown borders.",
                CropType.RICE,
                SeverityLevel.HIGH,
                SeasonType.KHARIF,
                Set.of("Spindle-shaped leaf lesions", "Grey center with brown margin", "Neck rotting"),
                Set.of(PlantPart.LEAF, PlantPart.STEM),
                "Airborne fungal spores",
                "Clean cultivation and balanced nitrogen",
                Set.of("Field sanitation", "Resistant varieties"),
                "Pseudomonas fluorescens 10g/kg seed treatment",
                "Crop rotation and removal of weeds",
                "Reference fungicides: Tricyclazole 75% WP",
                "Cool nights, high relative humidity",
                "https://images.unsplash.com/photo-rice-blast"
        );

        // Non-admin farmer attempt -> 403 Forbidden
        mockMvc.perform(post("/api/crop-protection")
                        .header("Authorization", "Bearer " + farmerToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isForbidden());

        // Admin attempt -> 201 Created
        mockMvc.perform(post("/api/crop-protection")
                        .header("Authorization", "Bearer " + adminToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.data.name").value("Rice Blast (Magnaporthe oryzae)"))
                .andExpect(jsonPath("$.data.crop").value("RICE"))
                .andExpect(jsonPath("$.data.severity").value("HIGH"))
                .andExpect(jsonPath("$.data.type").value("DISEASE"));
    }

    @Test
    @DisplayName("2. Browse, Filter, Search and Multi-criteria Query for Crop Protection")
    void testBrowseAndFilterCropProtection() throws Exception {
        createSampleRecord("Rice Blast Disease", ProtectionType.DISEASE, CropType.RICE, SeverityLevel.HIGH, SeasonType.KHARIF, Set.of("Spindle leaf spots", "Neck rot"));
        createSampleRecord("Rice Yellow Stem Borer", ProtectionType.PEST, CropType.RICE, SeverityLevel.CRITICAL, SeasonType.KHARIF, Set.of("Dead hearts", "White ears"));
        createSampleRecord("Groundnut Tikka Leaf Spot", ProtectionType.DISEASE, CropType.GROUNDNUT, SeverityLevel.MEDIUM, SeasonType.KHARIF, Set.of("Circular dark brown leaf spots", "Yellow halo"));

        // Public Catalog List
        mockMvc.perform(get("/api/crop-protection")
                        .param("page", "0")
                        .param("size", "10"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.totalElements").value(3));

        // Crop Filter
        mockMvc.perform(get("/api/crop-protection")
                        .param("crop", "RICE"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.totalElements").value(2));

        // Type Filter
        mockMvc.perform(get("/api/crop-protection")
                        .param("type", "PEST"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.totalElements").value(1))
                .andExpect(jsonPath("$.data.content[0].name").value("Rice Yellow Stem Borer"));

        // Severity Filter
        mockMvc.perform(get("/api/crop-protection")
                        .param("severity", "CRITICAL"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.totalElements").value(1));

        // Multi Filter (Crop=Rice, Type=Disease, Severity=High, Season=Kharif)
        mockMvc.perform(get("/api/crop-protection")
                        .param("crop", "RICE")
                        .param("type", "DISEASE")
                        .param("severity", "HIGH")
                        .param("season", "KHARIF"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.totalElements").value(1))
                .andExpect(jsonPath("$.data.content[0].name").value("Rice Blast Disease"));

        // Text Search
        mockMvc.perform(get("/api/crop-protection/search")
                        .param("query", "Tikka"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.content[0].name").value("Groundnut Tikka Leaf Spot"));
    }

    @Test
    @DisplayName("3. Symptom Search (Possible Matching Conditions)")
    void testSymptomSearch() throws Exception {
        createSampleRecord("Rice Blast", ProtectionType.DISEASE, CropType.RICE, SeverityLevel.HIGH, SeasonType.KHARIF, Set.of("Spindle-shaped spots", "Neck rot"));
        createSampleRecord("Groundnut Tikka", ProtectionType.DISEASE, CropType.GROUNDNUT, SeverityLevel.MEDIUM, SeasonType.KHARIF, Set.of("Circular necrotic spots", "Yellow halo"));

        mockMvc.perform(get("/api/crop-protection/symptoms")
                        .param("query", "Yellow halo"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data[0].record.name").value("Groundnut Tikka"))
                .andExpect(jsonPath("$.data[0].label").value("Possible matching condition"));
    }

    @Test
    @DisplayName("4. Farm-Context Relevance and Proactive Recommendations")
    void testFarmContextRelevanceAndRecommendations() throws Exception {
        // Farmer has: Crop=Rice, Season=Kharif, State=Andhra Pradesh, Canal water
        Long riceBlastId = createSampleRecord("Rice Blast", ProtectionType.DISEASE, CropType.RICE, SeverityLevel.HIGH, SeasonType.KHARIF, Set.of("Spindle spots"));
        Long cottonBollwormId = createSampleRecord("Cotton Bollworm", ProtectionType.PEST, CropType.COTTON, SeverityLevel.CRITICAL, SeasonType.KHARIF, Set.of("Square shedding"));

        MvcResult result = mockMvc.perform(get("/api/crop-protection/relevant-for-farm")
                        .header("Authorization", "Bearer " + farmerToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data").isArray())
                .andReturn();

        JsonNode records = objectMapper.readTree(result.getResponse().getContentAsString()).get("data");
        assertThat(records.size()).isGreaterThanOrEqualTo(2);

        // Rice Blast should be ranked #1 with high match score (> 80)
        JsonNode topAdvisory = records.get(0);
        assertThat(topAdvisory.get("record").get("id").asLong()).isEqualTo(riceBlastId);
        assertThat(topAdvisory.get("matchScore").asInt()).isGreaterThanOrEqualTo(80);
        assertThat(topAdvisory.get("matchedFactors").size()).isGreaterThanOrEqualTo(3);
    }

    @Test
    @DisplayName("5. Update and Soft-Delete Crop Protection Record")
    void testUpdateAndDeleteCropProtection() throws Exception {
        Long cpId = createSampleRecord("Rice Blast", ProtectionType.DISEASE, CropType.RICE, SeverityLevel.HIGH, SeasonType.KHARIF, Set.of("Spindle spots"));

        // Admin Update
        CropProtectionUpdateRequest updateReq = new CropProtectionUpdateRequest();
        updateReq.setSeverity(SeverityLevel.CRITICAL);
        updateReq.setDescription("Updated description: High priority epidemic alert in delta regions.");

        mockMvc.perform(patch("/api/crop-protection/" + cpId)
                        .header("Authorization", "Bearer " + adminToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(updateReq)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.severity").value("CRITICAL"))
                .andExpect(jsonPath("$.data.description").value("Updated description: High priority epidemic alert in delta regions."));

        // Admin Delete/Archive
        mockMvc.perform(delete("/api/crop-protection/" + cpId)
                        .header("Authorization", "Bearer " + adminToken))
                .andExpect(status().isOk());

        // Get by ID after delete -> 404 Not Found
        mockMvc.perform(get("/api/crop-protection/" + cpId))
                .andExpect(status().isNotFound());
    }
}
