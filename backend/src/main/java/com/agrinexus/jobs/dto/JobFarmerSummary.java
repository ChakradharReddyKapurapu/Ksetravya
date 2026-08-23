package com.agrinexus.jobs.dto;

import com.agrinexus.user.User;

public class JobFarmerSummary {

    private Long id;
    private String fullName;
    private String email;
    private String phone;

    public JobFarmerSummary() {
    }

    public JobFarmerSummary(Long id, String fullName, String email, String phone) {
        this.id = id;
        this.fullName = fullName;
        this.email = email;
        this.phone = phone;
    }

    public static JobFarmerSummary fromEntity(User user) {
        if (user == null) return null;
        return new JobFarmerSummary(
                user.getId(),
                user.getFullName(),
                user.getEmail(),
                user.getPhone()
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
}
