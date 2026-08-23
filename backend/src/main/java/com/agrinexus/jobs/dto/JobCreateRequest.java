package com.agrinexus.jobs.dto;

import com.agrinexus.jobs.entity.JobCategory;
import com.agrinexus.jobs.entity.WageType;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Set;

public class JobCreateRequest {

    @NotBlank(message = "Job title is required")
    @Size(max = 200, message = "Title must not exceed 200 characters")
    private String title;

    @Size(max = 3000, message = "Description must not exceed 3000 characters")
    private String description;

    @NotNull(message = "Job category is required")
    private JobCategory category;

    @Size(max = 100, message = "Crop must not exceed 100 characters")
    private String crop;

    @NotBlank(message = "Location is required")
    @Size(max = 200, message = "Location must not exceed 200 characters")
    private String location;

    @NotBlank(message = "District is required")
    @Size(max = 100, message = "District must not exceed 100 characters")
    private String district;

    @NotBlank(message = "State is required")
    @Size(max = 100, message = "State must not exceed 100 characters")
    private String state;

    @NotNull(message = "Start date is required")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate startDate;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate endDate;

    private Integer estimatedDays;

    @NotNull(message = "Workers required is required")
    @Min(value = 1, message = "At least 1 worker must be required")
    private Integer workersRequired = 1;

    @NotNull(message = "Wage amount is required")
    @PositiveOrZero(message = "Wage must be positive or zero")
    private BigDecimal wage;

    @NotNull(message = "Wage type is required")
    private WageType wageType = WageType.PER_DAY;

    private Boolean accommodationProvided = false;
    private Boolean foodProvided = false;
    private Boolean transportProvided = false;

    @Size(max = 500, message = "Tools provided note must not exceed 500 characters")
    private String toolsProvided;

    @Size(max = 500, message = "Experience required note must not exceed 500 characters")
    private String experienceRequired;

    private Set<String> skills;

    public JobCreateRequest() {
    }

    public JobCreateRequest(String title, String description, JobCategory category, String crop, String location, String district, String state, LocalDate startDate, LocalDate endDate, Integer estimatedDays, Integer workersRequired, BigDecimal wage, WageType wageType, Boolean accommodationProvided, Boolean foodProvided, Boolean transportProvided, String toolsProvided, String experienceRequired, Set<String> skills) {
        this.title = title;
        this.description = description;
        this.category = category;
        this.crop = crop;
        this.location = location;
        this.district = district;
        this.state = state;
        this.startDate = startDate;
        this.endDate = endDate;
        this.estimatedDays = estimatedDays;
        this.workersRequired = workersRequired != null ? workersRequired : 1;
        this.wage = wage;
        this.wageType = wageType != null ? wageType : WageType.PER_DAY;
        this.accommodationProvided = accommodationProvided != null ? accommodationProvided : false;
        this.foodProvided = foodProvided != null ? foodProvided : false;
        this.transportProvided = transportProvided != null ? transportProvided : false;
        this.toolsProvided = toolsProvided;
        this.experienceRequired = experienceRequired;
        this.skills = skills;
    }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public JobCategory getCategory() { return category; }
    public void setCategory(JobCategory category) { this.category = category; }
    public String getCrop() { return crop; }
    public void setCrop(String crop) { this.crop = crop; }
    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }
    public String getDistrict() { return district; }
    public void setDistrict(String district) { this.district = district; }
    public String getState() { return state; }
    public void setState(String state) { this.state = state; }
    public LocalDate getStartDate() { return startDate; }
    public void setStartDate(LocalDate startDate) { this.startDate = startDate; }
    public LocalDate getEndDate() { return endDate; }
    public void setEndDate(LocalDate endDate) { this.endDate = endDate; }
    public Integer getEstimatedDays() { return estimatedDays; }
    public void setEstimatedDays(Integer estimatedDays) { this.estimatedDays = estimatedDays; }
    public Integer getWorkersRequired() { return workersRequired; }
    public void setWorkersRequired(Integer workersRequired) { this.workersRequired = workersRequired; }
    public BigDecimal getWage() { return wage; }
    public void setWage(BigDecimal wage) { this.wage = wage; }
    public WageType getWageType() { return wageType; }
    public void setWageType(WageType wageType) { this.wageType = wageType; }
    public Boolean getAccommodationProvided() { return accommodationProvided; }
    public void setAccommodationProvided(Boolean accommodationProvided) { this.accommodationProvided = accommodationProvided; }
    public Boolean getFoodProvided() { return foodProvided; }
    public void setFoodProvided(Boolean foodProvided) { this.foodProvided = foodProvided; }
    public Boolean getTransportProvided() { return transportProvided; }
    public void setTransportProvided(Boolean transportProvided) { this.transportProvided = transportProvided; }
    public String getToolsProvided() { return toolsProvided; }
    public void setToolsProvided(String toolsProvided) { this.toolsProvided = toolsProvided; }
    public String getExperienceRequired() { return experienceRequired; }
    public void setExperienceRequired(String experienceRequired) { this.experienceRequired = experienceRequired; }
    public Set<String> getSkills() { return skills; }
    public void setSkills(Set<String> skills) { this.skills = skills; }
}
