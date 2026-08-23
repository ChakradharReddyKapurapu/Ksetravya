package com.agrinexus.jobs.controller;

import com.agrinexus.auth.UserPrincipal;
import com.agrinexus.common.ApiResponse;
import com.agrinexus.jobs.dto.WorkerProfileResponse;
import com.agrinexus.jobs.dto.WorkerProfileUpdateRequest;
import com.agrinexus.jobs.service.WorkerProfileService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/workers")
public class WorkerProfileController {

    private final WorkerProfileService workerProfileService;

    public WorkerProfileController(WorkerProfileService workerProfileService) {
        this.workerProfileService = workerProfileService;
    }

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<WorkerProfileResponse>> getMyProfile(
            @AuthenticationPrincipal UserPrincipal userPrincipal) {

        WorkerProfileResponse response = workerProfileService.getMyProfile(userPrincipal.getUsername());
        return ResponseEntity.ok(ApiResponse.success("Worker profile retrieved", response));
    }

    @PatchMapping("/me")
    public ResponseEntity<ApiResponse<WorkerProfileResponse>> updateMyProfile(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @Valid @RequestBody WorkerProfileUpdateRequest request) {

        WorkerProfileResponse response = workerProfileService.updateProfile(userPrincipal.getUsername(), request);
        return ResponseEntity.ok(ApiResponse.success("Worker profile updated successfully", response));
    }
}
