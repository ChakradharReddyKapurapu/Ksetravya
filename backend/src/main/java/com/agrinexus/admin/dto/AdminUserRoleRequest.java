package com.agrinexus.admin.dto;

import com.agrinexus.user.Role;
import jakarta.validation.constraints.NotNull;

public class AdminUserRoleRequest {

    @NotNull(message = "Role is required")
    private Role role;

    private String reason;

    public AdminUserRoleRequest() {
    }

    public AdminUserRoleRequest(Role role, String reason) {
        this.role = role;
        this.reason = reason;
    }

    public Role getRole() { return role; }
    public void setRole(Role role) { this.role = role; }
    public String getReason() { return reason; }
    public void setReason(String reason) { this.reason = reason; }
}
