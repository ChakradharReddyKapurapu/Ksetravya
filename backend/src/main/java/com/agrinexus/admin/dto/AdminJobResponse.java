package com.agrinexus.admin.dto;

import com.agrinexus.jobs.entity.JobCategory;
import com.agrinexus.jobs.entity.JobStatus;
import com.agrinexus.jobs.entity.WageType;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

public class AdminJobResponse {

    private Long id;
    private String title;
    private String description;
    private JobCategory category;
    private String crop;
    private String location;
    private String district;
    private String state;
    private BigDecimal wage;
    private WageType wageType;
    private Integer workersRequired;
    private Integer workersSelected;
    private JobStatus status;
    private boolean active;
    private Long createdById;
    private String createdByName;
    private String createdByEmail;
    private LocalDateTime createdAt;

    public AdminJobResponse() {
    }

    public AdminJobResponse(Long id, String title, String description, JobCategory category, String crop, String location, String district, String state, BigDecimal wage, WageType wageType, Integer workersRequired, Integer workersSelected, JobStatus status, boolean active, Long createdById, String createdByName, String createdByEmail, LocalDateTime createdAt) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.category = category;
        this.crop = crop;
        this.location = location;
        this.district = district;
        this.state = state;
        this.wage = wage;
        this.wageType = wageType;
        this.workersRequired = workersRequired;
        this.workersSelected = workersSelected;
        this.status = status;
        this.active = active;
        this.createdById = createdById;
        this.createdByName = createdByName;
        this.createdByEmail = createdByEmail;
        this.createdAt = createdAt;
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
    public BigDecimal getWage() { return wage; }
    public void setWage(BigDecimal wage) { this.wage = wage; }
    public WageType getWageType() { return wageType; }
    public void setWageType(WageType wageType) { this.wageType = wageType; }
    public Integer getWorkersRequired() { return workersRequired; }
    public void setWorkersRequired(Integer workersRequired) { this.workersRequired = workersRequired; }
    public Integer getWorkersSelected() { return workersSelected; }
    public void setWorkersSelected(Integer workersSelected) { this.workersSelected = workersSelected; }
    public JobStatus getStatus() { return status; }
    public void setStatus(JobStatus status) { this.status = status; }
    public boolean isActive() { return active; }
    public void setActive(boolean active) { this.active = active; }
    public Long getCreatedById() { return createdById; }
    public void setCreatedById(Long createdById) { this.createdById = createdById; }
    public String getCreatedByName() { return createdByName; }
    public void setCreatedByName(String createdByName) { this.createdByName = createdByName; }
    public String getCreatedByEmail() { return createdByEmail; }
    public void setCreatedByEmail(String createdByEmail) { this.createdByEmail = createdByEmail; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
