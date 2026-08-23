package com.agrinexus;

import com.agrinexus.admin.dto.AdminUserRoleRequest;
import com.agrinexus.admin.dto.AdminUserStatusRequest;
import com.agrinexus.admin.dto.AnnouncementRequest;
import com.agrinexus.admin.repository.AuditLogRepository;
import com.agrinexus.auth.dto.LoginRequest;
import com.agrinexus.auth.dto.RegisterRequest;
import com.agrinexus.jobs.dto.JobCreateRequest;
import com.agrinexus.jobs.entity.JobCategory;
import com.agrinexus.jobs.entity.WageType;
import com.agrinexus.land.dto.LandParcelCreateRequest;
import com.agrinexus.land.entity.LandSoilType;
import com.agrinexus.land.entity.WaterSourceType;
import com.agrinexus.marketplace.dto.ProductCreateRequest;
import com.agrinexus.marketplace.entity.ProductCategory;
import com.agrinexus.marketplace.entity.ProductStatus;
import com.agrinexus.notification.entity.NotificationPriority;
import com.agrinexus.notification.repository.NotificationRepository;
import com.agrinexus.user.Role;
import com.agrinexus.user.User;
import com.agrinexus.user.UserRepository;
import com.agrinexus.user.UserStatus;
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

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Map;
import java.util.Set;

