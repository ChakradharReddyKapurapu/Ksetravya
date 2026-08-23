package com.agrinexus.seeds.entity;

public enum SeasonType {
    KHARIF,
    RABI,
    SUMMER,
    YEAR_ROUND,
    PERENNIAL,
    OTHER;

    public static SeasonType fromString(String text) {
        if (text == null || text.trim().isEmpty() || "all".equalsIgnoreCase(text.trim())) {
            return null;
        }
        String normalized = text.trim().toUpperCase().replace("-", "_").replace(" ", "_");
        if (normalized.contains("KHARIF")) return KHARIF;
        if (normalized.contains("RABI")) return RABI;
        if (normalized.contains("SUMMER") || normalized.contains("ZAID")) return SUMMER;
        if (normalized.contains("YEAR") || normalized.contains("ROUND")) return YEAR_ROUND;
        if (normalized.contains("PERENNIAL")) return PERENNIAL;

        try {
            return SeasonType.valueOf(normalized);
        } catch (IllegalArgumentException e) {
            return OTHER;
        }
    }
}
