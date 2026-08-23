package com.agrinexus.tools.entity;

public enum ToolAvailabilityStatus {
    AVAILABLE,
    RENTED,
    UNAVAILABLE,
    MAINTENANCE;

    public static ToolAvailabilityStatus fromString(String text) {
        if (text == null || text.trim().isEmpty() || "all".equalsIgnoreCase(text.trim())) {
            return null;
        }
        try {
            return ToolAvailabilityStatus.valueOf(text.trim().toUpperCase());
        } catch (IllegalArgumentException e) {
            return AVAILABLE;
        }
    }
}
