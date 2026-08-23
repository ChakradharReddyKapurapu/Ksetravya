package com.agrinexus.admin.service;

import com.agrinexus.admin.dto.*;
import com.agrinexus.jobs.entity.JobStatus;
import com.agrinexus.jobs.repository.JobRepository;
import com.agrinexus.land.entity.LandStatus;
import com.agrinexus.land.repository.LandParcelRepository;
import com.agrinexus.marketplace.entity.ProductStatus;
import com.agrinexus.marketplace.repository.OrderRepository;
import com.agrinexus.marketplace.repository.ProductRepository;
import com.agrinexus.notification.entity.NotificationPriority;
import com.agrinexus.notification.entity.NotificationType;
import com.agrinexus.notification.repository.NotificationRepository;
import com.agrinexus.user.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Service
public class AdminStatisticsService {

    private final UserRepository userRepository;
    private final JobRepository jobRepository;
    private final LandParcelRepository landParcelRepository;
    private final ProductRepository productRepository;
    private final OrderRepository orderRepository;
    private final NotificationRepository notificationRepository;

    public AdminStatisticsService(UserRepository userRepository, JobRepository jobRepository, LandParcelRepository landParcelRepository, ProductRepository productRepository, OrderRepository orderRepository, NotificationRepository notificationRepository) {
        this.userRepository = userRepository;
        this.jobRepository = jobRepository;
        this.landParcelRepository = landParcelRepository;
        this.productRepository = productRepository;
        this.orderRepository = orderRepository;
        this.notificationRepository = notificationRepository;
    }

    @Transactional(readOnly = true)
    public AdminStatisticsResponse getStatistics() {
        return new AdminStatisticsResponse(
                getUserGrowth("30D"),
                getJobStatistics(),
                getMarketplaceStatistics(),
                getLandStatistics(),
                getNotificationStatistics()
        );
    }

    @Transactional(readOnly = true)
    public UserGrowthResponse getUserGrowth(String timeframe) {
        String tf = timeframe != null ? timeframe.trim().toUpperCase() : "30D";
        int days = switch (tf) {
            case "7D" -> 7;
            case "90D" -> 90;
            case "1Y" -> 365;
            default -> 30;
        };

        LocalDateTime startDate = LocalDateTime.now().minusDays(days).with(LocalTime.MIN);
        long totalNewUsers = userRepository.countByCreatedAtAfter(startDate);

        List<UserGrowthResponse.DailyGrowthPoint> points = new ArrayList<>();
        LocalDate today = LocalDate.now();
        DateTimeFormatter fmt = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        for (int i = days - 1; i >= 0; i--) {
            LocalDate d = today.minusDays(i);
            LocalDateTime dayStart = d.atStartOfDay();
            LocalDateTime dayEnd = d.atTime(LocalTime.MAX);

            long count = userRepository.findAll((root, query, cb) ->
                    cb.between(root.get("createdAt"), dayStart, dayEnd)
            ).size();

            points.add(new UserGrowthResponse.DailyGrowthPoint(d.format(fmt), count));
        }

        return new UserGrowthResponse(tf, totalNewUsers, points);
    }

    @Transactional(readOnly = true)
    public JobStatisticsResponse getJobStatistics() {
        long created = jobRepository.count();
        long open = jobRepository.countByStatus(JobStatus.OPEN);
        long filled = jobRepository.countByStatus(JobStatus.FILLED);
        long inProgress = jobRepository.countByStatus(JobStatus.IN_PROGRESS);
        long completed = jobRepository.countByStatus(JobStatus.COMPLETED);
        long cancelled = jobRepository.countByStatus(JobStatus.CANCELLED);

        return new JobStatisticsResponse(created, open, filled, inProgress, completed, cancelled);
    }

    @Transactional(readOnly = true)
    public MarketplaceStatisticsResponse getMarketplaceStatistics() {
        long products = productRepository.count();
        long activeProducts = productRepository.countByAvailabilityStatus(ProductStatus.ACTIVE);
        long orders = orderRepository.count();
        long activeSellers = productRepository.countDistinctActiveSellers();
        long activeBuyers = orderRepository.countDistinctBuyers();
        BigDecimal grossOrderValue = orderRepository.sumTotalAmount();

        return new MarketplaceStatisticsResponse(products, activeProducts, orders, activeSellers, activeBuyers, grossOrderValue);
    }

    @Transactional(readOnly = true)
    public LandStatisticsResponse getLandStatistics() {
        long totalListings = landParcelRepository.count();
        long activeListings = landParcelRepository.countByStatus(LandStatus.AVAILABLE);
        long leasedListings = landParcelRepository.countByStatus(LandStatus.LEASED);
        long availableListings = landParcelRepository.countByStatus(LandStatus.AVAILABLE);

        return new LandStatisticsResponse(totalListings, activeListings, leasedListings, availableListings);
    }

    @Transactional(readOnly = true)
    public NotificationStatisticsResponse getNotificationStatistics() {
        long total = notificationRepository.countByDeletedFalse();
        long unread = notificationRepository.countByReadFalseAndDeletedFalse();
        long highPriority = notificationRepository.countByPriorityAndDeletedFalse(NotificationPriority.HIGH) + notificationRepository.countByPriorityAndDeletedFalse(NotificationPriority.CRITICAL);

        long weather = notificationRepository.countByTypeAndDeletedFalse(NotificationType.WEATHER_ALERT);
        long market = notificationRepository.countByTypeAndDeletedFalse(NotificationType.MARKET_PRICE);
        long job = notificationRepository.countByTypeAndDeletedFalse(NotificationType.JOB_APPLICATION);
        long land = notificationRepository.countByTypeAndDeletedFalse(NotificationType.LAND_APPLICATION);

        return new NotificationStatisticsResponse(total, unread, highPriority, weather, market, job, land);
    }
}
