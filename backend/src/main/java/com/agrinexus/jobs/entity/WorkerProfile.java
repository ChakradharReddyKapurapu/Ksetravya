package com.agrinexus.jobs.entity;

import com.agrinexus.user.User;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "worker_profiles", indexes = {
    @Index(name = "idx_wp_user", columnList = "user_id"),
    @Index(name = "idx_wp_avail", columnList = "availability")
})
public class WorkerProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "worker_skills", joinColumns = @JoinColumn(name = "profile_id"))
    @Column(name = "skill", length = 100)
    private Set<String> skills = new HashSet<>();

    @Column(name = "experience_years")
    private Integer experienceYears = 0;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "worker_preferred_job_types", joinColumns = @JoinColumn(name = "profile_id"))
    @Enumerated(EnumType.STRING)
    @Column(name = "job_type", length = 50)
    private Set<JobCategory> preferredJobTypes = new HashSet<>();

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "worker_preferred_locations", joinColumns = @JoinColumn(name = "profile_id"))
    @Column(name = "location", length = 100)
    private Set<String> preferredLocations = new HashSet<>();

    @Column(nullable = false)
    private Boolean availability = true;

    @Column(length = 1000)
    private String bio;

    @Column(name = "daily_wage_expectation", precision = 12, scale = 2)
    private BigDecimal dailyWageExpectation;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    public WorkerProfile() {
    }

    public WorkerProfile(User user) {
        this.user = user;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
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
