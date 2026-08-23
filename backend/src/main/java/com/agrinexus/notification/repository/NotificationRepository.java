package com.agrinexus.notification.repository;

import com.agrinexus.notification.entity.Notification;
import com.agrinexus.notification.entity.NotificationPriority;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.Instant;
import java.util.Optional;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long>, JpaSpecificationExecutor<Notification> {

    Optional<Notification> findByIdAndUserIdAndDeletedFalse(Long id, Long userId);

    boolean existsByUserIdAndIdempotencyKey(Long userId, String idempotencyKey);

    @Query("SELECT COUNT(n) FROM Notification n WHERE n.user.id = :userId AND n.read = false AND n.deleted = false AND (n.expiresAt IS NULL OR n.expiresAt > :now)")
    long countUnread(@Param("userId") Long userId, @Param("now") Instant now);

    @Query("SELECT COUNT(n) FROM Notification n WHERE n.user.id = :userId AND n.read = false AND n.deleted = false AND (n.expiresAt IS NULL OR n.expiresAt > :now) AND n.priority = :priority")
    long countUnreadByPriority(@Param("userId") Long userId, @Param("now") Instant now, @Param("priority") NotificationPriority priority);

    @Query("SELECT n FROM Notification n WHERE n.user.id = :userId AND n.deleted = false AND (n.expiresAt IS NULL OR n.expiresAt > :now) ORDER BY n.createdAt DESC")
    Page<Notification> findLatestActive(@Param("userId") Long userId, @Param("now") Instant now, Pageable pageable);

    @Modifying
    @Query("UPDATE Notification n SET n.deleted = true, n.deletedAt = :now WHERE n.id = :id AND n.user.id = :userId AND n.deleted = false")
    int softDeleteNotification(@Param("id") Long id, @Param("userId") Long userId, @Param("now") Instant now);

    long countByDeletedFalse();

    long countByReadFalseAndDeletedFalse();

    long countByPriorityAndDeletedFalse(NotificationPriority priority);

    long countByTypeAndDeletedFalse(com.agrinexus.notification.entity.NotificationType type);

    @Modifying
    @Query("UPDATE Notification n SET n.read = true, n.readAt = :now WHERE n.user.id = :userId AND n.read = false AND n.deleted = false")
    int markAllAsRead(@Param("userId") Long userId, @Param("now") Instant now);
}
