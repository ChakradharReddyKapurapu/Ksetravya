package com.agrinexus.admin.controller;

import com.agrinexus.admin.dto.*;
import com.agrinexus.admin.service.AdminStatisticsService;
import com.agrinexus.common.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminStatisticsController {

    private final AdminStatisticsService statisticsService;

    public AdminStatisticsController(AdminStatisticsService statisticsService) {
        this.statisticsService = statisticsService;
    }

    @GetMapping("/statistics")
    public ResponseEntity<ApiResponse<AdminStatisticsResponse>> getStatistics() {
        AdminStatisticsResponse response = statisticsService.getStatistics();
        return ResponseEntity.ok(ApiResponse.success("Platform statistics retrieved successfully", response));
    }

    @GetMapping("/statistics/users")
    public ResponseEntity<ApiResponse<UserGrowthResponse>> getUserGrowth(
            @RequestParam(defaultValue = "30D") String timeframe) {

        UserGrowthResponse response = statisticsService.getUserGrowth(timeframe);
        return ResponseEntity.ok(ApiResponse.success("User growth statistics retrieved successfully", response));
    }

    @GetMapping("/statistics/jobs")
    public ResponseEntity<ApiResponse<JobStatisticsResponse>> getJobStatistics() {
        JobStatisticsResponse response = statisticsService.getJobStatistics();
        return ResponseEntity.ok(ApiResponse.success("Job statistics retrieved successfully", response));
    }

    @GetMapping("/statistics/marketplace")
    public ResponseEntity<ApiResponse<MarketplaceStatisticsResponse>> getMarketplaceStatistics() {
        MarketplaceStatisticsResponse response = statisticsService.getMarketplaceStatistics();
        return ResponseEntity.ok(ApiResponse.success("Marketplace statistics retrieved successfully", response));
    }

    @GetMapping("/statistics/land")
    public ResponseEntity<ApiResponse<LandStatisticsResponse>> getLandStatistics() {
        LandStatisticsResponse response = statisticsService.getLandStatistics();
        return ResponseEntity.ok(ApiResponse.success("Land statistics retrieved successfully", response));
    }

    @GetMapping("/notifications/statistics")
    public ResponseEntity<ApiResponse<NotificationStatisticsResponse>> getNotificationStatistics() {
        NotificationStatisticsResponse response = statisticsService.getNotificationStatistics();
        return ResponseEntity.ok(ApiResponse.success("Notification statistics retrieved successfully", response));
    }
}
