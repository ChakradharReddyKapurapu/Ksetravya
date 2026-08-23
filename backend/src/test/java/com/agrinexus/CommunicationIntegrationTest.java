package com.agrinexus;

import com.agrinexus.admin.repository.AuditLogRepository;
import com.agrinexus.auth.dto.LoginRequest;
import com.agrinexus.auth.dto.RegisterRequest;
import com.agrinexus.communication.dto.CreateConversationRequest;
import com.agrinexus.communication.dto.SendMessageRequest;
import com.agrinexus.communication.entity.ConversationType;
import com.agrinexus.communication.repository.ConversationParticipantRepository;
import com.agrinexus.communication.repository.ConversationRepository;
import com.agrinexus.communication.repository.MessageRepository;
import com.agrinexus.jobs.dto.JobApplicationRequest;
import com.agrinexus.jobs.dto.JobCreateRequest;
import com.agrinexus.jobs.entity.JobCategory;
import com.agrinexus.jobs.entity.WageType;
import com.agrinexus.jobs.repository.JobApplicationRepository;
import com.agrinexus.jobs.repository.JobRepository;
import com.agrinexus.notification.repository.NotificationPreferenceRepository;
import com.agrinexus.notification.repository.NotificationRepository;
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
import java.util.Set;

import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
public class CommunicationIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private JobApplicationRepository jobApplicationRepository;

    @Autowired
    private com.agrinexus.payment.repository.TransactionRepository transactionRepository;

    @Autowired
    private ConversationRepository conversationRepository;

    @Autowired
    private ConversationParticipantRepository participantRepository;

    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private NotificationPreferenceRepository preferenceRepository;

    @Autowired
    private AuditLogRepository auditLogRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    private User farmerUser;
    private User workerUser;
    private User unrelatedWorkerUser;

    private String farmerToken;
    private String workerToken;
    private String unrelatedWorkerToken;

    private static final String FARMER_EMAIL = "comm.farmer@agrinexus.com";
    private static final String WORKER_EMAIL = "comm.worker@agrinexus.com";
    private static final String UNRELATED_WORKER_EMAIL = "comm.unrelated@agrinexus.com";
    private static final String PASSWORD = "Password123!";

    @BeforeEach
    void setUp() throws Exception {
        messageRepository.deleteAll();
        participantRepository.deleteAll();
        conversationRepository.deleteAll();
        transactionRepository.deleteAll();
        jobApplicationRepository.deleteAll();
        jobRepository.deleteAll();
        auditLogRepository.deleteAll();
        notificationRepository.deleteAll();
        preferenceRepository.deleteAll();

        farmerUser = registerOrGetUser("Farmer", "Comm", FARMER_EMAIL, "9848099001");
        farmerToken = loginAndGetToken(FARMER_EMAIL);

        workerUser = registerOrGetUser("Worker", "Comm", WORKER_EMAIL, "9848099002");
        workerToken = loginAndGetToken(WORKER_EMAIL);

        unrelatedWorkerUser = registerOrGetUser("Unrelated", "Worker", UNRELATED_WORKER_EMAIL, "9848099003");
        unrelatedWorkerToken = loginAndGetToken(UNRELATED_WORKER_EMAIL);
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

    private Long createJobAndApply() throws Exception {
        // 1. Farmer creates Job
        JobCreateRequest jobReq = new JobCreateRequest(
                "Harvester Hiring",
                "Need 2 paddy harvesters for 3 days",
                JobCategory.HARVESTING,
                "PADDY",
                "Guntur Rural",
                "Guntur",
                "Andhra Pradesh",
                LocalDate.now().plusDays(1),
                LocalDate.now().plusDays(4),
                2,
                1,
                new BigDecimal("650.00"),
                WageType.PER_DAY,
                true,
                false,
                true,
                "Sickle",
                "None",
                Set.of("Harvesting")
        );

        MvcResult jobRes = mockMvc.perform(post("/api/jobs")
                        .header("Authorization", "Bearer " + farmerToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(jobReq)))
                .andExpect(status().isCreated())
                .andReturn();

        Long jobId = objectMapper.readTree(jobRes.getResponse().getContentAsString()).get("data").get("id").asLong();

        // 2. Worker applies to Job
        JobApplicationRequest appReq = new JobApplicationRequest("Available for harvesting");
        mockMvc.perform(post("/api/jobs/" + jobId + "/applications")
                        .header("Authorization", "Bearer " + workerToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(appReq)))
                .andExpect(status().isCreated());

        return jobId;
    }

    @Test
    @DisplayName("Test Conversation Creation, Duplicate Prevention & Job Relationship Security")
    void testConversationCreationAndDuplicatePrevention() throws Exception {
        Long jobId = createJobAndApply();

        // 1. Attempt conversation with UNRELATED worker who did NOT apply -> 403 Forbidden
        CreateConversationRequest invalidReq = new CreateConversationRequest(jobId, unrelatedWorkerUser.getId(), ConversationType.JOB);
        mockMvc.perform(post("/api/conversations")
                        .header("Authorization", "Bearer " + farmerToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(invalidReq)))
                .andExpect(status().isForbidden());

        // 2. Valid Conversation Creation (Farmer with Applicant Worker) -> 201 Created
        CreateConversationRequest validReq = new CreateConversationRequest(jobId, workerUser.getId(), ConversationType.JOB);
        MvcResult convRes = mockMvc.perform(post("/api/conversations")
                        .header("Authorization", "Bearer " + farmerToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(validReq)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.data.jobId").value(jobId))
                .andExpect(jsonPath("$.data.participants", hasSize(2)))
                .andReturn();

        Long conversationId = objectMapper.readTree(convRes.getResponse().getContentAsString()).get("data").get("id").asLong();

        // 3. Duplicate Prevention: Requesting same conversation returns existing conversation ID
        MvcResult dupRes = mockMvc.perform(post("/api/conversations")
                        .header("Authorization", "Bearer " + farmerToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(validReq)))
                .andExpect(status().isCreated())
                .andReturn();

        Long dupConversationId = objectMapper.readTree(dupRes.getResponse().getContentAsString()).get("data").get("id").asLong();

        org.junit.jupiter.api.Assertions.assertEquals(conversationId, dupConversationId);
    }

    @Test
    @DisplayName("Test Messaging, Unread Count, Read Marking and Soft Deletion")
    void testMessagingFlow() throws Exception {
        Long jobId = createJobAndApply();

        // Create Conversation
        CreateConversationRequest createReq = new CreateConversationRequest(jobId, workerUser.getId(), ConversationType.JOB);
        MvcResult convRes = mockMvc.perform(post("/api/conversations")
                        .header("Authorization", "Bearer " + farmerToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(createReq)))
                .andExpect(status().isCreated())
                .andReturn();

        Long conversationId = objectMapper.readTree(convRes.getResponse().getContentAsString()).get("data").get("id").asLong();

        // 1. Farmer sends message to Worker
        SendMessageRequest msgReq1 = new SendMessageRequest("Can you report at 7:00 AM tomorrow?");
        MvcResult msgRes1 = mockMvc.perform(post("/api/conversations/" + conversationId + "/messages")
                        .header("Authorization", "Bearer " + farmerToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(msgReq1)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.data.content").value("Can you report at 7:00 AM tomorrow?"))
                .andReturn();

        Long messageId1 = objectMapper.readTree(msgRes1.getResponse().getContentAsString()).get("data").get("id").asLong();

        // 2. Worker checks unread count -> 1
        mockMvc.perform(get("/api/conversations/unread-count")
                        .header("Authorization", "Bearer " + workerToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.count").value(1));

        // 3. Worker reads conversation
        mockMvc.perform(patch("/api/conversations/" + conversationId + "/read")
                        .header("Authorization", "Bearer " + workerToken))
                .andExpect(status().isOk());

        // Worker unread count drops to 0
        mockMvc.perform(get("/api/conversations/unread-count")
                        .header("Authorization", "Bearer " + workerToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.count").value(0));

        // 4. Unrelated worker tries to access message history -> 403 Forbidden
        mockMvc.perform(get("/api/conversations/" + conversationId + "/messages")
                        .header("Authorization", "Bearer " + unrelatedWorkerToken))
                .andExpect(status().isForbidden());

        // 5. Worker tries to delete Farmer's message -> 403 Forbidden
        mockMvc.perform(delete("/api/conversations/" + conversationId + "/messages/" + messageId1)
                        .header("Authorization", "Bearer " + workerToken))
                .andExpect(status().isForbidden());

        // 6. Farmer soft deletes own message
        mockMvc.perform(delete("/api/conversations/" + conversationId + "/messages/" + messageId1)
                        .header("Authorization", "Bearer " + farmerToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.content").value("Message deleted"))
                .andExpect(jsonPath("$.data.deleted").value(true));
    }

    @Test
    @DisplayName("Test Inactive/Suspended User Restriction")
    void testInactiveUserRestriction() throws Exception {
        Long jobId = createJobAndApply();
        CreateConversationRequest createReq = new CreateConversationRequest(jobId, workerUser.getId(), ConversationType.JOB);
        MvcResult convRes = mockMvc.perform(post("/api/conversations")
                        .header("Authorization", "Bearer " + farmerToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(createReq)))
                .andExpect(status().isCreated())
                .andReturn();

        Long conversationId = objectMapper.readTree(convRes.getResponse().getContentAsString()).get("data").get("id").asLong();

        // Suspend Farmer
        farmerUser.setStatus(UserStatus.SUSPENDED);
        farmerUser.setEnabled(false);
        userRepository.save(farmerUser);

        // Suspended Farmer attempts to send message -> 400 Bad Request
        SendMessageRequest msgReq = new SendMessageRequest("Attempting message while suspended");
        mockMvc.perform(post("/api/conversations/" + conversationId + "/messages")
                        .header("Authorization", "Bearer " + farmerToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(msgReq)))
                .andExpect(status().isBadRequest());
    }
}
