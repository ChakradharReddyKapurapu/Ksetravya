package com.agrinexus;

import com.agrinexus.auth.dto.LoginRequest;
import com.agrinexus.auth.dto.RegisterRequest;
import com.agrinexus.jobs.dto.*;
import com.agrinexus.jobs.entity.ApplicationStatus;
import com.agrinexus.jobs.entity.JobCategory;
import com.agrinexus.jobs.entity.JobStatus;
import com.agrinexus.jobs.entity.WageType;
import com.agrinexus.jobs.repository.JobApplicationRepository;
import com.agrinexus.jobs.repository.JobRepository;
import com.agrinexus.jobs.repository.WorkerProfileRepository;
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

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Set;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@Transactional
class JobIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private JobApplicationRepository jobApplicationRepository;

    @Autowired
    private WorkerProfileRepository workerProfileRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private ObjectMapper objectMapper;

    private String farmerToken;
    private String workerToken;
    private String otherWorkerToken;
    private String otherFarmerToken;
    private String adminToken;

    private static final String FARMER_EMAIL = "job.farmer@agrinexus.com";
    private static final String WORKER_EMAIL = "job.worker@agrinexus.com";
    private static final String OTHER_WORKER_EMAIL = "job.worker2@agrinexus.com";
    private static final String OTHER_FARMER_EMAIL = "job.farmer2@agrinexus.com";
    private static final String ADMIN_EMAIL = "job.admin@agrinexus.com";
    private static final String PASSWORD = "Password123!";

    @Autowired
    private com.agrinexus.admin.repository.AuditLogRepository auditLogRepository;

    @Autowired
    private com.agrinexus.notification.repository.NotificationRepository notificationRepository;

    @Autowired
    private com.agrinexus.notification.repository.NotificationPreferenceRepository preferenceRepository;

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
        auditLogRepository.deleteAll();
        notificationRepository.deleteAll();
        preferenceRepository.deleteAll();
        jobApplicationRepository.deleteAll();
        jobRepository.deleteAll();
        workerProfileRepository.deleteAll();

        userRepository.findByEmail(FARMER_EMAIL).ifPresent(userRepository::delete);
        userRepository.findByEmail(WORKER_EMAIL).ifPresent(userRepository::delete);
        userRepository.findByEmail(OTHER_WORKER_EMAIL).ifPresent(userRepository::delete);
        userRepository.findByEmail(OTHER_FARMER_EMAIL).ifPresent(userRepository::delete);
        userRepository.findByEmail(ADMIN_EMAIL).ifPresent(userRepository::delete);

        // 1. Register Farmer
        RegisterRequest farmerReg = new RegisterRequest("Venkat", "Rao", FARMER_EMAIL, PASSWORD, "9848011222");
        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(farmerReg)))
                .andExpect(status().isCreated());
        farmerToken = loginAndGetToken(FARMER_EMAIL);

        // 2. Register Worker
        RegisterRequest workerReg = new RegisterRequest("Koti", "Reddy", WORKER_EMAIL, PASSWORD, "9848033444");
        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(workerReg)))
                .andExpect(status().isCreated());
        workerToken = loginAndGetToken(WORKER_EMAIL);

        // 3. Register Other Worker
        RegisterRequest otherWorkerReg = new RegisterRequest("Siva", "Kumar", OTHER_WORKER_EMAIL, PASSWORD, "9848055666");
        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(otherWorkerReg)))
                .andExpect(status().isCreated());
        otherWorkerToken = loginAndGetToken(OTHER_WORKER_EMAIL);

        // 4. Register Other Farmer
        RegisterRequest otherFarmerReg = new RegisterRequest("Narayana", "Murthy", OTHER_FARMER_EMAIL, PASSWORD, "9848077888");
        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(otherFarmerReg)))
                .andExpect(status().isCreated());
        otherFarmerToken = loginAndGetToken(OTHER_FARMER_EMAIL);

        // 5. Create Admin
        User admin = User.builder()
                .firstName("Job")
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

    private Long createSampleJob(String token, String title, JobCategory category, String crop, String district, int workersRequired, BigDecimal wage, Set<String> skills) throws Exception {
        JobCreateRequest req = new JobCreateRequest(
                title,
                "Experienced agricultural team required for time-bound field operation.",
                category,
                crop,
                "Farm Cluster Site",
                district,
                "Andhra Pradesh",
                LocalDate.now().plusDays(5),
                LocalDate.now().plusDays(15),
                10,
                workersRequired,
                wage,
                WageType.PER_DAY,
                true,
                true,
                true,
                "Sickles and safety gear provided",
                "1+ years experience preferred",
                skills
        );

        MvcResult res = mockMvc.perform(post("/api/jobs")
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.success").value(true))
                .andReturn();

        return objectMapper.readTree(res.getResponse().getContentAsString()).get("data").get("id").asLong();
    }

    @Test
    @DisplayName("1. Job Creation, Public Browsing, Filtering and Search")
    void testJobCreationAndCatalog() throws Exception {
        Long j1 = createSampleJob(farmerToken, "Paddy Harvesting Crew", JobCategory.HARVESTING, "Rice", "Guntur", 5, new BigDecimal("650.00"), Set.of("Sickle Cutting", "Bagging"));
        Long j2 = createSampleJob(farmerToken, "Cotton Boll Picking Labor", JobCategory.HARVESTING, "Cotton", "Kurnool", 8, new BigDecimal("580.00"), Set.of("Cotton Picking"));
        Long j3 = createSampleJob(otherFarmerToken, "Tractor Rotavator Driver", JobCategory.TRACTOR_OPERATOR, "Maize", "NTR", 1, new BigDecimal("900.00"), Set.of("Tractor Driving"));

        // Public Catalog
        mockMvc.perform(get("/api/jobs")
                        .param("page", "0")
                        .param("size", "10"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.totalElements").value(3));

        // Category Filter
        mockMvc.perform(get("/api/jobs")
                        .param("category", "TRACTOR_OPERATOR"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.totalElements").value(1))
                .andExpect(jsonPath("$.data.content[0].title").value("Tractor Rotavator Driver"));

        // District Filter
        mockMvc.perform(get("/api/jobs")
                        .param("district", "Guntur"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.totalElements").value(1))
                .andExpect(jsonPath("$.data.content[0].title").value("Paddy Harvesting Crew"));

        // Wage Filter (min 600)
        mockMvc.perform(get("/api/jobs")
                        .param("minWage", "600"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.totalElements").value(2));

        // Search
        mockMvc.perform(get("/api/jobs/search")
                        .param("query", "Cotton"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.content[0].title").value("Cotton Boll Picking Labor"));
    }

    @Test
    @DisplayName("2. Farmer Job Ownership, Update, and Cancellation Protections")
    void testJobOwnershipAndUpdates() throws Exception {
        Long jobId = createSampleJob(farmerToken, "Drip Line Installation", JobCategory.IRRIGATION, "Banana", "Kadapa", 2, new BigDecimal("700.00"), Set.of("Drip Layout"));

        // Farmer views own jobs
        mockMvc.perform(get("/api/jobs/my")
                        .header("Authorization", "Bearer " + farmerToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data[0].id").value(jobId));

        // Other farmer attempts update -> 403 Forbidden
        JobUpdateRequest updateReq = new JobUpdateRequest();
        updateReq.setWage(new BigDecimal("750.00"));
        mockMvc.perform(patch("/api/jobs/" + jobId)
                        .header("Authorization", "Bearer " + otherFarmerToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(updateReq)))
                .andExpect(status().isForbidden());

        // Actual owner updates wage
        mockMvc.perform(patch("/api/jobs/" + jobId)
                        .header("Authorization", "Bearer " + farmerToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(updateReq)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.wage").value(750.00));

        // Cancel job
        mockMvc.perform(patch("/api/jobs/" + jobId + "/cancel")
                        .header("Authorization", "Bearer " + farmerToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.status").value("CANCELLED"));
    }

    @Test
    @DisplayName("3. Worker Profile Management and Recommendations")
    void testWorkerProfileAndRecommendations() throws Exception {
        // Setup Worker Profile
        WorkerProfileUpdateRequest profileReq = new WorkerProfileUpdateRequest();
        profileReq.setSkills(Set.of("Sickle Cutting", "Bagging", "Thresher Feeding"));
        profileReq.setExperienceYears(3);
        profileReq.setPreferredJobTypes(Set.of(JobCategory.HARVESTING));
        profileReq.setPreferredLocations(Set.of("Guntur", "Tenali"));
        profileReq.setDailyWageExpectation(new BigDecimal("600.00"));
        profileReq.setBio("Specialized in wetland paddy sickle cutting and mechanical thresher operation.");

        mockMvc.perform(patch("/api/workers/me")
                        .header("Authorization", "Bearer " + workerToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(profileReq)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.experienceYears").value(3));

        // Create 2 jobs: 1 matching harvesting in Guntur, 1 tractor in NTR
        Long j1 = createSampleJob(farmerToken, "Guntur Paddy Harvest", JobCategory.HARVESTING, "Rice", "Guntur", 4, new BigDecimal("650.00"), Set.of("Sickle Cutting", "Bagging"));
        Long j2 = createSampleJob(otherFarmerToken, "Tractor Driver", JobCategory.TRACTOR_OPERATOR, "Maize", "NTR", 1, new BigDecimal("900.00"), Set.of("Tractor Driving"));

        // Get Recommendations
        MvcResult recRes = mockMvc.perform(get("/api/jobs/recommended")
                        .header("Authorization", "Bearer " + workerToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data").isArray())
                .andReturn();

        JsonNode recs = objectMapper.readTree(recRes.getResponse().getContentAsString()).get("data");
        assertThat(recs.size()).isGreaterThanOrEqualTo(2);

        // Top recommended job should be Guntur Paddy Harvest with high score (100)
        JsonNode topJob = recs.get(0);
        assertThat(topJob.get("job").get("id").asLong()).isEqualTo(j1);
        assertThat(topJob.get("matchScore").asInt()).isEqualTo(100);
        assertThat(topJob.get("matchedFactors").size()).isEqualTo(4);
    }

    @Test
    @DisplayName("4. Worker Application Lifecycle: Apply, Duplicate Protection, Withdrawal")
    void testApplicationLifecycle() throws Exception {
        Long jobId = createSampleJob(farmerToken, "Chilli Picking Labour", JobCategory.VEGETABLE_PICKING, "Chilli", "Guntur", 5, new BigDecimal("550.00"), Set.of("Chilli Picking"));

        // Worker applies
        JobApplicationRequest appReq = new JobApplicationRequest("Experienced in grade-A export chilli picking.");
        MvcResult appRes = mockMvc.perform(post("/api/jobs/" + jobId + "/applications")
                        .header("Authorization", "Bearer " + workerToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(appReq)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.data.status").value("PENDING"))
                .andReturn();

        Long appId = objectMapper.readTree(appRes.getResponse().getContentAsString()).get("data").get("id").asLong();

        // Duplicate Application -> 409 Conflict
        mockMvc.perform(post("/api/jobs/" + jobId + "/applications")
                        .header("Authorization", "Bearer " + workerToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(appReq)))
                .andExpect(status().isConflict());

        // Worker views own applications
        mockMvc.perform(get("/api/jobs/applications/my")
                        .header("Authorization", "Bearer " + workerToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data[0].id").value(appId));

        // Worker withdraws application
        mockMvc.perform(patch("/api/jobs/applications/" + appId + "/withdraw")
                        .header("Authorization", "Bearer " + workerToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.status").value("WITHDRAWN"));
    }

    @Test
    @DisplayName("5. Farmer Acceptance, Worker Slot Allocation and Slot Capacity Protection")
    void testFarmerAcceptanceAndSlotAllocation() throws Exception {
        // Job requiring exactly 1 worker
        Long jobId = createSampleJob(farmerToken, "Tractor Operator Needed", JobCategory.TRACTOR_OPERATOR, "Rice", "Tenali", 1, new BigDecimal("850.00"), Set.of("Tractor Driving"));

        // Worker 1 applies
        MvcResult w1Res = mockMvc.perform(post("/api/jobs/" + jobId + "/applications")
                        .header("Authorization", "Bearer " + workerToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(new JobApplicationRequest("5 years tractor driver"))))
                .andExpect(status().isCreated())
                .andReturn();
        Long w1AppId = objectMapper.readTree(w1Res.getResponse().getContentAsString()).get("data").get("id").asLong();

        // Worker 2 applies
        MvcResult w2Res = mockMvc.perform(post("/api/jobs/" + jobId + "/applications")
                        .header("Authorization", "Bearer " + otherWorkerToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(new JobApplicationRequest("3 years tractor driver"))))
                .andExpect(status().isCreated())
                .andReturn();
        Long w2AppId = objectMapper.readTree(w2Res.getResponse().getContentAsString()).get("data").get("id").asLong();

        // Farmer views applicants
        mockMvc.perform(get("/api/jobs/" + jobId + "/applications")
                        .header("Authorization", "Bearer " + farmerToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.length()").value(2));

        // Farmer accepts Worker 1 -> workersSelected becomes 1 (Job becomes FILLED)
        mockMvc.perform(patch("/api/jobs/applications/" + w1AppId + "/accept")
                        .header("Authorization", "Bearer " + farmerToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.status").value("ACCEPTED"));

        // Verify Job status is FILLED and workersSelected is 1
        mockMvc.perform(get("/api/jobs/" + jobId))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.status").value("FILLED"))
                .andExpect(jsonPath("$.data.workersSelected").value(1));

        // Farmer attempts to accept Worker 2 when capacity is full -> 409 Conflict
        mockMvc.perform(patch("/api/jobs/applications/" + w2AppId + "/accept")
                        .header("Authorization", "Bearer " + farmerToken))
                .andExpect(status().isConflict());

        // Farmer rejects Worker 2
        mockMvc.perform(patch("/api/jobs/applications/" + w2AppId + "/reject")
                        .header("Authorization", "Bearer " + farmerToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.status").value("REJECTED"));
    }
}
