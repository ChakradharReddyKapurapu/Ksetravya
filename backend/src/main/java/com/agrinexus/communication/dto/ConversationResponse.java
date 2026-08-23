package com.agrinexus.communication.dto;

import com.agrinexus.communication.entity.ConversationStatus;
import com.agrinexus.communication.entity.ConversationType;

import java.time.LocalDateTime;
import java.util.List;

public class ConversationResponse {

    private Long id;
    private ConversationType type;
    private Long jobId;
    private String jobTitle;
    private ConversationStatus status;
    private boolean active;
    private LocalDateTime createdAt;
    private LocalDateTime lastMessageAt;
    private long unreadCount;
    private List<ConversationParticipantResponse> participants;
    private MessageResponse lastMessage;

    public ConversationResponse() {
    }

    public ConversationResponse(Long id, ConversationType type, Long jobId, String jobTitle, ConversationStatus status, boolean active, LocalDateTime createdAt, LocalDateTime lastMessageAt, long unreadCount, List<ConversationParticipantResponse> participants, MessageResponse lastMessage) {
        this.id = id;
        this.type = type;
        this.jobId = jobId;
        this.jobTitle = jobTitle;
        this.status = status;
        this.active = active;
        this.createdAt = createdAt;
        this.lastMessageAt = lastMessageAt;
        this.unreadCount = unreadCount;
        this.participants = participants;
        this.lastMessage = lastMessage;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public ConversationType getType() { return type; }
    public void setType(ConversationType type) { this.type = type; }

    public Long getJobId() { return jobId; }
    public void setJobId(Long jobId) { this.jobId = jobId; }

    public String getJobTitle() { return jobTitle; }
    public void setJobTitle(String jobTitle) { this.jobTitle = jobTitle; }

    public ConversationStatus getStatus() { return status; }
    public void setStatus(ConversationStatus status) { this.status = status; }

    public boolean isActive() { return active; }
    public void setActive(boolean active) { this.active = active; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getLastMessageAt() { return lastMessageAt; }
    public void setLastMessageAt(LocalDateTime lastMessageAt) { this.lastMessageAt = lastMessageAt; }

    public long getUnreadCount() { return unreadCount; }
    public void setUnreadCount(long unreadCount) { this.unreadCount = unreadCount; }

    public List<ConversationParticipantResponse> getParticipants() { return participants; }
    public void setParticipants(List<ConversationParticipantResponse> participants) { this.participants = participants; }

    public MessageResponse getLastMessage() { return lastMessage; }
    public void setLastMessage(MessageResponse lastMessage) { this.lastMessage = lastMessage; }
}
