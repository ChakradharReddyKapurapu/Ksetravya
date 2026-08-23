package com.agrinexus;

import com.agrinexus.auth.JwtUtils;
import com.agrinexus.auth.UserPrincipal;
import com.agrinexus.communication.config.WebSocketAuthInterceptor;
import com.agrinexus.communication.dto.SendMessageRequest;
import com.agrinexus.communication.dto.TypingEvent;
import com.agrinexus.communication.entity.Conversation;
import com.agrinexus.communication.entity.ConversationParticipant;
import com.agrinexus.communication.entity.ConversationType;
import com.agrinexus.communication.repository.ConversationParticipantRepository;
import com.agrinexus.communication.repository.ConversationRepository;
import com.agrinexus.communication.repository.MessageRepository;
import com.agrinexus.communication.service.PresenceRegistry;
import com.agrinexus.user.Role;
import com.agrinexus.user.User;
import com.agrinexus.user.UserRepository;
import com.agrinexus.user.UserStatus;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.MessageBuilder;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import java.util.Collections;

@SpringBootTest
public class WebSocketCommunicationIntegrationTest {

    @Autowired
    private WebSocketAuthInterceptor authInterceptor;

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ConversationRepository conversationRepository;

    @Autowired
    private ConversationParticipantRepository participantRepository;

    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private PresenceRegistry presenceRegistry;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private MessageChannel clientInboundChannel;

    private User farmerUser;
    private User workerUser;
    private User unrelatedUser;

    private String farmerToken;
    private String workerToken;
    private String unrelatedToken;

    private Conversation conversation;

    @BeforeEach
    void setUp() {
        messageRepository.deleteAll();
        participantRepository.deleteAll();
        conversationRepository.deleteAll();

        farmerUser = getOrCreateUser("Ramesh", "Farmer", "ws.farmer@agrinexus.com", "9848088001", Role.FARMER);
        workerUser = getOrCreateUser("Suri", "Worker", "ws.worker@agrinexus.com", "9848088002", Role.WORKER);
        unrelatedUser = getOrCreateUser("Kalyan", "Unrelated", "ws.unrelated@agrinexus.com", "9848088003", Role.WORKER);

        farmerToken = jwtUtils.generateTokenFromEmail(farmerUser.getEmail(), farmerUser.getId(), farmerUser.getRole().name());
        workerToken = jwtUtils.generateTokenFromEmail(workerUser.getEmail(), workerUser.getId(), workerUser.getRole().name());
        unrelatedToken = jwtUtils.generateTokenFromEmail(unrelatedUser.getEmail(), unrelatedUser.getId(), unrelatedUser.getRole().name());

        conversation = new Conversation(ConversationType.JOB, null);
        conversation = conversationRepository.save(conversation);

        ConversationParticipant p1 = new ConversationParticipant(conversation, farmerUser);
        ConversationParticipant p2 = new ConversationParticipant(conversation, workerUser);
        participantRepository.save(p1);
        participantRepository.save(p2);
    }

    private User getOrCreateUser(String first, String last, String email, String phone, Role role) {
        return userRepository.findByEmail(email).orElseGet(() -> {
            User u = User.builder()
                    .firstName(first)
                    .lastName(last)
                    .email(email)
                    .password(passwordEncoder.encode("Password123!"))
                    .phone(phone)
                    .role(role)
                    .enabled(true)
                    .build();
            u.setStatus(UserStatus.ACTIVE);
            return userRepository.save(u);
        });
    }

