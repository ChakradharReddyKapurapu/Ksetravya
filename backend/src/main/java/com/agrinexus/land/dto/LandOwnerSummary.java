package com.agrinexus.land.dto;

import com.agrinexus.user.User;

public class LandOwnerSummary {

    private Long id;
    private String fullName;
    private String email;
    private String phone;
    private String role;

    public LandOwnerSummary() {
    }

    public LandOwnerSummary(Long id, String fullName, String email, String phone, String role) {
        this.id = id;
        this.fullName = fullName;
        this.email = email;
        this.phone = phone;
        this.role = role;
    }

    public static LandOwnerSummary fromEntity(User user) {
        if (user == null) return null;
        return new LandOwnerSummary(
                user.getId(),
                user.getFullName(),
                user.getEmail(),
                user.getPhone(),
                user.getRole() != null ? user.getRole().name() : null
        );
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
}
