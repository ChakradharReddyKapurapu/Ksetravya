package com.agrinexus.seeds.controller;

import com.agrinexus.auth.UserPrincipal;
import com.agrinexus.common.ApiResponse;
import com.agrinexus.seeds.dto.SeedCreateRequest;
import com.agrinexus.seeds.dto.SeedRecommendationResponse;
import com.agrinexus.seeds.dto.SeedResponse;
import com.agrinexus.seeds.dto.SeedUpdateRequest;
import com.agrinexus.seeds.service.SeedRecommendationService;
import com.agrinexus.seeds.service.SeedService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/seeds")
public class SeedController {

    private final SeedService seedService;
    private final SeedRecommendationService recommendationService;

    public SeedController(SeedService seedService, SeedRecommendationService recommendationService) {
        this.seedService = seedService;
        this.recommendationService = recommendationService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<Page<SeedResponse>>> getAllSeeds(
            @RequestParam(required = false) String query,
            @RequestParam(required = false) String crop,
            @RequestParam(required = false) String season,
            @RequestParam(required = false) String seedType,
            @RequestParam(required = false) String soilType,
            @RequestParam(required = false) String waterRequirement,
            @RequestParam(required = false) String availability,
            @RequestParam(required = false) String region,
            @RequestParam(required = false) String brand,
            @RequestParam(required = false) BigDecimal minPrice,
            @RequestParam(required = false) BigDecimal maxPrice,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size,
            @RequestParam(defaultValue = "newest") String sort) {

        Sort sortObj = switch (sort.toLowerCase()) {
            case "priceasc", "price_asc", "pricelow" -> Sort.by(Sort.Direction.ASC, "price");
            case "pricedesc", "price_desc", "pricehigh" -> Sort.by(Sort.Direction.DESC, "price");
            case "durationshort", "duration_short", "durationasc" -> Sort.by(Sort.Direction.ASC, "durationDays");
            case "durationlong", "duration_long", "durationdesc" -> Sort.by(Sort.Direction.DESC, "durationDays");
            case "oldest" -> Sort.by(Sort.Direction.ASC, "createdAt");
            default -> Sort.by(Sort.Direction.DESC, "createdAt");
        };

        Pageable pageable = PageRequest.of(page, Math.min(size, 100), sortObj);
        Page<SeedResponse> results = seedService.getAllSeeds(
                query, crop, season, seedType, soilType, waterRequirement, availability, region, brand, minPrice, maxPrice, pageable
        );

        return ResponseEntity.ok(ApiResponse.success("Agricultural seeds catalog retrieved successfully", results));
    }

    @GetMapping("/search")
    public ResponseEntity<ApiResponse<Page<SeedResponse>>> searchSeeds(
            @RequestParam String query,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size,
            @RequestParam(defaultValue = "newest") String sort) {

        return getAllSeeds(query, null, null, null, null, null, null, null, null, null, null, page, size, sort);
    }

    @GetMapping("/crop/{crop}")
    public ResponseEntity<ApiResponse<Page<SeedResponse>>> getSeedsByCrop(
            @PathVariable String crop,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size) {

        Pageable pageable = PageRequest.of(page, Math.min(size, 100), Sort.by(Sort.Direction.DESC, "createdAt"));
        Page<SeedResponse> results = seedService.getSeedsByCrop(crop, pageable);
        return ResponseEntity.ok(ApiResponse.success("Seeds for crop " + crop + " retrieved", results));
    }

    @GetMapping("/season/{season}")
    public ResponseEntity<ApiResponse<Page<SeedResponse>>> getSeedsBySeason(
            @PathVariable String season,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size) {

        Pageable pageable = PageRequest.of(page, Math.min(size, 100), Sort.by(Sort.Direction.DESC, "createdAt"));
        Page<SeedResponse> results = seedService.getSeedsBySeason(season, pageable);
        return ResponseEntity.ok(ApiResponse.success("Seeds for season " + season + " retrieved", results));
    }

    @GetMapping("/{id:[0-9]+}")
    public ResponseEntity<ApiResponse<SeedResponse>> getSeedById(@PathVariable Long id) {
        SeedResponse response = seedService.getSeedById(id);
        return ResponseEntity.ok(ApiResponse.success("Seed variety details retrieved successfully", response));
    }

    @GetMapping("/recommended-for-farm")
    public ResponseEntity<ApiResponse<List<SeedRecommendationResponse>>> getRecommendedForFarm(
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        List<SeedRecommendationResponse> recommendations = recommendationService.getRecommendedSeedsForFarm(userPrincipal.getUsername());
        return ResponseEntity.ok(ApiResponse.success("Farm-specific indicative seed recommendations compiled", recommendations));
    }

    @GetMapping("/my")
    public ResponseEntity<ApiResponse<List<SeedResponse>>> getMySeeds(
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        List<SeedResponse> responses = seedService.getMySeeds(userPrincipal.getUsername());
        return ResponseEntity.ok(ApiResponse.success("Supplier seed catalog entries retrieved", responses));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<SeedResponse>> createSeed(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @Valid @RequestBody SeedCreateRequest request) {
        SeedResponse response = seedService.createSeed(userPrincipal.getUsername(), request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Seed variety published to catalog successfully", response));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<ApiResponse<SeedResponse>> updateSeed(
            @PathVariable Long id,
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @Valid @RequestBody SeedUpdateRequest request) {
        boolean isAdmin = userPrincipal.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));
        SeedResponse response = seedService.updateSeed(userPrincipal.getUsername(), id, request, isAdmin);
        return ResponseEntity.ok(ApiResponse.success("Seed variety catalog entry updated successfully", response));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteSeed(
            @PathVariable Long id,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        boolean isAdmin = userPrincipal.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));
        seedService.deleteSeed(userPrincipal.getUsername(), id, isAdmin);
        return ResponseEntity.ok(ApiResponse.success("Seed variety removed from active catalog", null));
    }
}
