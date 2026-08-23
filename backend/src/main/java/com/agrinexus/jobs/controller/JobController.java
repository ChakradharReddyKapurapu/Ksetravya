package com.agrinexus.jobs.controller;

import com.agrinexus.auth.UserPrincipal;
import com.agrinexus.common.ApiResponse;
import com.agrinexus.jobs.dto.*;
import com.agrinexus.jobs.service.JobRecommendationService;
import com.agrinexus.jobs.service.JobService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/jobs")
public class JobController {

    private final JobService jobService;
    private final JobRecommendationService recommendationService;

    public JobController(JobService jobService, JobRecommendationService recommendationService) {
        this.jobService = jobService;
        this.recommendationService = recommendationService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<Page<JobResponse>>> getAllJobs(
            @RequestParam(required = false) String query,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String crop,
            @RequestParam(required = false) String district,
            @RequestParam(required = false) String state,
            @RequestParam(required = false) String wageType,
            @RequestParam(required = false) BigDecimal minWage,
            @RequestParam(required = false) BigDecimal maxWage,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam(required = false) Boolean foodProvided,
            @RequestParam(required = false) Boolean accommodationProvided,
            @RequestParam(required = false) Boolean transportProvided,
            @RequestParam(required = false) String status,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size,
            @RequestParam(defaultValue = "newest") String sort) {

        Sort sortObj = switch (sort.toLowerCase()) {
            case "wageasc", "wage_asc", "wagelow" -> Sort.by(Sort.Direction.ASC, "wage");
            case "wagedesc", "wage_desc", "wagehigh" -> Sort.by(Sort.Direction.DESC, "wage");
            case "startdateasc", "start_date_asc" -> Sort.by(Sort.Direction.ASC, "startDate");
            case "startdatedesc", "start_date_desc" -> Sort.by(Sort.Direction.DESC, "startDate");
            case "oldest" -> Sort.by(Sort.Direction.ASC, "createdAt");
            default -> Sort.by(Sort.Direction.DESC, "createdAt");
        };

        Pageable pageable = PageRequest.of(page, Math.min(size, 100), sortObj);
        Page<JobResponse> results = jobService.getAllJobs(
                query, category, crop, district, state, wageType, minWage, maxWage, startDate,
                foodProvided, accommodationProvided, transportProvided, status, pageable
        );

        return ResponseEntity.ok(ApiResponse.success("Agricultural jobs retrieved successfully", results));
    }

    @GetMapping("/search")
    public ResponseEntity<ApiResponse<Page<JobResponse>>> searchJobs(
            @RequestParam String query,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size) {

        Pageable pageable = PageRequest.of(page, Math.min(size, 100), Sort.by(Sort.Direction.DESC, "createdAt"));
        Page<JobResponse> results = jobService.searchJobs(query, pageable);
        return ResponseEntity.ok(ApiResponse.success("Search results for agricultural jobs", results));
    }

    @GetMapping("/{id:[0-9]+}")
    public ResponseEntity<ApiResponse<JobResponse>> getJobById(@PathVariable Long id) {
        JobResponse response = jobService.getJobById(id);
        return ResponseEntity.ok(ApiResponse.success("Job details retrieved successfully", response));
    }

    @GetMapping("/my")
    public ResponseEntity<ApiResponse<List<JobResponse>>> getMyJobs(
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        List<JobResponse> jobs = jobService.getMyJobs(userPrincipal.getUsername());
        return ResponseEntity.ok(ApiResponse.success("Farmer job postings retrieved", jobs));
    }

    @GetMapping("/recommended")
    public ResponseEntity<ApiResponse<List<JobRecommendationResponse>>> getRecommendedJobs(
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        List<JobRecommendationResponse> recommendations = recommendationService.getRecommendedJobs(userPrincipal.getUsername());
        return ResponseEntity.ok(ApiResponse.success("Recommended jobs matching worker profile compiled", recommendations));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<JobResponse>> createJob(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @Valid @RequestBody JobCreateRequest request) {
        JobResponse response = jobService.createJob(userPrincipal.getUsername(), request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Agricultural job posted successfully", response));
    }

    @PatchMapping("/{id:[0-9]+}")
    public ResponseEntity<ApiResponse<JobResponse>> updateJob(
            @PathVariable Long id,
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @Valid @RequestBody JobUpdateRequest request) {
        boolean isAdmin = userPrincipal.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));
        JobResponse response = jobService.updateJob(userPrincipal.getUsername(), id, request, isAdmin);
        return ResponseEntity.ok(ApiResponse.success("Job posting updated successfully", response));
    }

    @PatchMapping("/{id:[0-9]+}/cancel")
    public ResponseEntity<ApiResponse<JobResponse>> cancelJob(
            @PathVariable Long id,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        boolean isAdmin = userPrincipal.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));
        JobResponse response = jobService.cancelJob(userPrincipal.getUsername(), id, isAdmin);
        return ResponseEntity.ok(ApiResponse.success("Job posting cancelled", response));
    }

    @PatchMapping("/{id:[0-9]+}/complete")
    public ResponseEntity<ApiResponse<JobResponse>> completeJob(
            @PathVariable Long id,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        boolean isAdmin = userPrincipal.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));
        JobResponse response = jobService.completeJob(userPrincipal.getUsername(), id, isAdmin);
        return ResponseEntity.ok(ApiResponse.success("Job work marked as completed", response));
    }
}
