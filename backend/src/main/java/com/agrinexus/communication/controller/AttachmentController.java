package com.agrinexus.communication.controller;

import com.agrinexus.auth.UserPrincipal;
import com.agrinexus.communication.dto.MessageResponse;
import com.agrinexus.communication.entity.MessageAttachment;
import com.agrinexus.communication.repository.ConversationParticipantRepository;
import com.agrinexus.communication.repository.MessageAttachmentRepository;
import com.agrinexus.communication.service.MessageService;
import com.agrinexus.communication.storage.FileStorageService;
import com.agrinexus.exception.ResourceNotFoundException;
import com.agrinexus.user.User;
import com.agrinexus.user.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
public class AttachmentController {

    private static final Logger log = LoggerFactory.getLogger(AttachmentController.class);

    private final MessageService messageService;
    private final MessageAttachmentRepository attachmentRepository;
    private final ConversationParticipantRepository participantRepository;
    private final FileStorageService fileStorageService;
    private final UserRepository userRepository;

    public AttachmentController(
            MessageService messageService,
            MessageAttachmentRepository attachmentRepository,
            ConversationParticipantRepository participantRepository,
            FileStorageService fileStorageService,
            UserRepository userRepository) {
        this.messageService = messageService;
        this.attachmentRepository = attachmentRepository;
        this.participantRepository = participantRepository;
        this.fileStorageService = fileStorageService;
        this.userRepository = userRepository;
    }

    @PostMapping(value = "/api/conversations/{conversationId}/attachments", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ApiResponse<MessageResponse>> uploadAttachments(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @PathVariable Long conversationId,
            @RequestParam(value = "content", required = false) String content,
            @RequestParam(value = "clientMessageId", required = false) String clientMessageId,
            @RequestParam("files") List<MultipartFile> files) {

        if (userPrincipal == null) {
            throw new AccessDeniedException("Unauthenticated user");
        }

        MessageResponse response = messageService.sendAttachmentMessage(
                userPrincipal.getUsername(),
                conversationId,
                content,
                clientMessageId,
                files
        );

        return ResponseEntity.status(201).body(ApiResponse.success(response, "Attachment message sent successfully"));
    }

    @GetMapping("/api/attachments/{attachmentId}")
    public ResponseEntity<Resource> downloadAttachment(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @PathVariable Long attachmentId) {

        if (userPrincipal == null) {
            throw new AccessDeniedException("Unauthenticated user");
        }

        MessageAttachment attachment = attachmentRepository.findByIdWithConversation(attachmentId)
                .orElseThrow(() -> new ResourceNotFoundException("Attachment not found with ID: " + attachmentId));

        Long conversationId = attachment.getMessage().getConversation().getId();
        boolean isParticipant = participantRepository.existsByConversationIdAndUserIdAndActiveTrue(
                conversationId, userPrincipal.getId());

        if (!isParticipant) {
            log.warn("User {} attempted unauthorized access to attachment ID {}", userPrincipal.getId(), attachmentId);
            throw new AccessDeniedException("You are not authorized to view attachments in this conversation");
        }

        Resource resource = fileStorageService.loadAsResource(attachment.getStorageKey());
        String contentType = attachment.getContentType() != null ? attachment.getContentType() : MediaType.APPLICATION_OCTET_STREAM_VALUE;

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + attachment.getOriginalFileName() + "\"")
                .body(resource);
    }

    @DeleteMapping("/api/attachments/{attachmentId}")
    public ResponseEntity<ApiResponse<MessageResponse>> deleteAttachment(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @PathVariable Long attachmentId) {

        if (userPrincipal == null) {
            throw new AccessDeniedException("Unauthenticated user");
        }

        MessageAttachment attachment = attachmentRepository.findByIdWithConversation(attachmentId)
                .orElseThrow(() -> new ResourceNotFoundException("Attachment not found with ID: " + attachmentId));

        Long conversationId = attachment.getMessage().getConversation().getId();
        Long messageId = attachment.getMessage().getId();

        MessageResponse response = messageService.deleteMessage(userPrincipal.getUsername(), conversationId, messageId);

        return ResponseEntity.ok(ApiResponse.success(response, "Attachment message deleted successfully"));
    }

    // Helper wrapper DTO for API response consistency
    public static class ApiResponse<T> {
        private boolean success;
        private String message;
        private T data;

        public ApiResponse() {
        }

        public ApiResponse(boolean success, String message, T data) {
            this.success = success;
            this.message = message;
            this.data = data;
        }

        public static <T> ApiResponse<T> success(T data, String message) {
            return new ApiResponse<>(true, message, data);
        }

        public boolean isSuccess() { return success; }
        public void setSuccess(boolean success) { this.success = success; }

        public String getMessage() { return message; }
        public void setMessage(String message) { this.message = message; }

        public T getData() { return data; }
        public void setData(T data) { this.data = data; }
    }
}
