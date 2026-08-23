package com.agrinexus.seeds.entity;

public enum SoilType {
    BLACK,
    RED,
    ALLUVIAL,
    LOAMY,
    SANDY,
    CLAY,
    OTHER;

    public static SoilType fromString(String text) {
        if (text == null || text.trim().isEmpty() || "all".equalsIgnoreCase(text.trim())) {
            return null;
        }
        String normalized = text.trim().toUpperCase().replace("-", "_").replace(" ", "_");
        if (normalized.contains("BLACK")) return BLACK;
        if (normalized.contains("RED")) return RED;
        if (normalized.contains("ALLUVIAL")) return ALLUVIAL;
        if (normalized.contains("LOAM") || normalized.contains("LOAMY")) return LOAMY;
        if (normalized.contains("SAND") || normalized.contains("SANDY")) return SANDY;
        if (normalized.contains("CLAY") || normalized.contains("CLAYEY")) return CLAY;

        try {
            return SoilType.valueOf(normalized);
        } catch (IllegalArgumentException e) {
            return OTHER;
        }
    }
}
