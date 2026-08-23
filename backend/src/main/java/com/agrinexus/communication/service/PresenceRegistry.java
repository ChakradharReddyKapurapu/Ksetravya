package com.agrinexus.communication.service;

import com.agrinexus.auth.UserPrincipal;
import com.agrinexus.communication.dto.PresenceEvent;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import java.util.Collections;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class PresenceRegistry {

    private static final Logger log = LoggerFactory.getLogger(PresenceRegistry.class);

    private final ConcurrentHashMap<Long, Set<String>> userSessions = new ConcurrentHashMap<>();
    private final SimpMessagingTemplate messagingTemplate;

    public PresenceRegistry(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    @EventListener
    public void handleSessionConnected(SessionConnectedEvent event) {
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(event.getMessage());
        Authentication auth = (Authentication) accessor.getUser();
        if (auth == null || !(auth.getPrincipal() instanceof UserPrincipal principal)) {
            return;
        }

        Long userId = principal.getId();
        String sessionId = accessor.getSessionId();

        userSessions.compute(userId, (key, sessions) -> {
            if (sessions == null) {
                sessions = Collections.newSetFromMap(new ConcurrentHashMap<>());
            }
            boolean wasEmpty = sessions.isEmpty();
            sessions.add(sessionId);
            if (wasEmpty) {
                log.info("User {} is now ONLINE", userId);
                broadcastPresence(userId, true);
            }
            return sessions;
        });
    }

    @EventListener
    public void handleSessionDisconnected(SessionDisconnectEvent event) {
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(event.getMessage());
        Authentication auth = (Authentication) accessor.getUser();
        if (auth == null || !(auth.getPrincipal() instanceof UserPrincipal principal)) {
            return;
        }

        Long userId = principal.getId();
        String sessionId = accessor.getSessionId();

        userSessions.computeIfPresent(userId, (key, sessions) -> {
            sessions.remove(sessionId);
            if (sessions.isEmpty()) {
                log.info("User {} is now OFFLINE", userId);
                broadcastPresence(userId, false);
                return null;
            }
            return sessions;
        });
    }

    public boolean isUserOnline(Long userId) {
        Set<String> sessions = userSessions.get(userId);
        return sessions != null && !sessions.isEmpty();
    }

    private void broadcastPresence(Long userId, boolean online) {
        try {
            messagingTemplate.convertAndSend("/topic/presence", new PresenceEvent(userId, online));
        } catch (Exception e) {
            log.error("Failed to broadcast presence for user {}", userId, e);
        }
    }
}
