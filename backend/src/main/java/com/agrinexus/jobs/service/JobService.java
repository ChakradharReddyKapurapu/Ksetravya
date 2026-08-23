package com.agrinexus.jobs.service;

import com.agrinexus.exception.BadRequestException;
import com.agrinexus.exception.ResourceNotFoundException;
import com.agrinexus.exception.UnauthorizedException;
import com.agrinexus.jobs.dto.JobCreateRequest;
import com.agrinexus.jobs.dto.JobResponse;
import com.agrinexus.jobs.dto.JobUpdateRequest;
import com.agrinexus.jobs.entity.Job;
import com.agrinexus.jobs.entity.JobCategory;
import com.agrinexus.jobs.entity.JobStatus;
import com.agrinexus.jobs.entity.WageType;
import com.agrinexus.jobs.repository.JobRepository;
import com.agrinexus.jobs.repository.JobSpecification;
import com.agrinexus.user.User;
import com.agrinexus.user.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class JobService {

    private final JobRepository jobRepository;
    private final UserRepository userRepository;

    public JobService(JobRepository jobRepository, UserRepository userRepository) {
        this.jobRepository = jobRepository;
        this.userRepository = userRepository;
    }

    @Transactional(readOnly = true)
    public Page<JobResponse> getAllJobs(
            String query,
            String categoryStr,
            String crop,
            String district,
            String state,
            String wageTypeStr,
            BigDecimal minWage,
            BigDecimal maxWage,
            LocalDate startDate,
            Boolean foodProvided,
            Boolean accommodationProvided,
            Boolean transportProvided,
            String statusStr,
            Pageable pageable) {

        JobCategory category = JobCategory.fromString(categoryStr);
        WageType wageType = wageTypeStr != null && !wageTypeStr.trim().isEmpty() && !"all".equalsIgnoreCase(wageTypeStr)
                ? WageType.fromString(wageTypeStr) : null;
        JobStatus status = JobStatus.fromString(statusStr);

        Specification<Job> spec = JobSpecification.filter(
                query, category, crop, district, state, wageType, minWage, maxWage, startDate,
                foodProvided, accommodationProvided, transportProvided, status
        );

        return jobRepository.findAll(spec, pageable).map(JobResponse::fromEntity);
    }

    @Transactional(readOnly = true)
    public JobResponse getJobById(Long id) {
        Job job = jobRepository.findByIdAndActiveTrue(id)
                .orElseThrow(() -> new ResourceNotFoundException("Job not found with ID: " + id));

        return JobResponse.fromEntity(job);
    }

    @Transactional(readOnly = true)
    public Page<JobResponse> searchJobs(String query, Pageable pageable) {
        Specification<Job> spec = JobSpecification.filter(
                query, null, null, null, null, null, null, null, null, null, null, null, null
        );
        return jobRepository.findAll(spec, pageable).map(JobResponse::fromEntity);
    }

    @Transactional(readOnly = true)
    public List<JobResponse> getMyJobs(String farmerEmail) {
        User farmer = userRepository.findByEmail(farmerEmail.toLowerCase().trim())
                .orElseThrow(() -> new UnauthorizedException("Authenticated user not found"));

        return jobRepository.findByCreatedByIdAndActiveTrueOrderByCreatedAtDesc(farmer.getId())
                .stream()
                .map(JobResponse::fromEntity)
                .collect(Collectors.toList());
    }

    @Transactional
    public JobResponse createJob(String farmerEmail, JobCreateRequest request) {
        User farmer = userRepository.findByEmail(farmerEmail.toLowerCase().trim())
                .orElseThrow(() -> new UnauthorizedException("Authenticated user not found"));

        if (request.getEndDate() != null && request.getEndDate().isBefore(request.getStartDate())) {
            throw new BadRequestException("End date cannot be prior to start date.");
        }

        Job job = Job.builder()
                .createdBy(farmer)
                .title(request.getTitle().trim())
                .description(request.getDescription() != null ? request.getDescription().trim() : null)
                .category(request.getCategory())
                .crop(request.getCrop() != null ? request.getCrop().trim() : null)
                .location(request.getLocation().trim())
                .district(request.getDistrict().trim())
                .state(request.getState().trim())
                .startDate(request.getStartDate())
                .endDate(request.getEndDate())
                .estimatedDays(request.getEstimatedDays())
                .workersRequired(request.getWorkersRequired() != null ? request.getWorkersRequired() : 1)
                .workersSelected(0)
                .wage(request.getWage())
                .wageType(request.getWageType() != null ? request.getWageType() : WageType.PER_DAY)
                .accommodationProvided(request.getAccommodationProvided() != null ? request.getAccommodationProvided() : false)
                .foodProvided(request.getFoodProvided() != null ? request.getFoodProvided() : false)
                .transportProvided(request.getTransportProvided() != null ? request.getTransportProvided() : false)
                .toolsProvided(request.getToolsProvided() != null ? request.getToolsProvided().trim() : null)
                .experienceRequired(request.getExperienceRequired() != null ? request.getExperienceRequired().trim() : null)
                .skills(request.getSkills())
                .status(JobStatus.OPEN)
                .active(true)
                .build();

        Job saved = jobRepository.save(job);
        return JobResponse.fromEntity(saved);
    }

    @Transactional
    public JobResponse updateJob(String farmerEmail, Long id, JobUpdateRequest request, boolean isAdmin) {
        Job job = jobRepository.findByIdAndActiveTrue(id)
                .orElseThrow(() -> new ResourceNotFoundException("Job not found with ID: " + id));

        if (!isAdmin && !job.getCreatedBy().getEmail().equalsIgnoreCase(farmerEmail.trim())) {
            throw new AccessDeniedException("You do not have permission to update this job listing.");
        }

        if (request.getTitle() != null && !request.getTitle().trim().isEmpty()) {
            job.setTitle(request.getTitle().trim());
        }
        if (request.getDescription() != null) {
            job.setDescription(request.getDescription().trim());
        }
        if (request.getCategory() != null) {
            job.setCategory(request.getCategory());
        }
        if (request.getCrop() != null) {
            job.setCrop(request.getCrop().trim());
        }
        if (request.getLocation() != null) {
            job.setLocation(request.getLocation().trim());
        }
        if (request.getDistrict() != null) {
            job.setDistrict(request.getDistrict().trim());
        }
        if (request.getState() != null) {
            job.setState(request.getState().trim());
        }
        if (request.getStartDate() != null) {
            job.setStartDate(request.getStartDate());
        }
        if (request.getEndDate() != null) {
            if (job.getStartDate() != null && request.getEndDate().isBefore(job.getStartDate())) {
                throw new BadRequestException("End date cannot be prior to start date.");
            }
            job.setEndDate(request.getEndDate());
        }
        if (request.getEstimatedDays() != null) {
            job.setEstimatedDays(request.getEstimatedDays());
        }
        if (request.getWorkersRequired() != null) {
            if (request.getWorkersRequired() < job.getWorkersSelected()) {
                throw new BadRequestException("Cannot set required workers less than already selected workers (" + job.getWorkersSelected() + ")");
            }
            job.setWorkersRequired(request.getWorkersRequired());
            if (job.getWorkersSelected().equals(job.getWorkersRequired())) {
                job.setStatus(JobStatus.FILLED);
            }
        }
        if (request.getWage() != null) {
            job.setWage(request.getWage());
        }
        if (request.getWageType() != null) {
            job.setWageType(request.getWageType());
        }
        if (request.getAccommodationProvided() != null) {
            job.setAccommodationProvided(request.getAccommodationProvided());
        }
        if (request.getFoodProvided() != null) {
            job.setFoodProvided(request.getFoodProvided());
        }
        if (request.getTransportProvided() != null) {
            job.setTransportProvided(request.getTransportProvided());
        }
        if (request.getToolsProvided() != null) {
            job.setToolsProvided(request.getToolsProvided().trim());
        }
        if (request.getExperienceRequired() != null) {
            job.setExperienceRequired(request.getExperienceRequired().trim());
        }
        if (request.getSkills() != null) {
            job.setSkills(request.getSkills());
        }
        if (request.getStatus() != null) {
            if (!job.getStatus().canTransitionTo(request.getStatus())) {
                throw new BadRequestException("Invalid job status transition from " + job.getStatus() + " to " + request.getStatus());
            }
            job.setStatus(request.getStatus());
        }

        Job updated = jobRepository.save(job);
        return JobResponse.fromEntity(updated);
    }

    @Transactional
    public JobResponse cancelJob(String farmerEmail, Long id, boolean isAdmin) {
        Job job = jobRepository.findByIdAndActiveTrue(id)
                .orElseThrow(() -> new ResourceNotFoundException("Job not found with ID: " + id));

        if (!isAdmin && !job.getCreatedBy().getEmail().equalsIgnoreCase(farmerEmail.trim())) {
            throw new AccessDeniedException("You do not have permission to cancel this job listing.");
        }

        if (job.getStatus() == JobStatus.COMPLETED) {
            throw new BadRequestException("Cannot cancel an already completed job.");
        }

        job.setStatus(JobStatus.CANCELLED);
        Job saved = jobRepository.save(job);
        return JobResponse.fromEntity(saved);
    }

    @Transactional
    public JobResponse completeJob(String farmerEmail, Long id, boolean isAdmin) {
        Job job = jobRepository.findByIdAndActiveTrue(id)
                .orElseThrow(() -> new ResourceNotFoundException("Job not found with ID: " + id));

        if (!isAdmin && !job.getCreatedBy().getEmail().equalsIgnoreCase(farmerEmail.trim())) {
            throw new AccessDeniedException("You do not have permission to complete this job listing.");
        }

        if (job.getStatus() == JobStatus.CANCELLED || job.getStatus() == JobStatus.EXPIRED) {
            throw new BadRequestException("Cannot complete a job with status " + job.getStatus());
        }

        job.setStatus(JobStatus.COMPLETED);
        Job saved = jobRepository.save(job);
        return JobResponse.fromEntity(saved);
    }
}
