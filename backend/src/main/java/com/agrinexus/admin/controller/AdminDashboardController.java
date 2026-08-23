package com.agrinexus.admin.controller;

import com.agrinexus.admin.dto.AdminDashboardResponse;
import com.agrinexus.admin.service.AdminDashboardService;
import com.agrinexus.common.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin/dashboard")
@PreAuthorize("hasRole('ADMIN')")
public class AdminDashboardController {

    private final AdminDashboardService dashboardService;

    public AdminDashboardController(AdminDashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<AdminDashboardResponse>> getDashboard() {
        AdminDashboardResponse response = dashboardService.getDashboard();
        return ResponseEntity.ok(ApiResponse.success("Admin dashboard metrics retrieved successfully", response));
    }
}
