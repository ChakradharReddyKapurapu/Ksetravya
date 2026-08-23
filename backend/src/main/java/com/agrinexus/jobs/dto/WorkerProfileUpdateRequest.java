package com.agrinexus.jobs.dto;

import com.agrinexus.jobs.entity.JobCategory;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;
import java.util.Set;

public class WorkerProfileUpdateRequest {

    private Set<String> skills;

    @PositiveOrZero(message = "Experience years must be positive or zero")
    private Integer experienceYears;

    private Set<JobCategory> preferredJobTypes;

    private Set<String> preferredLocations;

    private Boolean availability;

    @Size(max = 1000, message = "Bio must not exceed 1000 characters")
    private String bio;

    @PositiveOrZero(message = "Daily wage expectation must be positive or zero")
    private BigDecimal dailyWageExpectation;

    public WorkerProfileUpdateRequest() {
    }

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
}
