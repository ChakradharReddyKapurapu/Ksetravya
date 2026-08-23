package com.agrinexus.seeds.entity;

public enum SeedAvailabilityStatus {
    AVAILABLE,
    LIMITED,
    OUT_OF_STOCK,
    UNAVAILABLE;

    public static SeedAvailabilityStatus fromString(String text) {
        if (text == null || text.trim().isEmpty() || "all".equalsIgnoreCase(text.trim())) {
            return null;
        }
        try {
            return SeedAvailabilityStatus.valueOf(text.trim().toUpperCase());
        } catch (IllegalArgumentException e) {
            return AVAILABLE;
        }
    }
}
