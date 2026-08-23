package com.agrinexus.communication.dto;

public class TypingEvent {

    private Long conversationId;
    private Long userId;
    private String displayName;
    private boolean typing;

    public TypingEvent() {
    }

    public TypingEvent(Long conversationId, Long userId, String displayName, boolean typing) {
        this.conversationId = conversationId;
        this.userId = userId;
        this.displayName = displayName;
        this.typing = typing;
    }

    public Long getConversationId() { return conversationId; }
    public void setConversationId(Long conversationId) { this.conversationId = conversationId; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getDisplayName() { return displayName; }
    public void setDisplayName(String displayName) { this.displayName = displayName; }

    public boolean isTyping() { return typing; }
    public void setTyping(boolean typing) { this.typing = typing; }
}
