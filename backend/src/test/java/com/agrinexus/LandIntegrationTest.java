package com.agrinexus;

import com.agrinexus.auth.dto.LoginRequest;
import com.agrinexus.auth.dto.RegisterRequest;
import com.agrinexus.land.dto.*;
import com.agrinexus.land.entity.LandSoilType;
import com.agrinexus.land.entity.LandStatus;
import com.agrinexus.land.entity.LeaseApplicationStatus;
import com.agrinexus.land.entity.WaterSourceType;
import com.agrinexus.land.repository.LandParcelRepository;
import com.agrinexus.land.repository.LeaseApplicationRepository;
import com.agrinexus.user.Role;
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
import org.springframework.security.crypto.password.PasswordEncoder;
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
class LandIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private LandParcelRepository landParcelRepository;

    @Autowired
    private LeaseApplicationRepository leaseApplicationRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private ObjectMapper objectMapper;

    private String ownerToken;
    private String farmerToken;
    private String otherFarmerToken;
    private String otherOwnerToken;
    private String adminToken;

    private static final String OWNER_EMAIL = "land.owner@agrinexus.com";
    private static final String FARMER_EMAIL = "land.farmer@agrinexus.com";
    private static final String OTHER_FARMER_EMAIL = "land.farmer2@agrinexus.com";
    private static final String OTHER_OWNER_EMAIL = "land.owner2@agrinexus.com";
    private static final String ADMIN_EMAIL = "land.admin@agrinexus.com";
    private static final String PASSWORD = "Password123!";

    @BeforeEach
    void setUp() throws Exception {
        leaseApplicationRepository.deleteAll();
        landParcelRepository.deleteAll();

        userRepository.findByEmail(OWNER_EMAIL).ifPresent(userRepository::delete);
        userRepository.findByEmail(FARMER_EMAIL).ifPresent(userRepository::delete);
        userRepository.findByEmail(OTHER_FARMER_EMAIL).ifPresent(userRepository::delete);
        userRepository.findByEmail(OTHER_OWNER_EMAIL).ifPresent(userRepository::delete);
        userRepository.findByEmail(ADMIN_EMAIL).ifPresent(userRepository::delete);

        // 1. Register Land Owner
        RegisterRequest ownerReg = new RegisterRequest("Subba", "Rao", OWNER_EMAIL, PASSWORD, "9848011222");
        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(ownerReg)))
                .andExpect(status().isCreated());
        ownerToken = loginAndGetToken(OWNER_EMAIL);

        // 2. Register Farmer
        RegisterRequest farmerReg = new RegisterRequest("Srinivasa", "Reddy", FARMER_EMAIL, PASSWORD, "9848033444");
        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(farmerReg)))
                .andExpect(status().isCreated());
        farmerToken = loginAndGetToken(FARMER_EMAIL);

        // 3. Register Other Farmer
        RegisterRequest otherFarmerReg = new RegisterRequest("Venkatesh", "Naidu", OTHER_FARMER_EMAIL, PASSWORD, "9848055666");
        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(otherFarmerReg)))
                .andExpect(status().isCreated());
        otherFarmerToken = loginAndGetToken(OTHER_FARMER_EMAIL);

        // 4. Register Other Owner
        RegisterRequest otherOwnerReg = new RegisterRequest("Ramachandra", "Rao", OTHER_OWNER_EMAIL, PASSWORD, "9848077888");
        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(otherOwnerReg)))
                .andExpect(status().isCreated());
        otherOwnerToken = loginAndGetToken(OTHER_OWNER_EMAIL);

        // 5. Create Admin
        User admin = User.builder()
                .firstName("Land")
                .lastName("Admin")
                .email(ADMIN_EMAIL)
                .password(passwordEncoder.encode(PASSWORD))
                .role(Role.ADMIN)
                .phone("9999900000")
                .enabled(true)
                .build();
        userRepository.save(admin);
        adminToken = loginAndGetToken(ADMIN_EMAIL);
    }

    private String loginAndGetToken(String email) throws Exception {
        LoginRequest login = new LoginRequest(email, PASSWORD);
        MvcResult res = mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(login)))
                .andExpect(status().isOk())
                .andReturn();
        return objectMapper.readTree(res.getResponse().getContentAsString()).get("data").get("token").asText();
    }

    private Long createSampleParcel(String token, String title, BigDecimal acreage, LandSoilType soilType, WaterSourceType waterSource, BigDecimal rentPerAcre, String district, boolean hasRiver, boolean hasBorewell, boolean hasDrip, boolean hasCanal) throws Exception {
        LandParcelCreateRequest req = new LandParcelCreateRequest(
                title,
                "High quality fertile farmland parcel with excellent irrigation access and motor pump.",
                "Sy.No 120/1",
                district + " Agricultural Belt",
                district,
                "Andhra Pradesh",
                acreage,
                soilType,
                "Deep Fertile Soil",
                waterSource,
                "River + Borewell Irrigation",
                hasRiver,
                hasBorewell,
                hasDrip,
                hasCanal,
                rentPerAcre,
                3,
                "3 Years Commercial",
                "Immediate",
                true,
                "30ft Paved Road",
                "3-Phase 10HP Power",
                "Live Hedgerows",
                95,
                Set.of("Cotton", "Chilli", "Paddy", "Banana")
        );

        MvcResult res = mockMvc.perform(post("/api/land")
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.success").value(true))
                .andReturn();

        return objectMapper.readTree(res.getResponse().getContentAsString()).get("data").get("id").asLong();
    }

    @Test
    @DisplayName("1. Land Parcel Creation, Rent Calculation, Catalog, Filter and Search")
    void testLandCreationAndCatalog() throws Exception {
        Long p1 = createSampleParcel(ownerToken, "River-Side 15Ac Fertile Farmland", new BigDecimal("15.00"), LandSoilType.BLACK_SOIL, WaterSourceType.RIVER, new BigDecimal("35000.00"), "Guntur", true, true, true, false);
        Long p2 = createSampleParcel(ownerToken, "Tenali 10Ac Canal Irrigated Farmland", new BigDecimal("10.00"), LandSoilType.BLACK_SOIL, WaterSourceType.CANAL, new BigDecimal("28000.00"), "Guntur", false, false, false, true);
        Long p3 = createSampleParcel(otherOwnerToken, "Kurnool 20Ac Red Sandy Loam", new BigDecimal("20.00"), LandSoilType.RED_LOAM, WaterSourceType.RAIN_FED, new BigDecimal("14000.00"), "Kurnool", false, false, false, false);

        // Verify total annual rent calculation (15 * 35000 = 525000)
        mockMvc.perform(get("/api/land/" + p1))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.totalAnnualRent").value(525000.00));

        // Public Catalog
        mockMvc.perform(get("/api/land")
                        .param("page", "0")
                        .param("size", "10"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.totalElements").value(3));

        // Filter by soilType
        mockMvc.perform(get("/api/land")
                        .param("soilType", "RED_LOAM"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.totalElements").value(1))
                .andExpect(jsonPath("$.data.content[0].title").value("Kurnool 20Ac Red Sandy Loam"));

        // Filter by waterSource CANAL
        mockMvc.perform(get("/api/land")
                        .param("waterSource", "CANAL"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.totalElements").value(1));

        // Filter by hasRiver=true
        mockMvc.perform(get("/api/land")
                        .param("hasRiver", "true"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.totalElements").value(1));

        // Search
        mockMvc.perform(get("/api/land/search")
                        .param("query", "Tenali"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.content[0].title").value("Tenali 10Ac Canal Irrigated Farmland"));
    }

    @Test
    @DisplayName("2. Landowner Ownership, Updates, and Soft-Delete Protections")
    void testLandOwnershipAndUpdates() throws Exception {
        Long parcelId = createSampleParcel(ownerToken, "Drip Ready Kadapa Parcel", new BigDecimal("12.00"), LandSoilType.RED_LOAM, WaterSourceType.DRIP_READY, new BigDecimal("22000.00"), "Kadapa", false, true, true, false);

        // Owner views own listings
        mockMvc.perform(get("/api/land/my")
                        .header("Authorization", "Bearer " + ownerToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data[0].id").value(parcelId));

        // Other owner attempts update -> 403 Forbidden
        LandParcelUpdateRequest updateReq = new LandParcelUpdateRequest();
        updateReq.setAnnualRentPerAcre(new BigDecimal("25000.00"));
        mockMvc.perform(patch("/api/land/" + parcelId)
                        .header("Authorization", "Bearer " + otherOwnerToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(updateReq)))
                .andExpect(status().isForbidden());

        // Actual owner updates rent
        mockMvc.perform(patch("/api/land/" + parcelId)
                        .header("Authorization", "Bearer " + ownerToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(updateReq)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.annualRentPerAcre").value(25000.00))
                .andExpect(jsonPath("$.data.totalAnnualRent").value(300000.00));

        // Soft-delete
        mockMvc.perform(delete("/api/land/" + parcelId)
                        .header("Authorization", "Bearer " + ownerToken))
                .andExpect(status().isOk());

        // Verify no longer in public catalog
        mockMvc.perform(get("/api/land/" + parcelId))
                .andExpect(status().isNotFound());
    }

    @Test
    @DisplayName("3. Farmer Lease Application Workflow: Apply, Duplicate Protection, Withdrawal")
    void testLeaseApplicationWorkflow() throws Exception {
        Long parcelId = createSampleParcel(ownerToken, "Guntur Chilli Land Parcel", new BigDecimal("8.00"), LandSoilType.BLACK_SOIL, WaterSourceType.BOREWELL, new BigDecimal("30000.00"), "Guntur", false, true, false, false);

        // Farmer applies
        LeaseApplicationRequest appReq = new LeaseApplicationRequest(
                "Export Grade Teja Chilli",
                "3 Years",
                "I am an experienced organic chilli cultivator in Guntur mandal.",
                new BigDecimal("30000.00")
        );

        MvcResult appRes = mockMvc.perform(post("/api/land/" + parcelId + "/applications")
                        .header("Authorization", "Bearer " + farmerToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(appReq)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.data.status").value("PENDING"))
                .andReturn();

        Long appId = objectMapper.readTree(appRes.getResponse().getContentAsString()).get("data").get("id").asLong();

        // Duplicate application -> 409 Conflict
        mockMvc.perform(post("/api/land/" + parcelId + "/applications")
                        .header("Authorization", "Bearer " + farmerToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(appReq)))
                .andExpect(status().isConflict());

        // Farmer views own applications
        mockMvc.perform(get("/api/land/applications/my")
                        .header("Authorization", "Bearer " + farmerToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data[0].id").value(appId));

        // Farmer withdraws application
        mockMvc.perform(patch("/api/land/applications/" + appId + "/withdraw")
                        .header("Authorization", "Bearer " + farmerToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.status").value("WITHDRAWN"));
    }

    @Test
    @DisplayName("4. Landowner Application Review, Acceptance, and Parcel Leased State Transition")
    void testLandownerAcceptanceAndLeaseTransition() throws Exception {
        Long parcelId = createSampleParcel(ownerToken, "Prime Krishna Valley 10Ac", new BigDecimal("10.00"), LandSoilType.ALLUVIAL, WaterSourceType.CANAL, new BigDecimal("32000.00"), "Krishna", false, false, false, true);

        // Farmer 1 applies
        MvcResult f1Res = mockMvc.perform(post("/api/land/" + parcelId + "/applications")
                        .header("Authorization", "Bearer " + farmerToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(new LeaseApplicationRequest("Banana & Sugarcane", "3 Years", "Experienced cultivator", new BigDecimal("32000.00")))))
                .andExpect(status().isCreated())
                .andReturn();
        Long f1AppId = objectMapper.readTree(f1Res.getResponse().getContentAsString()).get("data").get("id").asLong();

        // Farmer 2 applies
        MvcResult f2Res = mockMvc.perform(post("/api/land/" + parcelId + "/applications")
                        .header("Authorization", "Bearer " + otherFarmerToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(new LeaseApplicationRequest("Paddy & Pulses", "2 Years", "Local cooperative team", new BigDecimal("31000.00")))))
                .andExpect(status().isCreated())
                .andReturn();
        Long f2AppId = objectMapper.readTree(f2Res.getResponse().getContentAsString()).get("data").get("id").asLong();

        // Landowner views applicants
        mockMvc.perform(get("/api/land/" + parcelId + "/applications")
                        .header("Authorization", "Bearer " + ownerToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.length()").value(2));

        // Landowner accepts Farmer 1 -> application status becomes ACCEPTED, parcel status becomes LEASED
        mockMvc.perform(patch("/api/land/applications/" + f1AppId + "/accept")
                        .header("Authorization", "Bearer " + ownerToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.status").value("ACCEPTED"));

        // Verify parcel status is LEASED
        mockMvc.perform(get("/api/land/" + parcelId))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.status").value("LEASED"));

        // Attempting to accept Farmer 2 on an already LEASED parcel -> 409 Conflict
        mockMvc.perform(patch("/api/land/applications/" + f2AppId + "/accept")
                        .header("Authorization", "Bearer " + ownerToken))
                .andExpect(status().isConflict());

        // Landowner rejects Farmer 2
        mockMvc.perform(patch("/api/land/applications/" + f2AppId + "/reject")
                        .header("Authorization", "Bearer " + ownerToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.status").value("REJECTED"));
    }
}
