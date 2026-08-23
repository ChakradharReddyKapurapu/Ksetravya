package com.agrinexus.communication.dto;

import com.agrinexus.user.Role;

import java.time.LocalDateTime;

public class ConversationParticipantResponse {

    private Long id;
    private Long userId;
    private String displayName;
    private Role role;
    private LocalDateTime joinedAt;
    private LocalDateTime lastReadAt;

    public ConversationParticipantResponse() {
    }

    public ConversationParticipantResponse(Long id, Long userId, String displayName, Role role, LocalDateTime joinedAt, LocalDateTime lastReadAt) {
        this.id = id;
        this.userId = userId;
        this.displayName = displayName;
        this.role = role;
        this.joinedAt = joinedAt;
        this.lastReadAt = lastReadAt;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getDisplayName() { return displayName; }
    public void setDisplayName(String displayName) { this.displayName = displayName; }

    public Role getRole() { return role; }
    public void setRole(Role role) { this.role = role; }

    public LocalDateTime getJoinedAt() { return joinedAt; }
    public void setJoinedAt(LocalDateTime joinedAt) { this.joinedAt = joinedAt; }

    public LocalDateTime getLastReadAt() { return lastReadAt; }
    public void setLastReadAt(LocalDateTime lastReadAt) { this.lastReadAt = lastReadAt; }
}
