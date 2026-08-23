package com.agrinexus.notification.handler;

import com.agrinexus.notification.event.*;
import com.agrinexus.notification.service.NotificationService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class NotificationEventListener {

    private final NotificationService notificationService;

    public NotificationEventListener(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @EventListener
    public void handleJobNotification(JobNotificationEvent event) {
        log.debug("Processing JobNotificationEvent for user: {}", event.recipientUserId());
        try {
            notificationService.createNotification(
                    event.recipientUserId(),
                    event.title(),
                    event.message(),
                    event.type(),
                    event.priority(),
                    "JOB",
                    event.jobId(),
                    null,
                    event.idempotencyKey()
            );
        } catch (Exception e) {
            log.error("Failed to process JobNotificationEvent for user {}: {}", event.recipientUserId(), e.getMessage());
        }
    }

    @EventListener
    public void handleLandNotification(LandNotificationEvent event) {
        log.debug("Processing LandNotificationEvent for user: {}", event.recipientUserId());
        try {
            notificationService.createNotification(
                    event.recipientUserId(),
                    event.title(),
                    event.message(),
                    event.type(),
                    event.priority(),
                    "LAND",
                    event.landId(),
                    null,
                    event.idempotencyKey()
            );
        } catch (Exception e) {
            log.error("Failed to process LandNotificationEvent for user {}: {}", event.recipientUserId(), e.getMessage());
        }
    }

    @EventListener
    public void handleOrderNotification(OrderNotificationEvent event) {
        log.debug("Processing OrderNotificationEvent for user: {}", event.recipientUserId());
        try {
            notificationService.createNotification(
                    event.recipientUserId(),
                    event.title(),
                    event.message(),
                    event.type(),
                    event.priority(),
                    "ORDER",
                    event.orderId(),
                    null,
                    event.idempotencyKey()
            );
        } catch (Exception e) {
            log.error("Failed to process OrderNotificationEvent for user {}: {}", event.recipientUserId(), e.getMessage());
        }
    }

    @EventListener
    public void handleWeatherAlert(WeatherAlertEvent event) {
        log.debug("Processing WeatherAlertEvent for user: {}", event.recipientUserId());
        try {
            notificationService.createNotification(
                    event.recipientUserId(),
                    event.title(),
                    event.message(),
                    event.type(),
                    event.priority(),
                    "WEATHER",
                    null,
                    event.expiresAt(),
                    event.idempotencyKey()
            );
        } catch (Exception e) {
            log.error("Failed to process WeatherAlertEvent for user {}: {}", event.recipientUserId(), e.getMessage());
        }
    }

    @EventListener
    public void handleMarketPriceAlert(MarketPriceAlertEvent event) {
        log.debug("Processing MarketPriceAlertEvent for user: {}", event.recipientUserId());
        try {
            notificationService.createNotification(
                    event.recipientUserId(),
                    event.title(),
                    event.message(),
                    event.type(),
                    event.priority(),
                    "MARKET",
                    null,
                    null,
                    event.idempotencyKey()
            );
        } catch (Exception e) {
            log.error("Failed to process MarketPriceAlertEvent for user {}: {}", event.recipientUserId(), e.getMessage());
        }
    }

    @EventListener
    public void handleAnalyticsAlert(AnalyticsAlertEvent event) {
        log.debug("Processing AnalyticsAlertEvent for user: {}", event.recipientUserId());
        try {
            notificationService.createNotification(
                    event.recipientUserId(),
                    event.title(),
                    event.message(),
                    event.type(),
                    event.priority(),
                    "ANALYTICS",
                    null,
                    null,
                    event.idempotencyKey()
            );
        } catch (Exception e) {
            log.error("Failed to process AnalyticsAlertEvent for user {}: {}", event.recipientUserId(), e.getMessage());
        }
    }
}
