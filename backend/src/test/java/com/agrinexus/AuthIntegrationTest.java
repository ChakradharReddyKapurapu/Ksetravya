package com.agrinexus;

import com.agrinexus.auth.dto.LoginRequest;
import com.agrinexus.auth.dto.RegisterRequest;
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

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@Transactional
class AuthIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private com.agrinexus.farm.repository.FarmRepository farmRepository;

    @Autowired
    private com.agrinexus.tools.repository.ToolRentalRequestRepository rentalRepository;

    @Autowired
    private com.agrinexus.tools.repository.ToolRepository toolRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private ObjectMapper objectMapper;

    private static final String TEST_EMAIL = "auth.test.farmer@example.com";
    private static final String TEST_PASSWORD = "Password123!";

    @BeforeEach
    void setUp() {
        userRepository.findByEmail(TEST_EMAIL).ifPresent(user -> {
            farmRepository.findByUserId(user.getId()).ifPresent(farmRepository::delete);
            toolRepository.findByOwnerIdAndActiveTrueOrderByCreatedAtDesc(user.getId()).forEach(t -> {
                rentalRepository.deleteAll(rentalRepository.findByToolIdWithDetails(t.getId()));
                toolRepository.delete(t);
            });
            userRepository.delete(user);
        });
    }

    @Test
    @DisplayName("1. Successful user registration with default FARMER role and hashed password")
    void testRegistrationSuccess() throws Exception {
        RegisterRequest request = new RegisterRequest(
                "Chakradhar",
                "Reddy",
                TEST_EMAIL,
                TEST_PASSWORD,
                "9876543210"
        );

        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.email").value(TEST_EMAIL))
                .andExpect(jsonPath("$.data.firstName").value("Chakradhar"))
                .andExpect(jsonPath("$.data.lastName").value("Reddy"))
                .andExpect(jsonPath("$.data.fullName").value("Chakradhar Reddy"))
                .andExpect(jsonPath("$.data.role").value("FARMER"))
                .andExpect(jsonPath("$.data.password").doesNotExist());

        // Verify password was securely BCrypt hashed in the database
        User saved = userRepository.findByEmail(TEST_EMAIL).orElseThrow();
        assertThat(saved.getPassword()).isNotEqualTo(TEST_PASSWORD);
        assertThat(passwordEncoder.matches(TEST_PASSWORD, saved.getPassword())).isTrue();
    }

    @Test
    @DisplayName("2. Duplicate registration attempt should return 409 Conflict")
    void testDuplicateEmailRegistration() throws Exception {
        RegisterRequest request = new RegisterRequest(
                "Chakradhar",
                "Reddy",
                TEST_EMAIL,
                TEST_PASSWORD,
                "9876543210"
        );

        // First registration
        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated());

        // Second registration with same email
        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.status").value(409))
                .andExpect(jsonPath("$.error").value("Conflict"))
                .andExpect(jsonPath("$.message").value("An account with this email already exists."));
    }

    @Test
    @DisplayName("3. Login success returns valid Bearer token and safe user payload")
    void testLoginSuccess() throws Exception {
        // Register user
        RegisterRequest registerReq = new RegisterRequest("Chakradhar", "Reddy", TEST_EMAIL, TEST_PASSWORD, "9876543210");
        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(registerReq)))
                .andExpect(status().isCreated());

        // Login
        LoginRequest loginReq = new LoginRequest(TEST_EMAIL, TEST_PASSWORD);
        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(loginReq)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.token").isString())
                .andExpect(jsonPath("$.data.tokenType").value("Bearer"))
                .andExpect(jsonPath("$.data.user.email").value(TEST_EMAIL))
                .andExpect(jsonPath("$.data.user.role").value("FARMER"))
                .andExpect(jsonPath("$.data.user.password").doesNotExist());
    }

    @Test
    @DisplayName("4. Login with invalid password returns 401 Unauthorized")
    void testLoginInvalidPassword() throws Exception {
        // Register user
        RegisterRequest registerReq = new RegisterRequest("Chakradhar", "Reddy", TEST_EMAIL, TEST_PASSWORD, "9876543210");
        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(registerReq)))
                .andExpect(status().isCreated());

        // Login with wrong password
        LoginRequest loginReq = new LoginRequest(TEST_EMAIL, "WrongPassword999!");
        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(loginReq)))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.status").value(401));
    }

    @Test
    @DisplayName("5. GET /api/auth/me without token returns 401 Unauthorized")
    void testGetMeWithoutToken() throws Exception {
        mockMvc.perform(get("/api/auth/me")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.status").value(401));
    }

    @Test
    @DisplayName("6. GET /api/auth/me with valid Bearer token returns current user")
    void testGetMeWithValidToken() throws Exception {
        // Register & Login to get token
        RegisterRequest registerReq = new RegisterRequest("Chakradhar", "Reddy", TEST_EMAIL, TEST_PASSWORD, "9876543210");
        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(registerReq)))
                .andExpect(status().isCreated());

        LoginRequest loginReq = new LoginRequest(TEST_EMAIL, TEST_PASSWORD);
        MvcResult loginResult = mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(loginReq)))
                .andExpect(status().isOk())
                .andReturn();

        JsonNode json = objectMapper.readTree(loginResult.getResponse().getContentAsString());
        String token = json.get("data").get("token").asText();

        // Call /api/auth/me with Bearer token
        mockMvc.perform(get("/api/auth/me")
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.email").value(TEST_EMAIL))
                .andExpect(jsonPath("$.data.fullName").value("Chakradhar Reddy"))
                .andExpect(jsonPath("$.data.role").value("FARMER"));
    }

    @Test
    @DisplayName("7. PATCH /api/users/me allows updating profile names and phone")
    void testUpdateUserProfile() throws Exception {
        // Register & Login
        RegisterRequest registerReq = new RegisterRequest("Chakradhar", "Reddy", TEST_EMAIL, TEST_PASSWORD, "9876543210");
        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(registerReq)))
                .andExpect(status().isCreated());

        LoginRequest loginReq = new LoginRequest(TEST_EMAIL, TEST_PASSWORD);
        MvcResult loginResult = mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(loginReq)))
                .andExpect(status().isOk())
                .andReturn();

        String token = objectMapper.readTree(loginResult.getResponse().getContentAsString())
                .get("data").get("token").asText();

        // Update profile
        String updateJson = "{\"firstName\": \"Venkat\", \"lastName\": \"Rao\", \"phone\": \"9123456780\"}";
        mockMvc.perform(patch("/api/users/me")
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(updateJson))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.firstName").value("Venkat"))
                .andExpect(jsonPath("$.data.lastName").value("Rao"))
                .andExpect(jsonPath("$.data.fullName").value("Venkat Rao"))
                .andExpect(jsonPath("$.data.phone").value("9123456780"));
    }
}
