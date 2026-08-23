package com.agrinexus.tools.controller;

import com.agrinexus.auth.UserPrincipal;
import com.agrinexus.common.ApiResponse;
import com.agrinexus.tools.dto.ToolRentalRequestCreate;
import com.agrinexus.tools.dto.ToolRentalResponse;
import com.agrinexus.tools.service.ToolRentalService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tools")
public class ToolRentalController {

    private final ToolRentalService rentalService;

    public ToolRentalController(ToolRentalService rentalService) {
        this.rentalService = rentalService;
    }

    @PostMapping("/{toolId}/rental-requests")
    public ResponseEntity<ApiResponse<ToolRentalResponse>> createRentalRequest(
            @PathVariable Long toolId,
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @Valid @RequestBody ToolRentalRequestCreate request) {
        ToolRentalResponse response = rentalService.requestRental(userPrincipal.getUsername(), toolId, request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Rental request submitted successfully", response));
    }

    @GetMapping("/rental-requests/my")
    public ResponseEntity<ApiResponse<List<ToolRentalResponse>>> getMyRentalRequests(
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        List<ToolRentalResponse> responses = rentalService.getMyRentalRequests(userPrincipal.getUsername());
        return ResponseEntity.ok(ApiResponse.success("My rental requests retrieved", responses));
    }

    @GetMapping("/rental-requests/received")
    public ResponseEntity<ApiResponse<List<ToolRentalResponse>>> getReceivedRentalRequests(
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        List<ToolRentalResponse> responses = rentalService.getReceivedRentalRequests(userPrincipal.getUsername());
        return ResponseEntity.ok(ApiResponse.success("Received rental requests for your tools retrieved", responses));
    }

    @PatchMapping("/rental-requests/{id}/approve")
    public ResponseEntity<ApiResponse<ToolRentalResponse>> approveRequest(
            @PathVariable Long id,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        ToolRentalResponse response = rentalService.approveRequest(userPrincipal.getUsername(), id);
        return ResponseEntity.ok(ApiResponse.success("Rental request approved successfully", response));
    }

    @PatchMapping("/rental-requests/{id}/reject")
    public ResponseEntity<ApiResponse<ToolRentalResponse>> rejectRequest(
            @PathVariable Long id,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        ToolRentalResponse response = rentalService.rejectRequest(userPrincipal.getUsername(), id);
        return ResponseEntity.ok(ApiResponse.success("Rental request rejected", response));
    }

    @PatchMapping("/rental-requests/{id}/cancel")
    public ResponseEntity<ApiResponse<ToolRentalResponse>> cancelRequest(
            @PathVariable Long id,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        ToolRentalResponse response = rentalService.cancelRequest(userPrincipal.getUsername(), id);
        return ResponseEntity.ok(ApiResponse.success("Rental request cancelled", response));
    }
}
