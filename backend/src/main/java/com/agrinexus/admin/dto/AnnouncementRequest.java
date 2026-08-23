package com.agrinexus.admin.dto;

import com.agrinexus.notification.entity.NotificationPriority;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.time.LocalDateTime;

public class AnnouncementRequest {

    @NotBlank(message = "Title is required")
    @Size(max = 200, message = "Title cannot exceed 200 characters")
    private String title;

    @NotBlank(message = "Message is required")
    @Size(max = 2000, message = "Message cannot exceed 2000 characters")
    private String message;

    private NotificationPriority priority = NotificationPriority.NORMAL;

    private LocalDateTime expiresAt;

    public AnnouncementRequest() {
    }

    public AnnouncementRequest(String title, String message, NotificationPriority priority, LocalDateTime expiresAt) {
        this.title = title;
        this.message = message;
        this.priority = priority;
        this.expiresAt = expiresAt;
    }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
    public NotificationPriority getPriority() { return priority; }
    public void setPriority(NotificationPriority priority) { this.priority = priority; }
    public LocalDateTime getExpiresAt() { return expiresAt; }
    public void setExpiresAt(LocalDateTime expiresAt) { this.expiresAt = expiresAt; }
}
