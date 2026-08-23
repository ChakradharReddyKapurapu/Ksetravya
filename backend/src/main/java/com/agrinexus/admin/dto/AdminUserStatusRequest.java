package com.agrinexus.admin.dto;

import com.agrinexus.user.UserStatus;
import jakarta.validation.constraints.NotNull;

public class AdminUserStatusRequest {

    @NotNull(message = "Status is required")
    private UserStatus status;

    private String reason;

    public AdminUserStatusRequest() {
    }

    public AdminUserStatusRequest(UserStatus status, String reason) {
        this.status = status;
        this.reason = reason;
    }

    public UserStatus getStatus() { return status; }
    public void setStatus(UserStatus status) { this.status = status; }
    public String getReason() { return reason; }
    public void setReason(String reason) { this.reason = reason; }
}
