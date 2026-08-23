package com.agrinexus.admin.controller;

import com.agrinexus.admin.dto.AnnouncementRequest;
import com.agrinexus.admin.service.AdminAnnouncementService;
import com.agrinexus.auth.UserPrincipal;
import com.agrinexus.common.ApiResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/admin/announcements")
@PreAuthorize("hasRole('ADMIN')")
public class AdminAnnouncementController {

    private final AdminAnnouncementService announcementService;

    public AdminAnnouncementController(AdminAnnouncementService announcementService) {
        this.announcementService = announcementService;
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Map<String, Object>>> broadcastAnnouncement(
            @AuthenticationPrincipal UserPrincipal principal,
            @Valid @RequestBody AnnouncementRequest request,
            HttpServletRequest httpRequest) {

        String ipAddress = httpRequest.getRemoteAddr();
        int count = announcementService.broadcastAnnouncement(principal.getUsername(), request, ipAddress);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("System announcement broadcasted successfully to " + count + " users", Map.of("broadcastedCount", count)));
    }
}
