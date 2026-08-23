package com.agrinexus.land.controller;

import com.agrinexus.auth.UserPrincipal;
import com.agrinexus.common.ApiResponse;
import com.agrinexus.land.dto.LandParcelCreateRequest;
import com.agrinexus.land.dto.LandParcelResponse;
import com.agrinexus.land.dto.LandParcelUpdateRequest;
import com.agrinexus.land.service.LandParcelService;
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
@RequestMapping("/api/land")
public class LandParcelController {

    private final LandParcelService landParcelService;

    public LandParcelController(LandParcelService landParcelService) {
        this.landParcelService = landParcelService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<Page<LandParcelResponse>>> getAllLandParcels(
            @RequestParam(required = false) String query,
            @RequestParam(required = false) String soilType,
            @RequestParam(required = false) String waterSource,
            @RequestParam(required = false) String district,
            @RequestParam(required = false) String state,
            @RequestParam(required = false) BigDecimal minAcreage,
            @RequestParam(required = false) BigDecimal maxAcreage,
            @RequestParam(required = false) BigDecimal minRent,
            @RequestParam(required = false) BigDecimal maxRent,
            @RequestParam(required = false) Boolean hasRiver,
            @RequestParam(required = false) Boolean hasBorewell,
            @RequestParam(required = false) Boolean hasDrip,
            @RequestParam(required = false) Boolean hasCanal,
            @RequestParam(required = false) String status,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size,
            @RequestParam(defaultValue = "newest") String sort) {

        Sort sortObj = switch (sort.toLowerCase()) {
            case "rentasc", "rent_asc", "rentlow" -> Sort.by(Sort.Direction.ASC, "annualRentPerAcre");
            case "rentdesc", "rent_desc", "renthigh" -> Sort.by(Sort.Direction.DESC, "annualRentPerAcre");
            case "acreageasc", "acreage_asc" -> Sort.by(Sort.Direction.ASC, "acreage");
            case "acreagedesc", "acreage_desc" -> Sort.by(Sort.Direction.DESC, "acreage");
            case "oldest" -> Sort.by(Sort.Direction.ASC, "createdAt");
            default -> Sort.by(Sort.Direction.DESC, "createdAt");
        };

        Pageable pageable = PageRequest.of(page, Math.min(size, 100), sortObj);
        Page<LandParcelResponse> results = landParcelService.getAllLandParcels(
                query, soilType, waterSource, district, state, minAcreage, maxAcreage,
                minRent, maxRent, hasRiver, hasBorewell, hasDrip, hasCanal, status, pageable
        );

        return ResponseEntity.ok(ApiResponse.success("Farmland parcels retrieved successfully", results));
    }

    @GetMapping("/search")
    public ResponseEntity<ApiResponse<Page<LandParcelResponse>>> searchLandParcels(
            @RequestParam String query,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size) {

        Pageable pageable = PageRequest.of(page, Math.min(size, 100), Sort.by(Sort.Direction.DESC, "createdAt"));
        Page<LandParcelResponse> results = landParcelService.searchLandParcels(query, pageable);
        return ResponseEntity.ok(ApiResponse.success("Search results for farmland parcels", results));
    }

    @GetMapping("/{id:[0-9]+}")
    public ResponseEntity<ApiResponse<LandParcelResponse>> getLandParcelById(@PathVariable Long id) {
        LandParcelResponse response = landParcelService.getLandParcelById(id);
        return ResponseEntity.ok(ApiResponse.success("Farmland parcel details retrieved", response));
    }

    @GetMapping("/my")
    public ResponseEntity<ApiResponse<List<LandParcelResponse>>> getMyLandParcels(
            @AuthenticationPrincipal UserPrincipal userPrincipal) {

        List<LandParcelResponse> parcels = landParcelService.getMyLandParcels(userPrincipal.getUsername());
        return ResponseEntity.ok(ApiResponse.success("Owner farmland listings retrieved", parcels));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<LandParcelResponse>> createLandParcel(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @Valid @RequestBody LandParcelCreateRequest request) {

        LandParcelResponse response = landParcelService.createLandParcel(userPrincipal.getUsername(), request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Farmland parcel listed for lease successfully", response));
    }

    @PatchMapping("/{id:[0-9]+}")
    public ResponseEntity<ApiResponse<LandParcelResponse>> updateLandParcel(
            @PathVariable Long id,
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @Valid @RequestBody LandParcelUpdateRequest request) {

        boolean isAdmin = userPrincipal.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));
        LandParcelResponse response = landParcelService.updateLandParcel(userPrincipal.getUsername(), id, request, isAdmin);
        return ResponseEntity.ok(ApiResponse.success("Farmland parcel updated successfully", response));
    }

    @DeleteMapping("/{id:[0-9]+}")
    public ResponseEntity<ApiResponse<Void>> deleteLandParcel(
            @PathVariable Long id,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {

        boolean isAdmin = userPrincipal.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));
        landParcelService.deleteLandParcel(userPrincipal.getUsername(), id, isAdmin);
        return ResponseEntity.ok(ApiResponse.success("Farmland parcel listing removed", null));
    }
}