import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
public class AdminIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private AuditLogRepository auditLogRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    private User adminUser;
    private User farmerUser;
    private User workerUser;

    private String adminToken;
    private String farmerToken;
    private String workerToken;

    private static final String ADMIN_EMAIL = "admin_test@agrinexus.com";
    private static final String FARMER_EMAIL = "farmer_test@agrinexus.com";
    private static final String WORKER_EMAIL = "worker_test@agrinexus.com";
    private static final String PASSWORD = "Password123!";

    @BeforeEach
    void setUp() throws Exception {
        auditLogRepository.deleteAll();
        notificationRepository.deleteAll();

        adminUser = userRepository.findByEmail(ADMIN_EMAIL).map(u -> {
            u.setPassword(passwordEncoder.encode(PASSWORD));
            u.setEnabled(true);
            u.setStatus(UserStatus.ACTIVE);
            u.setRole(Role.ADMIN);
            return userRepository.save(u);
        }).orElseGet(() -> {
            User u = new User();
            u.setFirstName("Super");
            u.setLastName("Admin");
            u.setEmail(ADMIN_EMAIL);
            u.setPassword(passwordEncoder.encode(PASSWORD));
            u.setPhone("9999900000");
            u.setRole(Role.ADMIN);
            u.setEnabled(true);
            u.setStatus(UserStatus.ACTIVE);
            return userRepository.save(u);
        });
        adminToken = loginAndGetToken(ADMIN_EMAIL);

        farmerUser = registerOrGetUser("Rao", "Farmer", FARMER_EMAIL, "9848011111");
        farmerToken = loginAndGetToken(FARMER_EMAIL);

        workerUser = registerOrGetUser("Koti", "Worker", WORKER_EMAIL, "9848022222");
        workerToken = loginAndGetToken(WORKER_EMAIL);
    }

    private User registerOrGetUser(String first, String last, String email, String phone) throws Exception {
        return userRepository.findByEmail(email).map(u -> {
            u.setPassword(passwordEncoder.encode(PASSWORD));
            u.setEnabled(true);
            u.setStatus(UserStatus.ACTIVE);
            return userRepository.save(u);
        }).orElseGet(() -> {
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
    @DisplayName("Test Authorization: Admin access granted (200), Farmer/Worker denied (403), Unauthenticated denied (401)")
    void testAdminAuthorization() throws Exception {
        // Admin -> 200 OK
        mockMvc.perform(get("/api/admin/dashboard")
                        .header("Authorization", "Bearer " + adminToken))
                .andExpect(status().isOk());

        // Farmer -> 403 Forbidden
        mockMvc.perform(get("/api/admin/dashboard")
                        .header("Authorization", "Bearer " + farmerToken))
                .andExpect(status().isForbidden());

        // Worker -> 403 Forbidden
        mockMvc.perform(get("/api/admin/dashboard")
                        .header("Authorization", "Bearer " + workerToken))
                .andExpect(status().isForbidden());

        // Unauthenticated -> 401 Unauthorized
        mockMvc.perform(get("/api/admin/dashboard"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    @DisplayName("Test Dashboard and Statistics Endpoints")
    void testDashboardAndStatistics() throws Exception {
        mockMvc.perform(get("/api/admin/dashboard")
                        .header("Authorization", "Bearer " + adminToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.totalUsers").value(greaterThanOrEqualTo(3)))
                .andExpect(jsonPath("$.data.totalAdmins").value(greaterThanOrEqualTo(1)));

        mockMvc.perform(get("/api/admin/statistics")
                        .header("Authorization", "Bearer " + adminToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.userGrowth").exists())
                .andExpect(jsonPath("$.data.jobStats").exists());

        mockMvc.perform(get("/api/admin/statistics/users?timeframe=7D")
                        .header("Authorization", "Bearer " + adminToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.timeframe").value("7D"));
    }

    @Test
    @DisplayName("Test User Management: Search, Details, Status Change, Self-Deactivation Prevention, Role Change")
    void testUserManagement() throws Exception {
        // 1. List users by role FARMER
        mockMvc.perform(get("/api/admin/users?role=FARMER")
                        .header("Authorization", "Bearer " + adminToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.content", hasSize(greaterThanOrEqualTo(1))));

        // 2. Get User Details
        mockMvc.perform(get("/api/admin/users/" + farmerUser.getId())
                        .header("Authorization", "Bearer " + adminToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.email").value(FARMER_EMAIL));

        // 3. Prevent Self-Deactivation
        AdminUserStatusRequest selfDeact = new AdminUserStatusRequest(UserStatus.SUSPENDED, "Testing self-deactivation");
        mockMvc.perform(patch("/api/admin/users/" + adminUser.getId() + "/status")
                        .header("Authorization", "Bearer " + adminToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(selfDeact)))
                .andExpect(status().isBadRequest());

        // 4. Update Farmer Status to SUSPENDED
        AdminUserStatusRequest statusReq = new AdminUserStatusRequest(UserStatus.SUSPENDED, "Violation of terms");
        mockMvc.perform(patch("/api/admin/users/" + farmerUser.getId() + "/status")
                        .header("Authorization", "Bearer " + adminToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(statusReq)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.status").value("SUSPENDED"))
                .andExpect(jsonPath("$.data.enabled").value(false));

        // 5. Update Worker Role to COORDINATOR
        AdminUserRoleRequest roleReq = new AdminUserRoleRequest(Role.COORDINATOR, "Promoted to regional coordinator");
        mockMvc.perform(patch("/api/admin/users/" + workerUser.getId() + "/role")
                        .header("Authorization", "Bearer " + adminToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(roleReq)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.role").value("COORDINATOR"));
    }

    @Test
    @DisplayName("Test Moderation for Jobs, Land, Products, and Seeds")
    void testModeration() throws Exception {
        // Job Creation & Moderation
        JobCreateRequest jobReq = new JobCreateRequest(
                "Spam Job Listing",
                "Invalid test listing",
                JobCategory.OTHER,
                "COTTON",
                "Guntur",
                "Guntur",
                "Andhra Pradesh",
                LocalDate.now().plusDays(1),
                LocalDate.now().plusDays(5),
                4,
                2,
                new BigDecimal("500.00"),
                WageType.PER_DAY,
                true,
                false,
                true,
                "Tools",
                "None",
                Set.of("General")
        );

        MvcResult jobRes = mockMvc.perform(post("/api/jobs")
                        .header("Authorization", "Bearer " + farmerToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(jobReq)))
                .andExpect(status().isCreated())
                .andReturn();

        Long jobId = objectMapper.readTree(jobRes.getResponse().getContentAsString()).get("data").get("id").asLong();

        mockMvc.perform(patch("/api/admin/jobs/" + jobId + "/status")
                        .header("Authorization", "Bearer " + adminToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(Map.of("status", "CANCELLED", "reason", "Spam content"))))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.status").value("CANCELLED"));

        // Land Creation & Moderation
        LandParcelCreateRequest landReq = new LandParcelCreateRequest(
                "Invalid Plot Listing",
                "Fake land plot",
                "Sy.No 99",
                "Vijayawada Belt",
                "Krishna",
                "Andhra Pradesh",
                new BigDecimal("5.00"),
                LandSoilType.ALLUVIAL,
                "Alluvial Soil",
                WaterSourceType.CANAL,
                "Canal Irrigation",
                false,
                false,
                false,
                true,
                new BigDecimal("20000.00"),
                3,
                "1 Year",
                "Immediate",
                true,
                "30ft Road",
                "3-Phase Power",
                "Fenced",
                80,
                Set.of("Paddy")
        );

        MvcResult landRes = mockMvc.perform(post("/api/land")
                        .header("Authorization", "Bearer " + farmerToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(landReq)))
                .andExpect(status().isCreated())
                .andReturn();

        Long landId = objectMapper.readTree(landRes.getResponse().getContentAsString()).get("data").get("id").asLong();

        mockMvc.perform(patch("/api/admin/lands/" + landId + "/status")
                        .header("Authorization", "Bearer " + adminToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(Map.of("status", "INACTIVE", "reason", "Unverified title"))))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.status").value("INACTIVE"));

        // Product Creation & Moderation
        ProductCreateRequest prodReq = new ProductCreateRequest(
                "Fake Fertilizer",
                "Unregistered chemical product",
                ProductCategory.FERTILIZERS,
                "Bio",
                "Brand X",
                new BigDecimal("1200.00"),
                "KG",
                50,
                ProductStatus.ACTIVE,
                "Guntur Agro Market",
                "Guntur",
                "Andhra Pradesh",
                "http://example.com/fertilizer.jpg"
        );

        MvcResult prodRes = mockMvc.perform(post("/api/marketplace/products")
                        .header("Authorization", "Bearer " + farmerToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(prodReq)))
                .andExpect(status().isCreated())
                .andReturn();

        Long prodId = objectMapper.readTree(prodRes.getResponse().getContentAsString()).get("data").get("id").asLong();

        mockMvc.perform(patch("/api/admin/products/" + prodId + "/status")
                        .header("Authorization", "Bearer " + adminToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(Map.of("status", "INACTIVE", "reason", "Banned chemical"))))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.availabilityStatus").value("INACTIVE"));
    }

    @Test
    @DisplayName("Test System Announcement Broadcasting and Audit Logging")
    void testAnnouncementsAndAuditLogs() throws Exception {
        // Broadcast System Announcement
        AnnouncementRequest annReq = new AnnouncementRequest(
                "Scheduled Maintenance Notice",
                "System maintenance window tonight 02:00 AM - 04:00 AM IST.",
                NotificationPriority.HIGH,
                null
        );

        mockMvc.perform(post("/api/admin/announcements")
                        .header("Authorization", "Bearer " + adminToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(annReq)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.data.broadcastedCount", greaterThan(0)));

        // Verify Audit Logs contain ANNOUNCEMENT_CREATED
        mockMvc.perform(get("/api/admin/audit-logs?action=ANNOUNCEMENT_CREATED")
                        .header("Authorization", "Bearer " + adminToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.content", hasSize(greaterThanOrEqualTo(1))))
                .andExpect(jsonPath("$.data.content[0].action").value("ANNOUNCEMENT_CREATED"));
    }
}
