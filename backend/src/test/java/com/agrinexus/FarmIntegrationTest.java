package com.agrinexus;

import com.agrinexus.auth.dto.LoginRequest;
import com.agrinexus.auth.dto.RegisterRequest;
import com.agrinexus.farm.dto.FarmCreateRequest;
import com.agrinexus.farm.dto.FarmUpdateRequest;
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

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@Transactional
class FarmIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private com.agrinexus.farm.repository.FarmRepository farmRepository;

    @Autowired
    private ObjectMapper objectMapper;

    private static final String FARMER_EMAIL = "farm.test.venkat@example.com";
    private static final String FARMER_PASS = "FarmPass123!";
    private String jwtToken;

    @BeforeEach
    void setUp() throws Exception {
        userRepository.findByEmail(FARMER_EMAIL).ifPresent(user -> {
            farmRepository.findByUserId(user.getId()).ifPresent(farmRepository::delete);
            userRepository.delete(user);
        });

        // Register farmer
        RegisterRequest registerReq = new RegisterRequest("Venkat", "Rao", FARMER_EMAIL, FARMER_PASS, "9876543210");
        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(registerReq)))
                .andExpect(status().isCreated());

        // Login to get token
        LoginRequest loginReq = new LoginRequest(FARMER_EMAIL, FARMER_PASS);
        MvcResult loginResult = mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(loginReq)))
                .andExpect(status().isOk())
                .andReturn();

        jwtToken = objectMapper.readTree(loginResult.getResponse().getContentAsString())
                .get("data").get("token").asText();
    }

    @Test
    @DisplayName("1. Unauthenticated farm access should return 401")
    void testUnauthorizedFarmAccess() throws Exception {
        mockMvc.perform(get("/api/farms/me")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.status").value(401));
    }

    @Test
    @DisplayName("2. Complete Farm Lifecycle: Create, Retrieve, and Update")
    void testFarmLifecycle() throws Exception {
        // Step 1: Create Farm
        FarmCreateRequest createRequest = new FarmCreateRequest(
                "Sri Venkateswara Organic Farm",
                "Amaravathi Rural",
                "Guntur",
                "Andhra Pradesh",
                "522020",
                5.0,
                "Acres",
                "Black Soil",
                "Borewell + Krishna Canal",
                "Drip Irrigation",
                "Groundnut",
                "Kharif 2026"
        );

        mockMvc.perform(post("/api/farms")
                        .header("Authorization", "Bearer " + jwtToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(createRequest)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.farmName").value("Sri Venkateswara Organic Farm"))
                .andExpect(jsonPath("$.data.area").value(5.0))
                .andExpect(jsonPath("$.data.areaUnit").value("Acres"))
                .andExpect(jsonPath("$.data.soilType").value("Black Soil"))
                .andExpect(jsonPath("$.data.currentCrop").value("Groundnut"))
                .andExpect(jsonPath("$.data.district").value("Guntur"))
                .andExpect(jsonPath("$.data.state").value("Andhra Pradesh"));

        // Step 2: Retrieve Farm via GET /api/farms/me
        mockMvc.perform(get("/api/farms/me")
                        .header("Authorization", "Bearer " + jwtToken)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.farmName").value("Sri Venkateswara Organic Farm"))
                .andExpect(jsonPath("$.data.farmerEmail").value(FARMER_EMAIL))
                .andExpect(jsonPath("$.data.farmerName").value("Venkat Rao"));

        // Step 3: Update Farm parameters via PATCH /api/farms/me
        FarmUpdateRequest updateRequest = new FarmUpdateRequest();
        updateRequest.setArea(7.5);
        updateRequest.setCurrentCrop("Rice (Paddy)");
        updateRequest.setSeason("Rabi 2026");

        mockMvc.perform(patch("/api/farms/me")
                        .header("Authorization", "Bearer " + jwtToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(updateRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.area").value(7.5))
                .andExpect(jsonPath("$.data.currentCrop").value("Rice (Paddy)"))
                .andExpect(jsonPath("$.data.season").value("Rabi 2026"))
                .andExpect(jsonPath("$.data.soilType").value("Black Soil")); // Unmodified field remains intact
    }
}
