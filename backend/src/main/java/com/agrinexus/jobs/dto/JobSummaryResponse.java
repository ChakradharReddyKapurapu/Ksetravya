package com.agrinexus.jobs.dto;

import com.agrinexus.jobs.entity.Job;
import com.agrinexus.jobs.entity.JobCategory;
import com.agrinexus.jobs.entity.JobStatus;
import com.agrinexus.jobs.entity.WageType;
import com.fasterxml.jackson.annotation.JsonFormat;

import java.math.BigDecimal;
import java.time.LocalDate;

public class JobSummaryResponse {

    private Long id;
    private String title;
    private JobCategory category;
    private String crop;
    private String location;
    private String district;
    private String state;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate startDate;

    private Integer workersRequired;
    private Integer workersSelected;
    private BigDecimal wage;
    private WageType wageType;
    private JobStatus status;

    public JobSummaryResponse() {
    }

    public JobSummaryResponse(Long id, String title, JobCategory category, String crop, String location, String district, String state, LocalDate startDate, Integer workersRequired, Integer workersSelected, BigDecimal wage, WageType wageType, JobStatus status) {
        this.id = id;
        this.title = title;
        this.category = category;
        this.crop = crop;
        this.location = location;
        this.district = district;
        this.state = state;
        this.startDate = startDate;
        this.workersRequired = workersRequired;
        this.workersSelected = workersSelected;
        this.wage = wage;
        this.wageType = wageType;
        this.status = status;
    }

    public static JobSummaryResponse fromEntity(Job job) {
        if (job == null) return null;
        return new JobSummaryResponse(
                job.getId(),
                job.getTitle(),
                job.getCategory(),
                job.getCrop(),
                job.getLocation(),
                job.getDistrict(),
                job.getState(),
                job.getStartDate(),
                job.getWorkersRequired(),
                job.getWorkersSelected(),
                job.getWage(),
                job.getWageType(),
                job.getStatus()
        );
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
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
    public Integer getWorkersRequired() { return workersRequired; }
    public void setWorkersRequired(Integer workersRequired) { this.workersRequired = workersRequired; }
    public Integer getWorkersSelected() { return workersSelected; }
    public void setWorkersSelected(Integer workersSelected) { this.workersSelected = workersSelected; }
    public BigDecimal getWage() { return wage; }
    public void setWage(BigDecimal wage) { this.wage = wage; }
    public WageType getWageType() { return wageType; }
    public void setWageType(WageType wageType) { this.wageType = wageType; }
    public JobStatus getStatus() { return status; }
    public void setStatus(JobStatus status) { this.status = status; }
}
