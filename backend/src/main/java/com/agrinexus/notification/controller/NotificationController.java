package com.agrinexus.notification.controller;

import com.agrinexus.auth.UserPrincipal;
import com.agrinexus.common.ApiResponse;
import com.agrinexus.notification.dto.NotificationResponse;
import com.agrinexus.notification.dto.NotificationSummaryResponse;
import com.agrinexus.notification.dto.UnreadCountResponse;
import com.agrinexus.notification.entity.NotificationPriority;
import com.agrinexus.notification.entity.NotificationType;
import com.agrinexus.notification.service.NotificationService;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    private final NotificationService notificationService;

    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<Page<NotificationResponse>>> getNotifications(
            @RequestParam(required = false) Boolean read,
            @RequestParam(required = false) NotificationType type,
            @RequestParam(required = false) NotificationPriority priority,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {

        Page<NotificationResponse> response = notificationService.getUserNotifications(
                userPrincipal.getId(), read, type, priority, page, size
        );
        return ResponseEntity.ok(ApiResponse.success("Notifications retrieved successfully", response));
    }

    @GetMapping("/unread-count")
    public ResponseEntity<ApiResponse<UnreadCountResponse>> getUnreadCount(
            @AuthenticationPrincipal UserPrincipal userPrincipal) {

        UnreadCountResponse response = notificationService.getUnreadCount(userPrincipal.getId());
        return ResponseEntity.ok(ApiResponse.success("Unread notification count retrieved", response));
    }

    @GetMapping("/summary")
    public ResponseEntity<ApiResponse<NotificationSummaryResponse>> getNotificationSummary(
            @AuthenticationPrincipal UserPrincipal userPrincipal) {

        NotificationSummaryResponse response = notificationService.getNotificationSummary(userPrincipal.getId());
        return ResponseEntity.ok(ApiResponse.success("Notification summary compiled", response));
    }

    @PatchMapping("/{id}/read")
    public ResponseEntity<ApiResponse<NotificationResponse>> markAsRead(
            @PathVariable Long id,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {

        NotificationResponse response = notificationService.markAsRead(id, userPrincipal.getId());
        return ResponseEntity.ok(ApiResponse.success("Notification marked as read", response));
    }

    @PatchMapping("/read-all")
    public ResponseEntity<ApiResponse<String>> markAllAsRead(
            @AuthenticationPrincipal UserPrincipal userPrincipal) {

        int updatedCount = notificationService.markAllAsRead(userPrincipal.getId());
        return ResponseEntity.ok(ApiResponse.success(String.format("Marked %d notifications as read", updatedCount), "OK"));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<String>> deleteNotification(
            @PathVariable Long id,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {

        notificationService.deleteNotification(id, userPrincipal.getId());
        return ResponseEntity.ok(ApiResponse.success("Notification dismissed successfully", "OK"));
    }
}
