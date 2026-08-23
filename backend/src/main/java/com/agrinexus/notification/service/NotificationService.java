package com.agrinexus.notification.service;

import com.agrinexus.exception.BadRequestException;
import com.agrinexus.exception.ResourceNotFoundException;
import com.agrinexus.notification.dto.NotificationResponse;
import com.agrinexus.notification.dto.NotificationSummaryResponse;
import com.agrinexus.notification.dto.UnreadCountResponse;
import com.agrinexus.notification.entity.Notification;
import com.agrinexus.notification.entity.NotificationPreference;
import com.agrinexus.notification.entity.NotificationPriority;
import com.agrinexus.notification.entity.NotificationType;
import com.agrinexus.notification.repository.NotificationPreferenceRepository;
import com.agrinexus.notification.repository.NotificationRepository;
import com.agrinexus.notification.repository.NotificationSpecification;
import com.agrinexus.user.User;
import com.agrinexus.user.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.Optional;

@Service
@Slf4j
public class NotificationService {

    private final NotificationRepository notificationRepository;
    private final NotificationPreferenceRepository preferenceRepository;
    private final UserRepository userRepository;

    public NotificationService(NotificationRepository notificationRepository, NotificationPreferenceRepository preferenceRepository, UserRepository userRepository) {
        this.notificationRepository = notificationRepository;
        this.preferenceRepository = preferenceRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public Optional<Notification> createNotification(
            Long userId,
            String title,
            String message,
            NotificationType type,
            NotificationPriority priority,
            String refType,
            Long refId,
            Instant expiresAt,
            String idempotencyKey) {

        if (userId == null) {
            log.warn("Cannot create notification with null recipient userId.");
            return Optional.empty();
        }

        // 1. Idempotency Deduplication Check
        if (idempotencyKey != null && !idempotencyKey.trim().isEmpty()) {
            if (notificationRepository.existsByUserIdAndIdempotencyKey(userId, idempotencyKey.trim())) {
                log.debug("Duplicate notification suppressed for user {} with key {}", userId, idempotencyKey);
                return Optional.empty();
            }
        }

        User user = userRepository.findById(userId).orElse(null);
        if (user == null) {
            log.warn("User {} not found for notification dispatch.", userId);
            return Optional.empty();
        }

        // 2. User Notification Preferences Check
        NotificationPreference pref = preferenceRepository.findByUserId(userId)
                .orElseGet(() -> preferenceRepository.save(NotificationPreference.defaultFor(user)));

        if (!isCategoryEnabled(pref, type)) {
            log.debug("Notification type {} suppressed by user {} preferences.", type, userId);
            return Optional.empty();
        }

        Notification notification = Notification.builder()
                .user(user)
                .title(title)
                .message(message)
                .type(type != null ? type : NotificationType.SYSTEM)
                .priority(priority != null ? priority : NotificationPriority.NORMAL)
                .referenceType(refType)
                .referenceId(refId)
                .expiresAt(expiresAt)
                .idempotencyKey(idempotencyKey != null ? idempotencyKey.trim() : null)
                .build();

        Notification saved = notificationRepository.save(notification);
        return Optional.of(saved);
    }

    private boolean isCategoryEnabled(NotificationPreference pref, NotificationType type) {
        if (type == null) return true;
        return switch (type) {
            case JOB_APPLICATION, JOB_ACCEPTED, JOB_REJECTED, JOB_CANCELLED -> pref.isJobAlerts();
            case LAND_APPLICATION, LAND_APPLICATION_ACCEPTED, LAND_APPLICATION_REJECTED, LEASE_STARTED, LEASE_COMPLETED, LEASE_CANCELLED, LEASE_EXPIRING -> pref.isLandLeaseAlerts();
            case MARKET_PRICE, PRICE_CHANGE -> pref.isMarketPriceAlerts();
            case WEATHER_ALERT, WEATHER_FORECAST -> pref.isWeatherAlerts();
            case CROP_INSIGHT, CROP_RISK -> pref.isCropInsights();
            case MARKETPLACE_ORDER, ORDER_STATUS -> pref.isMarketplaceAlerts();
            case MESSAGE_RECEIVED, SYSTEM -> pref.isSystemNotifications();
        };
    }

    @Transactional(readOnly = true)
    public Page<NotificationResponse> getUserNotifications(
            Long userId,
            Boolean read,
            NotificationType type,
            NotificationPriority priority,
            int page,
            int size) {

        if (size > 100) {
            throw new BadRequestException("Maximum page size is 100.");
        }

        Specification<Notification> spec = NotificationSpecification.filter(userId, read, type, priority, false);
        PageRequest pageRequest = PageRequest.of(page, Math.max(size, 1), Sort.by(Sort.Direction.DESC, "createdAt"));

        return notificationRepository.findAll(spec, pageRequest).map(NotificationResponse::fromEntity);
    }

    @Transactional(readOnly = true)
    public UnreadCountResponse getUnreadCount(Long userId) {
        long count = notificationRepository.countUnread(userId, Instant.now());
        return new UnreadCountResponse(count);
    }

    @Transactional(readOnly = true)
    public NotificationSummaryResponse getNotificationSummary(Long userId) {
        Instant now = Instant.now();
        long totalUnread = notificationRepository.countUnread(userId, now);
        long highPriorityUnread = notificationRepository.countUnreadByPriority(userId, now, NotificationPriority.HIGH)
                + notificationRepository.countUnreadByPriority(userId, now, NotificationPriority.CRITICAL);

        Page<Notification> latestPage = notificationRepository.findLatestActive(userId, now, PageRequest.of(0, 1));
        NotificationResponse latest = latestPage.hasContent() ? NotificationResponse.fromEntity(latestPage.getContent().get(0)) : null;

        return new NotificationSummaryResponse(totalUnread, highPriorityUnread, latest);
    }

    @Transactional
    public NotificationResponse markAsRead(Long notificationId, Long userId) {
        Notification notification = notificationRepository.findByIdAndUserIdAndDeletedFalse(notificationId, userId)
                .orElseThrow(() -> new ResourceNotFoundException("Notification not found with ID: " + notificationId));

        notification.markAsRead();
        return NotificationResponse.fromEntity(notification);
    }

    @Transactional
    public int markAllAsRead(Long userId) {
        return notificationRepository.markAllAsRead(userId, Instant.now());
    }

    @Transactional
    public void deleteNotification(Long notificationId, Long userId) {
        Notification notification = notificationRepository.findByIdAndUserIdAndDeletedFalse(notificationId, userId)
                .orElseThrow(() -> new ResourceNotFoundException("Notification not found with ID: " + notificationId));

        notification.softDelete();
    }
}
