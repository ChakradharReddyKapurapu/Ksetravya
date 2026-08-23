package com.agrinexus.notification.event;

import com.agrinexus.notification.entity.NotificationPriority;
import com.agrinexus.notification.entity.NotificationType;

public record JobNotificationEvent(
        Long recipientUserId,
        String title,
        String message,
        NotificationType type,
        NotificationPriority priority,
        Long jobId,
        String idempotencyKey
) {}
