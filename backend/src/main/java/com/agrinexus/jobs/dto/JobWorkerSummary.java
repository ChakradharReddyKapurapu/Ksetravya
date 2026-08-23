package com.agrinexus.jobs.dto;

import com.agrinexus.user.User;

import java.util.HashSet;
import java.util.Set;

public class JobWorkerSummary {

    private Long id;
    private String fullName;
    private String email;
    private String phone;
    private Integer experienceYears = 0;
    private Set<String> skills = new HashSet<>();

    public JobWorkerSummary() {
    }

    public JobWorkerSummary(Long id, String fullName, String email, String phone, Integer experienceYears, Set<String> skills) {
        this.id = id;
        this.fullName = fullName;
        this.email = email;
        this.phone = phone;
        this.experienceYears = experienceYears != null ? experienceYears : 0;
        this.skills = skills != null ? skills : new HashSet<>();
    }

    public static JobWorkerSummary fromEntity(User user, Integer experienceYears, Set<String> skills) {
        if (user == null) return null;
        return new JobWorkerSummary(
                user.getId(),
                user.getFullName(),
                user.getEmail(),
                user.getPhone(),
                experienceYears,
                skills
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
    public Integer getExperienceYears() { return experienceYears; }
    public void setExperienceYears(Integer experienceYears) { this.experienceYears = experienceYears; }
    public Set<String> getSkills() { return skills; }
    public void setSkills(Set<String> skills) { this.skills = skills; }
}
