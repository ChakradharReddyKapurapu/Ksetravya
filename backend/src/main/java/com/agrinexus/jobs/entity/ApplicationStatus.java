package com.agrinexus.jobs.entity;

public enum ApplicationStatus {
    PENDING,
    ACCEPTED,
    REJECTED,
    WITHDRAWN,
    COMPLETED,
    CANCELLED;

    public boolean canTransitionTo(ApplicationStatus target) {
        if (this == target) return true;
        return switch (this) {
            case PENDING -> target == ACCEPTED || target == REJECTED || target == WITHDRAWN || target == CANCELLED;
            case ACCEPTED -> target == COMPLETED || target == CANCELLED;
            case REJECTED, WITHDRAWN, COMPLETED, CANCELLED -> false; // Terminal states
        };
    }

    public static ApplicationStatus fromString(String text) {
        if (text == null || text.trim().isEmpty() || "all".equalsIgnoreCase(text.trim())) {
            return null;
        }
        try {
            return ApplicationStatus.valueOf(text.trim().toUpperCase());
        } catch (IllegalArgumentException e) {
            return PENDING;
        }
    }
}
