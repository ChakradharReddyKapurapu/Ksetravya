package com.agrinexus.communication.service;

import com.agrinexus.communication.dto.AttachmentResponse;
import com.agrinexus.communication.dto.MessageResponse;
import com.agrinexus.communication.dto.SendMessageRequest;
import com.agrinexus.communication.entity.*;
import com.agrinexus.communication.event.MessageSentEvent;
import com.agrinexus.communication.repository.ConversationParticipantRepository;
import com.agrinexus.communication.repository.ConversationRepository;
import com.agrinexus.communication.repository.MessageAttachmentRepository;
import com.agrinexus.communication.repository.MessageRepository;
import com.agrinexus.communication.storage.FileStorageService;
import com.agrinexus.exception.BadRequestException;
import com.agrinexus.exception.ResourceNotFoundException;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.security.access.AccessDeniedException;
import com.agrinexus.user.User;
import com.agrinexus.user.UserRepository;
import com.agrinexus.user.UserStatus;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.List;

@Service
public class MessageService {

    private static final int MAX_MESSAGES_PER_MINUTE = 30;

    private final MessageRepository messageRepository;
    private final ConversationRepository conversationRepository;
    private final ConversationParticipantRepository participantRepository;
    private final UserRepository userRepository;
    private final ApplicationEventPublisher eventPublisher;
    private final SimpMessagingTemplate messagingTemplate;
    private final FileStorageService fileStorageService;
    private final FileValidationService fileValidationService;
    private final MessageAttachmentRepository attachmentRepository;

    public MessageService(
            MessageRepository messageRepository,
            ConversationRepository conversationRepository,
            ConversationParticipantRepository participantRepository,
            UserRepository userRepository,
            ApplicationEventPublisher eventPublisher,
            SimpMessagingTemplate messagingTemplate,
            FileStorageService fileStorageService,
            FileValidationService fileValidationService,
            MessageAttachmentRepository attachmentRepository) {
        this.messageRepository = messageRepository;
        this.conversationRepository = conversationRepository;
        this.participantRepository = participantRepository;
        this.userRepository = userRepository;
        this.eventPublisher = eventPublisher;
        this.messagingTemplate = messagingTemplate;
        this.fileStorageService = fileStorageService;
        this.fileValidationService = fileValidationService;
        this.attachmentRepository = attachmentRepository;
    }

    @Transactional
    public MessageResponse sendMessage(String currentUserEmail, Long conversationId, SendMessageRequest request) {
        User currentUser = getUserByEmail(currentUserEmail);
        validateUserActive(currentUser);

        Conversation conversation = conversationRepository.findById(conversationId)
                .orElseThrow(() -> new ResourceNotFoundException("Conversation not found with ID: " + conversationId));

        if (!Boolean.TRUE.equals(conversation.getActive()) || conversation.getStatus() == ConversationStatus.CLOSED) {
            throw new BadRequestException("Cannot send message to an inactive or closed conversation");
        }

        boolean isParticipant = participantRepository.existsByConversationIdAndUserIdAndActiveTrue(conversationId, currentUser.getId());
        if (!isParticipant) {
            throw new AccessDeniedException("You are not authorized to send messages in this conversation");
        }

        // Idempotency check with clientMessageId
        if (request.getClientMessageId() != null && !request.getClientMessageId().trim().isEmpty()) {
            var existingMsg = messageRepository.findByConversationIdAndSenderIdAndClientMessageId(
                    conversationId, currentUser.getId(), request.getClientMessageId().trim());
            if (existingMsg.isPresent()) {
                return mapMessage(existingMsg.get());
            }
        }

        String content = request.getContent() != null ? request.getContent().trim() : "";
        if (content.isEmpty()) {
            throw new BadRequestException("Message content cannot be blank");
        }
        if (content.length() > 5000) {
            throw new BadRequestException("Message content exceeds maximum length of 5000 characters");
        }

        // Anti-Spam Rate Limit Check
        long recentCount = messageRepository.countMessagesBySenderSince(currentUser.getId(), LocalDateTime.now().minusMinutes(1));
        if (recentCount >= MAX_MESSAGES_PER_MINUTE) {
            throw new BadRequestException("Rate limit exceeded. Please wait a moment before sending more messages.");
        }

        Message message = new Message(conversation, currentUser, content, MessageType.TEXT);
        if (request.getClientMessageId() != null) {
            message.setClientMessageId(request.getClientMessageId().trim());
        }
        message = messageRepository.save(message);

        // Update Conversation lastMessageAt
        conversation.setLastMessageAt(LocalDateTime.now());
        conversationRepository.save(conversation);

        // Automatically update sender's lastReadAt
        participantRepository.findByConversationIdAndUserId(conversationId, currentUser.getId())
                .ifPresent(p -> {
                    p.setLastReadAt(LocalDateTime.now());
                    participantRepository.save(p);
                });

        MessageResponse response = mapMessage(message);

        // STOMP Broadcast to Conversation Destination
        try {
            messagingTemplate.convertAndSend("/topic/conversations/" + conversationId, response);
        } catch (Exception e) {
            // Log STOMP broadcast exception without failing DB transaction
        }

        // Trigger Notification Event for recipients
        List<ConversationParticipant> participants = participantRepository.findByConversationId(conversationId);
        List<Long> recipientIds = participants.stream()
                .map(p -> p.getUser().getId())
                .filter(id -> !id.equals(currentUser.getId()))
                .toList();

        String jobTitle = conversation.getJob() != null ? conversation.getJob().getTitle() : null;
        eventPublisher.publishEvent(new MessageSentEvent(
                message.getId(),
                conversationId,
                currentUser.getId(),
                currentUser.getFullName(),
                recipientIds,
                jobTitle
        ));

        return mapMessage(message);
    }

