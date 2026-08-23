package com.agrinexus.jobs.dto;

import com.agrinexus.jobs.entity.ApplicationStatus;
import com.agrinexus.jobs.entity.JobApplication;
import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDateTime;
import java.util.Set;

public class JobApplicationResponse {

    private Long id;
    private Long jobId;
    private String jobTitle;
    private JobWorkerSummary worker;
    private String message;
    private ApplicationStatus status;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime appliedAt;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime updatedAt;

    public JobApplicationResponse() {
    }

    public JobApplicationResponse(Long id, Long jobId, String jobTitle, JobWorkerSummary worker, String message, ApplicationStatus status, LocalDateTime appliedAt, LocalDateTime updatedAt) {
        this.id = id;
        this.jobId = jobId;
        this.jobTitle = jobTitle;
        this.worker = worker;
        this.message = message;
        this.status = status;
        this.appliedAt = appliedAt;
        this.updatedAt = updatedAt;
    }

    public static JobApplicationResponse fromEntity(JobApplication app, Integer experienceYears, Set<String> skills) {
        if (app == null) return null;
        return new JobApplicationResponse(
                app.getId(),
                app.getJob() != null ? app.getJob().getId() : null,
                app.getJob() != null ? app.getJob().getTitle() : null,
                JobWorkerSummary.fromEntity(app.getWorker(), experienceYears, skills),
                app.getMessage(),
                app.getStatus(),
                app.getAppliedAt(),
                app.getUpdatedAt()
        );
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getJobId() { return jobId; }
    public void setJobId(Long jobId) { this.jobId = jobId; }
    public String getJobTitle() { return jobTitle; }
    public void setJobTitle(String jobTitle) { this.jobTitle = jobTitle; }
    public JobWorkerSummary getWorker() { return worker; }
    public void setWorker(JobWorkerSummary worker) { this.worker = worker; }
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
    public ApplicationStatus getStatus() { return status; }
    public void setStatus(ApplicationStatus status) { this.status = status; }
    public LocalDateTime getAppliedAt() { return appliedAt; }
    public void setAppliedAt(LocalDateTime appliedAt) { this.appliedAt = appliedAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
