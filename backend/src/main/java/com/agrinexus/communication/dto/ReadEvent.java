package com.agrinexus.communication.dto;

import java.time.LocalDateTime;

public class ReadEvent {

    private Long conversationId;
    private Long userId;
    private LocalDateTime lastReadAt;

    public ReadEvent() {
    }

    public ReadEvent(Long conversationId, Long userId, LocalDateTime lastReadAt) {
        this.conversationId = conversationId;
        this.userId = userId;
        this.lastReadAt = lastReadAt;
    }

    public Long getConversationId() { return conversationId; }
    public void setConversationId(Long conversationId) { this.conversationId = conversationId; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public LocalDateTime getLastReadAt() { return lastReadAt; }
    public void setLastReadAt(LocalDateTime lastReadAt) { this.lastReadAt = lastReadAt; }
}
