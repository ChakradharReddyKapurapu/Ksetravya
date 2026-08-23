package com.agrinexus.communication.service;

import com.agrinexus.communication.dto.*;
import com.agrinexus.communication.entity.*;
import com.agrinexus.communication.repository.ConversationParticipantRepository;
import com.agrinexus.communication.repository.ConversationRepository;
import com.agrinexus.communication.repository.MessageRepository;
import com.agrinexus.exception.BadRequestException;
import com.agrinexus.exception.ResourceNotFoundException;
import org.springframework.security.access.AccessDeniedException;
import com.agrinexus.jobs.entity.Job;
import com.agrinexus.jobs.repository.JobApplicationRepository;
import com.agrinexus.jobs.repository.JobRepository;
import com.agrinexus.user.User;
import com.agrinexus.user.UserRepository;
import com.agrinexus.user.UserStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ConversationService {

    private final ConversationRepository conversationRepository;
    private final ConversationParticipantRepository participantRepository;
    private final MessageRepository messageRepository;
    private final UserRepository userRepository;
    private final JobRepository jobRepository;
    private final JobApplicationRepository jobApplicationRepository;

    public ConversationService(
            ConversationRepository conversationRepository,
            ConversationParticipantRepository participantRepository,
            MessageRepository messageRepository,
            UserRepository userRepository,
            JobRepository jobRepository,
            JobApplicationRepository jobApplicationRepository) {
        this.conversationRepository = conversationRepository;
        this.participantRepository = participantRepository;
        this.messageRepository = messageRepository;
        this.userRepository = userRepository;
        this.jobRepository = jobRepository;
        this.jobApplicationRepository = jobApplicationRepository;
    }

    @Transactional
    public ConversationResponse createConversation(String currentUserEmail, CreateConversationRequest request) {
        User currentUser = getUserByEmail(currentUserEmail);
        validateUserActive(currentUser);

        if (currentUser.getId().equals(request.getParticipantId())) {
            throw new BadRequestException("Cannot create a conversation with yourself");
        }

        User targetParticipant = userRepository.findById(request.getParticipantId())
                .orElseThrow(() -> new ResourceNotFoundException("Participant user not found with ID: " + request.getParticipantId()));
        validateUserActive(targetParticipant);

        Job job = null;
        if (request.getJobId() != null) {
            job = jobRepository.findById(request.getJobId())
                    .orElseThrow(() -> new ResourceNotFoundException("Job not found with ID: " + request.getJobId()));

            boolean isCurrentUserJobOwner = job.getCreatedBy().getId().equals(currentUser.getId());
            boolean isTargetJobOwner = job.getCreatedBy().getId().equals(targetParticipant.getId());

            boolean isCurrentUserApplicant = jobApplicationRepository.findByJobIdAndWorkerId(job.getId(), currentUser.getId()).isPresent();
            boolean isTargetApplicant = jobApplicationRepository.findByJobIdAndWorkerId(job.getId(), targetParticipant.getId()).isPresent();

            boolean isValidRelation = (isCurrentUserJobOwner && isTargetApplicant) || (isTargetJobOwner && isCurrentUserApplicant);

            if (!isValidRelation) {
                throw new AccessDeniedException("You do not have permission to initiate a conversation for this job without an existing application");
            }

            // Duplicate Prevention check
            Optional<Conversation> existingConv = conversationRepository.findExistingJobConversation(
                    job.getId(), currentUser.getId(), targetParticipant.getId());
            if (existingConv.isPresent()) {
                return mapConversation(existingConv.get(), currentUser.getId());
            }
        } else {
            if (request.getType() == ConversationType.JOB) {
                throw new BadRequestException("Job ID is required for JOB conversation type");
            }
        }

        Conversation conversation = new Conversation(request.getType(), job);
        conversation = conversationRepository.save(conversation);

        ConversationParticipant p1 = new ConversationParticipant(conversation, currentUser);
        ConversationParticipant p2 = new ConversationParticipant(conversation, targetParticipant);
        participantRepository.save(p1);
        participantRepository.save(p2);

        conversation.getParticipants().add(p1);
        conversation.getParticipants().add(p2);

        return mapConversation(conversation, currentUser.getId());
    }

    @Transactional(readOnly = true)
    public Page<ConversationResponse> getConversations(String currentUserEmail, int page, int size) {
        User currentUser = getUserByEmail(currentUserEmail);
        validateUserActive(currentUser);

        int pageNumber = Math.max(0, page);
        int pageSize = Math.min(100, Math.max(1, size));
        Pageable pageable = PageRequest.of(pageNumber, pageSize, Sort.by(Sort.Direction.DESC, "lastMessageAt"));

        Page<Conversation> conversations = conversationRepository.findUserConversations(currentUser.getId(), pageable);
        return conversations.map(c -> mapConversation(c, currentUser.getId()));
    }

    @Transactional(readOnly = true)
    public ConversationResponse getConversationDetails(String currentUserEmail, Long conversationId) {
        User currentUser = getUserByEmail(currentUserEmail);
        validateUserActive(currentUser);

        Conversation conversation = conversationRepository.findByIdWithDetails(conversationId)
                .orElseThrow(() -> new ResourceNotFoundException("Conversation not found with ID: " + conversationId));

        boolean isParticipant = participantRepository.existsByConversationIdAndUserIdAndActiveTrue(conversationId, currentUser.getId());
        if (!isParticipant) {
            throw new AccessDeniedException("You are not authorized to access this conversation");
        }

        return mapConversation(conversation, currentUser.getId());
    }

    @Transactional
    public void markConversationAsRead(String currentUserEmail, Long conversationId) {
        User currentUser = getUserByEmail(currentUserEmail);
        validateUserActive(currentUser);

        ConversationParticipant participant = participantRepository.findByConversationIdAndUserId(conversationId, currentUser.getId())
                .orElseThrow(() -> new AccessDeniedException("You are not authorized to access this conversation"));

        participant.setLastReadAt(LocalDateTime.now());
        participantRepository.save(participant);
    }

    @Transactional(readOnly = true)
    public UnreadCountResponse getTotalUnreadCount(String currentUserEmail) {
        User currentUser = getUserByEmail(currentUserEmail);
        validateUserActive(currentUser);

        long count = messageRepository.countTotalUnreadMessagesForUser(currentUser.getId());
        return new UnreadCountResponse(count);
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

    public ConversationResponse mapConversation(Conversation c, Long currentUserId) {
        List<ConversationParticipant> participants = participantRepository.findByConversationId(c.getId());

        List<ConversationParticipantResponse> participantResponses = participants.stream()
                .map(p -> new ConversationParticipantResponse(
                        p.getId(),
                        p.getUser().getId(),
                        p.getUser().getFullName(),
                        p.getUser().getRole(),
                        p.getJoinedAt(),
                        p.getLastReadAt()
                ))
                .toList();

        long unreadCount = 0;
        Optional<ConversationParticipant> currentParticipantOpt = participants.stream()
                .filter(p -> p.getUser().getId().equals(currentUserId))
                .findFirst();

        if (currentParticipantOpt.isPresent()) {
            LocalDateTime lastReadAt = currentParticipantOpt.get().getLastReadAt();
            unreadCount = messageRepository.countUnreadMessagesInConversation(c.getId(), currentUserId, lastReadAt);
        }

        MessageResponse lastMessageResponse = messageRepository.findTopByConversationIdOrderByCreatedAtDesc(c.getId())
                .map(this::mapMessage)
                .orElse(null);

        return new ConversationResponse(
                c.getId(),
                c.getType(),
                c.getJob() != null ? c.getJob().getId() : null,
                c.getJob() != null ? c.getJob().getTitle() : null,
                c.getStatus(),
                Boolean.TRUE.equals(c.getActive()),
                c.getCreatedAt(),
                c.getLastMessageAt(),
                unreadCount,
                participantResponses,
                lastMessageResponse
        );
    }

    public MessageResponse mapMessage(Message m) {
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
                m.isDeleted()
        );
    }
}