    @Test
    @DisplayName("Test STOMP CONNECT Authentication Interceptor")
    void testStompConnectAuthentication() {
        // 1. Valid Token CONNECT -> Success
        StompHeaderAccessor validAccessor = StompHeaderAccessor.create(StompCommand.CONNECT);
        validAccessor.setLeaveMutable(true);
        validAccessor.setNativeHeader("Authorization", "Bearer " + farmerToken);
        Message<byte[]> validMsg = MessageBuilder.createMessage(new byte[0], validAccessor.getMessageHeaders());

        Message<?> result = authInterceptor.preSend(validMsg, clientInboundChannel);
        StompHeaderAccessor resultAccessor = StompHeaderAccessor.wrap(result);

        Assertions.assertNotNull(resultAccessor.getUser());
        Assertions.assertEquals(farmerUser.getEmail(), resultAccessor.getUser().getName());

        // 2. Invalid Token CONNECT -> AccessDeniedException
        StompHeaderAccessor invalidAccessor = StompHeaderAccessor.create(StompCommand.CONNECT);
        invalidAccessor.setLeaveMutable(true);
        invalidAccessor.setNativeHeader("Authorization", "Bearer invalid_token_xyz");
        Message<byte[]> invalidMsg = MessageBuilder.createMessage(new byte[0], invalidAccessor.getMessageHeaders());

        Assertions.assertThrows(AccessDeniedException.class, () -> authInterceptor.preSend(invalidMsg, clientInboundChannel));
    }

    @Test
    @DisplayName("Test STOMP Subscription Security Authorization")
    void testStompSubscriptionSecurity() {
        UserPrincipal farmerPrincipal = UserPrincipal.create(farmerUser);
        UsernamePasswordAuthenticationToken farmerAuth = new UsernamePasswordAuthenticationToken(farmerPrincipal, null, farmerPrincipal.getAuthorities());

        UserPrincipal unrelatedPrincipal = UserPrincipal.create(unrelatedUser);
        UsernamePasswordAuthenticationToken unrelatedAuth = new UsernamePasswordAuthenticationToken(unrelatedPrincipal, null, unrelatedPrincipal.getAuthorities());

        // 1. Authorized Participant Subscribe to /topic/conversations/{convId} -> Success
        StompHeaderAccessor validSubAccessor = StompHeaderAccessor.create(StompCommand.SUBSCRIBE);
        validSubAccessor.setUser(farmerAuth);
        validSubAccessor.setDestination("/topic/conversations/" + conversation.getId());
        Message<byte[]> validSubMsg = MessageBuilder.createMessage(new byte[0], validSubAccessor.getMessageHeaders());

        Assertions.assertDoesNotThrow(() -> authInterceptor.preSend(validSubMsg, clientInboundChannel));

        // 2. Unauthorized User Subscribe to /topic/conversations/{convId} -> AccessDeniedException
        StompHeaderAccessor invalidSubAccessor = StompHeaderAccessor.create(StompCommand.SUBSCRIBE);
        invalidSubAccessor.setUser(unrelatedAuth);
        invalidSubAccessor.setDestination("/topic/conversations/" + conversation.getId());
        Message<byte[]> invalidSubMsg = MessageBuilder.createMessage(new byte[0], invalidSubAccessor.getMessageHeaders());

        Assertions.assertThrows(AccessDeniedException.class, () -> authInterceptor.preSend(invalidSubMsg, clientInboundChannel));
    }

    @Test
    @DisplayName("Test In-Memory Presence Registry Tracking")
    void testPresenceRegistryTracking() {
        UserPrincipal farmerPrincipal = UserPrincipal.create(farmerUser);
        UsernamePasswordAuthenticationToken farmerAuth = new UsernamePasswordAuthenticationToken(farmerPrincipal, null, farmerPrincipal.getAuthorities());

        StompHeaderAccessor accessor = StompHeaderAccessor.create(StompCommand.CONNECT);
        accessor.setUser(farmerAuth);
        accessor.setSessionId("session_12345");

        Message<byte[]> msg = MessageBuilder.createMessage(new byte[0], accessor.getMessageHeaders());
        SessionConnectedEvent connectedEvent = new SessionConnectedEvent(this, msg, farmerAuth);

        // Session Connected -> ONLINE
        presenceRegistry.handleSessionConnected(connectedEvent);
        Assertions.assertTrue(presenceRegistry.isUserOnline(farmerUser.getId()));

        // Session Disconnected -> OFFLINE
        SessionDisconnectEvent disconnectEvent = new SessionDisconnectEvent(this, msg, "session_12345", null);
        presenceRegistry.handleSessionDisconnected(disconnectEvent);
        Assertions.assertFalse(presenceRegistry.isUserOnline(farmerUser.getId()));
    }
}
