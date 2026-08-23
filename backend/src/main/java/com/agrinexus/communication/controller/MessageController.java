package com.agrinexus.communication.controller;

import com.agrinexus.auth.UserPrincipal;
import com.agrinexus.common.ApiResponse;
import com.agrinexus.communication.dto.MessageResponse;
import com.agrinexus.communication.dto.SendMessageRequest;
import com.agrinexus.communication.service.MessageService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/conversations")
@PreAuthorize("isAuthenticated()")
public class MessageController {

    private final MessageService messageService;

    public MessageController(MessageService messageService) {
        this.messageService = messageService;
    }

    @GetMapping("/{id:[0-9]+}/messages")
    public ResponseEntity<ApiResponse<Page<MessageResponse>>> getMessages(
            @AuthenticationPrincipal UserPrincipal principal,
            @PathVariable Long id,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "30") int size) {

        Page<MessageResponse> messages = messageService.getMessages(principal.getUsername(), id, page, size);
        return ResponseEntity.ok(ApiResponse.success("Message history retrieved successfully", messages));
    }

    @PostMapping("/{id:[0-9]+}/messages")
    public ResponseEntity<ApiResponse<MessageResponse>> sendMessage(
            @AuthenticationPrincipal UserPrincipal principal,
            @PathVariable Long id,
            @Valid @RequestBody SendMessageRequest request) {

        MessageResponse response = messageService.sendMessage(principal.getUsername(), id, request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Message sent successfully", response));
    }

    @DeleteMapping("/{conversationId:[0-9]+}/messages/{messageId:[0-9]+}")
    public ResponseEntity<ApiResponse<MessageResponse>> deleteMessage(
            @AuthenticationPrincipal UserPrincipal principal,
            @PathVariable Long conversationId,
            @PathVariable Long messageId) {

        MessageResponse response = messageService.deleteMessage(principal.getUsername(), conversationId, messageId);
        return ResponseEntity.ok(ApiResponse.success("Message deleted successfully", response));
    }
}
