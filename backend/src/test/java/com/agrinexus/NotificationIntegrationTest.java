package com.agrinexus;

import com.agrinexus.auth.dto.LoginRequest;
import com.agrinexus.auth.dto.RegisterRequest;
import com.agrinexus.jobs.dto.JobApplicationRequest;
import com.agrinexus.jobs.dto.JobCreateRequest;
import com.agrinexus.jobs.entity.JobCategory;
import com.agrinexus.jobs.entity.WageType;
import com.agrinexus.jobs.repository.JobApplicationRepository;
import com.agrinexus.jobs.repository.JobRepository;
import com.agrinexus.land.dto.LandParcelCreateRequest;
import com.agrinexus.land.dto.LeaseApplicationRequest;
import com.agrinexus.land.entity.LandSoilType;
import com.agrinexus.land.entity.WaterSourceType;
import com.agrinexus.land.repository.LandParcelRepository;
import com.agrinexus.land.repository.LeaseApplicationRepository;
import com.agrinexus.market.dto.MarketPriceCreateRequest;
import com.agrinexus.market.entity.PriceUnit;
import com.agrinexus.market.service.MarketPriceService;
import com.agrinexus.notification.dto.MarketPriceAlertRuleRequest;
import com.agrinexus.notification.dto.NotificationPreferenceRequest;
import com.agrinexus.notification.entity.*;
import com.agrinexus.notification.repository.MarketPriceAlertRuleRepository;
import com.agrinexus.notification.repository.NotificationPreferenceRepository;
import com.agrinexus.notification.repository.NotificationRepository;
import com.agrinexus.notification.service.NotificationService;
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

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Set;

