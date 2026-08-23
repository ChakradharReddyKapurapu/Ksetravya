package com.agrinexus.jobs.entity;

public enum JobStatus {
    OPEN,
    FILLED,
    IN_PROGRESS,
    COMPLETED,
    CANCELLED,
    EXPIRED;

    public boolean canTransitionTo(JobStatus target) {
        if (this == target) return true;
        return switch (this) {
            case OPEN -> target == FILLED || target == IN_PROGRESS || target == CANCELLED || target == EXPIRED;
            case FILLED -> target == IN_PROGRESS || target == CANCELLED || target == OPEN;
            case IN_PROGRESS -> target == COMPLETED || target == CANCELLED;
            case COMPLETED, CANCELLED, EXPIRED -> false; // Terminal states
        };
    }

    public static JobStatus fromString(String text) {
        if (text == null || text.trim().isEmpty() || "all".equalsIgnoreCase(text.trim())) {
            return null;
        }
        try {
            return JobStatus.valueOf(text.trim().toUpperCase());
        } catch (IllegalArgumentException e) {
            return OPEN;
        }
    }
}
