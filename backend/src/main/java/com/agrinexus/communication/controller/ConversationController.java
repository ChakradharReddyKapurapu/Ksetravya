package com.agrinexus.communication.controller;

import com.agrinexus.auth.UserPrincipal;
import com.agrinexus.common.ApiResponse;
import com.agrinexus.communication.dto.ConversationResponse;
import com.agrinexus.communication.dto.CreateConversationRequest;
import com.agrinexus.communication.dto.UnreadCountResponse;
import com.agrinexus.communication.service.ConversationService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/conversations")
@PreAuthorize("isAuthenticated()")
public class ConversationController {

    private final ConversationService conversationService;

    public ConversationController(ConversationService conversationService) {
        this.conversationService = conversationService;
    }

    @PostMapping
    public ResponseEntity<ApiResponse<ConversationResponse>> createConversation(
            @AuthenticationPrincipal UserPrincipal principal,
            @Valid @RequestBody CreateConversationRequest request) {

        ConversationResponse response = conversationService.createConversation(principal.getUsername(), request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Conversation created or retrieved successfully", response));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<Page<ConversationResponse>>> getConversations(
            @AuthenticationPrincipal UserPrincipal principal,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {

        Page<ConversationResponse> conversations = conversationService.getConversations(principal.getUsername(), page, size);
        return ResponseEntity.ok(ApiResponse.success("Conversations retrieved successfully", conversations));
    }

    @GetMapping("/unread-count")
    public ResponseEntity<ApiResponse<UnreadCountResponse>> getUnreadCount(
            @AuthenticationPrincipal UserPrincipal principal) {

        UnreadCountResponse response = conversationService.getTotalUnreadCount(principal.getUsername());
        return ResponseEntity.ok(ApiResponse.success("Total unread count retrieved successfully", response));
    }

    @GetMapping("/{id:[0-9]+}")
    public ResponseEntity<ApiResponse<ConversationResponse>> getConversationDetails(
            @AuthenticationPrincipal UserPrincipal principal,
            @PathVariable Long id) {

        ConversationResponse response = conversationService.getConversationDetails(principal.getUsername(), id);
        return ResponseEntity.ok(ApiResponse.success("Conversation details retrieved successfully", response));
    }

    @PatchMapping("/{id:[0-9]+}/read")
    public ResponseEntity<ApiResponse<Map<String, String>>> markConversationAsRead(
            @AuthenticationPrincipal UserPrincipal principal,
            @PathVariable Long id) {

        conversationService.markConversationAsRead(principal.getUsername(), id);
        return ResponseEntity.ok(ApiResponse.success("Conversation marked as read", Map.of("status", "READ")));
    }
}
