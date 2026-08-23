package com.agrinexus.notification.event;

import com.agrinexus.notification.entity.NotificationPriority;
import com.agrinexus.notification.entity.NotificationType;

import java.time.Instant;

public record WeatherAlertEvent(
        Long recipientUserId,
        String title,
        String message,
        NotificationType type,
        NotificationPriority priority,
        String location,
        Instant expiresAt,
        String idempotencyKey
) {}