    @Transactional(readOnly = true)
    public Page<MessageResponse> getMessages(String currentUserEmail, Long conversationId, int page, int size) {
        User currentUser = getUserByEmail(currentUserEmail);
        validateUserActive(currentUser);

        boolean isParticipant = participantRepository.existsByConversationIdAndUserIdAndActiveTrue(conversationId, currentUser.getId());
        if (!isParticipant) {
            throw new AccessDeniedException("You are not authorized to view messages in this conversation");
        }

        int pageNumber = Math.max(0, page);
        int pageSize = Math.min(100, Math.max(1, size));
        Pageable pageable = PageRequest.of(pageNumber, pageSize, Sort.by(Sort.Direction.ASC, "createdAt", "id"));

        Page<Message> messages = messageRepository.findByConversationId(conversationId, pageable);
        return messages.map(this::mapMessage);
    }

    @Transactional
    public MessageResponse deleteMessage(String currentUserEmail, Long conversationId, Long messageId) {
        User currentUser = getUserByEmail(currentUserEmail);
        validateUserActive(currentUser);

        Message message = messageRepository.findById(messageId)
                .orElseThrow(() -> new ResourceNotFoundException("Message not found with ID: " + messageId));

        if (!message.getConversation().getId().equals(conversationId)) {
            throw new BadRequestException("Message does not belong to the specified conversation");
        }

        if (!message.getSender().getId().equals(currentUser.getId())) {
            throw new AccessDeniedException("You can only delete your own messages");
        }

        message.setDeletedAt(LocalDateTime.now());
        messageRepository.save(message);

        return mapMessage(message);
    }

