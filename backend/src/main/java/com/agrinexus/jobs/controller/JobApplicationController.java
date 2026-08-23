package com.agrinexus.jobs.controller;

import com.agrinexus.auth.UserPrincipal;
import com.agrinexus.common.ApiResponse;
import com.agrinexus.jobs.dto.JobApplicationRequest;
import com.agrinexus.jobs.dto.JobApplicationResponse;
import com.agrinexus.jobs.service.JobApplicationService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/jobs")
public class JobApplicationController {

    private final JobApplicationService applicationService;

    public JobApplicationController(JobApplicationService applicationService) {
        this.applicationService = applicationService;
    }

    @PostMapping("/{jobId:[0-9]+}/applications")
    public ResponseEntity<ApiResponse<JobApplicationResponse>> applyForJob(
            @PathVariable Long jobId,
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @Valid @RequestBody(required = false) JobApplicationRequest request) {

        JobApplicationResponse response = applicationService.applyForJob(userPrincipal.getUsername(), jobId, request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Application submitted successfully", response));
    }

    @GetMapping("/applications/my")
    public ResponseEntity<ApiResponse<List<JobApplicationResponse>>> getMyApplications(
            @AuthenticationPrincipal UserPrincipal userPrincipal) {

        List<JobApplicationResponse> applications = applicationService.getMyApplications(userPrincipal.getUsername());
        return ResponseEntity.ok(ApiResponse.success("Worker application history retrieved", applications));
    }

    @GetMapping("/{jobId:[0-9]+}/applications")
    public ResponseEntity<ApiResponse<List<JobApplicationResponse>>> getJobApplications(
            @PathVariable Long jobId,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {

        boolean isAdmin = userPrincipal.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));
        List<JobApplicationResponse> applications = applicationService.getJobApplications(userPrincipal.getUsername(), jobId, isAdmin);
        return ResponseEntity.ok(ApiResponse.success("Job applicants retrieved", applications));
    }

    @PatchMapping("/applications/{id:[0-9]+}/accept")
    public ResponseEntity<ApiResponse<JobApplicationResponse>> acceptApplication(
            @PathVariable Long id,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {

        boolean isAdmin = userPrincipal.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));
        JobApplicationResponse response = applicationService.acceptApplication(userPrincipal.getUsername(), id, isAdmin);
        return ResponseEntity.ok(ApiResponse.success("Worker application accepted", response));
    }

    @PatchMapping("/applications/{id:[0-9]+}/reject")
    public ResponseEntity<ApiResponse<JobApplicationResponse>> rejectApplication(
            @PathVariable Long id,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {

        boolean isAdmin = userPrincipal.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));
        JobApplicationResponse response = applicationService.rejectApplication(userPrincipal.getUsername(), id, isAdmin);
        return ResponseEntity.ok(ApiResponse.success("Worker application rejected", response));
    }

    @PatchMapping("/applications/{id:[0-9]+}/withdraw")
    public ResponseEntity<ApiResponse<JobApplicationResponse>> withdrawApplication(
            @PathVariable Long id,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {

        JobApplicationResponse response = applicationService.withdrawApplication(userPrincipal.getUsername(), id);
        return ResponseEntity.ok(ApiResponse.success("Job application withdrawn", response));
    }
}
