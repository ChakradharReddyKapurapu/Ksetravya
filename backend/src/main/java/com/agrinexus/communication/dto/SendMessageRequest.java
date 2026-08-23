package com.agrinexus.communication.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class SendMessageRequest {

    @NotBlank(message = "Message content is required and cannot be empty or blank")
    @Size(max = 5000, message = "Message content must not exceed 5000 characters")
    private String content;

    private String clientMessageId;

    public SendMessageRequest() {
    }

    public SendMessageRequest(String content) {
        this.content = content;
    }

    public SendMessageRequest(String content, String clientMessageId) {
        this.content = content;
        this.clientMessageId = clientMessageId;
    }

    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }

    public String getClientMessageId() { return clientMessageId; }
    public void setClientMessageId(String clientMessageId) { this.clientMessageId = clientMessageId; }
}