    private User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));
    }

    private void validateUserActive(User user) {
        if (!user.isEnabled() || user.getStatus() == UserStatus.SUSPENDED) {
            throw new BadRequestException("User account is inactive or suspended");
        }
    }

    @Transactional
    public MessageResponse sendAttachmentMessage(
            String currentUserEmail,
            Long conversationId,
            String textContent,
            String clientMessageId,
            List<MultipartFile> files) {

        User currentUser = getUserByEmail(currentUserEmail);
        validateUserActive(currentUser);

        Conversation conversation = conversationRepository.findById(conversationId)
                .orElseThrow(() -> new ResourceNotFoundException("Conversation not found with ID: " + conversationId));

        if (!Boolean.TRUE.equals(conversation.getActive()) || conversation.getStatus() == ConversationStatus.CLOSED) {
            throw new BadRequestException("Cannot send message to an inactive or closed conversation");
        }

        boolean isParticipant = participantRepository.existsByConversationIdAndUserIdAndActiveTrue(conversationId, currentUser.getId());
        if (!isParticipant) {
            throw new AccessDeniedException("You are not authorized to send messages in this conversation");
        }

        if (files == null || files.isEmpty()) {
            throw new BadRequestException("At least one file attachment is required");
        }

        if (files.size() > 5) {
            throw new BadRequestException("Maximum 5 file attachments allowed per message");
        }

        // Idempotency check with clientMessageId
        if (clientMessageId != null && !clientMessageId.trim().isEmpty()) {
            var existingMsg = messageRepository.findByConversationIdAndSenderIdAndClientMessageId(
                    conversationId, currentUser.getId(), clientMessageId.trim());
            if (existingMsg.isPresent()) {
                return mapMessage(existingMsg.get());
            }
        }

        // Validate all files prior to saving any to disk
        for (MultipartFile file : files) {
            fileValidationService.validateFile(file);
        }

        // Store files and track keys for rollback atomicity
        List<String> storedKeys = new ArrayList<>();
        List<MessageAttachment> attachments = new ArrayList<>();

        MessageType primaryType = MessageType.FILE;

        try {
            for (MultipartFile file : files) {
                String contentType = file.getContentType() != null ? file.getContentType().toLowerCase().trim() : "application/octet-stream";
                MessageType type = fileValidationService.determineMessageType(contentType);
                if (type == MessageType.IMAGE) {
                    primaryType = MessageType.IMAGE;
                }

                String storedFileName = fileStorageService.store(file.getInputStream(), file.getOriginalFilename(), contentType);
                storedKeys.add(storedFileName);

                MessageAttachment attachment = new MessageAttachment(
                        null,
                        file.getOriginalFilename(),
                        storedFileName,
                        storedFileName,
                        contentType,
                        file.getSize(),
                        null,
                        null
                );
                attachments.add(attachment);
            }

            String trimmedContent = textContent != null ? textContent.trim() : null;
            if (trimmedContent != null && trimmedContent.length() > 5000) {
                throw new BadRequestException("Message content exceeds maximum length of 5000 characters");
            }

            Message message = new Message(conversation, currentUser, trimmedContent, primaryType);
            if (clientMessageId != null) {
                message.setClientMessageId(clientMessageId.trim());
            }

            for (MessageAttachment att : attachments) {
                message.addAttachment(att);
            }

            message = messageRepository.save(message);

            // Update Conversation lastMessageAt
            conversation.setLastMessageAt(LocalDateTime.now());
            conversationRepository.save(conversation);

            // Update sender's lastReadAt
            participantRepository.findByConversationIdAndUserId(conversationId, currentUser.getId())
                    .ifPresent(p -> {
                        p.setLastReadAt(LocalDateTime.now());
                        participantRepository.save(p);
                    });

            MessageResponse response = mapMessage(message);

            // Broadcast via STOMP
            try {
                messagingTemplate.convertAndSend("/topic/conversations/" + conversationId, response);
            } catch (Exception e) {
                // Log STOMP broadcast error
            }

            // Notification Event
            List<ConversationParticipant> participants = participantRepository.findByConversationId(conversationId);
            List<Long> recipientIds = participants.stream()
                    .map(p -> p.getUser().getId())
                    .filter(id -> !id.equals(currentUser.getId()))
                    .toList();

            String jobTitle = conversation.getJob() != null ? conversation.getJob().getTitle() : null;
            eventPublisher.publishEvent(new MessageSentEvent(
                    message.getId(),
                    conversationId,
                    currentUser.getId(),
                    currentUser.getFullName(),
                    recipientIds,
                    jobTitle
            ));

            return response;

        } catch (Exception e) {
            // Atomic Cleanup of stored files on disk if DB transaction fails
            for (String key : storedKeys) {
                try {
                    fileStorageService.delete(key);
                } catch (Exception ex) {
                    // Log cleanup warning
                }
            }
            if (e instanceof RuntimeException re) {
                throw re;
            }
            throw new RuntimeException("Failed to send attachment message", e);
        }
    }

    public MessageResponse mapMessage(Message m) {
        List<AttachmentResponse> attachmentResponses = new ArrayList<>();
        if (m.getAttachments() != null && !m.getAttachments().isEmpty()) {
            attachmentResponses = m.getAttachments().stream()
                    .map(att -> new AttachmentResponse(
                            att.getId(),
                            att.getOriginalFileName(),
                            att.getContentType(),
                            att.getFileSize(),
                            "/api/attachments/" + att.getId(),
                            att.getWidth(),
                            att.getHeight(),
                            att.getCreatedAt()
                    ))
                    .toList();
        }

        return new MessageResponse(
                m.getId(),
                m.getConversation().getId(),
                m.getSender().getId(),
                m.getSender().getFullName(),
                m.getSender().getRole(),
                m.getContent(),
                m.getMessageType(),
                m.getCreatedAt(),
                m.getReadAt(),
                m.isDeleted(),
                m.getClientMessageId(),
                attachmentResponses
        );
    }
}
