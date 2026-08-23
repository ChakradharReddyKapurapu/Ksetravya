package com.agrinexus.admin.service;

import com.agrinexus.admin.dto.AdminDashboardResponse;
import com.agrinexus.admin.dto.AuditLogResponse;
import com.agrinexus.admin.entity.AuditLog;
import com.agrinexus.admin.repository.AuditLogRepository;
import com.agrinexus.jobs.entity.JobStatus;
import com.agrinexus.jobs.repository.JobRepository;
import com.agrinexus.land.entity.LandStatus;
import com.agrinexus.land.repository.LandParcelRepository;
import com.agrinexus.marketplace.entity.ProductStatus;
import com.agrinexus.marketplace.repository.OrderRepository;
import com.agrinexus.marketplace.repository.ProductRepository;
import com.agrinexus.notification.entity.NotificationPriority;
import com.agrinexus.notification.repository.NotificationRepository;
import com.agrinexus.user.Role;
import com.agrinexus.user.UserRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AdminDashboardService {

    private final UserRepository userRepository;
    private final JobRepository jobRepository;
    private final LandParcelRepository landParcelRepository;
    private final ProductRepository productRepository;
    private final OrderRepository orderRepository;
    private final NotificationRepository notificationRepository;
    private final AuditLogRepository auditLogRepository;

    public AdminDashboardService(UserRepository userRepository, JobRepository jobRepository, LandParcelRepository landParcelRepository, ProductRepository productRepository, OrderRepository orderRepository, NotificationRepository notificationRepository, AuditLogRepository auditLogRepository) {
        this.userRepository = userRepository;
        this.jobRepository = jobRepository;
        this.landParcelRepository = landParcelRepository;
        this.productRepository = productRepository;
        this.orderRepository = orderRepository;
        this.notificationRepository = notificationRepository;
        this.auditLogRepository = auditLogRepository;
    }

    @Transactional(readOnly = true)
    public AdminDashboardResponse getDashboard() {
        long totalUsers = userRepository.count();
        long activeUsers = userRepository.countByEnabled(true);
        long inactiveUsers = totalUsers - activeUsers;

        long totalFarmers = userRepository.countByRole(Role.FARMER);
        long totalWorkers = userRepository.countByRole(Role.WORKER);
        long totalCoordinators = userRepository.countByRole(Role.COORDINATOR);
        long totalAdmins = userRepository.countByRole(Role.ADMIN);

        long totalJobs = jobRepository.count();
        long activeJobs = jobRepository.countByStatus(JobStatus.OPEN) + jobRepository.countByStatus(JobStatus.IN_PROGRESS);
        long completedJobs = jobRepository.countByStatus(JobStatus.COMPLETED);

        long totalLandListings = landParcelRepository.count();
        long activeLandListings = landParcelRepository.countByStatus(LandStatus.AVAILABLE);
        long activeLeases = landParcelRepository.countByStatus(LandStatus.LEASED);

        long totalProducts = productRepository.count();
        long activeProducts = productRepository.countByAvailabilityStatus(ProductStatus.ACTIVE);
        long totalOrders = orderRepository.count();

        long unreadSystemIssues = notificationRepository.countByPriorityAndDeletedFalse(NotificationPriority.CRITICAL) + notificationRepository.countByPriorityAndDeletedFalse(NotificationPriority.HIGH);

        List<AuditLogResponse> recentActivity = auditLogRepository.findAll(PageRequest.of(0, 10, Sort.by(Sort.Direction.DESC, "createdAt")))
                .getContent().stream()
                .map(AuditLogResponse::fromEntity)
                .collect(Collectors.toList());

        return new AdminDashboardResponse(
                totalUsers, activeUsers, inactiveUsers,
                totalFarmers, totalWorkers, totalCoordinators, totalAdmins,
                totalJobs, activeJobs, completedJobs,
                totalLandListings, activeLandListings, activeLeases,
                totalProducts, activeProducts, totalOrders,
                unreadSystemIssues, recentActivity
        );
    }
}
