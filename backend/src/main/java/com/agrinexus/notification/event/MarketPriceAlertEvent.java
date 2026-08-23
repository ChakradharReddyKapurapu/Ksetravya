package com.agrinexus.notification.event;

import com.agrinexus.notification.entity.NotificationPriority;
import com.agrinexus.notification.entity.NotificationType;

import java.math.BigDecimal;

public record MarketPriceAlertEvent(
        Long recipientUserId,
        String title,
        String message,
        NotificationType type,
        NotificationPriority priority,
        String commodity,
        BigDecimal triggerPrice,
        String idempotencyKey
) {}
