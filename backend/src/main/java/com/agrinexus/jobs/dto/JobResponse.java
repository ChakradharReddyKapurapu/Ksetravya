package com.agrinexus.jobs.dto;

import com.agrinexus.jobs.entity.Job;
import com.agrinexus.jobs.entity.JobCategory;
import com.agrinexus.jobs.entity.JobStatus;
import com.agrinexus.jobs.entity.WageType;
import com.fasterxml.jackson.annotation.JsonFormat;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Set;

public class JobResponse {

    private Long id;
    private String title;
    private String description;
    private JobCategory category;
    private String crop;
    private String location;
    private String district;
    private String state;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate startDate;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate endDate;

    private Integer estimatedDays;
    private Integer workersRequired;
    private Integer workersSelected;
    private BigDecimal wage;
    private WageType wageType;
    private Boolean accommodationProvided;
    private Boolean foodProvided;
    private Boolean transportProvided;
    private String toolsProvided;
    private String experienceRequired;
    private Set<String> skills;
    private JobStatus status;
    private JobFarmerSummary createdBy;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime createdAt;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime updatedAt;

    public JobResponse() {
    }

    public JobResponse(Long id, String title, String description, JobCategory category, String crop, String location, String district, String state, LocalDate startDate, LocalDate endDate, Integer estimatedDays, Integer workersRequired, Integer workersSelected, BigDecimal wage, WageType wageType, Boolean accommodationProvided, Boolean foodProvided, Boolean transportProvided, String toolsProvided, String experienceRequired, Set<String> skills, JobStatus status, JobFarmerSummary createdBy, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
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
        this.workersRequired = workersRequired;
        this.workersSelected = workersSelected;
        this.wage = wage;
        this.wageType = wageType;
        this.accommodationProvided = accommodationProvided;
        this.foodProvided = foodProvided;
        this.transportProvided = transportProvided;
        this.toolsProvided = toolsProvided;
        this.experienceRequired = experienceRequired;
        this.skills = skills;
        this.status = status;
        this.createdBy = createdBy;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public static JobResponse fromEntity(Job job) {
        if (job == null) return null;
        return new JobResponse(
                job.getId(),
                job.getTitle(),
                job.getDescription(),
                job.getCategory(),
                job.getCrop(),
                job.getLocation(),
                job.getDistrict(),
                job.getState(),
                job.getStartDate(),
                job.getEndDate(),
                job.getEstimatedDays(),
                job.getWorkersRequired(),
                job.getWorkersSelected(),
                job.getWage(),
                job.getWageType(),
                job.getAccommodationProvided(),
                job.getFoodProvided(),
                job.getTransportProvided(),
                job.getToolsProvided(),
                job.getExperienceRequired(),
                job.getSkills(),
                job.getStatus(),
                JobFarmerSummary.fromEntity(job.getCreatedBy()),
                job.getCreatedAt(),
                job.getUpdatedAt()
        );
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
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
    public Integer getWorkersSelected() { return workersSelected; }
    public void setWorkersSelected(Integer workersSelected) { this.workersSelected = workersSelected; }
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
    public JobStatus getStatus() { return status; }
    public void setStatus(JobStatus status) { this.status = status; }
    public JobFarmerSummary getCreatedBy() { return createdBy; }
    public void setCreatedBy(JobFarmerSummary createdBy) { this.createdBy = createdBy; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
