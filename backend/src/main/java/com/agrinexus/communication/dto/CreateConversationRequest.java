package com.agrinexus.communication.dto;

import com.agrinexus.communication.entity.ConversationType;
import jakarta.validation.constraints.NotNull;

public class CreateConversationRequest {

    private Long jobId;

    @NotNull(message = "Participant ID is required")
    private Long participantId;

    private ConversationType type = ConversationType.JOB;

    public CreateConversationRequest() {
    }

    public CreateConversationRequest(Long jobId, Long participantId, ConversationType type) {
        this.jobId = jobId;
        this.participantId = participantId;
        this.type = type != null ? type : ConversationType.JOB;
    }

    public Long getJobId() { return jobId; }
    public void setJobId(Long jobId) { this.jobId = jobId; }

    public Long getParticipantId() { return participantId; }
    public void setParticipantId(Long participantId) { this.participantId = participantId; }

    public ConversationType getType() { return type; }
    public void setType(ConversationType type) { this.type = type; }
}
