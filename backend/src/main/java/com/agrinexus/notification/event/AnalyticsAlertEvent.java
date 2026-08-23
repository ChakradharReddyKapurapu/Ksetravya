package com.agrinexus.notification.event;

import com.agrinexus.notification.entity.NotificationPriority;
import com.agrinexus.notification.entity.NotificationType;

public record AnalyticsAlertEvent(
        Long recipientUserId,
        String title,
        String message,
        NotificationType type,
        NotificationPriority priority,
        String crop,
        String idempotencyKey
) {}
