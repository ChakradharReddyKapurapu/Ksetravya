package com.agrinexus.farm.controller;

import com.agrinexus.auth.UserPrincipal;
import com.agrinexus.common.ApiResponse;
import com.agrinexus.farm.dto.FarmCreateRequest;
import com.agrinexus.farm.dto.FarmResponse;
import com.agrinexus.farm.dto.FarmUpdateRequest;
import com.agrinexus.farm.service.FarmService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/farms")
public class FarmController {

    private final FarmService farmService;

    public FarmController(FarmService farmService) {
        this.farmService = farmService;
    }

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<FarmResponse>> getMyFarm(@AuthenticationPrincipal UserPrincipal userPrincipal) {
        FarmResponse response = farmService.getFarmByEmail(userPrincipal.getUsername());
        return ResponseEntity.ok(ApiResponse.success("Farm profile retrieved successfully", response));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<FarmResponse>> createMyFarm(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @Valid @RequestBody FarmCreateRequest request) {
        FarmResponse response = farmService.createFarm(userPrincipal.getUsername(), request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Primary farm profile established successfully", response));
    }

    @PatchMapping("/me")
    public ResponseEntity<ApiResponse<FarmResponse>> updateMyFarm(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @Valid @RequestBody FarmUpdateRequest request) {
        FarmResponse response = farmService.updateFarm(userPrincipal.getUsername(), request);
        return ResponseEntity.ok(ApiResponse.success("Farm context parameters updated successfully", response));
    }
}
