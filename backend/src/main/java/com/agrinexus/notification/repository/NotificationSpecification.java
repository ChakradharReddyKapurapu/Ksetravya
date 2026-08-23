package com.agrinexus.notification.repository;

import com.agrinexus.notification.entity.Notification;
import com.agrinexus.notification.entity.NotificationPriority;
import com.agrinexus.notification.entity.NotificationType;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

public class NotificationSpecification {

    public static Specification<Notification> filter(
            Long userId,
            Boolean read,
            NotificationType type,
            NotificationPriority priority,
            boolean includeExpired) {

        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            // Scoped to user
            predicates.add(cb.equal(root.get("user").get("id"), userId));

            // Soft-deleted check
            predicates.add(cb.isFalse(root.get("deleted")));

            // Expiration check
            if (!includeExpired) {
                Instant now = Instant.now();
                predicates.add(cb.or(
                        cb.isNull(root.get("expiresAt")),
                        cb.greaterThan(root.get("expiresAt"), now)
                ));
            }

            // Read filter
            if (read != null) {
                predicates.add(cb.equal(root.get("read"), read));
            }

            // Type filter
            if (type != null) {
                predicates.add(cb.equal(root.get("type"), type));
            }

            // Priority filter
            if (priority != null) {
                predicates.add(cb.equal(root.get("priority"), priority));
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}
