package com.agrinexus.notification.dto;

import com.agrinexus.notification.entity.Notification;
import com.agrinexus.notification.entity.NotificationPriority;
import com.agrinexus.notification.entity.NotificationType;

import java.time.Instant;

public class NotificationResponse {

    private Long id;
    private String title;
    private String message;
    private NotificationType type;
    private NotificationPriority priority;
    private String referenceType;
    private Long referenceId;
    private boolean read;
    private Instant readAt;
    private Instant createdAt;
    private Instant expiresAt;

    public NotificationResponse() {
    }

    public NotificationResponse(Long id, String title, String message, NotificationType type, NotificationPriority priority, String referenceType, Long referenceId, boolean read, Instant readAt, Instant createdAt, Instant expiresAt) {
        this.id = id;
        this.title = title;
        this.message = message;
        this.type = type;
        this.priority = priority;
        this.referenceType = referenceType;
        this.referenceId = referenceId;
        this.read = read;
        this.readAt = readAt;
        this.createdAt = createdAt;
        this.expiresAt = expiresAt;
    }

    public static NotificationResponse fromEntity(Notification n) {
        if (n == null) return null;
        return new NotificationResponse(
                n.getId(),
                n.getTitle(),
                n.getMessage(),
                n.getType(),
                n.getPriority(),
                n.getReferenceType(),
                n.getReferenceId(),
                n.isRead(),
                n.getReadAt(),
                n.getCreatedAt(),
                n.getExpiresAt()
        );
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
    public NotificationType getType() { return type; }
    public void setType(NotificationType type) { this.type = type; }
    public NotificationPriority getPriority() { return priority; }
    public void setPriority(NotificationPriority priority) { this.priority = priority; }
    public String getReferenceType() { return referenceType; }
    public void setReferenceType(String referenceType) { this.referenceType = referenceType; }
    public Long getReferenceId() { return referenceId; }
    public void setReferenceId(Long referenceId) { this.referenceId = referenceId; }
    public boolean isRead() { return read; }
    public void setRead(boolean read) { this.read = read; }
    public Instant getReadAt() { return readAt; }
    public void setReadAt(Instant readAt) { this.readAt = readAt; }
    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
    public Instant getExpiresAt() { return expiresAt; }
    public void setExpiresAt(Instant expiresAt) { this.expiresAt = expiresAt; }
}
