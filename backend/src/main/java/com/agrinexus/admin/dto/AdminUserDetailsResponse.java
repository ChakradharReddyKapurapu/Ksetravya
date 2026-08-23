package com.agrinexus.admin.dto;

import com.agrinexus.user.Role;
import com.agrinexus.user.UserStatus;

import java.time.LocalDateTime;

public class AdminUserDetailsResponse {

    private Long id;
    private String name;
    private String email;
    private String phone;
    private Role role;
    private UserStatus status;
    private boolean enabled;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    private long farmCount;
    private long jobCount;
    private long landParcelCount;
    private long orderCount;

    public AdminUserDetailsResponse() {
    }

    public AdminUserDetailsResponse(Long id, String name, String email, String phone, Role role, UserStatus status, boolean enabled, LocalDateTime createdAt, LocalDateTime updatedAt, long farmCount, long jobCount, long landParcelCount, long orderCount) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.role = role;
        this.status = status;
        this.enabled = enabled;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.farmCount = farmCount;
        this.jobCount = jobCount;
        this.landParcelCount = landParcelCount;
        this.orderCount = orderCount;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    public Role getRole() { return role; }
    public void setRole(Role role) { this.role = role; }
    public UserStatus getStatus() { return status; }
    public void setStatus(UserStatus status) { this.status = status; }
    public boolean isEnabled() { return enabled; }
    public void setEnabled(boolean enabled) { this.enabled = enabled; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
    public long getFarmCount() { return farmCount; }
    public void setFarmCount(long farmCount) { this.farmCount = farmCount; }
    public long getJobCount() { return jobCount; }
    public void setJobCount(long jobCount) { this.jobCount = jobCount; }
    public long getLandParcelCount() { return landParcelCount; }
    public void setLandParcelCount(long landParcelCount) { this.landParcelCount = landParcelCount; }
    public long getOrderCount() { return orderCount; }
    public void setOrderCount(long orderCount) { this.orderCount = orderCount; }
}
