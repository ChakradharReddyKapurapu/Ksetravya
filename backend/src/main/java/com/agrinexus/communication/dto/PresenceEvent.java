package com.agrinexus.communication.dto;

import java.time.LocalDateTime;

public class PresenceEvent {

    private Long userId;
    private boolean online;
    private LocalDateTime timestamp;

    public PresenceEvent() {
    }

    public PresenceEvent(Long userId, boolean online) {
        this.userId = userId;
        this.online = online;
        this.timestamp = LocalDateTime.now();
    }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public boolean isOnline() { return online; }
    public void setOnline(boolean online) { this.online = online; }

    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }
}
