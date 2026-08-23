package com.agrinexus.communication.config;

import com.agrinexus.auth.JwtUtils;
import com.agrinexus.auth.UserPrincipal;
import com.agrinexus.communication.repository.ConversationParticipantRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class WebSocketAuthInterceptor implements ChannelInterceptor {

    private static final Logger log = LoggerFactory.getLogger(WebSocketAuthInterceptor.class);

    private final JwtUtils jwtUtils;
    private final UserDetailsService userDetailsService;
    private final ConversationParticipantRepository participantRepository;

    public WebSocketAuthInterceptor(
            JwtUtils jwtUtils,
            UserDetailsService userDetailsService,
            ConversationParticipantRepository participantRepository) {
        this.jwtUtils = jwtUtils;
        this.userDetailsService = userDetailsService;
        this.participantRepository = participantRepository;
    }

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        StompHeaderAccessor accessor = MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);
        if (accessor == null) {
            return message;
        }

        StompCommand command = accessor.getCommand();

        if (StompCommand.CONNECT.equals(command)) {
            String token = extractToken(accessor);
            if (token != null && jwtUtils.validateJwtToken(token)) {
                String email = jwtUtils.getEmailFromJwtToken(token);
                UserDetails userDetails = userDetailsService.loadUserByUsername(email);
                UsernamePasswordAuthenticationToken auth =
                        new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                try {
                    accessor.setUser(auth);
                } catch (IllegalStateException e) {
                    if (accessor.getSessionAttributes() != null) {
                        accessor.getSessionAttributes().put("user", auth);
                    }
                }
                log.info("WebSocket authenticated user: {}", email);
            } else {
                log.warn("WebSocket CONNECT failed: Invalid or missing JWT token");
                throw new AccessDeniedException("Invalid or missing JWT token for WebSocket connection");
            }
        } else if (StompCommand.SUBSCRIBE.equals(command) || StompCommand.SEND.equals(command)) {
            UsernamePasswordAuthenticationToken auth = (UsernamePasswordAuthenticationToken) accessor.getUser();
            if (auth == null && accessor.getSessionAttributes() != null) {
                auth = (UsernamePasswordAuthenticationToken) accessor.getSessionAttributes().get("user");
            }
            if (auth == null || !(auth.getPrincipal() instanceof UserPrincipal principal)) {
                throw new AccessDeniedException("Unauthenticated STOMP " + command);
            }

            String destination = accessor.getDestination();
            if (destination != null) {
                Long conversationId = extractConversationId(destination);
                if (conversationId != null) {
                    boolean isParticipant = participantRepository.existsByConversationIdAndUserIdAndActiveTrue(
                            conversationId, principal.getId());
                    if (!isParticipant) {
                        log.warn("User {} attempted unauthorized {} to {}", principal.getId(), command, destination);
                        throw new AccessDeniedException("You are not a participant in conversation ID: " + conversationId);
                    }
                }
            }
        }

        return message;
    }

    private String extractToken(StompHeaderAccessor accessor) {
        List<String> authHeaders = accessor.getNativeHeader("Authorization");
        if (authHeaders != null && !authHeaders.isEmpty()) {
            String bearer = authHeaders.get(0);
            if (bearer != null && bearer.startsWith("Bearer ")) {
                return bearer.substring(7);
            }
        }

        List<String> tokenHeaders = accessor.getNativeHeader("token");
        if (tokenHeaders != null && !tokenHeaders.isEmpty()) {
            return tokenHeaders.get(0);
        }

        return null;
    }

    private Long extractConversationId(String destination) {
        // e.g. /topic/conversations/25, /topic/conversations/25/typing, /app/chat/25
        try {
            if (destination.startsWith("/topic/conversations/")) {
                String sub = destination.substring("/topic/conversations/".length());
                int slashIdx = sub.indexOf('/');
                String idStr = slashIdx > 0 ? sub.substring(0, slashIdx) : sub;
                return Long.parseLong(idStr);
            } else if (destination.startsWith("/app/chat/")) {
                String sub = destination.substring("/app/chat/".length());
                int slashIdx = sub.indexOf('/');
                String idStr = slashIdx > 0 ? sub.substring(0, slashIdx) : sub;
                return Long.parseLong(idStr);
            }
        } catch (Exception e) {
            log.trace("Could not parse conversation ID from destination {}", destination);
        }
        return null;
    }
}
