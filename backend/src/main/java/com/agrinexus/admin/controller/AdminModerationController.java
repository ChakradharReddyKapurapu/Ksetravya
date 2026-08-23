package com.agrinexus.admin.controller;

import com.agrinexus.admin.dto.*;
import com.agrinexus.admin.service.AdminModerationService;
import com.agrinexus.auth.UserPrincipal;
import com.agrinexus.common.ApiResponse;
import com.agrinexus.jobs.entity.JobCategory;
import com.agrinexus.jobs.entity.JobStatus;
import com.agrinexus.land.entity.LandStatus;
import com.agrinexus.marketplace.entity.OrderStatus;
import com.agrinexus.marketplace.entity.ProductCategory;
import com.agrinexus.marketplace.entity.ProductStatus;
import com.agrinexus.seeds.entity.CropType;
import com.agrinexus.seeds.entity.SeedAvailabilityStatus;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminModerationController {

    private final AdminModerationService moderationService;

    public AdminModerationController(AdminModerationService moderationService) {
        this.moderationService = moderationService;
    }

    // --- JOBS ---
    @GetMapping("/jobs")
    public ResponseEntity<ApiResponse<Page<AdminJobResponse>>> getJobs(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(required = false) JobStatus status,
            @RequestParam(required = false) JobCategory category,
            @RequestParam(required = false) String search) {

        Page<AdminJobResponse> jobs = moderationService.getJobs(page, size, status, category, search);
        return ResponseEntity.ok(ApiResponse.success("Jobs retrieved successfully", jobs));
    }

    @GetMapping("/jobs/{id:[0-9]+}")
    public ResponseEntity<ApiResponse<AdminJobResponse>> getJob(@PathVariable Long id) {
        AdminJobResponse job = moderationService.getJob(id);
        return ResponseEntity.ok(ApiResponse.success("Job details retrieved successfully", job));
    }

    @PatchMapping("/jobs/{id:[0-9]+}/status")
    public ResponseEntity<ApiResponse<AdminJobResponse>> updateJobStatus(
            @PathVariable Long id,
            @AuthenticationPrincipal UserPrincipal principal,
            @RequestBody Map<String, String> body,
            HttpServletRequest httpRequest) {

        JobStatus status = JobStatus.valueOf(body.get("status"));
        String reason = body.get("reason");
        String ipAddress = httpRequest.getRemoteAddr();

        AdminJobResponse job = moderationService.updateJobStatus(principal.getUsername(), id, status, reason, ipAddress);
        return ResponseEntity.ok(ApiResponse.success("Job status updated successfully", job));
    }

    // --- LAND ---
    @GetMapping("/lands")
    public ResponseEntity<ApiResponse<Page<AdminLandResponse>>> getLands(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(required = false) LandStatus status,
            @RequestParam(required = false) String location,
            @RequestParam(required = false) String search) {

        Page<AdminLandResponse> lands = moderationService.getLands(page, size, status, location, search);
        return ResponseEntity.ok(ApiResponse.success("Land listings retrieved successfully", lands));
    }

    @GetMapping("/lands/{id:[0-9]+}")
    public ResponseEntity<ApiResponse<AdminLandResponse>> getLand(@PathVariable Long id) {
        AdminLandResponse land = moderationService.getLand(id);
        return ResponseEntity.ok(ApiResponse.success("Land parcel details retrieved successfully", land));
    }

    @PatchMapping("/lands/{id:[0-9]+}/status")
    public ResponseEntity<ApiResponse<AdminLandResponse>> updateLandStatus(
            @PathVariable Long id,
            @AuthenticationPrincipal UserPrincipal principal,
            @RequestBody Map<String, String> body,
            HttpServletRequest httpRequest) {

        LandStatus status = LandStatus.valueOf(body.get("status"));
        String reason = body.get("reason");
        String ipAddress = httpRequest.getRemoteAddr();

        AdminLandResponse land = moderationService.updateLandStatus(principal.getUsername(), id, status, reason, ipAddress);
        return ResponseEntity.ok(ApiResponse.success("Land status updated successfully", land));
    }

    // --- PRODUCTS ---
    @GetMapping("/products")
    public ResponseEntity<ApiResponse<Page<AdminProductResponse>>> getProducts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(required = false) ProductCategory category,
            @RequestParam(required = false) ProductStatus status,
            @RequestParam(required = false) String search) {

        Page<AdminProductResponse> products = moderationService.getProducts(page, size, category, status, search);
        return ResponseEntity.ok(ApiResponse.success("Marketplace products retrieved successfully", products));
    }

    @GetMapping("/products/{id:[0-9]+}")
    public ResponseEntity<ApiResponse<AdminProductResponse>> getProduct(@PathVariable Long id) {
        AdminProductResponse product = moderationService.getProduct(id);
        return ResponseEntity.ok(ApiResponse.success("Product details retrieved successfully", product));
    }

    @PatchMapping("/products/{id:[0-9]+}/status")
    public ResponseEntity<ApiResponse<AdminProductResponse>> updateProductStatus(
            @PathVariable Long id,
            @AuthenticationPrincipal UserPrincipal principal,
            @RequestBody Map<String, String> body,
            HttpServletRequest httpRequest) {

        ProductStatus status = ProductStatus.valueOf(body.get("status"));
        String reason = body.get("reason");
        String ipAddress = httpRequest.getRemoteAddr();

        AdminProductResponse product = moderationService.updateProductStatus(principal.getUsername(), id, status, reason, ipAddress);
        return ResponseEntity.ok(ApiResponse.success("Product status updated successfully", product));
    }

    // --- SEEDS ---
    @GetMapping("/seeds")
    public ResponseEntity<ApiResponse<Page<AdminSeedResponse>>> getSeeds(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(required = false) CropType crop,
            @RequestParam(required = false) SeedAvailabilityStatus status,
            @RequestParam(required = false) String search) {

        Page<AdminSeedResponse> seeds = moderationService.getSeeds(page, size, crop, status, search);
        return ResponseEntity.ok(ApiResponse.success("Seed varieties retrieved successfully", seeds));
    }

    @GetMapping("/seeds/{id:[0-9]+}")
    public ResponseEntity<ApiResponse<AdminSeedResponse>> getSeed(@PathVariable Long id) {
        AdminSeedResponse seed = moderationService.getSeed(id);
        return ResponseEntity.ok(ApiResponse.success("Seed variety details retrieved successfully", seed));
    }

    @PatchMapping("/seeds/{id:[0-9]+}/status")
    public ResponseEntity<ApiResponse<AdminSeedResponse>> updateSeedStatus(
            @PathVariable Long id,
            @AuthenticationPrincipal UserPrincipal principal,
            @RequestBody Map<String, String> body,
            HttpServletRequest httpRequest) {

        SeedAvailabilityStatus status = SeedAvailabilityStatus.valueOf(body.get("status"));
        String reason = body.get("reason");
        String ipAddress = httpRequest.getRemoteAddr();

        AdminSeedResponse seed = moderationService.updateSeedStatus(principal.getUsername(), id, status, reason, ipAddress);
        return ResponseEntity.ok(ApiResponse.success("Seed status updated successfully", seed));
    }

    // --- ORDERS (Read-Only) ---
    @GetMapping("/orders")
    public ResponseEntity<ApiResponse<Page<AdminOrderResponse>>> getOrders(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(required = false) OrderStatus status) {

        Page<AdminOrderResponse> orders = moderationService.getOrders(page, size, status);
        return ResponseEntity.ok(ApiResponse.success("Orders retrieved successfully", orders));
    }

    @GetMapping("/orders/{id:[0-9]+}")
    public ResponseEntity<ApiResponse<AdminOrderResponse>> getOrder(@PathVariable Long id) {
        AdminOrderResponse order = moderationService.getOrder(id);
        return ResponseEntity.ok(ApiResponse.success("Order details retrieved successfully", order));
    }
}
