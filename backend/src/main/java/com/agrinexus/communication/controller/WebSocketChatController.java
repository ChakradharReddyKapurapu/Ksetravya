package com.agrinexus.communication.controller;

import com.agrinexus.auth.UserPrincipal;
import com.agrinexus.communication.dto.*;
import com.agrinexus.communication.repository.ConversationParticipantRepository;
import com.agrinexus.communication.service.ConversationService;
import com.agrinexus.communication.service.MessageService;
import com.agrinexus.exception.ResourceNotFoundException;
import org.springframework.security.access.AccessDeniedException;
import com.agrinexus.user.User;
import com.agrinexus.user.UserRepository;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Controller;

import java.security.Principal;
import java.time.LocalDateTime;

@Controller
public class WebSocketChatController {

    private static final Logger log = LoggerFactory.getLogger(WebSocketChatController.class);

    private final MessageService messageService;
    private final ConversationService conversationService;
    private final ConversationParticipantRepository participantRepository;
    private final UserRepository userRepository;
    private final SimpMessagingTemplate messagingTemplate;

    public WebSocketChatController(
            MessageService messageService,
            ConversationService conversationService,
            ConversationParticipantRepository participantRepository,
            UserRepository userRepository,
            SimpMessagingTemplate messagingTemplate) {
        this.messageService = messageService;
        this.conversationService = conversationService;
        this.participantRepository = participantRepository;
        this.userRepository = userRepository;
        this.messagingTemplate = messagingTemplate;
    }

    @MessageMapping("/chat/{conversationId}")
    public void sendMessage(
            @DestinationVariable Long conversationId,
            @Valid @Payload SendMessageRequest request,
            Principal principal) {

        if (principal == null) {
            throw new AccessDeniedException("Unauthenticated user");
        }

        String username = getUsername(principal);
        log.info("WebSocket message received for conversation {} from {}", conversationId, username);

        messageService.sendMessage(username, conversationId, request);
    }

    @MessageMapping("/chat/{conversationId}/typing")
    public void handleTyping(
            @DestinationVariable Long conversationId,
            @Payload TypingEvent request,
            Principal principal) {

        if (principal == null) {
            return;
        }

        User user = getUserByPrincipal(principal);
        boolean isParticipant = participantRepository.existsByConversationIdAndUserIdAndActiveTrue(conversationId, user.getId());
        if (!isParticipant) {
            return;
        }

        TypingEvent event = new TypingEvent(
                conversationId,
                user.getId(),
                user.getFullName(),
                request != null && request.isTyping()
        );

        messagingTemplate.convertAndSend("/topic/conversations/" + conversationId + "/typing", event);
    }

    @MessageMapping("/chat/{conversationId}/read")
    public void handleRead(
            @DestinationVariable Long conversationId,
            Principal principal) {

        if (principal == null) {
            return;
        }

        User user = getUserByPrincipal(principal);
        conversationService.markConversationAsRead(user.getEmail(), conversationId);

        ReadEvent event = new ReadEvent(conversationId, user.getId(), LocalDateTime.now());
        messagingTemplate.convertAndSend("/topic/conversations/" + conversationId + "/read", event);
    }

    private String getUsername(Principal principal) {
        if (principal instanceof UsernamePasswordAuthenticationToken auth && auth.getPrincipal() instanceof UserPrincipal u) {
            return u.getUsername();
        }
        return principal.getName();
    }

    private User getUserByPrincipal(Principal principal) {
        String email = getUsername(principal);
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + email));
    }
}
