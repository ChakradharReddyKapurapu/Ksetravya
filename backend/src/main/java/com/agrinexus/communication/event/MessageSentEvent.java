package com.agrinexus.communication.event;

import java.util.List;

public class MessageSentEvent {

    private final Long messageId;
    private final Long conversationId;
    private final Long senderId;
    private final String senderName;
    private final List<Long> recipientIds;
    private final String jobTitle;

    public MessageSentEvent(Long messageId, Long conversationId, Long senderId, String senderName, List<Long> recipientIds, String jobTitle) {
        this.messageId = messageId;
        this.conversationId = conversationId;
        this.senderId = senderId;
        this.senderName = senderName;
        this.recipientIds = recipientIds;
        this.jobTitle = jobTitle;
    }

    public Long getMessageId() { return messageId; }
    public Long getConversationId() { return conversationId; }
    public Long getSenderId() { return senderId; }
    public String getSenderName() { return senderName; }
    public List<Long> getRecipientIds() { return recipientIds; }
    public String getJobTitle() { return jobTitle; }
}
