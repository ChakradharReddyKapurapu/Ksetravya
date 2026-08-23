package com.agrinexus.jobs.entity;

import com.agrinexus.user.User;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "jobs", indexes = {
    @Index(name = "idx_job_status", columnList = "status"),
    @Index(name = "idx_job_category", columnList = "category"),
    @Index(name = "idx_job_crop", columnList = "crop"),
    @Index(name = "idx_job_district", columnList = "district"),
    @Index(name = "idx_job_state", columnList = "state"),
    @Index(name = "idx_job_start_date", columnList = "start_date"),
    @Index(name = "idx_job_created_by", columnList = "created_by_id"),
    @Index(name = "idx_job_active", columnList = "active")
})
public class Job {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "created_by_id", nullable = false)
    private User createdBy;

    @Column(nullable = false, length = 200)
    private String title;

    @Column(length = 3000)
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 50)
    private JobCategory category;

    @Column(length = 100)
    private String crop;

    @Column(nullable = false, length = 200)
    private String location;

    @Column(nullable = false, length = 100)
    private String district;

    @Column(nullable = false, length = 100)
    private String state;

    @Column(name = "start_date", nullable = false)
    private LocalDate startDate;

    @Column(name = "end_date")
    private LocalDate endDate;

    @Column(name = "estimated_days")
    private Integer estimatedDays;

    @Column(name = "workers_required", nullable = false)
    private Integer workersRequired = 1;

    @Column(name = "workers_selected", nullable = false)
    private Integer workersSelected = 0;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal wage;

    @Enumerated(EnumType.STRING)
    @Column(name = "wage_type", nullable = false, length = 30)
    private WageType wageType = WageType.PER_DAY;

    @Column(name = "accommodation_provided", nullable = false)
    private Boolean accommodationProvided = false;

    @Column(name = "food_provided", nullable = false)
    private Boolean foodProvided = false;

    @Column(name = "transport_provided", nullable = false)
    private Boolean transportProvided = false;

    @Column(name = "tools_provided", length = 500)
    private String toolsProvided;

    @Column(name = "experience_required", length = 500)
    private String experienceRequired;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "job_skills", joinColumns = @JoinColumn(name = "job_id"))
    @Column(name = "skill", length = 100)
    private Set<String> skills = new HashSet<>();

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private JobStatus status = JobStatus.OPEN;

    @Column(nullable = false)
    private Boolean active = true;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    public Job() {
    }

    public Job(Long id, User createdBy, String title, String description, JobCategory category, String crop, String location, String district, String state, LocalDate startDate, LocalDate endDate, Integer estimatedDays, Integer workersRequired, Integer workersSelected, BigDecimal wage, WageType wageType, Boolean accommodationProvided, Boolean foodProvided, Boolean transportProvided, String toolsProvided, String experienceRequired, Set<String> skills, JobStatus status, Boolean active, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.createdBy = createdBy;
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
        this.workersSelected = workersSelected != null ? workersSelected : 0;
        this.wage = wage;
        this.wageType = wageType != null ? wageType : WageType.PER_DAY;
        this.accommodationProvided = accommodationProvided != null ? accommodationProvided : false;
        this.foodProvided = foodProvided != null ? foodProvided : false;
        this.transportProvided = transportProvided != null ? transportProvided : false;
        this.toolsProvided = toolsProvided;
        this.experienceRequired = experienceRequired;
        this.skills = skills != null ? skills : new HashSet<>();
        this.status = status != null ? status : JobStatus.OPEN;
        this.active = active != null ? active : true;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {
        private Long id;
        private User createdBy;
        private String title;
        private String description;
        private JobCategory category;
        private String crop;
        private String location;
        private String district;
        private String state;
        private LocalDate startDate;
        private LocalDate endDate;
        private Integer estimatedDays;
        private Integer workersRequired = 1;
        private Integer workersSelected = 0;
        private BigDecimal wage;
        private WageType wageType = WageType.PER_DAY;
        private Boolean accommodationProvided = false;
        private Boolean foodProvided = false;
        private Boolean transportProvided = false;
        private String toolsProvided;
        private String experienceRequired;
        private Set<String> skills = new HashSet<>();
        private JobStatus status = JobStatus.OPEN;
        private Boolean active = true;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;

        public Builder id(Long id) { this.id = id; return this; }
        public Builder createdBy(User createdBy) { this.createdBy = createdBy; return this; }
        public Builder title(String title) { this.title = title; return this; }
        public Builder description(String description) { this.description = description; return this; }
        public Builder category(JobCategory category) { this.category = category; return this; }
        public Builder crop(String crop) { this.crop = crop; return this; }
        public Builder location(String location) { this.location = location; return this; }
        public Builder district(String district) { this.district = district; return this; }
        public Builder state(String state) { this.state = state; return this; }
        public Builder startDate(LocalDate startDate) { this.startDate = startDate; return this; }
        public Builder endDate(LocalDate endDate) { this.endDate = endDate; return this; }
        public Builder estimatedDays(Integer estimatedDays) { this.estimatedDays = estimatedDays; return this; }
        public Builder workersRequired(Integer workersRequired) { this.workersRequired = workersRequired; return this; }
        public Builder workersSelected(Integer workersSelected) { this.workersSelected = workersSelected; return this; }
        public Builder wage(BigDecimal wage) { this.wage = wage; return this; }
        public Builder wageType(WageType wageType) { this.wageType = wageType; return this; }
        public Builder accommodationProvided(Boolean accommodationProvided) { this.accommodationProvided = accommodationProvided; return this; }
        public Builder foodProvided(Boolean foodProvided) { this.foodProvided = foodProvided; return this; }
        public Builder transportProvided(Boolean transportProvided) { this.transportProvided = transportProvided; return this; }
        public Builder toolsProvided(String toolsProvided) { this.toolsProvided = toolsProvided; return this; }
        public Builder experienceRequired(String experienceRequired) { this.experienceRequired = experienceRequired; return this; }
        public Builder skills(Set<String> skills) { this.skills = skills; return this; }
        public Builder status(JobStatus status) { this.status = status; return this; }
        public Builder active(Boolean active) { this.active = active; return this; }
        public Builder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }
        public Builder updatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; return this; }

        public Job build() {
            return new Job(id, createdBy, title, description, category, crop, location, district, state, startDate, endDate, estimatedDays, workersRequired, workersSelected, wage, wageType, accommodationProvided, foodProvided, transportProvided, toolsProvided, experienceRequired, skills, status, active, createdAt, updatedAt);
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public User getCreatedBy() { return createdBy; }
    public void setCreatedBy(User createdBy) { this.createdBy = createdBy; }
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
    public Boolean getActive() { return active; }
    public void setActive(Boolean active) { this.active = active; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
