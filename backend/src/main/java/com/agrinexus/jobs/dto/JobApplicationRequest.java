package com.agrinexus.jobs.dto;

import jakarta.validation.constraints.Size;

public class JobApplicationRequest {

    @Size(max = 1000, message = "Application note must not exceed 1000 characters")
    private String message;

    public JobApplicationRequest() {
    }

    public JobApplicationRequest(String message) {
        this.message = message;
    }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
}
