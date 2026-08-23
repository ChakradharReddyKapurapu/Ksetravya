package com.agrinexus.seeds.entity;

public enum SeedType {
    HYBRID,
    OPEN_POLLINATED,
    CERTIFIED,
    TRADITIONAL,
    FOUNDATION,
    OTHER;

    public static SeedType fromString(String text) {
        if (text == null || text.trim().isEmpty() || "all".equalsIgnoreCase(text.trim())) {
            return null;
        }
        String normalized = text.trim().toUpperCase().replace("-", "_").replace(" ", "_");
        try {
            return SeedType.valueOf(normalized);
        } catch (IllegalArgumentException e) {
            return CERTIFIED;
        }
    }
}
