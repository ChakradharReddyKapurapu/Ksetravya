package com.agrinexus.notification.entity;

import com.agrinexus.user.User;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.Instant;

@Entity
@Table(
        name = "notification_preferences",
        indexes = {
                @Index(name = "idx_notif_pref_user", columnList = "user_id", unique = true)
        }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NotificationPreference {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    @Column(name = "weather_alerts", nullable = false)
    @Builder.Default
    private boolean weatherAlerts = true;

    @Column(name = "market_price_alerts", nullable = false)
    @Builder.Default
    private boolean marketPriceAlerts = true;

    @Column(name = "job_alerts", nullable = false)
    @Builder.Default
    private boolean jobAlerts = true;

    @Column(name = "land_lease_alerts", nullable = false)
    @Builder.Default
    private boolean landLeaseAlerts = true;

    @Column(name = "marketplace_alerts", nullable = false)
    @Builder.Default
    private boolean marketplaceAlerts = true;

    @Column(name = "crop_insights", nullable = false)
    @Builder.Default
    private boolean cropInsights = true;

    @Column(name = "system_notifications", nullable = false)
    @Builder.Default
    private boolean systemNotifications = true;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private Instant updatedAt;

    public static NotificationPreference defaultFor(User user) {
        return NotificationPreference.builder()
                .user(user)
                .weatherAlerts(true)
                .marketPriceAlerts(true)
                .jobAlerts(true)
                .landLeaseAlerts(true)
                .marketplaceAlerts(true)
                .cropInsights(true)
                .systemNotifications(true)
                .build();
    }
}
