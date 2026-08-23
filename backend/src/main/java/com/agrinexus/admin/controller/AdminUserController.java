package com.agrinexus.admin.controller;

import com.agrinexus.admin.dto.*;
import com.agrinexus.admin.service.AdminUserService;
import com.agrinexus.auth.UserPrincipal;
import com.agrinexus.common.ApiResponse;
import com.agrinexus.user.Role;
import com.agrinexus.user.UserStatus;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/users")
@PreAuthorize("hasRole('ADMIN')")
public class AdminUserController {

    private final AdminUserService userService;

    public AdminUserController(AdminUserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<Page<AdminUserResponse>>> getUsers(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(required = false) String search,
            @RequestParam(required = false) Role role,
            @RequestParam(required = false) UserStatus status) {

        Page<AdminUserResponse> users = userService.getUsers(page, size, search, role, status);
        return ResponseEntity.ok(ApiResponse.success("Users retrieved successfully", users));
    }

    @GetMapping("/{id:[0-9]+}")
    public ResponseEntity<ApiResponse<AdminUserDetailsResponse>> getUserDetails(@PathVariable Long id) {
        AdminUserDetailsResponse details = userService.getUserDetails(id);
        return ResponseEntity.ok(ApiResponse.success("User details retrieved successfully", details));
    }

    @PatchMapping("/{id:[0-9]+}/status")
    public ResponseEntity<ApiResponse<AdminUserResponse>> updateUserStatus(
            @PathVariable Long id,
            @AuthenticationPrincipal UserPrincipal principal,
            @Valid @RequestBody AdminUserStatusRequest request,
            HttpServletRequest httpRequest) {

        String ipAddress = httpRequest.getRemoteAddr();
        AdminUserResponse response = userService.updateUserStatus(principal.getUsername(), id, request, ipAddress);
        return ResponseEntity.ok(ApiResponse.success("User status updated successfully", response));
    }

    @PatchMapping("/{id:[0-9]+}/role")
    public ResponseEntity<ApiResponse<AdminUserResponse>> updateUserRole(
            @PathVariable Long id,
            @AuthenticationPrincipal UserPrincipal principal,
            @Valid @RequestBody AdminUserRoleRequest request,
            HttpServletRequest httpRequest) {

        String ipAddress = httpRequest.getRemoteAddr();
        AdminUserResponse response = userService.updateUserRole(principal.getUsername(), id, request, ipAddress);
        return ResponseEntity.ok(ApiResponse.success("User role updated successfully", response));
    }
}
