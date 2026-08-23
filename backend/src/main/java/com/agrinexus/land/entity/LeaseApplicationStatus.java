package com.agrinexus.land.entity;

public enum LeaseApplicationStatus {
    PENDING,
    ACCEPTED,
    REJECTED,
    WITHDRAWN,
    CANCELLED,
    COMPLETED;

    public boolean canTransitionTo(LeaseApplicationStatus target) {
        if (this == target) return true;
        return switch (this) {
            case PENDING -> target == ACCEPTED || target == REJECTED || target == WITHDRAWN || target == CANCELLED;
            case ACCEPTED -> target == COMPLETED || target == CANCELLED;
            case REJECTED, WITHDRAWN, CANCELLED, COMPLETED -> false; // Terminal states
        };
    }

    public static LeaseApplicationStatus fromString(String text) {
        if (text == null || text.trim().isEmpty() || "all".equalsIgnoreCase(text.trim())) {
            return null;
        }
        try {
            return LeaseApplicationStatus.valueOf(text.trim().toUpperCase());
        } catch (IllegalArgumentException e) {
            return PENDING;
        }
    }
}