import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
public class NotificationIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private NotificationPreferenceRepository preferenceRepository;

    @Autowired
    private MarketPriceAlertRuleRepository priceAlertRuleRepository;

    @Autowired
    private NotificationService notificationService;

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private com.agrinexus.payment.repository.TransactionRepository transactionRepository;

    @Autowired
    private JobApplicationRepository jobApplicationRepository;

    @Autowired
    private LandParcelRepository landParcelRepository;

    @Autowired
    private LeaseApplicationRepository leaseApplicationRepository;

    @Autowired
    private MarketPriceService marketPriceService;

    private User farmerUser;
    private User workerUser;
    private User landOwnerUser;

    private String farmerToken;
    private String workerToken;
    private String landOwnerToken;

    private static final String FARMER_EMAIL = "notif_farmer@agrinexus.com";
    private static final String WORKER_EMAIL = "notif_worker@agrinexus.com";
    private static final String OWNER_EMAIL = "notif_owner@agrinexus.com";
    private static final String PASSWORD = "Password123!";

    @Autowired
    private com.agrinexus.communication.repository.MessageRepository messageRepository;

    @Autowired
    private com.agrinexus.communication.repository.ConversationParticipantRepository participantRepository;

    @Autowired
    private com.agrinexus.communication.repository.ConversationRepository conversationRepository;

    @BeforeEach
    void setUp() throws Exception {
        messageRepository.deleteAll();
        participantRepository.deleteAll();
        conversationRepository.deleteAll();
        notificationRepository.deleteAll();
        priceAlertRuleRepository.deleteAll();
        preferenceRepository.deleteAll();
        transactionRepository.deleteAll();
        jobApplicationRepository.deleteAll();
        jobRepository.deleteAll();
        leaseApplicationRepository.deleteAll();
        landParcelRepository.deleteAll();

        farmerUser = registerOrGetUser("Ramesh", "Farmer", FARMER_EMAIL, "9848099111");
        farmerToken = loginAndGetToken(FARMER_EMAIL);

        workerUser = registerOrGetUser("Suresh", "Worker", WORKER_EMAIL, "9848099222");
        workerToken = loginAndGetToken(WORKER_EMAIL);

        landOwnerUser = registerOrGetUser("Venkat", "LandOwner", OWNER_EMAIL, "9848099333");
        landOwnerToken = loginAndGetToken(OWNER_EMAIL);
    }

    private User registerOrGetUser(String first, String last, String email, String phone) throws Exception {
        return userRepository.findByEmail(email).orElseGet(() -> {
            try {
                RegisterRequest reg = new RegisterRequest(first, last, email, PASSWORD, phone);
                mockMvc.perform(post("/api/auth/register")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(reg)))
                        .andExpect(status().isCreated());
                return userRepository.findByEmail(email).orElseThrow();
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        });
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

    @Test
    @DisplayName("Test Notification lifecycle: creation, retrieval, pagination, filtering, unread count, mark as read, soft-delete")
    void testNotificationLifecycle() throws Exception {
        // Create sample notifications
        Notification n1 = notificationService.createNotification(
                farmerUser.getId(),
                "Weather Warning",
                "Moderate rain showers expected tomorrow.",
                NotificationType.WEATHER_ALERT,
                NotificationPriority.HIGH,
                "WEATHER",
                null,
                null,
                "TEST_W1"
        ).orElseThrow();

        Notification n2 = notificationService.createNotification(
                farmerUser.getId(),
                "Market Price Rise",
                "Groundnut modal price reached ₹7,500/Qtl.",
                NotificationType.MARKET_PRICE,
                NotificationPriority.NORMAL,
                "MARKET",
                null,
                null,
                "TEST_M1"
        ).orElseThrow();

        // 1. Get Unread Count
        mockMvc.perform(get("/api/notifications/unread-count")
                        .header("Authorization", "Bearer " + farmerToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.count").value(2));

        // 2. Get Notification Summary
        mockMvc.perform(get("/api/notifications/summary")
                        .header("Authorization", "Bearer " + farmerToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.totalUnread").value(2))
                .andExpect(jsonPath("$.data.highPriorityUnread").value(1))
                .andExpect(jsonPath("$.data.latestNotification.title").isNotEmpty());

        // 3. Get Notifications List (Paginated)
        mockMvc.perform(get("/api/notifications?page=0&size=10")
                        .header("Authorization", "Bearer " + farmerToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.content", hasSize(2)))
                .andExpect(jsonPath("$.data.totalElements").value(2));

        // 4. Filter by Priority HIGH
        mockMvc.perform(get("/api/notifications?priority=HIGH")
                        .header("Authorization", "Bearer " + farmerToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.content", hasSize(1)))
                .andExpect(jsonPath("$.data.content[0].type").value("WEATHER_ALERT"));

        // 5. Mark n1 as Read
        mockMvc.perform(patch("/api/notifications/" + n1.getId() + "/read")
                        .header("Authorization", "Bearer " + farmerToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.read").value(true))
                .andExpect(jsonPath("$.data.readAt").isNotEmpty());

        // Verify unread count updated to 1
        mockMvc.perform(get("/api/notifications/unread-count")
                        .header("Authorization", "Bearer " + farmerToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.count").value(1));

        // 6. Mark All as Read
        mockMvc.perform(patch("/api/notifications/read-all")
                        .header("Authorization", "Bearer " + farmerToken))
                .andExpect(status().isOk());

        // Verify unread count is 0
        mockMvc.perform(get("/api/notifications/unread-count")
                        .header("Authorization", "Bearer " + farmerToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.count").value(0));

        // 7. Soft Delete / Dismiss n1
        mockMvc.perform(delete("/api/notifications/" + n1.getId())
                        .header("Authorization", "Bearer " + farmerToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("Notification dismissed successfully"));

        // Active list should now only contain n2
        mockMvc.perform(get("/api/notifications")
                        .header("Authorization", "Bearer " + farmerToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.content", hasSize(1)))
                .andExpect(jsonPath("$.data.content[0].id").value(n2.getId()));
    }

    @Test
    @DisplayName("Test User Isolation: Worker cannot view or modify Farmer's notifications")
    void testUserIsolation() throws Exception {
        Notification farmerNotif = notificationService.createNotification(
                farmerUser.getId(),
                "Farmer Secret Alert",
                "Farm advisory for Ramesh.",
                NotificationType.SYSTEM,
                NotificationPriority.LOW,
                "SYSTEM",
                null,
                null,
                "TEST_SEC_1"
        ).orElseThrow();

        // Worker attempts to read Farmer's notification -> 404 (isolated)
        mockMvc.perform(patch("/api/notifications/" + farmerNotif.getId() + "/read")
                        .header("Authorization", "Bearer " + workerToken))
                .andExpect(status().isNotFound());

        // Worker attempts to delete Farmer's notification -> 404
        mockMvc.perform(delete("/api/notifications/" + farmerNotif.getId())
                        .header("Authorization", "Bearer " + workerToken))
                .andExpect(status().isNotFound());

        // Worker's notification list is empty
        mockMvc.perform(get("/api/notifications")
                        .header("Authorization", "Bearer " + workerToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.content", hasSize(0)));
    }

    @Test
    @DisplayName("Test User Notification Preferences: View, update, and category suppression")
    void testNotificationPreferences() throws Exception {
        // 1. Get default preferences (all true)
        mockMvc.perform(get("/api/notifications/preferences")
                        .header("Authorization", "Bearer " + farmerToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.weatherAlerts").value(true))
                .andExpect(jsonPath("$.data.marketPriceAlerts").value(true))
                .andExpect(jsonPath("$.data.jobAlerts").value(true));

        // 2. Disable Weather Alerts
        NotificationPreferenceRequest updateReq = new NotificationPreferenceRequest();
        updateReq.setWeatherAlerts(false);

        mockMvc.perform(patch("/api/notifications/preferences")
                        .header("Authorization", "Bearer " + farmerToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(updateReq)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.weatherAlerts").value(false))
                .andExpect(jsonPath("$.data.marketPriceAlerts").value(true));

        // 3. Attempt to dispatch a weather notification -> should be suppressed
        var suppressed = notificationService.createNotification(
                farmerUser.getId(),
                "Heavy Rain Alert",
                "Rain storm incoming.",
                NotificationType.WEATHER_ALERT,
                NotificationPriority.CRITICAL,
                "WEATHER",
                null,
                null,
                "WEATHER_DISPATCH_1"
        );

        org.junit.jupiter.api.Assertions.assertTrue(suppressed.isEmpty(), "Suppressed notification should return empty");
    }

    @Test
    @DisplayName("Test Market Price Alert Rules and Crossing Evaluation")
    void testMarketPriceAlertRules() throws Exception {
        // 1. Create Price Alert Rule (Notify when CHILLI climbs ABOVE ₹20,000)
        MarketPriceAlertRuleRequest ruleReq = new MarketPriceAlertRuleRequest(
                "CHILLI",
                "Guntur Chilli Yard",
                new BigDecimal("20000.00"),
                PriceAlertDirection.ABOVE,
                true
        );

        String createResp = mockMvc.perform(post("/api/notifications/price-alerts")
                        .header("Authorization", "Bearer " + farmerToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(ruleReq)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.data.commodity").value("CHILLI"))
                .andExpect(jsonPath("$.data.targetPrice").value(20000.00))
                .andReturn().getResponse().getContentAsString();

        Long ruleId = objectMapper.readTree(createResp).get("data").get("id").asLong();

        // 2. List Price Alert Rules
        mockMvc.perform(get("/api/notifications/price-alerts")
                        .header("Authorization", "Bearer " + farmerToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data", hasSize(1)))
                .andExpect(jsonPath("$.data[0].id").value(ruleId));

        // 3. Ingest Market Price Below Threshold (₹18,500) -> No notification
        marketPriceService.createMarketPrice(new MarketPriceCreateRequest(
                "CHILLI", "Teja", "Guntur Chilli Yard", "Guntur", "Andhra Pradesh",
                new BigDecimal("17000.00"), new BigDecimal("19000.00"), new BigDecimal("18500.00"),
                PriceUnit.PER_QUINTAL, LocalDate.now(), "APMC Yard", "2000 Qtl"
        ));

        mockMvc.perform(get("/api/notifications/unread-count")
                        .header("Authorization", "Bearer " + farmerToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.count").value(0));

        // 4. Ingest Market Price Crossing Above Threshold (₹21,000) -> Triggers Notification!
        marketPriceService.createMarketPrice(new MarketPriceCreateRequest(
                "CHILLI", "Teja", "Guntur Chilli Yard", "Guntur", "Andhra Pradesh",
                new BigDecimal("19500.00"), new BigDecimal("22000.00"), new BigDecimal("21000.00"),
                PriceUnit.PER_QUINTAL, LocalDate.now(), "APMC Yard", "3000 Qtl"
        ));

        mockMvc.perform(get("/api/notifications/unread-count")
                        .header("Authorization", "Bearer " + farmerToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.count").value(1));

        // 5. Ingest another high price (₹21,500) -> Does NOT trigger duplicate notification!
        marketPriceService.createMarketPrice(new MarketPriceCreateRequest(
                "CHILLI", "Teja", "Guntur Chilli Yard", "Guntur", "Andhra Pradesh",
                new BigDecimal("20000.00"), new BigDecimal("23000.00"), new BigDecimal("21500.00"),
                PriceUnit.PER_QUINTAL, LocalDate.now(), "APMC Yard", "3200 Qtl"
        ));

        mockMvc.perform(get("/api/notifications/unread-count")
                        .header("Authorization", "Bearer " + farmerToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.count").value(1)); // Still 1! Deduplicated!

        // 6. Delete Alert Rule
        mockMvc.perform(delete("/api/notifications/price-alerts/" + ruleId)
                        .header("Authorization", "Bearer " + farmerToken))
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("Test Event-Driven Domain Integration: Job application and Land lease events create notifications")
    void testDomainEventsCreateNotifications() throws Exception {
        // 1. Farmer creates Job listing via REST endpoint
        JobCreateRequest jobCreateReq = new JobCreateRequest(
                "Paddy Harvesting Crew Needed",
                "Harvesting 10 acres of paddy",
                JobCategory.HARVESTING,
                "RICE",
                "Tirupati Farm Site",
                "Chittoor",
                "Andhra Pradesh",
                LocalDate.now().plusDays(2),
                LocalDate.now().plusDays(7),
                5,
                3,
                new BigDecimal("800.00"),
                WageType.PER_DAY,
                true,
                true,
                true,
                "Equipment provided",
                "1 year exp",
                Set.of("Harvesting", "Paddy")
        );

        MvcResult jobRes = mockMvc.perform(post("/api/jobs")
                        .header("Authorization", "Bearer " + farmerToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(jobCreateReq)))
                .andExpect(status().isCreated())
                .andReturn();

        Long jobId = objectMapper.readTree(jobRes.getResponse().getContentAsString()).get("data").get("id").asLong();

        // Worker applies for job
        JobApplicationRequest jobAppReq = new JobApplicationRequest("Experienced harvester ready to join.");
        mockMvc.perform(post("/api/jobs/" + jobId + "/applications")
                        .header("Authorization", "Bearer " + workerToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(jobAppReq)))
                .andExpect(status().isCreated());

        // Verify Farmer received "New Job Application Received" notification
        mockMvc.perform(get("/api/notifications?type=JOB_APPLICATION")
                        .header("Authorization", "Bearer " + farmerToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.content", hasSize(1)))
                .andExpect(jsonPath("$.data.content[0].title").value("New Job Application Received"));

        // 2. Land Owner lists Farmland Parcel via REST endpoint
        LandParcelCreateRequest landReq = new LandParcelCreateRequest(
                "Fertile Black Soil Parcel in Guntur",
                "Ideal for cotton and chilli cultivation",
                "Sy.No 120/1",
                "Guntur Agricultural Belt",
                "Guntur",
                "Andhra Pradesh",
                new BigDecimal("12.50"),
                LandSoilType.BLACK_SOIL,
                "Deep Fertile Soil",
                WaterSourceType.BOREWELL,
                "River + Borewell Irrigation",
                false,
                true,
                true,
                false,
                new BigDecimal("35000.00"),
                3,
                "3 Years Commercial",
                "Immediate",
                true,
                "30ft Paved Road",
                "3-Phase Power",
                "Live Hedgerows",
                95,
                Set.of("Cotton", "Chilli", "Paddy")
        );

        MvcResult landRes = mockMvc.perform(post("/api/land")
                        .header("Authorization", "Bearer " + landOwnerToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(landReq)))
                .andExpect(status().isCreated())
                .andReturn();

        Long parcelId = objectMapper.readTree(landRes.getResponse().getContentAsString()).get("data").get("id").asLong();

        // Farmer applies for lease
        LeaseApplicationRequest leaseReq = new LeaseApplicationRequest("COTTON", "1 Year", "Organic farming proposal", new BigDecimal("35000.00"));
        mockMvc.perform(post("/api/land/" + parcelId + "/applications")
                        .header("Authorization", "Bearer " + farmerToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(leaseReq)))
                .andExpect(status().isCreated());

        // Verify Land Owner received "New Land Lease Application" notification
        mockMvc.perform(get("/api/notifications?type=LAND_APPLICATION")
                        .header("Authorization", "Bearer " + landOwnerToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.content", hasSize(1)))
                .andExpect(jsonPath("$.data.content[0].title").value("New Land Lease Application"));
    }
}
