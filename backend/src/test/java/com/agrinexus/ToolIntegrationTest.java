package com.agrinexus;

import com.agrinexus.auth.dto.LoginRequest;
import com.agrinexus.auth.dto.RegisterRequest;
import com.agrinexus.tools.dto.ToolCreateRequest;
import com.agrinexus.tools.dto.ToolRentalRequestCreate;
import com.agrinexus.tools.dto.ToolUpdateRequest;
import com.agrinexus.tools.entity.ToolAvailabilityStatus;
import com.agrinexus.tools.entity.ToolCategory;
import com.agrinexus.tools.entity.ToolCondition;
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
import java.time.LocalDate;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@Transactional
class ToolIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private com.agrinexus.tools.repository.ToolRentalRequestRepository rentalRepository;

    @Autowired
    private com.agrinexus.tools.repository.ToolRepository toolRepository;

    @Autowired
    private ObjectMapper objectMapper;

    private String ownerToken;
    private String renterToken;
    private Long ownerId;
    private Long renterId;

    private static final String OWNER_EMAIL = "tool.test.owner@example.com";
    private static final String RENTER_EMAIL = "tool.test.renter@example.com";
    private static final String PASSWORD = "Password123!";

    @BeforeEach
    void setUp() throws Exception {
        rentalRepository.deleteAll();
        toolRepository.deleteAll();
        userRepository.findByEmail(OWNER_EMAIL).ifPresent(userRepository::delete);
        userRepository.findByEmail(RENTER_EMAIL).ifPresent(userRepository::delete);

        // Register & login Tool Owner
        RegisterRequest ownerReg = new RegisterRequest("Suresh", "Kumar", OWNER_EMAIL, PASSWORD, "9848011223");
        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(ownerReg)))
                .andExpect(status().isCreated());

        LoginRequest ownerLogin = new LoginRequest(OWNER_EMAIL, PASSWORD);
        MvcResult ownerRes = mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(ownerLogin)))
                .andExpect(status().isOk())
                .andReturn();
        JsonNode ownerJson = objectMapper.readTree(ownerRes.getResponse().getContentAsString()).get("data");
        ownerToken = ownerJson.get("token").asText();
        ownerId = ownerJson.get("user").get("id").asLong();

        // Register & login Renter
        RegisterRequest renterReg = new RegisterRequest("Ramesh", "Patel", RENTER_EMAIL, PASSWORD, "9848099887");
        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(renterReg)))
                .andExpect(status().isCreated());

        LoginRequest renterLogin = new LoginRequest(RENTER_EMAIL, PASSWORD);
        MvcResult renterRes = mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(renterLogin)))
                .andExpect(status().isOk())
                .andReturn();
        JsonNode renterJson = objectMapper.readTree(renterRes.getResponse().getContentAsString()).get("data");
        renterToken = renterJson.get("token").asText();
        renterId = renterJson.get("user").get("id").asLong();
    }

    private Long createSampleTool(String name, ToolCategory category, String brand, BigDecimal pricePerDay, String district) throws Exception {
        ToolCreateRequest request = new ToolCreateRequest(
                name,
                "Heavy duty agricultural equipment for field operations.",
                category,
                brand,
                "2026 Model",
                "Utility",
                ToolCondition.GOOD,
                50.0,
                "HP",
                "Tirupati Rural",
                district,
                "Andhra Pradesh",
                pricePerDay,
                BigDecimal.valueOf(350),
                BigDecimal.valueOf(5000),
                ToolAvailabilityStatus.AVAILABLE,
                "https://images.unsplash.com/photo-tractor",
                2026,
                "Diesel",
                false,
                true
        );

        MvcResult result = mockMvc.perform(post("/api/tools")
                        .header("Authorization", "Bearer " + ownerToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.success").value(true))
                .andReturn();

        return objectMapper.readTree(result.getResponse().getContentAsString())
                .get("data").get("id").asLong();
    }

    @Test
    @DisplayName("1. Create Tool Listing and Verify Response")
    void testCreateTool() throws Exception {
        ToolCreateRequest request = new ToolCreateRequest(
                "John Deere 5050D Tractor",
                "50 HP multi-utility tractor with power steering and dual clutch.",
                ToolCategory.TRACTOR,
                "John Deere",
                "5050D",
                "Tractor",
                ToolCondition.NEW,
                50.0,
                "HP",
                "Guntur East",
                "Guntur",
                "Andhra Pradesh",
                BigDecimal.valueOf(2500),
                BigDecimal.valueOf(400),
                BigDecimal.valueOf(10000),
                ToolAvailabilityStatus.AVAILABLE,
                "https://images.unsplash.com/tractor-jd",
                2026,
                "Diesel",
                false,
                true
        );

        mockMvc.perform(post("/api/tools")
                        .header("Authorization", "Bearer " + ownerToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.data.name").value("John Deere 5050D Tractor"))
                .andExpect(jsonPath("$.data.category").value("TRACTOR"))
                .andExpect(jsonPath("$.data.brand").value("John Deere"))
                .andExpect(jsonPath("$.data.pricePerDay").value(2500))
                .andExpect(jsonPath("$.data.owner.email").value(OWNER_EMAIL))
                .andExpect(jsonPath("$.data.owner.fullName").value("Suresh Kumar"));
    }

    @Test
    @DisplayName("2. Browse Tools with Filtering, Search, and Pagination")
    void testBrowseAndFilterTools() throws Exception {
        createSampleTool("Mahindra 575 DI Tractor", ToolCategory.TRACTOR, "Mahindra", BigDecimal.valueOf(2200), "Tirupati");
        createSampleTool("Kubota Harvester DC-68G", ToolCategory.HARVESTER, "Kubota", BigDecimal.valueOf(5000), "Guntur");
        createSampleTool("Shaktiman Rotavator Semi Champion", ToolCategory.ROTAVATOR, "Shaktiman", BigDecimal.valueOf(1500), "Tirupati");

        // Public Catalog List
        mockMvc.perform(get("/api/tools")
                        .param("page", "0")
                        .param("size", "10"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.content").isArray())
                .andExpect(jsonPath("$.data.totalElements").value(3));

        // Category Filter
        mockMvc.perform(get("/api/tools")
                        .param("category", "TRACTOR"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.content[0].category").value("TRACTOR"));

        // Search Query
        mockMvc.perform(get("/api/tools/search")
                        .param("query", "Kubota"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.content[0].brand").value("Kubota"));

        // District Filter + Price Sorting
        mockMvc.perform(get("/api/tools")
                        .param("district", "Tirupati")
                        .param("sort", "priceAsc"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.content[0].pricePerDay").value(1500))
                .andExpect(jsonPath("$.data.content[1].pricePerDay").value(2200));
    }

    @Test
    @DisplayName("3. Get Tool Details and Owner Listings")
    void testToolDetailsAndOwnerListings() throws Exception {
        Long toolId = createSampleTool("Mahindra Tractor", ToolCategory.TRACTOR, "Mahindra", BigDecimal.valueOf(2200), "Tirupati");

        // Get by ID
        mockMvc.perform(get("/api/tools/" + toolId))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.id").value(toolId))
                .andExpect(jsonPath("$.data.name").value("Mahindra Tractor"))
                .andExpect(jsonPath("$.data.owner.fullName").value("Suresh Kumar"));

        // Get My Tools
        mockMvc.perform(get("/api/tools/my")
                        .header("Authorization", "Bearer " + ownerToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data").isArray())
                .andExpect(jsonPath("$.data[0].id").value(toolId));
    }

    @Test
    @DisplayName("4. Update and Delete Tool - Security and Ownership Enforcement")
    void testToolUpdateAndDeleteOwnership() throws Exception {
        Long toolId = createSampleTool("Mahindra Tractor", ToolCategory.TRACTOR, "Mahindra", BigDecimal.valueOf(2200), "Tirupati");

        // Owner updates successfully
        ToolUpdateRequest updateReq = new ToolUpdateRequest();
        updateReq.setPricePerDay(BigDecimal.valueOf(2400));
        updateReq.setLocation("Tirupati City Center");

        mockMvc.perform(patch("/api/tools/" + toolId)
                        .header("Authorization", "Bearer " + ownerToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(updateReq)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.pricePerDay").value(2400))
                .andExpect(jsonPath("$.data.location").value("Tirupati City Center"));

        // Unauthorized user attempts update -> 403 Forbidden
        mockMvc.perform(patch("/api/tools/" + toolId)
                        .header("Authorization", "Bearer " + renterToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(updateReq)))
                .andExpect(status().isForbidden());

        // Owner deletes/archives tool
        mockMvc.perform(delete("/api/tools/" + toolId)
                        .header("Authorization", "Bearer " + ownerToken))
                .andExpect(status().isOk());

        // Verify tool is no longer listed in active tools
        mockMvc.perform(get("/api/tools/" + toolId))
                .andExpect(status().isNotFound());
    }

    @Test
    @DisplayName("5. Complete Rental Lifecycle: Request, Calculation, Approval, and Overlapping Conflict Prevention")
    void testRentalLifecycleAndConflictPrevention() throws Exception {
        Long toolId = createSampleTool("John Deere 5D", ToolCategory.TRACTOR, "John Deere", BigDecimal.valueOf(2000), "Guntur");

        // Renter creates rental request for 3 days: Sept 10 to Sept 12
        LocalDate start = LocalDate.now().plusDays(10);
        LocalDate end = LocalDate.now().plusDays(12);

        ToolRentalRequestCreate rentalReq = new ToolRentalRequestCreate(start, end, "Field plowing for Kharif crop");

        MvcResult rentalResult = mockMvc.perform(post("/api/tools/" + toolId + "/rental-requests")
                        .header("Authorization", "Bearer " + renterToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(rentalReq)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.data.requestedDays").value(3))
                .andExpect(jsonPath("$.data.totalAmount").value(6000)) // 3 days * 2000 = 6000
                .andExpect(jsonPath("$.data.status").value("PENDING"))
                .andExpect(jsonPath("$.data.renterEmail").value(RENTER_EMAIL))
                .andReturn();

        Long requestId = objectMapper.readTree(rentalResult.getResponse().getContentAsString())
                .get("data").get("id").asLong();

        // Tool owner approves request
        mockMvc.perform(patch("/api/tools/rental-requests/" + requestId + "/approve")
                        .header("Authorization", "Bearer " + ownerToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.status").value("APPROVED"));

        // Second renter tries to request overlapping dates (e.g. Sept 11 to Sept 14) -> 409 Conflict
        LocalDate overlapStart = LocalDate.now().plusDays(11);
        LocalDate overlapEnd = LocalDate.now().plusDays(14);
        ToolRentalRequestCreate overlapReq = new ToolRentalRequestCreate(overlapStart, overlapEnd, "Overlapping rent attempt");

        mockMvc.perform(post("/api/tools/" + toolId + "/rental-requests")
                        .header("Authorization", "Bearer " + renterToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(overlapReq)))
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.message").value("This tool is not available for the requested rental period."));
    }

    @Test
    @DisplayName("6. Rental Request Rejection and Cancellation Flow")
    void testRentalRejectAndCancelFlow() throws Exception {
        Long toolId = createSampleTool("Mahindra Harvester", ToolCategory.HARVESTER, "Mahindra", BigDecimal.valueOf(3000), "Nellore");

        LocalDate start = LocalDate.now().plusDays(5);
        LocalDate end = LocalDate.now().plusDays(6);

        ToolRentalRequestCreate rentalReq = new ToolRentalRequestCreate(start, end, "Harvesting request");

        MvcResult res = mockMvc.perform(post("/api/tools/" + toolId + "/rental-requests")
                        .header("Authorization", "Bearer " + renterToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(rentalReq)))
                .andExpect(status().isCreated())
                .andReturn();

        Long requestId = objectMapper.readTree(res.getResponse().getContentAsString())
                .get("data").get("id").asLong();

        // Owner rejects request
        mockMvc.perform(patch("/api/tools/rental-requests/" + requestId + "/reject")
                        .header("Authorization", "Bearer " + ownerToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.status").value("REJECTED"));

        // Invalid transition: cannot approve a rejected request
        mockMvc.perform(patch("/api/tools/rental-requests/" + requestId + "/approve")
                        .header("Authorization", "Bearer " + ownerToken))
                .andExpect(status().isBadRequest());
    }
}
