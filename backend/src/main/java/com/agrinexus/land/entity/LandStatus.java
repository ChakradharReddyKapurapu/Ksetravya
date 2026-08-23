package com.agrinexus.land.entity;

public enum LandStatus {
    AVAILABLE,
    PENDING_LEASE,
    LEASED,
    INACTIVE;

    public boolean canTransitionTo(LandStatus target) {
        if (this == target) return true;
        return switch (this) {
            case AVAILABLE -> target == PENDING_LEASE || target == LEASED || target == INACTIVE;
            case PENDING_LEASE -> target == LEASED || target == AVAILABLE || target == INACTIVE;
            case LEASED -> target == AVAILABLE || target == INACTIVE;
            case INACTIVE -> target == AVAILABLE;
        };
    }

    public static LandStatus fromString(String text) {
        if (text == null || text.trim().isEmpty() || "all".equalsIgnoreCase(text.trim())) {
            return null;
        }
        try {
            return LandStatus.valueOf(text.trim().toUpperCase());
        } catch (IllegalArgumentException e) {
            return AVAILABLE;
        }
    }
}
