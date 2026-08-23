package com.agrinexus.admin.service;

import com.agrinexus.admin.dto.AnnouncementRequest;
import com.agrinexus.admin.entity.AuditAction;
import com.agrinexus.exception.ResourceNotFoundException;
import com.agrinexus.notification.entity.NotificationType;
import com.agrinexus.notification.service.NotificationService;
import com.agrinexus.user.User;
import com.agrinexus.user.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.time.ZoneId;
import java.util.List;

@Service
public class AdminAnnouncementService {

    private final UserRepository userRepository;
    private final NotificationService notificationService;
    private final AuditLogService auditLogService;

    public AdminAnnouncementService(UserRepository userRepository, NotificationService notificationService, AuditLogService auditLogService) {
        this.userRepository = userRepository;
        this.notificationService = notificationService;
        this.auditLogService = auditLogService;
    }

    @Transactional
    public int broadcastAnnouncement(String adminEmail, AnnouncementRequest request, String ipAddress) {
        User admin = userRepository.findByEmail(adminEmail)
                .orElseThrow(() -> new ResourceNotFoundException("Admin user not found"));

        List<User> allUsers = userRepository.findAll();
        int count = 0;
        Instant expiresInstant = request.getExpiresAt() != null ? request.getExpiresAt().atZone(ZoneId.systemDefault()).toInstant() : null;

        for (User user : allUsers) {
            String idempotencyKey = "ANNOUNCEMENT:" + System.currentTimeMillis() + ":" + user.getId();
            var notif = notificationService.createNotification(
                    user.getId(),
                    request.getTitle(),
                    request.getMessage(),
                    NotificationType.SYSTEM,
                    request.getPriority(),
                    "ANNOUNCEMENT",
                    null,
                    expiresInstant,
                    idempotencyKey
            );
            if (notif.isPresent()) {
                count++;
            }
        }

        auditLogService.logAction(
                admin,
                AuditAction.ANNOUNCEMENT_CREATED,
                "ANNOUNCEMENT",
                null,
                null,
                request.getTitle(),
                "Broadcast to " + count + " users",
                ipAddress
        );

        return count;
    }
}
