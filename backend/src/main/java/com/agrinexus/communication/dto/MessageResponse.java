package com.agrinexus.communication.dto;

import com.agrinexus.communication.entity.MessageType;
import com.agrinexus.user.Role;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class MessageResponse {

    private Long id;
    private Long conversationId;
    private Long senderId;
    private String senderName;
    private Role senderRole;
    private String content;
    private MessageType messageType;
    private LocalDateTime createdAt;
    private LocalDateTime readAt;
    private boolean deleted;
    private String clientMessageId;
    private List<AttachmentResponse> attachments = new ArrayList<>();

    public MessageResponse() {
    }

    public MessageResponse(Long id, Long conversationId, Long senderId, String senderName, Role senderRole, String content, MessageType messageType, LocalDateTime createdAt, LocalDateTime readAt, boolean deleted) {
        this(id, conversationId, senderId, senderName, senderRole, content, messageType, createdAt, readAt, deleted, null, new ArrayList<>());
    }

    public MessageResponse(Long id, Long conversationId, Long senderId, String senderName, Role senderRole, String content, MessageType messageType, LocalDateTime createdAt, LocalDateTime readAt, boolean deleted, String clientMessageId) {
        this(id, conversationId, senderId, senderName, senderRole, content, messageType, createdAt, readAt, deleted, clientMessageId, new ArrayList<>());
    }

    public MessageResponse(Long id, Long conversationId, Long senderId, String senderName, Role senderRole, String content, MessageType messageType, LocalDateTime createdAt, LocalDateTime readAt, boolean deleted, String clientMessageId, List<AttachmentResponse> attachments) {
        this.id = id;
        this.conversationId = conversationId;
        this.senderId = senderId;
        this.senderName = senderName;
        this.senderRole = senderRole;
        this.content = deleted ? "Message deleted" : content;
        this.messageType = messageType;
        this.createdAt = createdAt;
        this.readAt = readAt;
        this.deleted = deleted;
        this.clientMessageId = clientMessageId;
        this.attachments = attachments != null ? attachments : new ArrayList<>();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getConversationId() { return conversationId; }
    public void setConversationId(Long conversationId) { this.conversationId = conversationId; }

    public Long getSenderId() { return senderId; }
    public void setSenderId(Long senderId) { this.senderId = senderId; }

    public String getSenderName() { return senderName; }
    public void setSenderName(String senderName) { this.senderName = senderName; }

    public Role getSenderRole() { return senderRole; }
    public void setSenderRole(Role senderRole) { this.senderRole = senderRole; }

    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }

    public MessageType getMessageType() { return messageType; }
    public void setMessageType(MessageType messageType) { this.messageType = messageType; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getReadAt() { return readAt; }
    public void setReadAt(LocalDateTime readAt) { this.readAt = readAt; }

    public boolean isDeleted() { return deleted; }
    public void setDeleted(boolean deleted) { this.deleted = deleted; }

    public String getClientMessageId() { return clientMessageId; }
    public void setClientMessageId(String clientMessageId) { this.clientMessageId = clientMessageId; }

    public List<AttachmentResponse> getAttachments() { return attachments; }
    public void setAttachments(List<AttachmentResponse> attachments) { this.attachments = attachments; }
}
