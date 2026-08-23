package com.agrinexus.admin.service;

import com.agrinexus.admin.dto.AuditLogResponse;
import com.agrinexus.admin.entity.AuditAction;
import com.agrinexus.admin.entity.AuditLog;
import com.agrinexus.admin.repository.AuditLogRepository;
import com.agrinexus.admin.repository.AuditLogSpecification;
import com.agrinexus.user.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;

@Service
public class AuditLogService {

    private final AuditLogRepository auditLogRepository;

    public AuditLogService(AuditLogRepository auditLogRepository) {
        this.auditLogRepository = auditLogRepository;
    }

    @Transactional
    public AuditLog logAction(User adminUser, AuditAction action, String entityType, Long entityId, String oldValue, String newValue, String reason, String ipAddress) {
        AuditLog auditLog = AuditLog.builder()
                .adminUser(adminUser)
                .action(action)
                .entityType(entityType)
                .entityId(entityId)
                .oldValue(oldValue)
                .newValue(newValue)
                .reason(reason)
                .ipAddress(ipAddress)
                .build();

        return auditLogRepository.save(auditLog);
    }

    @Transactional(readOnly = true)
    public Page<AuditLogResponse> getAuditLogs(int page, int size, AuditAction action, String entityType, Long adminId, Instant from, Instant to) {
        int pageNumber = Math.max(0, page);
        int pageSize = Math.min(100, Math.max(1, size));
        Pageable pageable = PageRequest.of(pageNumber, pageSize, Sort.by(Sort.Direction.DESC, "createdAt"));

        return auditLogRepository.findAll(AuditLogSpecification.filter(action, entityType, adminId, from, to), pageable)
                .map(AuditLogResponse::fromEntity);
    }
}
