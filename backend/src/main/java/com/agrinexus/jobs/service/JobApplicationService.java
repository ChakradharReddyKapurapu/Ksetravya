package com.agrinexus.jobs.service;

import com.agrinexus.exception.BadRequestException;
import com.agrinexus.exception.DuplicateResourceException;
import com.agrinexus.exception.ResourceNotFoundException;
import com.agrinexus.exception.UnauthorizedException;
import com.agrinexus.jobs.dto.JobApplicationRequest;
import com.agrinexus.jobs.dto.JobApplicationResponse;
import com.agrinexus.jobs.entity.ApplicationStatus;
import com.agrinexus.jobs.entity.Job;
import com.agrinexus.jobs.entity.JobApplication;
import com.agrinexus.jobs.entity.JobStatus;
import com.agrinexus.jobs.entity.WorkerProfile;
import com.agrinexus.jobs.repository.JobApplicationRepository;
import com.agrinexus.jobs.repository.JobRepository;
import com.agrinexus.jobs.repository.WorkerProfileRepository;
import com.agrinexus.user.User;
import com.agrinexus.user.UserRepository;
import com.agrinexus.notification.entity.NotificationPriority;
import com.agrinexus.notification.entity.NotificationType;
import com.agrinexus.notification.event.JobNotificationEvent;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class JobApplicationService {

    private final JobApplicationRepository applicationRepository;
    private final JobRepository jobRepository;
    private final UserRepository userRepository;
    private final WorkerProfileRepository workerProfileRepository;
    private final ApplicationEventPublisher eventPublisher;

    public JobApplicationService(JobApplicationRepository applicationRepository, JobRepository jobRepository, UserRepository userRepository, WorkerProfileRepository workerProfileRepository, ApplicationEventPublisher eventPublisher) {
        this.applicationRepository = applicationRepository;
        this.jobRepository = jobRepository;
        this.userRepository = userRepository;
        this.workerProfileRepository = workerProfileRepository;
        this.eventPublisher = eventPublisher;
    }

    @Transactional
    public JobApplicationResponse applyForJob(String workerEmail, Long jobId, JobApplicationRequest request) {
        User worker = userRepository.findByEmail(workerEmail.toLowerCase().trim())
                .orElseThrow(() -> new UnauthorizedException("Authenticated worker not found"));

        Job job = jobRepository.findByIdAndActiveTrue(jobId)
                .orElseThrow(() -> new ResourceNotFoundException("Job not found with ID: " + jobId));

        if (job.getCreatedBy().getId().equals(worker.getId())) {
            throw new BadRequestException("You cannot apply to your own job listing.");
        }

        if (job.getStatus() != JobStatus.OPEN) {
            throw new BadRequestException("This job is not currently open for new applications (Status: " + job.getStatus() + ").");
        }

        if (job.getWorkersSelected() >= job.getWorkersRequired()) {
            throw new BadRequestException("This job's required worker positions have already been filled.");
        }

        Optional<JobApplication> existingOpt = applicationRepository.findByJobIdAndWorkerId(job.getId(), worker.getId());
        if (existingOpt.isPresent()) {
            JobApplication existing = existingOpt.get();
            if (existing.getStatus() != ApplicationStatus.WITHDRAWN && existing.getStatus() != ApplicationStatus.CANCELLED) {
                throw new DuplicateResourceException("You have already applied for this job.");
            } else {
                existing.setStatus(ApplicationStatus.PENDING);
                existing.setMessage(request != null && request.getMessage() != null ? request.getMessage().trim() : null);
                JobApplication saved = applicationRepository.save(existing);
                return mapToResponse(saved);
            }
        }

        JobApplication application = new JobApplication(
                job,
                worker,
                request != null && request.getMessage() != null ? request.getMessage().trim() : null,
                ApplicationStatus.PENDING
        );

        JobApplication saved = applicationRepository.save(application);

        // Notify job owner (Farmer)
        try {
            eventPublisher.publishEvent(new JobNotificationEvent(
                    job.getCreatedBy().getId(),
                    "New Job Application Received",
                    String.format("%s applied for your '%s' listing.", worker.getFullName() != null ? worker.getFullName() : worker.getEmail(), job.getTitle()),
                    NotificationType.JOB_APPLICATION,
                    NotificationPriority.NORMAL,
                    job.getId(),
                    String.format("JOB_APP:%d:%d", job.getId(), worker.getId())
            ));
        } catch (Exception ignored) {}

        return mapToResponse(saved);
    }

    @Transactional(readOnly = true)
    public List<JobApplicationResponse> getMyApplications(String workerEmail) {
        User worker = userRepository.findByEmail(workerEmail.toLowerCase().trim())
                .orElseThrow(() -> new UnauthorizedException("Authenticated worker not found"));

        return applicationRepository.findByWorkerIdOrderByAppliedAtDesc(worker.getId())
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<JobApplicationResponse> getJobApplications(String farmerEmail, Long jobId, boolean isAdmin) {
        Job job = jobRepository.findByIdAndActiveTrue(jobId)
                .orElseThrow(() -> new ResourceNotFoundException("Job not found with ID: " + jobId));

        if (!isAdmin && !job.getCreatedBy().getEmail().equalsIgnoreCase(farmerEmail.trim())) {
            throw new AccessDeniedException("You do not have permission to view applicants for this job.");
        }

        return applicationRepository.findByJobIdOrderByAppliedAtDesc(job.getId())
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    public JobApplicationResponse acceptApplication(String farmerEmail, Long applicationId, boolean isAdmin) {
        JobApplication application = applicationRepository.findByIdWithDetails(applicationId)
                .orElseThrow(() -> new ResourceNotFoundException("Job application not found with ID: " + applicationId));

        Job job = application.getJob();

        if (!isAdmin && !job.getCreatedBy().getEmail().equalsIgnoreCase(farmerEmail.trim())) {
            throw new AccessDeniedException("You do not have permission to accept applicants for this job.");
        }

        if (application.getStatus() != ApplicationStatus.PENDING) {
            throw new BadRequestException("Only PENDING applications can be accepted. Current status: " + application.getStatus());
        }

        if (job.getWorkersSelected() >= job.getWorkersRequired()) {
            throw new DuplicateResourceException("All required worker slots for this job (" + job.getWorkersRequired() + ") have already been filled.");
        }

        application.setStatus(ApplicationStatus.ACCEPTED);
        applicationRepository.save(application);

        job.setWorkersSelected(job.getWorkersSelected() + 1);
        if (job.getWorkersSelected().equals(job.getWorkersRequired())) {
            job.setStatus(JobStatus.FILLED);
        }
        jobRepository.save(job);

        // Notify applicant (Worker)
        try {
            eventPublisher.publishEvent(new JobNotificationEvent(
                    application.getWorker().getId(),
                    "Job Application Accepted!",
                    String.format("Congratulations! Your application for '%s' was accepted.", job.getTitle()),
                    NotificationType.JOB_ACCEPTED,
                    NotificationPriority.HIGH,
                    job.getId(),
                    String.format("JOB_ACCEPT:%d", application.getId())
            ));
        } catch (Exception ignored) {}

        return mapToResponse(application);
    }

    @Transactional
    public JobApplicationResponse rejectApplication(String farmerEmail, Long applicationId, boolean isAdmin) {
        JobApplication application = applicationRepository.findByIdWithDetails(applicationId)
                .orElseThrow(() -> new ResourceNotFoundException("Job application not found with ID: " + applicationId));

        Job job = application.getJob();

        if (!isAdmin && !job.getCreatedBy().getEmail().equalsIgnoreCase(farmerEmail.trim())) {
            throw new AccessDeniedException("You do not have permission to reject applicants for this job.");
        }

        if (application.getStatus() != ApplicationStatus.PENDING) {
            throw new BadRequestException("Only PENDING applications can be rejected. Current status: " + application.getStatus());
        }

        application.setStatus(ApplicationStatus.REJECTED);
        JobApplication saved = applicationRepository.save(application);

        // Notify applicant (Worker)
        try {
            eventPublisher.publishEvent(new JobNotificationEvent(
                    application.getWorker().getId(),
                    "Job Application Update",
                    String.format("Your application for '%s' was not selected.", job.getTitle()),
                    NotificationType.JOB_REJECTED,
                    NotificationPriority.NORMAL,
                    job.getId(),
                    String.format("JOB_REJECT:%d", application.getId())
            ));
        } catch (Exception ignored) {}

        return mapToResponse(saved);
    }

    @Transactional
    public JobApplicationResponse withdrawApplication(String workerEmail, Long applicationId) {
        User worker = userRepository.findByEmail(workerEmail.toLowerCase().trim())
                .orElseThrow(() -> new UnauthorizedException("Authenticated worker not found"));

        JobApplication application = applicationRepository.findByIdWithDetails(applicationId)
                .orElseThrow(() -> new ResourceNotFoundException("Job application not found with ID: " + applicationId));

        if (!application.getWorker().getId().equals(worker.getId())) {
            throw new AccessDeniedException("You do not have permission to withdraw this application.");
        }

        if (application.getStatus() != ApplicationStatus.PENDING) {
            throw new BadRequestException("Cannot withdraw application in status: " + application.getStatus());
        }

        application.setStatus(ApplicationStatus.WITHDRAWN);
        JobApplication saved = applicationRepository.save(application);
        return mapToResponse(saved);
    }

    private JobApplicationResponse mapToResponse(JobApplication app) {
        WorkerProfile wp = workerProfileRepository.findByUserId(app.getWorker().getId()).orElse(null);
        Integer exp = wp != null ? wp.getExperienceYears() : 0;
        var skills = wp != null ? wp.getSkills() : java.util.Collections.<String>emptySet();
        return JobApplicationResponse.fromEntity(app, exp, skills);
    }
}
