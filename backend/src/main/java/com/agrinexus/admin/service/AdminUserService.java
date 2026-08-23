package com.agrinexus.admin.service;

import com.agrinexus.admin.dto.*;
import com.agrinexus.admin.entity.AuditAction;
import com.agrinexus.exception.BadRequestException;
import com.agrinexus.exception.ResourceNotFoundException;
import com.agrinexus.farm.repository.FarmRepository;
import com.agrinexus.jobs.repository.JobRepository;
import com.agrinexus.land.repository.LandParcelRepository;
import com.agrinexus.marketplace.repository.OrderRepository;
import com.agrinexus.user.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AdminUserService {

    private final UserRepository userRepository;
    private final FarmRepository farmRepository;
    private final JobRepository jobRepository;
    private final LandParcelRepository landParcelRepository;
    private final OrderRepository orderRepository;
    private final AuditLogService auditLogService;

    public AdminUserService(UserRepository userRepository, FarmRepository farmRepository, JobRepository jobRepository, LandParcelRepository landParcelRepository, OrderRepository orderRepository, AuditLogService auditLogService) {
        this.userRepository = userRepository;
        this.farmRepository = farmRepository;
        this.jobRepository = jobRepository;
        this.landParcelRepository = landParcelRepository;
        this.orderRepository = orderRepository;
        this.auditLogService = auditLogService;
    }

    @Transactional(readOnly = true)
    public Page<AdminUserResponse> getUsers(int page, int size, String search, Role role, UserStatus status) {
        int pageNumber = Math.max(0, page);
        int pageSize = Math.min(100, Math.max(1, size));
        Pageable pageable = PageRequest.of(pageNumber, pageSize, Sort.by(Sort.Direction.DESC, "createdAt"));

        return userRepository.findAll(UserSpecification.filter(role, status, search), pageable)
                .map(user -> new AdminUserResponse(
                        user.getId(),
                        user.getFullName(),
                        user.getEmail(),
                        user.getPhone(),
                        user.getRole(),
                        user.getStatus(),
                        user.isEnabled(),
                        user.getCreatedAt(),
                        user.getUpdatedAt()
                ));
    }

    @Transactional(readOnly = true)
    public AdminUserDetailsResponse getUserDetails(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + userId));

        long farmCount = farmRepository.existsByUserId(userId) ? 1L : 0L;
        long jobCount = jobRepository.countByCreatedById(userId);
        long landParcelCount = landParcelRepository.countByOwnerId(userId);
        long orderCount = orderRepository.countByBuyerId(userId);

        return new AdminUserDetailsResponse(
                user.getId(),
                user.getFullName(),
                user.getEmail(),
                user.getPhone(),
                user.getRole(),
                user.getStatus(),
                user.isEnabled(),
                user.getCreatedAt(),
                user.getUpdatedAt(),
                farmCount,
                jobCount,
                landParcelCount,
                orderCount
        );
    }

    @Transactional
    public AdminUserResponse updateUserStatus(String adminEmail, Long userId, AdminUserStatusRequest request, String ipAddress) {
        User admin = userRepository.findByEmail(adminEmail)
                .orElseThrow(() -> new ResourceNotFoundException("Admin user not found"));

        User targetUser = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + userId));

        if (admin.getId().equals(targetUser.getId())) {
            throw new BadRequestException("Self-deactivation/suspension is strictly prohibited for security reasons.");
        }

        UserStatus oldStatus = targetUser.getStatus();
        targetUser.setStatus(request.getStatus());
        userRepository.save(targetUser);

        auditLogService.logAction(
                admin,
                AuditAction.USER_STATUS_CHANGED,
                "USER",
                targetUser.getId(),
                oldStatus != null ? oldStatus.name() : "UNKNOWN",
                request.getStatus().name(),
                request.getReason() != null ? request.getReason() : "Admin status update",
                ipAddress
        );

        return new AdminUserResponse(
                targetUser.getId(),
                targetUser.getFullName(),
                targetUser.getEmail(),
                targetUser.getPhone(),
                targetUser.getRole(),
                targetUser.getStatus(),
                targetUser.isEnabled(),
                targetUser.getCreatedAt(),
                targetUser.getUpdatedAt()
        );
    }

    @Transactional
    public AdminUserResponse updateUserRole(String adminEmail, Long userId, AdminUserRoleRequest request, String ipAddress) {
        User admin = userRepository.findByEmail(adminEmail)
                .orElseThrow(() -> new ResourceNotFoundException("Admin user not found"));

        User targetUser = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + userId));

        Role oldRole = targetUser.getRole();
        targetUser.setRole(request.getRole());
        userRepository.save(targetUser);

        auditLogService.logAction(
                admin,
                AuditAction.USER_ROLE_CHANGED,
                "USER",
                targetUser.getId(),
                oldRole != null ? oldRole.name() : "UNKNOWN",
                request.getRole().name(),
                request.getReason() != null ? request.getReason() : "Admin role update",
                ipAddress
        );

        return new AdminUserResponse(
                targetUser.getId(),
                targetUser.getFullName(),
                targetUser.getEmail(),
                targetUser.getPhone(),
                targetUser.getRole(),
                targetUser.getStatus(),
                targetUser.isEnabled(),
                targetUser.getCreatedAt(),
                targetUser.getUpdatedAt()
        );
    }
}
