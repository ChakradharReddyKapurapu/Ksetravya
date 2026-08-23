package com.agrinexus.land.controller;

import com.agrinexus.auth.UserPrincipal;
import com.agrinexus.common.ApiResponse;
import com.agrinexus.land.dto.LeaseApplicationRequest;
import com.agrinexus.land.dto.LeaseApplicationResponse;
import com.agrinexus.land.service.LeaseApplicationService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/land")
public class LeaseApplicationController {

    private final LeaseApplicationService leaseApplicationService;

    public LeaseApplicationController(LeaseApplicationService leaseApplicationService) {
        this.leaseApplicationService = leaseApplicationService;
    }

    @PostMapping("/{parcelId:[0-9]+}/applications")
    public ResponseEntity<ApiResponse<LeaseApplicationResponse>> applyForLease(
            @PathVariable Long parcelId,
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @Valid @RequestBody(required = false) LeaseApplicationRequest request) {

        LeaseApplicationResponse response = leaseApplicationService.applyForLease(userPrincipal.getUsername(), parcelId, request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Farmland lease application submitted successfully", response));
    }

    @GetMapping("/applications/my")
    public ResponseEntity<ApiResponse<List<LeaseApplicationResponse>>> getMyApplications(
            @AuthenticationPrincipal UserPrincipal userPrincipal) {

        List<LeaseApplicationResponse> applications = leaseApplicationService.getMyApplications(userPrincipal.getUsername());
        return ResponseEntity.ok(ApiResponse.success("Farmer lease applications retrieved", applications));
    }

    @GetMapping("/{parcelId:[0-9]+}/applications")
    public ResponseEntity<ApiResponse<List<LeaseApplicationResponse>>> getParcelApplications(
            @PathVariable Long parcelId,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {

        boolean isAdmin = userPrincipal.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));
        List<LeaseApplicationResponse> applications = leaseApplicationService.getParcelApplications(userPrincipal.getUsername(), parcelId, isAdmin);
        return ResponseEntity.ok(ApiResponse.success("Parcel lease applicants retrieved", applications));
    }

    @PatchMapping("/applications/{id:[0-9]+}/accept")
    public ResponseEntity<ApiResponse<LeaseApplicationResponse>> acceptApplication(
            @PathVariable Long id,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {

        boolean isAdmin = userPrincipal.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));
        LeaseApplicationResponse response = leaseApplicationService.acceptApplication(userPrincipal.getUsername(), id, isAdmin);
        return ResponseEntity.ok(ApiResponse.success("Lease application accepted and land marked as LEASED", response));
    }

    @PatchMapping("/applications/{id:[0-9]+}/reject")
    public ResponseEntity<ApiResponse<LeaseApplicationResponse>> rejectApplication(
            @PathVariable Long id,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {

        boolean isAdmin = userPrincipal.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));
        LeaseApplicationResponse response = leaseApplicationService.rejectApplication(userPrincipal.getUsername(), id, isAdmin);
        return ResponseEntity.ok(ApiResponse.success("Lease application rejected", response));
    }

    @PatchMapping("/applications/{id:[0-9]+}/withdraw")
    public ResponseEntity<ApiResponse<LeaseApplicationResponse>> withdrawApplication(
            @PathVariable Long id,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {

        LeaseApplicationResponse response = leaseApplicationService.withdrawApplication(userPrincipal.getUsername(), id);
        return ResponseEntity.ok(ApiResponse.success("Lease application withdrawn", response));
    }
}
