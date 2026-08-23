package com.agrinexus.notification.event;

import com.agrinexus.notification.entity.NotificationPriority;
import com.agrinexus.notification.entity.NotificationType;

public record OrderNotificationEvent(
        Long recipientUserId,
        String title,
        String message,
        NotificationType type,
        NotificationPriority priority,
        Long orderId,
        String idempotencyKey
) {}
