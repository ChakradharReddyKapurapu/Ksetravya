package com.agrinexus.notification.controller;

import com.agrinexus.auth.UserPrincipal;
import com.agrinexus.common.ApiResponse;
import com.agrinexus.notification.dto.NotificationPreferenceRequest;
import com.agrinexus.notification.dto.NotificationPreferenceResponse;
import com.agrinexus.notification.service.NotificationPreferenceService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/notifications/preferences")
public class NotificationPreferenceController {

    private final NotificationPreferenceService preferenceService;

    public NotificationPreferenceController(NotificationPreferenceService preferenceService) {
        this.preferenceService = preferenceService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<NotificationPreferenceResponse>> getPreferences(
            @AuthenticationPrincipal UserPrincipal userPrincipal) {

        NotificationPreferenceResponse response = preferenceService.getPreferences(userPrincipal.getId());
        return ResponseEntity.ok(ApiResponse.success("User notification preferences retrieved", response));
    }

    @PatchMapping
    public ResponseEntity<ApiResponse<NotificationPreferenceResponse>> updatePreferences(
            @RequestBody NotificationPreferenceRequest request,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {

        NotificationPreferenceResponse response = preferenceService.updatePreferences(userPrincipal.getId(), request);
        return ResponseEntity.ok(ApiResponse.success("User notification preferences updated successfully", response));
    }
}
