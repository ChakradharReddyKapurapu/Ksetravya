package com.agrinexus.crop.controller;

import com.agrinexus.auth.UserPrincipal;
import com.agrinexus.common.ApiResponse;
import com.agrinexus.crop.dto.*;
import com.agrinexus.crop.service.CropProtectionRecommendationService;
import com.agrinexus.crop.service.CropProtectionService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/crop-protection")
public class CropProtectionController {

    private final CropProtectionService cropProtectionService;
    private final CropProtectionRecommendationService recommendationService;

    public CropProtectionController(
            CropProtectionService cropProtectionService,
            CropProtectionRecommendationService recommendationService) {
        this.cropProtectionService = cropProtectionService;
        this.recommendationService = recommendationService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<Page<CropProtectionResponse>>> getAllCropProtection(
            @RequestParam(required = false) String query,
            @RequestParam(required = false) String crop,
            @RequestParam(required = false) String type,
            @RequestParam(required = false) String severity,
            @RequestParam(required = false) String season,
            @RequestParam(required = false) String plantPart,
            @RequestParam(required = false) String symptom,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size,
            @RequestParam(defaultValue = "newest") String sort) {

        Sort sortObj = "oldest".equalsIgnoreCase(sort)
                ? Sort.by(Sort.Direction.ASC, "createdAt")
                : Sort.by(Sort.Direction.DESC, "createdAt");

        Pageable pageable = PageRequest.of(page, Math.min(size, 100), sortObj);
        Page<CropProtectionResponse> results = cropProtectionService.getAll(
                query, crop, type, severity, season, plantPart, symptom, pageable
        );

        return ResponseEntity.ok(ApiResponse.success("Crop protection advisories retrieved successfully", results));
    }

    @GetMapping("/search")
    public ResponseEntity<ApiResponse<Page<CropProtectionResponse>>> searchCropProtection(
            @RequestParam String query,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size) {

        Pageable pageable = PageRequest.of(page, Math.min(size, 100), Sort.by(Sort.Direction.DESC, "createdAt"));
        Page<CropProtectionResponse> results = cropProtectionService.search(query, pageable);
        return ResponseEntity.ok(ApiResponse.success("Search results for crop protection", results));
    }

    @GetMapping("/symptoms")
    public ResponseEntity<ApiResponse<List<SymptomMatchResponse>>> searchBySymptoms(
            @RequestParam String query) {

        List<SymptomMatchResponse> results = cropProtectionService.searchBySymptoms(query);
        return ResponseEntity.ok(ApiResponse.success("Possible matching conditions retrieved", results));
    }

    @GetMapping("/{id:[0-9]+}")
    public ResponseEntity<ApiResponse<CropProtectionResponse>> getById(@PathVariable Long id) {
        CropProtectionResponse response = cropProtectionService.getById(id);
        return ResponseEntity.ok(ApiResponse.success("Crop protection details retrieved successfully", response));
    }

    @GetMapping("/relevant-for-farm")
    public ResponseEntity<ApiResponse<List<CropProtectionRecommendationResponse>>> getRelevantForFarm(
            @AuthenticationPrincipal UserPrincipal userPrincipal) {

        List<CropProtectionRecommendationResponse> recommendations =
                recommendationService.getRelevantForFarm(userPrincipal.getUsername());
        return ResponseEntity.ok(ApiResponse.success("Farm-specific crop health advisories compiled", recommendations));
    }

    @GetMapping("/recommendations")
    public ResponseEntity<ApiResponse<List<CropProtectionRecommendationResponse>>> getRecommendations(
            @AuthenticationPrincipal UserPrincipal userPrincipal) {

        List<CropProtectionRecommendationResponse> recommendations =
                recommendationService.getRelevantForFarm(userPrincipal.getUsername());
        return ResponseEntity.ok(ApiResponse.success("Proactive crop health advisories compiled", recommendations));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<CropProtectionResponse>> create(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @Valid @RequestBody CropProtectionCreateRequest request) {

        CropProtectionResponse response = cropProtectionService.create(request, userPrincipal.getId());
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Crop protection advisory created successfully", response));
    }

    @PatchMapping("/{id:[0-9]+}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<CropProtectionResponse>> update(
            @PathVariable Long id,
            @Valid @RequestBody CropProtectionUpdateRequest request) {

        CropProtectionResponse response = cropProtectionService.update(id, request);
        return ResponseEntity.ok(ApiResponse.success("Crop protection advisory updated successfully", response));
    }

    @DeleteMapping("/{id:[0-9]+}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        cropProtectionService.delete(id);
        return ResponseEntity.ok(ApiResponse.success("Crop protection advisory archived successfully", null));
    }
}
