package com.agrinexus.jobs.dto;

import com.agrinexus.jobs.entity.JobCategory;
import com.agrinexus.jobs.entity.WorkerProfile;
import com.fasterxml.jackson.annotation.JsonFormat;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Set;

public class WorkerProfileResponse {

    private Long id;
    private Long userId;
    private String fullName;
    private String email;
    private String phone;
    private Set<String> skills;
    private Integer experienceYears;
    private Set<JobCategory> preferredJobTypes;
    private Set<String> preferredLocations;
    private Boolean availability;
    private String bio;
    private BigDecimal dailyWageExpectation;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime createdAt;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime updatedAt;

    public WorkerProfileResponse() {
    }

    public WorkerProfileResponse(Long id, Long userId, String fullName, String email, String phone, Set<String> skills, Integer experienceYears, Set<JobCategory> preferredJobTypes, Set<String> preferredLocations, Boolean availability, String bio, BigDecimal dailyWageExpectation, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.userId = userId;
        this.fullName = fullName;
        this.email = email;
        this.phone = phone;
        this.skills = skills;
        this.experienceYears = experienceYears;
        this.preferredJobTypes = preferredJobTypes;
        this.preferredLocations = preferredLocations;
        this.availability = availability;
        this.bio = bio;
        this.dailyWageExpectation = dailyWageExpectation;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public static WorkerProfileResponse fromEntity(WorkerProfile wp) {
        if (wp == null) return null;
        return new WorkerProfileResponse(
                wp.getId(),
                wp.getUser() != null ? wp.getUser().getId() : null,
                wp.getUser() != null ? wp.getUser().getFullName() : null,
                wp.getUser() != null ? wp.getUser().getEmail() : null,
                wp.getUser() != null ? wp.getUser().getPhone() : null,
                wp.getSkills(),
                wp.getExperienceYears(),
                wp.getPreferredJobTypes(),
                wp.getPreferredLocations(),
                wp.getAvailability(),
                wp.getBio(),
                wp.getDailyWageExpectation(),
                wp.getCreatedAt(),
                wp.getUpdatedAt()
        );
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    public Set<String> getSkills() { return skills; }
    public void setSkills(Set<String> skills) { this.skills = skills; }
    public Integer getExperienceYears() { return experienceYears; }
    public void setExperienceYears(Integer experienceYears) { this.experienceYears = experienceYears; }
    public Set<JobCategory> getPreferredJobTypes() { return preferredJobTypes; }
    public void setPreferredJobTypes(Set<JobCategory> preferredJobTypes) { this.preferredJobTypes = preferredJobTypes; }
    public Set<String> getPreferredLocations() { return preferredLocations; }
    public void setPreferredLocations(Set<String> preferredLocations) { this.preferredLocations = preferredLocations; }
    public Boolean getAvailability() { return availability; }
    public void setAvailability(Boolean availability) { this.availability = availability; }
    public String getBio() { return bio; }
    public void setBio(String bio) { this.bio = bio; }
    public BigDecimal getDailyWageExpectation() { return dailyWageExpectation; }
    public void setDailyWageExpectation(BigDecimal dailyWageExpectation) { this.dailyWageExpectation = dailyWageExpectation; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
